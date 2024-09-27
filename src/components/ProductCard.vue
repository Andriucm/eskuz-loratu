<script setup>

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['open-lightbox']);

const openLightbox = (image) => {
    emit('open-lightbox', image);
};

const redirectTo = (link) => {
    window.open(link, '_blank');
};
</script>

<template>
    <div class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />
        <div class="product-info">
            <h2>{{ product.name }}</h2>
        </div>

        <div class="toolbar">
            <div class="toolbar-option" @click="openLightbox(product.image)">
                Irudia Ikusi
                <i class="fa-solid fa-maximize"></i>
            </div>
            <div class="toolbar-option" @click="redirectTo(product.link)">
                Irudira eraman
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-card {
    background-color: var(--color-secundario);
    border: 1px solid var(--color-borde);
    box-shadow: 0 2px 8px var(--color-sombra);
    display: flex;
    flex-direction: column;
    text-align: left;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 100%;
    position: relative;
}

.product-card:hover .toolbar {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px var(--color-sombra-hover);
}

.product-image {
    max-width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    height: auto;
    margin-bottom: 15px;
    border-radius: 5px;
    transition: transform 0.3s ease;
}

.product-image:hover {
    cursor: zoom-in;
    transform: scale(1.05);
}

.product-info {
    padding: 0 1rem;
}

.product-info h2 {
    font-size: 1.5em;
    color: var(--color-texto);
    margin-bottom: 0.5rem;
}

.toolbar {
    position: absolute;
    background-color: var(--color-blanco);
    top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 0.5rem;
    gap: 0.5rem;
    z-index: 1;
    box-shadow: 0 2px 8px var(--color-gris-oscuro);
    opacity: 0;
    transform: translateY(-10px);
    visibility: hidden;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.toolbar-option {
    display: flex;
    gap: 1rem;
    background-color: var(--color-blanco);
    padding: 0.5rem 1rem;
    color: var(--color-texto);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-p);
    cursor: pointer;
    border-bottom: 1px solid var(--color-gris-claro);
    opacity: 0;
    transform: translateY(-10px);
    animation: fadeInUp 0.3s forwards;
}

.toolbar-option:last-child {
    border: none;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
