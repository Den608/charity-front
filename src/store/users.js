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
    const response = await axiosInstance.post('/api/login', credentials).then(response => {

      user.value = response.data.user
      accessToken.value = response.data.authorization.token
      isAuthenticated.value = true

      window.localStorage.setItem('token', accessToken.value)
      window.localStorage.setItem('isAuthenticated', true)

      router.push('/')

    }).catch(error => {
      if (error.response.status==401){
        console.log("کد ملی یا رمز عبور اشتباه است ")
      }else{
        console.log("مشکلی پیش امده لطفا دقایقی دیگر تلاش کنید در صورت ادامه با پشتیبانی تماس بگیرید")
      }
    })
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
      console.log(err.response.status)
    }
  }

  async function handleRefreshToken() {
    try {
      const oldToken = window.localStorage.getItem('token')
      const response = await axiosInstance.post('/api/login/refresh', { 'token': oldToken })
      accessToken.value = response.data.authorization.token
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
