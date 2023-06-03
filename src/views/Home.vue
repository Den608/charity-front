<script setup>
import Dashboard from '../components/Dashboard.vue';
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/Navbar.vue';
</script>

<template>
    <div class="grid-container">
        <Navbar class="navbar" />
        <SideBar class="sidebar" />
        <Dashboard class="dashboard" />
    </div>
</template>px

<style>
.grid-container {
    display: grid;
    grid-template-columns: 14rem auto;
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