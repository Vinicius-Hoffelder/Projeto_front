import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Home from "../pages/Home";
import DetalheProduto from "../pages/DetalheProduto";
import InformacoesGrupo from "../pages/InformacoesGrupo";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { session, signOut } = useAuth();
  return (
    <Stack.Navigator id="AppStack" screenOptions={{ headerTitleAlign: "center", headerTintColor: "#184E45", headerStyle: { backgroundColor: "#FFFFFF" }, headerShadowVisible: false, headerBackTitle: "Voltar", contentStyle: { backgroundColor: "#F6F7F4" } }}>
      {session ? (
        <Stack.Group>
          <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
            title: "Produtos",
            headerLeft: () => <IconButton icon="logout" accessibilityLabel="Sair da conta" onPress={signOut} />,
            headerRight: () => <IconButton icon="information-outline" accessibilityLabel="Informações do grupo" onPress={() => navigation.navigate("InformacoesGrupo")} />,
          })} />
          <Stack.Screen name="DetalheProduto" component={DetalheProduto} options={{ title: "Detalhes do produto" }} />
          <Stack.Screen name="InformacoesGrupo" component={InformacoesGrupo} options={{ title: "Informações do Grupo" }} />
        </Stack.Group>
      ) : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />}
    </Stack.Navigator>
  );
}
