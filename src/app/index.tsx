import { useEffect, useState } from "react";
import { loginAnonimo, observarAuth } from "../firebase/auth";
import { View, Text, Button, FlatList } from "react-native";
import { crearNota, escucharNotas } from "../firebase/firestore";

export default function Index() {
  const [notas, setNotas] = useState<any[]>([]);

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

  useEffect(() => {
    const unsubscribe = escucharNotas((data: any[]) => {
      setNotas(data);
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

      <Text>Notas:</Text>

      <Button
        title="Crear nota"
        onPress={() => crearNota("Otra nota 🔥")}
      />

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {item.texto} - {item.fecha}
          </Text>
        )}
      />
    </View> 
  );
}