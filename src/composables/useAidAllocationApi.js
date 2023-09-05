import { ref, onBeforeMount } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useAidAllocation() {
  const assignedAids = ref([]);
  const aidAllocations = ref([]);
  const assignAidLoading = ref(false);
  const allocationLoading = ref(false);
  const componentStore = useComponentStore();
  const { showPopup } = componentStore;
  const errorInput = ref("");
  let timeID;

  async function setAssignedAids() {
    try {
      assignAidLoading.value = true;
      const response = await axiosInstance.get(
        "/api/aid-allocations/?status=assigned"
      );
      assignedAids.value = response.data.allocations;
    } catch (error) {
      componentStore.showPopup(
        "مشکل در بازیابی اطلاعات کمک های اهدایی تخصیص یافته پیش امده!!!",
        "error"
      );
    } finally {
      assignAidLoading.value = false;
    }
  }

  async function setAllAllocations() {
    try {
      allocationLoading.value = true;
      const response = await axiosInstance.get("/api/aid-allocations/?page=1");
      aidAllocations.value = response.data.allocations;
    } catch (error) {
      componentStore.showPopup(
        "مشکل در بازیابی اطلاعات کمک های اهدایی پیش امده!!!",
        "error"
      );
    } finally {
      allocationLoading.value = false;
    }
  }

  async function createAidAllocation(allocations) {
    let isValid;
    try {
      allocationLoading.value = true;
      isValid = isFieldsValid(allocations);
      const response = await axiosInstance.post(
        `/api/aid-allocations`,
        allocations
      );
      showPopup("با موفقیت ساخته شد", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (isValid) {
        showPopup("مشکلی پیش امده است !!!");
      } else {
        errorInput.value = error.message;
      }
    } finally {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
      allocationLoading.value = false;
    }
  }

  async function updateAidAllocation(allocations) {
    try {
      allocationLoading.value = true;
      const response = await axiosInstance.put(
        `/api/aid-allocations/${allocations.id}`,
        allocations
      );
      showPopup("با موفقیت انجام شد", "success");
    } catch (error) {
      showPopup("مشکلی پیش امده است !!!");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function deleteAllocations(allocationList = []) {
    try {
      if (allocationList.length > 0) {
        allocationLoading.value = true;
        const aid_allocation_ids = allocationList.map((obj) => obj.id);
        const response = await axiosInstance.post(
          "/api/aid-allocations/delete-multi",
          { aid_allocation_ids: aid_allocation_ids }
        );
        showPopup("با موفقیت حذف شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function assignAllocations(allocationList = []) {
    try {
      if (allocationList.length > 0) {
        allocationLoading.value = true;
        const aid_allocation_ids = allocationList.map((obj) => obj.id);
        const response = await axiosInstance.post(
          "/api/aid-allocations/assign-multi",
          { aid_allocation_ids: aid_allocation_ids }
        );
        showPopup("با موفقیت اعمال شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function filterAllocation(key = "") {
    try {
      allocationLoading.value = true;
      const response = await axiosInstance.get(
        `/api/aid-allocations/?title=${key}`
      );
      aidAllocations.value = response.data.allocations;
    } catch (error) {
      componentStore.showPopup("مشکل پیش امده!!!", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  function debouncedFiltering(key) {
    clearTimeout(timeID);
    timeID = setTimeout(async () => {
      await filterAllocation(key);
    }, 1000);
  }

  async function nextPage() {
    try {
      if (currentPage.value < lastPage.value) {
        allocationLoading.value = true;
        const response = await axiosInstance.get(
          `/api/aid-allocations?page=${currentPage.value++}`
        );
        aidAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function prevPage() {
    try {
      if (currentPage.value > 1) {
        allocationLoading.value = true;
        const response = await axiosInstance.get(
          `/api/aid-allocations?page=${currentPage.value--}`
        );
        aidAllocations.value = response.data;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function gotoPage(number) {
    try {
      if (number <= lastPage.value && number > 0) {
        allocationLoading.value = true;
        const response = await axiosInstance.get(
          `/api/aid-allocations?page=${number}`
        );
        aidAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  function isFieldsValid(obj) {
    if (obj.people_aid_id == "") {
      throw Error("کمک مورد نظر را انتخاب کنید");
    } else if (obj.help_seeker_id == "") {
      throw Error("مددجوی مورد نظر خود را انتخاب کنید");
    } else if (obj.quantity == "") {
      throw Error("تعداد را مشخص کنید!!!");
    }
    return true;
  }

  return {
    errorInput,
    assignedAids,
    aidAllocations,
    assignAidLoading,
    allocationLoading,

    setAssignedAids,
    setAllAllocations,
    debouncedFiltering,
    createAidAllocation,
    deleteAllocations,
    updateAidAllocation,
    assignAllocations,
  };
}
