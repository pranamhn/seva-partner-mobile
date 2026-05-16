import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import { HomeIcon, CreditCardIcon, ClockIcon, UserIcon, QRIcon } from '../components/Icons';

import HomeScreen from '../screens/HomeScreen';
import IncomingOrderScreen from '../screens/IncomingOrderScreen';
import NavigatePickupScreen from '../screens/NavigatePickupScreen';
import InTripScreen from '../screens/InTripScreen';
import TripCompleteScreen from '../screens/TripCompleteScreen';
import HistoryScreen from '../screens/HistoryScreen';
import EarningsScreen from '../screens/EarningsScreen';
import TagihanScreen from '../screens/TagihanScreen';
import TagihanDetailScreen from '../screens/TagihanDetailScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PaymentVAScreen from '../screens/PaymentVAScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import VehicleDetailScreen from '../screens/VehicleDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderListScreen from '../screens/OrderListScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  const { brand } = useApp();

  const items = [
    { id: 'Home',    label: 'Beranda',  Icon: HomeIcon },
    { id: 'Tagihan', label: 'Tagihan',  Icon: CreditCardIcon },
    { id: 'QR',      label: '',         Icon: QRIcon,  center: true },
    { id: 'History', label: 'Riwayat',  Icon: ClockIcon },
    { id: 'Profile', label: 'Profil',   Icon: UserIcon },
  ];

  return (
    <View style={styles.tabBar}>
      <View style={styles.tabBarInner}>
        {items.map((item) => {
          const route = state.routes.find((r) => r.name === item.id);
          const isFocused = route ? state.index === state.routes.indexOf(route) : false;

          if (item.center) {
            return (
              <View key={item.id} style={styles.centerBtnWrap}>
                <TouchableOpacity
                  style={[styles.centerBtn, { backgroundColor: brand.primary, shadowColor: brand.primary }]}
                  onPress={() => {}}
                >
                  <item.Icon size={26} color="#fff" strokeWidth={2.4} />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.tabItem}
              onPress={() => route && navigation.navigate(item.id)}
            >
              <item.Icon size={22} color={isFocused ? brand.primary : C.ink400} strokeWidth={isFocused ? 2.2 : 1.8} />
              <Text style={[styles.tabLabel, { color: isFocused ? brand.primary : C.ink400, fontWeight: isFocused ? '700' : '500' }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"    component={HomeScreen} />
      <Tab.Screen name="Tagihan" component={TagihanScreen} />
      <Tab.Screen name="QR"      component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Main"           component={TabNavigator} />
        <Stack.Screen name="OrderList"       component={OrderListScreen}      options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Notifications"   component={NotificationScreen} />
        <Stack.Screen name="IncomingOrder"  component={IncomingOrderScreen} options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="NavigatePickup" component={NavigatePickupScreen} />
        <Stack.Screen name="InTrip"         component={InTripScreen} />
        <Stack.Screen name="TripComplete"   component={TripCompleteScreen} />
        <Stack.Screen name="TagihanDetail"  component={TagihanDetailScreen} />
        <Stack.Screen name="PaymentMethod"  component={PaymentMethodScreen} />
        <Stack.Screen name="PaymentVA"      component={PaymentVAScreen} />
        <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
        <Stack.Screen name="VehicleDetail"  component={VehicleDetailScreen} />
        <Stack.Screen name="Earnings"       component={EarningsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 14, paddingBottom: 22, paddingTop: 12, backgroundColor: 'transparent' },
  tabBarInner: { backgroundColor: '#fff', borderRadius: 22, paddingHorizontal: 8, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', shadowColor: '#005080', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 10 },
  centerBtnWrap: { width: 60, alignItems: 'center', justifyContent: 'center' },
  centerBtn: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -28, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  tabItem: { flex: 1, alignItems: 'center', gap: 3, paddingVertical: 6, paddingHorizontal: 4 },
  tabLabel: { fontSize: 10 },
});
