<script setup>
import { ref } from 'vue';
import VueGallery from 'vue-gallery'
import MasonryWall from '@yeger/vue-masonry-wall'
import { usePageStore } from '@/stores/page'
import { storeToRefs } from "pinia";
const store = usePageStore();
const { portfolioTab, videoGallery, imageGallery } = storeToRefs(store);
const { changePortfolioTab } = store
const galleryIndex = ref('')

portfolioTab.value = 'image'
const galleryOptions = {
  carousel: true,
}

</script>

<template>
  <div class="container">
    <div class="sectionfrstTop">
      <h2 class="secTitle" v-motion-pop-bounce>Creating Memorable Events</h2>
      <p style="color: #000; font-weight: 500;" v-motion-pop-bounce>Having a celebration is supposed to be fun, so leave your stress at home and let us do the work for you!</p>
    </div>
    <div class="sectionFilterGallery">
      <div id="exTab1" class="container tabSec" v-motion-pop-bounce-visible-once>	
        <ul  class="nav nav-pills">
          <li :class="{ 'active' : portfolioTab === 'video'}"><router-link to="" @click="changePortfolioTab('video')"><span><img src="@/assets/images/play=black.png"></span> Video Gallery</router-link></li>
          <li ref="button1" :class="{ 'active' : portfolioTab === 'image'}"><router-link to="" @click="changePortfolioTab('image')"><span><img src="@/assets/images/photo-icon.png"></span> Photo Gallery</router-link></li>          
      </ul> 
        <div class="tab-content clearfix">
          <div class="tab-pane" v-if="portfolioTab == 'video'">
            <div class="grid-container">
              <!-- <div class="itemGl" v-for="(image, index) in imageGallery" :key="image.id">
                <img :src="image" @click="galleryIndex = index"/>  
              </div> -->
              <div class="itemGl" v-for="(video, index) in videoGallery" :key="video.id">
                  <a href="#lightbox" class="lightbox-toggle" data-lightbox-type="video" :data-lightbox-content="video.featureImage"> 
                    <img :src="video.featureImage" class="w-100">
                  </a>
              </div>
            </div>
            <!-- <VueGallery :options="galleryOptions" :video="videoGallery" :index="galleryIndex" @close="galleryIndex = null"></VueGallery>
            <div class="gallery-container">
              <masonry-wall :items="videoGallery" :column-width="300" :gap="5">
                <template #default="{ item, index }">
                  <div class="itemGl image" @click="galleryIndex = index">
                    <video width="320" height="240" >
                      <source :src="item" >                     
                      Your browser does not support the video tag.
                    </video>                  
                  </div> 
                </template>
              </masonry-wall>
            </div> -->
          </div> 
          <div class="tab-pane active" v-if="portfolioTab == 'image'">            
            <!-- <VueGallery :ssr-columns="3" :options="galleryOptions" :images="imageGallery" :index="galleryIndex" @close="galleryIndex = null"></VueGallery>
            <div class="gallery-container">
              <masonry-wall :items="imageGallery" :column-width="300" :gap="5">
                <template #default="{ item, index }">
                  <img :src="item.featureImage" @click="galleryIndex = index" class="w-100"/> 
                  <h6 class="album_title">{{ item.title }} (Total:{{ item.title.length }})</h6>                 
                 </template>
                
              </masonry-wall>
            </div>       -->
            <div class="grid-container">
              <div class="itemGl" v-for="(album, index) in imageGallery" :index="index" :key="album.id">
                <router-link :to="'/album/' + album.albumSlug" class="lightbox-toggle" data-lightbox-type="image" :style="'cursor: pointer;'"> 
                  <img :src="album.featureImage">
                  <p class="album_title">{{ album.title }} 
                    <span style="padding-bottom: 0px;margin-bottom: 0px;margin-top: 5px;">Total : {{ album.album_images.length }}</span>
                  </p>
                </router-link>
						  </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.tab-content .gallery-container{padding: 2rem 0;}
.album_title {color: #fff;
    font-size: 18px;
    background: rgba(103, 195, 145, 0.8);
    padding: 10px;    
    text-align: center;    
    border-radius: 10px;
  }
</style>