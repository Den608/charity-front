<script setup>
import { ref } from "vue";
import { Modal } from "usemodal-vue3";
let isVisible = ref(false);
const name = ref("");
const dob = ref("");
const agentName = ref("");
const schoolInfo = ref("");
const priority = ref("");
const health = ref("");
const gender = ref("");
const age = ref("");
const illness = ref("");
const id = ref("");
const newSt = ref([]);

const addStudent = () => {
  newSt.value.push({
    name: name.value,
    dob: dob.value,
    agentName: agentName.value,
    schoolInfo: schoolInfo.value,
    priority: priority.value,
    health: health.value,
    gender: gender.value,
    age: age.value,
    illness: illness.value,
    id: id.value,
  });
  name.value = "";
  dob.value = "";
  agentName.value = "";
  schoolInfo.value = "";
  priority.value = "";
  health.value = "";
  gender.value = "";
  age.value = "";
  illness.value = "";
  id.value = "";
};
</script>

<template>
  <main>
    <header>
      <h2>امداد رسانی دانش آموزان نخبه</h2>
      <p id="description">
        بخش جمع آوری کمک های اختصاصی دانش آموزان با استعدادی که کیفیت شرایط آنها
        امکان تحصیل و زندگی بهتر را از آنها میگیرد. شما میتوانید با کوچک ترین
        کمک نیز یاری حال آنها باشید تا فردایی بهتر برایشان فراهم شود.
      </p>
    </header>
    <div class="container">
      <div class="card">
        <h3>مجموع کمک های نقدی</h3>
        <h1>150000000IR</h1>
        <a href="#" class="primary">ثبت کمک نقدی</a>
      </div>
      <div class="card">
        <h3>مجموع کالا های اهدا شده</h3>
        <h1>256000</h1>
        <a href="#" class="primary">ثبت کالای جدید</a>
      </div>
      <div class="card">
        <h3>کل دانش آموزان تحت پوشش</h3>
        <h1>120000</h1>
        <a href="#" class="primary">نمایش مدارس</a>
      </div>
    </div>
    <div class="container-table">
      <h2>لیست دانش آموزان</h2>
      <div style="overflow-x: auto" class="searchbar">
        <input type="text" placeholder="نام دانش آموز..." />
        <a href="#" class="primary">جستجو</a>
      </div>
      <table>
        <thead>
          <tr>
            <td>نام دانش آموز</td>
            <td class="responsive-hidden">جنسیت</td>
            <td class="responsive-hidden">تاریخ تولد</td>
            <td>سن</td>
            <td>اولویت</td>
            <td class="responsive-hidden">محل تحصیل</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>سارا احمدی</td>
            <td class="responsive-hidden">دختر</td>
            <td class="responsive-hidden">1390/03/20</td>
            <td>12</td>
            <td>متوسط</td>
            <td class="responsive-hidden">مدرسه ...</td>
            <td>
              <a class="primary" href="#details" target="_blank">پنل کاربری</a>
            </td>
          </tr>
          <tr>
            <td>علی حسین زاده</td>
            <td class="responsive-hidden">پسر</td>
            <td class="responsive-hidden">1388/5/2</td>
            <td>14</td>
            <td>بالا</td>
            <td class="responsive-hidden">مدرسه ...</td>
            <td>
              <a class="primary" href="#details" target="_blank">پنل کاربری</a>
            </td>
          </tr>
          <tr>
            <td>محمد سامانی</td>
            <td class="responsive-hidden">پسر</td>
            <td class="responsive-hidden">1389/11/2</td>
            <td>13</td>
            <td>پایین</td>
            <td class="responsive-hidden">مدرسه ...</td>
            <td>
              <a class="primary" href="#details" target="_blank">پنل کاربری</a>
            </td>
          </tr>
        </tbody>
      </table>
      <a id="newSt" @click="isVisible = true" href="#" class="primary"
        >ثبت دانش آموز جدید</a
      >
      <div class="bottomNav">
        <div class="pagination">
          <a href="#" class="primary">&laquo;</a>
          <a href="#" class="primary active">1</a>
          <a href="#" class="primary">2</a>
          <a href="#" class="primary">3</a>
          <a href="#" class="primary">4</a>
          <a href="#" class="primary">5</a>
          <a href="#" class="primary">6</a>
          <a href="#" class="primary">&raquo;</a>
        </div>
      </div>
    </div>
    <Modal
      class="modal"
      v-model:visible="isVisible"
      title="ثبت دانش آموز جدید"
      :okButton="{
        text: 'ثبت',
        onclick: () => {
          addStudent();
        },
        loading: false,
      }"
      :cancelButton="{
        text: 'انصراف',
        onclick: () => {
          isVisible = false;
        },
        loading: false,
      }"
    >
      <div class="studentForm">
        <input v-model="name" placeholder="نام و نام خانوادگی" /><br />
        <input v-model="dob" placeholder="تاریخ تولد" /><br />
        <input v-model="age" placeholder="سن" /><br />
        <input v-model="id" placeholder="شماره ملی" /><br />

        <div>اولویت: {{ priority }}</div>
        <select v-model="priority">
          <option disabled value="">
            لطفا اولویت دانش آموز را انتخاب کنید
          </option>
          <option>بالا</option>
          <option>متوسط</option>
          <option>پایین</option>
        </select>

        <div>جنسیت: {{ gender }}</div>
        <select v-model="gender">
          <option disabled value="">جنسیت</option>
          <option>دختر</option>
          <option>پسر</option>
        </select>

        <div>سلامتی: {{ health }}</div>
        <select v-model="health">
          <option disabled value="">انتخاب کنید</option>
          <option>سالم</option>
          <option>ناسالم</option></select
        ><br />

        <input v-model="illness" placeholder="نام بیماری" /><br />
        <input v-model="agentName" placeholder="نام معلم معرف/نماینده" /><br />
        <input v-model="schoolInfo" placeholder="اطلاعات مدرسه" /><br />
      </div>
    </Modal>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  padding: 0 20px;
  text-align: center;
}

main h1,
h2,
h3,
p,
table {
  color: var(--color-dark);
}

header,
h2 {
  text-align: right;
}

h2 {
  margin-top: 10px;
}

.container {
  text-align: right;
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.container .card {
  background: var(--color-white);
  padding: var(--card-padding);
  margin-top: 1rem;
  box-shadow: var(--box-shadow);
  height: 25%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 33%;
  border-radius: 15px;
}
.container-table {
  margin-top: 1rem;
}

.container-table h2 {
  margin-bottom: 0.8rem;
  margin-top: 3rem;
  font-weight: 600;
}

.container-table .searchbar {
  overflow: hidden;
  width: 100%;
}

.searchbar input[type="text"] {
  margin-right: 15px;
  width: 40%;
  height: 30px;
  float: right;
  padding: 5px;
  font-size: 15px;
  flex-direction: row;
  display: flex;
  border-radius: 15px;
  box-shadow: var(--box-shadow);
}
.searchbar a {
  float: inline-start;
  margin-inline-start: 0.5rem;
  margin-top: 0.4rem;
}

.searchbar text {
  float: right;
}

.container-table table {
  margin-top: 1rem;
  width: 100%;
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  padding: var(--card-padding);
  background: var(--color-white);
}

.container-table tbody td {
  height: 2.8rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark-variant);
  color: var(--color-dark);
}
.container-table tbody tr:last-child td {
  border: none;
}

.pagination a {
  float: inline-start;
  margin-top: 20px;
  padding: 4px 10px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.pagination a.active {
  background-color: grey;
  color: white;
  border-radius: 40%;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}

main .modal .studentForm {
  border-radius: 15px;
  background: white;
  text-align: right;
}

@media screen and (max-width: 768px) {
  main {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5rem 1fr 0.7fr auto;
    grid-template-areas:
      "header"
      "container"
      "container-table"
      "bottomNav";
    margin: 0px auto;
    gap: 1rem;
  }
  header {
    width: 100%;
    margin-top: 2rem;
    padding: 0rem 1rem;
  }
  table {
    width: 100%;
    white-space: nowrap;
    padding: 1rem;
  }
  .responsive-hidden {
    display: none;
  }
  .container .card {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }
  .container {
    display: block;
    padding: 1rem;
    margin-top: 5rem;
  }
}
</style>
