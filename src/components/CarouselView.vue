<script setup lang="ts">
import { ref } from 'vue'
import { watchOnce } from '@vueuse/core'
import { formatCurrency } from '@/utils';
import { Button } from '@/components/ui/button'

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

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['open-lightbox'])

const openLightbox = (image: string) => {
    emit('open-lightbox', image)
}

const redirectTo = (link: string) => {
    window.open(link, '_blank')
}

const emblaMainApi = ref()
const emblaThumbnailApi = ref()
const selectedIndex = ref(0)

function onSelect() {
    if (!emblaMainApi.value || !emblaThumbnailApi.value)
        return
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
    emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap())
}

function onThumbClick(index: number) {
    if (!emblaMainApi.value || !emblaThumbnailApi.value)
        return
    emblaMainApi.value.scrollTo(index)
}

watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi)
        return

    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
})
</script>

<template>
    <div class="w-full flex flex-col gap-2 ">
        <Carousel class="relative w-full " @init-api="(val) => emblaMainApi = val">
            <CarouselContent>
                <CarouselItem v-for="(product, index) in props.products" :key="index">
                    <div class="p-1">
                        <Card>
                            <CardContent class="flex aspect-[4/5]  justify-center p-0 rounded-[5px]">
                                <Sheet>
                                    <SheetTrigger as-child>
                                        <img class="aspect-[4/5] rounded-[5px] object-cover" :src="product.image"
                                            :alt="`Imagen de ${product.name}`">
                                    </SheetTrigger>
                                    <SheetContent side="bottom"
                                        class="sheet-content bg-[var(--color-blanco)] rounded-t-lg p-6">
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
                                                    <span>Irudia Ikusi</span>
                                                    <i class="fa-solid fa-maximize"></i>
                                                </div>
                                                <div @click="redirectTo(product.link)"
                                                    class="toolbar-option flex justify-between items-center p-2 bg-[var(--color-blanco)] text-[var(--color-texto)] border-b border-[var(--color-gris-claro)] cursor-pointer transition-colors duration-300 hover:bg-[var(--color-gris-claro)]">
                                                    <span>Irudira eraman</span>
                                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                                </div>
                                            </div>
                                        </SheetClose>

                                        <!-- Footer con el botón de cierre -->
                                        <SheetFooter class="flex mt-4">
                                            <SheetClose as-child>
                                                <Button class="button-primary">
                                                    Sarratu
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>

        <Carousel class="relative w-full " @init-api="(val) => emblaThumbnailApi = val">
            <CarouselContent class="flex gap-1 ml-0">
                <CarouselItem v-for="(product, index) in props.products" :key="index"
                    class="pl-0 basis-1/4 cursor-pointer" @click="onThumbClick(index)">
                    <div class="p-1" :class="index === selectedIndex ? '' : 'opacity-50'">
                        <Card>
                            <CardContent class="flex aspect-[4/5] items-center justify-center p-1 rounded-[5px]">
                                <img class="aspect-[4/5] rounded-[5px]" :src="product.image"
                                    :alt="`Imagen de ${product.name}`">
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>
</template>