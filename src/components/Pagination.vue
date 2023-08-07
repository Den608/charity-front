<script setup>
const emit = defineEmits(['next', 'prev', 'goTo'])
const { currentPage, lastPage, user } = defineProps(['currentPage', 'lastPage', 'user'])

function pages() {
    let arr = []
    for (let i = currentPage; i < currentPage + 4; i++) {
        if (i < lastPage) {
            arr.push(i)
        }
    }
    return arr
}
</script>

<template >
    <div class="pagination" dir="ltr">

        <a @click="emit('prev')">
            <span class="material-symbols-sharp">first_page</span>
        </a>

        <!-- <a class="current" href="#top" @click="emit('goTo', currentPage)">
            {{ currentPage }}
        </a> -->

        <a v-for="page in pages()" class="page" @click="emit('goTo', page)">
            {{ page }}
        </a> ...

        <a class="page" @click="emit('goTo', lastPage)">
            {{ lastPage }}
        </a>
        <a @click="emit('next')"><span class="material-symbols-sharp">last_page </span></a>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
}

.pagination * {
    margin: .4rem;
    cursor: pointer;
}

.pagination .page {
    width: 2rem;
    height: 2rem;
    display: flex;
    text-align: center;
    justify-content: center;
    border-radius: .4rem;
    background-color: var(--color-primary);
    color: var(--color-white);
}

.pagination .current {
    width: 2rem;
    height: 2rem;
    display: flex;
    text-align: center;
    justify-content: center;
    border-radius: .4rem;
    background-color: var(--color-info-light);
    color: var(--color-dark);
    border: 1px solid var(--color-dark);
}

.pagination .page:hover {
    color: var(--color-danger);
}
</style>