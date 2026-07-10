import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

import { bluebookSidebar } from "./sidebar";
import { createPageDescription, createSeoHead } from "./seo";

const siteUrl = process.env.VITEPRESS_SITE_URL || "https://workbuddy-guide.pages.dev";

export default withMermaid(
  defineConfig({
    lang: "zh-CN",
    title: "WorkBuddy 实战蓝皮书",
    titleTemplate: ":title · WorkBuddy 实战蓝皮书",
    description: "从安装使用到 AI 工作系统：27 章 WorkBuddy 实战指南与团队落地方法。",
    cleanUrls: true,
    lastUpdated: true,
    srcExclude: ["**/source.md", "plans/**"],
    sitemap: {
      hostname: siteUrl,
    },
    transformPageData: (pageData, { siteConfig }) => ({
      description: createPageDescription(siteConfig.srcDir, pageData),
    }),
    transformHead: (context) => createSeoHead(siteUrl, context),
    head: [
      ["meta", { name: "theme-color", content: "#d8f238" }],
      ["meta", { name: "author", content: "WorkBuddy Guide Contributors" }],
      [
        "meta",
        {
          name: "keywords",
          content:
            "WorkBuddy,WorkBuddy 教程,AI Agent,AI 工作系统,Skills,MCP,自动化,多智能体,职场 AI",
        },
      ],
    ],
    markdown: {
      image: {
        lazyLoading: true,
      },
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    mermaid: {
      theme: "base",
      themeVariables: {
        primaryColor: "#eef6d1",
        primaryTextColor: "#12140f",
        primaryBorderColor: "#355e18",
        lineColor: "#62675e",
        secondaryColor: "#f5f7f0",
        tertiaryColor: "#ffffff",
      },
    },
    themeConfig: {
      siteTitle: "WorkBuddy Guide",
      nav: [
        { text: "首页", link: "/" },
        { text: "开始阅读", link: "/bluebook/" },
        { text: "阅读指南", link: "/reading-guide" },
        { text: "参与共创", link: "/community/contributing" },
      ],
      sidebar: bluebookSidebar,
      socialLinks: [
        { icon: "github", link: "https://github.com/AlephMuYe/WorkBuddyGuide" },
      ],
      search: {
        provider: "local",
      },
      outline: {
        level: [2, 3],
        label: "本页目录",
      },
      docFooter: {
        prev: "上一篇",
        next: "下一篇",
      },
      lastUpdated: {
        text: "最后更新",
        formatOptions: {
          dateStyle: "medium",
          timeStyle: "short",
        },
      },
      editLink: {
        pattern: "https://github.com/AlephMuYe/WorkBuddyGuide/edit/main/docs/:path",
        text: "在 GitHub 上改进此页",
      },
      footer: {
        message:
          '以真实任务为主线的 WorkBuddy 社区实战读本 · Pixel icons by <a href="https://pixeliconlibrary.com/" target="_blank" rel="noreferrer">HackerNoon</a>',
        copyright: "Copyright © 2026 WorkBuddy Guide Contributors",
      },
    },
  }),
);
