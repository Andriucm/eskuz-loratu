<script setup>
import { ref, reactive } from "vue";
import { useProductsStore } from "@/stores/products";
import useImage from "@/composables/useImage.js";

const {
    onFileChange,
    url,
    isImageUploaded,
    uploading,
    error: imageError,
} = useImage();

const productStore = useProductsStore();
const allowedFormatsForInput = "image/jpeg,image/png,image/jpg,image/webp";

const formData = reactive({
    name: "",
    price: 0,
    description: "",
    link: "",
    image: null,
    category: 0
});

const successMessage = ref("");
const errorMessage = ref("");

// Función para manejar el cambio de archivo y actualizar formData.image
const handleFileChange = (e) => {
    formData.image = e.target.files[0];
    onFileChange(e); // Llama a la función para subir la imagen
};

// Función de validación de campos
const validateForm = () => {
    if (!formData.name) {
        errorMessage.value = "El nombre es obligatorio.";
        return false;
    }
    if (formData.name.length < 2) {
        errorMessage.value = "El nombre es muy corto.";
        return false;
    }
    if (!formData.price || formData.price <= 0) {
        errorMessage.value = "El precio debe ser mayor que 0.";
        return false;
    }
    if (!formData.category || formData.category === 0) {
        errorMessage.value = "Selecciona una categoria para la joya"
    }

    if (!formData.description) {
        errorMessage.value = "La descripción es obligatoria.";
        return false;
    }
    if (!formData.link) {
        errorMessage.value = "El link es obligatorio.";
        return false;
    }
    if (!formData.image) {
        errorMessage.value = "Debes seleccionar una imagen.";
        return false;
    }

    // Validar formato de la imagen
    const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
    ];

    if (!allowedFormats.includes(formData.image.type)) {
        errorMessage.value = "La imagen debe ser JPEG, PNG, JPG o WEBP.";
        return false;
    }

    // Si todo es válido, borrar el mensaje de error
    errorMessage.value = "";
    return true;
};

// Función para enviar el formulario
const submitForm = async () => {
    if (validateForm()) {
        // Verificar si la imagen se ha subido correctamente
        if (!url.value) {
            errorMessage.value = "La imagen aún no se ha subido. Por favor, espera.";
            return;
        }

        const { image, ...values } = formData;
        // Añadir la fecha de creación
        values.createdAt = new Date().toISOString();

        try {
            await productStore.createProduct({ ...values, image: url.value });
            successMessage.value = "Joya añadida correctamente";
            resetForm();
        } catch (error) {
            errorMessage.value = "Error al añadir la joya. Por favor, intenta nuevamente.";
            console.error("Error en submitForm:", error);
        }
    }
};

// Función para limpiar el formulario después de añadir la joya
const resetForm = () => {
    formData.name = "";
    formData.price = 0;
    formData.description = "";
    formData.link = "";
    formData.image = null;
    url.value = null;
    formData.value = 0;
};
</script>

<template>
    <main class="container">
        <h1>Añadir Joya</h1>
        <router-link :to="{ name: 'home' }">Volver</router-link>

        <form @submit.prevent="submitForm" class="formulario">
            <!-- Nombre de la joya -->
            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="formData.name" placeholder="Ej. Udazkena" />
            </div>

            <!-- Precio de la joya -->
            <div class="form-group">
                <label for="price">Precio:</label>
                <input type="number" id="price" v-model="formData.price" min="0" step="1" />
            </div>

            <div class="form-group">
                <label for="category">Categoria:</label>
                <select name="category" id="category" v-model="formData.category">
                    <option value="0" disabled>Selecciona una categoria</option>
                    <option value="1">Pendiente</option>
                    <option value="2">Anillo</option>
                    <option value="3">Pulsera</option>
                    <option value="4">Collar</option>
                </select>
            </div>

            <!-- Descripción de la joya -->
            <div class="form-group">
                <label for="description">Descripción:</label>
                <textarea id="description" v-model="formData.description"
                    placeholder="Ej. Descripción del producto..."></textarea>
            </div>
            <!-- Url de la joya -->
            <div class="form-group">
                <label for="link">Link de instagram:</label>
                <input type="text" v-model="formData.link" placeholder="Ej. link de Instagram">
            </div>

            <!-- Imagen de la joya -->
            <div class="form-group">
                <label for="image">Imagen:</label>
                <input type="file" id="image" @change="handleFileChange" :accept="allowedFormatsForInput" />
            </div>

            <!-- Mostrar progreso de subida de imagen -->
            <div v-if="uploading" class="uploading">
                <p>Subiendo imagen...</p>
            </div>

            <!-- Mostrar imagen subida -->
            <div v-if="isImageUploaded" class="image-preview">
                <p>Imagen del producto {{ formData.name }}:</p>
                <img :src="url" :alt="'Imagen de ' + formData.name" />
            </div>

            <!-- Botón para añadir la joya -->
            <button type="submit" class="button-primary" :disabled="!isImageUploaded || uploading">
                Añadir Joya
            </button>
        </form>

        <!-- Mostrar mensaje de éxito o error -->
        <p v-if="successMessage" class="mensaje-exito">{{ successMessage }}</p>
        <p v-if="errorMessage" class="mensaje-error">{{ errorMessage }}</p>
        <p v-if="imageError" class="mensaje-error">{{ imageError }}</p>
    </main>
</template>

<style scoped>
/* Contenedor principal */
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

/* Título */
h1 {
    margin-bottom: 20px;
    text-align: center;
}

/* Enlace de volver */
a {
    display: inline-block;
    margin-bottom: 20px;
    color: var(--color-turquesa);
    font-weight: var(--font-weight-medium);
}

a:hover {
    text-decoration: underline;
}

/* Estilos del formulario */
.formulario {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-family: var(--font-family-secondary);
    font-size: 16px;
    font-weight: var(--font-weight-medium);
    color: var(--color-gris-oscuro);
    margin-bottom: 8px;
    display: block;
}

input[type="text"],
input[type="number"],
input[type="file"],
textarea {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-family: var(--font-family-secondary);
    border: 1px solid var(--color-gris-medio);
    border-radius: 5px;
    background-color: var(--color-blanco);
    color: var(--color-gris-oscuro);
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="file"]:focus,
textarea:focus {
    outline: none;
    border-color: var(--color-turquesa);
}

textarea {
    resize: vertical;
    min-height: 100px;
}

/* Botón */
button.button-primary {
    align-self: flex-end;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: var(--font-weight-medium);
    border-radius: 5px;
    width: 100%;
}

button.button-primary:disabled {
    background-color: var(--color-gris-medio);
    cursor: not-allowed;
}

button.button-primary:hover:not(:disabled) {
    background-color: var(--color-oro-metalico);
}

/* Mensajes */
.mensaje-exito {
    color: green;
    margin-top: 20px;
}

.mensaje-error {
    color: red;
    margin-top: 20px;
}

/* Imagen de previsualización */
.image-preview {
    margin-bottom: 20px;
}

.image-preview img {
    max-width: 100%;
    height: auto;
    border: 1px solid var(--color-gris-claro);
    border-radius: 5px;
}

/* Subiendo imagen */
.uploading p {
    font-style: italic;
    color: var(--color-gris-medio);
}
</style>
