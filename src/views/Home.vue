<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/main/Dashboard.vue';
import Helper from '../components/main/Helper.vue';
import HelpSeeker from '../components/main/HelpSeeker.vue';
import Help from '../components/main/Help.vue';
import Package from '../components/main/Package.vue';
import Student from '../components/main/Student.vue';


const currentTab = ref('Dashboard')

const renderPage = (tab) => {
    currentTab.value = tab
}

const tabs = {
    Dashboard,
    Helper,
    HelpSeeker,
    Help,
    Package,
    Student
}

</script>

<template>
    <div class="grid-container">
        <Navbar class="navbar" />
        <SideBar class="sidebar" @changeTab="renderPage" />

        <Transition appear name="tab">
            <component :is="tabs[currentTab]" class="components"></component>
        </Transition>

    </div>
</template>px

<style>
.grid-container {
    display: grid;
    grid-template-columns: 15rem auto;
    grid-template-rows: 3rem auto;
    width: 96%;
    margin: 0 auto;
    gap: 2rem;
    grid-template-areas:
        "navbar navbar"
        "sidebar tab";
}

.navbar {
    grid-area: navbar;
}

.sidebar {
    grid-area: sidebar;
}

.components {
    grid-area: tab;
}


.tab-enter-from {
    transform: translateY(-100vh);
    opacity: 0;
}

.tab-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.tab-enter-active {
    transition: all 1s ease;
}

@media screen and (max-width:1200px) {
    .grid-container {
        display: grid;
        grid-template-columns: 3rem auto;
        grid-template-rows: 3rem auto;
    }
}
</style>