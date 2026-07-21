import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getPOIById } from "../../src/data";
import { formatDistance, getDistanceInMeters } from "../../src/utils/distance";

export default function POIDetailScreen() {
  const { id, userLat, userLng } = useLocalSearchParams<{
    id: string;
    userLat: string;
    userLng: string;
  }>();
  const poi = getPOIById(id);

  if (!poi) {
    return (
      <View style={styles.container}>
        <Text>Точка не найдена</Text>
      </View>
    );
  }

  const distance =
    userLat && userLng
      ? getDistanceInMeters(
          parseFloat(userLat),
          parseFloat(userLng),
          poi.lat,
          poi.lng,
        )
      : null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: poi.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{poi.title}</Text>
      {distance !== null && (
        <Text style={styles.distance}>
          📍 {formatDistance(distance)} от тебя
        </Text>
      )}
      <Text style={styles.description}>{poi.description}</Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/player/[id]",
            params: { id: poi.id },
          })
        }
      >
        <Text style={styles.buttonText}>Слушать</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#ddd",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  distance: { fontSize: 14, color: "#2563eb", marginBottom: 12 },
  description: { fontSize: 16, color: "#444", marginBottom: 24 },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
