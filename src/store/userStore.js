import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "../services/axios";

const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const user = ref({})

    async function setUser() {
        await axiosInstance.post('api/users/me',null, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
          }).then(response => {
            user.value = response.data.user
        }).catch(error => {
            console.log(error)
        })
    }
    return {
        user,
        setUser
    }
})

export default useUserStore