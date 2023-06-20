import { ref,onBeforeMount } from "vue";


export function useAidAllocation(){
    const assignedAids=ref({})
    const aidAllocations=ref({})

    function setAssignedAids(){

    }

    function setAidAllocation(){

    }

    onBeforeMount(()=>{
        setAidAllocation()
        setAssignedAids()
    })

    return {
        assignedAids,
        aidAllocations,
        setAssignedAids,
        setAidAllocation
    }
}