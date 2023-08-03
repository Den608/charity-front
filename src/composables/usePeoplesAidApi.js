import { ref } from 'vue'
import axiosInstance from "../services/axios";
import useComponentStore from '../store/componentStore';


export function usePeoplesAid() {
    const peopleAid=ref([])
    const peopleAidCount=ref(0)
    const currentPage=ref(1)
    const lastPage=ref(1)
    const cashDonations = ref(0)
    const productDonationsCount = ref(0)
    const productDonations = ref({})
    const error = ref('')
    const componentStore=useComponentStore()
    const {showPopup}=componentStore

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

    async function setAllAids() {
        await axiosInstance.get('/api/people-aids')
            .then((response) => {
                cashDonations.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }

    async function createAids(peopleAid) {
        await axiosInstance.post('/api/people-aids', peopleAid)
            .then((response) => {
                cashDonations.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }

    async function updateAids(peopleAid) {
        await axiosInstance.put('/api/people-aids', peopleAid)
            .then((response) => {
                cashDonations.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }

    async function deleteAids(peopleAidList = []) {
        if (peopleAidList.length > 0) {
            const people_aid_ids = peopleAidList.map(obj => obj.id)

            await axiosInstance.put('/api/people-aids/delete-multi', {'people_aid_ids':people_aid_ids})
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    async function filterAids(key) {

    }

    function filterDebounced(){
        
    }

    async function nextPage() {

    }

    async function prevPage() {

    }

    async function gotoPage(number) {

    }

    function ValidateFields() {

    }

    return {
        cashDonations,
        productDonations,
        productDonationsCount,
        setCashDonation,
        setProductDonation,
    }
}