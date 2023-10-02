<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { usePackAllocation } from "../../composables/usePackageAllocation";
import UserDropDown from "../dropDowns/UserDropDown.vue";
import packDropDown from "../dropDowns/packDropDown.vue";
import Alert from "../Alert.vue";
import UpdateCreateModal from "../UpdateCreateModal.vue";
import useComponentStore from "../../store/componentStore";

const componentStore = useComponentStore();
const { showLoading, dismissLoading, showPopup } = componentStore;

const modalTitle = ref("ثبت  محصول");
const modalShow = ref(false);
const modalMode = ref("create");

const alertShow = ref(false);
const alertMessage = ref("");

//pack allocation
const initialAllocation = {
  quantity: 0,
  help_seeker_id: 0,
  package_id: 0,
};
const packAllocation = reactive(initialAllocation);
const packAllocationList = ref([]);

const allocationApi = usePackAllocation();
const { packAllocations, currentPage, lastPage, allocationLoading } =
  allocationApi;
const allocationSearchInput = ref("");
const packallocationList = ref([]);

// help seeker
const helpSeeker = ref("");

// package
const pack = ref("");

async function submitAllocation() {
  showLoading();
  await allocationApi.createPackAllocation(packAllocation);
  dismissLoading();
}

function showCreateModal() {
  modalShow.value = true;
  modalTitle.value = "ساخت محصول";
  helpSeeker.value = "نام مددجو";
  pack.value = "عنوان پکیج مورد نظر";
}

function setAllChecked(event) {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((el) => {
    el.checked = event.target.checked;
  });

  if (event.target.checked) {
    packAllocations.value.map((obj) => {
      packAllocationList.value.push(obj);
    });
  } else {
    packAllocationList.value.length = 0;
  }
}

function checked(obj) {
  if (obj.checked) {
    packAllocationList.value.push(obj);
  } else {
    const index = packAllocationList.value.indexOf(obj);
    packAllocationList.value.splice(index, 1);
  }
}

function deletePacks() {
  if (packAllocationList.value.length > 0) {
    alertMessage.value = "ایا از حذف محصولات اطمینان دارید؟";
    alertShow.value = true;
  } else {
    componentStore.showPopup("هیچ محصولی انتخاب نشده است!!! ", "error", 2);
  }
}

async function submitDelete(type) {
  alertShow.value = false;
  if (type == "yes") {
    await allocationApi.deletePackAllocations(packAllocationList.value);
  }
}

async function submitMultiAssign() {
  if (packAllocationList.value.length != 0) {
    await allocationApi.assignPackAllocations(packAllocationList.value);
  } else {
    showPopup("هیچ بسته انتخاب نشده است!!!!", "error");
  }
}

async function statusChange(item, pack) {
  await allocationApi.updatePackAllocation({
    id: pack.id,
    status: item.target.value,
  });
}

watch(allocationLoading, () => {
  if (allocationLoading.value) {
    showLoading();
  } else {
    dismissLoading();
  }
});

watch(allocationSearchInput, async () => {
  await allocationApi.filterDebounced(allocationSearchInput.value);
});

onMounted(async () => {
  showLoading();
  await allocationApi.setAllPackAllocation();
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
      :errorInput="allocationApi.errorInput"
    >
      <packDropDown
        :initialValue="pack"
        @onSelect="
          (data) => {
            packAllocation.package_id = data.id;
          }
        "
      />

      <UserDropDown
        :dataList="users"
        :initialValue="helpSeeker"
        :role="'help_seeker'"
        @onSelect="
          (data) => (packAllocation.help_seeker_id = data.help_seeker_id)
        "
      />
      <input
        type="number"
        placeholder="تعداد"
        v-model="packAllocation.quantity"
      />
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
          <span @click="deletePacks">
            <font-awesome-icon
            class="icon"
              icon="fa-solid fa-trash-can"
              size="xl"
              style="color: #c13e3e; margin: 0px;"
            />
          </span>
          <span @click="submitMultiAssign">
            <font-awesome-icon icon="truck" size="xl" style=" margin: 0px;"/>
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
      @next="allocationApi.nextPage"
      @prev="allocationAPi.prevPage"
      @goTo="allocationAPi.gotoPage"
    />


    <table>
      <thead>
        <tr>
          <th><input type="checkbox" @change="setAllChecked" /></th>
          <th>عنوان پکیج</th>
          <th>نام مددجو</th>
          <th>تعداد</th>
          <th>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pack in packAllocations" :key="pack.id">
          <td>
            <input
              type="checkbox"
              v-model="pack.checked"
              @change="checked(pack)"
            />
          </td>
          <td>{{ pack.package.title }}</td>

          <td>
            {{
              pack.help_seeker_name.first_name +
              " " +
              pack.help_seeker_name.last_name
            }}
          </td>
          <td class="responsive-hidden">{{ pack.quantity }}</td>
          <td>
            <select
              name="allocation-status"
              @change="statusChange($event, pack)"
            >
              <option :value="pack.status" disabled selected>
                {{
                  pack.status == "assigned" ? "تحویل داده شده" : "در حال تحویل"
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
#deliver {
  color: var(--color-info-dark);
}

#not-deliver {
  color: var(--color-warning);
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
    flex-basis: 15%;
  }

  main table tbody tr td {
    flex-basis: 15%;
  }

  table .responsive-hidden {
    display: none;
  }

  main table tbody tr {
    box-shadow: none;
  }
}
</style>
