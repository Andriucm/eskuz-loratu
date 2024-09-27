<script setup>
import { ref } from 'vue'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import Autoplay from 'embla-carousel-autoplay'

const autoPlay = Autoplay({
    delay: 1000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
})

// Definir las propiedades que recibirá el componente
const props = defineProps({
    products: {
        type: Array,
        required: true
    }
});


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


</script>

<template>
    <div class="carousel">

        <Carousel @mouseenter="autoPlay.stop" class="relative w-full" :opts="{
            align: 'start',
            loop: true,
            rewind: true,
            perPage: 3,
            perMove: 1,
            pagination: 'fraction',
        }" :plugins="[autoPlay]">
            <CarouselContent>
                <CarouselItem v-for="(product, index) in props.products" :key="index" class="basis-1/3">
                    <div class="p-1">
                        <Card>
                            <CardContent @click="openLightbox(product.image)"
                                class="flex aspect-[4/5] items-center justify-center p-2 rounded-[5px]">
                                <img class="aspect-[4/5] rounded-[5px]" :src="product.image"
                                    :alt="`Imagen de ${product.name}`">
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </div>

    <Lightbox :image="selectedImage" :visible="visible" @close="closeLightbox" />

</template>

<style scoped>
.carousel {
    width: 100%;
}
</style>
