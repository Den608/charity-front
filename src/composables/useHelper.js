import { ref } from 'vue'
import axiosInstance from '../services/axios'
import useComponentStore from '../store/componentStore'

export function useHelper() {
    const helpers = ref([])
    const lastPage=ref(0)
    const currentPage=ref(0)
    const componentStore = useComponentStore()

    async function setAllhelpers(role = 'helper') {
        await axiosInstance.get(`/api/users?role=${role}`)
            .then(response => {
                helpers.value = response.data.users
            })
            .catch(error => {
                if (error.response.status != 401) {
                    componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                }
            })
    }


    async function nextPage(){

    }

    async function prevPage(){

    }

    async function gotoPage(){

    }

    return {
        helpers,
        setAllhelpers
    }
}