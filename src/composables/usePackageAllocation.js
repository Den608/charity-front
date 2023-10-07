import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function usePackAllocation() {
  const allocationLoading = ref(false);
  const packAllocations = ref([]);
  const packAllocationsCount = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const errorInput = ref("");
  let timeID;
  const componentStore = useComponentStore();
  const { showPopup } = componentStore;

  async function setAllPackAllocation() {
    try {
      allocationLoading.value = true;
      const response = await axiosInstance.get(`/api/package-allocations`);
      packAllocations.value = response.data.allocations;
      packAllocationsCount.value = response.data.count;
      lastPage.value = Math.ceil(packAllocations.value / 10);
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function createPackAllocation(packAllocation) {
    let isValid;
    try {
      isValid = ValidateFields(packAllocation);
      const response = await axiosInstance.post(
        `/api/package-allocations`,
        packAllocation
      );
      showPopup("با موفقیت ساخته شد!!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (isValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        errorInput.value = notValid;
      }
    }
  }

  async function updatePackAllocation(packAllocation) {
    let isValid;
    try {
      allocationLoading.value = true;
      isValid = ValidateFields(packAllocation);
      const response = await axiosInstance.put(
        `/api/package-allocations/${packAllocation.id}`,
        packAllocation
      );
      showPopup("با موفقیت انجام شد!!!", "success");
    } catch (error) {
      if (isValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        errorInput.value = notValid;
      }
    } finally {
      allocationLoading.value = false;
    }
  }

  async function deletePackAllocations(packAllocationList = []) {
    try {
      if (packAllocationList.length > 0) {
        allocationLoading.value = true;
        const package_allocation_ids = packAllocationList.map((obj) => obj.id);
        const response = await axiosInstance.post(
          "/api/package-allocations/delete-multi",
          {
            package_allocation_ids: package_allocation_ids,
          }
        );
        showPopup("با موفقیت حذف شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch {
      showPopup("مشکلی پیش امده است", "error");
    }finally {
      allocationLoading.value = false;
    }
  }

  async function assignPackAllocations(packAllocationList = []) {
    try {
      if (packAllocationList.length > 0) {
        allocationLoading.value=true
        const package_allocation_ids = packAllocationList.map((obj) => obj.id);
        const response = await axiosInstance.post(
          "/api/package-allocations/assign-multi",
          {
            package_allocation_ids: package_allocation_ids,
          }
        );
        showPopup("با موفقیت اعمال شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch {
      showPopup("مشکلی پیش امده است", "error");
    }finally {
      allocationLoading.value = false;
    }
  }

  async function filterPackAllocation(key) {
    try {
      allocationLoading.value = true;
      const response = await axiosInstance.get(
        `/api/package-allocations?title=${key}`
      );
      packAllocations.value = response.data.allocations;
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  function filterDebounced(key) {
    clearTimeout(timeID);

    timeID = setTimeout(async () => {
      await filterPackAllocation(key);
    }, 1000);
  }

  async function nextPage() {
    try {
      allocationLoading.value = true;
      if (currentPage.value < lastPage.value) {
        const response = await axiosInstance.get(
          `/api/package-allocations?page=${++currentPage.value}`
        );
        packAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function prevPage() {
    try {
      allocationLoading.value = true;
      if (currentPage.value > 1) {
        const response = await axiosInstance.get(
          `/api/package-allocations?page=${--currentPage.value}`
        );
        packAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  async function gotoPage(number) {
    try {
      allocationLoading.value = true;
      if (number <= lastPage.value && number > 0) {
        const response = await axiosInstance.get(
          `/api/package-allocations?page=${number}`
        );
        packAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      allocationLoading.value = false;
    }
  }

  function ValidateFields(obj) {
    if (obj.help_seeker_id == "") {
      throw Error("مددجو مورد نظر را انخالب کنید");
    } else if (obj.quantity <= 0) {
      throw Error("تعداد پک های اهدایی را مشخص کنید");
    } else if (obj.quantity <= 0) {
      throw Error("بسته اهدایی را انتخاب کنید");
    }
    return true;
  }

  return {
    allocationLoading,
    packAllocations,
    lastPage,
    currentPage,
    errorInput,
    setAllPackAllocation,
    createPackAllocation,
    updatePackAllocation,
    deletePackAllocations,
    filterDebounced,
    nextPage,
    prevPage,
    gotoPage,
    assignPackAllocations,
  };
}
