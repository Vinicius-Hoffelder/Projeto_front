import { ScrollView, StyleSheet, View } from "react-native";
import { Chip, Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductImage from "../components/ProductImage";
import RequestState from "../components/RequestState";
import useApi from "../hooks/useApi";
import { categoryLabel, formatPrice } from "../utils/products";

export default function DetalheProduto({ route }) {
  const { data: product, loading, error, retry } = useApi("product", route.params?.id);
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      {loading || error || !product ? <RequestState loading={loading} message={error || "Produto não encontrado."} onRetry={retry} /> : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageArea}><ProductImage uri={product.image} title={product.title} style={styles.image} /></View>
          <Chip style={styles.category}>{categoryLabel(product.category)}</Chip>
          <Text variant="headlineSmall" style={styles.title}>{product.title}</Text>
          <Text variant="headlineMedium" style={styles.price}>{formatPrice(product.price)}</Text>
          <Divider style={styles.divider} />
          <Text variant="titleLarge" style={styles.heading}>Sobre o produto</Text>
          <Text variant="bodyLarge" style={styles.description}>{product.description}</Text>
          <Text style={styles.note}>Informações fornecidas pela Fake Store API.</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7F4" },
  container: { padding: 24, paddingBottom: 40, width: "100%", maxWidth: 640, alignSelf: "center" },
  imageArea: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 24, marginBottom: 24 },
  image: { width: "100%", height: 280 },
  category: { alignSelf: "flex-start", backgroundColor: "#D8EBDD", marginBottom: 16 },
  title: { fontWeight: "700", color: "#173B32", lineHeight: 32 },
  price: { fontWeight: "800", color: "#184E45", marginTop: 20 },
  divider: { marginVertical: 24 },
  heading: { fontWeight: "700", marginBottom: 12 },
  description: { color: "#46554D", lineHeight: 27 },
  note: { color: "#5D6962", marginTop: 28, fontSize: 12 },
});
