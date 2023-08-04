import { ref } from 'vue'
import axiosInstance from "../services/axios";
import useComponentStore from '../store/componentStore';


export function usePacks() {
    const packs = ref([])
    const packCount = ref(0)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const error = ref('')
    let timeID
    const componentStore = useComponentStore()
    const { showPopup,showLoading,dismissLoading } = componentStore


    async function setAllPacks() {
        await axiosInstance.get('/api/packages?page=1')
            .then((response) => {
                packs.value = response.data.packages
                packCount.value = response.data.count
            }).catch((error) => {
                showPopup('مشکلی پیش امده است', 'error')
            })
    }

    async function createPack(pack) {
        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.post('/api/packages?page=1', pack)
                .then((response) => {
                    showPopup('با موفقیت ساخته شد!!!', 'success')

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

    async function updatePack(peopleAid) {
        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.put('/api/packages', peopleAid)
                .then((response) => {
                    showPopup('با موفقیت ویرایش شد!!!', 'success')

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

    async function deletePacks(packList = []) {
        if (packList.length > 0) {
            const pack_id = packList.map(obj => obj.id)

            await axiosInstance.post('/api/packages/delete-multi', { 'package_ids': pack_id })
                .then((response) => {
                    showPopup('با موفقیت حذف شد!!!', 'success')

                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    async function filterPack(key) {
        showLoading()
        await axiosInstance.get(`/api/packages?title=${key}`)
            .then((response) => {
                packs.value = response.data.packages
            }).catch((error) => {
                showPopup('مشکلی پیش امده است', 'error')
            })
        dismissLoading()
    }

    function filterDebounced(key) {
        clearTimeout(timeID)

        timeID = setTimeout(async () => {
            await filterPack(key)
        },500)
    }

    async function nextPage() {
        showLoading()
        if (currentPage.value < lastPage.value) {
            await axiosInstance.get(`/api/packages?page=${currentPage.value++}`)
                .then((response) => {
                    packs.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
        dismissLoading()
    }

    async function prevPage() {
        showLoading()
        if (currentPage.value > 1) {
            await axiosInstance.get(`/api/packages?page=${currentPage.value--}`)
                .then((response) => {
                    packs.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
        dismissLoading()
    }

    async function gotoPage(number) {
        showLoading()
        if (number <= lastPage.value && number > 0) {
            await axiosInstance.get(`/api/packages?page=${number}`)
                .then((response) => {
                    packs.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
        dismissLoading()
    }

    function ValidateFields(obj) {
        if (obj.title == '') {
            return 'عنوان نمیتواند خالی باشد'
        } else if (obj.quantity <= 0) {
            return Error('تعداد کالا های اهدایی را مشخص کنید')
        }
    }

    return {
        packs,
        currentPage,
        lastPage,
        error,
        setAllPacks,
        createPack,
        updatePack,
        deletePacks,
        filterPack:filterDebounced,
        prevPage,
        nextPage,
        gotoPage
    }
}