import {
    AppText,
    Button,
    Chip,
    Divider,
    Screen,
    useBottomInset,
} from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    setThemePreference,
    type ThemePreference,
} from "@/store/settingsSlice";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Как в системе" },
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
];

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.settings.themePreference);
  const bottom = useBottomInset();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          gap: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: bottom,
        }}
      >
        <AppText variant="display">Профиль</AppText>

        <AppText variant="overline" tone="secondary">
          Оформление
        </AppText>
        <Divider />
        <View
          style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}
        >
          {THEMES.map((t) => (
            <Chip
              key={t.value}
              label={t.label}
              selected={theme === t.value}
              onPress={() => dispatch(setThemePreference(t.value))}
            />
          ))}
        </View>

        {/* Временно, на время разработки 0.2 */}
        <AppText
          variant="overline"
          tone="secondary"
          style={{ marginTop: spacing.xl }}
        >
          Для разработки
        </AppText>
        <Divider />
        <Button
          title="UI-витрина"
          variant="secondary"
          icon="layout"
          onPress={() => router.push("/ui-preview")}
        />
      </ScrollView>
    </Screen>
  );
}
