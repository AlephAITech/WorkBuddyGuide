import type MarkdownIt from "markdown-it";

export function configureMermaidMarkdown(md: MarkdownIt) {
  const fallbackFence = md.renderer.rules.fence?.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, index, options, env, self) => {
    const token = tokens[index];

    if (token.info.trim() !== "mermaid") {
      return fallbackFence?.(tokens, index, options, env, self) ?? self.renderToken(tokens, index, options);
    }

    const graph = encodeURIComponent(token.content);
    return `<MermaidDiagram graph="${graph}" />`;
  };
}
