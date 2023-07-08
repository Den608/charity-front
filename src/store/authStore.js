import { ref } from 'vue'
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from 'axios';

import axiosInstance from "../services/axios";
import baseUrl from '../services/baseUrl';

const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const router = useRouter()

  async function handleLogin(credentials) {
    await axios.post(`${baseUrl}/api/login`, credentials).then(response => {
      token.value = response.data.authorization.token
      window.localStorage.setItem('token', token.value)
      window.localStorage.setItem('isAuthenticated', true)
      router.push('/')
    }).catch(err => {
      console.log(err)
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
        console.log('از  دوباره وارد شوید ')
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


  return {
    accessToken: token,
    handleLogin,
    handleLogout
  }
});

export default useAuthStore;
