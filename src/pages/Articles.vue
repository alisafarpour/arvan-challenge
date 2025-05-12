<script setup lang="ts">
import { useGetData } from '@/composables/useGetData.ts'
import {computed, ref, watch} from 'vue'
import DataGrid from '@/components/DataGrid.vue'
import type {All_ARTICLE} from "@/type/articles-get.ts";
import {ARTICLES_COLUMN} from "@/data/ArticlesColumn.ts";
import Section from "@/components/Section.vue";
import {useRoute} from "vue-router";

const route = useRoute()

const pageNumber = ref<number>(1)

const offset = computed(() => (pageNumber.value - 1) * 10)
const endpoint = computed(() => `/articles?limit=10&offset=${offset.value}`)

const getArticles = useGetData<All_ARTICLE>(endpoint, 'getAllArticle', computed(() => [offset.value]))


watch(
    () => route.params.page,
    (page) => {
      pageNumber.value = page ? parseInt(page as string) : 1
    },
    { immediate: true }
)
</script>

<template>
  <div class="container">
    <Section title="All Posts">
      <DataGrid :allDataLength="getArticles.data.value?.articlesCount" v-model:pageNumber="pageNumber" :data="getArticles.data.value?.articles as any[]" :columns="ARTICLES_COLUMN as any" />
    </Section>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: $white;
  border: 1px solid $border-color;
  border-radius: $md-radius;
  overflow: hidden;
}
</style>