<script setup>
import { ref } from 'vue';
import InquiryForm from '@/components/InquiryFormComponent.vue';
import VueGallery from 'vue-gallery'
import MasonryWall from '@yeger/vue-masonry-wall'
import { useRoute } from 'vue-router';
import { usePageStore } from '@/stores/page'
import { storeToRefs } from "pinia";

const route = useRoute();

const store = usePageStore()
const { albumDetail } = storeToRefs(store);
store.getAlbumDetails(route.params.slug)

const galleryIndex = ref('')

const galleryOptions = {
  carousel: true,
}
</script>

<template>
    <main>   
        <div class="container">             
            <section class="ed-title">
			    <div class="row">
                    <div class="col-sm-6 col-lg-6">
                        <h4>Album : {{ albumDetail.title }}</h4>
                        <span class="postDate">Total Images : {{ albumDetail.album_images.length }}</span>
                    </div>
                    <div class="col-sm-6 col-lg-6">
                        <div class="backNav text-right"><img src="@/assets/images/arrow.png"> &nbsp; <router-link  to="/portfolio">Back to all albums</router-link></div>
                    </div>
			    </div>
		    </section>            
            <section class="sectionfrst spaceSec" style="padding-top: 0;">           
                <VueGallery :ssr-columns="3" :options="galleryOptions" :images="albumDetail.album_images" :index="galleryIndex" @close="galleryIndex = null"></VueGallery>
                <div class="gallery-container">
                    <masonry-wall :items="albumDetail.album_images" :column-width="300" :gap="5">
                        <template #default="{ item, index }">
                            <img :src="item" @click="galleryIndex = index" class="w-100" style="cursor: pointer;" title="click to open"/>                                  
                        </template>            
                    </masonry-wall>
                </div>      
            </section>  
            
        </div>
    </main> 
</template>