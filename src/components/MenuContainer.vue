<script setup>
import { useProductsStore } from '@/stores/products';

// Definir los props que recibe el componente
const props = defineProps({
    viewMode: { type: String, default: "image" }
});

const emits = defineEmits(['changeView']);

const changeView = (view) => {
    emits('changeView', view);
}
</script>

<template>
    <div class="menubar-container">
        <div class="menubar">
            <!-- Botón para la vista tipo imagen (carousel) -->
            <button class="item button-primary" :class="{ active: props.viewMode === 'image' }" @click="changeView('image')">
                <i class="fa-solid fa-image"></i>
            </button>

            <!-- Botón para la vista tipo cuadrícula -->
            <button class="item button-primary" :class="{ active: props.viewMode === 'collage' }" @click="changeView('collage')">
                <i class="fa-solid fa-table-cells"></i>
            </button>

            <!-- Botón para la vista tipo imágenes múltiples -->
            <button class="item button-primary" :class="{ active: props.viewMode === 'carousel' }" @click="changeView('carousel')">
                <i class="fa-regular fa-images"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Contenedor principal del menubar */
.menubar-container {
    width: 100%;
    padding: 1rem;
}

/* Estilos de la barra de menús */
.menubar {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    /* Espaciado entre los botones */
}

/* Estilos de los botones */
.item {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

/* Estilo para el botón activo */
.item.active {
    background-color: #007bff;
    color: white;
    transform: translateY(-2px);
}

/* Efecto hover en los botones */
.item:hover {
    background-color: #007bff;
    color: white;
    transform: translateY(-2px);
}

/* Efecto de clic */
.item:active {
    transform: translateY(0);
}

/* Adaptar a dispositivos móviles */
@media (max-width: 768px) {
    .menubar {
        justify-content: center;
    }

    .item {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
    }
}
</style>
