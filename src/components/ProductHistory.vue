<script setup>
const emit=defineEmits(['exit'])
</script>

<template>
  <div class="product-history-overlay">
    <div class="history">
      <span class="material-symbols-sharp" id="exit" @click="emit('close')"> close </span>
      <h2>تاریخچه محصول</h2>
      <table>
        <thead>
          <tr>
            <th class="responsive-hidden">تعدا کالا</th>
            <th class="responsive-hidden">نام مددیار</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>عرفان باقری</td>
            <td>1400/2/3</td>
          </tr>
          <tr>
            <td>10</td>
            <td>عرفان قربانی</td>
            <td>1400/2/3</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

h3{
  width:90%;
  text-align: right;
  margin-top: 1rem;
  font-size: 1.1rem;
}
.product-history-overlay {
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

.product-history-overlay .history {
  align-items: center;
  background-color: var(--color-white);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: var(--card-padding);
  position: relative;
  width: 40rem;
  height:30rem;
  max-height:30rem;
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

.product-history-overlay .history table {
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

.product-history-overlay .history table:hover {
  box-shadow: none;
}

.product-history-overlay .history table tbody tr td {
  height: 2.8rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark);
}

.product-history-overlay .history table tbody tr:last-child td {
  border: none;
}
</style>
