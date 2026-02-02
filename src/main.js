// Chapter 4-6: Setup Router + Pinia + Tailwind
import { createApp } from 'vue'
import './style.css' // Tailwind CSS
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// ใช้ Pinia (State Management)
app.use(createPinia())

// ใช้ Router
app.use(router)

app.mount('#app')
