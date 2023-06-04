<script setup>
import { ref } from 'vue'
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/main/Dashboard.vue';
import Helper from '../components/main/Helper.vue';
import HelpSeeker from '../components/main/HelpSeeker.vue';
import Help from '../components/main/Help.vue';
import Package from '../components/main/Package.vue';
import Student from '../components/main/Student.vue';

const pageShow = ref([true, false, false, false, false, false])

const renderPage = (index) => {
    pageShow.value.fill(false)
    pageShow.value[index] = true
}

</script>

<template>
    <div class="grid-container">
        <Navbar class="navbar" />
        <SideBar class="sidebar" @changeTab="renderPage" />

        <Transition name="tab" appear>
            <Dashboard class="dashboard" v-if="pageShow[0]" />
        </Transition>

        <Transition name="tab">
            <Helper v-if="pageShow[1]" />
        </Transition>

        <Transition name="tab">
            <HelpSeeker v-if="pageShow[2]" />
        </Transition>

        <Transition name="tab">
            <Help v-if="pageShow[3]" />
        </Transition>

        <Transition name="tab">
            <Package v-if="pageShow[4]" />
        </Transition>

        <Transition name="tab">
            <Student v-if="pageShow[5]" />
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
        "sidebar dashboard";
}

.navbar {
    grid-area: navbar;
}

.sidebar {
    grid-area: sidebar;
}

.dashboard {
    grid-area: dashboard;
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
</style>