import axiosInstance from "../services/axiosInstance";
import { defineStore } from "pinia";
import { ref } from 'vue'
import { useRouter } from "vue-router";

const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('')
  const isAuthenticated = ref(false)
  const router = useRouter()

  async function handleLogin(credentials) {
    const response = await axiosInstance.post('/api/login', credentials).then(response => {

      accessToken.value = response.data.authorization.token
      isAuthenticated.value = true

      window.localStorage.setItem('token', accessToken.value)
      window.localStorage.setItem('isAuthenticated', true)
      router.push('/')

    }).catch(error => {
      console.log(error)
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
    accessToken.value = null
    isAuthenticated.value = false
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
    accessToken,
    handleLogin,
    handleLogout
  }
});

export default useAuthStore;
