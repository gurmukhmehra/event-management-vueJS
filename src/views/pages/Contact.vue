<script setup>
import { ref }from 'vue'
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import { fetchWrapper } from '@/helpers';
import { useToast } from 'vue-toastification'
const toast = useToast()

const invalidForm = ref(false)

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    firstName: Yup.string().required('First Name is required'),
	lastName: Yup.string().required('Last Name is required'),
	phone: Yup.string().required('Phone is required'),
	companyJob : Yup.string().required('Company job Title is required'),
	message: Yup.string().required('Message is required')
});

function onInvalidSubmit({ errors }) {
  if(errors){
    invalidForm.value = true
    setTimeout(() => {		
      invalidForm.value = false
    }, 1500)
  }  
}

async function onSubmit(values, { setErrors , resetForm}) { 
	const res = await fetchWrapper.post('contact-us', values);		
	if(res.message == 'success'){		
		resetForm()	
		toast.success("Your query submit successfully.");  	
	}else{		
		toast.error("Error in send query!"); 
	}
}
</script>
<template>
<main>
	<div class="container">
		<section class="contactForm">
			<div class="row">
				<div class="col-md-8 col-lg-8" v-motion-left-in>
					<div class="cForm">
						<h2>We look forward to being in touch!</h2>
						<img src="@/assets/images/line-crv.png">
						<p>Thank you so much for reaching out to us - we are excited to connect with you! Tell us about you. If you do not receive response within 24 hours, please contact us directly email or phone.</p>
					</div>
				</div>
				<div class="col-md-4 col-lg-4" v-motion-right-in>
					<Form class="cForm" @submit="onSubmit" :validation-schema="schema"  v-slot="{ errors, isSubmitting }" @invalid-submit="onInvalidSubmit">
						<fieldset>							
							<!-- <Field name="name" type="text" class="form-control" placeholder="Full Name" :class="{ 'is-invalid': errors.name }" />
                    		<div class="invalid-feedback">{{ errors.name }}</div> -->
							<Field name="firstName" type="text" class="form-control" placeholder="First Name" :class="{ 'is-invalid': errors.firstName }" />
                    		<div class="invalid-feedback">{{ errors.firstName }}</div>

							<Field name="lastName" type="text" class="form-control" placeholder="Last Name" :class="{ 'is-invalid': errors.lastName }" />
                    		<div class="invalid-feedback">{{ errors.lastName }}</div>

							<Field name="email" type="email" class="form-control" placeholder="Email" :class="{ 'is-invalid': errors.email }" />
                    		<div class="invalid-feedback">{{ errors.email }}</div>

							<Field name="phone" type="text" class="form-control" placeholder="Phone" :class="{ 'is-invalid': errors.phone }" />
                    		<div class="invalid-feedback">{{ errors.phone }}</div>

							<Field name="companyJob" type="text" class="form-control" placeholder="Company job Title" :class="{ 'is-invalid': errors.companyJob }" />
                    		<div class="invalid-feedback">{{ errors.companyJob }}</div>

							<Field as="textarea" name="message" class="form-control" cols="30" rows="10" :class="{ 'is-invalid': errors.message }" />
							<div class="invalid-feedback">{{ errors.message }}</div>
							<button class="submit action-button" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting, shake: invalidForm }">
								Send Message
							</button>						
						</fieldset>
					</Form>
				</div>
			</div>
		</section>
	</div>
  </main>
</template>
