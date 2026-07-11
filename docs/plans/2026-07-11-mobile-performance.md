# Mobile Performance Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove nonessential resources from the mobile critical path and fix the related accessibility, caching, and production-domain issues.

**Architecture:** Replace the global Mermaid integration with a Markdown fence renderer plus an async, viewport-triggered Vue renderer. Keep static VitePress HTML and critical homepage CSS immediately available, while deferring hidden media and assigning immutable cache headers to fingerprinted assets.

**Tech Stack:** VitePress 1.6, Vue 3, Mermaid 11, TypeScript, Cloudflare Pages, Lighthouse 13.

---

### Task 1: Route-level Mermaid rendering

**Files:**
- Create: `docs/.vitepress/mermaid-markdown.ts`
- Create: `docs/.vitepress/theme/components/MermaidDiagram.vue`
- Modify: `docs/.vitepress/config.mts`
- Modify: `docs/.vitepress/theme/index.ts`

**Steps:**

1. Add a Markdown fence renderer that converts only `mermaid` fences into a
   `MermaidDiagram` component and delegates all other fences to VitePress.
2. Register `MermaidDiagram` with `defineAsyncComponent` so the global app entry
   contains only the loader, not Mermaid itself.
3. Import Mermaid dynamically after an `IntersectionObserver` reports that the
   diagram is close to the viewport.
4. Rerender on the VitePress theme class change and disconnect observers on
   unmount.
5. Run `npm run build` and verify that `dist/index.html` has no Mermaid-related
   modulepreloads while a Mermaid chapter contains only the async component
   chunk.

### Task 2: Critical resource cleanup

**Files:**
- Modify: `docs/.vitepress/theme/components/GroupQrMenu.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Modify: `docs/.vitepress/theme/style.css`
- Create: `docs/.vitepress/theme/iconfont.css`

**Steps:**

1. Add lazy decoding to the QR image and verify it is absent from the homepage
   request log before interaction.
2. Replace the package-wide iconfont import with a local font declaration using
   `font-display: optional` and only the icon selectors used by the site.
3. Fix the homepage reading-card contrast failure.
4. Disable the navigation backdrop blur on narrow screens and add safe
   `content-visibility` containment to below-fold homepage sections.
5. Build and run accessibility plus visual checks at mobile and desktop widths.

### Task 3: Deployment and metadata

**Files:**
- Create: `docs/public/_headers`
- Create: `docs/public/favicon.svg`
- Modify: `docs/public/robots.txt`
- Modify: `docs/.vitepress/config.mts`
- Modify: `DEPLOYMENT.md`

**Steps:**

1. Add one-year immutable browser caching for `/assets/*` and a shorter cache for
   community media.
2. Add an explicit favicon and head entry to remove the browser 404.
3. Make `https://workbuddy.homes` the default canonical and sitemap origin and
   document the production environment value.
4. Prevent the homepage title from repeating the site name.
5. Build and inspect the generated title, canonical, Open Graph URL, sitemap,
   robots file, favicon, and `_headers` output.

### Task 4: Performance verification

**Files:**
- Inspect: `docs/.vitepress/dist/**`
- Inspect: generated Lighthouse JSON under `/tmp`

**Steps:**

1. Run `npm run build` from a clean generated-output state.
2. Serve the production build locally and verify the homepage, a normal chapter,
   and a Mermaid chapter.
3. Run three mobile Lighthouse performance audits against the deployed result or
   local production server and report the median.
4. Run accessibility, best-practices, and SEO audits.
5. Confirm no unrelated working-tree changes were overwritten.
