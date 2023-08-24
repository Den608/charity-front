import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function usePacks() {
  const packs = ref([]);
  const packLoading = ref(false);
  const packCount = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const inputErrors = ref("");
  const componentStore = useComponentStore();
  const { showPopup, showLoading, dismissLoading } = componentStore;
  let timeID;

  async function setAllPacks() {
    try {
      packLoading.value = true;
      const response = await axiosInstance.get("/api/packages?page=1");
      packs.value = response.data.packages;
      packCount.value = response.data.count;
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      packLoading.value = false;
    }
  }

  async function createPack(pack, pack_items) {
    pack.package_items = pack_items.value.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    let isPackValid;
    try {
      isPackValid = ValidateFields(pack);
      const response = await axiosInstance.post("/api/packages/create-package-with-items", pack);
      showPopup("با موفقیت ساخته شد!!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (isPackValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        inputErrors.value = error.message;
      }
    } finally {
      setTimeout(() => {
        inputErrors.value = "";
      }, 2000);
    }
  }

  async function updatePack(pack, pack_items) {
    let isPackValid;
    try {
      isPackValid = ValidateFields(pack);
      const response = await axiosInstance.put("/api/packages", pack);
      showPopup("با موفقیت ویرایش شد!!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (isPackValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        inputErrors.value = error.message;
      }
    } finally {
      setTimeout(() => {
        inputErrors.value = "";
      }, 2000);
    }
  }

  async function deletePacks(packList = []) {
    try {
      if (packList.length > 0) {
        const pack_id = packList.map((obj) => obj.id);
        const response = await axiosInstance.post(
          "/api/packages/delete-multi",
          { package_ids: pack_id }
        );
        showPopup("با موفقیت حذف شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    }
  }

  async function filterPack(key) {
    try {
      packLoading.value = true;
      const response = await axiosInstance.get(`/api/packages?title=${key}`);
      packs.value = response.data.packages;
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      packLoading.value = false;
    }
  }

  function filterDebounced(key) {
    clearTimeout(timeID);

    timeID = setTimeout(async () => {
      await filterPack(key);
    }, 500);
  }

  async function nextPage() {
    showLoading();
    if (currentPage.value < lastPage.value) {
      await axiosInstance
        .get(`/api/packages?page=${currentPage.value++}`)
        .then((response) => {
          packs.value = response.data.count;
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    }
    dismissLoading();
  }

  async function prevPage() {
    showLoading();
    if (currentPage.value > 1) {
      await axiosInstance
        .get(`/api/packages?page=${currentPage.value--}`)
        .then((response) => {
          packs.value = response.data.count;
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    }
    dismissLoading();
  }

  async function gotoPage(number) {
    showLoading();
    if (number <= lastPage.value && number > 0) {
      await axiosInstance
        .get(`/api/packages?page=${number}`)
        .then((response) => {
          packs.value = response.data.count;
        })
        .catch((error) => {
          showPopup("مشکلی پیش امده است", "error");
        });
    }
    dismissLoading();
  }

  function ValidateFields(obj) {
    console.log(obj);
    if (obj.title == "") {
      throw Error("عنوان نمیتواند خالی باشد");
    } else if (obj.quantity <= 0) {
      throw Error("تعداد کالا های اهدایی را مشخص کنید");
    }
    return true
  }

  return {
    packs,
    currentPage,
    lastPage,
    inputErrors,
    setAllPacks,
    createPack,
    updatePack,
    deletePacks,
    filterPack: filterDebounced,
    prevPage,
    nextPage,
    gotoPage,
  };
}
