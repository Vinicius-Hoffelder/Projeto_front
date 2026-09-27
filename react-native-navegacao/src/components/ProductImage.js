import { useState } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";

export default function ProductImage({ uri, title, style }) {
  const [failedUri, setFailedUri] = useState(null);
  if (failedUri === uri) return <View style={[style, { justifyContent: "center", alignItems: "center", padding: 12 }]}><Text style={{ textAlign: "center" }}>Imagem indisponível</Text></View>;
  return <Image source={{ uri }} style={style} resizeMode="contain" accessibilityLabel={title} onError={() => setFailedUri(uri)} />;
}
