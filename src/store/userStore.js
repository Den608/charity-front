import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "../services/axiosInstance";

const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})

    const token = window.localStorage.getItem('token')

    axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`
        return config;
    })

    async function setUser() {
        await axiosInstance.post('api/users/me').then(response => {
            user.value = response.data.user
            console.log(response.headers)
        }).catch(error => {
            if (error.response.status == 401) {
                console.log('از  دوباره وارد شوید ')
            }
        })
    }
    return {
        user,
        setUser
    }
})

export default useUserStore