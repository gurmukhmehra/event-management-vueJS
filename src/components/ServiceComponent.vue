<script setup>
import { onMounted, watch } from 'vue'
import {useRoute } from 'vue-router'
import  {useServiceStore} from '@/stores/service.store'
import { storeToRefs } from "pinia";
const route = useRoute()
const store = useServiceStore()
const {services} = storeToRefs (store)
const { getServices } = store;
onMounted(() => {
    getServices()
})
</script>

<template>
    <div class="sectionfrstTop">
        <div class="row">
            
             <div class="col-md-4 col-lg-4" v-for="service in services" :key="service.id">               
                <div class="itemList" v-motion-pop-bounce-visible-once>
                <img :src="service.featureImage" alt="service image">
                <span>{{service.title}}</span>
                </div>
            </div>        
        
            <div class="col-md-4 col-lg-4" v-if="route.path == '/'">
                <div class="itemList itemListVall" v-motion-pop-bounce-visible-once>
                    <router-link to="/service"><span>View All</span></router-link>
                </div>
            </div>
        </div>
    </div>
</template>