import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { mockPOIs } from "../../src/data/pois";

export default function POIDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const poi = mockPOIs.find((p) => p.id === id);

  //   const player = useAudioPlayer(poi ? { uri: poi.audioUrl } : null);
  const player = useAudioPlayer(
    require("../../assets/audio/Enjoykin_-_Iducshij_k_Reke_(TheMP3.Info).mp3"),
  );
  const status = useAudioPlayerStatus(player);

  if (!poi) {
    return (
      <View style={styles.container}>
        <Text>Точка не найдена</Text>
      </View>
    );
  }

  const togglePlay = () => {
    console.log("button pressed, status:", status);
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  return (
    <View style={styles.container}>
      <Image source={{ uri: poi.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{poi.title}</Text>
      <Text style={styles.description}>{poi.description}</Text>

      <Pressable style={styles.button} onPress={togglePlay}>
        <Text style={styles.buttonText}>
          {status.playing ? "Пауза" : "Слушать"}
        </Text>
      </Pressable>

      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
        />
      </View>
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, color: "#444", marginBottom: 24 },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#ddd",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#2563eb",
  },
});
