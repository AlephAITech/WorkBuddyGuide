import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import type { HeadConfig, PageData, TransformContext } from "vitepress";

const SITE_NAME = "WorkBuddy 实战蓝皮书";
const SITE_ALTERNATE_NAME = "WorkBuddy Guide";
const ORGANIZATION_NAME = "WorkBuddy Guide Contributors";
const GITHUB_URL = "https://github.com/AlephAITech/WorkBuddyGuide";
const DEFAULT_DESCRIPTION =
  "从安装使用到 AI 工作系统：27 章 WorkBuddy 实战指南与团队落地方法。";

function cleanPagePath(page: string): string {
  if (page === "index.md") return "/";
  if (page.endsWith("/index.md")) {
    return `/${page.slice(0, -"index.md".length)}`;
  }

  return `/${page.replace(/\.md$/, "")}`;
}

function absolutePageUrl(siteUrl: string, page: string): string {
  return new URL(cleanPagePath(page), `${siteUrl}/`).href;
}

function stripMarkdown(value: string): string {
  return value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, codePoint: string) =>
      String.fromCodePoint(Number(codePoint)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, codePoint: string) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16)),
    );
}

function truncateDescription(value: string, maxLength = 155): string {
  const characters = Array.from(value);
  if (characters.length <= maxLength) return value;

  const shortened = characters.slice(0, maxLength).join("");
  const punctuationIndex = Math.max(
    shortened.lastIndexOf("。"),
    shortened.lastIndexOf("；"),
    shortened.lastIndexOf("，"),
  );

  return `${
    punctuationIndex >= Math.floor(maxLength * 0.65)
      ? shortened.slice(0, punctuationIndex)
      : shortened
  }…`;
}

function extractDescription(markdown: string, fallback: string): string {
  const mainStart = markdown.indexOf("<main");
  const mainEnd = mainStart >= 0 ? markdown.indexOf("</main>", mainStart) : -1;
  const pageContent =
    mainStart >= 0 && mainEnd > mainStart
      ? markdown.slice(mainStart, mainEnd)
      : markdown;
  const htmlParagraphs = Array.from(
    pageContent.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi),
    (match) => decodeHtmlEntities(stripMarkdown(match[1])),
  ).filter((paragraph) => Array.from(paragraph).length >= 12);

  if (htmlParagraphs.length > 0) {
    const selected: string[] = [];
    for (const paragraph of htmlParagraphs) {
      selected.push(paragraph);
      if (Array.from(selected.join(" ")).length >= 90) break;
    }

    return truncateDescription(selected.join(" "));
  }

  const content = markdown.replace(
    /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]+/,
    "",
  );
  const candidates: string[] = [];

  for (const block of content.split(/\r?\n\s*\r?\n/)) {
    const trimmed = block.trim();
    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("```") ||
      trimmed.startsWith("~~~") ||
      trimmed.startsWith("import ") ||
      trimmed.startsWith("export ") ||
      trimmed.startsWith("<!--") ||
      trimmed.startsWith("<") ||
      trimmed.startsWith("|") ||
      /^[-*+]\s/.test(trimmed) ||
      /^\d+[.)]\s/.test(trimmed)
    ) {
      continue;
    }

    const plainText = stripMarkdown(trimmed);
    if (Array.from(plainText).length < 12) continue;

    candidates.push(plainText);
    if (Array.from(candidates.join(" ")).length >= 90) break;
  }

  return truncateDescription(candidates.join(" ") || fallback || DEFAULT_DESCRIPTION);
}

function breadcrumbName(segment: string): string {
  const labels: Record<string, string> = {
    bluebook: "蓝皮书",
    community: "社区",
    "reading-guide": "阅读指南",
  };

  return labels[segment] || segment.replace(/[-_]/g, " ");
}

function createBreadcrumbs(
  siteUrl: string,
  page: string,
  pageTitle: string,
  canonicalUrl: string,
) {
  const path = cleanPagePath(page).replace(/^\/|\/$/g, "");
  if (!path) return null;

  const segments = path.split("/");
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "首页",
      item: new URL("/", `${siteUrl}/`).href,
    },
    ...segments.map((segment, index) => {
      const isLast = index === segments.length - 1;
      const parentPath = `/${segments.slice(0, index + 1).join("/")}/`;

      return {
        "@type": "ListItem",
        position: index + 2,
        name: isLast ? pageTitle : breadcrumbName(segment),
        item: isLast ? canonicalUrl : new URL(parentPath, `${siteUrl}/`).href,
      };
    }),
  ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement,
  };
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createPageDescription(
  sourceDirectory: string,
  pageData: PageData,
): string | undefined {
  if (pageData.description || pageData.isNotFound || !pageData.filePath) {
    return pageData.description || undefined;
  }

  const fallback = `${pageData.title}：${DEFAULT_DESCRIPTION}`;

  try {
    const markdown = readFileSync(
      resolve(sourceDirectory, pageData.filePath),
      "utf8",
    );
    return extractDescription(markdown, fallback);
  } catch {
    return truncateDescription(fallback);
  }
}

export function createSeoHead(
  siteUrl: string,
  context: TransformContext,
): HeadConfig[] {
  const { page, pageData, title, content } = context;

  if (pageData.isNotFound) {
    return [
      ["meta", { name: "robots", content: "noindex, nofollow" }],
    ];
  }

  const canonicalUrl = absolutePageUrl(siteUrl, page);
  const socialImageUrl = new URL("/og/workbuddy-guide.png", `${siteUrl}/`).href;
  const description = pageData.description
    ? truncateDescription(pageData.description)
    : extractDescription(
        content,
        `${pageData.title}：${context.description || DEFAULT_DESCRIPTION}`,
      );
  const isHome = page === "index.md";
  const isBluebookPage = page.startsWith("bluebook/");
  const modifiedTime = pageData.lastUpdated
    ? new Date(pageData.lastUpdated).toISOString()
    : undefined;

  const organization = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: ORGANIZATION_NAME,
    url: `${siteUrl}/`,
    sameAs: [GITHUB_URL],
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "zh-CN",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
  const breadcrumbs = createBreadcrumbs(
    siteUrl,
    page,
    pageData.title,
    canonicalUrl,
  );
  const pageEntity = isHome
    ? null
    : {
        "@type": isBluebookPage ? "Article" : "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageData.title,
        ...(isBluebookPage ? { headline: pageData.title } : {}),
        description,
        inLanguage: "zh-CN",
        isPartOf: { "@id": `${siteUrl}/#website` },
        breadcrumb: breadcrumbs
          ? { "@id": `${canonicalUrl}#breadcrumb` }
          : undefined,
        ...(isBluebookPage
          ? {
              mainEntityOfPage: canonicalUrl,
              image: [socialImageUrl],
              author: { "@id": `${siteUrl}/#organization` },
              publisher: { "@id": `${siteUrl}/#organization` },
            }
          : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
      };
  const jsonLdGraph = [organization, website, pageEntity, breadcrumbs].filter(
    Boolean,
  );

  const head: HeadConfig[] = [
    ["meta", { name: "description", content: description }],
    [
      "meta",
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
    ],
    ["link", { rel: "canonical", href: canonicalUrl }],
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:site_name", content: SITE_NAME }],
    ["meta", { property: "og:type", content: isBluebookPage ? "article" : "website" }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:url", content: canonicalUrl }],
    ["meta", { property: "og:image", content: socialImageUrl }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "1280" }],
    ["meta", { property: "og:image:height", content: "720" }],
    ["meta", { property: "og:image:alt", content: "WorkBuddy 实战蓝皮书首页预览" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image", content: socialImageUrl }],
    ["meta", { name: "twitter:image:alt", content: "WorkBuddy 实战蓝皮书首页预览" }],
    [
      "script",
      { type: "application/ld+json" },
      serializeJsonLd({ "@context": "https://schema.org", "@graph": jsonLdGraph }),
    ],
  ];

  if (modifiedTime && isBluebookPage) {
    head.push([
      "meta",
      { property: "article:modified_time", content: modifiedTime },
    ]);
  }

  return head;
}
