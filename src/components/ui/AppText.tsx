import { typography, type TypographyVariant } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Text, type TextProps } from "react-native";

export type TextTone =
  | "primary"
  | "secondary"
  | "accent"
  | "listened"
  | "onAccent"
  | "danger";

type Props = TextProps & {
  variant?: TypographyVariant; // стиль из typography
  tone?: TextTone; // цвет по смыслу, а не по hex
};

// В RN текст можно писать только внутри <Text> (в отличие от веба,
// где текст живёт в любом div). Поэтому весь текст — через AppText.
export function AppText({
  variant = "body",
  tone = "primary",
  style,
  ...rest
}: Props) {
  const { colors } = useTheme();

  const color = {
    primary: colors.text,
    secondary: colors.textSecondary,
    accent: colors.accent,
    listened: colors.listenedText,
    onAccent: colors.onAccent,
    danger: colors.danger,
  }[tone];

  // style в конце — чтобы снаружи можно было точечно переопределить
  return <Text {...rest} style={[typography[variant], { color }, style]} />;
}
