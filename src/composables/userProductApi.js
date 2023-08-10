import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";
import axios from "axios";

export function useProduct() {
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
    await axiosInstance
      .get(`/api/products?page=1`)
      .then((response) => {
        products.value = response.data.products;
        productCount.value = response.data.count;
        lastPage.value = Math.ceil(productCount.value / 10);
      })
      .catch((error) => {
        showPopup("مشکلی رخ داده ", "error");
      });
  }

  async function setAllCatagories() {
    await axiosInstance
      .get(`/api/product-categories`)
      .then((response) => {
        productCatagories.value = response.data;
      })
      .catch((error) => {
        showPopup("مشکلی رخ داده ", "error");
      });
  }

  async function createProdcut(product_obj) {
    const notValid = validateFields(product_obj);
    if (!notValid) {
      await axiosInstance
        .post(`/api/products`, product_obj)
        .then((response) => {
          componentStore.showPopup("محصول با موفیقت ساخته شد!!!", "success", 2);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          showPopup("مشکلی رخ داده ", "error");
        });
    } else {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function updateProduct(product_obj) {
    const notValid = validateFields(product_obj);
    inputError.value = notValid;
    if (!notValid) {
      await axiosInstance
        .put(`/api/products/${product_obj.id}`, product_obj)
        .then((response) => {
          componentStore.showPopup(
            "محصول با موفیقت ویرایش شد!!!",
            "success",
            2
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          showPopup("مشکلی رخ داده ", "error");
        });
    } else {
      setTimeout(() => {
        errorInput.value = "";
      }, 3000);
    }
  }

  async function deleteProducts(products_obj = []) {
    if (products_obj) {
      const products_ids = products_obj.map((obj) => obj.id);

      await axiosInstance
        .post(`/api/products/delete-multi`, { product_ids: products_ids })
        .then((response) => {
          componentStore.showPopup("عملیات با موفقیت انجام شد!!!", "success");

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          showPopup("مشکلی رخ داده است!!!");
        });
    }
  }

  async function filterProdcuts(key) {
    showLoading();
    await axiosInstance
      .get(`/api/products?name=${key}`)
      .then((response) => {
        products.value = response.data.products;
        productCount.value = response.data.count;
      })
      .catch((error) => {
        showPopup("مشکلی رخ داده است!!!", "error");
      });
    dismissLoading();
  }

  async function filterDebounced(key) {
    clearTimeout(timeID);
    timeID = setTimeout(async () => {
      await withLoadingIndicator(filterProdcuts(key));
    }, 500);
  }

  async function nextPage() {
    showLoading();
    if (currentPage.value < lastPage.value) {
      await axiosInstance
        .get(`/api/products?page=${++currentPage.value}`)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((error) => {
          showPopup("مشکلی رخ داده ", "error");
        });
    }
    dismissLoading();
  }

  async function prevPage() {
    showLoading();
    if (currentPage.value > 1) {
      await axiosInstance
        .get(`/api/products?page=${--currentPage.value}`)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((error) => {
          showPopup("مشکلی رخ داده ", "error");
        });
    }
    dismissLoading();
  }

  async function gotoPage(number) {
    showLoading();
    if (currentPage.value > 1) {
      await axiosInstance
        .get(`/api/products?page=${number}`)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((error) => {
          showPopup("مشکلی رخ داده ", "error");
        });
    }
    dismissLoading();
  }

  function validateFields(product_obj) {
    if (product_obj.name < 2) {
      return "عنوان نمیتواند خالی باشد";
    } else if (product_obj.quantity < 0) {
      return "تعداد محصولات نمیتواند منفی باید";
    } else if (product_obj.quantity == "") {
      return "لطفا تعداد موجودی کالا را مشخص کنید";
    } else if (product_obj.category_id == "") {
      return "لطفا دسته بندی محصول را انتخاب کنید";
    } else if (product_obj.type == "") {
      return "لطفا نوع محصول را انتخاب کنید";
    }
  }

  return {
    products,
    productCatagories,
    productCount,
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
