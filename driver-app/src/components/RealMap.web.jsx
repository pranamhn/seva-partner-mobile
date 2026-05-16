import React from 'react';
import { StyleSheet, View } from 'react-native';
import CityMap from './CityMap';

// Web fallback — react-native-maps has no web support.
// Maps each RealMap mode to equivalent CityMap props.
const MODE_PROPS = {
  demand:    { showHeat: true,  showRoute: false, showDriver: false, showPickup: false, showDropoff: false, routeProgress: 0 },
  incoming:  { showHeat: false, showRoute: true,  showDriver: true,  showPickup: true,  showDropoff: true,  routeProgress: 0.05 },
  orderList: { showHeat: true,  showRoute: false, showDriver: true,  showPickup: false, showDropoff: false, routeProgress: 0 },
  navigate:  { showHeat: false, showRoute: true,  showDriver: true,  showPickup: true,  showDropoff: false, routeProgress: 0.35 },
  trip:      { showHeat: false, showRoute: true,  showDriver: true,  showPickup: false, showDropoff: true,  routeProgress: 0.62 },
};

export default function RealMap({ mode = 'demand', color, deep, routeProgress }) {
  const props = MODE_PROPS[mode] || MODE_PROPS.demand;
  const progress = routeProgress ?? props.routeProgress;

  return (
    <View style={StyleSheet.absoluteFill}>
      <CityMap
        width={800}
        height={900}
        color={color}
        deep={deep}
        routeProgress={progress}
        {...props}
      />
    </View>
  );
}
