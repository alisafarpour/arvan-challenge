<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="section">
    <div class="section__header">
      <p class="section__title">{{ props.title }}</p>
      <p v-if="description" class="section__description">{{ description }}</p>
    </div>
    <div class="section__content">
      <slot>Replace me</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section {

  &__header {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px;
  }

  &__title {
    @include title3;
    width: 100%;
    color: $color-neutral-default;
  }

  &__description {
    @include body2;
    font-weight: 400;
    width: 100%;
    color: $color-neutral-default;
    margin: 0 0 20px 0;
  }

  &__content {
    border-top: 1px solid $separator;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>