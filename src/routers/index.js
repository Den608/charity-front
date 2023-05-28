import { createRouter,createWebHistory } from "vue-router";
import Login from '../views/Login.vue'

const routers=createRouter({
    'history':createWebHistory(),
    'routes':[
        {
            'path':'/login',
            'name':'login',
            'component':Login
        }
    ]
})

export default routers