import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import {
  actualizarNota,
  crearNota,
  eliminarNota,
  escucharNotas
} from "../firebase/firestore";
import NotaItem from "../components/NotaItem";

export default function Index() {
  const [notas, setNotas] = useState<any[]>([]);
  const [nuevoTexto, setNuevoTexto] = useState("");

  useEffect(() => {
    const unsubscribe = escucharNotas(setNotas);
    return unsubscribe;
  }, []);

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