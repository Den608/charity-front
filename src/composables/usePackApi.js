import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function usePacks() {
  const packs = ref([]);
  const singlePack = ref({});
  const packLoading = ref(false);
  const packCount = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const inputErrors = ref("");
  const componentStore = useComponentStore();
  const { showPopup} = componentStore;
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

  async function setSinglePack(id) {
    try {
      packLoading.value = true;
      const response = await axiosInstance.get(`/api/packages/${id}`);
      singlePack.value = response.data;
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

    pack.organization_id = "1";

    let isPackValid;
    try {
      isPackValid = ValidateFields(pack);
      const response = await axiosInstance.post(
        "/api/packages/create-package-with-items",
        pack
      );
      showPopup("با موفقیت ساخته شد!!!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error)
      if (isPackValid) {
        showPopup("مشکلی پیش امده است", "error");
      } else {
        inputErrors.value = error.message;
      }
    } finally {
      setTimeout(() => {
        inputErrors.value = "";
      }, 1000);
    }
  }

  async function updatePack(pack, pack_items) {
    pack.package_items = pack_items.value.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    pack.organization_id = "1";

    let isPackValid;
    try {
      isPackValid = ValidateFields(pack);
      const response = await axiosInstance.put(
        `/api/packages/${pack.id}/update-package-with-items`,
        pack
      );
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
    try {
      if (currentPage.value < lastPage.value) {
        packLoading.value = true;
        const response = await axiosInstance.get(
          `/api/packages?page=${currentPage.value++}`
        );
        packs.value = response.data;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      packLoading.value = false;
    }
  }

  async function prevPage() {
    try {
      if (currentPage.value > 1) {
        packLoading.value = true;
        const response = await axiosInstance.get(
          `/api/packages?page=${currentPage.value--}`
        );
        packs.value = response.data;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      packLoading.value = false;
    }
  }

  async function gotoPage(number) {
    try {
      if (number <= lastPage.value && number > 0) {
        packLoading.value = true;
        const response = await axiosInstance.get(
          `/api/packages?page=${number}`
        );
        packs.value = response.data;
      }
    } catch (error) {
      showPopup("مشکلی پیش امده است", "error");
    } finally {
      packLoading.value = false;
    }
  }

  function ValidateFields(obj) {
    console.log(obj.title);
    if (obj.title == "") {
      throw Error("عنوان نمیتواند خالی باشد");
    } else if (obj.quantity <= 0) {
      throw Error("تعداد کالا های اهدایی را مشخص کنید");
    }
    return true;
  }

  return {
    packs,
    packLoading,
    singlePack,
    currentPage,
    lastPage,
    inputErrors,
    setAllPacks,
    setSinglePack,
    createPack,
    updatePack,
    deletePacks,
    filterPack: filterDebounced,
    prevPage,
    nextPage,
    gotoPage,
  };
}
