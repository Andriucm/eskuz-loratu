import { ref } from "vue";
import { defineStore } from "pinia";


export const useGuideStore = defineStore("guide", () => {
    const showGuide = ref(false);

    const toggleGuide = () => {
        showGuide.value = !showGuide.value;
    };


    return {
		showGuide,
		toggleGuide,
	};
});