<template>
    <div v-if="showAnimation" class="overlay">
        <!-- Puertas -->
        <div class="door left-door"></div>
        <div class="door right-door"></div>

        <!-- Contenido de Texto sobre las puertas -->
        <div class="text-content container">
            <h2>
                <a href="https://www.instagram.com/eskuz_loratu/" target="_blank" aria-label="Instagram">
                    @ESKUZ_LORATU
                </a>
            </h2>
            <h2>Ongi Etorri</h2>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Estado reactivo para controlar la visibilidad de la animación
const showAnimation = ref(true);

// Función para ocultar la animación después de que las animaciones CSS hayan terminado
const hideAnimation = () => {
    showAnimation.value = false;
    document.body.style.overflow = 'auto';
};

onMounted(() => {
    // Prevenir el scroll mientras la animación está activa
    document.body.style.overflow = 'hidden';

    // Establecer un timeout para ocultar la animación después de la duración total
    // Total tiempo:
    // 1.5s (puertas abriendo) +
    // 1s (texto apareciendo) +
    // 1s (texto visible) +
    // 1s (texto y overlay desvaneciendo) = 4.5s
    setTimeout(hideAnimation, 4500); // 4.5 segundos para sincronizar con las animaciones
});

onUnmounted(() => {
    // Asegurarse de restaurar el scroll en caso de que el componente se destruya prematuramente
    document.body.style.overflow = 'auto';
});
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f4f8;
    overflow: hidden;
    /* Animación de entrada y salida del overlay */
    animation: fadeInOutOverlay 4.5s ease-in-out forwards;
}

.door {
    position: absolute;
    width: 100%;
    height: 50%;
    background: rgba(232, 248, 246, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform-origin: center;
}

/* Animación para la puerta izquierda (superior) */
.left-door {
    top: 0;
    left: 0;
    animation: openLeftDoor 1.5s ease-in-out forwards;
}

/* Animación para la puerta derecha (inferior) */
.right-door {
    bottom: 0;
    left: 0;
    animation: openRightDoor 1.5s ease-in-out forwards;
}

/* Contenido de Texto sobre las puertas */
.text-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    /* Asegura que el texto esté por encima de las puertas */
    text-align: center;
    opacity: 0;
    animation: fadeInOutText 4.5s ease-in-out forwards;
    animation-delay: 1s;
    /* Inicia después de que las puertas empiezan a abrirse */
}

.text-content h2 {
    font-family: var(--font-family-primary);
    color: var(--color-gris-oscuro, #333);
    margin: 0.5rem 0;
}

.text-content h2 a {
    color: inherit;
    text-decoration: none;
}

.text-content h2 a:hover {
    text-decoration: underline;
}

/* Animaciones clave */

/* Fade in y fade out del overlay */
@keyframes fadeInOutOverlay {
    0% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

/* Apertura de la puerta izquierda (superior) hacia arriba */
@keyframes openLeftDoor {
    0% {
        transform: translateY(0%);
    }

    100% {
        transform: translateY(-100%);
    }
}

/* Apertura de la puerta derecha (inferior) hacia abajo */
@keyframes openRightDoor {
    0% {
        transform: translateY(0%);
    }

    100% {
        transform: translateY(100%);
    }
}

/* Fade in y fade out del contenido de texto */
@keyframes fadeInOutText {
    0% {
        opacity: 0;
        transform: translate(-50%, -60%);
    }

    10% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }

    80% {
        opacity: 1;
        transform: translate(-50%, -50%);
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -40%);
    }
}


</style>
