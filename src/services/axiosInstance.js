import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://charity-back.iran.liara.run',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;


export function useAxios() {

  function getAxiosInstanceTokenLess() {

    return axios.create({
      baseURL: 'https://charity-back.iran.liara.run',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }

  function getAxiosInstanceByToken() {

    token=window.localStorage.getItem('token')

    return axios.create({
      baseURL: 'https://charity-back.iran.liara.run',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
    });

  }

  return {
    getAxiosInstanceTokenLess,
    getAxiosInstanceByToken
  }
}