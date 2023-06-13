<script setup>
import { ref,  watchEffect,watch } from 'vue'
import { useRouter } from 'vue-router'
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/main/Dashboard.vue';
import Helper from '../components/main/Helper.vue';
import HelpSeeker from '../components/main/HelpSeeker.vue';
import Help from '../components/main/Help.vue';
import Package from '../components/main/Package.vue';
import Student from '../components/main/Student.vue';


const currentTab = ref(0)
const sidebarShow = ref(true)

const renderPage = (index) => {
    currentTab.value = index
}

const tabs = [
    Dashboard,
    Helper,
    HelpSeeker,
    Help,
    Package,
    Student
]

const windowWidth = ref(window.innerWidth)

watchEffect(() => {
    const handleResize = () => {
        windowWidth.value = window.innerWidth
        if (window.innerWidth < 768) {
            sidebarShow.value=false
        } else {
            sidebarShow.value=true
        }
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
})


const darkMode=ref(false)

const chnageTheme=()=>{
    darkMode.value=!darkMode.value
    document.body.classList.toggle('dark-theme-variables')
}

</script>

<template>
    <div class="grid-container">
        <Navbar class="navbar" @sideShow="sidebarShow = true" @chnageTheme="chnageTheme"/>

        <Transition name="side" appear>
            <SideBar v-if="sidebarShow" class="sidebar" @changeTab="renderPage" @sideClose="sidebarShow = false" />
        </Transition>

        <Transition appear name="tab">
            <component :is="tabs[currentTab]" class="components"></component>
        </Transition>

    </div>
</template>

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


.side-enter-from {
    transform: translateX(100vw);
    opacity: 0;
}

.side-enter-to {
    transform: translateX(0);
    opacity: 1;
}

.side-enter-active {
    transition: all 500ms ease;
}

.side-leave-from {
    transform: translateX(0);
    opacity: 1;
}

.side-leave-to {
    transform: translateX(100vw);
    opacity: 0;
}

.side-leave-active {
    transition: all 500ms ease;
}

/* --------- MEDIA QUERY 1----------- */
@media screen and (max-width:1200px) {
    .grid-container {
        display: grid;
        grid-template-columns: 3rem auto;
        grid-template-rows: 3rem auto;
    }
}

/* --------- MEDIA QUERY 2----------- */
@media screen and (max-width:768px) {
    .grid-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 3rem auto;
        gap: 0;
        width: 100%;
    }


}
</style>