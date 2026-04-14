import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth = getAuth(app);

export const loginAnonimo = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Usuario anónimo:", userCredential.user.uid);
  } catch (error) {
    console.error("Error en login anónimo:", error);
  }
};

export const observarAuth = (callback: any) => {
  return onAuthStateChanged(auth, callback);
};