import { createRouter, createWebHistory } from "vue-router";
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})


router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem('token')
    let isExpired =true

    if (token) {
        const expTime = jwt_decode(token).exp
        isExpired = dayjs.unix(expTime).diff(dayjs()) < 1
    }

    if (isExpired && to.path != '/signup' && to.path != '/login') {
        next('/login')
    } else if (!isExpired && to.path != '/') {
        next('/')
    } else {
        next()
    }
})

export default router
