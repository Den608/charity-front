import './assets/main.css'
import routers from './routers'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { FontAwesomeIcon } from './icons/fontAwsomeIcons'

const pinia = createPinia()
const app=createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(routers)
app.mount('#app')
