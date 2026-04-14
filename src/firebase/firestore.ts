import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

export const db = getFirestore(app);

export const crearNota = async (texto: string) => {
  try {
    const docRef = await addDoc(collection(db, "notas"), {
      texto,
      fecha: Date.now(),
    });

    console.log("Documento creado con ID:", docRef.id);
  } catch (error) {
    console.error("Error creando nota:", error);
  }
};