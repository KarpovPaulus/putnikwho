import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="tour/[tourId]" options={{ title: "Маршрут" }} />
          <Stack.Screen
            name="player/[id]"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
