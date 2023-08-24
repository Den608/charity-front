<script setup>
import { ref, onMounted, watch } from "vue";
import Pagination from "./Pagination.vue";
import SimpleLoading from "./SimpleLoading.vue";
import { useProduct } from "../composables/userProductApi";

const emit = defineEmits(["onClose", "onSubmit"]);
const { itemList } = defineProps(["itemList"]);

const dropDown = ref(false);
const selectedList = ref([]);
const selectedListName = ref("");
const searchInput = ref("");
const loading = ref(false);
const errorMessage = ref("");
const productApi = useProduct();
const { products, currentPage, lastPage, productLoading } = productApi;

function onOpenerClick() {
  dropDown.value = !dropDown.value;
}

function addProductToSelected(product) {
  const index = selectedList.value.findIndex((item) => item.id === product.id);
  if (!product.inputQuantity) {
    errorMessage.value = `لطفا تعداد کالا را مشخص نمایید!!!`;
  } else if (index >= 0) {
    let oldQuantity = selectedList.value[index].selectedQuantity;
    let newQuantity = product.inputQuantity;
    if (oldQuantity + newQuantity < product.quantity) {
      selectedList.value[index].selectedQuantity = oldQuantity + newQuantity;
    }
    {
      errorMessage.value = `موجودی کافی نیست!!!`;
    }
  } else {
    product.selectedQuantity = product.inputQuantity;
    if (product.selectedQuantity <= product.quantity) {
      selectedList.value.push(product);
    } else {
      errorMessage.value = `موجودی کافی نیست!!!`;
    }
  }

  selectedListName.value = selectedList.value.reduce((accumulator, item) => {
    return accumulator + item.name + `(${item.selectedQuantity})` + "-";
  }, "");
  setTimeout(() => {
    errorMessage.value = "";
  }, 2000);
}

function onDropDownDelete(product) {
  const index = selectedList.value.indexOf(product);
  selectedList.value.splice(index, 1);

  selectedListName.value = selectedList.value.reduce((accumulator, item) => {
    return accumulator + `(${item.selectedQuantity})` + item.name + "-";
  }, "");
}

function onSubmit() {
  if (selectedList.value.length > 0) {
    selectedList.value.map((item) => {
      item.quantity = item.selectedQuantity;
      delete item.selectedQuantity;
      delete item.inputQuantity;
    });
  }
  emit("onSubmit", selectedList.value);
}

function settingSelectedProduct() {
  selectedList.value.map((item) => {
    item.selectedQuantity = item.quantity;
  });

  selectedListName.value = selectedList.value.reduce((accumulator, item) => {
    return accumulator + `(${item.selectedQuantity})` + item.name + "-";
  }, "");
}

onMounted(async () => {
  loading.value = true;
  await productApi.setAllProdcuts();
  loading.value = false;
  if (itemList.length > 0) {
    selectedList.value = itemList;
    settingSelectedProduct();
  }
});

watch(searchInput, async () => {
  if (searchInput.value.length > 1) {
    await productApi.filterDebounced(searchInput.value);
  } else if (searchInput.value.length <= 1) {
    await productApi.setAllProdcuts();
  }
});
</script>

<template>
  <div class="select-overlay">
    <div class="select-modal">
      <span class="material-symbols-sharp" id="close" @click="emit('onClose')">
        close
      </span>

      <div class="input">
        <span class="material-symbols-sharp search">search</span>
        <input type="text" v-model="searchInput" />
        <input type="submit" value="ثبت" @click="onSubmit" />
      </div>

      <div class="selected">
        <div class="selected-box">
          <div class="selected-item" @click="onOpenerClick">
            <span
              v-if="!dropDown"
              class="material-symbols-sharp ico"
              id="opener-span"
              >expand_more</span
            >
            <span
              v-if="dropDown"
              class="material-symbols-sharp ico"
              id="opener-span"
              >close</span
            >
            <span>{{ selectedListName }}</span>
          </div>

          <div class="selected-dropdown" v-if="dropDown">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>عنوان</th>
                  <th>تعداد انتخابی</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="obj in selectedList">
                  <td>
                    <span
                      class="material-symbols-sharp delete"
                      @click="onDropDownDelete(obj)"
                    >
                      delete
                    </span>
                  </td>
                  <td>{{ obj.name }}</td>
                  <td>
                    <input type="number" v-model="obj.selectedQuantity" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="pagination">
        <Pagination
          v-if="lastPage > 1"
          id="pagination"
          :currentPage="currentPage"
          :lastPage="lastPage"
          @next="productApi.nextPage"
          @prev="productApi.prevPage"
          @goTo="productApi.gotoPage"
        />
      </div>

      <div v-if="!productLoading" class="product-list">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>عنوان</th>
              <th class="responsive-hidden">نوع</th>
              <th>دسته بندی کالا</th>
              <th class="responsive-hidden">تعداد کالا های انتخابی</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <span
                  class="material-symbols-sharp add"
                  @click="addProductToSelected(product)"
                >
                  add
                </span>
              </td>
              <td>{{ product.name }}</td>
              <td v-if="product.category" class="responsive-hidden">
                {{ product.category.name }}
              </td>
              <td>پوشاک</td>
              <td>
                <input
                  type="number"
                  :min="0"
                  :max="product.quantity"
                  :placeholder="product.quantity"
                  v-model="product.inputQuantity"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="loader">
        <SimpleLoading />
      </div>

      <div class="error" v-if="errorMessage.length > 0">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
}

input[type="number"] {
  width: 5rem;
  height: 2.6rem;
  text-align: center;
  margin: 0.1rem;
}
.select-overlay {
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.3); */
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  z-index: 10;
  overflow: auto;
}

.select-overlay .select-modal {
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: var(--card-padding);
  position: relative;
  width: 40rem;
  min-height: 30rem;
  max-height: 40rem;
  height: 100%;
  overflow: hidden;
}

.select-overlay .select-modal #close {
  color: var(--color-danger);
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  padding: 0.4rem;
  top: 0.1rem;
  right: 1rem;
  width: 100%;
}

.select-overlay .select-modal #close:hover {
  color: red;
  transition: all 300ms ease;
}

.select-overlay .select-modal .input {
  align-items: center;
  background-color: var(--color-white);
  display: flex;
  justify-content: space-between;
  height: 2.4rem;
  margin-top: 1rem;
  position: relative;
  width: 100%;
}

.select-overlay .select-modal .input .search {
  position: absolute;
}
.select-overlay .select-modal .input input[type="text"] {
  background-color: var(--color-light);
  border-radius: var(--border-radius-1);
  width: 50%;
  height: 2.4rem;
  padding-right: 2rem;
  margin: 0px !important;
}

.select-overlay .select-modal .input input[type="submit"] {
  background-color: var(--color-primary);
  border-radius: var(--border-radius-1);
  color: var(--color-white);
  cursor: pointer;
  padding: 0.4rem 1rem;
}

.select-overlay .select-modal .input input[type="button"]:hover {
  background-color: var(--color-light);
  border-radius: var(--border-radius-1);
  color: var(--color-dark);
  padding: 0.4rem 1rem;
  transition: all 300ms ease;
}

.selected {
  width: 100%;
  margin-top: 1rem;
}

.selected .selected-box {
  height: 2.6rem;
  position: relative;
  width: inherit;
}

.selected .selected-box .selected-item {
  background-color: var(--color-light);
  height: inherit;
  border-radius: var(--border-radius-1);
  width: inherit;
}

.selected .selected-box .selected-dropdown {
  background-color: var(--color-white);
  border-radius: 0 0 1rem 1rem;
  box-shadow: var(--box-shadow);
  height: 10rem;
  max-height: 10rem;
  overflow: auto;
  width: inherit;
}
.selected .selected-box .selected-dropdown table {
  cursor: pointer;
  margin-top: 1.2rem;
  text-align: center;
  transition: all 300ms ease;
  width: 100%;
}

.selected .selected-box .selected-dropdown table tr td {
  height: 2.6rem;
}

.selected .selected-box .selected-dropdown table tr td .delete {
  color: var(--color-danger);
}

.select-overlay .select-modal.input .search {
  font-weight: bold;
  position: absolute;
  text-align: center;
}

.select-overlay .select-modal .product-list {
  background: var(--color-background);
  box-shadow: var(--box-shadow);
  border-radius: 0.4rem;
  height: 23rem;
  max-height: 25rem;
  overflow: auto;
  width: 100%;
}

.select-overlay .select-modal .product-list table {
  cursor: pointer;
  margin-top: 1.2rem;
  text-align: center;
  transition: all 300ms ease;
  width: 100%;
}

.select-overlay .select-modal .product-list table:hover {
  box-shadow: none;
}

.select-overlay .select-modal .product-list table tbody tr td {
  height: 3rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark);
}

.select-overlay .select-modal .product-list .add {
  background-color: var(--color-light);
  border-radius: 50%;
}
.select-overlay .select-modal .product-list .add:hover {
  background-color: var(--color-primary-light);
  transition: all 300ms ease-in-out;
}

.select-overlay .select-modal table thead tr th {
  height: 2.8rem;
  border-bottom: 1px solid var(--color-dark);
  color: var(--color-dark);
}
.select-overlay .select-modal table tbody tr:last-child td {
  border: none;
}

.select-overlay .select-modal #submit {
  background-color: var(--color-primary);
  border-radius: var(--card-border-radius);
  color: var(--color-white);
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 2.2rem;
  width: 90%;
  height: 3rem;
}

.select-overlay .select-modal .loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-overlay .select-modal .error {
  color: var(--color-danger);
}
</style>
