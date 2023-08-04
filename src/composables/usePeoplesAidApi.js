import { ref } from 'vue'
import axiosInstance from "../services/axios";
import useComponentStore from '../store/componentStore';


export function usePeoplesAid() {
    const peopleAids = ref([])
    const peopleAidCount = ref(0)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const cashDonations = ref(0)
    const productDonationsCount = ref(0)
    const productDonations = ref({})
    const error = ref('')
    let timeID
    const componentStore = useComponentStore()
    const { showPopup } = componentStore

    async function setCashDonation() {
        await axiosInstance.get('/api/people-aids?type=cash')
            .then((response) => {
                cashDonations.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }

    async function setProductDonation() {
        await axiosInstance.get('/api/people-aids?type=product')
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
                peopleAids.value = response.data.people_aid
                peopleAidCount.value = response.data.count
                lastPage.value = Math.ceil(peopleAidCount.value / 10)
            }).catch((error) => {
                showPopup('مشکلی رخ داده است!!!', 'error')
            })
    }

    async function createAids(peopleAid) {

        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.post('/api/people-aids', peopleAid)
                .then((response) => {
                    componentStore.showPopup('با موفقیت ساخته شد !!!', 'success')

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        } else {
            error.value = notValid
        }
    }

    async function updateAids(peopleAid) {
        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.put('/api/people-aids', peopleAid)
                .then((response) => {
                    componentStore.showPopup('با موفقیت ویرایش شد !!!', 'success')

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        } else {
            error.value = notValid
        }
    }

    async function deleteAids(peopleAidList = []) {
        if (peopleAidList.length > 0) {
            const people_aid_ids = peopleAidList.map(obj => obj.id)

            await axiosInstance.put('/api/people-aids/delete-multi', { 'people_aid_ids': people_aid_ids })
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    async function filterAids(key) {
        await axiosInstance.get(`/api/people-aids?title=${key}`)
            .then((response) => {
                cashDonations.value = response.data
            })
            .catch((error) => {
                showPopup('مشکلی پیش امده است', 'error')
            })
    }

    function filterDebounced(key) {
        clearTimeout(timeID)

        timeID = setTimeout(async () => {
            await filterAids(key)
        })
    }

    async function nextPage() {
        if (currentPage.value < lastPage.value) {
            await axiosInstance.get(`/api/people-aids?page=${currentPage.value++}`)
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    async function prevPage() {
        if (currentPage.value > 1) {
            await axiosInstance.get(`/api/people-aids?page=${currentPage.value--}`)
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    async function gotoPage(number) {
        if (number <= lastPage.value && number > 0) {
            await axiosInstance.get(`/api/people-aids?page=${number}`)
                .then((response) => {
                    cashDonations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    function ValidateFields(obj) {
        if (obj.title == '') {
            return 'عنوان نمیتواند خالی باشد'
        } else if (obj.product_id == '') {
            return 'کالای مورد نظر را انتخاب کنید'
        } else if (obj.helper_id) {
            return 'مددیار مورد نظر خود را وارد نمایید'
        } else if (obj.quantity <= 0) {
            return 'تعداد کالا های اهدایی را مشخص کنید'
        }
    }

    return {
        cashDonations,
        productDonations,
        productDonationsCount,
        setCashDonation,
        setProductDonation,
        setAllAids,
        createAids,
        updateAids,
        deleteAids,
        filterDebounced,
        nextPage,
        prevPage,
        gotoPage
    }
}