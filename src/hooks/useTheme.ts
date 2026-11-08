import { colors, type ColorScheme } from "@/constants/theme";
import { useAppSelector } from "@/store/hooks";
import { useColorScheme } from "react-native";

// Аналог prefers-color-scheme + ручной переключатель поверх него
export function useTheme() {
  const preference = useAppSelector((s) => s.settings.themePreference);
  const system = useColorScheme(); // 'light' | 'dark' | null

  const scheme: ColorScheme =
    preference === "system"
      ? system === "dark"
        ? "dark"
        : "light"
      : preference;

  return { scheme, isDark: scheme === "dark", colors: colors[scheme] };
}
