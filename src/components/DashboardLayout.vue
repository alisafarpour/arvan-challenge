<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="container">
    <Header />
    <div class="content">
      <Sidebar
        :dataArray="[
          {
            label: 'All Articles',
            id: 'articles',
            onClick: () => {
              router.push('/articles')
            },
            selectionRule: (value: string) => value === '/articles',
          },
          {
            label: 'New Articles',
            id: 'articles/create',
            onClick: () => {
              router.push('/articles/create')
            },
            selectionRule: (value: string) => (value.includes('articles/edit') || value.includes('articles/create')),
          },
        ]"
      />
      <div class="content__child">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 72px);

  &__child {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
