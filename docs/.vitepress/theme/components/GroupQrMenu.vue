<script setup lang="ts">
withDefaults(
  defineProps<{
    screenMenu?: boolean;
  }>(),
  {
    screenMenu: false,
  },
);
</script>

<template>
  <figure class="wb-group-qr" :class="{ 'is-screen-menu': screenMenu }">
    <div class="wb-group-qr__frame">
      <img
        src="/community/workbuddy-wechat-group.jpg"
        width="396"
        height="396"
        alt="WorkBuddy 微信交流群二维码"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption>
      <span>WECHAT GROUP</span>
      微信扫码加入交流群
    </figcaption>
  </figure>
</template>

<style scoped>
.wb-group-qr {
  width: 244px;
  margin: 0;
  color: var(--wb-ink);
}

.wb-group-qr__frame {
  position: relative;
  padding: 8px;
  border: 2px solid var(--wb-ink);
  border-radius: 4px;
  background: #fff;
  box-shadow: 5px 5px 0 var(--wb-acid);
}

.wb-group-qr__frame::before {
  position: absolute;
  inset: 3px;
  border: 1px solid rgb(18 20 15 / 14%);
  content: "";
  pointer-events: none;
}

.wb-group-qr img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}

.wb-group-qr figcaption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 13px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  white-space: nowrap;
}

.wb-group-qr figcaption span {
  color: var(--vp-c-text-2);
  font-family: "Silkscreen", monospace;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.04em;
}

.wb-group-qr.is-screen-menu {
  width: min(100%, 272px);
  padding: 8px 4px 12px;
}

.wb-group-qr.is-screen-menu .wb-group-qr__frame {
  box-shadow: 4px 4px 0 var(--wb-acid);
}

.wb-group-qr.is-screen-menu figcaption {
  white-space: normal;
}

@media (prefers-color-scheme: dark) {
  .wb-group-qr__frame {
    box-shadow: 5px 5px 0 var(--vp-c-brand-2);
  }
}
</style>
