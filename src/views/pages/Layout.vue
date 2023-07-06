<script setup>
import { watch, ref } from 'vue'
import {useRoute } from 'vue-router'
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import Modal from '@/components/ModalComponent.vue';

const route = useRoute()

document.querySelector('body').style.backgroundColor = '#ffffff'
const show = ref(null)

// You can watch the property for triggering some other action on change
watch(() => route.path, () => {
// Optionally you can set immediate: true config for the watcher to run on init
}, { immediate: true });

function openModal() {
    if(route.path == '/contact'){
        show.value.openModal()
    }    
}
</script>
<template>
    <Header @open-modal="openModal"/>
        <router-view /> 
        <section>
			<Modal ref="show"/>
		</section>       
    <Footer/>
</template>
