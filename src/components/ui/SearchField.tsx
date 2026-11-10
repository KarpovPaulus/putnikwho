import { fonts, spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
    type StyleProp,
    type TextInputProps,
    type ViewStyle,
} from "react-native";

type Props = Omit<TextInputProps, "style"> & { style?: StyleProp<ViewStyle> };

export function SearchField({ style, value, onChangeText, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[styles.row, { borderBottomColor: colors.text }, style]}>
      <Feather name="search" size={20} color={colors.text} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textSecondary}
        selectionColor={colors.accent}
        returnKeyType="search"
        autoCorrect={false}
        style={[styles.input, { color: colors.text }]}
        {...rest}
      />
      {!!value && (
        <Pressable
          onPress={() => onChangeText?.("")}
          accessibilityRole="button"
          accessibilityLabel="Очистить поиск"
          hitSlop={12}
        >
          <Feather name="x" size={18} color={colors.textSecondary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    height: 46,
    borderBottomWidth: 1.5,
  },
  input: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 17,
    paddingVertical: 0, // на Android у TextInput свой внутренний отступ — обнуляем
  },
});
