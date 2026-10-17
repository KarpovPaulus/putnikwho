import { store } from "@/store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function RootLayout() {
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
