<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  dataArray: Array<{ label: string; id: string | number; onClick: () => void, selectionRule: (value: string) => boolean }>
}>()

const route = useRoute()

</script>

<template>
  <div class="sidebar-container">
    <a
      v-for="item in props.dataArray"
      :key="item.id"
      @click="item.onClick"
      class="sidebar-item"
      :class="{ selected: item.selectionRule(route.fullPath)}"
    >
      {{ item.label }}
    </a>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  background-color: $white;
  border-left: 1px solid $border-color;
  padding: 12px;
  width: 240px;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  row-gap: 8px;
  @media (max-width: 980px) {
    flex-shrink: 1;
  }
}

.sidebar-item {
  transition: all 0.3s ease-out;
  padding: 10px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;

  &.selected {
    background-color: $color-primary-bg-default;
    color: $color-primary;
  }

  &.selected:hover {
    background-color: $color-primary-bg-hover;
    color: $color-primary-hover;
  }
}

.sidebar-item:hover {
  background-color: $color-neutral-bg-hover;
}

.sidebar-item:active {
  background-color: $color-neutral-bg-press;
}
</style>
