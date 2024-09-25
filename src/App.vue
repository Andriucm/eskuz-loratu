<script setup>
import { provide } from 'vue';
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from '@/components/Footer.vue';
import { usePWA } from '@/composables/usePWA';

const { isInstallable, installPWA } = usePWA();

provide('isInstallable', isInstallable);
provide('installPWA', installPWA);
</script>

<template>
    <Header />
    <RouterView />
    <Footer />
</template>
