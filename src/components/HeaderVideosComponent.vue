<script setup>
import { ref } from 'vue';
import { usePageStore } from '@/stores/page';
import { storeToRefs } from "pinia";
const store = usePageStore();
const { headerVideosList } = storeToRefs(store);
store.sliderVideos();
</script>

<template>    
    <div v-for="(video, index) in headerVideosList" :index="index" :key="video.id">
        <img :src="video.featureImage"/>
        <!-- <img src="@/assets/images/play.png" :class="'slider_video_icon'"> -->
        <!-- <iframe width="255" height="180" :src="'https://www.youtube.com/embed/'+video.youtube_video_id+''" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
    </div>   
</template>

<style scoped lang="css">
    .slider_video_icon {
        position: absolute;right: 40%;top: 12%;
    }
</style>
