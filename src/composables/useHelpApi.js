import { ref } from 'vue'
import axiosInstance from '../services/axios'
import useComponentStore from '../store/componentStore'
import axios from 'axios'

export function useProductApi() {
    const helps = ref([{}])
    const helpCount = ref(0)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const inputErrors = ref('')
    const componentStore = useComponentStore()


    async function setAllHelp(){
        
    }

    async function createHelp(){
        
    }

    async function updateHelp(){
        
    }

    async function deleteHelps(){
        
    }

    async function filterHelps(){
        
    }

    async function nextPage(){
        
    }

    async function prevPage(){
        
    }

    async function gotoPage(number){

    }

    function ValidateFields(){

    }

    return {

    }
}