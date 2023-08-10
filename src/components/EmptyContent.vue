<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <h1><span>🤨</span></h1>
      </div>
      <h2>هیچ محتوایی یافت نشد!!!</h2>
    </div>
  </div>
</template>

<style scoped>
#notfound {
  position: relative;
}

.notfound {
  text-align: center;
}

.notfound .notfound-404 {
  height: 130px;
}

.notfound .notfound-404 h1 {
  font-family: "Vazirmatn", sans-serif !important;
  margin: 0px;
  color: #232323;
}

.notfound .notfound-404 h1 > span {
  display: inline-block;
  width: 120px;
  height: 90px;
  font-size: 4rem;
  background-size: cover;
  -webkit-transform: scale(1.4);
  -ms-transform: scale(1.4);
  transform: scale(1.4);
  z-index: -1;
  animation-name: floating;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

.notfound h2 {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #232323;
}

@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 115px;
  }

  .notfound .notfound-404 h1 {
    font-size: 86px;
  }

  .notfound .notfound-404 h1 > span {
    width: 86px;
    height: 86px;
  }
}

@keyframes floating {
  from {
    transform: scale(1.4) translate(0, 0);
  }

  50% {
    transform: scale(1.4) translate(0, 15px);
  }

  to {
    transform: scale(1.4) translate(0, 0);
  }
}
</style>