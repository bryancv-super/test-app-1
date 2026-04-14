//Imports from firestore
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc, where
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { auth } from "./auth"; //To authenticate user operations

export const db = getFirestore(app);

//Create note
export const crearNota = async (texto: string) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.log("No hay usuario");
      return;
    }

    const docRef = await addDoc(collection(db, "notas"), {
      texto,
      fecha: serverTimestamp(),
      userId: user.uid,
    });

    console.log("Documento creado con ID:", docRef.id);
  } catch (error) {
    console.error("Error creando nota:", error);
  }
};

//Read note
export const escucharNotas = (uid: string, callback: any) => {
  const q = query(
    collection(db, "notas"),
    where("userId", "==", uid),
    orderBy("fecha", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const notas: any[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.fecha) return;

      notas.push({
        id: doc.id,
        ...data,
      });
    });

    callback(notas);
  });

  return unsubscribe;
};
//Update note
export const actualizarNota = async (id: string, nuevoTexto: string) => {
  try {
    const ref = doc(db, "notas", id);

    await updateDoc(ref, {
      texto: nuevoTexto,
    });

    console.log("Nota actualizada");
  } catch (error) {
    console.error("Error actualizando:", error);
  }
};

//Delete note
export const eliminarNota = async (id: string) => {
  try {
    const ref = doc(db, "notas", id);

    await deleteDoc(ref);

    console.log("Nota eliminada");
  } catch (error) {
    console.error("Error eliminando:", error);
  }
};