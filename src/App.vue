<script setup>
import { provide } from 'vue';
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from '@/components/Footer.vue';

import { usePWA } from '@/composables/usePWA';
import { usePlatform } from '@/composables/usePlatform';

const { isInstallable, installPWA } = usePWA();
const { isIOS } = usePlatform();

provide('isInstallable', isInstallable);
provide('installPWA', installPWA);
provide('isIOS', isIOS);
</script>

<template>
    <Header />
    <RouterView />
    <Footer />
</template>
