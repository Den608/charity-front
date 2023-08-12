<script setup>
import { onMounted, ref, toRef } from "vue";

const pageList = ref([]);
const emit = defineEmits(["next", "prev", "goTo"]);
const props = defineProps(["currentPage", "lastPage"]);
const { lastPage } = props;
const currentPageToRef = toRef(props, "currentPage");

function refactorPages(page) {
  pageList.value = [];
  pageList.value.push(1);
  for (let i = page - 2; i <= page + 2; i++) {
    if (i < lastPage && i > 1) {
      pageList.value.push(i);
    }
  }
  pageList.value.push(lastPage);
}

function gotoPage(page) {
  refactorPages(page);
  emit("goTo", page);
}

onMounted(() => {
  refactorPages(1);
});
</script>

<template>
  <div class="pagination" dir="ltr">
    <a
      @click="
        emit('prev');
        refactorPages(currentPageToRef - 1);
      "
    >
      <span class="material-symbols-sharp">first_page</span>
    </a>

    <a
      v-for="page in pageList"
      :class="currentPageToRef == page ? 'current' : 'page'"
      @click="gotoPage(page)"
      :key="page"
    >
      {{ page }}
    </a>

    <a
      @click="
        emit('next');
        refactorPages(currentPageToRef + 1);
      "
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
  border-radius: 50%;
  background-color: var(--color-primary-light);
  color: var(--color-white);
}

.pagination .current {
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  text-align: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-info-light);
  color: var(--color-white);
  border: 2px solid var(--color-info-dark);
  font-weight: bold;
}

.pagination .page:hover {
  background-color: var(--color-danger);
}
</style>
