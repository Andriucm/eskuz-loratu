import { createApp } from "vue";
import "./assets/css/normalize.css";
import "./assets/css/index.css";
import "./assets/css/global.css";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import './registerServiceWorker'

import Lightbox from "@/components/Lightbox.vue";


//Firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "@/config/firebase.js"; 

import i18n from "./i18n"; 


const app = createApp(App);

app.use(VueFire, {
    firebaseApp,
	modules: [VueFireAuth],
});

app.use(createPinia());

app.use(router);
app.use(i18n);

app.component("Lightbox", Lightbox);

app.mount("#app");
