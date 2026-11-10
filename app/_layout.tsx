import { AppNavigationTheme } from "@/components/navigation/AppNavigationTheme";
import { store } from "@/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

// Держим сплэш, пока не загрузятся шрифты
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
        <AppNavigationTheme>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="point/[pointId]" options={{ title: "Точка" }} />
            <Stack.Screen
              name="player/[pointId]"
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen name="ui-preview" options={{ title: "UI-витрина" }} />
            <Stack.Screen
              name="tour/[tourId]"
              options={{ title: "Экскурсия" }}
            />
          </Stack>
        </AppNavigationTheme>
      </Provider>
    </GestureHandlerRootView>
  );
}
