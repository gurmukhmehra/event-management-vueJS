<script setup>
  import { useForm } from 'vee-validate';
  import { ref, computed, provide } from 'vue';
  import { usePageStore } from '@/stores/page'
  import { storeToRefs } from "pinia";

  
  const store = usePageStore();
  const { inquiryStep } = storeToRefs(store);
  
  const props = defineProps({
    validationSchema: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['submit']);
  
  // Injects the starting step, child <form-steps> will use this to generate their ids
  const stepCounter = ref(0);
  provide('STEP_COUNTER', stepCounter);
  
  // Inject the live ref of the current index to child components
  // will be used to toggle each form-step visibility
  provide('CURRENT_STEP_INDEX', inquiryStep);
  
  // if this is the last step
  const isLastStep = computed(() => {
    return inquiryStep.value === stepCounter.value - 1;
  });
  
  // If the `previous` button should appear
  const hasPrevious = computed(() => {
    return inquiryStep.value > 0;
  });
  
  // extracts the indivdual step schema
  const currentSchema = computed(() => {
    return props.validationSchema[inquiryStep.value];
  });
  
  const { values, handleSubmit } = useForm({
    // vee-validate will be aware of computed schema changes
    validationSchema: currentSchema,
    // turn this on so each step values won't get removed when you move back or to the next step
    keepValuesOnUnmount: true,
  });
  
  // We are using the "submit" handler to progress to next steps
  // and to submit the form if its the last step
  const onSubmit = handleSubmit((values) => {
    if (!isLastStep.value) {
      inquiryStep.value++;  
      return;
    }  
    // Let the parent know the form was filled across all steps
    emit('submit', values);
  });
  
  function goToPrev() {
    if (inquiryStep.value === 0) {
      return;
    }  
    inquiryStep.value--;
  }
</script>
<template>
    <form @submit="onSubmit">
      <slot :step="inquiryStep"/>  
      <div>
        <button v-if="hasPrevious" type="button" class="previous action-button" @click="goToPrev">
          Previous
        </button>        
        <button type="submit" class="next action-button">{{ isLastStep ? 'Submit' : 'Continue' }}</button>
      </div>  
      <!-- <pre>{{ values }}</pre> -->
    </form>
</template>
  
  
  