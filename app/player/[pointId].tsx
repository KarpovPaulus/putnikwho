import { getPointById } from "@/data"; // ← было getPOIById
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FullScreenPlayerScreen() {
  const { pointId } = useLocalSearchParams<{ pointId: string }>(); // ← было id
  const point = getPointById(pointId); // ← было poi

  // Пока аудио одно на все точки — реальные файлы появятся вместе с бэкендом.
  // Тогда источник станет { uri: track.audioUrl }.
  const player = useAudioPlayer(
    require("../../assets/audio/Enjoykin_-_Iducshij_k_Reke_(TheMP3.Info).mp3"),
  );
  const status = useAudioPlayerStatus(player);

  // Настраиваем аудиосессию под фон — один раз при открытии плеера
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true, // iOS: играть, даже если тумблер "без звука" включён
      shouldPlayInBackground: true, // не глушить при сворачивании / гашении экрана
      interruptionMode: "doNotMix",
      interruptionModeAndroid: "doNotMix",
    });
  }, []);

  if (!point) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Точка не найдена</Text>
      </View>
    );
  }

  const togglePlay = () => {
    if (status.playing) {
      player.pause();
      return;
    }
    // Если трек доигран до конца — перематываем в начало, иначе play() не сработает
    if (status.duration > 0 && status.currentTime >= status.duration) {
      player.seekTo(0);
    }

    // Включаем медиа-уведомление и контролы на локскрине.
    // На Android именно это запускает foreground-сервис, который держит звук в фоне.
    player.setActiveForLockScreen(true, {
      title: point.title, // ← poi → point
      artist: "PutnikWho",
      albumTitle: "Аудиогид",
    });

    player.play();
  };

  const progress =
    status.duration > 0 ? status.currentTime / status.duration : 0;

  const formatTime = (seconds: number) => {
    const safe = Number.isFinite(seconds) ? seconds : 0;
    const m = Math.floor(safe / 60);
    const s = Math.floor(safe % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>✕</Text>
      </Pressable>

      {/* ← фото необязательно: без него заглушка */}
      {point.photoUrl ? (
        <Image source={{ uri: point.photoUrl }} style={styles.cover} />
      ) : (
        <View style={styles.cover} />
      )}

      <Text style={styles.title}>{point.title}</Text>
      <Text style={styles.description}>{point.description}</Text>

      {/* ниже — всё как было: прогресс, время, кнопка ▶/⏸ */}

      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
        />
      </View>

      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(status.currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(status.duration)}</Text>
      </View>

      {status.isLoaded ? (
        <Pressable style={styles.playButton} onPress={togglePlay}>
          <Text style={styles.playButtonText}>
            {status.playing ? "⏸" : "▶"}
          </Text>
        </Pressable>
      ) : (
        <View style={styles.playButton}>
          <ActivityIndicator color="#111" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#111",
    justifyContent: "center",
  },
  closeButton: { position: "absolute", top: 60, right: 24 },
  closeButtonText: { color: "#fff", fontSize: 28 },
  cover: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    backgroundColor: "#333",
    marginBottom: 24,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  description: { fontSize: 15, color: "#aaa", marginBottom: 32 },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: "#fff" },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 32,
  },
  timeText: { color: "#aaa", fontSize: 12 },
  playButton: {
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: { fontSize: 28 },
});
