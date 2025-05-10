<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed} from "vue";
import DashboardLayout from "@/components/DashboardLayout.vue";
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const route = useRoute()

const layoutComponent = computed(() => {
  const layout = route.meta.layout
  if (!layout) return 'div'

  switch (layout) {
    case 'DashboardLayout':
      return DashboardLayout
    default:
      return 'div'
  }
})

</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
  <VueQueryDevtools position="right" />
</template>
