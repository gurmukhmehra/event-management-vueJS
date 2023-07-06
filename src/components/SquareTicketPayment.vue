<script setup>
import { ref, computed } from "vue";
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import {useTicketStore} from '@/stores/ticket'
import { useAuthStore } from '@/stores/auth.store';
import { fetchWrapper } from '@/helpers';
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'
import { loadScript } from "vue-plugin-load-script";

const toast = useToast()
const authStore = useAuthStore()
const store = useTicketStore()
const { authUser } = storeToRefs(authStore)
const checkoutUser = computed(() => authStore.profileForm);
const { cart, cartPriceTotal, lastOrderID} = storeToRefs(store)
const { removeToCart, updateToCart } = store 
const router = useRouter()
const apiRoute = ref('purchase-tickets')
const invalidForm = ref(false)

if(authUser.value){
  apiRoute.value = 'purchase-tickets-auth'
  authStore.getUser()
}

const schema = yup.object({
    email: yup.string().required('Email is required').email(),
    name: yup.string().required('Name is required'),
    phone: yup.number().required('Phone is required'),   
    country: yup.string().max(2).required('Country is required'),
    city: yup.string().required('City is required')
});

const appId = 'sandbox-sq0idb-ioQLqyvf_BrG6P7mmdRjtw';
const locationId = 'L0NKFZ5Y13GHS';

let card;
let loading = ref(true);
let squarePayment;

loadScript("https://sandbox.web.squarecdn.com/v1/square.js")
.then(async () => {
  await initializePaymentForm();
  loading.value = false;
})
.catch(() => {
  console.log("failed in load script")
});

const initializePaymentForm = async () => {
  if (!Square) {
    throw new Error("Square.js failed to load properly");
  }    
  squarePayment = Square.payments(appId, locationId);
  try {
    card = await squarePayment.card();
    await card.attach("#card-container");
  } catch (e) {
    console.error("Initializing Card failed", e);
    return;
  }
}

const tokenize = async (paymentMethod) => { 
  const tokenResult = await paymentMethod.tokenize(); 
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    return tokenResult.errors;
  }
}

const verifyBuyer = async (payments, token) => {
  try{
    let fullname = checkoutUser.value.name.split(" ");
    const verificationDetails = {
      amount: String(cartPriceTotal.value),
      /* collected from the buyer */
      billingContact: {  
        addressLines: ['123 Main Street', 'Apartment 1'],   
        familyName: fullname[0],
        givenName: fullname[1],
        email: checkoutUser.value.email,
        country: checkoutUser.value.country,
        phone: checkoutUser.value.phone,
        city: checkoutUser.value.city,
        region: 'LND',
      },
      currencyCode: 'USD',
      intent: 'CHARGE',
    }; 
    
    const verificationResults = await squarePayment.verifyBuyer(
      token,
      verificationDetails
    );    
    return verificationResults.token;
  } catch (e) {    	
    return 'error';
  } 
}

const onPayment = async (values, { setErrors , resetForm}) => {  
  const token = await tokenize(card);  
  const verificationToken = await verifyBuyer(card, token);  
  if(verificationToken == 'error'){
    toast.info("Error in verification")
    return false
  }
  let formData = {
    'sourceId': token,
    'events':cart.value,
    'total_amount': cartPriceTotal.value,
    'email': values.email,
    'name': values.name,
    'verify_token': verificationToken
  }

  const res = await fetchWrapper.post(apiRoute.value, formData)
  if(res.message == 'success'){		
		resetForm()
    lastOrderID.value = res.data.order_id
    if(!authUser.value){
      authStore.setAuthToken(res.data.token)
    }
		router.push('/booking-confirmed');
	}else{
		setErrors( res.data )
	}
}

function onInvalidSubmit({ errors }) {
  if(errors){
    invalidForm.value = true
    setTimeout(() => {		
      invalidForm.value = false
    }, 1500)
  }  
}
</script>
<template>  
  <section class="evList" v-for="(item, index) in cart" :key="item.id">
				<div class="row">
					<div class="col-md-2 col-lg-2">
					   <div class="featureImg">
							<a href="#"><img src="@/assets/images/event1.jpg"></a>
						</div>
					</div>
					<div class="col-md-4 col-lg-4">
						<div class="evntTitle">
							<h3>{{item.title}}</h3>
							<h4>{{item.eventLocation}}</h4>
							<div class="postMeta">
									<span class="postDate">{{item.eventDate}}</span>
									<span class="postDate"><img src="@/assets/images/time.png"> &nbsp;{{item.eventTime}}</span>
								</div>
						</div>
					</div>
					<div class="col-md-3 col-lg-3 text-center pdnumber">
						<input type="number" name="age" min="1" :max="item.eventTickets" :value="item.ticketInQueue" @input="updateToCart(index, $event.target.value, item)" ><span class="rmText"><router-link @click="removeToCart(index, item)" to="">Remove</router-link></span><br>
						<span class="subText">{{ item.eventTickets }} tickets available</span>
					</div>
					<div class="col-md-2 col-lg-2">
							<div class="evntPrice">Subtotal <br> <span>${{ item.eventTicketsPrice * item.ticketInQueue}}</span></div>
					</div>	
				</div>
			</section>	
		  
			 <section class="totalCost">
				<div class="row">
					<div class="col-md-12 col-lg-12">Total: ${{ cartPriceTotal }}</div>
				</div>
			</section>
			
      <section class="makePayment">
				<div class="row">
					<div class="col-md-5 col-lg-5">
						<h2>Make a Payment</h2>						
						<form action="#">
							<ul class="radioSec">
								<li><input type="radio" id="pay_card" name="payment_type" value="pay_card" checked>
								<label for="pay_card">Pay with Debit/Credit/ATM Cards</label>
								<div class="check"></div></li>								
							</ul>
						</form>
					</div>
					<div class="col-md-7 col-lg-7">											
						<div class="cardDetails">	
              <Form @submit="onPayment" :validation-schema="schema" v-slot="{ errors, isSubmitting }" :initial-values="checkoutUser" @invalid-submit="onInvalidSubmit"> 
                <div class="row" style="margin-bottom: 15px;">
                  <div class="col-md-6 col-lg-6">
                    <label>Full Name</label>
                    <Field name="name" type="text" v-model="checkoutUser.name" :class="{ 'is-invalid': errors.name }"/>         
                    <div class="invalid-feedback">{{errors.name}}</div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <label>Phone</label>         
                    <Field name="phone" type="text" v-model="checkoutUser.phone" :class="{ 'is-invalid': errors.phone }"/>
                    <div class="invalid-feedback">{{errors.phone}}</div>
                  </div>	
                </div>
                <div class="row" style="margin-bottom: 15px;">
                  <div class="col-md-12 col-lg-12">
                    <label>Email</label>         
                    <Field name="email" type="email" v-model="checkoutUser.email" :class="{ 'is-invalid': errors.email }"/>
                    <div class="invalid-feedback">{{errors.email}}</div>
                  </div>				
                </div>

                <div class="row" style="margin-bottom: 15px;">
                  <div class="col-md-6 col-lg-6">
                    <label>Country<small class="text-sm text-muted">(Two-letter country code)</small></label>         
                    <Field name="country" type="text" v-model="checkoutUser.country" :class="{ 'is-invalid': errors.country }"/>
                    <div class="invalid-feedback">{{errors.country}}</div>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <label>City</label>         
                    <Field name="city" type="text" v-model="checkoutUser.city" :class="{ 'is-invalid': errors.city }"/>
                    <div class="invalid-feedback">{{errors.city}}</div>
                  </div>				
                </div>
                
                <div v-if="loading">Loading...</div>
                <div id="card-container" style="margin-top: 30px;"></div>               
                <button class="submit action-button" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting, shake: invalidForm }">
                  Pay ${{cartPriceTotal}}
							  </button>
                <div v-if="errors.payment" id="payment-status-container">
                  <div>{{errors.payment}}</div>
                </div>
              </Form>              
            </div>		
					</div>
				</div>
		</section>	
</template>
  
<style scoped>
button {
  color: #ffffff;
  background-color: #006aff;
  border-radius: 6px;
  cursor: pointer;
  border-style: none;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 16px;
  width: 100%;
}

button.submitting {
    position: relative;
    color: #6DC461!important;
}

#payment-status-container {
  width: fit-content;
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  background: #1a1a1a;
  display: flex;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 36px;
}
</style>