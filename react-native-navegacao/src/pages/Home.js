import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import CardProduto from "../components/CardProduto";
import RequestState from "../components/RequestState";
import useApi from "../hooks/useApi";
import { categories } from "../utils/products";

export default function Home({ navigation }) {
  const [category, setCategory] = useState("");
  const { data, loading, error, retry } = useApi("products", category);
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <FlatList
        data={loading || error ? [] : data || []}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<View>
          <Text variant="labelLarge" style={styles.eyebrow}>ENCONTRE SEU PRÓXIMO FAVORITO</Text>
          <Text variant="headlineLarge" style={styles.title}>Explore a vitrine</Text>
          <Text style={styles.subtitle}>Uma seleção para o seu dia a dia.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
            {categories.map((item) => <Chip key={item.value} selected={category === item.value} showSelectedCheck onPress={() => setCategory(item.value)} accessibilityLabel={`Filtrar: ${item.label}`} style={category === item.value ? styles.selected : styles.chip}>{item.label}</Chip>)}
          </ScrollView>
          <View style={styles.summary}>
            <Text accessibilityLiveRegion="polite" style={styles.subtitle}>{loading ? "Buscando produtos…" : error ? "Catálogo indisponível" : `${data?.length || 0} produtos`}</Text>
            {!!category && <Button compact onPress={() => setCategory("")}>Limpar filtro</Button>}
          </View>
        </View>}
        renderItem={({ item }) => <CardProduto product={item} onPress={() => navigation.navigate("DetalheProduto", { id: item.id })} />}
        ListEmptyComponent={<RequestState loading={loading} message={error || "Nenhum produto encontrado nesta categoria."} onRetry={error ? retry : undefined} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7F4" },
  list: { padding: 20, paddingBottom: 32, width: "100%", maxWidth: 640, alignSelf: "center", flexGrow: 1 },
  eyebrow: { color: "#586B62", marginTop: 8, fontSize: 11, letterSpacing: 1.2 },
  title: { color: "#173B32", fontWeight: "800", marginTop: 8, marginBottom: 8 },
  subtitle: { color: "#5D6962" },
  filters: { gap: 8, paddingVertical: 22, paddingRight: 4 },
  chip: { backgroundColor: "#FFFFFF" },
  selected: { backgroundColor: "#D8EBDD" },
  summary: { minHeight: 44, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
});
