import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useAids() {
  const peopleAids = ref([]);
  const peopleAidCount = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const cashDonations = ref(0);
  const productDonationsCount = ref(0);
  const productDonations = ref({});
  const inputError = ref("");
  let timeID;
  const componentStore = useComponentStore();
  const { showPopup, showLoading, dismissLoading } = componentStore;

  async function setCashDonation() {
    try {
      const response = await axiosInstance.get("/api/people-aids?type=cash");
      cashDonations.value = response.data.count;
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    }
  }

  async function setProductDonation() {
    try {
      const response = await axiosInstance.get("/api/people-aids/");
      productDonations.value = response.data;
      productDonationsCount.value = response.data.count;
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    }
  }

  async function setAllAids() {
    try {
      const response = await axiosInstance.get("/api/people-aids");
      peopleAids.value = response.data.peopleAids;
      peopleAidCount.value = response.data.count;
      lastPage.value = Math.ceil(peopleAidCount.value / 10);
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    }
  }

  async function createAids(peopleAid) {
    try {
      ValidateFields(peopleAid);
      await axiosInstance.post("/api/people-aids", peopleAid);
      componentStore.showPopup("با موفقیت ساخته شد !!!", "success");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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

  async function updateAids(peopleAid) {
    try {
      ValidateFields(peopleAid);
      await axiosInstance.put("/api/people-aids", peopleAid);
      componentStore.showPopup("با موفقیت ویرایش شد !!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
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
        }, 2000);
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

  async function filterAids(key) {
    showLoading();
    try {
      await axiosInstance
        .get(`/api/people-aids?title=${key}`)
        .then((response) => {
          peopleAids.value = response.data.peopleAids;
        });
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    }
    dismissLoading();
  }

  function filterDebounced(key) {
    clearTimeout(timeID);

    timeID = setTimeout(async () => {
      await filterAids(key);
    });
  }

  async function nextPage() {
    showLoading();
    if (currentPage.value < lastPage.value) {
      await axiosInstance
        .get(`/api/people-aids?page=${currentPage.value++}`)
        .then((response) => {
          peopleAids.value = response.data.peopleAids;
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    }
    dismissLoading();
  }

  async function prevPage() {
    if (currentPage.value > 1) {
      await axiosInstance
        .get(`/api/people-aids?page=${currentPage.value--}`)
        .then((response) => {
          peopleAids.value = response.data.peopleAids;
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    }
  }

  async function gotoPage(number) {
    if (number <= lastPage.value && number > 0) {
      await axiosInstance
        .get(`/api/people-aids?page=${number}`)
        .then((response) => {
          peopleAids.value = response.data.peopleAids;
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
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
    productDonations,
    cashDonations,
    inputError,
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
