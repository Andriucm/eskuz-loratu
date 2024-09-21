import { ref } from "vue";
import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, query, getDocs, addDoc } from "firebase/firestore";

export const useProductsStore = defineStore("products", () => {
	const db = useFirestore();
	const products = ref([]);
	const loading = ref(false);

	async function createProduct(product) {
		await addDoc(collection(db, "products"), product);
	}

	// Método para obtener productos
	const getProducts = async () => {
		loading.value = true; // Iniciar estado de carga
		try {
			const querySnapshot = await getDocs(query(collection(db, "products")));
			products.value = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
		} catch (error) {
			console.error("Error al obtener productos:", error);
		} finally {
			loading.value = false; // Finalizar estado de carga
		}
	};

	return {
		products,
		loading,
		getProducts,
		createProduct,
	};
});
