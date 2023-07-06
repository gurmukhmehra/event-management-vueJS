<script setup>
import { ref }from 'vue'
import {Form, Field} from 'vee-validate'
import * as Yup from 'yup'
import { fetchWrapper } from '@/helpers'
import { useToast } from 'vue-toastification'
const toast = useToast()

const schema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid!')
});

const invalidForm = ref(false)

function onInvalidSubmit({ errors }) {
  if(errors){
    invalidForm.value = true
    setTimeout(() => {
      invalidForm.value = false
    }, 1500)
  }  
}

async function onSubmit(values, { setErrors , resetForm}) { 
	const res = await fetchWrapper.post('subscribe', values);		
	if(res.message == 'success'){		
		resetForm()	
		toast.success("Subscribe Succussfully!");  	
	}else{		
		toast.error("Subscribe unsuccessfull!"); 
	}
}
</script>
<template>
    <Form @submit="onSubmit" :validation-schema="schema"  v-slot="{ errors, isSubmitting, isValidating }" :class="{ shake: invalidForm }" @invalid-submit="onInvalidSubmit">
        <Field name="fname" type="text" placeholder="First Name"  :class="{ 'is-invalid': errors.fname }"/>	
        <Field name="lname" type="text" placeholder="Last Name"  :class="{ 'is-invalid': errors.lname }"/>
        <Field name="email" type="email" placeholder="Email"  :class="{ 'is-invalid': errors.email }"/>
        <button class="submit action-button" :disabled="isSubmitting" :class="{ 'submitting': isSubmitting }">
            Send Message
        </button>
    </Form>  
</template>