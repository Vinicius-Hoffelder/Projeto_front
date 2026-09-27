import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes/routes";

const theme = {
  ...MD3LightTheme,
  colors: { ...MD3LightTheme.colors, primary: "#184E45", secondary: "#A35422", background: "#F6F7F4", surface: "#FFFFFF" },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Routes />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
