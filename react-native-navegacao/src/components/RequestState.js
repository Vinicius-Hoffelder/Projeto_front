import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function RequestState({ loading = false, message = "", onRetry = undefined }) {
  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      {loading && <ActivityIndicator size="large" color="#184E45" accessibilityLabel="Carregando" />}
      <Text style={styles.text}>{loading ? "Carregando produtos…" : message}</Text>
      {!loading && onRetry && <Button mode="contained" onPress={onRetry}>Tentar novamente</Button>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 28, gap: 16, minHeight: 220 },
  text: { textAlign: "center", color: "#505D58", lineHeight: 22 },
});
