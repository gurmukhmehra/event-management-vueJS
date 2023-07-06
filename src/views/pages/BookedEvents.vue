<script setup>
import { onMounted, ref } from 'vue'
import PdfComponent from "@/components/PdfComponent.vue";

import  {useEventStore} from '@/stores/event.store'
import  {usePageStore} from '@/stores/page'
import { storeToRefs } from "pinia";

const pageStore = usePageStore()
const store = useEventStore()  
const { bookedEvents, pdfValue } = storeToRefs (store)
const { html2Pdf } = storeToRefs (pageStore)
store.getBookedEvents()	

function downloadTicket (orderIndex) {
	store.getEventsByOrder(orderIndex)
	pdfValue.value = true;
	html2Pdf.value.generatePdf()
}
</script>
<template>
    <main>
        <div class="container custom-container">
			<section class="pgTitle">Booked Events</section>
			<section class="evList" v-for="(order, index) in bookedEvents" :key="order.id">
				<div class="row">
					<div class="col-md-2 col-lg-2">
					   <div class="featureImg">
                        	<img :src="order.events.featureImage"/>
						</div>
					</div>
					<div class="col-md-4 col-lg-4">
						<div class="evntTitle">
							<h3>{{ order.events.title }} <span>{{ order.purchase_tickets }} Tickets</span></h3>
							<h4>{{ order.events.eventLocation }}</h4>
							<div class="postMeta">
									<span class="postDate">{{order.events.eventDate}}</span>
									<span class="postDate"><img src="@/assets/images/time.png">{{order.events.eventTime}}</span>
								</div>
						</div>
					</div>					
					
					<div class="col-md-3 col-lg-3 postBtnT">
						<router-link class="viewBtn" @click="downloadTicket(index)" to="">Download Ticket</router-link>						
					</div>					
				</div>
			</section>
		</div>
		<PdfComponent/>
    </main>
</template>
<style>

</style>
  