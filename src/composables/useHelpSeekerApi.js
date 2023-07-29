import { ref } from "vue";
import axiosInstance from "../services/axios";
import useComponentStore from "../store/componentStore";

export function useHelpSeeker() {
    const helpSeekers = ref({})
    const helpSeekerCount = ref(0)
    const componentStore = useComponentStore()

    async function setHelpSeekerCount() {
        await axiosInstance.get('/api/users?role=help_seeker')
            .then((response) => {
                helpSeekerCount.value = response.data.count
            }).catch((error) => {
                componentStore.showPopup("مشکلی پیش امده است", "error")
            })
    }

    async function setAllHelpSeekers() {
        await axiosInstance.get('/api/users?role=help_seeker&&page=1')
            .then((response) => {
                helpSeekers.value = response.data.users
            }).catch((error) => {
                console.log(error)
            })
    }

    return {
        helpSeekers,
        helpSeekerCount,
        setAllHelpSeekers,
        setHelpSeekerCount
    }
}