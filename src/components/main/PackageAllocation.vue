<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { usePackAllocation } from "../../composables/usePackageAllocation";
import UserDropDown from "../dropDowns/UserDropDown.vue";
import packDropDown from "../dropDowns/packDropDown.vue";
import Alert from "../Alert.vue";
import UpdateCreateModal from "../UpdateCreateModal.vue";
import useComponentStore from "../../store/componentStore";

const componentStore = useComponentStore();
const { showLoading, dismissLoading } = componentStore;

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

// help seeker
const helpSeeker = ref("");

// package
const pack = ref("");

async function submitAllocation() {
  showLoading();
  await allocationAPi.createAidAllocation(allocation);
  dismissLoading();
}

function showCreateModal() {
  modalShow.value = true;
  modalTitle.value = "ساخت محصول";
  helpSeeker.value = "نام مددجو";
  pack.value = "عنوان پکیج مورد نظر";
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
    {{ packAllocation }}
    <Alert
      v-if="alertShow"
      @submit="submitDelete"
      @onSubmit="submitAid"
      :message="alerMessage"
    />
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
            v-model="productSearchInput"
          />
        </div>
        <div class="buttons">
          <span class="material-symbols-sharp" @click="showCreateModal">
            add
          </span>
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>عنوان پکیج</th>
          <th>نام مددیار</th>
          <th>نام مددجو</th>
          <th>تعداد</th>
          <th>وضعیت</th>
          <th class="responsive-hidden"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>پکیچ ماه مبارک رمضان</td>

          <td>علی رضایی</td>
          <td>عرفان باقری</td>
          <td class="responsive-hidden">1</td>
          <!-- <td  :id="aid.status == 'assigned' ? 'deliver' : 'not-deliver'">
            {{
              aid.status == "assigned" ? "تحویل داده شده" : "در حال تحویل..."
            }}
          </td> -->
          <td id="not-deliver">در حال تحویل...</td>
          <td class="responsive-hidden primary">
            <span
              class="material-symbols-sharp"
              @click="showEditModal(product)"
            >
              explore
            </span>
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

main table tbody tr td:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
}

main table thead tr th {
  flex-basis: 20%;
}

main table thead tr th:first-child {
  flex-basis: 15%;
}

main table tbody tr td:first-child {
  flex-basis: 15%;
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
