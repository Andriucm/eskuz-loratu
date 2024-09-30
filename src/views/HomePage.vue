<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import Loader from '@/components/Loader.vue';
import OpeningAnimation from '@/components/OpeningAnimation.vue';
import Carousel from '@/components/Carousel.vue';
import FaqButton from '@/components/FAQButton.vue';
import SearchBar from '@/components/SearchBar.vue';
import ProductCard from '@/components/ProductCard.vue';
import GuideLightBox from '@/components/GuideLightBox.vue';

// Obtener el store de productos
const productStore = useProductsStore();

// Cargar productos al montar el componente
onMounted(() => {
    productStore.getProducts();
});

// Computed para acceder a los productos y estado de carga
const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);

// Para el manejo del lightbox
const visible = ref(false);
const selectedImage = ref('');

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
    return products.value.filter(
        (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.price.toString().includes(query)
    );
});

// Función para hacer scroll a la sección de productos
const scrollToProducts = () => {
    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        productContainer.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<template>
    <OpeningAnimation />
    <main>
        <FaqButton />
        <div class="product-header">
            <h3>Eskuz egindako bitxiak, loreen edertasuna zurekin daramazu.</h3>
            <span>"Eskuz Loratu bitxi marka artisau-lana eta naturaren inspirazioa uztartzen ditu. Loreen edertasuna eta
                artisautzaren xarma pieza bakar bihurtzen ditugu, zure esentzia islatzeko. Eskuz egindako bitxi bakoitza
                maitasunez eta dedikazioz sortzen dugu, emozioak transmitituz eta edertasun unibertsala ospatuz."
            </span>
            <Carousel v-if="products.length" :products="products"></Carousel>
            <!-- Usamos la función scrollToProducts en el @click -->
            <button class="button-primary" @click="scrollToProducts">¡Irudiak!</button>
        </div>
        <Loader v-if="loading" />

        <div v-else-if="filteredProducts.length" class="product-container" id="product-container">
            <SearchBar v-model="searchQuery" />
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"
                @open-lightbox="openLightbox" />
        </div>

        <p v-else>Bitxiak ez dira topatu :( </p>

        <Lightbox :image="selectedImage" :visible="visible" @close="closeLightbox" />
        <GuideLightBox />
    </main>
</template>

<style scoped>
main {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: rgba(245, 245, 245, 0.5);
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    gap: 1.5rem;
    height: calc(100vh - 4rem);
}

.product-header h3 {
    font-size: 3rem;
    /* Tamaño de fuente más grande */
    font-weight: bold;
    letter-spacing: 0.05em;
    /* Espaciado de letras */
}

.product-header span {
    font-size: 1.6em;
    /* Tamaño de fuente más pequeño para descripción */
    font-style: italic;
    /* Descripción en cursiva */
    line-height: 1.5;
    /* Mejorar legibilidad */
    color: #555;
    /* Color gris oscuro */
}

.product-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 20px;
}

p {
    text-align: center;
    color: var(--color-texto-secundario);
    font-size: 1.2em;
}
</style>
