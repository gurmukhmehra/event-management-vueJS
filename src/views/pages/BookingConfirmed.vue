<script setup>
import { ref } from "vue";
import {useTicketStore} from '@/stores/ticket'
import { fetchWrapper } from '@/helpers'
const store = useTicketStore()
const orders = ref({})
store.resetCart()

async function getOrderTickets() { 
	const res = await fetchWrapper.post('order-tickets', {'order_id':store.lastOrderID});	
	orders.value = res.data
}
getOrderTickets()
</script>
<template>
    <main>
		<div class="container edckcustom-container">
			<section class="text-center"><img src="@/assets/images/succesfull.png"></section>
			<section class="sp-head">
				<div class="row">
					<div class="col-md-12 col-lg-12 text-center"><h2>Ticket Successfully Purchased!</h2>
						<p>Your seats are booked. We have sent detailed ticket on email as well.</p>
					</div>
				</div>
			</section>
			<section class="tsp-list" v-for="(order, index) in orders" :key="order.id">
				<div class="row">
					<div class="col-md-2 col-lg-2">
						<div class="featureImg">
						<router-link to=""><img src="@/assets/images/event1.jpg"></router-link>
						</div>
					</div>
					<div class="col-md-5 col-lg-5">
						<div class="evntTitle">
							<h3>{{ order.events.title }}</h3>
							<h4>{{ order.events.eventLocation }}</h4>
							<div class="postMeta">
									<span class="postDate">{{order.events.eventDate}}</span>
									<span class="postDate"><img src="@/assets/images/time.png"> &nbsp;{{order.events.eventTime}}</span>
								</div>
						</div>
					</div>
					<div class="col-md-5 col-lg-5 pdnumber">
						<span class="tsp-download"><img src="@/assets/images/pdf_icon.png"> Download</span>
						<span class="tsp-trns">Transaction ID</span>
						{{order.orders.payment_id}}
					</div>
				</div>
				
				<div class="row">
					<div class="col-md-2 col-lg-2 text-center">
						<span class="tsp-trns-text">Ticket for {{ order.purchase_tickets > 1 ? order.purchase_tickets+' persons': order.purchase_tickets+' person'}} </span>
					</div>
					<div class="col-md-7 col-lg-7">
						<span class="tsp-trns-text">Click photo of this screen to show on entrance gate.</span>
					</div>
					<div class="col-md-3 col-lg-3 pdnumber">
						&nbsp;
					</div>
				</div>
			</section>
			
	
			
			<section class="moreEvents">
				<div class="viewBtnSec" v-motion-pop-bounce><router-link  to="/event" class="viewBtn">Explore More Events</router-link></div>
			</section>
		</div>
    </main>
</template>
  