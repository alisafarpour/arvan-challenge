<script setup lang="ts">
import Button from "@/components/Button.vue";
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
<div class="header-container">
  <p>
    Welcome <strong>{{'ali'}}</strong>
  </p>
  <h2>
    Arvancloud Challenge
  </h2>
  <Button variant="secondary" :onClick="() =>{
    router.push('/login')
  }" >
    Log out
  </Button>
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
  @include body2
}
</style>