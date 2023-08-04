import { ref } from 'vue'
import axiosInstance from "../services/axios";
import useComponentStore from '../store/componentStore';


export function usePeoplesAid() {
    const packs = ref([])
    const packCount = ref(0)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const error = ref('')
    let timeID
    const componentStore = useComponentStore()
    const { showPopup } = componentStore


    async function setAllPacks() {
        await axiosInstance.get('/api/packages?page=1')
            .then((response) => {
                packs.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }

    async function createPack(pack) {
        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.post('/api/packages?page=1', pack)
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است','error')
                })

        } else {
            error.value = notValid
        }
    }

    async function updatePack(peopleAid) {
        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.put('/api/packages', peopleAid)
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است','error')
                })
        } else {
            error.value = notValid
        }
    }

    async function deletePacks(peopleAidList = []) {
        if (peopleAidList.length > 0) {
            const people_aid_ids = peopleAidList.map(obj => obj.id)

            await axiosInstance.put('/api/packages/delete-multi', { 'people_aid_ids': people_aid_ids })
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است','error')
                })
        }
    }

    async function filterPack(key) {
        await axiosInstance.get(`/api/packages?title=${key}`)
            .then((response) => {
                cashDonations.value = response.data.count
            }).catch((error) => {
                showPopup('مشکلی پیش امده است','error')
            })
    }

    function filterDebounced(key) {
        clearTimeout(timeID)

        timeID = setTimeout(async () => {
            await filterPack(key)
        })
    }

    async function nextPage() {
        if (currentPage.value < lastPage.value) {
            await axiosInstance.get(`/api/packages?page=${currentPage.value++}`)
                .then((response) => {
                    packs.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است','error')
                })
        }
    }

    async function prevPage() {
        if (currentPage.value > 1) {
            await axiosInstance.get(`/api/packages?page=${currentPage.value--}`)
                .then((response) => {
                    packs.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است','error')
                })
        }
    }

    async function gotoPage(number) {
        if (number <= lastPage.value && number > 0) {
            await axiosInstance.get(`/api/packages?page=${number}`)
                .then((response) => {
                    packs.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است','error')
                })
        }
    }

    function ValidateFields(obj) {
        if (obj.title == '') {
            return Error('عنوان نمیتواند خالی باشد')
        } else if (obj.product_id == '') {
            return Error('کالای مورد نظر را انتخاب کنید')
        } else if (obj.helper_id) {
            return Error('مددیار مورد نظر خود را وارد نمایید')
        } else if (obj.quantity <= 0) {
            return Error('تعداد کالا های اهدایی را مشخص کنید')
        }
    }

    return {
        cashDonations,
        productDonations,
        productDonationsCount,
        setCashDonation,
        setProductDonation,
    }
}