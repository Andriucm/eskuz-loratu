<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="search-container">
        <input type="text" placeholder="Bitxiar topatu..." :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" aria-label="Buscar productos" />
        <i class="fas fa-search search-icon"></i>
    </div>
</template>

<style scoped>
.search-container {
    position: relative;
    width: 100%;
}

.search-container input {
    background: transparent;
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    outline: none;
    border: none;
    font-size: var(--font-size-p);
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
    color: var(--color-gris-oscuro);
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;
}

.search-container input:focus {
    border-bottom-color: var(--color-gris-oscuro);
    transform-origin: left;
    transform: scaleX(1);
    transition: all 0.3s ease;
}

.search-container input::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: var(--color-gris-oscuro);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

.search-container input:focus::before {
    transform: scaleX(1);
}

.search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    stroke: var(--color-gris-medio);
    pointer-events: none;
}
</style>
