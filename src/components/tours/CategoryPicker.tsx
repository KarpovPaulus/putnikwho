import { useGetCategoriesQuery } from "@/api";
import { describeApiError } from "@/api/errors";
import { AppText, Button, IconButton } from "@/components/ui";
import { layout, spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  selectedIds: string[]; // что выбрано сейчас (применённый фильтр)
  onApply: (ids: string[]) => void;
  onClose: () => void;
};

export function CategoryPicker({
  visible,
  selectedIds,
  onApply,
  onClose,
}: Props) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [draft, setDraft] = useState<string[]>(selectedIds);

  const toggle = (id: string) =>
    setDraft((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet" // iOS: «карточка» с возможностью смахнуть вниз
      onRequestClose={onClose} // Android: системная кнопка «Назад» закрывает окно
      // При каждом открытии начинаем с текущего фильтра, а не с прошлого черновика
      onShow={() => setDraft(selectedIds)}
    >
      <View
        style={[
          styles.root,
          {
            backgroundColor: colors.bg,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
      >
        <View style={styles.header}>
          <AppText variant="heading">Категории</AppText>
          <IconButton icon="x" accessibilityLabel="Закрыть" onPress={onClose} />
        </View>

        <ScrollView style={{ flex: 1 }}>
          {isLoading ? (
            <ActivityIndicator
              style={{ marginTop: spacing.xl }}
              color={colors.textSecondary}
            />
          ) : error ? (
            <AppText tone="secondary" style={{ marginTop: spacing.lg }}>
              {describeApiError(error)}
            </AppText>
          ) : (
            categories?.map((category) => {
              const checked = draft.includes(category.id);
              return (
                <Pressable
                  key={category.id}
                  onPress={() => toggle(category.id)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked }}
                  style={({ pressed }) => [
                    styles.row,
                    { borderBottomColor: colors.border },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <AppText style={{ flex: 1 }}>{category.name}</AppText>
                  <Feather
                    name={checked ? "check-square" : "square"}
                    size={22}
                    color={checked ? colors.accent : colors.textSecondary}
                  />
                </Pressable>
              );
            })
          )}
        </ScrollView>

        <View style={styles.actions}>
          <Button
            title="Сбросить"
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => setDraft([])}
          />
          <Button
            title={draft.length ? `Применить (${draft.length})` : "Применить"}
            style={{ flex: 1 }}
            onPress={() => onApply(draft)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: layout.minTouch + 8,
    borderBottomWidth: 1,
  },
  actions: { flexDirection: "row", gap: spacing.md, paddingTop: spacing.md },
});
