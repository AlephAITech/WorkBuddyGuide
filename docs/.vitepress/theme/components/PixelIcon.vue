<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <svg
    class="hn wb-pixel-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <use
      :href="`#wb-pixel-${name}`"
      transform="translate(0 24) scale(1 -1)"
    />
  </svg>
</template>
