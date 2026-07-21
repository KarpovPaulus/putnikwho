import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "PutnikWho" }} />
      <Stack.Screen name="tour/[tourId]" options={{ title: "Маршрут" }} />
      <Stack.Screen
        name="player/[id]"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
