---
title: 别再手调排版了，用 WorkBuddy 生成一份好看的简历
summary: 把经历和照片直接发给 WorkBuddy，用 Vibe Resume Skill 生成精美简历；以后补经历、换岗位，也能接着聊、接着改。
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

# 别再手调排版了，用 WorkBuddy 生成一份好看的简历

## 场景描述

去年秋招时，我用 PPT 手抠过一份简历。效果确实不错，但它有一个很现实的问题：只要多加一段经历，原本对齐的内容就会被挤乱，字号、行距和分页又得重新调一遍。

后来我把这套简历做成了 HTML，又整理成开源的 [Vibe Resume Skill](https://github.com/KevinYoung-Kw/vibe-resume-skill)。它想做的事情很简单：**让 AI 直接生成一份好看的简历，省下反复调整字号、间距和分页的时间。**

这次我在 WorkBuddy 里重新跑了一遍。从发出第一段经历，到后来再补进一段实习，简历也一点点变得更饱满。

为了方便公开展示，截图里的候选人、联系方式、团队和项目数据都是虚构的，证件照也由 AI 生成。

## 想要完成的任务

**用 WorkBuddy 生成一份精美、能直接投递的简历。**

这个 Skill 的使用方式很简单。你只需要在对话中提到它，并说明想做什么。比如，把自己的经历粘贴进聊天框，再拖入一张照片，一句话就可以开始生成简历。后续编辑也一样：哪里太空、哪里太挤，或者又想补哪段经历，直接告诉 AI，让它继续修改即可。

## 使用的 Skill

| Skill | 用来做什么 | 怎么安装 |
| --- | --- | --- |
| Vibe Resume Skill | 生成和更新简历，自动处理模板、排版和导出检查 | 把 [GitHub 仓库地址](https://github.com/KevinYoung-Kw/vibe-resume-skill) 发给 WorkBuddy |

## 前置条件

准备好两样东西就可以开始：一段真实的个人经历，以及一张想放进简历的照片。

没有现成文案也没关系，可以先把自己做过的事情直接讲给 WorkBuddy；已经有旧简历的话，也可以把旧简历发进来，让它在原版上继续改。

## 在 WorkBuddy 中的操作

### 第一步，把 Skill 发给 WorkBuddy

打开一个新任务，直接发送：

```text
帮我安装这个简历 Skill：
https://github.com/KevinYoung-Kw/vibe-resume-skill
```

![把 Vibe Resume Skill 的仓库地址发给 WorkBuddy](./assets/install-skill.png)

安装完成后，WorkBuddy 会直接告诉你可以开始写简历了。

![WorkBuddy 提示 Vibe Resume Skill 已经安装完成](./assets/skill-ready.png)

Skill 里现在有 12 套 A4 模板，每一套都有自己的结构、字号层级和阅读节奏。没有特别偏好时可以直接用默认款，也可以让 WorkBuddy 先把模板列出来再选。

![WorkBuddy 列出 Vibe Resume Skill 中的 12 套简历模板](./assets/template-list.png)

### 第二步，直接把经历和照片发进去

接下来，我把个人经历粘贴进去，附上一张照片，然后说：

```text
这是我的个人经历，我想投 AI 产品经理实习。

请使用 vibe-resume-skill 帮我生成一份简历。
不要编造没有的数据，尽量控制在一页。
```

![向 WorkBuddy 发送个人经历、照片和目标岗位](./assets/send-resume-materials.png)

WorkBuddy 用默认模板生成了第一版，右边可以直接看到完整简历。HTML、PDF 和预览图也一起准备好了。

![WorkBuddy 生成第一版简历并完成导出检查](./assets/first-resume-result.png)

### 第三步，不满意就继续说

第一版已经能看，但段落之间有点松。我没有自己去找 CSS，只说：

```text
段落与段落之间有些稀疏，帮我适当收紧一点，不要删内容。
```

后来我又多了一段经历，就把新内容继续贴进去：

```text
这是我最近新增的一段经历，帮我加到已有简历里。
不要删掉原来的内容，仍然尽量保持一页。
```

WorkBuddy 直接在原来的简历上继续改。新经历加进去了，旧内容也还在，整页没有被挤成密密麻麻的一团。

![补充经历、调整间距之后的最终简历](./assets/final-resume-result.png)

## 最终效果

新经历放进去以后，原本松散的页面刚好被撑了起来。底部留白从 `14.2%` 收到 `8.2%`，整份简历依然只有一页。文字没有溢出，照片保留了原来的颜色，各段经历也有了更顺畅的阅读节奏。

导出 PDF 以后，HTML 原稿还在。以后多一段实习、换一个岗位，或者拿到新 JD 想单独准备一版，我都可以回到原来的对话里继续改。排版会跟着内容一起调整，原稿始终留得住。

## 验收标准

交付前，我把 HTML 和 PDF 都打开，从姓名开始一行一行往下读。版式要有清楚的层级；PDF 要稳稳落在一页内，不能压线、重叠或裁掉文字；新经历要出现在正确的位置，旧内容也要完整保留。

日期、数据和联系方式同样需要逐项核对。所有信息都能在原始材料里找到，HTML 可以继续编辑，PDF 可以正常打开，到了这里，这份简历才算真正完成。

## 遇到的问题

第一版排得开，气息却有些散。段落之间留下了太多空隙，整张纸显得单薄。新经历加进来以后，页面又走向了另一个极端：内容多了，稍不留神就会靠缩小字号来硬塞。

我把看到的问题原样告诉 WorkBuddy：“这里太空了”“这两段太挤”“这段经历不能删”。它根据这些反馈继续调整间距和位置。每改一轮，我都会重新看一遍整页，因为简历读起来是否顺畅，最终仍然需要人来判断。

## 安全与限制

简历里有姓名、电话、邮箱和照片。为了公开这篇 Case，我把候选人、联系方式、团队和项目数据全部换成了虚构信息。

实际使用时，每一段经历和每一个数字都要由本人核实。页面装不下时，先删掉重复表述，再判断哪些经历与目标岗位关系更近；如果投递方向不同，分别准备版本会更清楚。

## 可以怎样复用

**第一次写简历时**，可以把零散的经历直接贴进对话，让 WorkBuddy 先整理出一版完整内容。

**手上已经有简历时**，把旧稿和新增经历一起发过去，它会沿用原来的风格继续编排。

**同时投递多个岗位时**，再把 JD 发进来，保留经历事实，重新安排顺序、关键词和篇幅。整个过程没有固定口令，把经历和目标说清楚，就可以沿着对话一直改下去。

## 找到我

我是水的离子积。Vibe Resume Skill 是我在一次次写简历、改简历的过程中慢慢磨出来的。你在使用时遇到问题，想聊聊模板，或者有新的点子，欢迎来找我。

- GitHub：[KevinYoung-Kw](https://github.com/KevinYoung-Kw)
- 公众号：**水的实践说**

<div class="vibe-resume-contact">
  <figure class="vibe-resume-contact__wechat">
    <img src="./assets/author-wechat.jpg" alt="水的离子积个人微信二维码">
    <figcaption>个人微信 · 水的离子积</figcaption>
  </figure>
  <figure class="vibe-resume-contact__account">
    <img src="./assets/official-account.png" alt="微信公众号水的实践说二维码">
    <figcaption>微信搜一搜 · 水的实践说</figcaption>
  </figure>
</div>

<style>
.vibe-resume-contact {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 24px;
}

.vibe-resume-contact figure {
  margin: 0;
  text-align: center;
}

.vibe-resume-contact img {
  display: block;
  width: 100%;
  margin: 0 auto 8px;
}

.vibe-resume-contact__wechat {
  flex: 0 0 210px;
}

.vibe-resume-contact__account {
  flex: 1;
}

.vibe-resume-contact figcaption {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

@media (max-width: 720px) {
  .vibe-resume-contact {
    flex-direction: column;
    align-items: stretch;
  }

  .vibe-resume-contact__wechat {
    flex-basis: auto;
    width: min(100%, 260px);
    margin: 0 auto !important;
  }
}
</style>
