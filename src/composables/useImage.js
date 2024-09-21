// useImage.js
import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uid } from "uid";

export default function useImage() {
	const storage = useFirebaseStorage();
	const url = ref(null);
	const uploading = ref(false);
	const error = ref(null);

	const onFileChange = (e) => {
		const file = e.target.files[0];
		const fileName = uid() + "-" + file.name; // Nombre único para el archivo
		const sRef = storageRef(storage, `/products/${fileName}`);

		uploading.value = true; // Iniciar estado de carga
		error.value = null; // Resetear error

		// Subir el archivo
		const uploadTask = uploadBytesResumable(sRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Puedes manejar el progreso aquí si lo deseas
			},
			(err) => {
				console.error("Error al subir la imagen:", err);
				error.value = "Error al subir la imagen. Por favor, intenta nuevamente.";
				uploading.value = false; // Finalizar estado de carga en caso de error
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					url.value = downloadURL;
					uploading.value = false; // Finalizar estado de carga
				});
			}
		);
	};

	const isImageUploaded = computed(() => !!url.value);

	return {
		onFileChange,
		url,
		isImageUploaded,
		uploading,
		error,
	};
}
