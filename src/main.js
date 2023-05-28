import './assets/main.css'
import routers from './routers'
import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)
app.use(routers)
app.mount('#app')
