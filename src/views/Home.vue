<script setup>
import {ref} from 'vue'
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/Dashboard.vue';

const pageShow=ref([true, false, false, false, false, false])

const renderPage=(index)=>{
    pageShow.value.fill(false)
    pageShow.value[index]=true
}

</script>

<template>
    <div class="grid-container">
        <Navbar class="navbar" />
        <SideBar class="sidebar" @changeTab="renderPage"/>

        <Dashboard class="dashboard" v-if="pageShow[0]"/>
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
    grid-area:sidebar;
}

.dashboard {
    grid-area: dashboard;
}
</style>