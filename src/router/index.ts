import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
// @ts-ignore
import HomeView from ".//FrontendReservierung/src/views/HomeView.vue"
// @ts-ignore
import AboutView from "/src/views/AboutView.vue";
=======
//@ts-ignore
import HomeView from '../views/HomeView.vue'
>>>>>>> 65628070085d77608ef10853d19185cf1d1bc74f

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
<<<<<<< HEAD
      component:AboutView
      },
=======
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //@ts-ignore
      component: () => import('../views/AboutView.vue')
    }
>>>>>>> 65628070085d77608ef10853d19185cf1d1bc74f
  ]
})

export default router