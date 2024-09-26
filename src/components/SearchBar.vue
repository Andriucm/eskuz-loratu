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
    width: 300px;
}

.search-container input {
    background: transparent;
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 1rem;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: var(--font-size-p);
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-regular);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    color: var(--color-gris-oscuro);
}

.search-container input:focus {
    border-color: var(--color-gris-oscuro);
    box-shadow: 0 0 5px var(--color-gris-oscuro);
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
