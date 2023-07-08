import { defineStore } from "pinia";
import { ref } from "vue";


const useComponentStore = defineStore('components', () =>{
    const loading=ref(false)
    const popup=ref(false)

    function showLoading(){
        loading.value=true
    }

    function dismissLoading(){
        loading.value=false
    }

    function showPopup(){
        popup.value=true

        setTimeout(()=>{
            popup.value=false
        },3000)
    }

    return{
        loading,
        popup,
        showLoading,
        dismissLoading,
        showPopup
    }
})

export default useComponentStore