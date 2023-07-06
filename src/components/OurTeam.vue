<script setup>
import { ref }from 'vue'
import { fetchWrapper } from '@/helpers';
const teams = ref([])
async function ourTeam(){
    const res = await fetchWrapper.get('ourTeam');
	teams.value = res.data	
}
ourTeam();
</script>
<template>
   <div class="col-md-4 col-lg-4" v-for="(team, index) in teams" :key="team.id" v-motion-pop-bounce-visible-once>
        <div class="team-grid">
            <div class="teamImg" :style="{ backgroundImage: `url(${team.image})` }"></div>
            <div class="teamCnt">
                <h3>{{team.name}}</h3>
                <h4>{{team.designation}}</h4>
                <div class="ft-social">
                    <a :href="team.facebook_url" v-show="team.facebook_url !== null" target="blank"><i class="fa-brands fa-facebook"></i></a>
                    <a :href="team.twitter_url" target="blank" v-show="team.twitter_url !== null"><i class="fa-brands fa-twitter"></i></a>
                    <a :href="team.linkedin_url" target="blank" v-show="team.linkedin_url !== null"><i class="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
