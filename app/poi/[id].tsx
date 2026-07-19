import { useLocalSearchParams } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { mockPOIs } from "../../src/data/pois";

export default function POIDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const poi = mockPOIs.find((p) => p.id === id);

  if (!poi) {
    return (
      <View style={styles.container}>
        <Text>Точка не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: poi.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{poi.title}</Text>
      <Text style={styles.description}>{poi.description}</Text>
      <Button title="Слушать" onPress={() => console.log("play audio")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#ddd", // фон-заглушка, пока картинки фейковые
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#444",
  },
});
