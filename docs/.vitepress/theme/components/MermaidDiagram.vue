<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  graph: string;
}>();

const container = ref<HTMLElement | null>(null);
const svg = ref("");
const error = ref("");
const graphSource = computed(() => decodeURIComponent(props.graph));

let intersectionObserver: IntersectionObserver | undefined;
let themeObserver: MutationObserver | undefined;
let renderVersion = 0;
let hasStarted = false;

const renderDiagram = async () => {
  const currentVersion = ++renderVersion;

  try {
    const { default: mermaid } = await import("mermaid");
    const dark = document.documentElement.classList.contains("dark");

    mermaid.initialize({
      securityLevel: "loose",
      startOnLoad: false,
      theme: dark ? "dark" : "base",
      themeVariables: dark
        ? undefined
        : {
            primaryColor: "#eef6d1",
            primaryTextColor: "#12140f",
            primaryBorderColor: "#355e18",
            lineColor: "#62675e",
            secondaryColor: "#f5f7f0",
            tertiaryColor: "#ffffff",
          },
    });

    const id = `mermaid-${crypto.randomUUID?.() ?? `${Date.now()}-${currentVersion}`}`;
    const result = await mermaid.render(id, graphSource.value);

    if (currentVersion !== renderVersion) return;

    svg.value = result.svg;
    error.value = "";
    await nextTick();
    result.bindFunctions?.(container.value ?? undefined);
  } catch (reason) {
    if (currentVersion !== renderVersion) return;
    error.value = reason instanceof Error ? reason.message : String(reason);
  }
};

const startRendering = () => {
  if (hasStarted) return;
  hasStarted = true;
  void renderDiagram();

  themeObserver = new MutationObserver(() => {
    void renderDiagram();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
};

onMounted(() => {
  if (!("IntersectionObserver" in window)) {
    startRendering();
    return;
  }

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      intersectionObserver?.disconnect();
      startRendering();
    },
    { rootMargin: "400px 0px" },
  );

  if (container.value) intersectionObserver.observe(container.value);
});

onUnmounted(() => {
  renderVersion += 1;
  intersectionObserver?.disconnect();
  themeObserver?.disconnect();
});
</script>

<template>
  <figure ref="container" class="wb-mermaid" aria-label="流程图">
    <div v-if="svg" class="wb-mermaid__svg" v-html="svg"></div>
    <pre v-else class="wb-mermaid__fallback"><code>{{ graphSource }}</code></pre>
    <figcaption v-if="error" class="wb-mermaid__error">图表渲染失败：{{ error }}</figcaption>
  </figure>
</template>

<style scoped>
.wb-mermaid {
  min-height: 180px;
  margin: 24px 0;
  overflow-x: auto;
}

.wb-mermaid__svg :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
  min-width: 560px;
  margin: 0 auto;
}

.wb-mermaid__fallback {
  min-height: 180px;
  margin: 0;
  white-space: pre-wrap;
}

.wb-mermaid__error {
  margin-top: 8px;
  color: var(--vp-c-danger-1);
  font-size: 13px;
}

@media (max-width: 760px) {
  .wb-mermaid__svg :deep(svg) {
    min-width: 480px;
  }
}
</style>
