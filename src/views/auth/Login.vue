<script setup>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '../../stores/auth.store'

document.querySelector('body').style.backgroundColor = '#000'

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
	const authStore = useAuthStore();
    const { email, password } = values;
    await authStore.login(email, password);
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
							<div class="col-xs-6 col-md-6 col-lg-6 text-right"><div class="backNav"><i class="fa-regular fa-arrow-left"></i> &nbsp; <router-link to="/">Back to website</router-link></div></div>
						</div>
					</div>
					
					<div class="accountFormField">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<h2>Welcome Back</h2>
								<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
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
												<div class="col-xs-6 col-md-6 col-lg-6">
													<p class="forgetmenot">
														<input name="rememberme" type="checkbox" id="rememberme" value="forever"> 
														<label for="rememberme">Remember Me</label>
													</p>
												</div>
												<div class="col-xs-6 col-md-6 col-lg-6">
													<p class="forgetmenot text-right"> 
														<label for="rememberme"><router-link to="/forgot-password">Forgot Password?</router-link></label>
													</p>
												</div>
											</div>
									</div>
									<div class="formField">
										<div class="row">
											<div class="col-md-12 col-lg-12">
												<button class="submit action-button" :disabled="isSubmitting">
													<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
													Login
												</button>
											</div>
										</div>
									</div>
									<div class="formField formFieldCW">
										<div class="row">
											<div class="col-md-12 col-lg-12">
												Or continue with
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
													Dont have and account? <router-link to="/signup">Signup</router-link>
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
					<img src="@/assets/images/login.png">
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