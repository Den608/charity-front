<script setup>
import { ref, watch, onMounted, reactive, computed } from "vue";
import UpdateCreateModal from "../UpdateCreateModal.vue";
import Alert from "../Alert.vue";
import ProductDropDown from "../dropDowns/ProductDropDown.vue";
import UserDropDown from "../dropDowns/UserDropDown.vue";
import useComponentStore from "../../store/componentStore";
import Pagination from "../Pagination.vue";
import { useAids } from "../../composables/useAidsApi";
import { useProduct } from "../../composables/userProductApi";
import { useUsersApi } from "../../composables/useUsersApi";

const componentStore = useComponentStore();
const { showPopup, showLoading, dismissLoading } = componentStore;

//aid
const intialPeopleAid = {
  title: "",
  product_id: "",
  helper_id: "",
  quantity: 0,
};
const aidApi = useAids();
const { peopleAids, currentPage, lastPage, inputError } = aidApi;
const aid = reactive(intialPeopleAid);
const aidstList = ref([]);
const aidsSearchInput = ref("");

// product
const productApi = useProduct();
const {
  products,
  lastPage: productLastPage,
  currentPage: productCurrentPage,
} = productApi;
const productIntialValue = ref("");

// helper
const useUser = useUsersApi();
const { users, currentPage: userCurrentPage, lastPage: userLastPage } = useUser;
const helperModalIntialvalue = ref("");

//alocate

// modal
const modalTitle = ref("ثبت کمک جدید");
const modalShow = ref(false);
const modalMode = ref("create");
const dropDownShow = ref([false, false]);

// alert
const alertShow = ref(false);
const alerMessage = ref("");

async function submitAid() {
  showLoading();
  if (modalMode.value == "create") {
    await aidApi.createAids(aid);
    if (inputError.value.length == 0) {
      for (const key in aid) aid[key] = "";
    }
  } else if (modalMode.value == "edit") {
    await aidApi.updateAids(aid);
  }
  dismissLoading();
}

function showCreateModal() {
  modalShow.value = true;
  modalMode.value = "create";
  for (const key in aid) aid[key] = "";
  modalTitle.value = "ثبت کمک جدید";
  productIntialValue.value = "نام محصول";
  helperModalIntialvalue.value = "نام مددیار";
  Object.assign(aid, intialPeopleAid);
}

async function showEditModal(aid_obj) {
  modalShow.value = true;
  modalTitle.value = "ویرایش کمک";

  Object.assign(aid, aid_obj);

  productIntialValue.value = aid.product.name ? aid.product.name : "نام محصول";

  helperModalIntialvalue.value = aid.helper_name.first_name
    ? aid.helper_name.first_name + " " + aid.helper_name.last_name
    : "نام مددیار";

  modalMode.value = "edit";
}

function setAllChecked(event) {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((el) => {
    el.checked = event.target.checked;
  });

  if (event.target.checked) {
    peopleAids.value.map((obj) => {
      aidstList.value.push(obj);
    });
  } else {
    aidstList.value.length = 0;
  }
}

function checked(aid_obj) {
  if (aid_obj.checked) {
    aidstList.value.push(aid_obj);
  } else {
    const index = aidstList.value.indexOf(aid_obj);
    aidstList.value.splice(index, 1);
  }
}

function deleteAids() {
  if (aidstList.value.length > 0) {
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
    await aidApi.deleteAids(aidstList.value);
  }
  dismissLoading();
}

watch(aidsSearchInput, async () => {
  await aidApi.filterAids(aidsSearchInput.value);
});

onMounted(async () => {
  showLoading();
  await aidApi.setAllAids();
  dismissLoading();
});
</script>

<template>
  <main>
    <Alert
      v-if="alertShow"
      @submit="submitDelete"
      @onSubmit="submitAid"
      :message="alerMessage"
    />
    <UpdateCreateModal
      v-if="modalShow"
      @onClose="modalShow = false"
      @onSubmit="submitAid"
      :title="modalTitle"
      :errorInput="aidApi.inputError"
    >
      <ProductDropDown
        :dataList="products"
        :initialValue="productIntialValue"
        @onSelect="
          (data) => {
            aid.product_id = data.id;
            aid.title = data.name;
          }
        "
      />

      <UserDropDown
        :dataList="users"
        :initialValue="helperModalIntialvalue"
        :role="'helper'"
        @onFilter="useUser.filterUserDebounced"
        @onSelect="(data) => (aid.helper_id = data.helper.id)"
      />
      <input type="number" placeholder="تعداد" v-model="aid.quantity" />
      <input type="text" placeholder="توضیحات" v-model="aid.description" />
    </UpdateCreateModal>

    <div class="header">
      <h1>کمک های مردمی</h1>

      <div class="input-fields">
        <div class="search-bar">
          <span class="material-symbols-sharp">travel_explore</span>
          <input type="text" placeholder="جستجو " v-model="aidsSearchInput" />
        </div>
        <div class="buttons">
          <span @click="deleteAids">
            <font-awesome-icon
              icon="fa-solid fa-trash-can"
              size="xl"
              style="color: #c13e3e"
            />
          </span>

          <span class="material-symbols-sharp" @click="showCreateModal">
            add
          </span>
        </div>
      </div>
    </div>

    <Pagination
      v-if="lastPage > 1"
      id="pagination"
      :currentPage="currentPage"
      :lastPage="lastPage"
      @next="aidApi.nextPage"
      @prev="aidApi.prevPage"
      @goTo="aidApi.gotoPage"
    />

    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="setAllChecked" /></th>
          <th>عنوان</th>
          <th>موجودی</th>
          <th>اهدا کننده</th>
          <th class="responsive-hidden">توضیحات</th>
          <th class="responsive-hidden"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aid in peopleAids" :key="aid.id">
          <td>
            <input
              type="checkbox"
              v-model="aid.checked"
              @change="checked(aid)"
            />
          </td>
          <td>{{ aid.title }}</td>
          <td>{{ aid.quantity }}</td>
          <td>
            {{ aid.helper_name.first_name + " " + aid.helper_name.last_name }}
          </td>
          <td class="responsive-hidden">
            {{ aid.description == null ? "......" : aid.description }}
          </td>
          <td class="responsive-hidden primary">
            <span class="material-symbols-sharp" @click="showEditModal(aid)">
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
