import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import ProductImage from "./ProductImage";
import { categoryLabel, formatPrice } from "../utils/products";

export default function CardProduto({ product, onPress }) {
  return (
    <Card mode="outlined" style={styles.card} onPress={onPress} accessibilityLabel={`${product.title}, ${formatPrice(product.price)}. Ver detalhes`} accessibilityRole="button">
      <View style={styles.imageArea}><ProductImage uri={product.image} title={product.title} style={styles.image} /></View>
      <Card.Content style={styles.content}>
        <Text variant="labelMedium" style={styles.category}>{categoryLabel(product.category)}</Text>
        <Text variant="titleMedium" style={styles.title}>{product.title}</Text>
        <View style={styles.footer}>
          <Text variant="titleLarge" style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.link}>Ver detalhes →</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFFFFF", borderColor: "#DEE4DE", borderRadius: 20, marginBottom: 16, overflow: "hidden" },
  imageArea: { padding: 24, backgroundColor: "#FFFFFF" },
  image: { width: "100%", height: 174 },
  content: { gap: 8, paddingBottom: 20 },
  category: { color: "#586B62" },
  title: { color: "#1A2923", lineHeight: 24 },
  footer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 8 },
  price: { color: "#184E45", fontWeight: "800" },
  link: { color: "#184E45", fontWeight: "600" },
});
