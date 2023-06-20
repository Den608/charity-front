import axios from 'axios';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const hostName = 'https://charity-back.iran.liara.run'

// export const axiosInstance = axios.create({
//   baseURL: hostName,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


function useAxiosInstance(useAuthHeaders = false) {
  const axiosInstance = ref(null)

  function setAxiosInstance() {
    axiosInstance.value = axios.create({
      baseURL: hostName,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async function setAuthHeaders() {
    await axiosInstance.value.post('api/users/me').then((response) => {

      axiosInstance.value.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
        return config;
      });

      console.log(response)
    }).catch((error) => {
      if (error.response.status == 401) {
        refreshToken()
      }
    })
  }

  function refreshToken() {
    console.log('refreshToken()')
    useRouter().push('/login')
  }

  onBeforeMount(() => {
    setAxiosInstance()

    if (useAuthHeaders) {
      setAuthHeaders()
    }

  })

  return {
    axiosInstance
  }
}


export default useAxiosInstance