<script setup>
import { ref }from 'vue'
import {Form, Field} from 'vee-validate'
import * as Yup from 'yup'
import { fetchWrapper } from '@/helpers'
import { router }  from '@/router'
import { useToast } from 'vue-toastification'
document.querySelector('body').style.backgroundColor = '#000'
const step = ref('signup')
const toast = useToast()
const signup = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Enter valid email'),
    name: Yup.string().required('Name is required'),
	password: Yup.string().required('Password is required').min(8),
});

const otp = Yup.object().shape({
    otp: Yup.number().required('OTP is required') 
});

async function onSubmit(values, { setErrors , resetForm}) { 
	const res = await fetchWrapper.post('signup', values);		
	if(res.message == 'success'){
		step.value = 'otp'
		resetForm()	
		toast.info("We've sent a verification code to your email - "+values.email);  	
	}else{		
		setErrors( res.data )
	}
}

async function onVerify(values, { setErrors , resetForm}) { 
	const res = await fetchWrapper.post('verifycode', values);	
	if(res.message == 'success'){		
		resetForm()
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
								<div class="col-xs-6 col-md-6 col-lg-6 text-right">
									<div class="backNav"><i class="fa-regular fa-arrow-left"></i> &nbsp; 								
									<router-link to="/">Back to website</router-link>
									</div>
								</div>
							</div>
						</div>		
						<div class="accountFormField" v-if="step=='signup'">
							<div class="row">
								<div class="col-md-12 col-lg-12">
									<h2>Create an account</h2>
									<Form @submit="onSubmit" :validation-schema="signup"  v-slot="{ errors, isSubmitting }">
										<div class="formField">
											<label>Full Name</label>
											<Field name="name" type="text" class="form-control" placeholder="Enter your name"  :class="{ 'is-invalid': errors.name }"/>									
											<div class="invalid-feedback">{{ errors.name }}</div>
										</div>
										<div class="formField">
											<label>Email</label>
											<Field name="email" type="email" class="form-control" placeholder="Enter your email" :class="{ 'is-invalid': errors.email }" />
											<div class="invalid-feedback">{{ errors.email }}</div>
										</div>
										<div class="formField">
											<label>Password</label>
											<Field name="password" type="password" class="form-control" placeholder="******" :class="{ 'is-invalid': errors.password }" />
											<div class="invalid-feedback">{{ errors.password }}</div>
										</div>										
										<div class="formField">
											<div class="row">
												<div class="col-md-12 col-lg-12">
													<button class="submit action-button" :disabled="isSubmitting">
														<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
														Create Account
													</button>
												</div>
											</div>
										</div>
										<div class="formField formFieldCW">
											<div class="row">
												<div class="col-md-12 col-lg-12">
													Or register with
												</div>
											</div>
										</div>
										<div class="formField">
											<div class="row">
												<div class="col-md-12 col-lg-12">
													<div class="socialIcons">
														<ul>
															<li><a href="#"><i class="fa-brands fa-facebook-f"></i></a></li>
															<li class="google"><a href="#"><img src="@/assets/images/google.png"></a></li>
															<li class="twitter"><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div class="formField formFieldBottom">
											<div class="row">
												<div class="col-md-12 col-lg-12">
														Already member? <router-link to="/login">Login</router-link>
												</div>
											</div>
										</div>
									</Form>
								</div>
							</div>
						</div>
						<div class="accountFormField" v-if="step=='otp'">
							<div class="row">
								<div class="col-md-12 col-lg-12">
									<h2>Verify Email Address</h2>
									<Form @submit="onVerify" :validation-schema="otp"  v-slot="{ errors, isSubmitting }">
										<div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
										<div class="formField">
											<label>Verification Code</label>
											<Field name="otp" type="text" class="form-control" placeholder="Enter your OTP" :class="{ 'is-invalid': errors.otp }" />
											<div class="invalid-feedback">{{ errors.otp }}</div>
										</div>
										<div class="formField">
											<div class="row">
												<div class="col-md-12 col-lg-12">
													<button class="submit action-button" :disabled="isSubmitting">
														<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
														Verify Email
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
						<img src="@/assets/images/signup.png">
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