import { useEffect } from "react";
import { View, Text } from "react-native";
import { loginAnonimo, observarAuth } from "../firebase/auth";

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
    <View>
      <Text>App con Firebase</Text>
    </View>
  );
}