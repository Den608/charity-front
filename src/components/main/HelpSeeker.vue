<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import { useUsersApi } from "../../composables/useUsersApi";
import useComponentStore from "../../store/componentStore";
import Pagination from "../Pagination.vue";
import UpdateCreateModal from "../UpdateCreateModal.vue";
import Alert from "../Alert.vue";
import UserHistory from "../UserHistory.vue";

const componentStore = useComponentStore();
const { showLoading, dismissLoading } = componentStore;
// user
const initialUserValue = {
  username: "",
  national_code: "",
  password: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  address: "",
};
const userApi = useUsersApi();
const {
  users,
  currentPage,
  lastPage,
  usersCount,
  userLoading: loader,
} = userApi;
const user = reactive(initialUserValue);
const usersObjectList = ref([]);
const userSearchInput = ref("");
const selectedUserId=ref([])

// modal
const modalTitle = ref("ثبت مددجو");
const modalShow = ref(false);
const modalMode = ref("create");
const history = ref(false);

// alert
const alertShow = ref(false);
const alerMessage = ref("");

onMounted(async () => {
  showLoading();
  await userApi.setAllUsers("help_seeker");
  dismissLoading();
});

async function submitUser() {
  showLoading();
  if (modalMode.value == "create") {
    await userApi.createUser(user);
    for (const key in user) user[key] = "";
  } else if (modalMode.value == "edit") {
    await userApi.updateUser(user);
  }
  dismissLoading();
}

function showCreateModal() {
  modalShow.value = true;
  modalMode.value = "create";
  modalTitle.value = "ثبت مددجو";
  for (const key in user) user[key] = "";
  Object.assign(user, initialUserValue);
}

function showEditModal(user_obj) {
  modalShow.value = true;
  modalTitle.value = "ویرایش مددجو";
  delete user.password;
  Object.assign(user, user_obj);
  modalMode.value = "edit";
}

function setAllChecked(event) {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((el) => {
    el.checked = event.target.checked;
  });

  if (event.target.checked) {
    users.value.map((obj) => {
      usersObjectList.value.push(obj);
    });
  } else {
    usersObjectList.value.length = 0;
  }
}

function checked(user_obj) {
  if (user_obj.checked) {
    usersObjectList.value.push(user_obj);
  } else {
    const index = usersObjectList.value.indexOf(user_obj);
    usersObjectList.value.splice(index, 1);
  }
}

function deleteUsers() {
  if (usersObjectList.value.length > 0) {
    alertShow.value = true;
    alerMessage.value = "ایا از حذف کاربران انتخابی اطمینان دارید ؟";
  } else {
    componentStore.showPopup(
      "هیچ کاربری برای حذف انتخاب نشده است!!!",
      "error",
      3
    );
  }
}

async function submitDelete(type) {
  showLoading();

  alertShow.value = false;
  if (type == "yes") {
    await userApi.deleteUsers(usersObjectList.value);
  }

  dismissLoading();
}

function showUserHistory(event, user) {
  const tagName = event.target.tagName;
  if ((tagName == "TD") | (tagName == "TR")) {
    selectedUserId.value=user
    history.value = true;
  }
}

watch(userSearchInput, async () => {
  await userApi.filterUserDebounced(userSearchInput.value);
});

watch(loader, () => {
  if (loader.value) {
    showLoading();
  } else {
    dismissLoading();
  }
});
</script>

<template>
  <main>
    <UserHistory
      v-if="history"
      @close="history = !history"
      :title="'کالاهای اهدا شده '"
      :role="'help_seeker'"
      :user="selectedUserId"
    />
    <Alert v-if="alertShow" @submit="submitDelete" :message="alerMessage" />
    <UpdateCreateModal
      v-if="modalShow"
      @onClose="modalShow = false"
      @onSubmit="submitUser"
      :title="modalTitle"
      :errorInput="userApi.errorInput"
    >
      <input type="text" placeholder="نام کاربری" v-model="user.username" />
      <input type="text" placeholder="شماره ملی" v-model="user.national_code" />
      <input
        v-if="modalMode == 'create'"
        type="password"
        placeholder="رمز عبور"
        v-model="user.password"
      />
      <input type="text" placeholder="نام " v-model="user.first_name" />
      <input type="text" placeholder="نام خانوادگی" v-model="user.last_name" />
      <input type="text" placeholder="ایمیل" v-model="user.email" />
      <input type="text" placeholder="شماره تلفن" v-model="user.phone_number" />
      <textarea
        type="text"
        placeholder="آدرس"
        v-model="user.address"
      ></textarea>
    </UpdateCreateModal>

    <div class="header">
      <h1>افراد نیازمند</h1>

      <div class="input-fields">
        <div class="search-bar">
          <span class="material-symbols-sharp">travel_explore</span>
          <input type="text" placeholder="جستجو " v-model="userSearchInput" />
        </div>
        <div class="buttons">
          <span @click="deleteUsers">
            <font-awesome-icon
            class="icon"
              icon="fa-solid fa-trash-can"
              size="xl"
              style="color: #c13e3e; margin: 0px;"
            />
          </span>
          <span class="material-symbols-sharp" @click="showCreateModal"
            >group_add</span
          >
        </div>
      </div>
    </div>

    <Pagination
      v-if="usersCount > 10"
      id="pagination"
      :currentPage="currentPage"
      :lastPage="lastPage"
      @next="userApi.nextPage"
      @prev="userApi.prevPage"
      @goTo="userApi.gotoPage"
    />

    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="setAllChecked" /></th>
          <th>نام مددیار</th>
          <th class="responsive-hidden">شماره ملی</th>
          <th class="responsive-hidden">شماره تلفن</th>
          <th>کمک های نقدی</th>
          <th>کالاهای اهدایی</th>
          <th class="responsive-hidden"></th>
        </tr>
      </thead>
      <tbody v-for="user in users" :key="user.id">
        <tr @click="showUserHistory($event, user)">
          <td>
            <input
              type="checkbox"
              v-model="user.checked"
              @change="checked(user)"
            />
          </td>
          <td>{{ user.first_name + " " + user.last_name }}</td>
          <td class="responsive-hidden">{{ user.national_code }}</td>
          <td class="responsive-hidden">{{ user.phone_number }}</td>
          <td>{{ user.total_cash_allocated }}</td>
          <td>{{ user.total_product_allocated }}</td>
          <td class="responsive-hidden primary">
            <span class="material-symbols-sharp" @click="showEditModal(user)">
              edit_square
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
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
  background-color: var(--color-white);
  box-shadow: var(--box-shadow);
  border-radius: 50%;
  cursor: pointer;
  color: rgb(0, 155, 0);
  height: 3rem;
  transition: all 300ms ease;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
    position: relative;
  }

  main .header * {
    margin: 0 1rem 0 0;
  }

  main .header .input-fields {
    display: flex;
    flex-direction: column;
    margin: 0px;
    padding: 0px;
  }

  main .header .input-fields .search-bar{
    width: 98%;
    margin: 0px;
    padding: 0px;
    align-items: center;
    justify-content: flex-end;
    order: 2;
  }

  main .header .input-fields .buttons{
    gap:0px;
    left: 5px;
    margin: 0px;
    padding: 0px;
    position: absolute;
    top: 0px;
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
