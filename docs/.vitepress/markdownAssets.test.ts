import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const docsRoot = fileURLToPath(new URL("../", import.meta.url));
const markdownImage = /!\[[^\]]*\]\(([^)]+)\)/g;

const findMarkdownFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) return findMarkdownFiles(path);
    return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
  });

const isExternalAsset = (href: string) =>
  href.startsWith("#") ||
  href.startsWith("/") ||
  href.startsWith("//") ||
  /^[a-z][a-z\d+.-]*:/i.test(href);

describe("Markdown image assets", () => {
  it("uses valid POSIX paths that resolve to local files", () => {
    const invalidAssets: string[] = [];

    for (const markdownFile of findMarkdownFiles(docsRoot)) {
      const content = readFileSync(markdownFile, "utf8");

      for (const match of content.matchAll(markdownImage)) {
        const href = match[1].trim();
        if (isExternalAsset(href)) continue;

        const source = `${relative(docsRoot, markdownFile)} → ${href}`;
        if (href.includes("\\")) {
          invalidAssets.push(`${source} (use / instead of \\)`);
          continue;
        }

        const assetPath = resolve(
          dirname(markdownFile),
          decodeURIComponent(href),
        );
        if (!existsSync(assetPath)) {
          invalidAssets.push(`${source} (file not found)`);
        }
      }
    }

    expect(invalidAssets).toEqual([]);
  });
});
