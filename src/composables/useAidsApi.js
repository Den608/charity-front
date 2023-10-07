import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useAids() {
  const peopleAids = ref([]);
  const peopleAidCount = ref(0);
  const cashLoading = ref(false);
  const productLoading = ref(false);
  const peopleAidLoading = ref(false);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const cashDonations = ref(0);
  const productDonationsCount = ref(0);
  const productDonations = ref({});
  const inputError = ref("");
  let timeID;
  const componentStore = useComponentStore();
  const { showPopup} = componentStore;

  async function setCashDonation() {
    try {
      cashLoading.value = true;
      const response = await axiosInstance.get("/api/people-aids?type=cash");
      cashDonations.value = response.data.count;
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    } finally {
      cashLoading.value = false;
    }
  }

  async function setProductDonation() {
    try {
      productLoading.value = true;
      const response = await axiosInstance.get("/api/people-aids/");
      productDonations.value = response.data;
      productDonationsCount.value = response.data.count;
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    } finally {
      productLoading.value = false;
    }
  }

  async function setAllAids() {
    try {
      peopleAidLoading.value = true;
      const response = await axiosInstance.get("/api/people-aids");
      peopleAids.value = response.data.peopleAids;
      peopleAidCount.value = response.data.count;
      lastPage.value = Math.ceil(peopleAidCount.value / 10);
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    } finally {
      peopleAidLoading.value = false;
    }
  }

  async function createAids(peopleAid) {
    console.log('passed')
    let isValid;
    try {
      isValid=ValidateFields(peopleAid);
      await axiosInstance.post("/api/people-aids", peopleAid);
      componentStore.showPopup("با موفقیت ساخته شد !!!", "success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (isValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        inputError.value = error.message;
      }
    }finally{
      setTimeout(() => {
        inputError.value = "";
      }, 3000);
    }
  }

  async function updateAids(peopleAid) {
    let isValid;
    try {
      isValid = ValidateFields(peopleAid);
      await axiosInstance.put(`/api/people-aids/${peopleAid.id}`, peopleAid);
      componentStore.showPopup("با موفقیت ویرایش شد !!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (isValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        inputError.value = error.message;
      }
    } finally {
      setTimeout(() => {
        inputError.value = "";
      }, 3000);
    }
  }

  async function deleteAids(peopleAidList = []) {
    if (peopleAidList.length > 0) {
      const people_aid_ids = peopleAidList.map((obj) => obj.id);
      try {
        await axiosInstance.post("/api/people-aids/delete-multi", {
          people_aid_ids: people_aid_ids,
        });
        showPopup("با موفقیت حذف شد", "success");

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        if (error.isAxiosError) {
          showPopup("مشکلی پیش امده است", "error");
        } else {
          inputError.value = error.message;
          setTimeout(() => {
            inputError.value = "";
          }, 3000);
        }
      }
    }
  }

  async function filterAids(key = " ") {
    try {
      peopleAidLoading.value = true;
      const response = await axiosInstance.get(`/api/people-aids?title=${key}`);
      peopleAids.value = response.data.peopleAids;
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      peopleAidLoading.value = false;
    }
  }

  function filterDebounced(key) {
    clearTimeout(timeID);

    timeID = setTimeout(async () => {
      await filterAids(key);
    }, 1000);
  }

  async function nextPage() {
    if (currentPage.value < lastPage.value) {
      try {
        peopleAidLoading.value = true;
        const response = await axiosInstance.get(
          `/api/people-aids?page=${++currentPage.value}`
        );
        peopleAids.value = response.data.peopleAids;
      } catch (error) {
        showPopup("مشکلی پیش امده است", "error");
      } finally {
        peopleAidLoading.value = false;
      }
    }
  }

  async function prevPage() {
    if (currentPage.value > 1) {
      try {
        peopleAidLoading.value = true;
        const response = await axiosInstance.get(
          `/api/people-aids?page=${--currentPage.value}`
        );
        peopleAids.value = response.data.peopleAids;
      } catch (error) {
        showPopup("مشکلی پیش امده است", "error");
      } finally {
        peopleAidLoading.value = false;
      }
    }
  }

  async function gotoPage(number) {
    if ((number <= lastPage.value) & (number > 0)) {
      try {
        peopleAidLoading.value = true;
        const response = await axiosInstance.get(
          `/api/people-aids?page=${number}`
        );
        peopleAids.value = response.data.peopleAids;
        currentPage.value = number;
      } catch (error) {
        console.log(error);
        showPopup("مشکلی پیش امده است", "error");
      } finally {
        peopleAidLoading.value = false;
      }
    }
  }

  function ValidateFields(obj) {
    if (obj.title == "") {
      throw new Error("عنوان نمیتواند خالی باشد");
    } else if (obj.product_id == "") {
      throw new Error("کالای مورد نظر را انتخاب کنید");
    } else if (obj.helper_id == "") {
      throw new Error("مددیار مورد نظر خود را انتخاب نمایید");
    } else if (obj.quantity <= 0) {
      throw new Error("تعداد کالا های اهدایی را مشخص کنید");
    }
  }

  return {
    peopleAids,
    currentPage,
    lastPage,
    productDonationsCount,
    cashDonations,
    inputError,
    peopleAidLoading,

    setCashDonation,
    setProductDonation,
    setAllAids,
    createAids,
    updateAids,
    deleteAids,
    filterAids: filterDebounced,
    nextPage,
    prevPage,
    gotoPage,
  };
}
