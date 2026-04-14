import { useEffect, useState } from "react";
import { Button, FlatList,   TextInput, View } from "react-native";
import { crearNota, escucharNotas } from "../firebase/firestore";
import NotaItem from "../components/NotaItem";
import { observarAuth } from "../firebase/auth";

export default function Index() {
  const [notas, setNotas] = useState<any[]>([]);
  const [nuevoTexto, setNuevoTexto] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = observarAuth((usuario: { uid: any; }) => {
      if (usuario) {
        console.log("Usuario listo:", usuario.uid);
        setUser(usuario);
      }
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribeNotas = escucharNotas(user.uid, setNotas);

    return unsubscribeNotas;
  }, [user]);

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