import './assets/main.css'

import { createApp } from 'vue'
<<<<<<< HEAD
// @ts-ignore
import App from "./App.vue"
=======

//@ts-ignore

import App from './App.vue'
>>>>>>> 65628070085d77608ef10853d19185cf1d1bc74f
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.use(router)

app.mount('#app')
