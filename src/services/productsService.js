import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export async function fetchProductos() {
  try {
    const ref = collection(db, "productos"); // <--- Nombre correcto
    const snapshot = await getDocs(ref);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
}
