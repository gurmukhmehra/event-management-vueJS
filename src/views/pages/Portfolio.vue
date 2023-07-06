<script setup>
import EventGallery from '@/components/EventGallery.vue';
import InstaFeed from '@/components/InstaFeedComponent.vue';
import InquiryForm from '@/components/InquiryFormComponent.vue';
import { usePageStore } from '@/stores/page'
const store = usePageStore();
store.getPortfolio()
</script>

<template>
  <main>
    <section class="sectionfrst spaceSec">
      <EventGallery/>
    </section>

    <section class="sectionfrst spaceSec" style="padding-top: 0;">
      <InstaFeed/>
    </section>
    
    <section class="sectionContact spaceSec" style="padding-top: 0;">
      <InquiryForm/>
    </section>
  </main>
</template>
