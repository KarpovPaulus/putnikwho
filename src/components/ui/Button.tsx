import { radius, spacing, typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    type StyleProp,
    type ViewStyle,
} from "react-native";
import type { IconName } from "./types";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary"; // заливка / рамка
  icon?: IconName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled,
  style,
}: Props) {
  const { colors } = useTheme();
  const isPrimary = variant === "primary";
  const fg = isPrimary ? colors.onAccent : colors.accent;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      // style-функция получает pressed — аналог :active в CSS
      style={({ pressed }) => [
        styles.base,
        isPrimary
          ? { backgroundColor: colors.accent }
          : { borderWidth: 1, borderColor: colors.accent },
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.4 },
        style,
      ]}
    >
      {icon && <Feather name={icon} size={18} color={fg} />}
      <Text style={[typography.button, { color: fg }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    flexDirection: "row", // в RN flex по умолчанию column — обратный вебу
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
});
