<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const rawData = localStorage.getItem('user-data')
const username = rawData ? JSON.parse(rawData).username : 'unKnown'

const logoutHandler = () => {
  router.push('/login').then(() => {
    Object.keys(localStorage).forEach(function (storage) {
      localStorage.removeItem(storage)
    })
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  })
}
</script>

<template>
  <div class="header-container">
    <p>
      Welcome <strong>{{ username }}</strong>
    </p>
    <h2>Arvancloud Challenge</h2>
    <Button variant="secondary" :onClick="logoutHandler"> Log out</Button>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 24px;
  border-bottom: 1px solid $border-color;
  background-color: $white;
}

h2 {
  @include body1;
  background-color: $bg-color;
  padding: 8px 12px;
  border-radius: $sm-radius;
}

p {
  @include body2;
}
</style>
