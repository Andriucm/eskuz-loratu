import { ref, onMounted } from "vue";

export function usePlatform() {
	const isIOS = ref(false);

	const checkPlatform = () => {
		// Asegurarnos de que estamos en el entorno del navegador
		if (typeof window !== "undefined" && typeof navigator !== "undefined") {
			// Verificar si es iOS
			isIOS.value = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		}
	};

	onMounted(() => {
		checkPlatform();
	});

	return { isIOS };
}
