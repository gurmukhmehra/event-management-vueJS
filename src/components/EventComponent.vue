<script setup>
import { onMounted } from 'vue'
import  {useEventStore} from '@/stores/event.store'
import { useAuthStore } from '@/stores/auth.store';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const store = useEventStore()
const { events } = storeToRefs (store)
const { getEvents, getWishlist, toggleCart, addToWishlist, buyTicket } = store;
const { authUser } = authStore;
if(authUser){
    getWishlist()
}
onMounted(() => {  
   getEvents()
})
</script>
<template>
    <div class="post-grid" v-for="(event, index) in events" :key="event.id">
        <div class="featureImg bg-200" :style="{ backgroundImage: `url(${event.featureImage})` }" >
            <span class="post_date"><span class="lg-font">12</span><br><span>MAY</span></span>
        </div>
        <div class="post-content">
            <div class="postTitle">
                <h3>{{ event.title }}</h3>
                <h4>{{ event.eventLocation }}</h4>
            </div>
            <p v-html="event.decription.substring(0,100) + '...'"></p>
            <div class="postMeta">
                <span class="postDate">{{event.eventDate}}</span>
                <span class="postDate"><img src="@/assets/images/time.png"> &nbsp;{{event.eventTime}}</span>
                <div v-if="authUser">
                    <span v-if="event.isWishlist === false" class="postDate e-hover" style="color: #5C5C5C; font-size: 16px;"  @click="addToWishlist(event.id, index)"><i class="fa-regular fa-heart"></i>&nbsp;Save</span>
                    <span v-else class="postDate" style="color: #5C5C5C; font-size: 16px;"><i class="fa-duotone fa-heart"></i>&nbsp;Saved</span>
                </div>
            </div>
            <div class="postBtn">
                <span class="postBtnT"> <router-link class="viewBtn" :to="'/event-detail/' + event.slug">Tickets & Details</router-link></span>  
                                            
                <span v-if="event.isCart === true" class="postAdd" style="color: #5C5C5C; font-size: 16px;"><i class="fa-duotone fa-cart-shopping"></i> Added</span>
                
                <span v-else class="postAdd" @mouseenter="toggleCart(index,true)" @mouseleave="toggleCart(index, false)">
                    <span class="cart-hover e-hover" v-show="event.isHover === false"><i class="fa-regular fa-cart-shopping"></i> Add</span>
                    <span class="cart-hover e-hover" v-show="event.isHover === true" @click="buyTicket(event, index)"> Add to cart</span>
                </span>                          
            </div>
        </div>
    </div>  
</template>
<style >
span.cart-hover {  
    font-size: 16px;
}
</style>
