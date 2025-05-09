import { createRouter, createWebHistory } from 'vue-router'
import SignIn from "@/pages/SignIn.vue";
import SignUp from "@/pages/SignUp.vue";

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
      path: '/articles/page/:page(\\d+)',
      name: 'ArticlesPaginated',
      component: () => import("@/pages/Articles.vue")
    },
    {
      path: '/articles/edit/:slug',
      name: 'ArticleEdit',
      component: () => import('@/pages/EditArticle.vue'),
      meta: { layout: 'DashboardLayout' }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
