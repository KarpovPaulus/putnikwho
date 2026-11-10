import { useGetTourQuery, useGetToursQuery } from "@/api";
import { AppText, useBottomInset } from "@/components/ui";
import { layout, radius, spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserLocation } from "@/store/locationSlice";
import { Feather } from "@expo/vector-icons";
import { skipToken } from "@reduxjs/toolkit/query";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapScreen() {
  // 0.1: на карте первая экскурсия из списка.
  // Карта с экскурсиями, кластерами и запросом геолокации — отдельный шаг 0.2
  const toursQuery = useGetToursQuery();
  const firstTourId = toursQuery.data?.[0]?.id;
  const tourQuery = useGetTourQuery(firstTourId ?? skipToken);

  const tour = tourQuery.data;
  const points = tour?.points ?? [];
  const isLoading = toursQuery.isLoading || tourQuery.isLoading;
  const hasError = Boolean(toursQuery.error || tourQuery.error);

  const dispatch = useAppDispatch();
  const userLocation = useAppSelector((state) => state.location.coords);
  const mapRef = useRef<MapView>(null);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset = useBottomInset(); // место под плавающее меню

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({});
      dispatch(
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      );
    })();
  }, [dispatch]);

  const focusOnUser = () => {
    if (!userLocation || !mapRef.current) return;
    mapRef.current.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const status = isLoading
    ? "Загружаем экскурсии…"
    : hasError
      ? "Не удалось загрузить — проверь, запущен ли сервер"
      : null;

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: points[0]?.lat ?? 59.9398,
          longitude: points[0]?.lng ?? 30.3146,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        // Отступы, чтобы логотип/центр карты не уходили под меню и статус-бар
        mapPadding={{ top: insets.top, right: 0, bottom: bottomInset, left: 0 }}
      >
        {points.map((point) => (
          <Marker
            key={point.id}
            coordinate={{ latitude: point.lat, longitude: point.lng }}
            title={point.title}
            onPress={() =>
              router.push({
                pathname: "/point/[pointId]",
                params: { pointId: point.id, tourId: tour!.id },
              })
            }
          />
        ))}
      </MapView>

      {status && (
        <View
          style={[
            styles.status,
            { top: insets.top + spacing.sm, backgroundColor: colors.raised },
          ]}
        >
          <AppText variant="meta" tone={hasError ? "danger" : "secondary"}>
            {status}
          </AppText>
        </View>
      )}

      <Pressable
        onPress={focusOnUser}
        accessibilityRole="button"
        accessibilityLabel="Показать моё местоположение"
        style={[
          styles.fab,
          {
            bottom: bottomInset,
            backgroundColor: colors.raised,
            shadowColor: colors.shadow,
          },
        ]}
      >
        <Feather name="navigation" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  status: {
    position: "absolute",
    left: layout.screenPadding,
    right: layout.screenPadding,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: layout.screenPadding,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 1,
    elevation: 4,
  },
});
