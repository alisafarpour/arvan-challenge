<script setup lang="ts">
import Section from '@/components/Section.vue'
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import LinkButton from '@/components/LinkButton.vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from '@/composables/useToast.ts'
import { useRouter } from 'vue-router'

const toast = useToast()
const router = useRouter()

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const onSubmit = handleSubmit(
  (values) => {
    console.log('Submitted values:', values)
    router.push('./articles')
  },
  (submitErrors) => {
    toast({
      type: 'error',
      title: 'Sign-in Failed!',
      description: 'Username and/or Password is invalid',
      duration: 3000,
    })
  },
)
</script>

<template>
  <div class="container">
    <div class="sign-in-container">
      <Section title="Sign in">
        <form @submit="onSubmit">
          <div class="grid-container">
            <div class="grid-item xs-12">
              <TextField name="email" label="Email" />
            </div>
            <div class="grid-item xs-12">
              <TextField name="password" label="Password" type="password" />
            </div>
            <div class="grid-item xs-12">
              <Button variant="primary" :customStyle="{ width: '432px', marginTop: '10px' }">
                Sign in
              </Button>
              <div class="sign-up">
                <span>Don’t have an account?</span>
                <LinkButton label="Sign up now" href="/register" />
              </div>
            </div>
          </div>
        </form>
      </Section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.sign-in-container {
  background: $white;
  border: 1px solid $border-color;
  border-radius: $md-radius;
  width: 480px;
}

.sign-up {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

span {
  @include body2;
  font-weight: 400;
  margin-right: 4px;
}
</style>
