<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Alert from "../Alert.vue";
import UpdateCreateModal from "../UpdateCreateModal.vue";
import UserDropDown from "../dropDowns/UserDropDown.vue";
import HelpsDropDown from "../dropDowns/HelpsDropDown.vue";
import useComponentStore from "../../store/componentStore";
import { useAidAllocation } from "../../composables/useAidAllocationApi";

const componentStore = useComponentStore();
const { showLoading, dismissLoading, showPopup } = componentStore;

const allocationAPi = useAidAllocation();
const { aidAllocations, currentPage, lastPage, allocationLoading } =
  allocationAPi;

const modalTitle = ref("ثبت  محصول");
const modalShow = ref(false);
const modalMode = ref("create");

const alertShow = ref(false);
const alertMessage = ref("");

// allocation
const initialAllocation = {
  quantity: "",
  help_seeker_id: "",
  people_aid_id: "",
};

const allocation = reactive(initialAllocation);
const allocationSearchInput = ref(" ");
const allocationList = ref([]);

// help seeker
const helpSeeker = ref("نام مددجو");

// Aid
const peopleAid = ref("عنوان کمک مورد نظر");

async function submitAllocation() {
  showLoading();
  await allocationAPi.createAidAllocation(allocation);
  dismissLoading();
}

function showCreateModal() {
  modalShow.value = true;
  modalTitle.value = "ساخت محصول";
  helpSeeker.value = "نام مددجو";
  peopleAid.value = "عنوان کمک مورد نظر";
}

function setAllChecked(event) {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((el) => {
    el.checked = event.target.checked;
  });

  if (event.target.checked) {
    aidAllocations.value.map((obj) => {
      allocationList.value.push(obj);
    });
  } else {
    allocationList.value.length = 0;
  }
}

function checked(obj) {
  if (obj.checked) {
    allocationList.value.push(obj);
  } else {
    const index = allocationList.value.indexOf(obj);
    allocationList.value.splice(index, 1);
  }
}

function deleteAidAllocation() {
  if (allocationList.value.length > 0) {
    alertShow.value = true;
    alertMessage.value = "ایا از حذف ایتم های انتخابی اطمینان دارید ؟";
  } else {
    showPopup("هیچ کمکی برای حذف انتخاب نشده است!!!", "error", 3);
  }
}

async function submitDelete(type) {
  showLoading();
  alertShow.value = false;
  if (type == "yes") {
    await allocationAPi.deleteAllocations(allocationList.value);
  }
  dismissLoading();
}

async function statusChange(item, allocation) {
  await allocationAPi.updateAidAllocation({
    id: allocation.id,
    status: item.target.value,
  });
}

async function submitMultiAssign() {
  if (allocationList.value.length != 0) {
    await allocationAPi.assignAllocations(allocationList.value);
  } else {
    showPopup("هیچ بسته انتخاب نشده است!!!!", "error");
  }
}

watch(allocationSearchInput, async () => {
  await allocationAPi.debouncedFiltering(allocationSearchInput.value);
});

watch(allocationLoading, () => {
  if (allocationLoading.value) {
    showLoading();
  } else {
    dismissLoading();
  }
});

onMounted(async () => {
  showLoading();
  await allocationAPi.setAllAllocations();
  dismissLoading();
});
</script>

<template>
  <main>
    <Alert v-if="alertShow" @submit="submitDelete" :message="alertMessage" />
    <UpdateCreateModal
      v-if="modalShow"
      @onClose="modalShow = false"
      @onSubmit="submitAllocation"
      :title="modalTitle"
      :errorInput="allocationAPi.errorInput"
    >
      <HelpsDropDown
        :initialValue="peopleAid"
        @onSelect="
          (data) => {
            allocation.people_aid_id = data.id;
          }
        "
      />

      <UserDropDown
        :dataList="users"
        :initialValue="helpSeeker"
        :role="'help_seeker'"
        @onSelect="(data) => (allocation.help_seeker_id = data.help_seeker_id)"
      />
      <input type="number" placeholder="تعداد" v-model="allocation.quantity" />
    </UpdateCreateModal>

    <div class="header">
      <h1>کمک های اهدایی</h1>

      <div class="input-fields">
        <div class="search-bar">
          <span class="material-symbols-sharp">travel_explore</span>
          <input
            type="text"
            placeholder="جستجو "
            v-model="allocationSearchInput"
          />
        </div>
        <div class="buttons">
          <span @click="deleteAidAllocation">
            <font-awesome-icon
              icon="fa-solid fa-trash-can"
              size="xl"
              style="color: #c13e3e"
            />
          </span>
          <span @click="submitMultiAssign">
            <font-awesome-icon icon="truck" size="xl" />
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
      @next="allocationAPi.nextPage"
      @prev="allocationAPi.prevPage"
      @goTo="allocationAPi.gotoPage"
    />

    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="setAllChecked" /></th>
          <th>عنوان کمک</th>
          <th class="responsive-hidden">نام مددیار</th>
          <th class="responsive-hidden">نام مددجو</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="allocation in aidAllocations" :key="allocation.id">
          <td>
            <input
              type="checkbox"
              v-model="allocation.checked"
              @change="checked(allocation)"
            />
          </td>
          <td>{{ allocation.people_aid.title }}</td>
          <td class="responsive-hidden">
            {{
              allocation.helper_name.first_name +
              " " +
              allocation.helper_name.last_name
            }}
          </td>
          <td class="responsive-hidden">
            {{
              allocation.help_seeker_name.first_name +
              " " +
              allocation.help_seeker_name.last_name
            }}
          </td>
          <td>
            <select
              name="allocation-status"
              @change="statusChange($event, allocation)"
            >
              <option :value="allocation.status" disabled selected>
                {{
                  allocation.status == "assigned"
                    ? "تحویل داده شده"
                    : "در حال تحویل"
                }}
              </option>
              <option value="assigned">تحویل داده شده</option>
              <option value="not_assigned">در حال تحویل</option>
            </select>
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

main table tbody tr td select {
  background-color: var(--color-light);
  color: var(--color-primary);
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
    flex-basis: 50%;
  }

  main table tbody tr td {
    flex-basis: 50%;
  }

  main table tbody tr td select {
    font-size: 1.1rem !important;
  }

  table .responsive-hidden {
    display: none;
  }

  main table tbody tr {
    box-shadow: none;
  }
}
</style>
