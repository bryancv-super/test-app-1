import { useEffect } from "react";
import { loginAnonimo, observarAuth } from "../firebase/auth";
import { View, Text, Button } from "react-native";
import { crearNota } from "../firebase/firestore";

export default function Index() {

  useEffect(() => {
    const unsubscribe = observarAuth((user: { uid: any; }) => {
      if (user) {
        console.log("Ya está logueado:", user.uid);
      } else {
        loginAnonimo();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Firebase CRUD</Text>

      <Button
        title="Crear nota"
        onPress={() => crearNota("Hola desde React Native")}
      />
    </View>
  );
}