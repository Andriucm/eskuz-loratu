<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { useProductsStore } from "@/stores/products";
import Loader from "@/components/Loader.vue";
import Carousel from "@/components/Carousel.vue";
import FAQButton from "@/components/FAQButton.vue";
import ProductCard from "@/components/ProductCard.vue";
import GuideLightBox from "@/components/GuideLightBox.vue";
import MenuContainer from "@/components/MenuContainer.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import CarouselView from "@/components/CarouselView.vue";

const productStore = useProductsStore();

// Obtener los productos al montar el componente
onMounted(() => {
    productStore.getProducts();
});

// Variables reactivas y computadas
const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);
const visible = ref(false);
const selectedImage = ref('');
const viewMode = ref('image');
const sortOrder = ref('price-asc');
const filteredProducts = ref([]); // Inicializar como array vacío
const minPrice = ref(0);
const maxPrice = ref(15);

// Computed para filtrar y ordenar productos automáticamente
watch([products, minPrice, maxPrice, sortOrder], () => {
    filterAndSortProducts();
});

// Filtrar y ordenar productos
const filterAndSortProducts = () => {
    let filtered = [...products.value]; // Crear copia de los productos

    // Filtrar por rango de precios
    filtered = filtered.filter(
        (product) => product.price >= minPrice.value && product.price <= maxPrice.value
    );

    // Ordenar según el criterio seleccionado
    filtered.sort((a, b) => {
        if (sortOrder.value === 'price-asc') return a.price - b.price;
        if (sortOrder.value === 'price-desc') return b.price - a.price;
        if (sortOrder.value === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortOrder.value === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
    });

    filteredProducts.value = filtered; // Actualizar el valor de `filteredProducts`
};

// Funciones para manejar los eventos emitidos por FilterComponent
const handleOrderChange = (order) => {
    sortOrder.value = order;
};

const handlePriceFilter = ({ minPrice: newMin, maxPrice: newMax }) => {
    minPrice.value = newMin;
    maxPrice.value = newMax;
};

// Abrir y cerrar Lightbox
const openLightbox = (image) => {
    selectedImage.value = image;
    visible.value = true;
};

const closeLightbox = () => {
    visible.value = false;
};

// Función para hacer scroll a los productos
const scrollToProducts = () => {
    const productContainer = document.getElementById('product-container');
    if (productContainer) {
        productContainer.scrollIntoView({ behavior: 'smooth' });
    }
};

// Cambiar vista
const changeView = (view) => {
    viewMode.value = view;
    nextTick(() => {
        scrollToProducts();
    });
};
</script>

<template>
    <main>
        <FAQButton />
        <div class="product-header">
            <div>
                <h3>Eskuz egindako bitxiak, loreen edertasuna zurekin daramazu.</h3>
                <span>"Eskuz Loratu bitxi marka artisau-lana eta naturaren inspirazioa uztartzen ditu. Loreen edertasuna
                    eta artisautzaren xarma pieza bakar bihurtzen ditugu, zure esentzia islatzeko. Eskuz egindako bitxi
                    bakoitza maitasunez eta dedikazioz sortzen dugu, emozioak transmitituz eta edertasun unibertsala
                    ospatuz."
                </span>
            </div>
            <Carousel v-if="products.length" :products="products"></Carousel>
            <button class="button-primary" @click="scrollToProducts">¡Irudiak!</button>
        </div>
        <Loader v-if="loading" />

        <!-- Contenedor para SearchBar y MenuContainer -->
        <div v-else-if="products.length" class="product-container" id="product-container">
            <div class="tools-menu-container">
                <MenuContainer @changeView="changeView" :viewMode="viewMode" />
                <FilterComponent @order-change="handleOrderChange" @price-filter="handlePriceFilter"
                    :initialOrder="sortOrder" :initialMinPrice="minPrice" :initialMaxPrice="maxPrice" />
            </div>

            <!-- Contenedor para los productos en modo collage o grid -->
            <div v-if="filteredProducts.length" class="product" :class="{ collage: viewMode === 'collage' }">
                <ProductCard v-if="viewMode !== 'carousel'" v-for="product in filteredProducts" :key="product.id"
                    :product="product" @open-lightbox="openLightbox" :viewMode="viewMode" />
                <CarouselView v-else :products="filteredProducts" />
            </div>
            <p v-else>Bitxiak ez dira topatu :( </p>
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

/* Encabezado del producto */
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
    gap: 3rem;
    height: calc(100vh - 4rem);
}

.product-header h3 {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

.product-header span {
    font-size: 1.6em;
    font-style: italic;
    line-height: 1.5;
    color: #555;
}

/* Contenedor principal de productos */
.product-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

/* Contenedor para SearchBar y MenuContainer */
.tools-menu-container {
    position: sticky;
    top: 0;
    z-index: 9;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 2rem;
    margin-bottom: 2rem;
    gap: 2rem;
    background: rgba(245, 245, 245, 0.5);
    backdrop-filter: blur(3px);
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.product.collage {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    transition: all 0.5s ease-in-out;
}

.product {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem;
    transition: all 0.5s ease-in-out;
}

p {
    text-align: center;
    color: var(--color-texto-secundario);
    font-size: 1.2em;
}
</style>
