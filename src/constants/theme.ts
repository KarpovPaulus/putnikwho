import type { TextStyle } from "react-native";

// ─────────────────────────────────────────────────────────────
// 1. Примитивы — исходная палитра.
//    В компонентах НЕ используются, только внутри ролей ниже.
// ─────────────────────────────────────────────────────────────
const palette = {
  // Blue Slate и производные (текст, линии, тёмная тема)
  slate950: "#111821",
  slate900: "#1B2733",
  slate850: "#1A232D",
  slate800: "#222D39",
  slate750: "#24303C",
  slate700: "#2B3744",
  slate650: "#25384A",
  slate600: "#3E5C76", // Blue Slate — акцент
  slate500: "#556574",
  slate300: "#8DB0CF", // акцент в тёмной теме
  slate250: "#9CA9B6",
  slate200: "#D3DAE1",
  slate150: "#DCE2E8",
  slate100: "#DDE5EC",
  slate50: "#EEF1F4", // Platinum — фон
  white: "#FFFFFF",

  bronze: "#D9A441", // Honey Bronze — «звучит сейчас»
  seagrass: "#5FA58E", // Seagrass — «прослушано»
  seagrassDark: "#2F6E5A", // текст «прослушано» на светлом
  seagrassLight: "#7CC2AA", // текст «прослушано» на тёмном

  red700: "#B3261E",
  red200: "#F2B8B5",
} as const;

// ─────────────────────────────────────────────────────────────
// 2. Роли — их и используют компоненты.
//    Тёмная тема = те же ключи с другими значениями.
// ─────────────────────────────────────────────────────────────
const light = {
  bg: palette.slate50, // фон экрана
  surface: palette.white, // поля, чипы
  raised: palette.white, // мини-плеер, таб-бар (плавающие)
  text: palette.slate900,
  textSecondary: palette.slate500, // мета, подписи, неактивные табы
  border: palette.slate200, // разделители, рамки
  accent: palette.slate600, // главное действие, выбранный фильтр/таб
  onAccent: palette.white, // текст/иконка на accent
  accentSoft: palette.slate100, // фон активного таба
  playing: palette.bronze, // ▶/⏸ и прогресс в плеере
  onPlaying: palette.slate900,
  listened: palette.seagrass, // отметки «прослушано» (заливка)
  onListened: palette.slate900,
  listenedText: palette.seagrassDark, // «прослушано» текстом
  photoPlaceholder: palette.slate150,
  mapLand: "#E2E7EC",
  mapWater: "#C7D5E1",
  danger: palette.red700,
  shadow: "rgba(27, 39, 51, 0.12)",
};

// Ключи берём из light, а значения — любые строки.
// (typeof light дал бы точные значения вроде "#FFFFFF" из-за as const у palette)
export type ThemeColors = { [K in keyof typeof light]: string };

const dark: ThemeColors = {
  bg: palette.slate950,
  surface: palette.slate850,
  raised: palette.slate800,
  text: "#E7ECF1",
  textSecondary: palette.slate250,
  border: palette.slate700,
  accent: palette.slate300,
  onAccent: palette.slate950,
  accentSoft: palette.slate650,
  playing: palette.bronze,
  onPlaying: palette.slate950,
  listened: palette.seagrass,
  onListened: palette.slate950,
  listenedText: palette.seagrassLight,
  photoPlaceholder: palette.slate750,
  mapLand: "#18212A",
  mapWater: "#1F3142",
  danger: palette.red200,
  shadow: "rgba(0, 0, 0, 0.45)",
};

export type ColorScheme = "light" | "dark";
export const colors: Record<ColorScheme, ThemeColors> = { light, dark };

// ─────────────────────────────────────────────────────────────
// 3. Отступы, скругления, размеры
// ─────────────────────────────────────────────────────────────
export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20, // горизонтальный отступ экрана
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  xs: 4, // фото
  sm: 6, // чипы
  md: 8, // кнопки
  lg: 16, // мини-плеер
  pill: 999, // таб-бар, «таблетки»
} as const;

export const layout = {
  screenPadding: spacing.xl,
  tabBarHeight: 64,
  tabBarBottom: 28, // отступ капсулы от низа (поверх safe area — уточним на устройстве)
  miniPlayerHeight: 60,
  minTouch: 44, // минимальная зона нажатия
} as const;

// ─────────────────────────────────────────────────────────────
// 4. Шрифты и типографика
//    Имена = ключи в useFonts (app/_layout.tsx).
//    С кастомным шрифтом НЕ задаём fontWeight: начертание — это файл.
// ─────────────────────────────────────────────────────────────
export const fonts = {
  serif: "Literata-Regular",
  serifSemiBold: "Literata-SemiBold",
  sans: "GolosText-Regular",
  sansMedium: "GolosText-Medium",
  sansSemiBold: "GolosText-SemiBold",
  sansBold: "GolosText-Bold",
} as const;

// lineHeight и letterSpacing в RN — в пикселях (не в em и не множителем, как в CSS)
export const typography = {
  display: { fontFamily: fonts.serifSemiBold, fontSize: 36, lineHeight: 42 }, // заголовок экрана
  title: { fontFamily: fonts.serifSemiBold, fontSize: 32, lineHeight: 37 }, // название в карточке экскурсии
  heading: { fontFamily: fonts.serifSemiBold, fontSize: 20, lineHeight: 25 }, // название в списке
  subheading: { fontFamily: fonts.serifSemiBold, fontSize: 18, lineHeight: 23 }, // название точки
  reading: { fontFamily: fonts.serif, fontSize: 17, lineHeight: 27 }, // описания
  body: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20 },
  button: { fontFamily: fonts.sansSemiBold, fontSize: 15, lineHeight: 20 },
  meta: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 16 },
  overline: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  tabLabel: { fontFamily: fonts.sansMedium, fontSize: 11, lineHeight: 14 },
} satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
