import { ref, onMounted, watch } from "vue";

export function usePWA() {
	const isInstallable = ref(false);
	const deferredPrompt = ref(null);

	onMounted(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            // e.preventDefault(); 
			deferredPrompt.value = e;
			isInstallable.value = true;
			console.log("window.addEventListener  isInstallable:", isInstallable)
		});

		window.addEventListener("appinstalled", () => {
			isInstallable.value = false;
			console.log("window.addEventListener  isInstallable:", isInstallable)
		});

		watch(
			() => window.matchMedia("(display-mode: standalone)").matches,
			(newVal) => {
				if (newVal) {
					isInstallable.value = false;
					console.log("onMounted  isInstallable:", isInstallable)
				}
			}
		);
	});

	const installPWA = async () => {
		if (deferredPrompt.value) {
			deferredPrompt.value.prompt();
			const { outcome } = await deferredPrompt.value.userChoice;
			deferredPrompt.value = null;
            isInstallable.value = false;
            console.log(`El usuario eligió: ${outcome}`);

		}
	};

	return { isInstallable, installPWA };
}
