<script setup lang="ts">
import { defineProps } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Sample Text',
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
  },
  rowNumber: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  sendOnEnter: { type: Boolean, default: false },
})

const { value, errorMessage } = useField(() => props.name)

const emit = defineEmits<{
  (e: 'enter', value: string): void
}>()

function handleEnter() {
  if (props.sendOnEnter && value.value !== '') {
    emit('enter', value.value)
    value.value = ''
  }
}
</script>

<template>
  <div class="text-field-container">
    <label class="text-field-label">
      {{ label }}
      <span v-if="required" class="required-indicator">*</span>
    </label>
    <textarea
      v-if="rowNumber > 0"
      v-model="value"
      :placeholder="placeholder"
      :rows="rowNumber"
      :class="['text-field-input', { 'has-error': !!error || !!errorMessage}]"
      @keydown.enter="handleEnter"
      :disabled="disable"
    />

    <input
      v-else
      :type="type || 'text'"
      v-model="value"
      :placeholder="placeholder"
      :class="['text-field-input', { 'has-error': !!error || !!errorMessage }]"
      @keydown.enter="handleEnter"
      :disabled="disable"
    />
    <div v-if="error || errorMessage" class="error-message">{{ error ?? errorMessage }}</div>
  </div>
</template>

<style scoped lang="scss">
.text-field-container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 16px;
}

.text-field-label {
  @include body2;
}

.required-indicator {
  color: $color-error-default;
}

.text-field-input {
  padding: 12px 16px;
  @include body2;
  font-weight: 400;
  color: $color-neutral-disable;
  border: 1px solid $color-neutral-disable;
  border-radius: $md-radius;
  transition: all 0.3s ease;
  resize: none;

  &[rows] {
    line-height: 24px;
    height: auto;
  }

  &:hover {
    border-color: $color-neutral-hover;
    color: $color-neutral-hover;
  }

  &:active {
    color: $color-neutral-default;
    border-color: $color-primary;
  }

  &:focus {
    outline: none;
    color: $color-neutral-default;
    border-color: $color-neutral-default;
  }

  &.has-error {
    border-color: $color-error-default;
  }

  &:disabled {
    border-color: $color-neutral-disable;
    cursor: not-allowed;

    &::placeholder {
      color: $color-neutral-disable;
    }
  }
}

.error-message {
  @include caption1;
  color: $color-error-default;
}
</style>
