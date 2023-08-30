<script setup>
import { ref, watch, onMounted } from "vue";
import Pagination from "../Pagination.vue";
import SimpleLoading from "../SimpleLoading.vue";
import { useProduct } from "../../composables/userProductApi";

let menuLayout;
let menuButton;
let openerSpan;

// porduct data
const productApi = useProduct();
const { products, currentPage, lastPage, productLoading: loader } = productApi;

const menu = ref(false);
const input = ref("");
const emit = defineEmits(["onSelect"]);
const { dataList, initialValue } = defineProps([
  "dataList",
  "initialValue",
  "loading",
]);

const selectValue = ref(initialValue);

function onSelect(data) {
  menu.value = false;
  if (data.name) {
    selectValue.value = data.name;
  } else if (data.first_name) {
    selectValue.value = data.first_name + " " + data.last_name;
  }
  emit("onSelect", data);
}

function onOpenerClick() {
  menu.value = !menu.value;
}

watch(input, async () => {
  await productApi.filterDebounced(input.value);
});

onMounted(async () => {
  await productApi.setAllProdcuts();
});
</script>

<template>
  <div class="menu-layout">
    <div class="opener" id="opener-layout">
      <span
        v-if="!menu"
        class="material-symbols-sharp ico"
        id="opener-span"
        @click="onOpenerClick"
        >expand_more</span
      >
      <span
        v-if="menu"
        class="material-symbols-sharp ico"
        @click="onOpenerClick"
        >close</span
      >
      <input
        type="button"
        class="opener-button"
        :value="selectValue"
        @click="onOpenerClick"
      />
    </div>
    <div v-if="menu" class="menu-container" id="drop-down-menu">
      <div class="menu">
        <div class="input">
          <span class="material-symbols-sharp search">search</span>
          <input type="text" v-model="input" />
        </div>

        <div class="pagination">
          <Pagination
            v-if="lastPage>1"
            id="pagination"
            :currentPage="currentPage"
            :lastPage="lastPage"
            @next="productApi.nextPage"
            @prev="productApi.prevPage"
            @goTo="productApi.gotoPage"
          />
        </div>

        <div v-if="!loader" class="data-list" i>
          <ul>
            <li
              v-for="product in products"
              @click="onSelect(product)"
              :key="product.id"
            >
              {{ product.name }} {{ product.first_name }}
              {{ product.last_name }}
            </li>
          </ul>
        </div>
        <div v-else class="loading">
          <SimpleLoading />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-layout {
  align-items: center;
  background-color: var(--color-light);
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 2.4rem;
  margin-top: 1rem;
  position: relative;
}

.menu-layout .opener {
  border-radius: var(--border-radius-1);
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.menu-layout .opener .opener-button {
  width: inherit;
  background-color: inherit;
  text-align: right;
}

.menu-layout .menu-container {
  width: 100%;
  height: 100%;
}

.menu-layout .menu-container .menu {
  align-items: center;
  background-color: var(--color-background);
  border-radius: 0 0 0.4rem 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 20rem;
  max-height: 20rem;
  overflow: auto;
  padding: 0.6rem;
  position: absolute;
  top: 2.4rem;
  width: 100%;
  z-index: 12;
}

.menu-layout .disabled {
  display: none;
}

.menu-layout .menu-container .input {
  width: inherit;
  display: flex;
  background-color: white;
  align-items: center;
  height: 2.4rem;
}

.menu-layout .menu-container .input input {
  background-color: var(--color-white);
  border-radius: var(--border-radius-1);
  width: 100%;
  height: 2.4rem;
  padding-right: 2rem;
  margin: 0px !important;
}

.menu-layout .menu-container .input .search {
  font-weight: bold;
  position: absolute;
  text-align: center;
}
.menu-layout .menu-container .data-list {
  width: 100%;
}
.menu-layout .menu-container .data-list ul {
  width: 100%;
}
.menu-layout .menu-container .data-list ul li {
  color: var(--color-dark);
  cursor: pointer;
  height: 2rem;
  text-align: center;
  width: inherit;
}

.menu-layout .menu-container .data-list ul li:hover {
  background-color: var(--color-light);
  color: var(--color-primary);
  transition: all 300ms ease;
}

.menu-layout .menu-container .loading {
  align-items: center;
  background-color: var(--color-background);
  border-radius: 0 0 0.4rem 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
  padding: 0.6rem;
  position: absolute;
  top: 2.4rem;
  width: 100%;
  z-index: 12;
}
</style>
