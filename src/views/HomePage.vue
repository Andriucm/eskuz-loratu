<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';
import Loader from '@/components/Loader.vue';
import OpeningAnimation from '@/components/OpeningAnimation.vue';
import Lightbox from '@/components/Lightbox.vue';
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
</script>

<template>
    <OpeningAnimation />
    <main>
        <FaqButton />
        <div class="product-header">
            <SearchBar v-model="searchQuery" />
        </div>
        <Loader v-if="loading" />

        <div v-else-if="filteredProducts.length" class="product-container">
            <Carousel></Carousel>
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
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2rem 3rem 2rem;
    gap: 3rem;
}

.product-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
}

p {
    text-align: center;
    color: var(--color-texto-secundario);
    font-size: 1.2em;
}
</style>
