<script setup>
import { ref, watch } from 'vue'
import Pagination from './Pagination.vue';

const input = ref('')
const emit = defineEmits(['onTextChange'])
const { dataList } = defineProps(['dataList'])


watch(input, () => {
    emit('onTextChange', input.value)
})
</script>

<template>
    <div class="menu-container">

        <!-- TextBox -->
        <div class="menu">
            <div class="input">
                <span class="material-symbols-sharp">arrow_drop_down</span>
                <input type="text" v-model="input">
            </div>


            <!-- Menu -->
            <div class="drop-down" id="drop-menu">
                <Pagination v-if="dataList" id="pagination" :currentPage="1" :lastPage="10" @next="" @prev="" @goTo="" />

                <ul v-if="dataList">
                    <li v-for="data in dataList" :key="Math.random(0, 1000)">{{ data }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu-container {
    width: inherit;
    background-color: var(--color-white);
}

.menu-container .menu {
    width: 100%;
    display: flex;
    flex-direction: column;

}

.menu-container .menu .input {
    width: inherit;
    display: flex;
    background-color: white;
    align-items: center;
    height: 2.5rem;
}


.menu-container .menu .input input {
    display: flex;
    align-items: center;
    height: inherit;
    width: inherit;
    background-color: inherit;
    color: inherit;
    font-size: 1.4rem;
}

.menu-container .menu .input span {
    height: inherit;
}

.menu-container .menu .input span:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.menu-container .drop-down ul li {
    height: 2rem;
    text-align: center;
}

.menu-container .drop-down ul li:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
}
</style>