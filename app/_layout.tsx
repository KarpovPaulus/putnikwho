import { store } from "@/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

// Держим сплэш, пока не загрузятся шрифты (иначе мелькнёт системный шрифт)
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Literata-Regular": require("../assets/fonts/Literata-Regular.ttf"),
    "Literata-SemiBold": require("../assets/fonts/Literata-SemiBold.ttf"),
    "GolosText-Regular": require("../assets/fonts/GolosText-Regular.ttf"),
    "GolosText-Medium": require("../assets/fonts/GolosText-Medium.ttf"),
    "GolosText-SemiBold": require("../assets/fonts/GolosText-SemiBold.ttf"),
    "GolosText-Bold": require("../assets/fonts/GolosText-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="point/[pointId]" options={{ title: "Точка" }} />
          <Stack.Screen
            name="player/[pointId]"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
