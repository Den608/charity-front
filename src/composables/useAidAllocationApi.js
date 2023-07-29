import { ref, onBeforeMount } from "vue";
import axiosInstance from '../services/axios'

export function useAidAllocation() {
    const assignedAids = ref([])
    const aidAllocations = ref([])

    async function setAssignedAids() {
        await axiosInstance.get('/api/aid-allocations/?status=assigned')
            .then((response) => {
                assignedAids.value = response.data.allocations
            }).catch((error) => {
                console.log(error)
            })
    }

    async function setAidAllocation() {
        await axiosInstance.get('/api/aid-allocations/?page=1')
            .then((response) => {
                aidAllocations.value = response.data.allocations
            }).catch((error) => {
                console.log(error)
            })
    }

    return {
        assignedAids,
        aidAllocations,
        setAssignedAids,
        setAidAllocation
    }
}