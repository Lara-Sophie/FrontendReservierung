import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
    server: {
        proxy: {
            '/reservierungen': 'http://localhost:8080',
            '/kunden': 'http://localhost:8080',
            '/tischslot': 'http://localhost:8080',
            '/tische': 'http://localhost:8080'
        }
    },
 resolve: {
   alias: {
     '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }

})
