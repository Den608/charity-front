import axios from 'axios';

const accessToken = window.localStorage.getItem('token');
console.log('axiosInstance')

const axiosInstance = axios.create({
  baseURL: 'https://charity-back.iran.liara.run',
  headers: {
    'Content-Type': 'application/json',
  },
});

if (Boolean(accessToken)) {
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
  })
}

export default axiosInstance;
  