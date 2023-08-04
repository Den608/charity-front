import { ref } from 'vue'
import axiosInstance from "../services/axios";
import useComponentStore from '../store/componentStore';


export function usePeoplesAid() {
    const packAllocations = ref([])
    const packAllocationsCount = ref(0)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const error = ref('')
    let timeID
    const componentStore = useComponentStore()
    const { showPopup } = componentStore


    async function setAllPackAllocation() {
        await axiosInstance.get(`/api/package-allocations`)
            .then((response) => {
                packAllocations.value = response.data.packages
                packAllocationsCount.value = response.data.count
                lastPage.value = Math.ceil(packAllocations.value / 10)
            }).catch((error) => {
                showPopup('مشکلی پیش امده است', 'error')
            })
    }

    async function createPackAllocation(packAllocation) {
        const notValid = ValidateFields(peopleAid);
        if (!notValid) {
            await axiosInstance.post(`/api/package-allocations`, packAllocation)
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

    async function updatePackAllocation(packAllocation) {
        const notValid = ValidateFields(packAllocation);
        if (!notValid) {
            await axiosInstance.put(`/api/package-allocations`, packAllocation)
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

    async function deletePackAllocations(packAllocationList = []) {
        if (packAllocationList.length > 0) {
            const packAllocation_id = packAllocationList.map(obj => obj.id)

            await axiosInstance.put('/api/package-allocations/delete-multi', { 'packAllocation_ids': packAllocation_id })
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

    async function filterPackAllocation(key) {
        await axiosInstance.get(`/api/package-allocations?title=${key}`)
            .then((response) => {
                packAllocations.value = response.data.packages
            }).catch((error) => {
                showPopup('مشکلی پیش امده است', 'error')
            })
    }

    function filterDebounced(key) {
        clearTimeout(timeID)

        timeID = setTimeout(async () => {
            await filterPackAllocation(key)
        })
    }

    async function nextPage() {
        if (currentPage.value < lastPage.value) {
            await axiosInstance.get(`/api/package-allocations?page=${currentPage.value++}`)
                .then((response) => {
                    packAllocations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    async function prevPage() {
        if (currentPage.value > 1) {
            await axiosInstance.get(`/api/package-allocations?page=${currentPage.value--}`)
                .then((response) => {
                    packAllocations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    async function gotoPage(number) {
        if (number <= lastPage.value && number > 0) {
            await axiosInstance.get(`/api/package-allocations?page=${number}`)
                .then((response) => {
                    packAllocations.value = response.data.count
                }).catch((error) => {
                    showPopup('مشکلی پیش امده است', 'error')
                })
        }
    }

    function ValidateFields(obj) {
        if (obj.help_seeker_id == '') {
            return 'مددجو مورد نظر را انخالب کنید'
        }else if (obj.quantity <= 0) {
            return 'تعداد پک های اهدایی را مشخص کنید'
        } else if (obj.quantity <= 0) {
            return 'بسته اهدایی را انتخاب کنید'
        }
    }

    return {
        packAllocations,
        lastPage,
        currentPage,
        setAllPackAllocation,
        createPackAllocation,
        updatePackAllocation,
        deletePackAllocations,
        filterDebounced,
        nextPage,
        prevPage,
        gotoPage
    }
}