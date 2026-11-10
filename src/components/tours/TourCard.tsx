import { AppText } from "@/components/ui";
import { radius, spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { TourListItem } from "@/types";
import { formatDuration, formatPoints } from "@/utils/format";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  tour: TourListItem;
  onPress: () => void;
};

// Карточка экскурсии в списке (макет В4): фото на всю ширину, под ним текст
export function TourCard({ tour, onPress }: Props) {
  const { colors } = useTheme();

  const meta = [
    formatDuration(tour.durationSec),
    tour.format === "SINGLE_PLACE"
      ? "Одно место"
      : formatPoints(tour.pointsCount),
    tour.isPaid ? "Платно" : "Бесплатно",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${tour.title}. ${meta}`}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      {tour.coverUrl ? (
        // expo-image вместо Image из RN: кэширует картинки на диске и плавно их показывает
        <Image
          source={{ uri: tour.coverUrl }}
          style={[styles.photo, { backgroundColor: colors.photoPlaceholder }]}
          contentFit="cover" // аналог object-fit: cover
          transition={200}
        />
      ) : (
        <View
          style={[
            styles.photo,
            styles.placeholder,
            { backgroundColor: colors.photoPlaceholder },
          ]}
        >
          <Feather name="headphones" size={40} color={colors.textSecondary} />
        </View>
      )}

      <View style={styles.text}>
        <AppText variant="heading">{tour.title}</AppText>
        {meta ? (
          <AppText variant="meta" tone="secondary">
            {meta}
          </AppText>
        ) : null}
        {tour.voiceType === "AI" && (
          <AppText variant="caption" tone="accent">
            Озвучено ИИ
          </AppText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: spacing.lg, gap: spacing.md },
  // aspectRatio вместо фиксированной высоты — на широких экранах фото не сплющится
  photo: { width: "100%", aspectRatio: 16 / 9, borderRadius: radius.xs },
  placeholder: { alignItems: "center", justifyContent: "center" },
  text: { gap: spacing.xs },
});
