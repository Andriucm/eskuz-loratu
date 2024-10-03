<template>
    <!-- Lightbox personalizado -->
    <div v-if="visible" class="lightbox" @click.self="closeLightbox">
        <span class="close" @click="closeLightbox">&times;</span>
        <img :src="image" class="lightbox-content" />
    </div>
</template>

<script setup>
import { watch, onBeforeUnmount } from 'vue';

// Props recibidas
const props = defineProps({
    image: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    }
});

// Emitir eventos al cerrar el lightbox
const emit = defineEmits(['close']);

// Función para cerrar el lightbox
const closeLightbox = () => {
    emit('close');
};

// Watch para controlar el scroll cuando el lightbox está visible
watch(() => props.visible, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'; // Deshabilitar scroll
    } else {
        document.body.style.overflow = ''; // Habilitar scroll
    }
});
// Limpiar estilos al desmontar el componente (si el lightbox queda abierto)
onBeforeUnmount(() => {
    document.body.style.overflow = '';
});
</script>

<style scoped>
/* Lightbox personalizado */
.lightbox {
    position: fixed;
    z-index: 999999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    /* Fondo oscuro */
    display: flex;
    justify-content: center;
    align-items: center;
}

.lightbox-content {
    max-width: 90%;
    max-height: 90%;
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    border: 5px solid var(--color-blanco);
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
