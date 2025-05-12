<script setup lang="ts">
import { computed } from "vue";
import SvgView from "@/components/SvgView.vue";
import Left from "@/assets/icons/chevron-left.svg";
import Right from "@/assets/icons/chevron-right.svg";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

function getPageNumbers(current: number, total: number): (number | string)[] {
  const delta = 1;
  const range: (number | string)[] = [];

  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);

  if (left > 2) {
    range.push("...");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < total - 1) {
    range.push("...");
  }

  if (total > 1) {
    range.push(total);
  }

  return range;
}

const pages = computed(() => getPageNumbers(props.currentPage, props.totalPages));
</script>

<template>
  <div class="pagination">
    <button @click="emit('page-change', props.currentPage - 1)" :disabled="props.currentPage === 1">
      <SvgView :icon="Left" :size="20" />
    </button>

    <button
        v-for="page in pages"
        :key="page + ''"
        :disabled="page === '...'"
        @click="typeof page === 'number' && emit('page-change', page)"
        :class="{ active: page === props.currentPage }"
    >
      {{ page }}
    </button>

    <button @click="emit('page-change', props.currentPage + 1)" :disabled="props.currentPage === props.totalPages">
      <SvgView :icon="Right" :size="20" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  margin-top: 16px;
  display: flex;
  border: 1px solid $border-color;
  padding: 4px;
  border-radius: $md-radius;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: auto;

  button {
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: white;
    cursor: pointer;
    height: 32px;
    min-width: 32px;
    border-radius: $md-radius;
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: $color-neutral-bg-hover;
      color: $number-color;
    }
    &:active {
      background-color: $color-neutral-bg-press;
      color: $number-color;
    }
    &.active {
      background-color: $color-primary;
      color: $white;
    }
    &.disabled {
      background-color: $color-primary-disable;
      color: $white;
    }
  }
}
</style>