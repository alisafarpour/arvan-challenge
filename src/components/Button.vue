<script setup lang="ts">
import { defineProps, computed} from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Define the props for the button component
const props = defineProps({
  justIcon: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as () => 'primary' | 'secondary' | 'error',
    default: 'primary',
  },
  type: {
    type: String,
  },
  customStyle: {
    type: Object as () => Record<string, string>,
    default: () => ({}),
  },
})

const variantClass = computed(() => {
  return `btn-${props.variant}`
})

const mergedStyle = computed(() => ({
  padding: props.justIcon ? '10px' : '10px 16px',
  ...props.customStyle,
}))

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && props.onClick) {
    props.onClick(event)
  }
}
</script>

<template>
  <button
    :class="['btn', variantClass, { 'btn-disabled': disabled }]"
    :disabled="disabled || loading"
    @click="handleClick"
    :style="mergedStyle"
    :type="type"
  >
    <template v-if="loading">
      <LoadingSpinner :variant="variant === 'secondary' ? 'black' : 'white'" :size="17" />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<style scoped lang="scss">
.btn {
  @include body2;
  border: none;
  border-radius: $lg-radius;
  cursor: pointer;
  transition: all 0.3s ease-out;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: $color-primary;
}

.btn-primary:hover {
  background-color: $color-primary-hover;
}

.btn-primary:active {
  background-color: $color-primary-press;
}

.btn-secondary {
  background-color: transparent;
  color: $color-neutral-default;
  border: 1px solid $color-neutral-default;
}

.btn-secondary:hover {
  border: 1px solid $color-neutral-hover;
}

.btn-secondary:active {
  border: 1px solid $color-neutral-press;
}

.btn-error {
  background-color: $color-error-default;
}

.btn-error:hover {
  background-color: $color-error-hover;
}

.btn-error:active {
  background-color: $color-error-press;
}

.btn-primary.btn-disabled {
  background-color: $color-primary-disable;
  cursor: not-allowed;
}

.btn-secondary.btn-disabled {
  color: $color-neutral-disable;
  cursor: not-allowed;
  border: 1px solid $color-neutral-disable;
}

.btn-error.btn-disabled {
  background-color: $color-error-disable;
  cursor: not-allowed;
}

.btn:disabled {
  pointer-events: none;
}
</style>
