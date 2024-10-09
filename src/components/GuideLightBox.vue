<script setup>
import { watch, onBeforeUnmount } from 'vue';
import { useGuideStore } from '@/stores/guide';

const guideStore = useGuideStore();

const closeLightbox = () => {
    guideStore.toggleGuide();
};

watch(
    () => guideStore.showGuide,
    (newVal) => {
        if (newVal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
);

onBeforeUnmount(() => {
    document.body.style.overflow = '';
});
</script>

<template>
    <div v-if="guideStore.showGuide" class="lightbox" @click.self="closeLightbox">
        <span class="close" @click="closeLightbox">&times;</span>
        <div class="lightbox-content animate__animated animate__fadeInDown">
            <h3 class="guide-title">Cómo agregar la PWA en iOS</h3>
            <p class="guide-description">
                Sigue estos sencillos pasos para agregar la aplicación a tu pantalla de inicio en iOS:
            </p>
            <ol class="guide-steps">
                <li class="guide-step">
                    <span class="step-number">1</span>
                    <p>Abre Safari y visita esta página.</p>
                </li>
                <li class="guide-step">
                    <span class="step-number">2</span>
                    <p>Toca el ícono de <i class="fa-solid fa-share-nodes"></i> en la parte inferior de la pantalla.</p>
                </li>
                <li class="guide-step">
                    <span class="step-number">3</span>
                    <p>Selecciona <strong>"Agregar a la pantalla de inicio"</strong>.</p>
                </li>
                <li class="guide-step">
                    <span class="step-number">4</span>
                    <p>Confirma el nombre y toca <strong>"Agregar"</strong>.</p>
                </li>
            </ol>
        </div>
    </div>
</template>

<style scoped>
.lightbox {
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.lightbox-content {
    background-color: #ffffff;
    padding: 1rem 2rem;
    border-radius: 10px;
    max-width: 95%;
    max-height: 90%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow-y: auto;
}

.guide-title {
    font-size: 2.4rem;
    color: #333;
    text-align: center;
    margin-bottom: 1rem;
}

.guide-description {
    color: #555;
    text-align: center;
    margin-bottom: 1.5rem;
}

.guide-steps {
    list-style: none;
    padding: 0;
    margin: 0;
}

.guide-step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease-in-out;
}

.guide-step:hover {
    transform: translateX(5px);
}

.step-number {
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    background-color: var(--color-actions);
    border-radius: 50%;
    min-width: 35px;
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
}

.guide-step p {
    font-size: 1.6rem;
    line-height: 1.5;
    color: #333;
}

/* Botón de cierre */
.close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    color: #bbb;
    cursor: pointer;
    transition: color 0.3s ease, transform 0.3s ease;
}

.close:hover {
    color: #ff6f61;
    transform: scale(1.1);
}
</style>
