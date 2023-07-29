import { defineStore } from "pinia";
import { ref } from "vue";


const useComponentStore = defineStore('components', () =>{
    const loading=ref(false)
    const popup=ref(false)
    const popupMessage=ref("")
    const popupStatus=ref("success")

    function showLoading(){
        loading.value=true
    }

    function dismissLoading(){
        loading.value=false
    }

    function showPopup(message, status){
        popup.value=true
        popupMessage.value=message
        popupStatus.value=status

        setTimeout(()=>{
            popup.value=false
            popupMessage.value=""
            popupStatus.value="success"
        },3000)
    }

    return{
        loading,
        popup,
        popupMessage,
        popupStatus,
        showLoading,
        dismissLoading,
        showPopup
    }
})

export default useComponentStore