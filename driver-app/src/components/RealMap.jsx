import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, Circle, UrlTile } from 'react-native-maps';

// Jakarta landmark coordinates
const PICKUP  = { latitude: -6.2236, longitude: 106.8093 }; // Pacific Place SCBD
const DROPOFF = { latitude: -6.1944, longitude: 106.8229 }; // Plaza Indonesia
const DRIVER  = { latitude: -6.2100, longitude: 106.8150 }; // Sudirman mid-point

const ROUTE = [
  { latitude: -6.2236, longitude: 106.8093 },
  { latitude: -6.2188, longitude: 106.8110 },
  { latitude: -6.2100, longitude: 106.8150 },
  { latitude: -6.2020, longitude: 106.8185 },
  { latitude: -6.1944, longitude: 106.8229 },
];

const DEMAND_CLUSTERS = [
  { latitude: -6.2236, longitude: 106.8093, radius: 900 },  // SCBD
  { latitude: -6.1944, longitude: 106.8229, radius: 700 },  // Menteng
  { latitude: -6.2441, longitude: 106.7993, radius: 600 },  // Blok M
];

const ORDER_PICKUPS = [
  { latitude: -6.2236, longitude: 106.8093 }, // Pacific Place
  { latitude: -6.2300, longitude: 106.8311 }, // Kuningan City
  { latitude: -6.2251, longitude: 106.7980 }, // Senayan City
  { latitude: -6.2441, longitude: 106.7993 }, // Blok M
  { latitude: -6.1944, longitude: 106.8229 }, // Grand Indonesia
];

const REGIONS = {
  demand: {
    latitude: -6.2200, longitude: 106.8100,
    latitudeDelta: 0.07, longitudeDelta: 0.07,
  },
  incoming: {
    latitude: -6.2090, longitude: 106.8161,
    latitudeDelta: 0.05, longitudeDelta: 0.05,
  },
  orderList: {
    latitude: -6.2194, longitude: 106.8100,
    latitudeDelta: 0.09, longitudeDelta: 0.09,
  },
  navigate: {
    latitude: -6.2180, longitude: 106.8120,
    latitudeDelta: 0.025, longitudeDelta: 0.025,
  },
  trip: {
    latitude: -6.2070, longitude: 106.8190,
    latitudeDelta: 0.03, longitudeDelta: 0.03,
  },
};

function interpolateRoute(route, progress) {
  if (progress <= 0) return route[0];
  if (progress >= 1) return route[route.length - 1];
  const totalSeg = route.length - 1;
  const pos = progress * totalSeg;
  const idx = Math.floor(pos);
  const t = pos - idx;
  const from = route[Math.min(idx, totalSeg - 1)];
  const to   = route[Math.min(idx + 1, totalSeg)];
  return {
    latitude:  from.latitude  + (to.latitude  - from.latitude)  * t,
    longitude: from.longitude + (to.longitude - from.longitude) * t,
  };
}

export default function RealMap({
  mode = 'demand',
  color = '#00A89B',
  deep  = '#008275',
  routeProgress = 0,
}) {
  const driverPos = interpolateRoute(ROUTE, routeProgress);
  const showRoute   = mode === 'incoming' || mode === 'navigate' || mode === 'trip';
  const showPickup  = mode === 'incoming' || mode === 'navigate';
  const showDropoff = mode === 'incoming' || mode === 'trip';
  const showDriver  = mode === 'incoming' || mode === 'navigate' || mode === 'trip';

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={REGIONS[mode] || REGIONS.demand}
      scrollEnabled={false}
      zoomEnabled={false}
      rotateEnabled={false}
      pitchEnabled={false}
      showsUserLocation={false}
      showsMyLocationButton={false}
      showsCompass={false}
      showsScale={false}
      toolbarEnabled={false}
    >
      {/* OpenStreetMap free tiles */}
      <UrlTile
        urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maximumZ={19}
        flipY={false}
        tileSize={256}
      />

      {/* Demand heat circles */}
      {mode === 'demand' && DEMAND_CLUSTERS.map((c, i) => (
        <Circle
          key={i}
          center={{ latitude: c.latitude, longitude: c.longitude }}
          radius={c.radius}
          fillColor={`${color}28`}
          strokeColor={`${color}55`}
          strokeWidth={1.5}
        />
      ))}

      {/* Route polyline */}
      {showRoute && (
        <Polyline
          coordinates={ROUTE}
          strokeColor={color}
          strokeWidth={4}
          lineDashPattern={mode === 'incoming' ? [12, 6] : undefined}
        />
      )}

      {/* Pickup marker */}
      {showPickup && (
        <Marker coordinate={PICKUP} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
          <View style={[styles.pickupOuter, { borderColor: color }]}>
            <View style={[styles.pickupInner, { backgroundColor: color }]} />
          </View>
        </Marker>
      )}

      {/* Dropoff marker */}
      {showDropoff && (
        <Marker coordinate={DROPOFF} anchor={{ x: 0.5, y: 1 }} tracksViewChanges={false}>
          <View style={styles.dropoffWrap}>
            <View style={[styles.dropoffHead, { backgroundColor: deep }]} />
            <View style={[styles.dropoffTail, { backgroundColor: deep }]} />
          </View>
        </Marker>
      )}

      {/* Driver marker */}
      {showDriver && (
        <Marker coordinate={driverPos} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
          <View style={[styles.driverOuter, { borderColor: color }]}>
            <View style={[styles.driverInner, { backgroundColor: deep }]} />
          </View>
        </Marker>
      )}

      {/* Order list: multiple pickup dots */}
      {mode === 'orderList' && ORDER_PICKUPS.map((coord, i) => (
        <Marker key={i} coordinate={coord} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
          <View style={[styles.orderDotOuter, { borderColor: color }]}>
            <View style={[styles.orderDotInner, { backgroundColor: color }]} />
          </View>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  pickupOuter: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 2.5, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  pickupInner: { width: 9, height: 9, borderRadius: 5 },

  dropoffWrap: { alignItems: 'center' },
  dropoffHead: { width: 18, height: 18, borderRadius: 9 },
  dropoffTail: { width: 3, height: 8, borderRadius: 2, marginTop: 1 },

  driverOuter: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2.5, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, shadowRadius: 4, elevation: 4,
  },
  driverInner: { width: 14, height: 14, borderRadius: 7 },

  orderDotOuter: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  orderDotInner: { width: 8, height: 8, borderRadius: 4 },
});
