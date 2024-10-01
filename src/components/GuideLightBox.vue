<script setup>
import { watch, onBeforeUnmount } from 'vue';
import { useGuideStore } from '@/stores/guide'; // Importar el store de guía

// Accedemos al store
const guideStore = useGuideStore();

// Método para cerrar el lightbox
const closeLightbox = () => {
    guideStore.toggleGuide(); // Cambia el estado de `showGuide` en el store
};

// Watch para detectar cuando el lightbox está visible y desactivar el scroll del body
watch(
    () => guideStore.showGuide,
    (newVal) => {
        if (newVal) {
            document.body.style.overflow = 'hidden'; // Deshabilitar scroll cuando el lightbox está visible
        } else {
            document.body.style.overflow = ''; // Restaurar el scroll cuando el lightbox se cierra
        }
    }
);

// Limpiar estilos al desmontar el componente (si el lightbox queda abierto)
onBeforeUnmount(() => {
    document.body.style.overflow = ''; // Asegurar que el scroll se habilita de nuevo si el componente se desmonta
});
</script>


<template>
    <!-- Lightbox personalizado para la guía -->
    <div v-if="guideStore.showGuide" class="lightbox" @click.self="closeLightbox">
        <span class="close" @click="closeLightbox">&times;</span>
        <div class="lightbox-content">
            <h3>Cómo agregar la PWA en iOS</h3>
            <ol>
                <li>Abre Safari y visita esta página.</li>
                <li>Toca el ícono de compartir en la parte inferior de la pantalla.</li>
                <li>Selecciona "Agregar a la pantalla de inicio".</li>
                <li>Confirma el nombre y toca "Agregar".</li>
            </ol>
        </div>
    </div>
</template>

<style scoped>
/* Lightbox personalizado */
.lightbox {
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.lightbox-content {

    background-color: white;
    padding: 1rem 2rem ;
    border-radius: 5px;
    max-width: 95%;
    max-height: 100%;
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    border: 5px solid var(--color-blanco);

    h3{
        text-align: center;
    }
}
.lightbox-content ol li{
    font-size: 1.4rem;
    list-style-type: decimal;
}

.close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    color: white;
    cursor: pointer;
    transition: color 0.3s ease;
}

.close:hover {
    color: var(--color-oro-metalico);
}
</style>
