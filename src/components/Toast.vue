<script setup lang="ts">
import { ref, watch, defineProps, onUnmounted } from 'vue'

const props = defineProps<{
  type: 'success' | 'error'
  title: string
  description: string
  duration?: number
}>()

const visible = ref(true)
const timeout = ref<number | null>(null)

watch(
    () => [props.description, props.title],
    () => {
      visible.value = true
      if (timeout.value) clearTimeout(timeout.value)
      timeout.value = window.setTimeout(() => {
        visible.value = false
      }, props.duration || 3000)
    },
    { immediate: true }
)

onUnmounted(() => {
  if (timeout.value) clearTimeout(timeout.value)
})
</script>

<template>
  <transition name="toast-slide">
    <div
        v-if="visible"
        :class="['toast', type]"
        class="toast-container"
    >
      <strong class="toast-title">{{title}}</strong>
      <span class="toast-message">{{ description }}</span>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.toast-container {
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: $lg-radius;
  box-shadow: 0 8px 40px 0 #2533433D;
  z-index: 9999;
}

.success {
  background-color: $color-success-bg;
  color: $color-success-default;
}

.error {
  background-color: $color-error-bg;
  color: $color-error-default;
}

.toast-title {
  @include body2
}
.toast-message {
  @include caption1
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
}
</style>