import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getPOIsByTour } from "../../src/data";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { setUserLocation } from "../../src/store/locationSlice";

export default function TourMapScreen() {
  const { tourId } = useLocalSearchParams<{ tourId: string }>();
  const tourPOIs = getPOIsByTour(tourId);

  const dispatch = useAppDispatch();
  const userLocation = useAppSelector((state) => state.location.coords);
  const mapRef = useRef<MapView>(null);

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
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: tourPOIs[0]?.lat ?? 59.9398,
          longitude: tourPOIs[0]?.lng ?? 30.3146,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
      >
        {tourPOIs.map((poi) => (
          <Marker
            key={poi.id}
            coordinate={{ latitude: poi.lat, longitude: poi.lng }}
            title={poi.title}
            description={poi.description}
            onPress={() =>
              router.push({
                pathname: "/poi/[id]",
                params: { id: poi.id },
              })
            }
          />
        ))}
      </MapView>

      <Pressable style={styles.locationButton} onPress={focusOnUser}>
        <Text style={styles.locationButtonText}>📍</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  locationButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  locationButtonText: { fontSize: 24 },
});
