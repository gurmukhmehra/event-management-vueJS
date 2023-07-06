<script setup>
import { watch, ref} from 'vue'
import {useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth.store';
import { useTicketStore } from '@/stores/ticket'
import { storeToRefs } from "pinia";
import AboutBanner from '@/assets/images/about-banner.jpg'
import EventBanner from '@/assets/images/events.jpg'
import PortfoilioBanner from '@/assets/images/portfolio.jpg'
import ContactBanner from '@/assets/images/contact.jpg'
import ServiceBanner from '@/assets/images/about-banner.jpg'

import HeaderVideosComponent  from '@/components/HeaderVideosComponent.vue';
import SavedModal  from '@/components/SavedModal.vue';

const appStore = useAppStore()

const store = useTicketStore()
const { cartCount } = storeToRefs(store);

const route = useRoute()

const authStore = useAuthStore();
const { authUser, logout } = authStore;
const headerClass = ref('inner-header');
const props = defineProps({
  showModal: false
})

// You can watch the property for triggering some other action on change
watch(() => route.path, () => {
  if(route.path == '/'){
    headerClass.value = 'header';
  }else{
    headerClass.value = 'inner-header';
  }
// Optionally you can set immediate: true config for the watcher to run on init

}, { immediate: true });

</script>
<template>
  <!-- {{ appStore.appInfo }} -->
  <header id="header" :class="headerClass">
    <div class="top-head">
          <div class="container">
          <div class="row headerTop">
            <div class="col-md-2 col-lg-2">
              <div class="site-branding"> 
                  <router-link to="/"><img :src="appStore.appInfo.siteLogo"></router-link>
              </div>
            </div>
            <div class="col-md-7 col-lg-7 navTop">
                <nav class="navbar navbar-expand-lg">
                  <div class="">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div class="navbar-nav">                    
                        <router-link class="nav-link" to="/">Home</router-link>
                        <router-link class="nav-link" to="/about">About Us</router-link>
                        <router-link class="nav-link" to="/service">Services</router-link>
                        <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
                        <router-link class="nav-link" to="/event">Event</router-link>
                        <router-link class="nav-link" to="/contact">Contact</router-link>                   
                      </div>
                    </div>
                  </div>
                </nav>
            </div>
            <div class="col-md-3 col-lg-3">           
              <div class="top-btn">
                <div class="dropdown-center" v-if="authUser">
                  <a class="nav-link dropdown-toggle dropdown-toggle-split" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="@/assets/images/user.png" width="50">
                  </a>
                  <ul class="dropdown-menu">
                    <li><router-link class="dropdown-item" to="/profile">Profile</router-link></li>
                    <li><router-link class="dropdown-item" to="/saved-events">Saved Events</router-link></li>
                    <li><router-link class="dropdown-item" to="/subscription">Subscription</router-link></li>
                    <li><router-link class="dropdown-item" to="/booked-events">Booked Events</router-link></li>
                    <li><router-link class="dropdown-item" @click="logout" to="/login">Logout</router-link></li>
                  </ul>
                </div>
                <router-link class="t-btn" to="/login" v-if="!authUser">Login</router-link>  
                <a class="t-btn" href="#Inquiry" @click="$emit('openModal')">Book Now</a> 
                <router-link to="/checkout" v-if="cartCount > 0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" fill="currentColor"  class="bi bi-cart" style="color: #6dc282;" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span class="badge cart" >{{ cartCount }}</span></router-link>   
              </div>
            </div>
          </div>
        </div>
    </div>

    <div class="top-banner" v-if="route.path == '/'">
      <div class="container">
      <div class="row">
        <div class="col-md-9 col-lg-9">
          <div class="banner-txt" >
            <h4 v-motion-left-in>Make your event</h4>            
              <img src="@/assets/images/stand-out.png" v-motion-pop-bounce>
              <h5 v-motion-left-in @click="showModal = true" style="cursor: pointer;"><img src="@/assets/images/play.png" > &nbsp; &nbsp;Recent Event Shoot</h5>
           </div>
        </div>
        <SavedModal v-show="showModal" @close-modal="showModal = false" />
      </div>
      
      <!-- <HeaderVideosComponent></HeaderVideosComponent> -->
      </div>
    </div>

    <div class="inner-top-banner" v-if="route.path == '/about'" :style="{ backgroundImage: `url(${AboutBanner})` }"  >
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="pageTitle">
              <h1 v-motion-pop-bounce>About Us</h1>
              <div class="breadCrum" v-motion-pop-bounce><a href="#">Home</a> / About us</div>
            </div>
          </div>
        </div>
      </div>
	  </div>

    <div class="inner-top-banner" v-if="route.path == '/service'" :style="{ backgroundImage: `url(${ServiceBanner})` }">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="pageTitle">
              <h1 v-motion-pop-bounce>Services</h1>
              <div class="breadCrum" v-motion-pop-bounce><a href="#">Home</a> / Services</div>
            </div>
          </div>
        </div>
		  </div>
	  </div>

    <div class="inner-top-banner" v-if="route.path == '/portfolio'" :style="{ backgroundImage: `url(${PortfoilioBanner})` }">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="pageTitle">
              <h1 v-motion-pop-bounce>Portfolio</h1>
              <div class="breadCrum" v-motion-pop-bounce><a href="#">Home</a> / Portfolio</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inner-top-banner" v-if="route.path == '/event'" :style="{ backgroundImage: `url(${EventBanner})` }">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="pageTitle">
              <h1 v-motion-pop-bounce>Events</h1>
              <div class="breadCrum" v-motion-pop-bounce><a href="#">Home</a> / <a href="#">Events</a> / Upcoming Events</div>
            </div>
          </div>
        </div>
      </div>
	  </div>

    <div class="inner-top-banner" v-if="route.path == '/contact'" :style="{ backgroundImage: `url(${ContactBanner})` }">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="pageTitle">
              <h1 v-motion-pop-bounce>Contact</h1>
              <div class="breadCrum" v-motion-pop-bounce><a href="#">Home</a> / Contact</div>
            </div>
          </div>
        </div>
      </div>
    </div>   
  </header>
</template>
<style>
.cart{
  font-size: 16px;
  background: #eef3f3;
  color: #000000;
  padding: 2px 5px;
  vertical-align: top;
  margin-left: -10px;
  font-weight: 600;
  border-radius: 50%;
  position: absolute;
}  
</style>
