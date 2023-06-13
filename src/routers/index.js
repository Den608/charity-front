import { createRouter, createWebHistory } from "vue-router";
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
    const isAuthenticated=window.localStorage.getItem('isAuthenticated')

    if(!isAuthenticated && to.path!='/signup' && to.path!='/login'){
        console.log('test')
        next('/login')
    }else if(isAuthenticated && to.path!='/'){
        next ('/')
    }else{
        next()
    }
})

export default router
