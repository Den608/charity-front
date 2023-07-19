import axios from 'axios';
import baseUrl from './baseUrl';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'vue-router';

let token = window.localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
})

axiosInstance.interceptors.request.use(async req => {
  token = window.localStorage.getItem('token')
  req.headers.Authorization = `Bearer ${token}`;

  const expTime = jwt_decode(token).exp
  const isExpired = dayjs.unix(expTime).diff(dayjs()) < 1
  if (!isExpired) return req

  // await axios.post(`${baseUrl}/api/refresh`, {}, {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }).then(response => {
  //   token = response.data.authorization.token
  //   req.headers.Authorization = `Bearer ${response.data.authorization.token}`
  //   window.localStorage.setItem('token', token)
  // }).catch(error => {
  //   window.localStorage.removeItem('token')
  //   window.localStorage.removeItem('isAuthenticated')
  //   router.push('/login')
  // })

  window.localStorage.setItem('isAuthenticated',false)

  // return req
})

export default axiosInstance
