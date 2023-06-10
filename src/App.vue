<script setup>
import { RouterView, useRouter } from 'vue-router';
const isAuthenticated = window.localStorage.getItem('isAuthenticated')
const router = useRouter()

if (!isAuthenticated) {
    router.push('/login')

    // i should handle user state here 
}

</script>

<template>
    <RouterView />
</template>

<style scoped></style>
