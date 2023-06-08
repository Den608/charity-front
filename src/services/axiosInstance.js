import axios from 'axios';
import authStore from '../store/authStore';

const {accessToken}=authStore()

const axiosInstance = axios.create({
  baseURL: 'https://charity-back.iran.liara.run',
  headers: {
    'Content-Type': 'application/json',
    'Token':'Bearer ${accessToken}'
  },
});

export default axiosInstance;