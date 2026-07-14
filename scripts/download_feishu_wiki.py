#!/usr/bin/env python3
"""Recursively export a Feishu Wiki tree with offline media."""

from __future__ import annotations

import argparse
import concurrent.futures
import html
import json
import mimetypes
import os
import re
import subprocess
import sys
import time
import urllib.parse
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


MEDIA_TAGS = {"img", "image", "file", "source", "attachment", "whiteboard"}
INVALID_FILENAME = re.compile(r"[\x00-\x1f/\\]")


def cli_json(args: list[str], retries: int = 3) -> dict[str, Any]:
    command = ["lark-cli", *args, "--as", "user", "--format", "json"]
    last_error = ""
    for attempt in range(1, retries + 1):
        proc = subprocess.run(command, text=True, capture_output=True)
        if proc.returncode == 0:
            try:
                payload = json.loads(proc.stdout)
            except json.JSONDecodeError as exc:
                raise RuntimeError(f"CLI returned invalid JSON: {exc}\n{proc.stdout[:500]}") from exc
            if payload.get("ok", True):
                return payload
            last_error = json.dumps(payload, ensure_ascii=False)
        else:
            last_error = (proc.stderr or proc.stdout).strip()
        if attempt < retries:
            time.sleep(attempt)
    raise RuntimeError(f"Command failed: {' '.join(command[:3])}\n{last_error}")


def safe_name(value: str, fallback: str) -> str:
    value = INVALID_FILENAME.sub("／", value).strip().rstrip(".")
    return value or fallback


def extension_for(name: str, mime: str, kind: str) -> str:
    suffix = Path(name).suffix
    if suffix and len(suffix) <= 12:
        return suffix
    if kind == "whiteboard":
        return ".png"
    normalized = mime.split(";", 1)[0].strip().lower()
    aliases = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
        "image/webp": ".webp",
        "image/svg+xml": ".svg",
        "application/pdf": ".pdf",
    }
    return aliases.get(normalized) or mimetypes.guess_extension(normalized) or ".bin"


@dataclass
class Node:
    data: dict[str, Any]
    parent: "Node | None" = None
    children: list["Node"] = field(default_factory=list)
    directory: Path | None = None

    @property
    def title(self) -> str:
        return str(self.data.get("title") or "未命名页面")

    @property
    def node_token(self) -> str:
        return str(self.data["node_token"])

    @property
    def obj_token(self) -> str:
        return str(self.data["obj_token"])


@dataclass
class Asset:
    page: Node
    kind: str
    token: str
    href: str
    output: Path


def crawl(root_url: str) -> tuple[Node, str]:
    root_payload = cli_json(["wiki", "+node-get", "--node-token", root_url])
    root_data = dict(root_payload["data"])
    root = Node(root_data)
    space_id = str(root_data["space_id"])

    def visit(parent: Node) -> None:
        if not parent.data.get("has_child"):
            return
        payload = cli_json(
            [
                "wiki",
                "+node-list",
                "--space-id",
                space_id,
                "--parent-node-token",
                parent.node_token,
                "--page-all",
                "--page-limit",
                "0",
            ]
        )
        for item in payload["data"].get("nodes", []):
            child = Node(dict(item), parent=parent)
            parent.children.append(child)
            visit(child)

    visit(root)
    return root, space_id


def assign_directories(root: Node, base: Path) -> None:
    root.directory = base / safe_name(root.title, root.node_token[:8])

    def visit(parent: Node) -> None:
        assert parent.directory is not None
        used: set[str] = set()
        for child in parent.children:
            candidate = safe_name(child.title, child.node_token[:8])
            key = candidate.casefold()
            if key in used:
                candidate = f"{candidate}__{child.node_token[:8]}"
            used.add(candidate.casefold())
            child.directory = parent.directory / candidate
            visit(child)

    visit(root)


def walk(root: Node) -> list[Node]:
    nodes: list[Node] = []

    def visit(node: Node) -> None:
        nodes.append(node)
        for child in node.children:
            visit(child)

    visit(root)
    return nodes


def parse_assets(node: Node, xml_content: str) -> list[Asset]:
    assert node.directory is not None
    assets: list[Asset] = []
    seen: set[tuple[str, str, str]] = set()
    try:
        tree = ET.fromstring(f"<root>{xml_content}</root>")
        elements = list(tree.iter())
    except ET.ParseError:
        elements = []

    for element in elements:
        kind = element.tag.rsplit("}", 1)[-1].lower()
        if kind not in MEDIA_TAGS:
            continue
        # The v2 fetch API already serializes inline whiteboards (for example,
        # Mermaid/SVG) into both source.xml and source.md. A thumbnail is only
        # needed when no inline representation exists.
        if kind == "whiteboard" and (element.text or "").strip():
            continue
        attrs = element.attrib
        token = str(
            attrs.get("token")
            or attrs.get("file_token")
            or attrs.get("file-token")
            or attrs.get("src")
            or ""
        )
        href = html.unescape(str(attrs.get("href") or attrs.get("url") or ""))
        if not token and not href:
            continue
        dedupe_key = (kind, token, href)
        if dedupe_key in seen:
            continue
        seen.add(dedupe_key)
        original_name = safe_name(str(attrs.get("name") or "asset"), "asset")
        mime = str(attrs.get("mime") or attrs.get("mime-type") or "")
        ext = extension_for(original_name, mime, kind)
        stem = safe_name(Path(original_name).stem, "asset")[:60]
        identity = (token or str(len(assets) + 1))[:10]
        filename = f"{len(assets) + 1:03d}_{stem}_{identity}{ext}"
        assets.append(
            Asset(
                page=node,
                kind=kind,
                token=token,
                href=href,
                output=node.directory / "assets" / filename,
            )
        )
    return assets


def replace_subpages(markdown: str, node: Node) -> str:
    if not node.children:
        return re.sub(r"<sub-page-list\b[^>]*>.*?</sub-page-list>", "", markdown, flags=re.S)
    lines: list[str] = []
    assert node.directory is not None
    for child in node.children:
        assert child.directory is not None
        relative = child.directory.relative_to(node.directory).as_posix() + "/index.md"
        href = urllib.parse.quote(relative, safe="/._-()")
        lines.append(f"- [{child.title}]({href})")
    replacement = "\n".join(lines)
    pattern = r"<sub-page-list\b[^>]*>.*?</sub-page-list>"
    if re.search(pattern, markdown, flags=re.S):
        return re.sub(pattern, replacement, markdown, flags=re.S)
    return markdown.rstrip() + "\n\n" + replacement + "\n"


def localize_markdown(markdown: str, node: Node, assets: list[Asset]) -> str:
    assert node.directory is not None
    result = replace_subpages(markdown, node)
    for asset in assets:
        relative = asset.output.relative_to(node.directory).as_posix()
        local_href = urllib.parse.quote(relative, safe="/._-()")
        if asset.href:
            result = result.replace(asset.href, local_href)
        if asset.kind == "whiteboard" and asset.token:
            pattern = rf"<whiteboard\b[^>]*(?:token|src)=[\"']{re.escape(asset.token)}[\"'][^>]*/?>"
            result = re.sub(pattern, f"![画板]({local_href})", result)
    return result


def export_page(node: Node) -> list[Asset]:
    assert node.directory is not None
    node.directory.mkdir(parents=True, exist_ok=True)
    print(f"[页面] {node.directory}", flush=True)
    if node.data.get("obj_type") not in {"doc", "docx"}:
        raise RuntimeError(f"Unsupported wiki object type: {node.data.get('obj_type')} ({node.title})")

    markdown_payload = cli_json(
        [
            "docs",
            "+fetch",
            "--api-version",
            "v2",
            "--doc",
            node.obj_token,
            "--doc-format",
            "markdown",
            "--detail",
            "simple",
        ]
    )
    xml_payload = cli_json(
        [
            "docs",
            "+fetch",
            "--api-version",
            "v2",
            "--doc",
            node.obj_token,
            "--doc-format",
            "xml",
            "--detail",
            "full",
        ]
    )
    markdown_doc = markdown_payload["data"]["document"]
    xml_doc = xml_payload["data"]["document"]
    source_markdown = str(markdown_doc.get("content") or "")
    source_xml = str(xml_doc.get("content") or "")
    assets = parse_assets(node, source_xml)

    (node.directory / "source.md").write_text(source_markdown, encoding="utf-8")
    (node.directory / "source.xml").write_text(source_xml, encoding="utf-8")
    (node.directory / "index.md").write_text(
        localize_markdown(source_markdown, node, assets), encoding="utf-8"
    )
    metadata = {
        **node.data,
        "markdown_revision_id": markdown_doc.get("revision_id"),
        "xml_revision_id": xml_doc.get("revision_id"),
        "asset_count": len(assets),
    }
    (node.directory / "metadata.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    return assets


def download_via_url(asset: Asset) -> None:
    asset.output.parent.mkdir(parents=True, exist_ok=True)
    temp = asset.output.with_suffix(asset.output.suffix + ".part")
    proc = subprocess.run(
        [
            "curl",
            "-L",
            "--fail",
            "--silent",
            "--show-error",
            "--retry",
            "2",
            "--output",
            str(temp),
            asset.href,
        ],
        text=True,
        capture_output=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or f"curl exited {proc.returncode}")
    if not temp.exists() or temp.stat().st_size == 0:
        raise RuntimeError("empty response")
    temp.replace(asset.output)


def download_via_cli(asset: Asset, workspace: Path) -> None:
    if not asset.token:
        raise RuntimeError("media has neither a working URL nor a token")
    relative = asset.output.relative_to(workspace).as_posix()
    args = [
        "docs",
        "+media-download",
        "--token",
        asset.token,
        "--output",
        relative,
        "--overwrite",
    ]
    if asset.kind == "whiteboard":
        args.extend(["--type", "whiteboard"])
    cli_json(args)


def download_asset(asset: Asset, workspace: Path) -> tuple[Asset, str, str]:
    if asset.output.exists() and asset.output.stat().st_size > 0:
        return asset, "skipped", ""
    errors: list[str] = []
    if asset.href and asset.kind != "whiteboard":
        try:
            download_via_url(asset)
            return asset, "downloaded", ""
        except Exception as exc:  # fallback to authenticated CLI download
            errors.append(f"URL: {exc}")
    try:
        download_via_cli(asset, workspace)
        if asset.output.exists() and asset.output.stat().st_size > 0:
            return asset, "downloaded", ""
        errors.append("CLI returned success but output file is missing")
    except Exception as exc:
        errors.append(f"CLI: {exc}")
    return asset, "failed", "; ".join(errors)


def tree_manifest(root: Node, workspace: Path) -> dict[str, Any]:
    assert root.directory is not None

    def serialize(node: Node) -> dict[str, Any]:
        assert node.directory is not None
        return {
            "title": node.title,
            "node_token": node.node_token,
            "obj_token": node.obj_token,
            "obj_type": node.data.get("obj_type"),
            "path": node.directory.relative_to(workspace).as_posix(),
            "children": [serialize(child) for child in node.children],
        }

    return serialize(root)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="Feishu Wiki root URL")
    parser.add_argument("--output-dir", default=".", help="Output directory below the current workspace")
    parser.add_argument("--workers", type=int, default=8, help="Parallel media downloads")
    args = parser.parse_args()

    workspace = Path.cwd().resolve()
    base = (workspace / args.output_dir).resolve()
    if workspace not in [base, *base.parents]:
        raise SystemExit("output directory must remain inside the current workspace")

    print("[1/4] 读取知识库页面树", flush=True)
    root, space_id = crawl(args.url)
    assign_directories(root, base)
    nodes = walk(root)
    print(f"      共 {len(nodes)} 个页面，space_id={space_id}", flush=True)

    print("[2/4] 导出 Markdown 与完整 XML", flush=True)
    all_assets: list[Asset] = []
    export_failures: list[dict[str, str]] = []
    for node in nodes:
        try:
            all_assets.extend(export_page(node))
        except Exception as exc:
            export_failures.append({"page": node.title, "error": str(exc)})
            print(f"[失败] {node.title}: {exc}", file=sys.stderr, flush=True)

    print(f"[3/4] 下载 {len(all_assets)} 个图片/附件/画板", flush=True)
    asset_failures: list[dict[str, str]] = []
    downloaded = 0
    skipped = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futures = [pool.submit(download_asset, asset, workspace) for asset in all_assets]
        for index, future in enumerate(concurrent.futures.as_completed(futures), start=1):
            asset, status, error = future.result()
            if status == "downloaded":
                downloaded += 1
            elif status == "skipped":
                skipped += 1
            else:
                assert asset.page.directory is not None
                asset_failures.append(
                    {
                        "page": asset.page.title,
                        "file": asset.output.relative_to(workspace).as_posix(),
                        "token": asset.token,
                        "error": error,
                    }
                )
            if index % 25 == 0 or index == len(all_assets):
                print(f"      素材进度 {index}/{len(all_assets)}", flush=True)

    print("[4/4] 写入清单并校验", flush=True)
    assert root.directory is not None
    manifest = {
        "source_url": args.url,
        "space_id": space_id,
        "page_count": len(nodes),
        "asset_count": len(all_assets),
        "assets_downloaded": downloaded,
        "assets_skipped": skipped,
        "export_failures": export_failures,
        "asset_failures": asset_failures,
        "tree": tree_manifest(root, workspace),
    }
    (root.directory / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    missing_pages = [
        node.title
        for node in nodes
        if node.directory is None
        or not (node.directory / "index.md").exists()
        or not (node.directory / "source.xml").exists()
    ]
    summary = {
        "pages_expected": len(nodes),
        "pages_missing": missing_pages,
        "assets_expected": len(all_assets),
        "assets_failed": len(asset_failures),
        "export_failures": len(export_failures),
    }
    print(json.dumps(summary, ensure_ascii=False, indent=2), flush=True)
    return 1 if missing_pages or export_failures or asset_failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
