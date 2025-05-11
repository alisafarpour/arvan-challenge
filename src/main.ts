import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {QueryClient, VueQueryPlugin} from "@tanstack/vue-query";

const app = createApp(App)

export const queryClient = new QueryClient()

app.use(router)
app.use(VueQueryPlugin,{queryClient})

app.mount('#app')
