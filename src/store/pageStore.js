import { defineStore } from "pinia";
import { ref } from "vue";
import SideBar from "../components/SideBar.vue";
import Navbar from "../components/Navbar.vue";
import Dashboard from "../components/main/Dashboard.vue";
import Helper from "../components/main/Helper.vue";
import HelpSeeker from "../components/main/HelpSeeker.vue";
import Help from "../components/main/Help.vue";
import Package from "../components/main/Package.vue";
import Student from "../components/main/Student.vue";
import Product from "../components/main/Product.vue";
import AidAlocation from "../components/main/AidAlocation.vue";
import PackageAllocation from "../components/main/PackageAllocation.vue";
import Profile from "../components/main/Profile.vue";

const usePageStore = defineStore("pageStore", () => {
  const currentTabIndex = ref(0);
  const tabs = ref([
    { name: "داشبورد", icon: "dashboard", component: Dashboard },
    { name: "افراد خیر", icon: "group", component: Helper },
    {
      name: "افراد نیازمند",
      icon: "settings_accessibility",
      component: HelpSeeker,
    },
    { name: "انبار", icon: "category", component: Product },
    { name: "کمک های اهدایی", icon: "inventory_2", component: Help },
    { name: "پکیج ها", icon: "deployed_code", component: Package },
    { name: "کمک های اهدا شده", icon: "category", component: AidAlocation },
    {
      name: "پکیج های اهدا شده",
      icon: "category",
      component: PackageAllocation,
    },
    {
      name: "پروفایل",
      icon: "category",
      component:Profile,
    },
  ]);
});
