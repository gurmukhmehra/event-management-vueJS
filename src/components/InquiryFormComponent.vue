<script setup>
import { toRefs, ref, onMounted } from "vue";
import {useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { fetchWrapper } from '@/helpers'
import { usePageStore } from '@/stores/page'
import { useAppStore } from '@/stores/app';

import { storeToRefs } from "pinia";
import FormStep  from './FormStep.vue';
import FormWizard  from './FormWizard.vue';

const appStore = useAppStore()
const store = usePageStore();
const { inquiryStep } = storeToRefs(store);
inquiryStep.value = 0
const inquiryStatus = ref(false)

const props = defineProps({
  modal: false
})
const { modal } = toRefs(props)
const { handleSubmit, setFieldError, setErrors } = useForm();
// break down the validation steps into multiple schemas
const validationSchema = [
  yup.object({
    event: yup
      .string()
      .required()
      .oneOf(['dj', 'party', 'beer'], 'Choose a event'),
    fullName: yup.string().required().label('Full Name'),
    email: yup.string().required().email().label('Email Address'),
    phone: yup.string().required().label('Phone')
  }),
  yup.object({
    dateevent: yup.string().required().label('Date of Event'),
    location: yup.string().required().label('Event Location'),
    venue: yup.string().required().label('Venue')    
  }),
  yup.object({
    guestCount: yup.string().required().label('Estimated Guest Count'),
    eBudget: yup.number().required().positive().integer().label('Estimated Budget'),
  }),
];


async function onSubmit(formData) {
  console.log(formData)
  const res = await fetchWrapper.post('eventenqueries', formData);	
	if(res.message == 'success'){		
    inquiryStatus.value = true
		//resetForm()
		//router.push('/login');
	}else{
		//setErrors( res.data )
		alert('error')
	} 
}
</script>
<template>
    <div class="container" id="Inquiry">          
        <div class="contactSec">
            <div class="row" v-if="modal == true">              
              <div class="col-sm-12">
                <span @click="$emit('closeModal')" class="modelclosebtn">&times;</span>
              </div>
            </div>
          <h2 v-motion-pop-bounce-visible-once>Let’s discuss about your next event</h2>
          <div class="contactSecForm" id="multistepsform" v-show="inquiryStatus === true">
            <img src="@/assets/images/whiteTick.png"/>
            <h3 class="mt-3">Information submitted</h3>
            <p class="mt-1">You will we here from us via call and email.</p>
          </div>
          <div class="contactSecForm" id="multistepsform" v-show="inquiryStatus === false"> 
              <!-- progressbar -->
              <ul id="progressbar" class="progressbar" v-motion-left-in-visible-once>
                <li v-bind:class="{'active': inquiryStep >= 0}">Event and contact info<p>Let us know your event type and contact info</p></li>
                <li v-bind:class="{'active': inquiryStep >= 1}">Event venue<p>Please tell about your preferred venue and managements</p></li>
                <li v-bind:class="{'active': inquiryStep >= 2}">Estimated Budget<p>We are good with all budgets for awesome events</p></li>
              </ul> 
              
              <div class="formField" v-motion-right-in-visible-once>
                <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
                  <FormStep>
                    <fieldset>
                      <Field name="event" as="select" >
                        <option>Select a Event</option>
                        <option value="dj">DJ Night</option>                     
                        <option value="party">Party</option>
                        <option value="beer">Beer</option>
                      </Field>
                      <ErrorMessage name="event" />

                      <Field name="fullName" type="text" placeholder="Full Name" />
                      <ErrorMessage name="fullName" />

                      <Field name="email" type="email" placeholder="Email" />
                      <ErrorMessage name="email" />
                      
                      <Field name="phone" type="text" placeholder="Phone" />
                      <ErrorMessage name="phone" />
                    </fieldset>
                  </FormStep>

                  <FormStep>
                    <fieldset> 
                      <Field name="company" type="text" placeholder="Company" />
                      <ErrorMessage name="company" />

                      <Field name="website" type="text" placeholder="Website" />
                      <ErrorMessage name="website" />
                      
                      <Field name="dateevent" type="text" placeholder="Date of Event" />
                      <ErrorMessage name="dateevent" />

                      <Field name="location" type="text" placeholder="Location (City, State)" />
                      <ErrorMessage name="location" />

                      <Field name="venue" type="text" placeholder="Venue" />
                      <ErrorMessage name="venue" />                      
                    </fieldset>
                  </FormStep>

                  <FormStep>
                    <fieldset> 
                      <Field name="guestCount" type="text" placeholder="Estimated Guest Count" />
                      <ErrorMessage name="guestCount" />

                      <Field name="eBudget" type="number" placeholder="Estimated Budget $" />
                      <ErrorMessage name="eBudget" />
                      
                      <Field name="knowAbout" as="select" >
                        <option>How did you hear about us?</option>                        
                        <option value="dj">DJ</option>
                        <option value="party">Party</option>
                        <option value="beer">Beer</option>
                      </Field>
                      <ErrorMessage name="knowAbout" />

                      <Field name="otherInfo" type="text" placeholder="Additional Information" />
                      <ErrorMessage name="otherInfo" />
                                           
                    </fieldset>
                  </FormStep>
                </FormWizard>          
              </div>         
          </div>
          <div class="contactSecFormMeta">            
            <span><a :href="'mailto:'+ appStore.appInfo.siteEmail"><i class="fa-regular fa-envelope"></i>&nbsp;{{ appStore.appInfo.siteEmail }}</a></span>
            <span><a :href="'tel:'+ appStore.appInfo.SiteSupportNumber"><i class="fa-regular fa-phone"></i>&nbsp;{{ appStore.appInfo.SiteSupportNumber }}</a></span>
            <span><i class="fa-regular fa-location-dot"></i> &nbsp;P.O Box 9591 Elizabeth, New Jersey-07202</span>
          </div>
        </div>
    </div>
</template>
<style scoped lang="css">
fieldset{position: absolute;}
</style>