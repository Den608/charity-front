import { defineStore } from "pinia";

const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    refreshToken: null,
    accessToken: null,
    user: null
  }),
  actions: {
    login(tokens) {
      this.refreshToken = tokens.refreshToken;
      this.accessToken = tokens.accessToken;
      this.user = tokens.user;
    },
    logout() {
      this.refreshToken = null;
      this.accessToken = null;
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});

export default useAuthStore;
