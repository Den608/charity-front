import axiosInstance from "../services/axiosInstance";
import authStore from "../store/authStore";

export default function () {
    const store = authStore()

    function login(user) {
        try {
            const response = axiosInstance.post('/api/login', user)
            store.accessToken.value = response.data.accessToken
            store.refreshToken.value = response.data.refreshToken
            store.isAuthenticated.value = true
        }
        catch (err) {
            console.log(err)
        }
    }

    function setCurrentUser() {
        try {
            const response = axiosInstance.post('/api/login', user)
            store.user.value = response.data
        }
        catch (err) {
            console.log(err)
        }
    }

    function refreshToken() {
        try {
            const response = axiosInstance.post('/api/refresh', refreshToken)
            store.accessToken.value = response.data.accessToken
        }
        catch {
            console.log(err)
        }
    }

    function logout() {
        store.logout()
    }
}