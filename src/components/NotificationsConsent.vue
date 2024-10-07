<script setup>
import { ref, onMounted } from 'vue';
import { requestNotificationPermission } from '@/config/firebase';

// Variable para controlar la visibilidad del modal
const showConsentDialog = ref(false);

// Mostrar el diálogo al montar el componente
onMounted(() => {
    const permission = Notification.permission;
    if (permission !== "granted" ) {
        // setTimeout(() => {
            showConsentDialog.value = true;
        // }, 15000)
    }
});

// Función para aceptar las notificaciones
const handleAccept = async () => {
    showConsentDialog.value = false;
    const token = await requestNotificationPermission();
    if (token) {
        console.log('Notificaciones activadas con el token:', token);
        // Aquí puedes guardar el token en tu backend si es necesario
    } else {
        console.log('Permiso de notificaciones no concedido o error al obtener el token.');
    }
};

// Función para rechazar las notificaciones
const handleDecline = () => {
    showConsentDialog.value = false;
};
</script>
<!-- NotificationsConsent.vue -->
<template>
    <div v-if="showConsentDialog" class="modal">
        <div class="modal-content">
            <h2>¿Te gusta la página?</h2>
            <p>Acepta las notificaciones para recibir un mensaje cada vez que se publique una nueva joya nueva. <span>No
                    te vasa a arrepentir ;)</span></p>
            <button class="button-secondary" @click="handleDecline">Rechazar</button>
            <button class="button-primary" @click="handleAccept">Aceptar</button>
        </div>
    </div>
</template>


<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 95%;
    text-align: center;
}

.button-primary {
    background: var(--color-actions);
    color: white;
    padding: 10px 20px;
    border: none;
    margin: 10px;
    cursor: pointer;
    transition: background 0.3s;
}

.button-primary:hover {
    background: var(--color-oro-metalico);
}

.button-secondary {
    background: var(--color-gris-medio);
    color: white;
    padding: 10px 20px;
    border: none;
    margin: 10px;
    cursor: pointer;
}

.button-secondary:hover {
    background: var(--color-gris-oscuro);
}
</style>
