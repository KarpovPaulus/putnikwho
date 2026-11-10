import { fonts, radius, spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected = false, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      // чип 34px, а палец просит 44 — hitSlop расширяет зону нажатия без изменения вида
      hitSlop={{ top: 5, bottom: 5 }}
      style={({ pressed }) => [
        styles.base,
        selected
          ? { backgroundColor: colors.accent, borderColor: colors.accent }
          : { borderColor: colors.border },
        pressed && { opacity: 0.8 },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? colors.onAccent : colors.text,
            fontFamily: selected ? fonts.sansSemiBold : fonts.sansMedium,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    justifyContent: "center",
  },
  label: { fontSize: 14, lineHeight: 18 },
});
