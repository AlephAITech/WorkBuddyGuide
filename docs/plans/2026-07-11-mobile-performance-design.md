# Mobile Performance Design

## Goal

Raise the mobile performance of `https://workbuddy.homes/` without changing the
approved visual direction or the existing Markdown authoring format.

## Architecture

The current Mermaid plugin injects a static Mermaid component into the VitePress
client entry. That makes every page preload Mermaid, KaTeX, graph-layout code,
and every diagram renderer, including pages with no diagrams. Replace the global
plugin with a small Markdown fence renderer and an async Vue component. The
component imports Mermaid only when a diagram approaches the viewport, keeps a
text fallback before rendering, and rerenders when the theme changes.

Keep the VitePress static HTML output as the first-render source of truth. Reduce
the remaining critical path by deferring the hidden QR image, avoiding an
invisible icon-font period, and separating homepage-only styles from document
styles where doing so does not delay the hero CSS. Hashed assets receive long
browser caching through Cloudflare Pages `_headers`.

## Boundaries

- Preserve all existing Markdown `mermaid` fences.
- Preserve light and dark diagram themes.
- Preserve the current homepage layout and the uncommitted code-block contrast
  work already present in `style.css`.
- Do not optimize all book images in this pass; add the performance foundation
  first and leave bulk responsive-image generation for a separate content pass.
- Do not disable Cloudflare analytics solely to remove its small cache warning.

## Verification

- Production build completes without a chunk-size warning from Mermaid in the
  global app bundle.
- The generated homepage contains no Mermaid, KaTeX, Cytoscape, or diagram
  renderer modulepreloads.
- A representative Mermaid chapter still renders in light and dark modes.
- The homepage does not fetch the QR image before the menu is opened.
- Three mobile Lighthouse runs use the median score; target performance is at
  least 90, LCP at most 2.5 seconds, TBT at most 200 milliseconds, and CLS at
  most 0.1.
