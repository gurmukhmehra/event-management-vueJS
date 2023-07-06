<script setup>
import { onMounted } from 'vue'
import  {useTestimonialStore} from '@/stores/testimonial.store'
import { storeToRefs } from "pinia";
import { Carousel, Navigation, Slide } from 'vue3-carousel'

const usersStore = useTestimonialStore();
const { testimonials, testimonialSlides } = storeToRefs(usersStore);
onMounted(() => {
    usersStore.getTestimonial();   
})

const breakpoints = {
  // 700px and up
  700: {
    itemsToShow: testimonialSlides,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: testimonialSlides,
    snapAlign: 'start',
  },
}
</script>

<template>
    <Carousel :breakpoints="breakpoints" >
        <template #slides>
            <Slide v-for="slide in testimonials" :key="slide.id">
                <slot name="testimonialWithFeature" 
                    :client_name="slide.client_name" 
                    :client_image="slide.client_image" 
                    :feature_image="slide.feature_image"
                    :testimonials="slide.testimonials"
                    >
                </slot> 
                
                <slot name="testimonial" 
                    :client_name="slide.client_name" 
                    :client_image="slide.client_image"
                    :testimonials="slide.testimonials"
                    >
                </slot> 
            </Slide>
        </template>
        <template #addons>
            <div class="carousel__nav">
                <Navigation/> 
            </div>
        </template>
    </Carousel> 
     
</template>

<style>
@import 'vue3-carousel/dist/carousel.css';
.sectionTestimonial .post-content{
    text-align: start;
}

.carousel__nav{
    top: 93%;
    position: absolute;
    width: 6%;
    left: 42%;
    display: flex;
    justify-content: space-between;    
}

.carousel__prev{    
    background-image: url(@/assets/images/left-arrow.png);
    left: 0;
}

.carousel__next {
    background-image: url(@/assets/images/right-arrow.png);
    right: -36px;
    
}
.carousel__icon{
    display: none;
}
.carousel__next,.carousel__prev{
    width: 35px;
    height: 30px;
    margin: 0 10px;
    position: absolute;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    
}
</style>