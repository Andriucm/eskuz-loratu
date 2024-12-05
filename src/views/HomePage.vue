<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import { useProductsStore } from "@/stores/products";
import Loader from "@/components/Loader.vue";
import Carousel from "@/components/Carousel.vue";
import FAQButton from "@/components/FAQButton.vue";
import ProductCard from "@/components/ProductCard.vue";
import GuideLightBox from "@/components/GuideLightBox.vue";
import MenuContainer from "@/components/MenuContainer.vue";
import FilterComponent from "@/components/FilterComponent.vue";
import CarouselView from "@/components/CarouselView.vue";
import { Separator } from '@/components/ui/separator'
import { debounce } from "lodash";


const productStore = useProductsStore();

onMounted(() => {
    // Escucha el evento de scroll en window
    window.addEventListener("scroll", handleScroll);

    // Carga inicial de productos
    productStore.getProducts();
});

onUnmounted(() => {
    // Limpia el evento al desmontar el componente
    window.removeEventListener("scroll", handleScroll);
});
// Variables reactivas y computadas
const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);
const visible = ref(false);
const selectedImage = ref('');
const viewMode = ref('image');
const sortOrder = ref('price-asc');
const filteredProducts = ref([]);
const categoryFilter = ref([])
const minPrice = ref(0);
const maxPrice = ref(15);

// Computed para filtrar y ordenar productos automáticamente
watch([products, minPrice, maxPrice, sortOrder, categoryFilter], () => {
    filterAndSortProducts();
});

// Filtrar y ordenar productos
const filterAndSortProducts = () => {
    let filtered = [...products.value]; // Crear copia de los productos

    // Filtrar por rango de precios
    filtered = filtered.filter(
        (product) => product.price >= minPrice.value && product.price <= maxPrice.value
    );

    // Filtrar por categorías
    if (categoryFilter.value.length > 0) {
        filtered = filtered.filter((product) => categoryFilter.value.includes(product.category));
    }

    // Ordenar según el criterio seleccionado
    filtered.sort((a, b) => {
        if (sortOrder.value === 'price-asc') return a.price - b.price;
        if (sortOrder.value === 'price-desc') return b.price - a.price;
        if (sortOrder.value === 'date-asc') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortOrder.value === 'date-desc') return new Date(b.createdAt) - new Date(a.createdAt);
    });

    filteredProducts.value = filtered;
};

const handleScroll = debounce(() => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading.value && productStore.hasMore) {
        productStore.getProducts(); // Cargar más productos
    }
}, 200);

// Funciones para manejar los eventos emitidos por FilterComponent
const handleOrderChange = (order) => {
    sortOrder.value = order;
};

const handlePriceFilter = ({ minPrice: newMin, maxPrice: newMax }) => {
    minPrice.value = newMin;
    maxPrice.value = newMax;
};

const handleCategoryFilter = (category) => {
    categoryFilter.value = category;
}

const resetFilters = () => {
    minPrice.value = 0;
    maxPrice.value = 15;
    categoryFilter.value = [];
}

// Abrir y cerrar Lightbox
const openLightbox = (image) => {
    selectedImage.value = image;
    visible.value = true;
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    visible.value = false;
    document.body.style.overflow = '';

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
        <div class="product-header container">
            <div>
                <h3>{{ $t('productHeader.title') }}</h3>
                <span>
                    {{ $t('productHeader.description') }}
                </span>
            </div>
            <Carousel v-if="products.length" :products="products"></Carousel>
            <button class="button-primary" @click="scrollToProducts"> {{ $t('productHeader.button') }}</button>
        </div>
        <Loader v-if="loading && products.length === 0" />

        <!-- Contenedor para SearchBar y MenuContainer -->
        <div v-else-if="products.length" class="product-container" id="product-container">
            <div class="tools-menu">
                <div class="container tool-menu-container">
                    <MenuContainer @changeView="changeView" :viewMode="viewMode" />
                    <Separator orientation="vertical" class="h-full border-l border-gray-300 mx-4" />
                    <FilterComponent @order-change="handleOrderChange" @price-filter="handlePriceFilter"
                        @category-filter="handleCategoryFilter" @reset-filters="resetFilters" :initialOrder="sortOrder"
                        :initialMinPrice="minPrice" :initialMaxPrice="maxPrice" :initialCategory="categoryFilter" />
                </div>
            </div>

            <!-- Contenedor para los productos en modo collage o grid -->
            <div v-if="filteredProducts.length" class="product container" :class="{ collage: viewMode === 'collage' }">
                <ProductCard v-if="viewMode !== 'carousel'" v-for="product in filteredProducts" :key="product.id"
                    :product="product" @open-lightbox="openLightbox" :viewMode="viewMode" />
                <CarouselView v-else :products="filteredProducts" @open-lightbox="openLightbox" />
            </div>
            <p v-else>{{ $t('productHeader.notFound') }} </p>
            <div v-if="loading && products.length > 0" class="loading-container">
                <Loader  />
            </div>
            <p v-if="!loading && !productStore.hasMore">{{ $t('productHeader.noMoreProducts') }}</p>

        </div>

        <p v-else>{{ $t('productHeader.notFound') }} </p>
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
    padding: 2rem 0;
    margin-bottom: 3rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    gap: 3rem;
    height: calc(100vh - 4rem);
    position: relative;
    background-image: url("../assets/svg/main-background.svg");
    background-position: center;
}

.product-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(245, 245, 245, 0.3);
    z-index: 1;
    pointer-events: none;
}

/* Asegúrate de que el contenido dentro de .product-header esté por encima del overlay */
.product-header>* {
    position: relative;
    z-index: 2;
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
    min-height: 100vh;
    background-color: var(--color-fondo);
}

/* Contenedor para SearchBar y MenuContainer */
.tools-menu {
    position: sticky;
    top: 0;
    z-index: 9;
    width: 100%;
    padding: 2rem 0;
    background: rgba(245, 245, 245, 0.5);
    backdrop-filter: blur(3px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tool-menu-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 5rem;

}

.product.collage {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    transition: all 0.5s ease-in-out;
}

.product {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;
    transition: all 0.5s ease-in-out;
}

p {
    text-align: center;
    color: var(--color-texto-secundario);
    font-size: 1.2em;
}
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
}
</style>
