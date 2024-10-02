<script setup>
import { ref, computed } from 'vue';

// Props para valores iniciales (opcionales)
const props = defineProps({
    initialOrder: {
        type: String,
        default: 'price-asc',
    },
    initialMinPrice: {
        type: Number,
        default: 0,
    },
    initialMaxPrice: {
        type: Number,
        default: 100,
    },
});

// Variables reactivas para filtrar
const selectedOrder = ref(props.initialOrder);
const minPrice = ref(props.initialMinPrice);
const maxPrice = ref(props.initialMaxPrice);

// Variable reactiva para controlar la visibilidad del menú desplegable
const dropdownOpen = ref(false);
const dropdownLabel = computed(() => (dropdownOpen.value ? 'Cerrar Filtros' : 'Filtrar'));

// Emitir eventos al componente padre
const emit = defineEmits(['order-change', 'price-filter']);

// Alternar la visibilidad del menú desplegable
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

// Emitir cambio de orden
const emitOrderChange = () => {
    emit('order-change', selectedOrder.value);
};

// Emitir cambio de filtro de precio
const emitPriceFilter = () => {
    emit('price-filter', { minPrice: minPrice.value, maxPrice: maxPrice.value });
};
</script>

<template>
    <div class="filter-container">
        <!-- Botón de Filtro -->
        <div class="filter-button">
            <button :class="[dropdownOpen ? 'button-primary' : 'button-secondary']"
                @click="toggleDropdown">{{ dropdownLabel }}</button>
        </div>
        <!-- Menú Desplegable -->
        <div v-if="dropdownOpen" class="dropdown-menu">
            <!-- Ordenar por criterios -->
            <div class="filter-group">
                <label for="order-by">Ordenar por:</label>
                <select id="order-by" v-model="selectedOrder" @change="emitOrderChange">
                    <option value="price-asc">Precio Ascendente</option>
                    <option value="price-desc">Precio Descendente</option>
                    <option value="date-asc">Fecha de Creación Ascendente</option>
                    <option value="date-desc">Fecha de Creación Descendente</option>
                </select>
            </div>

            <!-- Rango de precios -->
            <div class="filter-group">
                <label for="min-price">Precio Mínimo:</label>
                <input type="number" id="min-price" v-model="minPrice" @input="emitPriceFilter" placeholder="0" />
            </div>

            <div class="filter-group">
                <label for="max-price">Precio Máximo:</label>
                <input type="number" id="max-price" v-model="maxPrice" @input="emitPriceFilter" placeholder="1000" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-container {
    position: relative;
}

/* Centrar el botón de filtro */
.filter-button {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

/* Estilos para el menú desplegable */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-blanco);
    border: 1px solid var(--color-gris-claro);
    border-radius: 5px;
    padding: 1rem;
    width: 300px;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Estilos para los grupos de filtros */
.filter-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

label {
    font-family: var(--font-family-secondary);
    font-size: var(--font-size-p);
    font-weight: var(--font-weight-medium);
    margin-bottom: 0.5rem;
    color: var(--color-gris-oscuro);
}

select,
input[type='number'] {
    padding: 0.5rem;
    font-size: var(--font-size-p);
    border: 1px solid var(--color-gris-medio);
    border-radius: 5px;
}

select:focus,
input:focus {
    outline: none;
    border-color: var(--color-actions);
}
</style>
