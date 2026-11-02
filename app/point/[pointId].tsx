import { useGetTourQuery } from "@/api";
import { useAppSelector } from "@/store/hooks";
import { formatDistance, getDistanceInMeters } from "@/utils/distance";
import { skipToken } from "@reduxjs/toolkit/query";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PointScreen() {
  const { pointId, tourId } = useLocalSearchParams<{
    pointId: string;
    tourId: string;
  }>();
  // Экскурсия уже в кэше RTK Query (её загрузила карта) — запроса в сеть не будет
  const { data: tour, isLoading, error } = useGetTourQuery(tourId ?? skipToken);
  const point = tour?.points.find((p) => p.id === pointId);
  const userLocation = useAppSelector((state) => state.location.coords);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !point) {
    return (
      <View style={styles.container}>
        <Text>{error ? "Не удалось загрузить точку" : "Точка не найдена"}</Text>
      </View>
    );
  }

  const distance = userLocation
    ? getDistanceInMeters(
        userLocation.latitude,
        userLocation.longitude,
        point.lat,
        point.lng,
      )
    : null;

  return (
    <View style={styles.container}>
      {/* ← фото необязательно: без него серая заглушка */}
      {point.photoUrl ? (
        <Image source={{ uri: point.photoUrl }} style={styles.image} />
      ) : (
        <View style={styles.image} />
      )}
      <Text style={styles.title}>{point.title}</Text>
      {distance !== null && (
        <Text style={styles.distance}>
          📍 {formatDistance(distance)} от тебя
        </Text>
      )}
      <Text style={styles.description}>{point.description}</Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "/player/[pointId]", // ← было /player/[id]
            params: { pointId: point.id, tourId },
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
