import { useTheme } from "@/hooks/useTheme";
import { View, type StyleProp, type ViewStyle } from "react-native";

// Тонкая линия-разделитель (аналог <hr> / border-top)
export function Divider({ style }: { style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  return (
    <View style={[{ height: 1, backgroundColor: colors.border }, style]} />
  );
}
