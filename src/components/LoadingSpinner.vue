<script setup lang="ts">
defineProps<{
  variant: 'black' | 'white'
  size?: number
}>()
</script>

<template>
  <div
    class="spinner"
    :style="{
      '--spinner-color': variant === 'black' ? 'var(--neutral-default)' : 'var(--white)',
      '--spinner-bg': variant === 'black' ? 'rgba(51, 51, 51, 0.2)' : 'rgba(255, 255, 255, 0.2)',
      '--spinner-size': size + 'px',
    }"
  ></div>
</template>

<style scoped lang="scss">
.spinner {
  --spinner-color: $white;
  --spinner-bg: rgba(255, 255, 255, 0.2);
  --spinner-size: 20px;

  width: var(--spinner-size);
  height: var(--spinner-size);
  border-radius: 50%;
  border: 2px solid var(--spinner-bg);
  border-top-color: var(--spinner-color);
  animation: spin 0.8s linear infinite;
  box-sizing: border-box;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
