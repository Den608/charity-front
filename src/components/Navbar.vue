<script setup>
import { ref } from 'vue'


const emit = defineEmits(['sideShow', 'chnageTheme'])
const {user}=defineProps(['user'])

function onMenuButton() {
    emit('sideShow')
}

const themeActive = ref(false)

const onThemeChange = () => {
    emit('chnageTheme')
    themeActive.value = !themeActive.value
}

</script>

<template>
    <nav>
        <div class="container">
            <span @click="onMenuButton" class="material-symbols-sharp" :class="themeActive ? 'dark' : 'light'">menu</span>
            <div class="profile">
                <div class="profile-photo">
                    <img src="./images/profile-1.jpg" alt="">
                </div>
                <p style="font-weight: 600;">{{user.first_name }} {{user.last_name }}</p>
            </div>
            <div class="theme-mode" @click="onThemeChange">
                <span class="material-symbols-sharp" :class="!themeActive ? 'active' : 'disable'">light_mode</span>
                <span class="material-symbols-sharp" :class="themeActive ? 'active' : 'disable'">dark_mode</span>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    background-color: var(--color-white);
}

nav .container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 3rem;
}

nav p {
    color: var(--color-dark);
}

nav #menu {
    display: none;
}

nav .profile {
    position: absolute;
    right: 1px;
    display: flex;
    align-items: center;
}

nav .theme-mode {
    position: absolute;
    left: 1px;
    width: 4.2rem;
    height: 1.6rem;
    background-color: var(--color-light);
    border-radius: var(--border-radius-1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: var(--box-shadow);
}


nav .theme-mode span {
    width: 50%;
    height: 100%;
    border-radius: var(--border-radius-1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: var(--color-dark);
}

nav .theme-mode span.active {
    color: var(--color-white);
    background-color: var(--color-dark);
}

nav .theme-mode span.disable {
    color: var(--color-dark);
    background-color: var(--color-white);
}


/* --------------- MEDIA QUERY ------------------ */
@media screen and (max-width:768px) {
    nav {
        position: fixed;
        width: 100%;
        height: 4.2rem;
        z-index: 2;
        box-shadow: 0 1rem 1rem var(--color-light);
        padding-top: .5rem;
    }

    nav .container .profile {
        width: 3rem;
        position: absolute;
        right: 88%;
    }

    nav .profile p {
        display: none;
    }

    nav .theme-mode {
        width: 3rem;
        position: absolute;
        right: 75%;
    }

    nav .material-symbols-sharp {
        font-size: 2.5rem;
    }

    .light {
        color: black;
    }

    .dark {
        color: white;
    }
}
</style>