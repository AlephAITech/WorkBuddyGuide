#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_consistency.py —— 校验 create_databases.py 的表定义与模板 FIELD_TYPE 一致

背景：曾出现脚本建「标题/日期/备注」，而模板 FILE 需要「标题/分类/年度/备注/上传日期」，
导致用户按脚本建完表，附件区写入找不到字段而报错。
本脚本把模板里的字段名直接抽出来逐项比对，让这类不一致在打包前就被发现。

用法：
    python3 scripts/check_consistency.py [--template <模板路径>]

退出码：0 一致；1 不一致。
"""

from __future__ import annotations

import argparse
import io
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DEFAULT_TEMPLATE = HERE.parent / "assets" / "workplan.template.html"

# 模板 FIELD_TYPE 的 key → 本脚本 TABLES 的 slot 名
KEY_TO_SLOT = {
    "journal": "JOURNAL",
    "weekly": "WEEKLY",
    "monthly": "MONTHLY",
    "annual": "ANNUAL",
    "idea": "IDEA",
    "file": "FILE",
}


def load_template_fields(template: Path) -> dict[str, list[str]]:
    """从模板里抽出 FIELD_TYPE 各 key 的字段名列表。"""
    text = io.open(template, encoding="utf-8").read()
    m = re.search(r"var FIELD_TYPE\s*=\s*\{[\s\S]*?\n\};", text)
    if not m:
        raise SystemExit(f"❌ 未在模板中找到 FIELD_TYPE：{template}")

    out: dict[str, list[str]] = {}
    for line in m.group(0).splitlines():
        st = line.strip()
        if st.startswith("/*") or not st:
            continue
        km = re.match(r"(\w+):\s*\{(.*)\}", st)
        if not km:
            continue
        out[km.group(1)] = re.findall(r"'([^']+)'\s*:", km.group(2))
    return out


def load_script_fields() -> dict[str, list[str]]:
    """从 create_databases.py 里抽出 TABLES 各 slot 的字段名列表。"""
    import importlib.util

    spec = importlib.util.spec_from_file_location("_cd", HERE / "create_databases.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return {
        slot: [next(iter(p)) for p in cfg["properties"]]
        for slot, cfg in mod.TABLES.items()
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--template", default=str(DEFAULT_TEMPLATE), help="模板 HTML 路径")
    args = ap.parse_args()

    tpl_path = Path(args.template)
    if not tpl_path.exists():
        print(f"❌ 模板不存在：{tpl_path}", file=sys.stderr)
        return 1

    try:
        tpl = load_template_fields(tpl_path)
        scr = load_script_fields()
    except SystemExit as e:
        print(e, file=sys.stderr)
        return 1

    print(f"模板：{tpl_path}")
    print("逐项核对建表脚本与模板 FIELD_TYPE：\n")

    bad = 0
    for key, slot in KEY_TO_SLOT.items():
        want = tpl.get(key)
        if not want:
            print(f"  WARN 模板 FIELD_TYPE 里没有 {key}")
            continue
        got = scr.get(slot, [])
        missing = [f for f in want if f not in got]
        extra = [f for f in got if f not in want]

        if missing or extra:
            bad += 1
            print(f"  ❌ {slot} ({key})")
            print(f"     模板需要: {want}")
            print(f"     脚本会建: {got}")
            if missing:
                print(f"     缺少字段: {missing}")
            if extra:
                print(f"     多余字段: {extra}")
        else:
            print(f"  ✅ {slot:<8} {len(want)} 个字段一致")

    if bad:
        print(f"\n结论：{bad} 张表不一致，请修正 create_databases.py 的 TABLES 定义。")
        return 1
    print("\n结论：全部一致 ✅")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())