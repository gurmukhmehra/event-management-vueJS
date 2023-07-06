import { ref } from 'vue'
import { fetchWrapper } from '@/helpers';
import { defineStore } from 'pinia'

export const useTestimonialStore = defineStore('testimonial', () => { 
  const testimonials = ref([]) 
  const testimonialSlides = ref(1) 

  const getTestimonial = async () => {
    const response = await fetchWrapper.get('testimonials');  
    testimonials.value = response.data
  }
  return { testimonials, getTestimonial, testimonialSlides}
})