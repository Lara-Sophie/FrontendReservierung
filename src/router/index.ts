import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import HomeView from ".//FrontendReservierung/src/views/HomeView.vue"
// @ts-ignore
import AboutView from "/src/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component:AboutView
      },
  ]
})

export default router
