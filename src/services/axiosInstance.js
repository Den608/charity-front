import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://charity-back.iran.liara.run',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
  