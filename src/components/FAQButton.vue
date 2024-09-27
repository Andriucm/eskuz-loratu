<script setup>
import { ref, inject, onMounted } from 'vue';
import { useGuideStore } from '@/stores/guide';
const guideStore = useGuideStore();

const isInstallable = inject('isInstallable');
const installPWA = inject('installPWA');
const isIOS = inject('isIOS');

const faqSelected = ref(false);

const toggleFaq = () => {
    faqSelected.value = !faqSelected.value;
};

const handleClickOutside = (event) => {
    const faqButton = document.querySelector('.faq-button');
    if (faqSelected.value && faqButton && !faqButton.contains(event.target)) {
        faqSelected.value = false;
    }
};

const showGuide = () => {
    guideStore.toggleGuide();
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});
</script>

<template>
    <button @click="toggleFaq" class="faq-button" :class="{ 'faq-button-selected': faqSelected }">
        <i class="fa-solid fa-question"></i>
        <div class="tooltip" :class="{ 'faq-button-selected-tooltip': faqSelected }">
            <h3>Instala nuestra App</h3>
            <p class="tooltip-description">
                Accede a nuestra Galeria Digital con nuestra App, directamente desde tu dispositivo.
            </p>
            <button v-if="isInstallable && !isIOS" @click="installPWA" class="button-primary">Instalar App</button>
            <button v-else-if="isIOS" @click="showGuide" class="button-primary">Como hacerlo</button>
        </div>
    </button>
</template>

<style scoped>
.faq-button {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: none;
    background-color: var(--color-turquesa);
    background-image: linear-gradient(147deg, var(--color-blanco) 0%, var(--color-fondo) 74%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.151);
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1;
    transition: all 0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.faq-button i {
    font-size: 1.8rem;
    fill: var(--color-gris-oscuro);
}

.faq-button:hover i {
    animation: jello-vertical 0.7s both;
}

@keyframes jello-vertical {
    0% {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(0.75, 1.25, 1);
    }

    40% {
        transform: scale3d(1.25, 0.75, 1);
    }

    50% {
        transform: scale3d(0.85, 1.15, 1);
    }

    65% {
        transform: scale3d(1.05, 0.95, 1);
    }

    75% {
        transform: scale3d(0.95, 1.05, 1);
    }

    100% {
        transform: scale3d(1, 1, 1);
    }
}

.tooltip {
    position: absolute;
    bottom: 130%;
    opacity: 0;
    background-color: var(--color-turquesa);
    background-image: linear-gradient(147deg, var(--color-blanco) 0%, var(--color-fondo) 74%);
    padding: 1rem 2rem;
    border-radius: 5px;
    display: flex;
    width: 18rem;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    pointer-events: none;
    letter-spacing: 0.5px;
    flex-direction: column;
    gap: 1rem;

    h3 {
        font-weight: var(--font-weight-bold);
    }
}

.tooltip-description {
    color: var(--color-turquesa);
    font-size: var(--font-size-p);
}

.faq-button-selected-tooltip {
    opacity: 1;
    pointer-events: auto;
    transition-duration: 0.3s;
}

.faq-button-selected {
    right: 10rem;
    transform: translate(50%, 0);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
