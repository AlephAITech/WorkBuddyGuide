---
title: 提交 WorkBuddy 社区案例
description: 按统一格式提交真实、可复现的 WorkBuddy Case，合并后自动显示在社区案例集中。
breadcrumbTitle: Case 投稿指南
aside: false
outline: false
---

# 提交 WorkBuddy 社区案例

社区案例集用于收录大家已经在 WorkBuddy 中实际跑通过的任务。案例合并后会自动出现在[社区案例集](/cases/)；经过进一步复现和编辑的经典任务，未来可能进入蓝皮书正文。

## 一个合格的 Case 必须回答什么

1. **场景是什么**：谁在什么情况下遇到了什么问题。
2. **使用了哪些 Skills**：每个 Skill 的用途、来源和所需权限。
3. **在 WorkBuddy 中怎样执行**：输入、关键步骤和任务指令。
4. **最终呈现了什么效果**：交付物、截图、GIF 或其他结果证明。
5. **怎样判断任务完成**：明确且可以复查的验收标准。

::: warning 提交前先检查是否重复
请先搜索[社区案例集](/cases/)和[蓝皮书目录](/bluebook/)，自行确认场景或任务是否已经存在。相同目标、相同流程或仅更换输入数据的内容，建议直接补充现有案例；如果新 Case 使用了明显不同的 Skill、方法或交付方式，请在 PR 中说明差异。
:::

## 提交步骤

1. 搜索案例集和蓝皮书，确认任务没有重复。
2. Fork [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) 仓库。
3. 复制 `.github/CASE_TEMPLATE.md` 中的案例模板。
4. 新建 `docs/cases/submissions/<case-slug>/index.md`。
5. 将截图等素材放进同目录的 `assets/` 文件夹。
6. 本地运行 `npm install` 和 `npm run docs:build`。
7. 提交 Pull Request，并选择 Case 专用 PR 模板。

推荐使用简短的英文小写目录名，例如：

```text
docs/cases/submissions/daily-ai-news/
├── index.md
└── assets/
    ├── cover.png
    └── workbuddy-result.png
```

你不需要修改案例集合首页。网站构建时会自动读取所有 Case 的标题、分类、Skills、作者和简介。

## Frontmatter 字段

每个 Case 的 `index.md` 必须以这些字段开头：

```yaml
---
title: 用 WorkBuddy 自动整理每日 AI 资讯
summary: 自动收集多个来源的信息并生成每日简报
author: your-github-name
date: "2026-07-13"
category: 自动化
difficulty: 中等
skills:
  - 浏览器
  - 飞书文档
tags:
  - AI 资讯
  - 信息整理
---
```

其中 `title`、`summary`、`author`、`date`、`category`、`difficulty` 和 `skills` 是必填项。缺少必填字段时，网站构建会失败，避免不完整的案例被发布。

## 内容结构

正文至少包含：

- 场景描述
- 想要完成的任务
- 使用的 Skill
- 前置条件
- 在 WorkBuddy 中的操作
- 提示词或任务指令
- 在 WorkBuddy 中的效果
- 验收标准
- 遇到的问题
- 安全与限制
- 可以怎样复用

## 图片和结果证明

- 优先提供 WorkBuddy 执行过程和最终交付物的截图。
- 图片使用有意义的英文文件名，避免 `image-1.png`。
- 删除姓名、手机号、账号、内部地址、密钥和其他敏感信息。
- 不要提交无权公开的客户资料、企业数据或版权内容。
- 在保证文字清晰的前提下压缩图片体积。

## 审核与收录

社区案例主要审核真实性、完整性、安全性和可读性，不要求一开始就达到蓝皮书正式章节的编辑水平。

我们会持续观察案例的可复现性、代表性和读者反馈。进入蓝皮书正文前，编辑团队会再次验证并与原作者沟通，正式章节会保留作者署名和原始 Case 链接。
