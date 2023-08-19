import { TrackOpTypes, ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function usePeoplesAid() {
  const packAllocations = ref([]);
  const packAllocationsCount = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const error = ref("");
  let timeID;
  const componentStore = useComponentStore();
  const { showPopup, showLoading, dismissLoading } = componentStore;

  async function setAllPackAllocation() {
    try {
      response = await axiosInstance.get(`/api/package-allocations`);
      packAllocations.value = response.data.packages;
      packAllocationsCount.value = response.data.count;
      lastPage.value = Math.ceil(packAllocations.value / 10);
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    }
  }

  async function createPackAllocation(packAllocation) {
    let validation;
    try {
      validation = ValidateFields(packAllocation);
      const response = await axiosInstance.post(
        `/api/package-allocations`,
        packAllocation
      );
      showPopup("با موفقیت ساخته شد!!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (validation) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        error.value = notValid;
      }
    }
  }

  async function updatePackAllocation(packAllocation) {
    let validation;
    try {
      validation = ValidateFields(packAllocation);
      const response = await axiosInstance.put(
        `/api/package-allocations/${packAllocation.id}`,
        packAllocation
      );
      showPopup("با موفقیت ویرایش شد!!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (validation) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        error.value = notValid;
      }
    }
  }

  async function deletePackAllocations(packAllocationList = []) {
    try {
      if (packAllocationList.length > 0) {
        const packAllocation_id = packAllocationList.map((obj) => obj.id);
        const response = await axiosInstance.post(
          "/api/package-allocations/delete-multi",
          {
            packAllocation_ids: packAllocation_id,
          }
        );
        showPopup("با موفقیت حذف شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch {
      showPopup("مشکلی پیش امده است", "error");
    }
  }

  async function filterPackAllocation(key) {
    try {
      showLoading();
      const response = await axiosInstance.get(
        `/api/package-allocations?title=${key}`
      );
      packAllocations.value = response.data.packages;
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      dismissLoading();
    }
  }

  function filterDebounced(key) {
    clearTimeout(timeID);

    timeID = setTimeout(async () => {
      await filterPackAllocation(key);
    });
  }

  async function nextPage() {
    try {
      showLoading();
      if (currentPage.value < lastPage.value) {
        const response = await axiosInstance.get(
          `/api/package-allocations?page=${++currentPage.value}`
        );
        packAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      dismissLoading();
    }
  }

  async function prevPage() {
    try {
      showLoading();
      if (currentPage.value > 1) {
        const response = await axiosInstance.get(
          `/api/package-allocations?page=${--currentPage.value}`
        );
        packAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      dismissLoading();
    }
  }

  async function gotoPage(number) {
    try {
      showLoading();
      if (number <= lastPage.value && number > 0) {
        const response = await axiosInstance.get(
          `/api/package-allocations?page=${number}`
        );
        packAllocations.value = response.data.count;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      dismissLoading();
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
    packAllocations,
    lastPage,
    currentPage,
    error,
    setAllPackAllocation,
    createPackAllocation,
    updatePackAllocation,
    deletePackAllocations,
    filterDebounced,
    nextPage,
    prevPage,
    gotoPage,
  };
}
