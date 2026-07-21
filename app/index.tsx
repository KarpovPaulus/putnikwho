import { router } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { mockTours } from "../src/data/tours";

export default function ToursListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockTours}
        keyExtractor={(tour) => tour.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/tour/[tourId]",
                params: { tourId: item.id },
              })
            }
          >
            <Image source={{ uri: item.coverImage }} style={styles.cover} />
            <View style={styles.cardText}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              {item.isFree && <Text style={styles.freeLabel}>Бесплатно</Text>}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  cover: { width: "100%", height: 150, backgroundColor: "#ddd" },
  cardText: { padding: 12 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14, color: "#555" },
  freeLabel: { marginTop: 6, color: "#16a34a", fontWeight: "600" },
});
