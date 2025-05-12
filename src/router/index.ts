import { createRouter, createWebHistory } from 'vue-router'
import SignIn from "@/pages/SignIn.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'signIn',
      component: SignIn,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/pages/SignUp.vue"),
    },
    {
      path: '/articles',
      name: 'ArticlesRoot',
      component: () => import("@/pages/Articles.vue"),
      meta: { layout: 'DashboardLayout' }
    },
    {
      path: '/articles/page/:page',
      name: 'ArticlesPagination',
      component: () => import("@/pages/Articles.vue"),
      meta: { layout: 'DashboardLayout' },
      props: route => ({ page: parseInt(route.params.page as string) || 1 }),
    },
    {
      path: '/articles/create',
      name: 'ArticleCreate',
      component: () => import('@/pages/EditArticle.vue'),
      meta: { layout: 'DashboardLayout' }
    },
    {
      path: '/articles/edit/:slug',
      name: 'ArticleEdit',
      component: () => import('@/pages/EditArticle.vue'),
      meta: { layout: 'DashboardLayout' }
    },
  ],
})

export default router
