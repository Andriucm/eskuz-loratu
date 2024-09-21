<script setup>
import { onMounted, computed } from 'vue';
import { useProductsStore } from '@/stores/products';

import Loader from '@/components/Loader.vue';
import OpeningAnimation from '@/components/OpeningAnimation.vue';

// Obtener el store de productos
const productStore = useProductsStore();

// Cargar productos al montar el componente
onMounted(() => {
    productStore.getProducts();
});

// Computed para acceder a los productos y estado de carga
const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);
</script>

<template>
    <OpeningAnimation></OpeningAnimation>
    <main>
        <h1>¡Gure Bitxiak!</h1>
        <!-- Mostrar estado de carga -->
        <Loader v-if="loading"></Loader>

        <!-- Mostrar productos cuando se carguen -->
        <div v-else-if="products.length" class="product-container">
            <div v-for="product in products" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.name" class="product-image" />
                <h2>{{ product.name }}</h2>
                <p class="price">{{ product.price }} €</p>
                <p class="description">{{ product.description }}</p>
            </div>
        </div>

        <!-- Mensaje cuando no hay productos -->
        <p v-else>Bitxiak ez dira topatu :( </p>
    </main>
</template>

<style>
main {
    max-width: 1200px;
    height: 100vh;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    text-align: center;
    margin-bottom: 40px;
}

.product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product-card {
    flex: 1 1 calc(25% - 20px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
}

.product-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 15px;
}

.price {
    font-size: 1.2em;
    color: #007bff;
    margin-bottom: 10px;
}

.description {
    font-size: 0.9em;
    color: #555;
}
</style>
