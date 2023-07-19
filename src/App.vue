<script setup>
import { RouterView } from 'vue-router';
import loading from './components/loading.vue';
import useComponentStore from './store/componentStore'
import popup from './components/Popup.vue'

const compoenentStore = useComponentStore()
</script>

<template>
    <popup v-if="compoenentStore.popup" />
    <loading v-if="compoenentStore.loading" class="loading" />
    <RouterView />
</template>

<style scoped>
.loading {
    width: 100vw;
    height: 100vh;
}
</style>