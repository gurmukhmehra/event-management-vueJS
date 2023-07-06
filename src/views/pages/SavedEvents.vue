<script setup>
import { onMounted } from 'vue'
import  {useEventStore} from '@/stores/event.store'
import {useTicketStore} from '@/stores/ticket'
import { storeToRefs } from "pinia";
const ticketStore = useTicketStore()
const store = useEventStore()  
const { eventWishlist } = storeToRefs (store)
onMounted(() => {
	store.allWishlist()	
})

function toggleCart(index, status){  
	eventWishlist.value[index].isHover = status   
}

function buyTicket(event, index) {	
    ticketStore.addToCart(event);
    eventWishlist.value[index].isCart = true    
}

function removeEventWishlist(eventId, index){
	store.removeWishlist(eventId, index)
}
</script>
<template>
    <main>
        <div class="container custom-container">
			<section class="pgTitle">Saved Events</section>
			<section class="evList" v-for="(event, index) in eventWishlist" :key="event.id">
				<div class="row">
					<div class="col-md-2 col-lg-2">
					   <div class="featureImg">
                        	<img :src="event.featureImage"/>
						</div>
					</div>
					<div class="col-md-4 col-lg-4">
						<div class="evntTitle">
							<h3>{{ event.title }} <span> <router-link @click="removeEventWishlist(event.id, index)" to="">Remove</router-link></span></h3>
							<h4>{{ event.eventLocation }}</h4>
							<div class="postMeta">
									<span class="postDate">{{event.eventDate}}</span>
									<span class="postDate"><img src="@/assets/images/time.png">{{event.eventTime}}</span>
								</div>
						</div>
					</div>
					<div class="col-md-2 col-lg-2">
						<div class="evntPrice">Price <br> <span>${{event.eventTicketsPrice}}</span></div>
					</div>
					
					<div class="col-md-3 col-lg-3 postBtnT">
						<router-link class="viewBtn" :to="'/event-detail/' + event.slug">Tickets & Details</router-link>
					</div>
					<div class="col-md-1 col-lg-1" v-if="event.pendingTickets > 0">
						<span v-if="event.isCart === true" class="postAdd" style="color: #5C5C5C; font-size: 16px;"><i class="fa-duotone fa-cart-shopping"></i> Added</span>
						<span v-else class="postAdd" @mouseenter="toggleCart(index,true)" @mouseleave="toggleCart(index, false)">
							<span class="cart-hover e-hover" v-show="event.isHover === false"><i class="fa-regular fa-cart-shopping"></i> Add</span>
							<span class="cart-hover e-hover" v-show="event.isHover === true" @click="buyTicket(event, index)"> Add to cart</span>
						</span> 
					</div>
				</div>
			</section>
		</div>
    </main>
</template>
  