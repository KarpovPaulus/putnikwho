import {
    AppText,
    Button,
    Chip,
    Divider,
    IconButton,
    Screen,
    SearchField,
    useBottomInset,
} from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    setThemePreference,
    type ThemePreference,
} from "@/store/settingsSlice";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const THEMES: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "Как в системе" },
  { value: "light", label: "Светлая" },
  { value: "dark", label: "Тёмная" },
];

export default function UiPreviewScreen() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.settings.themePreference);
  const [query, setQuery] = useState("");
  const [free, setFree] = useState(true);
  const bottom = useBottomInset();

  return (
    // safeTop={false}: у drawer-экрана уже есть шапка
    <Screen safeTop={false}>
      <ScrollView
        contentContainerStyle={{
          gap: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: bottom,
        }}
      >
        <AppText variant="overline" tone="secondary">
          Тема
        </AppText>
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

        <Divider />

        <AppText variant="display">Экскурсии</AppText>
        <SearchField
          value={query}
          onChangeText={setQuery}
          placeholder="Найти экскурсию или место"
        />

        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          <Chip
            label="Бесплатные"
            selected={free}
            onPress={() => setFree((v) => !v)}
          />
          <Chip label="До 30 мин" />
          <Chip label="Одно место" />
        </View>

        <AppText variant="overline" tone="secondary">
          Популярное
        </AppText>
        <Divider />
        <AppText variant="heading">Исторический центр Санкт-Петербурга</AppText>
        <AppText variant="meta" tone="secondary">
          19 мин · 5 точек · Бесплатно
        </AppText>
        <AppText variant="caption" tone="listened">
          2 из 5 прослушано
        </AppText>
        <Divider />

        <AppText variant="title">Медный всадник</AppText>
        <AppText variant="reading">
          Памятник Петру I на Сенатской площади и легенды вокруг него.
        </AppText>

        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <Button title="Показать на карте" style={{ flex: 1 }} />
          <Button
            title="Скачать"
            variant="secondary"
            icon="download"
            style={{ flex: 1 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: spacing.md,
            alignItems: "center",
          }}
        >
          <IconButton
            icon="pause"
            variant="playing"
            accessibilityLabel="Пауза"
          />
          <IconButton icon="map" variant="accent" accessibilityLabel="Карта" />
          <IconButton icon="maximize-2" accessibilityLabel="Развернуть плеер" />
        </View>
      </ScrollView>
    </Screen>
  );
}
