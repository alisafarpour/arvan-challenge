<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  icon: Component | string
  size?: number
  color?: string
}>()

const size = props.size ?? 20
const color = props.color ?? 'inherit'
console.log(size)
</script>

<template>
  <component
      :is="icon"
      class="base-icon"
      :width="`${size}px`"
      :height="`${size}px`"
      :color="color"
  />
</template>
