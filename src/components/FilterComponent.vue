<script setup>
import { ref, computed } from 'vue';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

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
        default: 15,
    },
    initialCategory: {
        type: Array,
        default: () => []
    }
});

// Emitir eventos al componente padre
const emit = defineEmits(['order-change', 'price-filter', 'category-filter','reset-filters']);

// Variables reactivas para almacenar los filtros seleccionados
const selectedOrder = ref(props.initialOrder);
const minPrice = ref(props.initialMinPrice);
const maxPrice = ref(props.initialMaxPrice);
const categoryFilter = ref(props.initialCategory);

const categories = [
    { id: 1, name: 'Pendiente' },
    { id: 2, name: 'Anillo' },
    { id: 3, name: 'Pulsera' },
    { id: 4, name: 'Collar' }
];

// Emitir eventos al componente padre al cerrar el Sheet
const applyFilters = () => {
    emit('order-change', selectedOrder.value);
    emit('price-filter', { minPrice: minPrice.value, maxPrice: maxPrice.value });
    emit('category-filter', categoryFilter.value); // Corrige aquí el typo
};

const resetFilters = () => {
    emit('reset-filters');
}

</script>

<template>
    <Sheet>
        <!-- Trigger para abrir el filtro -->
        <SheetTrigger>
            <button class="button-primary"><i class="fa-solid fa-filter"></i></button>
        </SheetTrigger>

        <!-- Contenido del Sheet -->
        <SheetContent side="right" class="w-full">
            <SheetHeader>
                <SheetTitle class="text-3xl">{{ $t('filterComponent.title') }}</SheetTitle>
            </SheetHeader>

            <!-- Opciones de filtrado -->
            <div class="filter-group">
                <label for="order-by">{{ $t('filterComponent.orderByLabel') }}</label>
                <select id="order-by" v-model="selectedOrder">
                    <option value="price-asc">{{ $t('filterComponent.priceAsc') }}</option>
                    <option value="price-desc">{{ $t('filterComponent.priceDesc') }}</option>
                    <option value="date-asc">{{ $t('filterComponent.dateAsc') }}</option>
                    <option value="date-desc">{{ $t('filterComponent.dateDesc') }}</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="category">{{ $t('filterComponent.category') }}:</label>
                <select id="category" v-model="categoryFilter" multiple>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <Separator class="my-8" />

            <!-- Rango de precios -->
            <div class="filter-group">
                <label for="min-price">{{ $t('filterComponent.minPrice') }}</label>
                <input type="number" id="min-price" v-model="minPrice" placeholder="0" />
            </div>

            <div class="filter-group">
                <label for="max-price">{{ $t('filterComponent.maxPrice') }}</label>
                <input type="number" id="max-price" v-model="maxPrice" placeholder="1000" />
            </div>

            <SheetFooter class="flex mt-4">
                <SheetClose as-child>
                    <div class="button-group">
                        <button class="button-primary apply" @click="applyFilters">
                            {{ $t('filterComponent.applyFilters') }}
                        </button>
                        <button class="button-primary reset" @click="resetFilters">
                            <i class="fa-solid fa-rotate-left"></i>
                        </button>
                    </div>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>

<style scoped>
.filter-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}

.button-primary {
    padding: 1rem 2rem;
}

.apply {
    flex-grow: 3;
}
.apply:active {
    background-color: var(--color-turquesa);
}

.reset {
    flex-grow: 1;
    background-color: var(--color-gris-medio);
}
.reset:active {
    background-color: var(--color-gris-oscuro);
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
    background-color: var(--color-blanco);
    transition: border-color 0.3s;
}

select:focus,
input:focus {
    outline: none;
    border-color: var(--color-actions);
}

select option {
    padding: 8px 12px;
}

select option:checked {
    background-color: var(--color-actions);
    color: white;
}
</style>
