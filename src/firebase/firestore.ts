import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { app } from "./firebaseConfig";

export const db = getFirestore(app);

export const crearNota = async (texto: string) => {
  try {
    const docRef = await addDoc(collection(db, "notas"), {
      texto,
      fecha: serverTimestamp(),
    });

    console.log("Documento creado con ID:", docRef.id);
  } catch (error) {
    console.error("Error creando nota:", error);
  }
};

export const escucharNotas = (callback: any) => {
  const q = query(
    collection(db, "notas"),
    orderBy("fecha", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notas: any[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      if (!data.fecha) return;

      notas.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    callback(notas);
  });

  return unsubscribe;
};