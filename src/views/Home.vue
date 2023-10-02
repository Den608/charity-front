<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import SideBar from '../components/SideBar.vue';
import Navbar from '../components/Navbar.vue';
import Dashboard from '../components/main/Dashboard.vue';
import Helper from '../components/main/Helper.vue';
import HelpSeeker from '../components/main/HelpSeeker.vue';
import Help from '../components/main/Help.vue';
import Package from '../components/main/Package.vue';
import Product from '../components/main/Product.vue';
import AidAlocation from '../components/main/AidAlocation.vue';
import PackageAllocation from '../components/main/PackageAllocation.vue';
import Profile from '../components/main/Profile.vue';

//this line set the initial tab
const localTab = window.localStorage.getItem('currentTab')
const currentTab = ref(parseInt(localTab) ? localTab : 0)

const sidebarShow = ref(true)

const renderPage = (index) => {
    currentTab.value = index
    window.localStorage.setItem('currentTab', index)
}

const tabs = [
    Dashboard,
    Helper,
    HelpSeeker,
    Product,
    Help,
    Package,
    AidAlocation,
    PackageAllocation,
    Profile
]


// manging visibility of sideBar when screen size chnages
const windowWidth = ref(window.innerWidth)

watchEffect(() => {
    const handleResize = () => {
        windowWidth.value = window.innerWidth
        if (window.innerWidth < 768) {
            sidebarShow.value = false
        } else {
            sidebarShow.value = true
        }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
    }
})
</script>

<template>
    <div class="grid-container">
        <Navbar class="navbar" @sideShow="sidebarShow = true" />
        <Transition name="side">
            <SideBar v-show="sidebarShow" class="sidebar" @changeTab="renderPage" @sideClose="sidebarShow = false" />
        </Transition>
 
        <Transition name="tab" appear>
        <component :is="tabs[currentTab]" class="components"></component>
        </Transition>

    </div>
</template>

<style>
.grid-container {
    display: grid;
    grid-template-columns: 15rem auto;
    grid-template-rows: 3rem auto;
    width: 100%;
    margin: 0 auto;
    gap: 2rem;
    grid-template-areas:
        "navbar navbar"
        "sidebar components";
    overflow: hidden;
}

.navbar {
    grid-area: navbar;
}

.sidebar {
    grid-area: sidebar;
}

.components {
    grid-area: components;
    max-height:45rem;
    overflow-y: auto;
    overflow-x: hidden;
}

/* Animation Event setting */
/* tabs  animations*/
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


/* Sidebar Animations */
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

/* --------- MEDIA QUERY 1 for tablets----------- */
@media screen and (max-width:1200px) {
    .grid-container {
        display: grid;
        grid-template-columns: 3rem auto;
        grid-template-rows: 3rem auto;
    }
}

/* --------- MEDIA QUERY 2 for phone and smaller tablet----------- */
@media screen and (max-width:768px) {
    .grid-container {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 3rem auto;
        gap: 0;
    }

    .grid-container .components{
        width: 100vw;
    }

}
</style>