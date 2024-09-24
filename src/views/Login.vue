<script setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import { useAuth } from "@/services/authFirebase";

const router = useRouter()

const { signIn, errorCodes } = useAuth();

// Formulario reactivo
const formData = reactive({
    email: "",
    password: "",
});

const successMessage = ref("");
const errorMessage = ref("");

// Expresión regular para validar el formato del email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función de validación de campos
const validateForm = () => {
    if (!formData.email) {
        errorMessage.value = "El email es obligatorio.";
        return false;
    }
    if (!emailPattern.test(formData.email)) {
        errorMessage.value = "El email no tiene un formato válido.";
        return false;
    }
    if (!formData.password) {
        errorMessage.value = "La contraseña es obligatoria.";
        return false;
    }
    if (formData.password.length < 6) {
        errorMessage.value = "La contraseña debe tener al menos 6 caracteres.";
        return false;
    }

    // Si todo es válido, borrar el mensaje de error
    errorMessage.value = "";
    return true;
};

// Función para enviar el formulario
const submitForm = async () => {
    if (validateForm()) {
        try {
            const user = await signIn(formData.email, formData.password);
            console.log(user);
            router.push({ name: 'addJewel' })
            successMessage.value = "Formulario enviado con éxito.";
            resetForm();

        } catch (error) {
            errorMessage.value = errorCodes[error.code]
            setTimeout(() => {
                errorMessage.value = ''
            }, 3000)
        }
    }
};

// Función para limpiar el formulario después de enviar
const resetForm = () => {
    Object.assign(formData, {
        email: "",
        password: ""
    });

}
</script>

<template>
    <main>

        <h1>Formulario de Acceso</h1>
        <router-link :to="{ name: 'home' }">Volver</router-link>
        <form @submit.prevent="submitForm" class="formulario">
            <!-- Campo de email -->
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email" placeholder="ejemplo@gmail.com" required />
            </div>

            <!-- Campo de contraseña -->
            <div class="form-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="formData.password" placeholder="Contraseña" minlength="6"
                    required />
            </div>

            <button type="submit" class="button-primary">Enviar</button>
        </form>

        <!-- Mostrar mensaje de éxito o error -->
        <p v-if="successMessage" class="mensaje-exito">{{ successMessage }}</p>
        <p v-if="errorMessage" class="mensaje-error">{{ errorMessage }}</p>
    </main>
</template>

<style scoped>
/* Título */
main {
    padding: 2rem;
}

h1 {
    margin-bottom: 20px;
    text-align: center;
}

/* Enlace de volver */
a {
    display: inline-block;
    margin-bottom: 20px;
    color: var(--color-turquesa);
    font-weight: 500;
}

a:hover {
    text-decoration: underline;
}

/* Estilos del formulario */
.formulario {
    display: flex;
    flex-direction: column;
    background-color: var(--color-blanco);
    padding: 3rem;
    border-radius: 5px;
    box-shadow: 0 0 10px var(--color-gris-claro);
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    display: block;
}

input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid var(--color-gris-claro);
    border-radius: 5px;
    background-color: var(--color-fondo);
    color: var(--color-gris-oscuro);
}

input::placeholder {
    color: #ccc;
}

input:focus {
    outline: none;
    border-color: var(--color-turquesa);
}

/* Botón */
button.button-primary,
a {
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    background-color: var(--color-turquesa);
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.button-primary:hover,
a:hover {
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
</style>
