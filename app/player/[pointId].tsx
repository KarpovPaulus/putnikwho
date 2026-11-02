import { useGetTourQuery } from "@/api";
import type { Point, Track } from "@/types";
import { skipToken } from "@reduxjs/toolkit/query";
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

// Экран: находит точку и трек. Сам плеер — в компоненте Player ниже.
export default function FullScreenPlayerScreen() {
  const { pointId, tourId } = useLocalSearchParams<{
    pointId: string;
    tourId: string;
  }>();
  const { data: tour, isLoading, error } = useGetTourQuery(tourId ?? skipToken);
  const point = tour?.points.find((p) => p.id === pointId);
  // 0.1: играем первый трек точки. Список треков и переключение — в 0.2
  const track = point?.tracks[0];

  // Настраиваем аудиосессию под фон — один раз при открытии плеера
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true, // iOS: играть, даже если тумблер "без звука" включён
      shouldPlayInBackground: true, // не глушить при сворачивании / гашении экрана
      interruptionMode: "doNotMix",
      interruptionModeAndroid: "doNotMix",
    });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (error || !point) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          {error ? "Не удалось загрузить точку" : "Точка не найдена"}
        </Text>
      </View>
    );
  }

  if (!track?.audioUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>У этой точки пока нет аудио</Text>
      </View>
    );
  }

  return <Player point={point} track={track} audioUrl={track.audioUrl} />;
}

type PlayerProps = { point: Point; track: Track; audioUrl: string };

function Player({ point, track, audioUrl }: PlayerProps) {
  const player = useAudioPlayer({ uri: audioUrl });
  const status = useAudioPlayerStatus(player);

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
      title: track.title,
      artist: point.title,
      albumTitle: "PutnikWho",
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

      {/* фото трека → фото точки → заглушка */}
      {(track.photoUrl ?? point.photoUrl) ? (
        <Image
          source={{ uri: (track.photoUrl ?? point.photoUrl)! }}
          style={styles.cover}
        />
      ) : (
        <View style={styles.cover} />
      )}

      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.description}>{point.title}</Text>

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
