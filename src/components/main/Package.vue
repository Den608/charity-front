<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import UpdateCreateModal from "../UpdateCreateModal.vue";
import Alert from "../Alert.vue";
import useComponentStore from "../../store/componentStore";
import { usePacks } from "../../composables/usePackApi";
import productSelectBoxModal from "../productSelectBoxModal.vue";

const componentStore = useComponentStore();
const { showPopup, showLoading, dismissLoading } = componentStore;

//help
const intialPackValue = {
  title: "",
  quantity: 0,
  description: "",
  package_items: [],
};
const packApi = usePacks();
const { packs, singlePack, currentPage, lastPage, packLoading } = packApi;
const pack = reactive(intialPackValue);
const packList = ref([]);
const packSearchInput = ref("");

// modal
const modalTitle = ref("ثبت پکیج");
const modalShow = ref(false);
const modalMode = ref("create");
const productSelectShow = ref(false);
const packProductsList = ref([]);
const prodductModalOpenerValue = ref("");

const modalPackageItems = ref("");

// alert
const alertShow = ref(false);
const alerMessage = ref("");

async function submitPackage() {
  showLoading();
  if (modalMode.value == "create") {
    await packApi.createPack(pack, packProductsList);
  } else if (modalMode.value == "edit") {
    console.log(pack);
    console.log(packProductsList.value);
    await packApi.updatePack(pack, packProductsList);
  }
  dismissLoading();
}

function showCreateModal() {
  modalShow.value = true;
  modalMode.value = "create";
  for (const key in pack) pack[key] = "";
  modalTitle.value = "ثبت پکیج";
  Object.assign(pack, intialPackValue);
}

async function showEditModal(pack_obj) {
  modalShow.value = true;
  modalTitle.value = "ویرایش پکیج";
  Object.assign(pack, pack_obj);
  modalMode.value = "edit";

  await packApi.setSinglePack(pack_obj.id);
  productSelectedSubmmition(singlePack.value.package_items);

  modalPackageItems.value = singlePack.value.package_items;
}

function setAllChecked(event) {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((el) => {
    el.checked = event.target.checked;
  });

  if (event.target.checked) {
    packs.value.map((obj) => {
      packList.value.push(obj);
    });
  } else {
    packList.value.length = 0;
  }
}

function checked(pack_obj) {
  if (pack_obj.checked) {
    packList.value.push(pack_obj);
  } else {
    const index = packList.value.indexOf(pack_obj);
    packList.value.splice(index, 1);
  }
}

function deletePacks() {
  if (packList.value.length > 0) {
    alertShow.value = true;
    alerMessage.value = "ایا از حذف ایتم های انتخابی اطمینان دارید ؟";
  } else {
    showPopup("هیچ کمکی برای حذف انتخاب نشده است!!!", "error", 3);
  }
}

async function submitDelete(type) {
  showLoading();
  alertShow.value = false;
  if (type == "yes") {
    await packApi.deletePacks(packList.value);
  }
  dismissLoading();
}

// product select box modal
function productSelectedSubmmition(productList) {
  packProductsList.value = productList;
  prodductModalOpenerValue.value = productList.reduce((accumulator, item) => {
    return accumulator + item.name + "-";
  }, "");
  productSelectShow.value = false;
}

watch(packSearchInput, async () => {
  try {
    await packApi.filterPack(packSearchInput.value);
  } catch (error) {
    showPopup("مشکلی پیش امده است ", "error");
  } finally {
  }
});

watch(packLoading, () => {
  if (packLoading.value) {
    showLoading();
  } else {
    dismissLoading();
  }
});

onMounted(async () => {
  showLoading();
  await packApi.setAllPacks();
  dismissLoading();
});
</script>

<template>
  <main>
    <Alert
      v-if="alertShow"
      @submit="submitDelete"
      @onSubmit="submitPackage"
      :message="alerMessage"
    />

    <productSelectBoxModal
      v-if="productSelectShow"
      @onClose="
        productSelectShow = false;
        modalPackageItems = '';
      "
      @onSubmit="productSelectedSubmmition"
      :itemList="packProductsList"
      :packItems="modalPackageItems"
    />

    <UpdateCreateModal
      v-if="modalShow"
      @onClose="
        modalShow = false;
        prodductModalOpenerValue = '';
        modalPackageItems = '';
        packProductsList = '';
      "
      :title="modalTitle"
      :errorInput="packApi.inputErrors"
      @onSubmit="submitPackage"
    >
      <input type="text" placeholder="عنوان" v-model="pack.title" />
      <input type="text" placeholder="تعداد" v-model="pack.quantity" />

      <input
        type="button"
        :value="prodductModalOpenerValue ? prodductModalOpenerValue : 'کالاها'"
        @click="productSelectShow = true"
        class="modal-opener"
      />
      <textarea name="explanation" placeholder="توضیحات"></textarea>
    </UpdateCreateModal>

    <div class="header">
      <h1>بسته های مناسبتی</h1>

      <div class="input-fields">
        <div class="search-bar">
          <span class="material-symbols-sharp">travel_explore</span>
          <input type="text" placeholder="جستجو " v-model="packSearchInput" />
        </div>
        <div class="buttons">
          <span
            class="material-symbols-sharp"
            style="color: red"
            @click="deletePacks"
          >
            delete
          </span>

          <span class="material-symbols-sharp" @click="showCreateModal">
            add
          </span>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" id="main-checkbox" @change="setAllChecked" />
          </th>
          <th>عنوان</th>
          <th>تعداد</th>
          <th>تعداد کالاها</th>
          <th class="responsive-hidden">توضیحات</th>
          <th class="responsive-hidden"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pack in packs" :key="pack.id">
          <td>
            <input
              type="checkbox"
              v-model="pack.checked"
              @change="checked(pack)"
            />
          </td>
          <td>{{ pack.title }}</td>
          <td>{{ pack.quantity }}</td>
          <td>{{ pack.package_items_count }}</td>
          <td class="responsive-hidden">
            {{ pack.description == null ? "......" : pack.description }}
          </td>
          <td class="responsive-hidden primary">
            <span class="material-symbols-sharp" @click="showEditModal(pack)">
              edit_square
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
input[type="checkbox"] {
  width: 1.1rem;
  height: 1.1rem;
}

main .header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

main .header .input-fields {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

main .header .search-bar {
  align-items: center;
  background-color: var(--color-white);
  border-radius: 0.8rem;
  color: var(--color-dark);
  display: flex;
  gap: 0.3rem;
  height: 3rem;
  width: 20rem;
}

main .header .search-bar input {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: inherit;
  background-color: inherit;
  color: inherit;
  font-size: 1.4rem;
}

main .header .search-bar span {
  color: green;
}

main .header .buttons {
  display: flex;
  flex-direction: row;
  margin-left: 4rem;
  gap: 0.8rem;
}

main .header .buttons span {
  height: 3rem;
  width: 3rem;
  color: rgb(0, 155, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-white);
  cursor: pointer;
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
}

main .header .buttons span:hover {
  box-shadow: none;
  transition: all 300ms ease;
}

main table {
  border-radius: var(--card-border-radius);
  text-align: center;
  transition: all 300ms ease;
  width: 100%;
  padding: var(--card-padding);
}

main table thead tr {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
}

main table tbody tr {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  height: 6rem;
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
}

main table tbody tr:hover {
  box-shadow: none;
  transition: all 300ms ease;
}

main table tbody tr td {
  flex-basis: 20%;
}

main table tbody tr td:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
}

main table thead tr th {
  flex-basis: 20%;
}

main table thead tr th:first-child {
  flex-basis: 8%;
}

main table tbody tr td:first-child {
  flex-basis: 8%;
}

@media screen and (max-width: 768px) {
  main {
    width: 100vw;
  }

  main .header {
    margin-top: 2rem;
  }

  main .header * {
    margin: 0 1rem 0 0;
  }

  main table thead tr th {
    flex-basis: 33%;
  }

  main table tbody tr td {
    flex-basis: 33%;
  }

  table .responsive-hidden {
    display: none;
  }

  main table tbody tr {
    box-shadow: none;
  }
}
</style>
