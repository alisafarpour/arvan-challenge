<script lang="ts" setup>
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  indeterminate?: boolean
  label?: string
  color?: 'teal' | 'blue' | 'green' | 'aqua'
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function onClick() {
  if(!props.disabled)
    emit('update:modelValue', !props.modelValue)
}

</script>

<template>
  <label class="checkbox-wrapper" :class="{ disabled }">
    <!--    <input-->
    <!--        type="checkbox"-->
    <!--        class="checkbox-input"-->

    <!--        :disabled="disabled"-->
    <!--        @click="onClick"-->
    <!--    />-->
    <span
      class="checkbox-box"
      @click="onClick"
      :class="[
        { checked: modelValue },
        {
          checked: modelValue && !indeterminate,
          indeterminate: indeterminate,
        },
      ]"
    >
      <span v-if="indeterminate && modelValue" class="symbol">–</span>
      <span v-else-if="modelValue" class="symbol">✓</span>
    </span>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  column-gap: 4px;
  user-select: none;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.checkbox-input {
  display: none;
}

.symbol {
  font-size: 10px;
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox-box {
  width: 16px;
  height: 16px;
  border-radius: $sm-radius;
  border: 2px solid $color-neutral-default-st1;
  background-color: $white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: $color-neutral-bg-hover;
    border-color: $color-neutral-hover-st1;
  }
  &:active {
    background-color: $color-neutral-bg-press;
    border-color: $color-neutral-press-st1;
  }

  &.checked {
    background-color: $color-primary;
    border-color: $color-primary;
    color: $white;
  }

  &.checked:hover {
    background-color: $color-primary-hover;
    border-color: $color-primary-hover;
    color: $white;
  }

  &.checked:active {
    background-color: $color-primary-press;
    border-color: $color-primary-press;
    color: $white;
  }

  .checkbox-label {
    @include body2;
    color: $color-neutral-default;
  }
}
</style>
