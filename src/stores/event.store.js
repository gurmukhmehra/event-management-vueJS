import { ref, computed} from 'vue'
import { fetchWrapper } from '@/helpers';
import { defineStore } from 'pinia'
import { useTicketStore } from './ticket'
import { useToast } from 'vue-toastification'

export const useEventStore = defineStore('event', () => { 
  const toast = useToast()
  const tickets = useTicketStore()
  const events = ref([]) 
  const eventDetail = ref([]) 
  const eventWishlist = ref([])
  const bookedEvents = ref([])
  const pdfValue = ref(false)
  const orders = ref([])

  const getEvents = async () => {       
    const response = await fetchWrapper.get('eventslist');
    response.data.forEach((event, index) => {
      response.data[index].pendingTickets = event.eventTickets - event.eventPurchased
      let found = tickets.cart.find(item => item.id == event.id );
      if(found){
        response.data[index].isCart = true
        response.data[index].isHover = false
      }else{        
        response.data[index].isCart = false
        response.data[index].isHover = false
      }
      let checkWishlist = eventWishlist.value.find(item => item.id == event.id );
      if(checkWishlist){
        response.data[index].isWishlist = true    
      }else{        
        response.data[index].isWishlist = false       
      }
    });   
    events.value = response.data  
  }

  const getEventsById = async (eventId) => {   
    const response = await fetchWrapper.get('eventslist');    
    events.value = response.data
  }

  const getEventDetail = async (slug) => {  
    const response = await fetchWrapper.get(`events-details/${slug}`);    
    eventDetail.value = response.data
  }  

  const addWishlist = async (eventId) =>{
    const response = await fetchWrapper.post('wishlist-items', {'eventID':eventId});  
  }

  const getWishlist = async () =>{
    const response = await fetchWrapper.get('wishlist');  
    eventWishlist.value = response.data
  }

  const allWishlist = async () =>{
    const response = await fetchWrapper.get('wishlist'); 
    response.data.forEach((event, index) => {
      response.data[index].pendingTickets = event.eventTickets - event.eventPurchased
      let found = tickets.cart.find(item => item.id == event.id );
      if(found){
        response.data[index].isCart = true
        response.data[index].isHover = false
      }else{        
        response.data[index].isCart = false
        response.data[index].isHover = false
      }     
    });       
    eventWishlist.value = response.data
  }

  const removeWishlist = async (eventId, index) =>{
    const response = await fetchWrapper.post('wishlist-remove', {'eventID':eventId});  
    if(response.data == 'success'){
      eventWishlist.value.splice(index,1);
    }else{
      toast.error('Event remove from wishlist failed!'); 
    }    
  }

  const getBookedEvents = async (slug) => {  
    const response = await fetchWrapper.get('booked-events');    
    bookedEvents.value = response.data
  }  
  
  const getEventsByOrder = async (index) => {  
    orders.value = bookedEvents.value[index]
  }  

  function toggleCart(index, status){  
    events.value[index].isHover = status   
  }
  
  function buyTicket(event, index) {	
    tickets.addToCart(event);
    events.value[index].isCart = true    
  }
  
  function addToWishlist(eventId, index){
    addWishlist(eventId)
    events.value[index].isWishlist = true 
  }
  
  return {bookedEvents, eventDetail, events, getEvents, getEventDetail, addWishlist, getWishlist, eventWishlist, addToWishlist, buyTicket, toggleCart, removeWishlist, allWishlist, getBookedEvents, getEventsByOrder, orders, pdfValue}
})
