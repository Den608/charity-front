import { defineStore } from "pinia";
import { ref } from "vue";


const useComponentStore = defineStore('components', () =>{
    const loading=ref(false)
    const popup=ref(false)
    const popupMessage=ref("")
    const popupStatus=ref("success")
    const alert=ref(false)
    const alertMessage=ref("")
    const submitAlert=ref(false)


    function showLoading(){
        loading.value=true
    }

    function dismissLoading(delay=1000){
        loading.value=false
    }

    function withLoadingIndicator(fn) {
        return async function (...arg) {
            showLoading()
            await fn(...arg)
            dismissLoading()
        }
    }

    function showPopup(message, status,timeout=5){
        popup.value=true
        popupMessage.value=message
        popupStatus.value=status

        setTimeout(()=>{
            popup.value=false
            popupMessage.value=""
            popupStatus.value="success"
        },timeout*1000)
    }

    function showAlert(message){
        alert.value=true
        alertMessage.value=message
    }

    function callSubmitAlert(){
        submitAlert.value=false
        alert.value=false
    }

    return{
        loading,
        popup,
        popupMessage,
        popupStatus,
        alert,
        alertMessage,
        submitAlert,
        showAlert,
        callSubmitAlert,
        showLoading,
        dismissLoading,
        withLoadingIndicator,
        showPopup
    }
})

export default useComponentStore