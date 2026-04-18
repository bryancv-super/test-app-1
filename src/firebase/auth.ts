import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged 
} from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth = getAuth(app);

// Logica correcta: observar + auth login
export const initAuth = (callback: any) => {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("No hay usuario → login anónimo");
      await signInAnonymously(auth);
    } else {
      console.log("Usuario listo:", user.uid);
      callback(user);
    }
  });
};