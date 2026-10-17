import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ swipeEnabled: false }}>
      <Drawer.Screen
        name="index"
        options={{ title: "Карта", headerShown: false }}
      />
      <Drawer.Screen name="favorites" options={{ title: "Избранное" }} />
      <Drawer.Screen name="settings" options={{ title: "Настройки" }} />
    </Drawer>
  );
}
