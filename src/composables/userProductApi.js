import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";
import axios from "axios";

export function useProduct() {
  const productLoading = ref(false);
  const products = ref([{}]);
  const productCatagories = ref([]);
  const productCount = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const inputErrors = ref("");
  const componentStore = useComponentStore();
  const { withLoadingIndicator, showPopup, showLoading, dismissLoading } =
    componentStore;
  let timeID;

  async function setAllProdcuts() {
    try {
      productLoading.value = true;
      const response = await axiosInstance.get(`/api/products?page=1`);
      products.value = response.data.products;
      productCount.value = response.data.count;
      lastPage.value = Math.ceil(productCount.value / 10);
    } catch (error) {
      showPopup("مشکلی رخ داده ", "error");
    } finally {
      productLoading.value = false;
    }
  }

  async function setAllCatagories() {
    try {
      const response = await axiosInstance.get(`/api/product-categories`);
      productCatagories.value = response.data;
    } catch (error) {
      showPopup("مشکلی رخ داده ", "error");
    }
  }

  async function createProdcut(product_obj) {
    let isFieldsValid;
    try {
      isFieldsValid = validateFields(product_obj);
      const response = await axiosInstance.post(`/api/products`, product_obj);
      componentStore.showPopup("محصول با موفیقت ساخته شد!!!", "success", 2);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (isFieldsValid) {
        showPopup("مشکلی رخ داده ", "error");
      }
    } finally {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function updateProduct(product_obj) {
    let isFieldsValid;
    try {
      isFieldsValid = validateFields(product_obj);
      const response = await axiosInstance.put(
        `/api/products/${product_obj.id}`,
        product_obj
      );
      componentStore.showPopup("محصول با موفیقت ویرایش شد!!!", "success", 2);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      showPopup("مشکلی رخ داده ", "error");
    } finally {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function deleteProducts(products_obj = []) {
    try {
      if (products_obj) {
        const products_ids = products_obj.map((obj) => obj.id);
        const response = await axiosInstance.post(
          `/api/products/delete-multi`,
          {
            product_ids: products_ids,
          }
        );
        componentStore.showPopup("عملیات با موفقیت انجام شد!!!", "success");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!");
    }
  }

  async function filterProdcuts(key) {
    try {
      productLoading.value = true;
      const response = await axiosInstance.get(`/api/products?name=${key}`);
      products.value = response.data.products;
      productCount.value = response.data.count;
    } catch (error) {
      showPopup("مشکلی رخ داده است!!!", "error");
    } finally {
      productLoading.value = false;
    }
  }

  async function filterDebounced(key) {
    clearTimeout(timeID);
    timeID = setTimeout(async () => {
      await withLoadingIndicator(filterProdcuts(key));
    }, 500);
  }

  async function nextPage() {
    try {
      productLoading.value = true;
      if (currentPage.value < lastPage.value) {
        const response = await axiosInstance.get(
          `/api/products?page=${++currentPage.value}`
        );
        products.value = response.data.products;
      }
    } catch (error) {
      showPopup("مشکلی رخ داده ", "error");
    } finally {
      productLoading.value = false;
    }
  }

  async function prevPage() {
    try {
      productLoading.value = true;
      if (currentPage.value > 0) {
        const response = await axiosInstance.get(
          `/api/products?page=${--currentPage.value}`
        );
        products.value = response.data.products;
      }
    } catch (error) {
      showPopup("مشکلی رخ داده ", "error");
    } finally {
      productLoading.value = false;
    }
  }

  async function gotoPage(number) {
    try {
      productLoading.value = true;
      if (number >= 1) {
        const response = await axiosInstance.get(
          `/api/products?page=${number}`
        );
        products.value = response.data.products;
        currentPage.value = number;
      }
    } catch (error) {
      showPopup("مشکلی رخ داده ", "error");
    } finally {
      productLoading.value = false;
    }
  }

  function validateFields(product_obj) {
    if (product_obj.name < 2) {
      throw Error("عنوان نمیتواند خالی باشد");
    } else if (product_obj.quantity < 0) {
      throw Error("تعداد محصولات نمیتواند منفی باید");
    } else if (product_obj.quantity == "") {
      throw Error("لطفا تعداد موجودی کالا را مشخص کنید");
    } else if (product_obj.category_id == "") {
      throw Error("لطفا دسته بندی محصول را انتخاب کنید");
    } else if (product_obj.type == "") {
      throw Error("لطفا نوع محصول را انتخاب کنید");
    }
  }

  return {
    products,
    productCatagories,
    productCount,
    productLoading,
    currentPage,
    lastPage,
    inputErrors,
    setAllProdcuts,
    setAllCatagories,
    createProdcut,
    updateProduct,
    deleteProducts,
    filterDebounced,
    nextPage,
    prevPage,
    gotoPage,
  };
}
