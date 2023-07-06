import { ref } from 'vue'
import { fetchWrapper } from '@/helpers';
import { defineStore } from 'pinia'

export const useServiceStore = defineStore('services', () => { 
  const services = ref([]) 

  const getServices = async () => {
    const response = await fetchWrapper.get('services');        
    services.value = response.data
  }
  return { services, getServices }
})
