---
title: 把经历发给 WorkBuddy，直接生成一份好看的简历
summary: 安装 Vibe Resume Skill，发出个人经历和照片，就能生成一页简历；后续补经历、换岗位，也可以继续在对话里修改。
author: KevinYoung-Kw
date: "2026-07-13"
category: 职场效率
difficulty: 入门
aside: false
outline: false
skills:
  - Vibe Resume Skill
tags:
  - 简历
  - 求职
  - HTML
  - PDF
  - Skill 安装
---

# 把经历发给 WorkBuddy，直接生成一份好看的简历

## 这个案例解决什么问题

去年秋招时，我用 PPT 一点点排过一份简历。做出来很好看，修改起来却很麻烦。多加一段经历，后面的内容就要跟着移动；文字多了一行，字号、间距和分页也要重新调整。

后来我把这套简历做成 HTML，又整理成了 [Vibe Resume Skill](https://github.com/KevinYoung-Kw/vibe-resume-skill)。把它安装到 WorkBuddy 以后，写简历就变成了一件很直接的事：发出自己的经历和照片，告诉 AI 想投什么岗位，它会生成完整简历。以后有新经历，继续发给它修改就行。

下面是我在 WorkBuddy 中完整跑过的一次过程。

## 开始前准备什么

我准备了三样内容：

- 一段个人经历，包括教育、实习和项目。
- 一张准备放进简历的照片。
- 想投递的岗位，例如“AI 产品经理实习”。

为了公开展示，这个案例使用的是虚构候选人和虚构经历。

## 第一步：安装 Vibe Resume Skill

在 WorkBuddy 中新建任务，把下面这句话发出去：

```text
帮我安装这个简历 Skill：
https://github.com/KevinYoung-Kw/vibe-resume-skill
```

![在 WorkBuddy 中安装 Vibe Resume Skill](./assets/install-skill.png)

安装完成后，WorkBuddy 会提示 Skill 已经可以使用。

![Vibe Resume Skill 安装完成](./assets/skill-ready.png)

Skill 里有 12 套简历模板。可以让 WorkBuddy 把模板列出来，挑一套自己喜欢的；如果不想选，直接使用默认模板也可以。

![WorkBuddy 列出 12 套简历模板](./assets/template-list.png)

## 第二步：发送经历和照片

我把个人经历粘贴进对话，附上照片，然后发送：

```text
这是我的个人经历，我想投 AI 产品经理实习。

请使用 vibe-resume-skill 帮我生成一份简历。
不要编造没有的数据，尽量控制在一页。
```

![把个人经历、照片和目标岗位发给 WorkBuddy](./assets/send-resume-materials.png)

WorkBuddy 读完材料后，开始整理内容和排版。第一版生成完成时，右侧可以直接预览整份简历，同时还会得到 HTML、PDF 和预览图。

![WorkBuddy 生成第一版简历](./assets/first-resume-result.png)

## 第三步：继续修改

第一版的内容已经完整，不过段落之间有些松。我直接告诉 WorkBuddy：

```text
段落与段落之间有些稀疏，帮我适当收紧一点，不要删内容。
```

后来又多了一段实习经历，我继续把内容贴进同一个对话：

```text
这是我最近新增的一段经历，帮我加到已有简历里。
不要删掉原来的内容，仍然尽量保持一页。
```

WorkBuddy 在原来的简历上加入新经历，并重新调整了整页间距。修改前后的内容都保留在同一个任务里，不需要重新制作一份简历。

![增加经历并调整排版后的简历](./assets/final-resume-result.png)

## 最后得到什么

这次一共生成了三份文件：

- HTML：可以继续编辑，之后增加经历时还能接着修改。
- PDF：保持一页，可以直接用于投递。
- 预览图：方便快速查看整页效果。

最终版本加入了新的实习经历，页面依然保持一页，文字和照片都能完整显示。经历、日期和数据也与提供的材料一致。

## 还可以怎么用

如果还没有简历，可以直接把零散经历发给 WorkBuddy，让它整理并生成第一版。

如果已经有 Word、PDF 或 HTML 简历，可以把旧简历和新增经历一起发过去，让它在原版上修改。

如果准备投递不同岗位，可以再附上岗位 JD，让 WorkBuddy 分别调整经历顺序和内容重点。

## 使用时注意

AI 生成完成后，记得核对姓名、联系方式、经历时间和数据。涉及公司内部信息的内容，发送前先做脱敏处理。

## 了解更多

- GitHub：[KevinYoung-Kw/vibe-resume-skill](https://github.com/KevinYoung-Kw/vibe-resume-skill)
- 文章：[《别花几千改简历了，我开源了个 Skill 给你》](https://mp.weixin.qq.com/s/gdUR5l3h9IrM9g1geL69aA)
