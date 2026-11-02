import { useGetTourQuery, useGetToursQuery } from "@/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserLocation } from "@/store/locationSlice";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { DrawerActions } from "@react-navigation/native";
import { skipToken } from "@reduxjs/toolkit/query";
import * as Location from "expo-location";
import { router, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MapScreen() {
  // 0.1: на карте первая экскурсия из списка. Выбор экскурсии — в 0.2
  const toursQuery = useGetToursQuery();
  const firstTourId = toursQuery.data?.[0]?.id;
  // skipToken — «не запрашивать», пока id нет (аналог enabled: false в React Query)
  const tourQuery = useGetTourQuery(firstTourId ?? skipToken);

  const tour = tourQuery.data;
  const points = tour?.points ?? [];
  const isLoading = toursQuery.isLoading || tourQuery.isLoading;
  const hasError = Boolean(toursQuery.error || tourQuery.error);

  const dispatch = useAppDispatch();
  const userLocation = useAppSelector((state) => state.location.coords);
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const snapPoints = useMemo(() => ["18%", "55%", "92%"], []);
  // Кнопки висят чуть выше свёрнутой шторки, чтобы не перекрываться ею
  const buttonsBottom = height * 0.18 + 12;

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

  const openMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: points[0]?.lat ?? 59.9398, // ← points
          longitude: points[0]?.lng ?? 30.3146, // ← points
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
        mapPadding={{
          top: insets.top,
          right: 0,
          bottom: height * 0.18,
          left: 0,
        }}
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

      <View style={[styles.buttonsRow, { bottom: buttonsBottom }]}>
        <Pressable style={styles.fab} onPress={openMenu}>
          <Text style={styles.fabIcon}>☰</Text>
        </Pressable>
        <Pressable style={styles.fab} onPress={focusOnUser}>
          <Text style={styles.fabIcon}>📍</Text>
        </Pressable>
      </View>

      <BottomSheet index={0} snapPoints={snapPoints}>
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Экскурсии рядом</Text>
          <Text style={styles.sheetHint}>
            {isLoading
              ? "Загружаем экскурсии…"
              : hasError
                ? "Не удалось загрузить — проверь, запущен ли сервер"
                : `${tour?.title ?? "Экскурсий нет"} · точек: ${points.length}`}
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  buttonsRow: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  fabIcon: { fontSize: 20 },
  sheetContent: { paddingHorizontal: 16, paddingTop: 4 },
  sheetTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  sheetHint: { fontSize: 14, color: "#777" },
});
