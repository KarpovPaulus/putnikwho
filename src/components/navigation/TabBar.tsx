import type { IconName } from "@/components/ui";
import { fonts, layout, radius, spacing, typography } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Иконка таба — по имени файла в app/(tabs)/
const ICONS: Record<string, IconName> = {
  index: "headphones",
  map: "map",
  profile: "user",
};

// Свой таб-бар вместо стандартного. Навигатор передаёт сюда
// state (какие табы и какой активен) и navigation (как переключать).
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.bar,
        {
          // position: absolute — экраны занимают всю высоту, меню «плавает» поверх
          bottom: Math.max(insets.bottom, layout.tabBarBottom),
          backgroundColor: colors.raised,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const label = descriptors[route.key].options.title ?? route.name;
        const color = focused ? colors.accent : colors.textSecondary;

        const onPress = () => {
          // Сначала сообщаем навигатору о нажатии, как стандартный таб-бар:
          // экран сможет это перехватить (например, прокрутить список наверх)
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={label}
            style={[
              styles.item,
              focused && { backgroundColor: colors.accentSoft },
            ]}
          >
            <Feather
              name={ICONS[route.name] ?? "circle"}
              size={22}
              color={color}
            />
            <Text
              style={[
                typography.tabLabel,
                {
                  color,
                  fontFamily: focused ? fonts.sansBold : fonts.sansMedium,
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    height: layout.tabBarHeight,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    padding: spacing.xs,
    gap: spacing.xxs,
    // Тень: на iOS — shadow*, на Android — elevation (в CSS это один box-shadow)
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 1,
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    borderRadius: radius.pill,
  },
});
