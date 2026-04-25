import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info)
}

app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Global warning:', msg, trace)
}

app.mount('#app')
