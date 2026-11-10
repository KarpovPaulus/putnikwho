import { TabBar } from "@/components/navigation/TabBar";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* Порядок здесь = порядок в меню. index открывается первым («Экскурсии») */}
      <Tabs.Screen name="index" options={{ title: "Экскурсии" }} />
      <Tabs.Screen name="map" options={{ title: "Карта" }} />
      <Tabs.Screen name="profile" options={{ title: "Профиль" }} />
    </Tabs>
  );
}
