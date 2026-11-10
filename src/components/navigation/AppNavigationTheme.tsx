import { useTheme } from "@/hooks/useTheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";

// Передаём наши цвета навигатору: шапки, фон переходов, статус-бар.
// Отдельный компонент, потому что useTheme читает Redux,
// а Redux Provider объявлен в том же _layout выше.
export function AppNavigationTheme({ children }: { children: ReactNode }) {
  const { isDark, colors } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;

  const theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.accent,
      background: colors.bg,
      card: colors.raised, // фон шапки
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <ThemeProvider value={theme}>
      {/* 'auto' следует за системой, а не за нашим переключателем — поэтому явно */}
      <StatusBar style={isDark ? "light" : "dark"} />
      {children}
    </ThemeProvider>
  );
}
