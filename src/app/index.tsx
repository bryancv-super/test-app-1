import { useEffect, useState } from "react";
import { Button, FlatList, TextInput, View, Text } from "react-native";
import { crearNota, escucharNotas } from "../firebase/firestore";
import NotaItem from "../components/NotaItem";
import { initAuth } from "../firebase/auth";

export default function Index() {
  const [notas, setNotas] = useState<any[]>([]);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = initAuth((usuario: any) => {
      setUser(usuario);
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    if (!user) return;

    const unsubscribeNotas = escucharNotas(user.uid, setNotas);

    return unsubscribeNotas;
  }, [user]);

  
  if (!user) {
    return <Text>Cargando auth...</Text>;
  }


  return (
    <View style={{ marginTop: 50, padding: 10 }}>

      <TextInput
        placeholder="Nueva nota..."
        value={nuevoTexto}
        onChangeText={setNuevoTexto}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button
        title="Agregar"
        onPress={() => {
          if (!nuevoTexto.trim()) return;
          crearNota(nuevoTexto);
          setNuevoTexto("");
        }}
      />
      
        <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotaItem item={item} />}
      />
    </View>
  );
}