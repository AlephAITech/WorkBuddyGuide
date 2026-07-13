---
title: 帮你解决 WorkBuddy 使用场景问题
titleTemplate: false
description: 如果你不知道如何用 WorkBuddy 解决真实工作问题，可以提交场景问卷。我们会评估需求、联系沟通，并将具有复用价值的解决方案制作成开源 Case。
breadcrumbTitle: 帮你解决
aside: false
outline: false
pageClass: help-you-page
---

<div class="help-hero">
  <div class="help-hero__copy">
    <p class="help-pixel-label">SCENARIO SUPPORT · OPEN CASES</p>
    <h1>有工作场景，不知道怎么用 WorkBuddy 解决？</h1>
    <p class="help-hero__lead">把你的真实问题告诉我们。我们会阅读每一份场景问卷，评估 WorkBuddy 是否能够解决；如果需要补充信息，我们会联系你进一步沟通。</p>
    <p>具有代表性和复用价值的问题，我们会尝试做成完整 Case，写清使用的 Skill、操作过程、任务描述和最终效果，并开源到社区案例集，帮助更多遇到同类问题的人。</p>
    <div class="help-hero__actions">
      <a class="help-button help-button--primary" href="#scenario-survey">扫码填写问卷</a>
      <a class="help-button" href="/cases/">查看开源 Case</a>
    </div>
  </div>

  <div id="scenario-survey" class="help-survey-card">
    <div class="help-survey-card__heading">
      <span>01</span>
      <div>
        <strong>WorkBuddy 场景收集调查问卷</strong>
        <small>扫码后填写你的真实需求</small>
      </div>
    </div>
    <a href="/help/workbuddy-scenario-survey.png" target="_blank" rel="noreferrer" aria-label="查看 WorkBuddy 场景收集调查问卷二维码大图">
      <img src="/help/workbuddy-scenario-survey.png" alt="WorkBuddy 场景收集调查问卷二维码" loading="eager">
    </a>
    <p>使用手机扫码填写；如果你正在手机上阅读，可以点击图片查看大图后长按识别。</p>
  </div>
</div>

<section class="help-process" aria-labelledby="help-process-title">
  <p class="help-pixel-label">HOW IT WORKS</p>
  <h2 id="help-process-title">提交之后，我们会怎么做</h2>
  <div class="help-process__grid">
    <article>
      <span>01</span>
      <h3>理解你的场景</h3>
      <p>了解你现在怎样工作、卡在哪里、已有输入以及希望得到什么结果。</p>
    </article>
    <article>
      <span>02</span>
      <h3>评估解决路径</h3>
      <p>判断 WorkBuddy 是否适合处理，并梳理可能需要的 Skill、权限和交付方式。</p>
    </article>
    <article>
      <span>03</span>
      <h3>联系与验证</h3>
      <p>如果场景需要更多信息，我们会通过问卷中留下的联系方式与你确认，并验证方案。</p>
    </article>
    <article>
      <span>04</span>
      <h3>制作开源 Case</h3>
      <p>具有通用价值的解决方案会被整理成可复现 Case，审核后公开到社区案例集。</p>
    </article>
  </div>
</section>

<section class="help-submit-guide" aria-labelledby="help-submit-title">
  <div>
    <p class="help-pixel-label">WHAT TO PREPARE</p>
    <h2 id="help-submit-title">怎样描述问题，更容易得到帮助</h2>
  </div>
  <ul>
    <li><strong>真实场景：</strong>你在什么岗位或任务中遇到了问题。</li>
    <li><strong>当前做法：</strong>现在需要哪些步骤，大概花多少时间。</li>
    <li><strong>输入资料：</strong>通常会用到哪些文件、网页、系统或数据。</li>
    <li><strong>期望结果：</strong>希望 WorkBuddy 最终交付什么，以及怎样算完成。</li>
    <li><strong>安全边界：</strong>是否涉及账号权限、敏感数据、文件修改或对外发布。</li>
  </ul>
</section>

<div class="help-note">
  <strong>关于隐私与联系</strong>
  <p>请不要在问卷中提交密码、密钥、客户隐私或不方便公开的内部资料。我们只会在需要补充信息或可以推进解决方案时，通过你主动留下的联系方式与你沟通。</p>
</div>

<style>
.help-you-page .VPDoc .container {
  max-width: 1280px;
}

.help-you-page .VPDoc .content,
.help-you-page .VPDoc .content-container {
  max-width: none;
}

.help-hero {
  display: flex;
  flex-direction: column;
  gap: 42px;
  padding: 34px 0 56px;
}

.help-hero__copy {
  width: 100%;
}

.help-pixel-label {
  margin: 0 0 14px !important;
  color: var(--vp-c-brand-1);
  font-family: "Silkscreen", monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
}

.help-hero h1 {
  max-width: 760px;
  margin: 0 0 28px;
  font-size: clamp(42px, 6vw, 72px);
  line-height: 1.08;
  letter-spacing: -0.04em;
  overflow-wrap: normal;
  word-break: keep-all;
}

.help-hero h1::after {
  display: block;
  width: 92px;
  height: 9px;
  margin-top: 24px;
  background: #d8f238;
  content: "";
}

.help-hero__copy > p:not(.help-pixel-label) {
  max-width: 720px;
  color: var(--vp-c-text-2);
  font-size: 17px;
  line-height: 1.85;
}

.help-hero__lead {
  color: var(--vp-c-text-1) !important;
  font-size: 20px !important;
  font-weight: 700;
}

.help-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.help-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid var(--vp-c-text-1);
  border-radius: 4px;
  color: var(--vp-c-text-1) !important;
  font-weight: 700;
  text-decoration: none !important;
}

.help-button--primary {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg) !important;
}

.help-survey-card {
  width: min(100%, 560px);
  margin: 0 auto;
  padding: 20px;
  border: 2px solid var(--vp-c-text-1);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  box-shadow: 12px 12px 0 #d8f238;
}

.help-survey-card__heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.help-survey-card__heading > span {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  flex: 0 0 auto;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  font-family: "Silkscreen", monospace;
}

.help-survey-card__heading div {
  display: grid;
  gap: 2px;
}

.help-survey-card__heading strong {
  font-size: 16px;
}

.help-survey-card__heading small,
.help-survey-card > p {
  color: var(--vp-c-text-3);
}

.help-survey-card a {
  display: block;
  overflow: hidden;
  border-radius: 10px;
  background: #eef8ff;
}

.help-survey-card img {
  display: block;
  width: 100%;
  max-height: 560px;
  margin: 0;
  object-fit: contain;
}

.help-survey-card > p {
  margin: 14px 2px 0;
  font-size: 13px;
  line-height: 1.6;
  text-align: center;
}

.help-process {
  padding: 52px 0;
  border-top: 2px solid var(--vp-c-text-1);
}

.help-process h2,
.help-submit-guide h2 {
  margin: 0 0 30px;
  border: 0;
  padding: 0;
  font-size: clamp(28px, 4vw, 42px);
}

.help-process__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.help-process article {
  min-height: 220px;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
}

.help-process article > span {
  color: var(--vp-c-brand-1);
  font-family: "Silkscreen", monospace;
  font-size: 13px;
}

.help-process h3 {
  margin: 44px 0 10px;
  font-size: 19px;
}

.help-process article p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.help-submit-guide {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 52px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.help-submit-guide > div {
  width: 100%;
}

.help-submit-guide h2 {
  max-width: 760px;
}

.help-submit-guide ul {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.help-submit-guide li {
  padding: 14px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
}

.help-submit-guide li strong {
  color: var(--vp-c-text-1);
}

.help-note {
  margin: 12px 0 36px;
  padding: 24px;
  border-left: 5px solid #d8f238;
  background: var(--vp-c-bg-soft);
}

.help-note p {
  margin: 7px 0 0;
  color: var(--vp-c-text-2);
}

@media (max-width: 900px) {
  .help-process__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .help-hero {
    gap: 36px;
    padding-top: 18px;
  }

  .help-hero h1 {
    font-size: 40px;
  }

  .help-hero__lead {
    font-size: 18px !important;
  }

  .help-process__grid {
    grid-template-columns: 1fr;
  }

  .help-process article {
    min-height: 190px;
  }

  .help-submit-guide {
    gap: 12px;
  }

  .help-survey-card {
    box-shadow: 7px 7px 0 #d8f238;
  }
}
</style>
