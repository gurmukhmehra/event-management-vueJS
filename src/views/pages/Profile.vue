<script setup>
import { onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from "pinia";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { fetchWrapper } from '@/helpers';
const toast = useToast()
const store = useAuthStore();
const { user, avatar, profileForm } = storeToRefs(store);

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required')  
});
onMounted(() => {
    store.getUser()
})

async function onSubmit(values, event, { setErrors , resetForm}) { 	
	let formData = new FormData()
    formData.append('email', values.email)
	formData.append("phone", values.phone)
	formData.append("password", values.password)
	formData.append("avatar", event.target.files[0])

	const res = await fetchWrapper.post('profile-update', formData, true);	
	if(res.message == 'success'){		
		toast.success("Profile update successfully.");  	
	}else{		
		setErrors( res.data )
		toast.error('Profile update Failed!');  
	}
}

function removeAvatar(){
	avatar.value = user.value.profilePic	
}

function previewAvatar(event) {
    const input = event.target
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatar.value = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

</script>
<template>
  <main>
    <div class="container pckcustom-container">
		<section class="pgTitle animatable bounceIn" style="padding-bottom: 30px;">hi, {{user.name}}
			<span>Profile ID: {{user.id}}</span>
		</section>
		<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" :initial-values="profileForm" enctype="multipart/form-data">
			<section class="updatePicture">
				<div class="row">
					<label  for="photo-upload-button">
						<div class="col-md-12 col-lg-12">
							<Field name="avatar" type="file" id="photo-upload-button"
								@change="previewAvatar"
								accept="image/*"
								style="display:none" />
							<span class="pPic"><img :src="avatar" width="200"></span>
						</div>
						<div class="col-md-12 col-lg-12">
							<span class="pPic" style="border-radius: 0;"><i class="fa-solid fa-camera"></i>&nbsp; Update picture</span>
						</div>
					</label>
					<div class="col-md-12 col-lg-12">
						<span class="pPic" style="border-radius: 0;"><span style="color: #FF5656;" @click="removeAvatar">Remove</span></span>
					</div>
				</div>
			</section>
			<section class="profileForm">
				<div class="row">
					<div class="col-md-12 col-lg-12">
						<div class="form-field">
							<label>Email</label>
							<Field name="email" type="email"/>									
							<ErrorMessage name="email" />
						</div>
						<div class="form-field">
							<label>Phone</label>
							<Field name="phone" type="text"  />									
							<ErrorMessage name="phone" />
						</div>
						<div class="form-field">
							<label>Change Password</label>
							<Field name="password" type="text"  />									
							<ErrorMessage name="password" />
						</div>
						<div class="form-field text-center" style="margin: 20px 0;">
							<button  type="submit" class="submit action-button" :disabled="isSubmitting">
								<span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
								Update Now
							</button> 
						</div>
					</div>
				</div>
			</section>
		</Form>		
	</div>
  </main>
</template>

