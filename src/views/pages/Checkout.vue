<script setup>
import SquareTicketPayment from "@/components/SquareTicketPayment.vue"
import EmptyCart from "@/components/EmptyCart.vue"
import { useRouter } from 'vue-router';
import {useTicketStore} from '@/stores/ticket'
import { storeToRefs } from "pinia";

const store = useTicketStore()
const { cart } = storeToRefs(store);
const router = useRouter();
</script>
<template>
    <main>
        <div class="container custom-container">			
			<section class="pgTitle checkoutPg" v-motion-pop-bounce>
				<div class="row">
					<div class="col-md-6 col-lg-6">Checkout</div>
					<div class="col-md-6 col-lg-6 text-right">
						<div class="backNav"><img src="@/assets/images/arrow.png"> &nbsp; <router-link @click="router.go(-1)" to="">Back</router-link></div>
					</div>
				</div>
			</section>
			<SquareTicketPayment v-if="cart.length"/>
			<EmptyCart v-else/>
		</div>
    </main>
</template>
  