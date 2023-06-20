import { ref, onBeforeMount } from "vue";
import axiosInstance from "../services/axiosInstance";

export function useHelpSeeker() {
    const helpSeekerCount = ref(0)


    async function setHelpSeekerCount() {
        await axiosInstance.get('/api/users?role=help_seeker',{
            headers:{
                Authorization:`Bearer ${window.localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                helpSeekerCount.value = response.data.count
            }).catch((error) => {
                console.log(error)
            })
    }

    onBeforeMount(() => {
        setHelpSeekerCount()
    })

    return{
        helpSeekerCount,
        setHelpSeekerCount
    }
}