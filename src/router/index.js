import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import { useAuth } from "@/services/authFirebase";
import { useAuthStore } from "@/stores/auth";
const { observeAuthState } = useAuth();

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomePage,
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/Login.vue"),
		},
		{
			path: "/add",
			name: "addJewel",
			component: () => import("../views/AddJewelView.vue"),
			meta: {
				requiresAuth: true,
			},
		},
	],
});

const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const removeListener = observeAuthState((user) => {
			removeListener();
			resolve(user);
		}, reject);
	});
};

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	try {
		const user = await getCurrentUser();
		authStore.isLoggedIn = !!user;
		if (to.matched.some((record) => record.meta.requiresAuth)) {
			if (user) {
				next();
			} else {
				next({ name: "login" });
			}
		} else {
			next();
		}
	} catch (error) {
		console.error("Error en la autenticación:", error);
		next({ name: "home" });
	}

	console.log("router.beforeEach authStore.isLoggedIn:", authStore.isLoggedIn);
});

export default router;
