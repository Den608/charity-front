<script setup>
const emit = defineEmits(["next", "prev", "goTo"]);
const { currentPage, lastPage, user } = defineProps([
  "currentPage",
  "lastPage",
  "user",
]);

function pages() {
  let arr = [];
  for (let i = currentPage; i < currentPage + 3; i++) {
    if (i < lastPage) {
      arr.push(i);
    }
  }
  return arr;
}

function gotoPage(page) {
  emit("goTo", page);
}
</script>

<template >
  <div class="pagination" dir="ltr">
    <a @click="emit('prev')">
      <span class="material-symbols-sharp">first_page</span>
    </a>

    <a class="page" @click="gotoPage(1)">
      {{ 1 }}
    </a>
    ...

    <a
      v-for="(page, index) in pages()"
      class="page"
      :class="index == 0 ? 'current' : ''"
      @click="gotoPage(page)"
      :key="page"
    >
      {{ page }}
    </a>
    ...

    <a class="page" @click="gotoPage(lastPage)">
      {{ lastPage }}
    </a>

    <a @click="emit('next')"
      ><span class="material-symbols-sharp">last_page </span></a
    >
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
  margin: 0.4rem;
  cursor: pointer;
}

.pagination .page {
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius: 0.4rem;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.pagination .current {
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius: 0.4rem;
  background-color: var(--color-info-light);
  color: var(--color-dark);
  border: 1px solid var(--color-dark);
}

.pagination .page:hover {
  color: var(--color-danger);
}
</style>