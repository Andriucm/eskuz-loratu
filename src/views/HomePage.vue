<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import Loader from '@/components/Loader.vue';
import OpeningAnimation from '@/components/OpeningAnimation.vue';
import Lightbox from '@/components/Lightbox.vue';
import Carousel from '@/components/Carousel.vue';

// Obtener el store de productos
const productStore = useProductsStore();
const isInstallable = ref(false);
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    isInstallable.value = true;
});

const installPWA = async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Instalación aceptada');
        }
        deferredPrompt = null;
        isInstallable.value = false;
    }
};


// Cargar productos al montar el componente
onMounted(() => {
    productStore.getProducts();

});

// Computed para acceder a los productos y estado de carga
const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);

// Para el manejo del lightbox
const visible = ref(false);   // Estado para controlar la visibilidad del lightbox
const selectedImage = ref(''); // Imagen seleccionada

// Abrir el lightbox con la imagen seleccionada
const openLightbox = (image) => {
    selectedImage.value = image;
    visible.value = true;
};

// Cerrar el lightbox
const closeLightbox = () => {
    visible.value = false;
};

// Agregar búsqueda
const searchQuery = ref('');

// Computed para filtrar productos
const filteredProducts = computed(() => {
    if (!searchQuery.value.trim()) {
        return products.value;
    }
    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.price.toString().includes(query)
    );
});

const redirectTo = (link) => {
    window.open(link, '_blank');
}


</script>

<template>
    <OpeningAnimation />
    <main>
        <button v-if="isInstallable" @click="installPWA">Instalar PWA</button>
        <div class="product-header">
            <div class="search-container">
                <input type="text" placeholder="Bitxiar topatu..." v-model="searchQuery"
                    aria-label="Buscar productos" />
                <!-- Ícono de lupa -->
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>
        <Loader v-if="loading" />

        <!-- Mostrar productos cuando se carguen -->
        <div v-else-if="filteredProducts.length" class="product-container">
            <Carousel></Carousel>
            <div v-for="product in filteredProducts" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.name" class="product-image" />
                <div class="product-info">
                    <h2>@{{ product.name }}</h2>
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
        </div>

        <!-- Mensaje cuando no hay productos -->
        <p v-else>Bitxiak ez dira topatu :( </p>

        <!-- Lightbox para mostrar la imagen seleccionada -->
        <Lightbox :image="selectedImage" :visible="visible" @close="closeLightbox" />
    </main>
</template>

<style scoped>
h1 {
    font-size: 2.5rem;
    transition: color 0.3s ease;
    display: inline-block;
    color: var(--color-texto);
    text-wrap: nowrap;
    width: max-content;
}

h1:hover {
    color: var(--color-oro-metalico);
}

.product-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2rem 3rem 2rem;
    gap: 3rem;
}

.search-container {
    position: relative;
    width: 300px;
}

.search-container input {
    background: transparent;
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: var(--font-size-p);
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    color: var(--color-gris-oscuro);
}

.search-container input:focus {
    border-color: var(--color-gris-oscuro);
    box-shadow: 0 0 5px var(--color-gris-oscuro);
}

.search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    stroke: var(--color-gris-medio);
    pointer-events: none;
}

.product-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
}


.product-card {
    background-color: var(--color-secundario);
    border: 1px solid var(--color-borde);
    box-shadow: 0 2px 8px var(--color-sombra);
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 1rem;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 100%;
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

        &:last-child {
            border: none;
        }
    }
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

.product-info p {
    font-size: 1em;
    color: var(--color-texto-secundario);
    margin-bottom: 0.5rem;
}

.product-info .price {
    font-weight: bold;
    color: var(--color-texto);
}

p {
    text-align: center;
    color: var(--color-texto-secundario);
    font-size: 1.2em;
}


@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
