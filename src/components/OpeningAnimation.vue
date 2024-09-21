<template>
    <div v-if="showAnimation" class="overlay">
        <div class="door left-door">
            <div class="door-content">
                <!-- Puedes agregar un logo o texto aquí -->
                <h1>
                    <a href="https://www.instagram.com/eskuz_loratu/" target="_blank" aria-label="Instagram">
                        @ESKUZ_LORATU
                    </a>
                </h1>
            </div>
        </div>
        <div class="door right-door">
            <div class="door-content">
                <!-- Puedes agregar un logo o texto aquí -->
                <h1>Ongi Etorri</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OpeningAnimation',
    data() {
        return {
            showAnimation: true,
        };
    },
    mounted() {
        // Ocultar la animación después de la duración de la animación CSS
        const body = document.body;
        body.style.overflow = 'hidden';
        setTimeout(() => {
            this.showAnimation = false;
            body.style.overflow = 'auto';

        }, 3000); // Duración de la animación en milisegundos
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.door {
    width: 100%;
    height: 50%;
    background: rgba(255, 255, 255, 0.1);
    /* Fondo semi-transparente */
    backdrop-filter: blur(7px);
    /* Aplica el desenfoque al contenido de fondo */
    -webkit-backdrop-filter: blur(7px);
    /* Compatibilidad con Safari */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.left-door {
    animation: openLeftDoor 3.2s forwards;
}

.right-door {
    animation: openRightDoor 3.2s forwards;
}

.door-content {
    font-family: var(--font-family-primary);
    font-size: 36px;
    text-align: center;

    h1,
    h1 a {
        color: var(--color-gris-oscuro);
        font-size: 90%;
    }
}

@keyframes openLeftDoor {

    0%,
    40% {
        transform: translateY(0%);
    }

    100% {
        transform: translateY(-100%);
    }
}

@keyframes openRightDoor {

    0%,
    40% {
        transform: translateY(0%);
    }

    100% {
        transform: translateY(100%);
    }
}
</style>
