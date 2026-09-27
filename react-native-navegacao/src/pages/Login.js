import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, HelperText, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenticate, errorMessage } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(null);
  useEffect(() => () => request.current?.abort(), []);

  async function entrar() {
    if (request.current) return;
    if (!username.trim() || !password.trim()) {
      setError("Preencha o usuário e a senha para continuar.");
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError("");
    try {
      const session = await authenticate(username, password, controller.signal);
      if (!controller.signal.aborted) signIn(session);
    } catch (reason) {
      if (!controller.signal.aborted) setError(errorMessage(reason));
    } finally {
      request.current = null;
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.body}>
            <View style={styles.brand}><Avatar.Icon size={64} icon="shopping-outline" /><Text variant="titleLarge" style={styles.brandText}>Vitrine</Text></View>
            <Text variant="displaySmall" style={styles.title}>Seu próximo achado começa aqui.</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>Explore produtos, descubra categorias e veja cada detalhe.</Text>
            <View style={styles.form}>
              <Text variant="headlineSmall" style={styles.formTitle}>Entre na sua conta</Text>
              <Text variant="bodyMedium" style={styles.help}>Use um usuário existente na Fake Store API.</Text>
              <TextInput mode="outlined" label="Usuário (username)" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} autoComplete="username" disabled={loading} style={styles.input} />
              <TextInput mode="outlined" label="Senha (password)" value={password} onChangeText={setPassword} secureTextEntry={hidden} autoCapitalize="none" autoCorrect={false} autoComplete="current-password" disabled={loading} returnKeyType="go" onSubmitEditing={entrar} right={<TextInput.Icon icon={hidden ? "eye-outline" : "eye-off-outline"} accessibilityLabel={hidden ? "Mostrar senha" : "Ocultar senha"} onPress={() => setHidden(!hidden)} />} style={styles.input} />
              {!!error && <HelperText type="error" visible accessibilityLiveRegion="polite">{error}</HelperText>}
              <Button mode="contained" onPress={entrar} disabled={loading} contentStyle={styles.button} style={styles.submit}>Entrar</Button>
              {loading && <View style={styles.loading}><ActivityIndicator color="#184E45" /><Text>Verificando sua conta…</Text></View>}
            </View>
            <Text style={styles.footnote}>Catálogo acadêmico • Fake Store API</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7F4" },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  body: { width: "100%", maxWidth: 480, alignSelf: "center" },
  brand: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 28 },
  brandText: { color: "#184E45", fontWeight: "800" },
  title: { fontWeight: "800", color: "#173B32", marginBottom: 12 },
  subtitle: { color: "#5D6962", lineHeight: 25, marginBottom: 28 },
  form: { backgroundColor: "#FFFFFF", padding: 20, borderRadius: 24, borderWidth: 1, borderColor: "#DEE4DE" },
  formTitle: { fontWeight: "700" },
  help: { marginTop: 8, marginBottom: 14, color: "#5D6962" },
  input: { marginBottom: 12, backgroundColor: "#FFFFFF" },
  button: { minHeight: 50 },
  submit: { marginTop: 8 },
  loading: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", gap: 10, marginTop: 16 },
  footnote: { textAlign: "center", color: "#5D6962", marginTop: 24 },
});
