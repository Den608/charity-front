import axiosInstance from "../services/axiosInstance";
import { defineStore } from "pinia";
import { ref } from 'vue'
import { useRouter } from "vue-router";

const useUSerStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref('')
  const refreshToken = ref('')
  const isAuthenticated = ref(false)
  const router = useRouter()

  async function handleLogin(credentials) {
    try {
      const response = await axiosInstance.post('/api/login', credentials)
      user.value = response.data.user
      accessToken.value = response.data.authorisation.token
      isAuthenticated.value = true
      window.localStorage.setItem('token', accessToken.value)
      window.localStorage.setItem('isAuthenticated', true)
      router.push('/')
    }
    catch (err) {
      console.log(err.response)
    }
  }

  async function getUser() {
    try {
      const response = await axiosInstance.post('/users/me')
      user.value = response.data.user
      isAuthenticated.value = window.localStorage.getItem('isAuthenticated')
    }
    catch (err) {
      console.log(err.response)
    }
  }


  return {
    user,
    accessToken,
    refreshToken,
    handleLogin
  }
});

export default useUSerStore;
