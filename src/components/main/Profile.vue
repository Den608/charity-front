<script setup>
import { computed, onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import useUserStore from "../../store/userStore";
import useComponentStore from "../../store/componentStore";
import { useUsersApi } from "../../composables/useUsersApi";

const compoentStore = useComponentStore();
const { showLoading, dismissLoading } = compoentStore;

const userStore = useUserStore();
const { user: users } = storeToRefs(userStore);

const userApi = useUsersApi();

const userInitial = {
  first_name: "",
  last_name: "",
  national_code: "",
  email: "",
  phone_number: "",
  address: "",
};

const userInputs = reactive(userInitial);

const password = reactive({
  current_password: "",
  new_password: "",
});

async function updateUser() {
  showLoading();
  await userApi.updateUser(userInputs);
  dismissLoading();
}


async function changePassword(){
  showLoading();
  await userApi.chanePassword(password);
  dismissLoading();
}

watch(users, () => {
  Object.assign(userInputs, userStore.user);
});

onMounted(async()=>{
  showLoading()
  await userStore.setUser()
  dismissLoading()
})
</script>

<template>
  <div class="profile-container">
    <div class="profile-right">
      <div class="main-info">
        <img src="../images/logo.png" />
        <span class="info-name">
          <h2>
            {{ userStore.user.first_name + " " + userStore.user.last_name }}
          </h2>
        </span>

        <span class="info-email">
          <p>کد ملی:</p>
          <h2>
            {{ userStore.user.national_code }}
          </h2>
        </span>

        <span class="info-email">
          <p>ایمیل:</p>
          <h2>{{ userStore.user.email }}</h2>
        </span>

        <span class="info-role">
          <p>سمت:</p>
          <h2 v-if="userStore.user.role == 'agent'">نماینده سازمان</h2>

          <h2 v-if="userStore.user.role == 'manager'">مدیر سازمان</h2>
        </span>

        <span class="info-address">
          <p>منطقه تحت پوشش:</p>
          <p>
            {{ userStore.user.address }}
          </p>
        </span>
      </div>
    </div>

    <div class="profile-left">
      <div class="top">
        <h2 class="header">تغییر مشخصات فردی</h2>
        <div class="profile-inputs">
          <span>
            <label for="name">نام&nbsp;</label>
            <input
              type="text"
              id="name"
              placeholder="نام"
              v-model="userInputs.first_name"
            />
          </span>

          <span>
            <label for="last-name">نام خانوادگی &nbsp;</label>
            <input
              type="text"
              id="last-name"
              placeholder="نام خانوادگی"
              v-model="userInputs.last_name"
            />
          </span>

          <span>
            <label for="national-code">کد ملی &nbsp;</label>
            <input
              type="text"
              id="national-code"
              placeholder="کد ملی"
              v-model="userInputs.national_code"
            />
          </span>

          <span>
            <label for="email">ایمیل</label>
            <input
              type="text"
              id="email"
              placeholder="ایمیل"
              v-model="userInputs.email"
            />
          </span>

          <span>
            <label for="phone ">شماره تلفن</label>
            <input
              type="text"
              id="phone"
              placeholder="شماره تلفن"
              v-model="userInputs.phone_number"
            />
          </span>

          <span>
            <label for="address">منطقه</label>
            <textarea
              name="address"
              id="address"
              cols="30"
              rows="10"
              v-model="userInputs.address"
            ></textarea>
          </span>
        </div>
        <div class="submit">
          <button type="submit" @click="updateUser">ثبت تغییرات</button>
        </div>
      </div>

      <div class="bottom">
        <h2 class="header">تغییر رمز عبور</h2>

        <div class="inputs">
          <input
            type="text"
            placeholder="رمز عبور فعلی"
            v-model="password.current_password"
          />
          <input
            type="text"
            placeholder="رمز عبور جدید"
            v-model="password.new_password"
          />
          <button type="submit" @click="changePassword">تغییر رمز عبور</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: inherit;
}

img {
  width: 6rem;
  height: 6rem;
}

p {
  text-align: center;
}

input[type="text"] {
  padding-right: 1rem;
}

.profile-container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  height: 80%;
}

.profile-container .header {
  margin-bottom: 1rem;
}

.profile-right {
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  flex: 1;
}
.profile-right:hover {
  box-shadow: none;
  transition: all 300ms ease;
}

.profile-right .main-info {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  justify-content: center;
}

.profile-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 2;
}
.profile-left .top {
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: var(--padding-3);
}

.profile-left .top:hover {
  box-shadow: none;
  transition: all 300ms ease;
}

.profile-left .top .profile-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.profile-left .top .profile-inputs span {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.profile-left .top .profile-inputs span label {
  color: var(--color-dark);
  text-align: center;
  width: 6rem;
}

.profile-left .top .profile-inputs span input[type="text"] {
  background-color: var(--color-light);
  border-radius: 0.4rem;
  color: var(--color-dark);
  height: 2.6rem;
  width: 80%;
}

.profile-left .top .profile-inputs span textarea {
  background-color: var(--color-light);
  border-radius: 0.4rem;
  color: var(--color-dark);
  font-size: 1.2rem;
  width: 80%;
  height: 6rem;
}

.profile-left .top .submit {
  margin: 1rem auto 0;
}
.profile-left .top .submit button {
  background-color: var(--color-primary);
  border-radius: 0.8rem;
  color: var(--color-white);
  cursor: pointer;
  width: 30rem;
  height: 2.6rem;
}

.profile-left .top .submit button:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
  transition: all 300ms ease;
}

.profile-left .bottom {
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  padding: var(--padding-3);
  flex: 1;
}

.profile-left .bottom:hover {
  box-shadow: none;
  transition: all 300ms ease;
}

.profile-left .bottom .inputs input[type="text"] {
  background-color: var(--color-light);
  border-radius: 0.4rem;
  color: var(--color-dark);
  margin-left: 1rem;
  height: 2.6rem;
  width: 30%;
}

.profile-left .bottom .submit {
  margin: 0px auto;
}

.profile-left .bottom .inputs button {
  background-color: var(--color-primary);
  border-radius: 0.8rem;
  color: var(--color-white);
  cursor: pointer;
  width: 10rem;
  height: 2.6rem;
}

.profile-left .bottom .inputs button:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
  transition: all 300ms ease;
}
</style>
