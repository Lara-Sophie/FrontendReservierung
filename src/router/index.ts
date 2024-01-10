// @ts-ignore

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      //@ts-ignore
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/win',
      name: 'winview',
      //@ts-ignore
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/lost',
      name: 'lostview',
      //@ts-ignore
      component: () => import('../views/WelcomeView.vue')
    }
  ]
})

export default router