<script setup>
import { useAppStore } from '@/stores/app';
const appStore = useAppStore()
</script>

<template>
    <footer>
        <div class="container">
            <div class="ft-social">
                <a :href="appStore.appInfo.InstagramLink" target="blank"><i class="fa-brands fa-square-instagram"></i></a>
                <a :href="appStore.appInfo.FacebookLink" target="blank"><i class="fa-brands fa-facebook"></i></a>
                <a :href="appStore.appInfo.TwitterLink" target="blank"><i class="fa-brands fa-twitter"></i></a>
                <a :href="appStore.appInfo.TwitterLink" target="blank"><i class="fa-brands fa-google-plus-g"></i></a>
            </div>
            <p>© {{ appStore.appInfo.SiteCopyRight }} <a :href="'mailto:'+ appStore.appInfo.siteEmail ">{{ appStore.appInfo.siteName }}</a>. All rights reserved.</p>
        </div>
    </footer>
</template>