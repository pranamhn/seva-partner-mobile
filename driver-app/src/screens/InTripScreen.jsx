import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { PhoneIcon, ChatIcon, ShieldIcon, FlagIcon } from '../components/Icons';
import Avatar from '../components/Avatar';
import CityMap from '../components/CityMap';

function pad(n) { return String(n).padStart(2, '0'); }

export default function InTripScreen({ navigation }) {
  const { surge, brand, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();

  const [elapsed, setElapsed] = useState(0);
  const [fare, setFare] = useState(surge ? 35000 : 20000);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((s) => s + 1);
      setFare((f) => f + (surge ? 140 : 80));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(elapsed / 3600);
  const mins = Math.floor((elapsed % 3600) / 60);
  const secs = elapsed % 60;

  const handleEndTrip = () => navigation.replace('TripComplete', { fare });

  return (
    <View style={styles.root}>
      <View style={StyleSheet.absoluteFill}>
        <CityMap width={400} height={874} color={brand.primary} deep={brand.deep} routeProgress={0.62} />
      </View>

      {/* Top destination card */}
      <View style={[styles.destCard, { top: insets.top + 8 }]}>
        <View style={[styles.destDot, { backgroundColor: brand.primary }]} />
        <View style={styles.destInfo}>
          <Text style={styles.destHint}>{t.dropoff}</Text>
          <Text style={styles.destName}>Plaza Indonesia · Lvl B1</Text>
        </View>
        <View style={styles.destEta}>
          <Text style={styles.destEtaNum}>14<Text style={styles.destEtaUnit}>{t.minutes_short}</Text></Text>
          <Text style={styles.destEtaDist}>3.2 {t.km_short}</Text>
        </View>
      </View>

      {/* Status badge */}
      <View style={[styles.statusBadgeWrap, { top: insets.top + 72 }]}>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, { backgroundColor: C.amber }]} />
          <Text style={styles.statusText}>
            {t.busy.toUpperCase()} · {pad(hours)}:{pad(mins)}:{pad(secs)}
          </Text>
        </View>
      </View>

      {/* Fare meter */}
      <View style={[styles.fareMeter, { top: insets.top + 122 }]}>
        <Text style={styles.fareMeterLabel}>METER {surge ? '· SURGE 1.7×' : ''}</Text>
        <Text style={[styles.fareMeterValue, { color: surge ? '#E5276E' : C.ink900 }]}>
          {Rp(fare)}
        </Text>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.grip} />

        <View style={styles.passengerRow}>
          <Avatar name="Rina P" size={40} bg={brand.deep} />
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>Rina P.</Text>
            <Text style={styles.passengerSub}>{t.passenger} · 1 orang</Text>
          </View>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: C.green }]}>
            <PhoneIcon size={18} color="#fff" strokeWidth={2.2} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: brand.surface }]}>
            <ChatIcon size={18} color={brand.primary} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.safetyBtn}>
            <ShieldIcon size={22} color={C.ink500} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.endBtnWrap} onPress={handleEndTrip}>
            <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.endBtn}>
              <FlagIcon size={18} color="#fff" strokeWidth={2.4} />
              <Text style={styles.endBtnText}>{t.end_trip}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#E8EEF3' },
  destCard: { position: 'absolute', left: 14, right: 14, backgroundColor: C.ink900, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  destDot: { width: 12, height: 12, borderRadius: 2 },
  destInfo: { flex: 1 },
  destHint: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '600' },
  destName: { fontSize: 14, fontWeight: '700', color: '#fff', marginTop: 1 },
  destEta: { alignItems: 'flex-end' },
  destEtaNum: { fontSize: 18, fontWeight: '800', color: '#fff', lineHeight: 20 },
  destEtaUnit: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  destEtaDist: { fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: '600', marginTop: 2 },
  statusBadgeWrap: { position: 'absolute', alignSelf: 'center', left: 0, right: 0, alignItems: 'center' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700', color: C.ink700 },
  fareMeter: { position: 'absolute', right: 14, backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'flex-end', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  fareMeterLabel: { fontSize: 10, color: C.ink400, fontWeight: '700', letterSpacing: 0.5 },
  fareMeterValue: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5, marginTop: 2 },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 18, paddingTop: 14, shadowColor: '#005080', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.18, shadowRadius: 30, elevation: 20 },
  grip: { width: 40, height: 4, backgroundColor: C.ink200, borderRadius: 2, alignSelf: 'center', marginBottom: 14 },
  passengerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  passengerInfo: { flex: 1 },
  passengerName: { fontSize: 13, fontWeight: '800', color: C.ink900 },
  passengerSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  actionBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnRow: { flexDirection: 'row', gap: 8 },
  safetyBtn: { width: 56, height: 56, borderRadius: 16, backgroundColor: C.ink50, borderWidth: 1.5, borderColor: C.ink200, alignItems: 'center', justifyContent: 'center' },
  endBtnWrap: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  endBtn: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  endBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
