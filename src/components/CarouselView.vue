<script setup lang="ts">
import { ref } from 'vue'
import { watchOnce } from '@vueuse/core'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});

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
                                <img class="aspect-[4/5] rounded-[5px]" :src="product.image"
                                    :alt="`Imagen de ${product.name}`">
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