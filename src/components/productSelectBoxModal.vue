<script setup>
import { ref, onMounted, watch } from "vue";
import Pagination from "./Pagination.vue";
import SimpleLoading from "./SimpleLoading.vue";
import { useProduct } from "../composables/userProductApi";

const emit = defineEmits(["onClose", "onSubmit"]);

const dropDown = ref(false);
const selectedList = ref([]);
const selectedListName = ref("");
const searchInput = ref("");
const loading = ref(false);

const productApi = useProduct();
const { products, currentPage, lastPage,productLoading } = productApi;

function onOpenerClick() {
  dropDown.value = !dropDown.value;
}

function productChecked(product) {
  if (product.checked) {
    selectedList.value.push(product);
  } else {
    const index = selectedList.value.indexOf(product);
    selectedList.value.splice(index, 1);
  }
  selectedListName.value = selectedList.value.reduce((accumulator, item) => {
    return accumulator + item.name + "-";
  }, "");
}

onMounted(async () => {
  loading.value = true;
  await productApi.setAllProdcuts();
  loading.value = false;
});

watch(searchInput, async () => {
  loading.value = true;
  if (searchInput.value.length > 1) {
    await productApi.filterDebounced(searchInput.value);
  } else if (searchInput.value.length <= 1) {
    await productApi.setAllProdcuts();
  }
  loading.value = false;
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
        <input type="button" value="ثبت" />
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
                    <span class="material-symbols-sharp delete"> delete </span>
                  </td>
                  <td>{{ obj.name }}</td>
                  <td><input type="number" :value="obj.quantity" /></td>
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
                <input
                  type="checkbox"
                  v-model="product.checked"
                  @change="productChecked(product)"
                />
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
                  v-model="product.quantity"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="loader">
        <SimpleLoading />
      </div>
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
  max-height: 30rem;
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

.select-overlay .select-modal .input input[type="button"] {
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
  width: inherit;
  max-height: 10rem;
  overflow: auto;
}
.selected .selected-box .selected-dropdown table {
  margin: 0px;
  padding: 0px;
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
  width: 100%;
  max-height: 20rem;
  overflow: auto;
}

.select-overlay .select-modal table {
  cursor: pointer;
  margin-top: 1.2rem;
  text-align: center;
  transition: all 300ms ease;
  width: 100%;
}

.select-overlay .select-modal table:hover {
  box-shadow: none;
}

.select-overlay .select-modal table tbody tr td {
  height: 3rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark);
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
</style>
