import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/styles/main.css'

const app = createApp(App)

// Create Pinia
const pinia = createPinia()

// Install plugins
app.use(pinia)
app.use(router)

app.mount('#app')
