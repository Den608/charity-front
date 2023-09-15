<script setup>
import { onMounted } from "vue";

onMounted(() => {
  /* js code for the background color and icon color change */

  const container = document.body;
  const tabOne = document.querySelector(".link1");
  const tabTwo = document.querySelector(".link2");
  const tabThree = document.querySelector(".link3");
  const tabs = document.querySelectorAll(".link");
  tabOne.classList.add("tabone");
  tabOne.addEventListener("click", () => {
    container.style.backgroundColor = "rgb(238, 174, 195)";
    tabOne.classList.add("tabone");
    tabThree.classList.remove("tabone");
    tabTwo.classList.remove("tabone");
  });
  tabTwo.addEventListener("click", () => {
    container.style.backgroundColor = "rgb(146, 146, 228)";
    tabTwo.classList.add("tabone");
    tabThree.classList.remove("tabone");
    tabOne.classList.remove("tabone");
  });
  tabThree.addEventListener("click", () => {
    container.style.backgroundColor = "rgb(245, 233, 67)";
    tabThree.classList.add("tabone");
    tabOne.classList.remove("tabone");
    tabTwo.classList.remove("tabone");
  });
});
</script>

<template>
  <div class="product-overlay">
    <div class="wrapper">
      <div class="container">
        <nav>
          <a href="#html" class="link link1"> <i class="fab fa-html5"></i></a>
          <a href="#css" class="link link2">
            <i class="fab fa-css3"></i>
          </a>
          <a href="#js" class="link link3">
            <i class="fab fa-js"></i>
          </a>
        </nav>
        <div class="content">
          <div class="item item1" id="html">
            <i class="fab fa-html5"></i>
            <div class="line line1"></div>
            <div class="line line2"></div>
            <div class="line line3"></div>
          </div>
          <div class="item item2" id="css">
            <i class="fab fa-css3"></i>
            <div class="line line1"></div>
            <div class="line line2"></div>
            <div class="line line3"></div>
          </div>
          <div class="item item3" id="js">
            <i class="fab fa-js"></i>
            <div class="line line1"></div>
            <div class="line line2"></div>
            <div class="line line3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* css code */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-scroll-behavior: smooth;
  scroll-behavior: smooth;
}


.product-overlay{
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
.container {
  width:inherit;
  height: 350px;
  box-shadow: 0px 2px 4px black;
  background: white;
  overflow: hidden;
  z-index: 3;
}
.wrapper {
    width: 30rem;
    position: relative;
  overflow: hidden;
  box-shadow: 3px 2px 3px rgba(0, 0, 0, 0.459);
  color: rgb(160, 236, 241);
}
nav {
  position: absolute;
  top: 87%;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid gainsboro;
  z-index: 8;
  background: white;
  color: rgb(150, 240, 177);
}
nav a {
  padding: 10px;
  text-decoration: none;
  color: gray;
  font-size: 1.4rem;
}
nav::after {
  content: "";
  display: block;
  position: absolute;
  top: 36%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 6px;
  background: rgba(231, 228, 228, 0.801);
  border-radius: 5px;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
}
.item {
  width:30rem;
  color: black;
  background: white;
  display: flex;
  row-gap: 25px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.link {
  transition: all 0.3s;
}
.tabone {
  color: rgb(22, 22, 22);
  transform: scale(1.1);
  border-bottom: 1px solid black;
}
.line {
  width: 70%;
  height: 8px;
  margin-top: 5px;
  background: gainsboro;
  border-radius: 8px;
}
.line2 {
  width: 50%;
}
.item i {
  font-weight: bolder;
  font-size: 3rem;
  color: rgb(12, 12, 12);
}
.item1 i {
  color: rgb(243, 118, 160);
}
.item2 i {
  color: rgb(146, 146, 228);
}
.item3 i {
  color: rgb(245, 233, 67);
}
footer {
  width: 100%;
  justify-content: center;
  column-gap: 30px;
  display: flex;
  font-size: 30px;
}
footer a {
  color: black;
  margin-left: 5px;
}
.fa-twitter:hover {
  color: skyblue;
}
.fa-instagram:hover {
  color: #f44242;
}
</style>
