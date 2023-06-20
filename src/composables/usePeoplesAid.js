import { ref } from 'vue'
import axiosInstance from '../services/axiosInstance'
import { onBeforeMount } from 'vue'

export function usePeoplesAid() {
    const cashDonations = ref(0)
    const productDonations = ref(0)
    const error=ref('')

    async function setCashDonation() {
        await axiosInstance.get('/api/people-aids?type=cash', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then((response) => {
            cashDonations.value = response.data.count
        }).catch((error) => {
            error.value=error.response.data
        })
    }

    async function setProductDonation() {
        await axiosInstance.get('/api/people-aids?type=product', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then((response) => {
            productDonations.value = response.data.count
        }).catch((error) => {
            error.value=error.response.data
        })
    }

    onBeforeMount(() => {
        setCashDonation()
        setProductDonation()
    })

    return {
        cashDonations,
        productDonations,
        setCashDonation,
        setProductDonation,
    }
}