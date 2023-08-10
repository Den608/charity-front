<template>
  <div class="loading-overlay">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
  
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: auto;
  /* Add this line to enable scrolling when content overflows */
}

.lds-facebook {
  display: inline-block;
  width: 80px;
  position: relative;
  top: -5rem;
}

.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: var(--color-info-dark);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}

@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 100px;
  }

  50%,
  100% {
    top: 24px;
    height: 50px;
  }
}
</style>
  