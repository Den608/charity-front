import { ref } from 'vue'
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {useAxiosInstance} from "../services/axiosInstance";

const useAuthStore = defineStore('auth', () => {
  const accessToken = ref('')
  const isAuthenticated = ref(false)
  const router = useRouter()
  const {axiosInstance}=useAxiosInstance()
  
  async function handleLogin(credentials) {
   await axiosInstance.post('/api/login', credentials).then(response => {

      accessToken.value = response.data.authorization.token
      isAuthenticated.value = true

      window.localStorage.setItem('token', accessToken.value)
      window.localStorage.setItem('isAuthenticated', true)
      router.push('/')

    }).catch(error => {
      if (error.response.status == 401) {
        console.log("کد ملی یا رمز عبور اشتباه است ")
      } else {
        console.log("مشکلی پیش امده لطفا دقایقی دیگر تلاش کنید در صورت ادامه با پشتیبانی تماس بگیرید")
      }
    })
  }

  async function handleRefreshToken() {
    const oldToken = window.localStorage.getItem('token')
    await axiosInstance.post('/api/login/refresh', { 'token': oldToken }).then((response) => {
      accessToken.value = response.data.authorization.token
      isAuthenticated.value = true
      window.localStorage.setItem('token', accessToken.value)
      window.localStorage.setItem('isAuthenticated', true)
      console.log(response)
    }).catch((error) => {
      router.push('/login')
      isAuthenticated.value = false
      user.value = null
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('isAuthenticated')
    })
  }


  function handleLogout() {
    router.push('/login')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('isAuthenticated')
    accessToken.value = null
    isAuthenticated.value = false
  }


  return {
    accessToken,
    handleLogin,
    handleRefreshToken,
    handleLogout
  }
});

export default useAuthStore;
