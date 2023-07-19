import { ref } from 'vue'
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from 'axios';
import baseUrl from '../services/baseUrl';
import useComponentStore from './componentStore';

const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const router = useRouter()
  const componentStore = useComponentStore()

  async function handleLogin(credentials) {
    if (!isValidNationalCode(credentials.national_code)) {
      componentStore.showPopup("فرمت کد ملی اشتباه است !!!", "error")
      return 
    }
    await axios.post(`${baseUrl}/api/login`, credentials).then(response => {
      token.value = response.data.authorization.token
      window.localStorage.setItem('token', token.value)
      window.localStorage.setItem('isAuthenticated', true)
      componentStore.showPopup("احراز هویت موفقیت امیز بود", "success")
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }).catch(error => {
      if (error.response.status == 401) {
        componentStore.showPopup("کد ملی یا رمز عبور اشتباه است", "error")
      }
      componentStore.showPopup("مشکلی وجود دارد لطفا با پشتیبانی ارتباط بگیرید", "error")
    })

  }

  async function setUser() {
    await axios.post('api/users/me', null, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    }).then(response => {
      user.value = response.data.user
    }).catch(error => {
      if (error.response.status == 401) {
        componentStore.showPopup("از دوباره وارد شوید ", "error")
        router.push('/login')
      }
    })
  }


  function handleLogout() {
    token.value = null
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('isAuthenticated')
    router.push('/login')
  }


  function isValidNationalCode(code) {
    const regex = /^\d{10}$/;
    return regex.test(code)
  }

  function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password)
  }

  return {
    accessToken: token,
    handleLogin,
    handleLogout
  }
});

export default useAuthStore;
