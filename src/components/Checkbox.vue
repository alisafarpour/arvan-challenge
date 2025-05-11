
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: boolean,
  indeterminate?: boolean,
  label?: string,
  color?: 'teal' | 'blue' | 'green' | 'aqua',
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function onClick(event: Event) {
  console.log('hi')
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <label class="checkbox-wrapper" :class="{ disabled }">
    <input
        type="checkbox"
        class="checkbox-input"
        :checked="modelValue"
        :disabled="disabled"
        @click="onClick"
    />
    <span
        class="checkbox-box"
        :class="[
        color,
        {
          checked: modelValue && !indeterminate,
          indeterminate: indeterminate
        }
      ]"
    >
      <span v-if="indeterminate" class="symbol">–</span>
      <span v-else-if="modelValue" class="symbol">✓</span>
    </span>
    <span v-if="label" class="checkbox-label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  user-select: none;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.checkbox-input {
  display: none;
}

.checkbox-box {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 2px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &.checked,
  &.indeterminate {
    color: white;
  }

  &.teal.checked,
  &.teal.indeterminate {
    background-color: #3c8686;
    border-color: #3c8686;
  }

  &.blue.checked,
  &.blue.indeterminate {
    background-color: #5bc0de;
    border-color: #5bc0de;
  }

  &.green.checked,
  &.green.indeterminate {
    background-color: #104e4e;
    border-color: #104e4e;
  }

  &.aqua.checked,
  &.aqua.indeterminate {
    background-color: #b4e7ea;
    border-color: #b4e7ea;
  }

  &:hover {
    border-color: #666;
  }

  .symbol {
    font-size: 14px;
    font-weight: bold;
    line-height: 1;
  }
}

.checkbox-label {
  font-size: 14px;
  color: #333;
}
</style>
