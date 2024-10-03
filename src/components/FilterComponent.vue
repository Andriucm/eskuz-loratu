<script setup>
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator'

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
        default: 1000,
    },
});
const emit = defineEmits(['order-change', 'price-filter']);

// Variables reactivas para almacenar los filtros seleccionados
const selectedOrder = ref(props.initialOrder);
const minPrice = ref(props.initialMinPrice);
const maxPrice = ref(props.initialMaxPrice);

// Emitir eventos al componente padre al cerrar el Sheet
const applyFilters = () => {
    emit('order-change', selectedOrder.value);
    emit('price-filter', { minPrice: minPrice.value, maxPrice: maxPrice.value });
};
</script>

<template>
    <Sheet>
        <!-- Trigger para abrir el filtro -->
        <SheetTrigger>
            <Button class="button-primary">Filtros</Button>
        </SheetTrigger>

        <!-- Contenido del Sheet -->
        <SheetContent side="right" class="w-full">
            <SheetHeader>
                <SheetTitle class="text-5xl">Filtros</SheetTitle>
            </SheetHeader>

            <!-- Opciones de filtrado -->
            <div class="filter-group">
                <label for="order-by">Ordenar por:</label>
                <select id="order-by" v-model="selectedOrder">
                    <option value="price-asc">Precio Ascendente</option>
                    <option value="price-desc">Precio Descendente</option>
                    <option value="date-asc">Fecha de Creación Ascendente</option>
                    <option value="date-desc">Fecha de Creación Descendente</option>
                </select>
            </div>
            <Separator class="my-8"  />
            <!-- Rango de precios -->
            <div class="filter-group">
                <label for="min-price">Precio Mínimo:</label>
                <input type="number" id="min-price" v-model="minPrice" placeholder="0" />
            </div>

            <div class="filter-group">
                <label for="max-price">Precio Máximo:</label>
                <input type="number" id="max-price" v-model="maxPrice" placeholder="1000" />
            </div>

            <!-- Botón de aplicación de filtros -->
            <SheetFooter class="flex mt-4">
                <!-- Al hacer clic en "Cerrar" se aplican los filtros -->
                <SheetClose as-child>
                    <Button class="button-primary" @click="applyFilters">
                        Aplicar Filtros
                    </Button>
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
