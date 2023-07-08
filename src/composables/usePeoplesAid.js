import { ref } from 'vue'
import axiosInstance from "../services/axios";
import { onBeforeMount } from 'vue'

export function usePeoplesAid() {
    const cashDonations = ref(0)
    const productDonationsCount = ref(0)
    const productDonations= ref({})
    const error = ref('')

    async function setCashDonation() {
        await axiosInstance.get('/api/people-aids?type=cash')
            .then((response) => {
                cashDonations.value = response.data.count
            }).catch((error) => {
               console.log(error)
            })
    }

    async function setProductDonation() {
        await axiosInstance.get('/api/people-aids?type=product&page=1')
            .then((response) => {
                productDonations.value = response.data
                productDonationsCount.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }


    return {
        cashDonations,
        productDonations,
        productDonationsCount,
        setCashDonation,
        setProductDonation,
    }
}