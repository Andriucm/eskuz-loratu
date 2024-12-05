import { ref } from "vue";
import { defineStore } from "pinia";
import { useFirestore } from "vuefire";
import { collection, query, getDocs, addDoc, limit, orderBy, startAfter } from "firebase/firestore";

export const useProductsStore = defineStore("products", () => {
	const db = useFirestore();
	const products = ref([]);
	const loading = ref(false);

	const lastVisible = ref(null);
	const hasMore = ref(true);

	async function createProduct(product) {
		await addDoc(collection(db, "products"), product);
	}

	// Método para obtener productos
	const getProducts = async () => {
		if (loading.value || !hasMore.value) return;

		loading.value = true;
		try {
			let productQuery;
			if (lastVisible.value) {
				productQuery = query(
					collection(db, "products"),
					orderBy("price", "desc"), 
					startAfter(lastVisible.value),
					limit(9)
				);
			} else {
				productQuery = query(
					collection(db, "products"),
					orderBy("price", "desc"), 
					limit(9)
				);
			}

			const snapshot = await getDocs(productQuery);

			if (!snapshot.empty) {
				const newProducts = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				products.value = [...products.value, ...newProducts];
				lastVisible.value = snapshot.docs[snapshot.docs.length - 1];

				if (snapshot.docs.length < 9) {
					hasMore.value = false;
				}
			} else {
				hasMore.value = false;
			}
		} catch (error) {
			console.error("Error al obtener productos:", error);
		} finally {
			loading.value = false;
		}
	};

	return {
		products,
		loading,
		getProducts,
        createProduct,
        hasMore
	};
});
