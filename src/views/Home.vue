<script setup>
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';
import SideBar from '../components/SideBar.vue';
</script>

<template>
    <div class="grid-container">
        <Header class="header" />
        <SideBar id="sidebar" />
        <Main class="main" />
    </div>
</template>
<style scoped>
.grid-container{
    display: grid;
    grid-template-columns: 260px 1fr 1fr 1fr;
    grid-template-rows: .2fr 3fr;
    grid-template-areas: 
    "sidebar header header header"
    "sidebar main main main";
    height: 100vh;
}

.header{
    grid-area: header;
    height: 70px;
}

#sidebar{
    grid-area: sidebar;
    height: 100%;
}

.main{
    grid-area: main;
}

</style>