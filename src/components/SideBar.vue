<script setup>
import { ref, onMounted } from "vue";
import useAuthStore from "../store/authStore";

const authStore = useAuthStore();

const emit = defineEmits(["changeTab", "sideClose"]);
const activeTab = ref([
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

const tabs = [
  { name: "داشبورد", icon: "dashboard" },
  { name: "افراد خیر", icon: "group" },
  { name: "افراد نیازمند", icon: "settings_accessibility" },
  { name: "انبار", icon: "category" },
  { name: "کمک های اهدایی", icon: "inventory_2" },
  { name: "پکیج ها", icon: "deployed_code" },
  { name: "کمک های اهدا شده", icon: "category" },
  { name: "پکیج های اهدا شده", icon: "category" },
];

const onTabClicked = (index) => {
  activeTab.value.fill(false);
  activeTab.value[index] = true;
  emit("changeTab", index);
};

const onCLose = () => {
  emit("sideClose");
};

onMounted(() => {
  if (window.localStorage.getItem("currentTab")) {
    let currentTab = window.localStorage.getItem("currentTab");
    onTabClicked(currentTab);
  }
});
</script>

<template>
  <aside>
    <div class="top">
      <div class="logo">
        <img src="./images/logo.png" />
        <h2>سامانه <span class="danger">اسایش</span></h2>
      </div>
      <div @click="onCLose" class="close">
        <span class="material-symbols-sharp">close</span>
      </div>
    </div>
    <div class="sidebar">
      <div
        class="tab-container"
        :class="{ active: activeTab[0] }"
        @click="onTabClicked(0)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">dashboard</span>
          <h3>داشبورد</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[1] }"
        @click="onTabClicked(1)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">group</span>
          <h3>افراد خیر</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[2] }"
        @click="onTabClicked(2)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">settings_accessibility</span>
          <h3>افراد نیازمند</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[3] }"
        @click="onTabClicked(3)"
      >
        <div class="tab">
          <span class="material-symbols-sharp"> category </span>
          <h3>محصولات</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[4] }"
        @click="onTabClicked(4)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">inventory_2</span>
          <h3>کمک های مردمی</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[5] }"
        @click="onTabClicked(5)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">deployed_code</span>
          <h3>بسته های مناسبتی</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[6] }"
        @click="onTabClicked(6)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">school</span>
          <h3>دانشجویان و دانش اموزان</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[7] }"
        @click="onTabClicked(7)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">school</span>
          <h3>کمک های اهدایی</h3>
        </div>
      </div>

      <div
        class="tab-container"
        :class="{ active: activeTab[8] }"
        @click="onTabClicked(8)"
      >
        <div class="tab">
          <span class="material-symbols-sharp">school</span>
          <h3>پیکیج های اهدایی</h3>
        </div>
      </div>

      <div
        class="tab-container pre-last-child"
        :class="{ active: activeTab[9] }"
        @click="onTabClicked(9)"
      >
        <div class="tab">
          <span class="material-symbols-sharp"> person </span>
          <h3>پروفایل</h3>
        </div>
      </div>

      <div class="tab-container last-child">
        <div @click="authStore.handleLogout" class="tab">
          <span class="material-symbols-sharp">logout</span>
          <h3>خروج از سیستم</h3>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
aside {
  height: 100vh;
}

aside .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

aside .top .logo {
  display: flex;
  gap: 0.8rem;
  color: var(--color-dark);
}

aside .top .logo img {
  width: 2rem;
  height: 2rem;
}

aside .close {
  display: none;
}

/* -------Side Bar--------- */
aside .sidebar {
  display: flex;
  flex-direction: column;
  height: 86vh;
  position: relative;
  top: 1rem;
}

aside h3 {
  font-weight: 500;
}

aside .sidebar .tab-container {
  cursor: pointer;
  height: 3.7rem;
  display: flex;
  align-items: center;
  position: relative;
  color: var(--color-info-dark);
  transition: all 300ms ease;
}

aside .sidebar .tab-container .tab {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
}

aside .sidebar .tab-container .tab {
  font-size: 1.6rem;
  transition: all 300ms ease;
}

aside .sidebar .tab-container:nth-child(10) {
  position: absolute;
  bottom: 6rem;
  width: 100%;
}
aside .sidebar .tab-container:last-child {
  position: absolute;
  bottom: 2rem;
  width: 100%;
}

aside .sidebar .tab-container.active {
  background-color: var(--color-light);
  color: var(--color-primary);
  transition: all 1s ease;
}

aside .sidebar .tab-container.active::before {
  content: "";
  width: 6px;
  height: 100%;
  background: var(--color-primary);
}

aside .sidebar .tab-container .tab:hover {
  color: var(--color-primary);
  margin-right: 1rem;
}

/* --------------- MEDIA  QUERY 1---------------- */
@media screen and (max-width: 1200px) {
  aside .top .logo {
    display: none;
  }

  aside h3 {
    display: none;
  }

  aside .sidebar .tab-container.active {
    background-color: var(--color-light);
    color: var(--color-primary);
    transition: all 1s ease;
    width: 4rem;
  }
}

/* --------------- MEDIA  QUERY 2---------------- */
@media screen and (max-width: 768px) {
  aside {
    padding-top: 1rem;
    position: fixed;
    right: 0;
    height: 100vh;
    width: 18rem;
    z-index: 3;
    background-color: var(--color-white);
    box-shadow: 1rem 3rem 4rem var(--color-light);
    /* display: none; */
  }

  .active {
    display: block;
  }

  .disable {
    display: none;
  }

  aside h3 {
    display: block;
  }

  aside .sidebar .tab-container.active {
    background-color: var(--color-light);
    color: var(--color-primary);
    transition: all 1s ease;
    width: 100%;
  }

  aside .top .logo {
    display: flex;
    gap: 0.8rem;
  }

  aside .close {
    display: block;
    margin-left: 0.5rem;
    font-weight: bold;
  }
}
</style>