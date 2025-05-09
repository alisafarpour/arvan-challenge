<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  label: string
  href: string
}>()

const router = useRouter()
</script>

<template>
  <button
    class="btn"
    @click="
      () => {
        router.push(href)
      }
    "
  >
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
.btn {
  @include body2;
  border: none;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s ease-out;
  color: $color-info-default;

  &:hover {
    color: $color-info-hover;
  }

  &:active {
    color: $color-info-press;
  }

  &:disabled {
    color: $color-info-disable;
  }
}
</style>
