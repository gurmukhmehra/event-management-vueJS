<script setup>
import {useAppStore} from '@/stores/app'
import { RouterView } from 'vue-router'
const appStore = useAppStore()
appStore.getAppInfo()
</script>
<template>
    <RouterView />
</template>

