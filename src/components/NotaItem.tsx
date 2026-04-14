import { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { actualizarNota, eliminarNota } from "../firebase/firestore";

export default function NotaItem({ item }: any) {
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
}