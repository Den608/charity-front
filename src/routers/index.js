import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import useAuthStore  from "../store/authStore";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }

    ]
})


export default router
