import { ref } from 'vue'
import axiosInstance from '../services/axios'
import useComponentStore from '../store/componentStore'

export function useUsersApi() {
    const users = ref([])
    const lastPage = ref(1)
    const currentPage = ref(1)
    const usersCount = ref(0)
    const user_role = ref('')
    const componentStore = useComponentStore()

    async function setAllUsers(role) {
        await axiosInstance.get(`/api/users?role=${role}`)
            .then(response => {
                users.value = response.data.users
                usersCount.value = response.data.count
                lastPage.value = Math.ceil(usersCount.value / 10)
                user_role.value = role
            })
            .catch(error => {
                if (error.response.status != 401) {
                    componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                }
            })
    }

    async function nextPage() {
        if (currentPage.value < lastPage.value) {
            currentPage.value++

            componentStore.showLoading()
            await axiosInstance.get(`/api/users?role=${user_role.value}&&page=${currentPage.value}`)
                .then(response => {
                    users.value = response.data.users
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
            componentStore.dismissLoading()
        }
    }

    async function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--

            componentStore.showLoading()
            await axiosInstance.get(`/api/users?role=${user_role.value}&&page=${currentPage.value}`)
                .then(response => {
                    users.value = response.data.users
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
            componentStore.dismissLoading(0)
        }
    }

    async function gotoPage(number) {
        if (number <= lastPage.value && number >= 1) {
            currentPage.value=number
            
            componentStore.showLoading()
            await axiosInstance.get(`/api/users?role=${user_role.value}&&page=${number}`)
                .then(response => {
                    users.value = response.data.users
                })
                .catch(error => {
                    if (error.response.status != 401) {
                        componentStore.showPopup("مشکلی رخ داده است لطفا با پشتیبانی تماس حاصل نمایید", "error")
                    }
                })
            componentStore.dismissLoading()
        }
    }

    return {
        users,
        usersCount,
        lastPage,
        currentPage,
        setAllUsers,
        nextPage,
        prevPage,
        gotoPage
    }
}