import './assets/main.css'

import { createApp } from 'vue'
<<<<<<< HEAD
//@ts-ignore
=======
>>>>>>> b6381dd1d51fa812faaa711a66b9d7bf672fabbc
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.use(router)

app.mount('#app')
