import { ref } from "vue";
import axiosInstance from "../services/axios";

export function useHelpSeeker() {
    const helpSeekerCount = ref(0)

    async function setHelpSeekerCount() {
        await axiosInstance.get('/api/users?role=help_seeker')
            .then((response) => {
                helpSeekerCount.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    } 

    return {
        helpSeekerCount,
        setHelpSeekerCount
    }
}