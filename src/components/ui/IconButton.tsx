import { layout } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    type StyleProp,
    type ViewStyle,
} from "react-native";
import type { IconName } from "./types";

type Props = {
  icon: IconName;
  accessibilityLabel: string; // обязателен: у кнопки нет текста (как aria-label)
  onPress?: () => void;
  variant?: "plain" | "accent" | "playing"; // playing — бронзовая ▶/⏸
  style?: StyleProp<ViewStyle>;
};

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  variant = "plain",
  style,
}: Props) {
  const { colors } = useTheme();

  const bg = {
    plain: "transparent",
    accent: colors.accent,
    playing: colors.playing,
  }[variant];
  const fg = {
    plain: colors.text,
    accent: colors.onAccent,
    playing: colors.onPlaying,
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg },
        pressed && { opacity: 0.7 },
        style,
      ]}
    >
      <Feather name={icon} size={20} color={fg} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: layout.minTouch,
    height: layout.minTouch,
    borderRadius: layout.minTouch / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
