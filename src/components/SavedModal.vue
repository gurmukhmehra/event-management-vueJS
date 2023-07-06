<script setup>
import { usePageStore } from '@/stores/page';
import { storeToRefs } from "pinia";
const store = usePageStore();
const { headerVideosList } = storeToRefs(store);
store.sliderVideos();
</script>
<template>    
    <div class="modal-overlay" >        
      <div class="close" @click="$emit('close-modal')">
        <i class="fa fa-close close text-danger" style="position: relative;left: 50%;font-size: 25px;"></i>
            <span v-for="(video, index) in headerVideosList" :index="index" :key="video.id">
              <iframe width="100%" height="80%" :src="'https://www.youtube.com/embed/'+video.youtube_video_id+''" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </span>                 
        </div>
    </div>    
</template>  

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 999;
}

.modal {
  text-align: center;
  background-color: white;
  height: 80%;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
    text-align: center;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 3%;
  width: 80%;
}

</style>

  