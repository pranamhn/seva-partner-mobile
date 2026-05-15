import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T } from '../constants/copy';
import { C } from '../constants/colors';
import { ArrowRightIcon, PinIcon, PhoneIcon, ChatIcon, StarIcon } from '../components/Icons';
import Avatar from '../components/Avatar';
import CityMap from '../components/CityMap';

export default function NavigatePickupScreen({ navigation }) {
  const { brand, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();

  const handleArrived = () => navigation.replace('InTrip');

  return (
    <View style={styles.root}>
      {/* Full-screen map */}
      <View style={StyleSheet.absoluteFill}>
        <CityMap width={400} height={874} color={brand.primary} deep={brand.deep} routeProgress={0.35} />
      </View>

      {/* Top ETA bar */}
      <View style={[styles.topBar, { top: insets.top + 8 }]}>
        <View style={styles.etaCard}>
          <View>
            <Text style={styles.etaLabel}>{t.pickup}</Text>
            <Text style={styles.etaValue}>4 <Text style={styles.etaUnit}>{t.minutes_short}</Text> · 1.2 <Text style={styles.etaUnit}>{t.km_short}</Text></Text>
          </View>
          <View style={[styles.etaIcon, { backgroundColor: brand.surface }]}>
            <PinIcon size={20} color={brand.primary} strokeWidth={2.4} />
          </View>
        </View>
      </View>

      {/* Direction card */}
      <View style={[styles.dirCard, { top: insets.top + 74 }]}>
        <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.dirCardInner}>
          <View style={styles.dirIconBox}>
            <ArrowRightIcon size={26} color="#fff" strokeWidth={3} />
          </View>
          <View style={styles.dirInfo}>
            <Text style={styles.dirDist}>320 m</Text>
            <Text style={styles.dirStreet}>Belok kanan ke Jl. Jend. Sudirman</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.grip} />

        {/* Passenger row */}
        <View style={styles.passengerRow}>
          <Avatar name="Rina P" size={48} bg={brand.deep} />
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>Rina P.</Text>
            <View style={styles.passengerMeta}>
              <StarIcon size={12} color={C.amber} />
              <Text style={styles.passengerSub}> 4.92</Text>
              <View style={styles.dot} />
              <View style={styles.cashBadge}><Text style={styles.cashText}>CASH</Text></View>
            </View>
          </View>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: C.green }]}>
            <PhoneIcon size={20} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: brand.surface }]}>
            <ChatIcon size={20} color={brand.primary} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* Pickup location */}
        <View style={styles.pickupCard}>
          <View style={[styles.pickupIcon, { backgroundColor: brand.primary }]}>
            <PinIcon size={18} color="#fff" strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.pickupHint}>{t.pickup.toUpperCase()}</Text>
            <Text style={styles.pickupMain}>Pacific Place, SCBD</Text>
            <Text style={styles.pickupSub}>Lobby Mall · Pintu Utara</Text>
          </View>
        </View>

        {/* Arrived button */}
        <TouchableOpacity style={styles.arrivedBtnWrap} onPress={handleArrived}>
          <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.arrivedBtn}>
            <Text style={styles.arrivedBtnText}>{t.arrived} →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#E8EEF3' },
  topBar: { position: 'absolute', left: 14, right: 14 },
  etaCard: { backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  etaLabel: { fontSize: 11, color: C.ink500, fontWeight: '600' },
  etaValue: { fontSize: 18, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  etaUnit: { fontSize: 13, fontWeight: '600', color: C.ink500 },
  etaIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  dirCard: { position: 'absolute', left: 14, right: 14 },
  dirCardInner: { borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  dirIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  dirInfo: { flex: 1 },
  dirDist: { fontSize: 22, fontWeight: '800', color: '#fff', lineHeight: 24 },
  dirStreet: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 18, paddingTop: 14, shadowColor: '#005080', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.18, shadowRadius: 30, elevation: 20 },
  grip: { width: 40, height: 4, backgroundColor: C.ink200, borderRadius: 2, alignSelf: 'center', marginBottom: 14 },
  passengerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  passengerInfo: { flex: 1 },
  passengerName: { fontSize: 15, fontWeight: '800', color: C.ink900 },
  passengerMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  passengerSub: { fontSize: 12, color: C.ink500 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: C.ink300 },
  cashBadge: { paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4, backgroundColor: C.ink100 },
  cashText: { fontSize: 10, fontWeight: '700', color: C.ink500 },
  actionBtn: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pickupCard: { marginTop: 14, padding: 12, borderRadius: 14, backgroundColor: C.ink50, flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  pickupIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  pickupHint: { fontSize: 11, color: C.ink400, fontWeight: '700' },
  pickupMain: { fontSize: 14, fontWeight: '700', color: C.ink900, marginTop: 1 },
  pickupSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  arrivedBtnWrap: { marginTop: 14, borderRadius: 16, overflow: 'hidden' },
  arrivedBtn: { height: 56, alignItems: 'center', justifyContent: 'center' },
  arrivedBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
