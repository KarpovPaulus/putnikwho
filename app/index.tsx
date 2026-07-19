import { router } from "expo-router";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { mockPOIs } from "../src/data/pois";

export default function MapScreen() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 59.9398,
        longitude: 30.3146,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {mockPOIs.map((poi) => (
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
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
