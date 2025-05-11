<script setup lang="ts">
import Section from '@/components/Section.vue'
import Button from '@/components/Button.vue'
import TextField from '@/components/TextField.vue'
import LinkButton from '@/components/LinkButton.vue'
import {useForm} from 'vee-validate'
import * as yup from 'yup'
import { useToast } from '@/composables/useToast.ts'
import { useRouter } from 'vue-router'
import {usePostData} from "@/composables/usePostData.ts";
import type {SIGN_IN_TYPE} from "@/type/sign-in-respose.ts";

type User_SIGN_IN_DATA = {email: string,password:string}

const toast = useToast()
const router = useRouter()

const signIn = usePostData<{user: User_SIGN_IN_DATA},SIGN_IN_TYPE>('/users/login','signIn')

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const { handleSubmit } = useForm<User_SIGN_IN_DATA>({
  validationSchema: schema,
})

const onSubmit = handleSubmit(
  (values) => {
    signIn.mutate({user :values},{
      onSuccess: (data: SIGN_IN_TYPE) => {
        toast({
          type: 'success',
          title: 'Sign in SuccessFull :)',
          description: 'Enjoy Dashboard',
          duration: 3000,
        })
        document.cookie=`token=${data.user.token}`
        localStorage.setItem('user-data', JSON.stringify({username: data.user.username, pictureUrl: data.user.image}))
        router.push('./articles')
      },
      onError: (err) => {
        toast({
          type: 'error',
          title: 'Sign In Faild!',
          description: `${err.message}`,
          duration: 3000,
        })
      }
    })
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
              <TextField name="email" label="Email" required />
            </div>
            <div class="grid-item xs-12">
              <TextField name="password" label="Password" type="password" required />
            </div>
            <div class="grid-item xs-12">
              <Button
                type="submit"
                variant="primary"
                :loading="signIn.isPending.value"
                :customStyle="{ width: '432px', marginTop: '10px' }"
              >
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
