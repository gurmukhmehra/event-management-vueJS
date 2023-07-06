<script setup>
import { ref }from 'vue'
import {Form, Field } from 'vee-validate';
import { fetchWrapper } from '@/helpers';
import { router }  from '@/router'
import { useToast } from 'vue-toastification'
import * as Yup from 'yup';

document.querySelector('body').style.backgroundColor = '#000'

const toast = useToast()
const step = ref('forgot')

const forgotSchema = Yup.object().shape({
    email: Yup.string().required('Email is required or valid').email('Enter valid email')
});

const resetSchema = Yup.object().shape({
	otp: Yup.number().required('OTP is required'), 
	password: Yup.string().required('Password is required'),   
	confirm_password: Yup.string().required('Confirm password is required').oneOf([Yup.ref("password")], "Password do not match"),
});

async function onForgot(values, { setErrors , resetForm}) {
	const res = await fetchWrapper.post('forgot-password', values);		
	if(res.message == 'success'){
		step.value = 'reset'		
		resetForm()	
		toast.info("We've sent a recover password process to your email - "+values.email);  	
	}else{	
		toast.error('Reset password failed');  
	}
}

async function onReset(values, { setErrors , resetForm}) {
	const res = await fetchWrapper.post('reset-password', values);		
	if(res.message == 'success'){		
		resetForm()	
		toast.info("Password set successfully");  	
		router.push('/login');
	}else{		
		setErrors( res.data )
	}
}
</script>
<template>
	<main>
		<section class="accountPage">
			<div class="row">
			<div class="col-md-5 col-lg-5">
				<div class="accountForm">
					<div class="accountFormHd">
						<div class="row">
							<div class="col-xs-6 col-md-6 col-lg-6"><img src="@/assets/images/logo.png"></div>
							<div class="col-xs-6 col-md-6 col-lg-6 text-right"><div class="backNav"><i class="fa-regular fa-arrow-left"></i> &nbsp;<router-link to="/">Back to website</router-link></div></div>
						</div>
					</div>
					<br/><br/><br/>
					<div class="accountFormField" v-if="step=='forgot'">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<h2>Forgot Password?</h2>
								<Form @submit="onForgot" :validation-schema="forgotSchema" v-slot="{ errors, isSubmitting }">
									<div class="formField">
										<label>Email</label>
										<Field name="email" type="email" placeholder="Enter your email" :class="{ 'is-invalid': errors.email }"/>
										<div class="invalid-feedback">{{ errors.email }}</div>
									</div>
									
									<div class="formField">
										<div class="row">
											<div class="col-md-12 col-lg-12">
												<button class="submit action-button" :disabled="isSubmitting">
													<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
													Reset Password
												</button>
											</div>
										</div>
									</div>
								</Form>
							</div>
						</div>
					</div>
					<div class="accountFormField" v-if="step=='reset'">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<h2>Set your Password</h2>
								<Form @submit="onReset" :validation-schema="resetSchema" v-slot="{ errors, isSubmitting }">
									<div class="formField">
										<label>OTP</label>
										<Field name="otp" type="text" placeholder="Enter your otp" :class="{ 'is-invalid': errors.otp }"/>
										<div class="invalid-feedback">{{ errors.otp }}</div>
									</div>
									<div class="formField">
										<label>Password</label>
										<Field name="password" type="password" placeholder="Enter your new password" :class="{ 'is-invalid': errors.password }"/>
										<div class="invalid-feedback">{{ errors.password }}</div>
									</div>
									<div class="formField">
										<label>Confirm Password</label>
										<Field name="confirm_password" type="password" placeholder="Confirm you password" :class="{ 'is-invalid': errors.confirm_password }"/>
										<div class="invalid-feedback">{{ errors.confirm_password }}</div>
									</div>
									
									<div class="formField">
										<div class="row">
											<div class="col-md-12 col-lg-12">
												<button class="submit action-button" :disabled="isSubmitting">
													<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
													Set Password
												</button>
											</div>
										</div>
									</div>									
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-7 col-lg-7">
				<div class="accountBg">
					<img src="@/assets/images/fPassword.png">
				</div>
			</div>
			</div>
		</section>
	</main>
</template>
<style scoped>

@import url(@/assets/css/account-style.css);
.formField{width:unset;position: unset; float: unset;}
#rememberme{width:auto;}
</style>