import { createApp } from "vue";
import "./assets/normalize.css";
import "./assets/global.css";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//Firebase
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp, analytics } from "@/config/firebase";

const app = createApp(App);

app.use(VueFire, {
	firebaseApp,
	analytics,
	modules: [VueFireAuth],
});

app.use(createPinia());

app.use(router);

app.mount("#app");
