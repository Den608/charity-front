import { ref, onBeforeMount } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useAidAllocation() {
  const assignedAids = ref([]);
  const aidAllocations = ref([]);
  const componentStore = useComponentStore();

  async function setAssignedAids() {
    try {
      const response = await axiosInstance.get(
        "/api/aid-allocations/?status=assigned"
      );
      assignedAids.value = response.data.allocations;
    } catch (error) {
      componentStore.showPopup(
        "مشکل در بازیابی اطلاعات کمک های اهدایی تخصیص یافته پیش امده!!!",
        "error"
      );
    }
  }

  async function setAllAidAllocations() {
    try {
      const response = await axiosInstance.get("/api/aid-allocations/?page=1");
      aidAllocations.value = response.data.allocations;
    } catch (error) {
      componentStore.showPopup(
        "مشکل در بازیابی اطلاعات کمک های اهدایی پیش امده!!!",
        "error"
      );
    }
  }

  async function createAidAllocation(aids) {}

  return {
    assignedAids,
    aidAllocations,
    setAssignedAids,
    setAllAidAllocations,
  };
}
