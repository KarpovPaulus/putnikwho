import { layout, spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import type { ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  padded?: boolean; // горизонтальный отступ экрана
  safeTop?: boolean; // false, если над экраном уже есть шапка навигации
  style?: StyleProp<ViewStyle>;
};

// Обёртка экрана: фон темы + отступ от «чёлки»/статус-бара.
// Safe area — аналог env(safe-area-inset-top) в CSS.
export function Screen({
  children,
  padded = true,
  safeTop = true,
  style,
}: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { flex: 1, backgroundColor: colors.bg },
        safeTop && { paddingTop: insets.top },
        padded && { paddingHorizontal: layout.screenPadding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Нижний отступ для прокручиваемого контента, чтобы последний элемент
// не прятался под плавающим меню. Мини-плеер добавим сюда в шаге с плеером.
export function useBottomInset() {
  const insets = useSafeAreaInsets();
  const barBottom = Math.max(insets.bottom, layout.tabBarBottom);
  return barBottom + layout.tabBarHeight + spacing.lg;
}
