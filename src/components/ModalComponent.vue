<script setup>
import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import InquiryForm  from '@/components/InquiryFormComponent.vue';
const getInitialValues = () => ({
  teleportTo: 'body',
  modelValue: false,
  displayDirective: 'show',
  hideOverlay: false,
  overlayTransition: 'vfm-slide-up',
  contentTransition: 'vfm-slide-up',
  clickToClose: true,
  escToClose: true,
  background: 'interactive',
  lockScroll: true,
  swipeToClose: 'none',
})

const options = ref(getInitialValues())
defineExpose({
  openModal
});
function closeModal() {
  options.value.modelValue = false;
}
function openModal() {
  options.value.modelValue = true;
}
</script>

<template>
  <VueFinalModal
  v-model="options.modelValue"
    :teleport-to="options.teleportTo"
    :display-directive="options.displayDirective"
    :hide-overlay="options.hideOverlay"
    :overlay-transition="options.overlayTransition"
    :content-transition="options.contentTransition"
    :click-to-close="options.clickToClose"
    :esc-to-close="options.escToClose"
    :background="options.background"
    :lock-scroll="options.lockScroll"
    :swipe-to-close="options.swipeToClose"
        class="flex justify-center items-center"
        content-class="relative p-4 rounded-lg dark:bg-gray-900"
     >
    <section class="sectionContact spaceSec" style="padding-top: 0;">
        <InquiryForm @close-modal="closeModal" :modal="true"/>      
    </section> 
  </VueFinalModal>
</template>

<style scoped lang="css">

</style>
