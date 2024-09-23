import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomePage,
		},
		{
			path: "/add",
			name: "addJewel",
			component: () => import("../views/AddJewelView.vue"),
			beforeEnter: autenticate,
		},
	],
});

function autenticate(to, from, next) {
	const reqParam = to.query.login;

	reqParam === "odrytes46" ? next() : next({ name: "home" });
}
export default router;
