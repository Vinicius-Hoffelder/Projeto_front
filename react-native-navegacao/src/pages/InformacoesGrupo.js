import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { members } from "../data/grupo";

export default function InformacoesGrupo() {
  return (
    <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar.Icon size={72} icon="account-group-outline" style={styles.icon} />
        <Text variant="headlineMedium" style={styles.title}>Quem criou a Vitrine</Text>
        <Text variant="bodyLarge" style={styles.description}>Aplicativo acadêmico desenvolvido para a disciplina de Projeto, Design e Engenharia de Processos da ATITUS. O projeto explora autenticação, navegação e consumo de uma API em dispositivos móveis.</Text>
        <Text variant="titleMedium" style={styles.label}>Integrante do grupo</Text>
        {members.map((member) => <Card key={member.ra} mode="outlined" style={styles.card}><Card.Content>
          <Text variant="titleLarge" style={styles.name}>{member.name}</Text>
          <Text variant="bodyLarge" selectable style={styles.ra}>RA: {member.ra}</Text>
          <Text selectable>{member.email}</Text>
        </Card.Content></Card>)}
        <View style={styles.footer}><Text style={styles.caption}>React Native • Expo • JavaScript</Text><Text style={styles.caption}>Axios • React Navigation • Fake Store API</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F6F7F4" },
  container: { padding: 24, paddingBottom: 40, width: "100%", maxWidth: 640, alignSelf: "center" },
  icon: { marginBottom: 24 },
  title: { fontWeight: "800", color: "#173B32", marginBottom: 16 },
  description: { lineHeight: 26, color: "#46554D" },
  label: { marginTop: 32, marginBottom: 12, fontWeight: "700" },
  card: { backgroundColor: "#FFFFFF", borderColor: "#DEE4DE", marginBottom: 16 },
  name: { fontWeight: "700" },
  ra: { marginTop: 12, marginBottom: 8, color: "#184E45" },
  footer: { marginTop: 32, gap: 8 },
  caption: { color: "#5D6962", textAlign: "center", fontSize: 12 },
});
