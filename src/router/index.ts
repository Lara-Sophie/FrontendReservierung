// @ts-ignore
import { createRouter, createWebHistory } from 'vue-router';
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
      path: '/reservieren',
      name: 'reservieren',
      //@ts-ignore
      component: () => import('../views/ReservierenView.vue')
    },
    {
      path: '/registrieren',
      name: 'registrieren',
      //@ts-ignore
      component: () => import('../views/RegistrierenView.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        //@ts-ignore
        component: () => import('../views/AdminView.vue')
    }
  ]
})

export default router