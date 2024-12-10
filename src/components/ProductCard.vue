<script setup lang="ts">
import { formatCurrency } from '@/utils';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

// Props para recibir la información del producto y el viewMode
const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
    viewMode: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['open-lightbox'])

const openLightbox = (image: string) => {
    emit('open-lightbox', image)
}

const redirectTo = (link: string) => {
    window.open(link, '_blank')
}

</script>

<template>
    <!-- Sheet container -->
    <Sheet>
        <SheetTrigger as-child>
            <div class="product-card ">
                <img loading="lazy" :src="product.image" :alt="product.name" class="product-image "
                    :class="{ 'collage-view': viewMode === 'collage' }" />
                <div class="product-info ">
                    <h2 :class="{ hidden: viewMode === 'collage'}">{{ product.name }}</h2>
                </div>
            </div>
        </SheetTrigger>

        <!-- Contenido del Sheet que aparecerá desde la parte inferior -->
        <SheetContent side="bottom" class="sheet-content bg-[var(--color-blanco)] rounded-t-lg p-6">
            <SheetHeader>
                <SheetTitle class="sheet-title ">{{ product.name }}
                </SheetTitle>
                <SheetDescription class="sheet-description  mt-2 mb-4">
                    {{ formatCurrency(product.price) }}
                </SheetDescription>
            </SheetHeader>

            <!-- Opciones dentro del Sheet -->
            <SheetClose as-child>
                <div class="grid gap-4 py-4">
                    <div @click="openLightbox(product.image)"
                        class="toolbar-option flex justify-between items-center p-2 bg-[var(--color-blanco)] text-[var(--color-texto)] border-b border-[var(--color-gris-claro)] cursor-pointer transition-colors duration-300 hover:bg-[var(--color-gris-claro)]">
                        <span>{{$t('productCard.seeImage')}}</span>
                        <i class="fa-solid fa-maximize"></i>
                    </div>
                    <div @click="redirectTo(product.link)"
                        class="toolbar-option flex justify-between items-center p-2 bg-[var(--color-blanco)] text-[var(--color-texto)] border-b border-[var(--color-gris-claro)] cursor-pointer transition-colors duration-300 hover:bg-[var(--color-gris-claro)]">
                        <span>{{ $t('productCard.goToImage') }}</span>
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </div>
                </div>
            </SheetClose>

            <!-- Footer con el botón de cierre -->
            <SheetFooter class="flex mt-4">
                <SheetClose as-child>
                    <button class="button-primary">
                        {{ $t('productCard.close') }}
                    </button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
</template>

<style scoped>
.product-card {
    background-color: var(--color-secundario);
    border: 1px solid var(--color-borde);
    box-shadow: 0px 2px 8px 0px #00000063;
    display: flex;
    flex-direction: column;
    text-align: left;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 100%;
    position: relative;
    overflow: visible;
    cursor: pointer;
    /* Añadir cursor de pointer para indicar interactividad */
    margin-bottom: 1.5rem;
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
    border-radius: 5px 5px 0 0;
    transition: transform 0.3s ease;
}

.product-info {
    padding: 0 1rem;
    background-color: var(--color-blanco);
    border-radius: 0 0 5px 5px;
}

.product-info h2 {
    font-size: 1.5em;
    color: var(--color-texto);
    margin-bottom: 0.5rem;
}

.toolbar-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 0.5rem 1rem;
    color: var(--color-texto);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-p);
    cursor: pointer;
    border-bottom: 1px solid var(--color-gris-claro);
    transition: background-color 0.3s ease;
}

.toolbar-option:hover {
    background-color: var(--color-gris-claro);
}

.sheet-title {
    background-color: var(--color-blanco);
    font-size: var(--font-size-h3)
}

.sheet-description {
    font-size: var(--font-size-p);
    color: var(--color-gris-oscuro);
}

.hidden{
    display: none;
}
.collage-view{
    margin:0;
    aspect-ratio: 1 /1;
}
</style>
