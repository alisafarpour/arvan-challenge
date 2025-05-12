<script setup lang="ts">
import { useGetData } from '@/composables/useGetData.ts'
import { computed, reactive, ref, watch } from 'vue'
import DataGrid from '@/components/DataGrid.vue'
import type {All_ARTICLE, ARTICLE} from '@/type/articles-get.ts'
import { ARTICLES_COLUMN } from '@/data/ArticlesColumn.ts'
import Section from '@/components/Section.vue'
import Modal from '@/components/Modal.vue'
import { useRoute } from 'vue-router'
import {useDeleteData} from "@/composables/useDeleteData.ts";
import type {SIGN_IN_TYPE} from "@/type/sign-in-respose.ts";
import {useToast} from "@/composables/useToast.ts";

const route = useRoute()
const toast = useToast()

const pageNumber = ref<number>(1)
const showModal = ref(false)
const deleteArticleData = ref<ARTICLE | null>(null)

const offset = computed(() => (pageNumber.value - 1) * 10)
const endpoint = computed(() => `/articles?limit=10&offset=${offset.value}`)
const deleteEndpoint = computed(() => `/articles/${deleteArticleData.value?.slug}`)

const getArticles = useGetData<All_ARTICLE>(
  endpoint,
  'getAllArticle',
  computed(() => [offset.value]),
)
const deleteArticle = useDeleteData(deleteEndpoint, 'deleteArticle')

watch(
  () => route.params.page,
  (page) => {
    pageNumber.value = page ? parseInt(page as string) : 1
  },
  { immediate: true },
)

const handleAction = () => {
  deleteArticle.mutate({},{
    onSuccess: () => {
      getArticles.refetch()
      toast({
        type: 'success',
        title: 'Article',
        description: 'Deleted successfully.',
        duration: 3000,
      })
    },
    onError: (err) => {
      toast({
        type: 'error',
        title: 'Article Deleted Failed',
        description: `${err.message}`,
        duration: 3000,
      })
    }
  })
  showModal.value = false
}

const showModalHandler = (data : ARTICLE) => {
  deleteArticleData.value = data
  showModal.value = true
}

</script>

<template>
  <div class="container">
    <Section title="All Posts">
      <DataGrid
        :actionDeleteClick="showModalHandler"
        :allDataLength="getArticles.data.value?.articlesCount"
        v-model:pageNumber="pageNumber"
        :data="getArticles.data.value?.articles as any[]"
        :columns="ARTICLES_COLUMN as any"
      />
    </Section>
    <Modal
      title="Delete Article"
      :isOpen="showModal"
      variant="warning"
      message="Are you sure you want to delete this article?"
      :onClick="handleAction"
      @close="showModal = false"
    />
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
