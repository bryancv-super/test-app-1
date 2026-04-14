import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
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

export const escucharNotas = (callback: any) => {
  const unsubscribe = onSnapshot(collection(db, "notas"), (snapshot) => {
    const notas: any[] = [];

    snapshot.forEach((doc) => {
      notas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    callback(notas);
  });

  return unsubscribe;
};