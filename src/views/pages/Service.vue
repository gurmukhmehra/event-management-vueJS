<script setup>
import { ref } from "vue";
import { useTestimonialStore } from '@/stores/testimonial.store'
import { storeToRefs } from "pinia";

import TestimonialCarousel from '@/components/TestimonialCarousel.vue';
import Services from '@/components/ServiceComponent.vue';
import InquiryForm from '@/components/InquiryFormComponent.vue';

const usersStore = useTestimonialStore();
const { testimonialSlides } = storeToRefs(usersStore);
const tab = ref(1);
testimonialSlides.value = 2

function changeTab(tabNo){
    tab.value = tabNo
}
</script>

<template>  
  <main>
    <div class="container">
        <section class="serviceTab spaceSec">
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <div id="exTab2" class="container tabSec" v-motion-pop-bounce>	
                        <ul  class="nav nav-pills">
                            <li :class="{ 'active' : tab === 1 }"><router-link to="" @click="changeTab(1)"><span><img src="@/assets/images/event.png"></span> <label>Event Management & Promotions</label></router-link></li>
                            <li :class="{ 'active' : tab === 2}"><router-link to="" @click="changeTab(2)"><span><img src="@/assets/images/brand.png"></span> <label>Brand & Product Launch</label></router-link></li>
                            <li :class="{ 'active' : tab === 3}"><router-link to="" @click="changeTab(3)"><span><img src="@/assets/images/marketing.png"></span> <label>Online and Offline Marketing</label></router-link></li>
                        </ul>                        
                    <div class="tab-content clearfix">
                    <div class="" v-show="tab == 1">
                        <p>We help you organize, manage, promote, and make your event success! With over 2 decades of experience in hosting events, our team of professionals will help you:</p>
                        <ul class="listStyle">
                            <li>Plan: We help you with site selection, budget planning, timeline co-ordination, attendee registration, speaker set-up, food, beverages and everything else you’ll need for an amazing event.</li> 
                            <li>Promote: We’ll boost your attendance numbers through a series of promotional videos, street promotions, online ads, and more. From designing and distributing flyers in your local neighborhood to running a big digital campaign, we can do it all. </li>

                            <li>Manage: We ensure everything runs smooth as silk. We take care of your guest’s needs, any last-minute changes, and all other management related details.</li>
                        </ul>
                    </div>
                    <div class="" v-show="tab == 2">
                            <p>We help you organize, manage, promote, and make your event success! With over 2 decades of experience in hosting events, our team of professionals will help you:</p>
                        <ul class="listStyle">
                            <li>Plan: We help you with site selection, budget planning, timeline co-ordination, attendee registration, speaker set-up, food, beverages and everything else you’ll need for an amazing event.</li> 
                            <li>Manage: We ensure everything runs smooth as silk. We take care of your guest’s needs, any last-minute changes, and all other management related details.</li>
                        </ul>
                    </div>
                    
                    <div class="" v-show="tab == 3">
                            <p>We help you organize, manage, promote, and make your event success! With over 2 decades of experience in hosting events, our team of professionals will help you:</p>
                        <ul class="listStyle">
                            <li>Plan: We help you with site selection, budget planning, timeline co-ordination, attendee registration, speaker set-up, food, beverages and everything else you’ll need for an amazing event.</li> 
                            <li>Online ads, and more. From designing and distributing flyers in your local neighborhood to running a big digital campaign, we can do it all. </li>
                            <li>Manage: We ensure everything runs smooth as silk. We take care of your guest’s needs.</li>
                        </ul>
                    </div>
                    </div>
                    
                    </div>
                </div>
            </div>
        </section>

        <section class="socialEvent spaceSec">
            <div class="row">
                <div class="col-md-7 col-lg-7"  v-motion-left-in-visible-once>
                    <h2 class="secTitle">Social Event</h2>
                    <p>From a super sweet 16 party to a 50th anniversary, and celebrations, Money Train Events LLC will handle all the details and logistics so you can enjoy being the host at your own party. From the large and lavish social gatherings to intimate parties, leave the planning, details and stress to us!</p> 

                    <p>Even the smallest of gathers requires planning. We love to create memorable parties with decadent details that blow even seasoned guests away.</p>
                </div>
                <div class="col-md-5 col-lg-5" v-motion-right-in-visible-once><img src="@/assets/images/social-event.jpg" class="secImg"></div>
            </div>
        </section>
        <section class="serviceList spaceSec" v-motion-pop-bounce-visible-once>
            <div class="row">
                <div class="col-md-9 col-lg-9">
                    <h3>We provide a variety of services, including:</h3>
                    <ul class="listStyle">
                                    <li>Scouting a venue</li>
                                    <li>Developing a theme</li>
                                    <li>Coordinating paper goods with a stationery vendor</li>
                                    <li>Organizing a tasting with up to three caterers</li>
                                    <li>Recommending up to three florists (if necessary)</li>
                                    <li>Recommending up to three photographers (if necessary)</li>
                                    <li>Managing your guest list</li>
                                    <li>Assisting with rentals</li>
                                </ul>
                </div>
                <div class="col-md-3 col-lg-3"><img src="@/assets/images/provideService.png" class="secImg"></div>
            </div>
        </section>
        <section class="rangeEvent spaceSec">
            <div class="row">
                <div class="col-md-4 col-lg-4" v-motion-left-in-visible-once>
                    <div class="rangeEventP">
                        <h3>We Offer A<br> Range of Event.</h3>
                        <p>Suspendisse neque viverra donec magnis etiam. Sed sed pellentesque tempor posuere nisi cum neque suspendisse. Erat et comm odo pharetra faucibus ultricies. </p>
                    </div>
                </div>
                <div class="col-md-8 col-lg-8 text-right" v-motion-right-in-visible-once>
                    <img src="@/assets/images/rangeofevent1.jpg" class="secImg">&nbsp;&nbsp;&nbsp;&nbsp;<img src="@/assets/images/rangeofevent2.jpg" class="secImg">
                </div>
            </div>
        </section>  
        <section class="SreventSec spaceSec" style="padding-top: 0;">
            <div class="row">
                <div class="col-md-12 col-lg-12 text-center">
                        <h2 class="secTitle">Makes it Easy to Create Your Event.</h2>
                </div>
            </div>
            <div class="row yrEvent">
                <div class="col-md-6 col-lg-6" v-motion-left-in-visible-once>
                        <img src="@/assets/images/createyourEvent.jpg" class="secImg">
                </div>
                <div class="col-md-6 col-lg-6" v-motion-right-in-visible-once>
                        <div class="eventPl">
                            <h4>1. Consultation</h4>
                            Viverra donec magnis etiam. Sed sed pellente sque tempor posuere nisi cum neque suspe et comm odo pharetra.
                        </div>
                        <div class="eventPl">
                            <h4>2. Planning</h4>
                            Donec magnis etiam. Sed sed pellente sque tempor posuere nisi cum neque suspe ndisse.t et comm odo.
                        </div>
                        <div class="eventPl">
                            <h4>3. Execution</h4>
                            Magnis etiam. Sed sed pellente sque tempor posuere nisi cum neque suspe ndisse. Erat et comm odo pharetra.
                        </div>
                        <a href="#Inquiry" class="viewBtn">Book Now</a>
                </div>
            </div>
        </section>
        <section class="SreventSec spaceSec" style="padding-top: 0;">
            <div class="edckcustom-container" style="margin: 0 auto;">
                <div class="row">
                    <div class="col-md-12 col-lg-12 text-center">
                        <h2 class="secTitle">Lets discuss on call : <i class="fa-light fa-phone" style="font-size: 35px;"></i> (888) 457-1114</h2>
                        <span class="secSubTitle">Feel free to contact us via call</span>
                    </div>
                </div>
            </div>
            <br><br><br>
            <div class="sectionfrstTop" style="margin-bottom: 0;">
                <Services/>
            </div>
        </section>
        <section class="SreventSec spaceSec" style="padding-top: 0;  padding-bottom: 0;">
            <div class="edckcustom-container" style="margin: 0 auto;">
                <div class="row">
                    <div class="col-md-12 col-lg-12 text-center">
                            <h2 class="secTitle">MTEG Timeline</h2>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-12 col-lg-12 text-center" v-motion-pop-bounce-visible-once>
                            <img src="@/assets/images/video.jpg" class="secImg">
                    </div>
                </div>
            </div>
        </section>


        <section class="sectionTestimonial sectionSrTestimonial spaceSec">
            <div class="row">
                <div class="col-md-12 col-lg-12">
                    <h2 class="secTitle">People’s party experience</h2>
                </div>
            </div>
        
            <div class="row post-box-tst">
                <TestimonialCarousel>
                    <template #testimonial="slotProps">
                        <div class="post-grid carousel__item">
                            <div class="post-content">
                                <div class="postTitle">
                                    <img src="@/assets/images/quote.png" style="width: auto;">
                                </div>
                                <p v-html="slotProps.testimonials"></p>
                                <div class="instaHead">
                                    <div class="instaLogo"><img :src="slotProps.client_image" alt="client image"></div>
                                    <div class="instaTitle">
                                        {{slotProps.client_name}}
                                        <img src="@/assets/images/stars.jpg" style="width: auto;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>                   
                </TestimonialCarousel>     
            </div>        	
        </section>
		
		<section class="sectionContact spaceSec" style="padding-top: 0;">
            <InquiryForm/>
        </section>

	</div>
  </main>
</template>
<style scoped>

</style>
