<script setup>
import EventComponent from '@/components/EventComponent.vue';
import TestimonialCarousel from '@/components/TestimonialCarousel.vue';
import InstaFeed from '@/components/InstaFeedComponent.vue';
import InquiryForm from '@/components/InquiryFormComponent.vue';
import Packages from '@/components/PackagesComponent.vue';
import Subscribe from '@/components/SubscribeComponent.vue';

import { useTestimonialStore } from '@/stores/testimonial.store'
import { storeToRefs } from "pinia";

const usersStore = useTestimonialStore();
const { testimonialSlides } = storeToRefs(usersStore);
testimonialSlides.value = 1
</script>

<template>
  <main>
	<section class="sectionfrst spaceSec" style="padding-bottom: 0;">
      <div class="container">
        <div class="sectionfrstTop">
          <h2 class="secTitle" v-motion-pop-bounce>Upcoming Events Near You</h2>
        </div>
        
          <div class="sectionFilterGallery" v-motion-pop-bounce-visible-once>
            <div id="exTab1" class="container tabSec">	
              <ul  class="nav nav-pills">
                <li class="active">
                  <a  href="#music" data-toggle="tab"><img src="@/assets/images/music.png"> &nbsp; Music Events</a>
                </li>
                <li><a href="#conference" data-toggle="tab"><img src="@/assets/images/events.png"> &nbsp; Conference Events</a>
                </li>
                <li><a href="#djParty" data-toggle="tab"><img src="@/assets/images/photo-icon.png"> &nbsp; DJ Party</a>
                </li>
              </ul>

              <div class="tab-content clearfix">
                <div class="tab-pane active" id="music">
                  <div class="post-grid-container">     
                    <div class="row post-box-cnt post-event-box">
                        <EventComponent/> 
                    </div>
                  </div>
                </div>   
              </div> 
            </div>
          </div>
       </div>     
    </section>

	<section class="sectionTestimonial spaceSec" style="padding-top: 0;">
	<div class="container" v-motion-pop-bounce-visible-once>
		<div class="sectionfrstTop">
				<h2 class="secTitle">Our Packages</h2>
				<p style="color: #000; font-weight: 500;line-height: 30px;">From the large and lavish social gatherings to intimate parties, leave the planning,<br> details and stress to us! Even the smallest of gathers requires planning. </p>
		</div>
		
		<div class="sectionPriceList">
			<div class="row">			
				<Packages/>
			</div>
		</div>
	</div>
	</section> 

	<section class="sectionfrst spaceSec" style="padding-bottom: 0;padding-top: 0;">
		<div class="container">
			<div class="enqueryForm" v-motion-pop-bounce-visible-once>
				<p>Be the first to know about upcoming events, special<br> ticket promotions, new products, and much More!!</p>
				<div class="enqryForm">
					<Subscribe/>
				</div>
			</div>
		</div>
	</section>

	<section class="sectionContact spaceSec" style="padding-top: 100;">
      <InquiryForm/>
    </section>

	<section class="sectionfrst spaceSec">
		<InstaFeed/>
	</section>

	<section class="sectionTestimonial spaceSec" style="padding-top: 30px;">
		<div class="container">
			<div class="row post-box-tst">
				<TestimonialCarousel>
					<template #testimonialWithFeature="slotProps">
						<div class="post-grid carousel__item">
							<div class="post-content" v-motion-slide-right>
								<div class="postTitle">
									<img src="@/assets/images/quote.png" style="width: auto;">
									<!-- <h3>Clients Testimonials</h3> -->
									<h3>Party Experiences</h3>
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
							
							<div class="featureImg" v-motion-slide-right>
								<a href="#"><img :src="slotProps.feature_image" alt="feature image"></a>								
							</div>
						</div>
					</template>	 
				</TestimonialCarousel>   
			</div>
		</div>
	</section>

	<!-- <section class="sectionTestimonial spaceSec" style="padding-top: 0;">
	<div class="container" v-motion-pop-bounce-visible-once>
		<div class="sectionfrstTop">
				<h2 class="secTitle">Our Packages</h2>
				<p style="color: #000; font-weight: 500;line-height: 30px;">From the large and lavish social gatherings to intimate parties, leave the planning,<br> details and stress to us! Even the smallest of gathers requires planning. </p>
		</div>
		
		<div class="sectionPriceList">
			<div class="row">			
				<Packages/>
			</div>
		</div>
	</div>
	</section>      -->

    <!-- <section class="sectionContact spaceSec" style="padding-top: 0;">
      <InquiryForm/>
    </section> -->
  </main>
</template>
