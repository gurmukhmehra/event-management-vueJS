import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useTicketStore = defineStore('ticket', () => { 
  const toast = useToast()
  const cart = ref([])  
  const cartCount = ref(0) 
  const lastOrderID = ref('') 

  const cartPriceTotal = computed(() => {
    let total = 0;
    cart.value.filter((item) => {
        total += (item.ticketInQueue * item.eventTicketsPrice);
    });   
    return total     
  })
  
  const addToCart = (item) => {  
    let found = cart.value.find(event => event.id == item.id );
    if(found){
      found.ticketInQueue++;
    }else{  
      cartCount.value++  
      item.ticketInQueue = 1      
      cart.value.push(item)
    }     
  }

  const updateToCart = (index, value, event) => {
    if(value <= event.eventTickets){
      cart.value[index].ticketInQueue = value 
    }else{
      toast.warning("Can't add more the available tickets.");        
      cart.value[index].ticketInQueue = event.eventTickets
    }
  }
  
  const removeToCart = (index, item) => {  
    cartCount.value--       
    cart.value.splice(index,1);
  }

  const resetCart = () => {
    cart.value = []
    cartCount.value = 0
  }

  return {cart, addToCart, updateToCart, removeToCart, cartPriceTotal, cartCount, resetCart, lastOrderID}

}, {persist: { storage: sessionStorage, key: 'cart'}})
