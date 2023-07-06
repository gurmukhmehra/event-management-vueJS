<script setup>
import { onMounted } from 'vue'
import  {usePackageStore} from '@/stores/package'
import { storeToRefs } from "pinia";

const store = usePackageStore();
const { packages, getPackages } = storeToRefs(store);
onMounted(() => {
    store.getPackages();   
})

</script>

<template>
    <div class="col-md-4 col-lg-4" v-motion-pop-bounce-visible-once v-for="plan in packages" :key="plan.id">
        <div class="priceList">
            <h2>{{ plan.title }} <span>people’s choice</span></h2>
            <h4>${{ plan.price }}</h4>
            <ul class="listStyle">
                <li v-for="feature in plan.features" :key="feature.id">
                    {{ feature.feature_name }}
                </li>
            </ul>
            <router-link class="t-btn" :to="'/buy-package/' + plan.slug">Buy Now</router-link>             
        </div>
    </div>     
</template>
