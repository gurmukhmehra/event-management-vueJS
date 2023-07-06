import { ref } from 'vue'
import { fetchWrapper } from '@/helpers';
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => { 
  const appInfo = ref([]) 

  const getAppInfo = async () =>{
    const response = await fetchWrapper.get('siteInfo');  
    appInfo.value = response.data[0]
  }
  return { appInfo, getAppInfo }
}, {persist: { storage: sessionStorage, key: 'appInfo'}})
