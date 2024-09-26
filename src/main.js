import { createApp } from "vue";
import "./assets/css/normalize.css";
import "./assets/css/global.css";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import './registerServiceWorker'

//Firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "@/config/firebase";

//Carousel
import { register } from 'swiper/element/bundle';

const app = createApp(App);

app.use(VueFire, {
    firebaseApp,
	modules: [VueFireAuth],
});

app.use(createPinia());

app.use(router);
register();

app.mount("#app");
