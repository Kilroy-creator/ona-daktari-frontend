import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router for routing
app.use(router)

// Mount app
app.mount('#app')