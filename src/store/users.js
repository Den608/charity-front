import axiosInstance from "../services/axiosInstance";
import { defineStore } from "pinia";
import { ref } from 'vue'
import { useRouter } from "vue-router";

const useUSerStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref('')
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

  function handleLogout() {
    router.push('/login')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('isAuthenticated')
    user.value = null
    accessToken.value = null
    isAuthenticated.value = false
    user.value = null
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

  async function handleRefreshToken() {
    try {
      const oldToken = window.localStorage.getItem('token')
      const response = await axiosInstance.post('/api/login/refresh', { 'token': oldToken })
      accessToken.value = response.data.authorisation.token
      isAuthenticated.value = true
      window.localStorage.setItem('token', accessToken.value)
      window.localStorage.setItem('isAuthenticated', true)
    }
    catch (err) {
      router.push('/login')
      isAuthenticated.value = false
      user.value = null
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('isAuthenticated')
    }
  }


  return {
    user,
    accessToken,
    handleLogin,
    handleLogout
  }
});

export default useUSerStore;
