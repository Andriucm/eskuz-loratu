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
import { firebaseApp } from "@/config/firebase";


const app = createApp(App);

app.use(VueFire, {
    firebaseApp,
	modules: [VueFireAuth],
});

app.use(createPinia());

app.use(router);

app.component("Lightbox", Lightbox);

app.mount("#app");
