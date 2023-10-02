<script setup>
const emit=defineEmits(['exit'])
const {title}=defineProps(['title'])

</script>

<template>
  <div class="user-history-overlay">
    <div class="history">
      <span class="material-symbols-sharp" id="exit" @click="emit('close')"> close </span>
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>عنوان</th>
            <th class="responsive-hidden">تعدا کالا</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>دفتر</td>
            <td>10</td>
            <td>1400/2/3</td>
          </tr>
          <tr>
            <td>کاپشن</td>
            <td>10</td>
            <td>1400/2/3</td>
          </tr>
          <tr>
            <td>جوراب</td>
            <td>10</td>
            <td>1400/2/3</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.user-history-overlay {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  z-index: 9;
  overflow: auto;
}

.user-history-overlay .history {
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  padding: var(--card-padding);
  position: relative;
  width: 40rem;
  min-height: 30rem;
  max-height: 50rem;
}

#exit {
  color: var(--color-danger);
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

#exit:hover {
  color: red;
  transition: all 300ms ease;
}

.user-history-overlay .history table {
  background: var(--color-light);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  margin-top: 1rem;
  max-height: 24rem;
  overflow-y: auto;
  padding: var(--card-padding);
  transition: all 300ms ease;
  text-align: center;
  width: 95%;
}

.user-history-overlay .history table:hover {
  box-shadow: none;
}

.user-history-overlay .history table tbody tr td {
  height: 2.8rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark);
}

.user-history-overlay .history table tbody tr:last-child td {
  border: none;
}
</style>
