import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "PutnikWho" }} />
        <Stack.Screen name="tour/[tourId]" options={{ title: "Маршрут" }} />
        <Stack.Screen
          name="player/[id]"
          options={{ presentation: "modal", headerShown: false }}
        />
      </Stack>
    </Provider>
  );
}
