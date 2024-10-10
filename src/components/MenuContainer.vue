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
            <button class="item button-primary" :class="{ active: props.viewMode === 'image' }"
                @click="changeView('image')">
                <i class="fa-solid fa-image"></i>
            </button>

            <!-- Botón para la vista tipo cuadrícula -->
            <button class="item button-primary" :class="{ active: props.viewMode === 'collage' }"
                @click="changeView('collage')">
                <i class="fa-solid fa-table-cells"></i>
            </button>

            <!-- Botón para la vista tipo imágenes múltiples -->
            <button class="item button-primary" :class="{ active: props.viewMode === 'carousel' }"
                @click="changeView('carousel')">
                <i class="fa-regular fa-images"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.menubar-container {
    width:fit-content;
}

.menubar {
    display: flex;
    gap: 1rem;
}

.item {
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.item.active {
    background-color: var(--color-turquesa);
    color: white;
    transform: translateY(-2px);
}

.item:hover {
    background-color: var(--color-turquesa);
    color: white;
    transform: translateY(-2px);
}

.item:active {
    transform: translateY(0);
}
</style>
