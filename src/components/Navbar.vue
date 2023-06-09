<script setup>
import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import useUSerStore from '../store/users';

const userStore=useUSerStore()

</script>

<template>
    <nav>
        <div class="profile">
            <div class="profile-photo">
                <img src="./images/profile-1.jpg" alt="">
            </div>
            <p style="font-weight: 600;">{{userStore.user.first_name}} {{ userStore.user.last_name }}</p>
        </div>
        <div class="theme-mode">
            <span class="material-symbols-sharp active">light_mode</span>
            <span class="material-symbols-sharp">dark_mode</span>
        </div>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
}

nav .profile {
    display: flex;
    align-items: center;
    gap: .8rem
}

nav .theme-mode{
    width:4.2rem;
    height: 1.6rem;
    background-color: var(--color-light);
    border-radius: var(--border-radius-1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: var( --box-shadow);
}


nav .theme-mode span{
    width: 50%;
    height: 100%;
    border-radius: var(--border-radius-1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

nav .theme-mode span.active{
    color: white;
    background-color: var(--color-dark);
}
</style>