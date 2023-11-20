/** @format */

import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
import baseUrl from "../services/baseUrl";
import useComponentStore from "./componentStore";

const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const router = useRouter();
  const componentStore = useComponentStore();

  async function handleLogin(credentials) {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, credentials);
      token.value = response.data.authorization.token;
      window.localStorage.setItem("token", token.value);
      componentStore.showPopup("احراز هویت موفقیت امیز بود", "success");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          componentStore.showPopup("کد ملی یا رمز عبور اشتباه است", "error");
        } else {
          componentStore.showPopup(
            "مشکلی وجود دارد لطفا با پشتیبانی ارتباط بگیرید",
            "error"
          );
        }
      } else if (error.request) {
        console.error("Network error:", error.request);
        componentStore.showPopup("خطای شبکه رخ داده است", "error");
      } else {
        console.error("Error:", error.message);
        componentStore.showPopup("خطای ناشناخته رخ داده است", "error");
      }
    }
  }

  async function setUser() {
    await axios
      .post("api/users/me", null, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        user.value = response.data.user;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          componentStore.showPopup("از دوباره وارد شوید ", "error");
          router.push("/login");
        }
      });
  }

  function handleLogout() {
    token.value = null;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("currentTab");
    router.push("/login");
  }

  function isValidNationalCode(code) {
    const regex = /^\d{10}$/;
    return regex.test(code);
  }

  function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  return {
    accessToken: token,
    handleLogin,
    handleLogout,
  };
});

export default useAuthStore;
