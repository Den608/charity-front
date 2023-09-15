<script setup>
import { ref, onMounted } from "vue";
import useAuthStore from "../store/authStore";
import { Colors } from "chart.js";

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
  { name: "داشبورد", icon: ["fas", "chart-line"], color: "#7380ec" },
  {
    name: "افراد خیر",
    icon: ["fas", "person-shelter"],
    color: " "
  },
  {
    name: "افراد نیازمند",
    icon: ["fas", "hands-holding-child"],
    color: "#008489" 
  },
  { name: "محصولات", icon: ["fas", "warehouse"], style: "#41f1b6" },
  {
    name: "کمک های مردمی",
    icon: ["fas", "hand-holding-hand"],
    color: "#ff7782" 
  },
  { name: "پکیج ها", icon: ["fas", "cubes"], color: "#7380ec" },
  {
    name: "کمک های اهدایی",
    icon: ["fas", "hand-holding-heart"],
    color: "#008489" 
  },
  {
    name: "پکیج های اهدایی",
    icon: ["fas", "boxes-packing"],
    color: "" 
  },
  { name: "پروفایل", icon: ["fas", "user"], color: "#008489"  },
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
        <!-- <img src="./images/logo.png" /> -->
        <h2>سامانه <span class="danger">اسایش</span></h2>
      </div>
      <div @click="onCLose" class="close">
        <span class="material-symbols-sharp">close</span>
      </div>
    </div>
    <div class="sidebar">
      <div
        v-for="(tab, index) in tabs"
        class="tab-container"
        :class="{ active: activeTab[index] }"
        @click="onTabClicked(index)"
      >
        <div class="tab">
          <font-awesome-icon :icon="tab.icon" :style="{ color: tab.color }" />
          <h3>{{ tab.name }}</h3>
        </div>
      </div>

      <div class="tab-container last-child">
        <div @click="authStore.handleLogout" class="tab">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
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
