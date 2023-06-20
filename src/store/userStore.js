import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {useAxiosInstance} from "../services/axiosInstance";

const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})
    const {axiosInstance}=useAxiosInstance()

    async function setUser() {
        await axiosInstance.post('api/users/me',null, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
          }).then(response => {
            user.value = response.data.user
        }).catch(error => {
            if (error.response.status == 401) {
                console.log('از  دوباره وارد شوید ')
                router.push('/login')
            }
        })
    }
    return {
        user,
        setUser
    }
})

export default useUserStore