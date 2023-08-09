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
    await axiosInstance
      .get("/api/people-aids?type=cash")
      .then((response) => {
        cashDonations.value = response.data.count;
      })
      .catch((error) => {
        showPopup("مشکلی رخ داده است!!!", "error");
      });
  }

  async function setProductDonation() {
    await axiosInstance
      .get("/api/people-aids?type=product&page=1")
      .then((response) => {
        productDonations.value = response.data;
        productDonationsCount.value = response.data.count;
      })
      .catch((error) => {
        showPopup("مشکلی رخ داده است!!!", "error");
      });
  }

  async function setAllAids() {
    await axiosInstance
      .get("/api/people-aids")
      .then((response) => {
        peopleAids.value = response.data.peopleAids;
        peopleAidCount.value = response.data.count;
        lastPage.value = Math.ceil(peopleAidCount.value / 10);
      })
      .catch((error) => {
        showPopup("مشکلی رخ داده است!!!", "error");
      });
  }

  async function createAids(peopleAid) {
    const notValid = ValidateFields(peopleAid);
    inputError.value = notValid;
    if (!notValid) {
      await axiosInstance
        .post("/api/people-aids", peopleAid)
        .then((response) => {
          componentStore.showPopup("با موفقیت ساخته شد !!!", "success");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    } else {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function updateAids(peopleAid) {
    const notValid = ValidateFields(peopleAid);
    inputError.value = notValid;
    if (!notValid) {
      await axiosInstance
        .put("/api/people-aids", peopleAid)
        .then((response) => {
          componentStore.showPopup("با موفقیت ویرایش شد !!!", "success");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    } else {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function deleteAids(peopleAidList = []) {
    if (peopleAidList.length > 0) {
      const people_aid_ids = peopleAidList.map((obj) => obj.id);

      await axiosInstance
        .post("/api/people-aids/delete-multi", {
          people_aid_ids: people_aid_ids,
        })
        .then((response) => {
          showPopup("با موفقیت حذف شد", "success");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    }
  }

  async function filterAids(key) {
    showLoading();
    await axiosInstance
      .get(`/api/people-aids?title=${key}`)
      .then((response) => {
        peopleAids.value = response.data.peopleAids;
      })
      .catch((error) => {
        showPopup("مشکلی پیش امده است", "error");
      });
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
    showLoading();
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
    dismissLoading();
  }

  function ValidateFields(obj) {
    if (obj.title == "") {
      return "عنوان نمیتواند خالی باشد";
    } else if (obj.product_id == "") {
      return "کالای مورد نظر را انتخاب کنید";
    } else if (obj.helper_id) {
      return "مددیار مورد نظر خود را وارد نمایید";
    } else if (obj.quantity <= 0) {
      return "تعداد کالا های اهدایی را مشخص کنید";
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
