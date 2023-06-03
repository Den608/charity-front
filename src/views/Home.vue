<script setup>
import Dashboard from '../components/Dashboard.vue';
import SideBar from '../components/SideBar.vue';
</script>

<template>
    <div class="grid-container">
        <SideBar id="sidebar" />
        <Dashboard/>
    </div>
</template>
<style scoped>
.grid-container{
    display: grid;
    grid-template-columns: 14rem auto 23rem;
    width: 96%;
    margin: 0 auto;
    gap: 1.8rem;
}

</style>