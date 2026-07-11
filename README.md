<p align="center">
  <a href="https://workbuddy.homes/">
    <img src="./assets/workbuddy-guide-banner.png" alt="WorkBuddy 实战蓝皮书：从第一项任务，到一支 AI 团队" width="100%">
  </a>
</p>

<h1 align="center">WorkBuddy 实战蓝皮书</h1>

<p align="center"><strong>从第一项任务，到一支 AI 团队</strong></p>

<p align="center">
  简体中文 · <a href="./README_en.md">English</a> ·
  <a href="https://workbuddy.homes/">在线阅读</a> ·
  <a href="./docs/reading-guide.md">阅读指南</a> ·
  <a href="./CONTRIBUTING.md">参与共创</a>
</p>

> 这不是官方功能说明书的改写，而是一本以真实任务为主线的实战读本。先完成安装和第一项工作，再进入移动办公、知识管理、专业诊断、内容自动化和多 Agent 团队，最后把一次成功变成团队可复用的工作系统。

## 在线阅读

推荐访问 **[workbuddy.homes](https://workbuddy.homes/)** 阅读。网站提供完整侧边栏、全文搜索、章节目录、深色模式、流程图和移动端适配。

GitHub 适合了解项目和参与贡献；真正阅读蓝皮书时，网站体验更完整。

## 你会在这里看到什么

| 部分 | 内容 |
| --- | --- |
| 第一篇 · 使用手册 | 下载、安装、界面、第一个任务、Skill、连接器、API 和自动化 |
| 第二篇 · 案例篇 | 办公、文件、远程、资讯、知识、会议、投资、视频、自媒体和 GEO |
| 第三篇 · 进阶篇 | 打造 Skill、多 Agent 系统设计、自动化可靠性 |
| 第四篇 · 岗位与行业 | 不同岗位的使用路线和行业工作流 |
| 附录 | 常用指令模板与场景速查表 |

## 推荐阅读方式

- **第一次使用**：从[第 1 章](./docs/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/第%201%20章%20初识%20WorkBuddy/index.md)开始，按顺序完成第一篇。
- **已经有具体任务**：直接进入第二篇对应案例，跑通后再阅读第三篇。
- **准备团队落地**：重点阅读第三、四篇，并记录权限边界、验收标准和失败回退。

更完整的路线见[如何阅读这本蓝皮书](./docs/reading-guide.md)。

## 本地阅读与开发

需要 Node.js 20～24，推荐 Node.js 22。

```bash
npm install
npm run dev
```

本地构建：

```bash
npm run docs:build
npm run docs:preview
```

## 参与共创

欢迎贡献：

- 错别字、失效链接和过时信息修正。
- 可复现的真实工作案例。
- Skill、连接器、API 和自动化实践。
- 岗位路线图与行业工作流。
- 网站导航、搜索、样式和无障碍体验改进。

请先阅读[贡献指南](./CONTRIBUTING.md)。如果暂时不想改代码，也可以直接提交 [Issue](https://github.com/AlephAITech/WorkBuddyGuide/issues)。

## 目录结构

```text
WorkBuddyGuide
├─ docs/
│  ├─ .vitepress/       # 网站配置与主题
│  ├─ bluebook/         # 蓝皮书正文、图片、视频
│  ├─ community/        # 共创说明
│  └─ index.md          # 网站首页
├─ scripts/             # 内容同步工具
├─ CONTRIBUTING.md
├─ README.md
└─ README_en.md
```

## 部署

本站使用 **VitePress + Cloudflare Pages + GitHub**。Cloudflare Pages 连接本仓库的 `main` 分支后，每次推送都会自动构建部署。配置见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 作者们

感谢以下作者共同参与《WorkBuddy 蓝皮书》的创作与维护。点击名片可查看原图并扫描二维码。

<p align="center">
  <a href="./assets/authors/jia-mu-wei-lai-pai.png"><img src="./assets/authors/jia-mu-wei-lai-pai.png" alt="甲木未来派" width="48%"></a>
  <a href="./assets/authors/mo-yu-xiao-li.png"><img src="./assets/authors/mo-yu-xiao-li.png" alt="摸鱼小李" width="48%"></a>
</p>

<p align="center">
  <a href="./assets/authors/dai-shu-di-ai-ke-zhan.png"><img src="./assets/authors/dai-shu-di-ai-ke-zhan.png" alt="袋鼠帝AI客栈" width="48%"></a>
  <a href="./assets/authors/cang-he.png"><img src="./assets/authors/cang-he.png" alt="苍何" width="48%"></a>
</p>

<p align="center">
  <a href="./assets/authors/liu-cong-nlp.png"><img src="./assets/authors/liu-cong-nlp.png" alt="刘聪NLP" width="48%"></a>
</p>

## 声明

本项目是社区维护的 WorkBuddy 实战知识库。涉及产品功能、界面、价格、可用范围和安全策略等时效性信息时，请以 WorkBuddy 官方渠道为准。
