import './assets/main.css'
import routers from './routers'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app=createApp(App)

app.use(pinia)
app.use(routers)
app.mount('#app')
