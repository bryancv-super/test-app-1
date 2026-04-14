import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import {
  actualizarNota,
  crearNota,
  eliminarNota,
  escucharNotas
} from "../firebase/firestore";

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
        renderItem={({ item }) => {
          const [editando, setEditando] = useState(false);
          const [textoEditado, setTextoEditado] = useState(item.texto);

          return (
            <View style={{ marginVertical: 10, borderBottomWidth: 1 }}>

              {editando ? (
                <TextInput
                  value={textoEditado}
                  onChangeText={setTextoEditado}
                  style={{ borderWidth: 1, padding: 5 }}
                />
              ) : (
                <Text>{item.texto}</Text>
              )}

              <Text>
                {item.fecha?.toDate().toLocaleString()}
              </Text>

              {editando ? (
                <Button
                  title="Guardar"
                  onPress={() => {
                    actualizarNota(item.id, textoEditado);
                    setEditando(false);
                  }}
                />
              ) : (
                <Button
                  title="Editar"
                  onPress={() => setEditando(true)}
                />
              )}

              <Button
                title="Eliminar"
                onPress={() => eliminarNota(item.id)}
              />

            </View>
          );
        }}
      />
    </View>
  );
}