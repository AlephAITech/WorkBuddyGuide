<template>
  <main class="wb-home">
    <section class="wb-hero" aria-labelledby="wb-hero-title">
      <div class="wb-hero__stage">
        <div class="wb-hero__copy">
          <p class="wb-pixel-label">OPEN-SOURCE · 27 CHAPTERS · 2026</p>
          <h1 id="wb-hero-title">从第一项任务，<br />到一支 AI 团队</h1>
          <p class="wb-hero__summary">
            一套以真实工作为主线的 WorkBuddy 实践路径。<br />
            先用起来，再把一次成功沉淀为可复用的工作系统。
          </p>
          <div class="wb-hero__actions">
            <a class="wb-button wb-button--primary" href="/bluebook/">
              <span>开始阅读</span>
              <i class="hn hn-arrow-right" aria-hidden="true"></i>
            </a>
            <a class="wb-button wb-button--outline" href="/reading-guide">查看阅读路线</a>
          </div>
        </div>

        <div class="wb-hero__art" aria-label="WorkBuddy 像素图标组合">
          <span class="wb-hero__monogram">WB_</span>
          <span class="wb-icon-card wb-icon-card--buddy">
            <i class="hn hn-face-grin" aria-hidden="true"></i>
          </span>
          <span class="wb-icon-card wb-icon-card--book">
            <i class="hn hn-book" aria-hidden="true"></i>
          </span>
          <span class="wb-icon-card wb-icon-card--flow">
            <i class="hn hn-sitemap" aria-hidden="true"></i>
          </span>
          <span class="wb-icon-card wb-icon-card--work">
            <i class="hn hn-briefcase" aria-hidden="true"></i>
          </span>
          <div class="wb-hero__metrics" aria-label="蓝皮书内容规模">
            <span><b>27</b> CHAPTERS</span>
            <span><b>4</b> PARTS</span>
            <span><b>∞</b> WORKFLOWS</span>
          </div>
        </div>
      </div>

      <div class="wb-value-strip" aria-label="蓝皮书价值">
        <div class="wb-value-strip__item">
          <i class="hn hn-check-box" aria-hidden="true"></i>
          <span><b>真实任务</b><small>REAL TASKS</small></span>
        </div>
        <div class="wb-value-strip__item">
          <i class="hn hn-refresh" aria-hidden="true"></i>
          <span><b>可复现</b><small>REPRODUCIBLE</small></span>
        </div>
        <div class="wb-value-strip__item">
          <i class="hn hn-handshake" aria-hidden="true"></i>
          <span><b>社区共创</b><small>OPEN SOURCE</small></span>
        </div>
        <div class="wb-value-strip__item">
          <i class="hn hn-grid" aria-hidden="true"></i>
          <span><b>系统沉淀</b><small>WORK SYSTEM</small></span>
        </div>
      </div>
    </section>

    <section class="wb-section wb-reading" aria-labelledby="wb-reading-title">
      <div class="wb-section__heading">
        <div>
          <p class="wb-pixel-label">READING PATH / 01—04</p>
          <h2 id="wb-reading-title">四段路径，按你的目标进入</h2>
        </div>
        <p>从个人上手到组织落地，循序渐进，构建你的 WorkBuddy 工作系统。</p>
      </div>

      <div class="wb-reading-grid">
        <a class="wb-reading-card" href="/bluebook/第一篇%20使用手册：先把%20WorkBuddy%20用起来/">
          <span class="wb-reading-card__icon"><i class="hn hn-user" aria-hidden="true"></i></span>
          <span class="wb-reading-card__content">
            <small>PART 01 · CH. 01—10</small>
            <strong>从 0 到 1：先把 WorkBuddy 用起来</strong>
            <span>安装、界面、第一个任务、Skill、连接器、API 与自动化。</span>
            <em><b>新手推荐</b><b>先完成一项任务</b></em>
          </span>
          <i class="hn hn-arrow-right wb-reading-card__arrow" aria-hidden="true"></i>
        </a>

        <a class="wb-reading-card" href="/bluebook/第二篇%20案例篇：从一项任务到一支%20AI%20团队/">
          <span class="wb-reading-card__icon"><i class="hn hn-briefcase" aria-hidden="true"></i></span>
          <span class="wb-reading-card__content">
            <small>PART 02 · CH. 11—21</small>
            <strong>进入真实案例：让任务开始流动</strong>
            <span>办公、文件、远程、资讯、知识、会议、投资和内容增长。</span>
            <em><b>11 个案例</b><b>任务驱动</b></em>
          </span>
          <i class="hn hn-arrow-right wb-reading-card__arrow" aria-hidden="true"></i>
        </a>

        <a class="wb-reading-card" href="/bluebook/第三篇%20进阶篇：把案例变成自己的工作系统/">
          <span class="wb-reading-card__icon"><i class="hn hn-sitemap" aria-hidden="true"></i></span>
          <span class="wb-reading-card__content">
            <small>PART 03 · CH. 22—25</small>
            <strong>把案例变成可复用的工作系统</strong>
            <span>打造 Skill、多 Agent 系统设计与可靠的自动化工作流。</span>
            <em><b>系统进阶</b><b>可靠自动化</b></em>
          </span>
          <i class="hn hn-arrow-right wb-reading-card__arrow" aria-hidden="true"></i>
        </a>

        <a class="wb-reading-card" href="/bluebook/第四篇%20岗位与行业落地/">
          <span class="wb-reading-card__icon"><i class="hn hn-users" aria-hidden="true"></i></span>
          <span class="wb-reading-card__content">
            <small>PART 04 · CH. 26—27</small>
            <strong>落到岗位与行业，组建 AI 团队</strong>
            <span>从通用能力出发，设计适合不同岗位和行业的工作流。</span>
            <em><b>团队落地</b><b>行业路线</b></em>
          </span>
          <i class="hn hn-arrow-right wb-reading-card__arrow" aria-hidden="true"></i>
        </a>
      </div>
    </section>

    <section class="wb-section wb-task-index" aria-labelledby="wb-task-index-title">
      <div class="wb-section__heading wb-section__heading--compact">
        <div>
          <p class="wb-pixel-label">START WITH A REAL TASK</p>
          <h2 id="wb-task-index-title">你现在想让 AI 帮你做什么？</h2>
        </div>
        <p>不必从头读。带着问题进来，先跑通一个能验收的结果。</p>
      </div>

      <div class="wb-task-grid">
        <a href="/bluebook/第二篇%20案例篇：从一项任务到一支%20AI%20团队/第%2011%20章%20办公三件套：Word、Excel、PPT/">
          <i class="hn hn-briefcase" aria-hidden="true"></i><strong>办公文档</strong><span>Word · Excel · PPT</span>
        </a>
        <a href="/bluebook/第二篇%20案例篇：从一项任务到一支%20AI%20团队/第%2012%20章%20从整理桌面文件这些小事做起/">
          <i class="hn hn-folder-open" aria-hidden="true"></i><strong>文件与远程</strong><span>整理 · 查找 · 执行</span>
        </a>
        <a href="/bluebook/第二篇%20案例篇：从一项任务到一支%20AI%20团队/第%2015%20章%20资讯整合：把信息流变成每日通知/">
          <i class="hn hn-newspaper" aria-hidden="true"></i><strong>资讯与知识</strong><span>收集 · 筛选 · 复用</span>
        </a>
        <a href="/bluebook/第二篇%20案例篇：从一项任务到一支%20AI%20团队/第%2018%20章%20把投资分析变成你的日常/">
          <i class="hn hn-chart-line" aria-hidden="true"></i><strong>专业分析</strong><span>投资 · 研究 · 诊断</span>
        </a>
        <a href="/bluebook/第二篇%20案例篇：从一项任务到一支%20AI%20团队/第%2019%20章%20一句话召唤%20AI%20视频团队/">
          <i class="hn hn-video-camera" aria-hidden="true"></i><strong>内容生产</strong><span>视频 · 自媒体 · GEO</span>
        </a>
        <a href="/bluebook/第三篇%20进阶篇：把案例变成自己的工作系统/第%2024%20章%20如何进行多%20Agent%20系统设计/">
          <i class="hn hn-robot" aria-hidden="true"></i><strong>AI 工作系统</strong><span>Skill · Agent · 自动化</span>
        </a>
      </div>
    </section>

    <section class="wb-section wb-system" aria-labelledby="wb-system-title">
      <div class="wb-system__intro">
        <p class="wb-pixel-label">FROM TASK TO TEAM</p>
        <h2 id="wb-system-title">一次成功，不该只发生一次。</h2>
        <p>蓝皮书真正关心的不是“AI 会什么”，而是如何把一个结果沉淀成稳定、可协作、可复用的工作系统。</p>
      </div>
      <ol class="wb-system__steps">
        <li><b>01</b><strong>TASK</strong><span>完成一个真实任务</span></li>
        <li><b>02</b><strong>CASE</strong><span>复盘成可复现案例</span></li>
        <li><b>03</b><strong>WORKFLOW</strong><span>沉淀 Skill 与自动化</span></li>
        <li><b>04</b><strong>AI TEAM</strong><span>组合成协作团队</span></li>
      </ol>
    </section>

    <section class="wb-community" aria-labelledby="wb-community-title">
      <div>
        <p class="wb-pixel-label">BUILD IN PUBLIC · LEARN IN PUBLIC</p>
        <h2 id="wb-community-title">这本蓝皮书，也可以由你继续写下去。</h2>
      </div>
      <div class="wb-community__actions">
        <a class="wb-button wb-button--acid" href="/community/contributing">参与共创</a>
        <a class="wb-button wb-button--dark-outline" href="https://github.com/AlephAITech/WorkBuddyGuide">前往 GitHub</a>
      </div>
      <i class="hn hn-book wb-community__icon" aria-hidden="true"></i>
    </section>
  </main>
</template>
