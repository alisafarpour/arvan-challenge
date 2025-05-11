<script setup lang="ts">
import Section from '@/components/Section.vue'
import TextField from '@/components/TextField.vue'
import Button from '@/components/Button.vue'
import { useGetData } from '@/composables/useGetData.ts'
import { usePostData } from '@/composables/usePostData.ts'
import { computed, ref, watch } from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useToast } from '@/composables/useToast.ts'
import type { ARTICLE_SEND_TYPE, ARTICLE_TYPE } from '@/type/article-post.ts'
import Checkbox from '@/components/Checkbox.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRouter } from 'vue-router'
import { queryClient } from '@/main.ts'

const toast = useToast()
const router = useRouter()

const getBackTags = useGetData<{ tags: string[] }>('/tags', 'getTags')
const postArticle = usePostData<ARTICLE_SEND_TYPE>('/articles', 'postArticle')
const putArticle = usePostData(`/articles/${'slug'}`, 'putArticle')

const newTags = ref<string[]>([])
const tagStates = ref<Record<string, boolean>>({})

function onTextFieldEnter(value: string) {
  newTags.value.push(value)
  tagStates.value[value] = true
}

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required(),
})

const { handleSubmit } = useForm<ARTICLE_TYPE>({
  validationSchema: schema,
})

const onSubmit = handleSubmit(
  (values) => {
    postArticle.mutate(
      {
        article: {
          ...values,
          tagList: Object.entries(tagStates.value)
            .filter(([key, value]) => !!value)
            .map(([key, value]) => key),
        },
      },
      {
        onSuccess: () => {
          toast({
            type: 'success',
            title: 'New-Article',
            description: 'Added Successfully',
            duration: 3000,
          })
          queryClient.refetchQueries({ queryKey: ['getAllArticle'] })
          getBackTags.refetch()
          router.push('/articles')
        },
        onError: (err) => {
          toast({
            type: 'error',
            title: 'New-Article Failed',
            description: `${err.message}`,
            duration: 3000,
          })
        },
      },
    )
  },
  (submitErrors) => {
    toast({
      type: 'error',
      title: 'New-Article Failed!',
      description: 'Body and/or Title or Description is invalid',
      duration: 3000,
    })
  },
)

const allTags = computed(() => {
  const fetched = getBackTags.data.value?.tags || []
  const combined = [...fetched, ...newTags.value]
  return [...new Set(combined)]
})

watch(
  [() => getBackTags.data.value?.tags, newTags],
  ([newBackTags, newNewTags]) => {
    const mergedTags = new Set([...(newBackTags || []), ...newNewTags])

    for (const tag of mergedTags) {
      if (!(tag in tagStates.value)) {
        tagStates.value[tag] = true
      }
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="main-container">
    <div class="new-article-container">
      <Section title="New article">
        <form @submit="onSubmit">
          <div class="grid-container">
            <div class="grid-item xs-12">
              <TextField name="title" label="Title" required />
            </div>
            <div class="grid-item xs-12">
              <TextField name="description" label="Description" required />
            </div>
            <div class="grid-item xs-12">
              <TextField name="body" :rowNumber="8" label="Body" required />
            </div>
            <div class="grid-item xs-12">
              <Button variant="primary">Submit</Button>
            </div>
          </div>
        </form>
      </Section>
    </div>
    <div class="tags-container">
      <TextField
        name="tags"
        :disable="getBackTags.isLoading.value"
        label="Tags"
        placeholder="New tag"
        :sendOnEnter="true"
        @enter="onTextFieldEnter"
      />
      <div class="grid-container tags-list">
        <div class="loading-tags" v-if="getBackTags.isLoading.value">
          <LoadingSpinner variant="black" :size="20" />
        </div>
        <div v-else-if="allTags.length === 0" class="loading-tags">
          <span>No Data to Display</span>
        </div>
        <div v-else class="grid-item xs-12 tag-item" v-for="tag in allTags" :key="tag">
          <Checkbox v-model="tagStates[tag]" :label="tag" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  display: flex;
  column-gap: 16px;
  flex-direction: row;
  align-content: flex-start;
  width: 100%;
}

.new-article-container {
  background: $white;
  border: 1px solid $border-color;
  border-radius: $md-radius;
  height: 100%;
  flex: 1 1 auto;
}

.tags-container {
  background: $white;
  border: 1px solid $border-color;
  border-radius: $md-radius;
  width: 376px;
  padding: 24px;
  height: 100%;
  flex-shrink: 0;
}

.tags-list {
  width: 328px;
  padding: 24px;
  border: 1px solid $border-color;
  border-radius: $xl-radius;
  display: flex;
  row-gap: 16px;
  max-height: 650px;
  overflow-y: auto;
}

.loading-tags {
  width: 328px;
  border-radius: $xl-radius;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tag-item {
  overflow-x: hidden;
  overflow-y: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
