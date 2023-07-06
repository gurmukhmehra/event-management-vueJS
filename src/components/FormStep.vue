<script setup>
import { computed, inject } from 'vue';
import 'animate.css';
// This is a ref injected from FormWizard
// clones the step index to get the step's index and advances it by 1 for the next step
// meaning each step gets a index id starting from 1
const currentIdx = inject('STEP_COUNTER').value++;
// Grabs the live ref to the current form active step
const formStepIdx = inject('CURRENT_STEP_INDEX');

// If this step should be shown
const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});
</script>
<template>
 <Transition mode="out-in" name="slide-up">
    <div v-if="shouldShow">
        <slot />
    </div>
</Transition> 
</template>
<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

  