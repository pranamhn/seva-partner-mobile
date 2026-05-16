import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import {
  ArrowRightIcon, BoltIcon, WalletIcon, CalendarIcon, ShieldIcon,
} from '../components/Icons';

function CarSilhouette({ color }) {
  return (
    <Svg width={140} height={56} viewBox="0 0 140 56" fill="none">
      {/* Body */}
      <Path
        d="M10 38 L18 22 Q22 14 34 12 L80 10 Q96 10 104 16 L126 22 Q134 24 135 32 L135 40 Q135 44 131 44 L16 44 Q10 44 10 38Z"
        fill="rgba(255,255,255,0.25)"
      />
      {/* Windshield */}
      <Path d="M36 14 L32 26 L80 26 L80 14Z" fill="rgba(255,255,255,0.15)" />
      {/* Rear window */}
      <Path d="M82 14 L100 14 L108 26 L82 26Z" fill="rgba(255,255,255,0.15)" />
      {/* Front wheel */}
      <Circle cx="106" cy="44" r="9" fill="rgba(0,0,0,0.3)" />
      <Circle cx="106" cy="44" r="4" fill="rgba(255,255,255,0.3)" />
      {/* Rear wheel */}
      <Circle cx="36" cy="44" r="9" fill="rgba(0,0,0,0.3)" />
      <Circle cx="36" cy="44" r="4" fill="rgba(255,255,255,0.3)" />
    </Svg>
  );
}

const SPECS = [
  { label: 'Tipe', value: 'EV', Icon: BoltIcon, iconColor: C.green },
  { label: 'Transmisi', value: 'Automatic', Icon: WalletIcon, iconColor: null },
  { label: 'Tarif Harian', value: 'Rp 200.000', Icon: WalletIcon, iconColor: null },
  { label: 'Tahun', value: '2025', Icon: CalendarIcon, iconColor: null },
];

const ACTIONS = [
  { label: 'QR BBM', sub: 'Scan untuk isi bahan bakar', Icon: BoltIcon },
  { label: 'Lapor Kerusakan', sub: 'Kirim laporan kondisi kendaraan', Icon: ShieldIcon },
  { label: 'Jadwal Servis', sub: 'Berikutnya 12 Jun 2026', Icon: WalletIcon },
  { label: 'Asuransi', sub: 'Berlaku hingga Des 2026', Icon: CalendarIcon },
];

export default function VehicleDetailScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back + title */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ArrowRightIcon size={20} color={C.ink900} strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Detail Kendaraan</Text>
        </View>

        {/* Hero card */}
        <LinearGradient
          colors={[brand.primary, brand.deep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          {/* Decorative circles */}
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg width="100%" height="100%">
              <Circle cx="280" cy="-10" r="100" fill="rgba(255,255,255,0.07)" />
              <Circle cx="320" cy="100" r="60" fill="rgba(255,255,255,0.05)" />
            </Svg>
          </View>

          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>AKTIF</Text>
          </View>

          <Text style={styles.heroMake}>BYD</Text>
          <Text style={styles.heroModel}>M6 Standard</Text>

          <View style={styles.heroMeta}>
            <Text style={styles.heroMetaText}>B 2845 EVS</Text>
            <Text style={styles.heroMetaDot}>·</Text>
            <Text style={styles.heroMetaText}>No. Rangka A1B2C3D4E5F6G7H89</Text>
          </View>

          {/* Car silhouette */}
          <View style={styles.heroCarWrap}>
            <CarSilhouette color={brand.primary} />
          </View>
        </LinearGradient>

        {/* Spec grid */}
        <View style={styles.specGrid}>
          {SPECS.map((s) => (
            <View key={s.label} style={styles.specCell}>
              <View style={[styles.specIconBox, { backgroundColor: brand.surface }]}>
                <s.Icon size={18} color={s.iconColor || brand.primary} strokeWidth={2} />
              </View>
              <Text style={styles.specValue}>{s.value}</Text>
              <Text style={styles.specLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Status card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status Kendaraan</Text>

          <View style={styles.batteryRow}>
            <View style={styles.batteryLeft}>
              <Text style={[styles.batteryPct, { color: C.green }]}>78%</Text>
              <Text style={styles.batteryLabel}>Baterai</Text>
            </View>
            <View style={styles.batteryRight}>
              <View style={styles.odoRow}>
                <Text style={styles.odoValue}>12.485 km</Text>
                <Text style={styles.odoLabel}>Odometer</Text>
              </View>
            </View>
          </View>

          <View style={styles.batteryTrack}>
            <View style={[styles.batteryFill, { width: '78%', backgroundColor: C.green }]} />
          </View>

          <View style={styles.rangeRow}>
            <BoltIcon size={14} color={C.green} />
            <Text style={styles.rangeText}>Estimasi jarak tempuh: <Text style={{ fontWeight: '700', color: C.ink900 }}>312 km</Text></Text>
          </View>
        </View>

        {/* Action list */}
        <View style={styles.card}>
          {ACTIONS.map((a, i) => (
            <View key={a.label}>
              <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
                <View style={[styles.actionIconBox, { backgroundColor: brand.surface }]}>
                  <a.Icon size={18} color={brand.primary} strokeWidth={2} />
                </View>
                <View style={styles.actionInfo}>
                  <Text style={styles.actionLabel}>{a.label}</Text>
                  <Text style={styles.actionSub}>{a.sub}</Text>
                </View>
                <ArrowRightIcon size={16} color={C.ink400} strokeWidth={2.5} />
              </TouchableOpacity>
              {i < ACTIONS.length - 1 && <View style={styles.actionSep} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },

  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  screenTitle: { fontSize: 18, fontWeight: '800', color: C.ink900, letterSpacing: -0.3 },

  heroCard: { borderRadius: 22, padding: 20, overflow: 'hidden', marginBottom: 14 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 14 },
  heroBadgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.green },
  heroBadgeText: { fontSize: 11, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  heroMake: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase' },
  heroModel: { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.5, marginTop: 2 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  heroMetaText: { fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: '600' },
  heroMetaDot: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  heroCarWrap: { alignItems: 'center', marginTop: 14 },

  specGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  specCell: { flex: 1, minWidth: '44%', backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'flex-start', gap: 6, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  specIconBox: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  specValue: { fontSize: 15, fontWeight: '800', color: C.ink900, marginTop: 2 },
  specLabel: { fontSize: 11, color: C.ink500 },

  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: C.ink900, marginBottom: 14 },

  batteryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  batteryLeft: { flex: 1 },
  batteryRight: { flex: 1, alignItems: 'flex-end' },
  batteryPct: { fontSize: 48, fontWeight: '800', lineHeight: 52, letterSpacing: -2 },
  batteryLabel: { fontSize: 12, color: C.ink500, fontWeight: '600', marginTop: -2 },
  odoRow: { alignItems: 'flex-end' },
  odoValue: { fontSize: 16, fontWeight: '800', color: C.ink900 },
  odoLabel: { fontSize: 11, color: C.ink500, marginTop: 2 },
  batteryTrack: { height: 10, backgroundColor: C.ink100, borderRadius: 5, overflow: 'hidden', marginBottom: 10 },
  batteryFill: { height: '100%', borderRadius: 5 },
  rangeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rangeText: { fontSize: 12, color: C.ink500 },

  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  actionIconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionInfo: { flex: 1 },
  actionLabel: { fontSize: 14, fontWeight: '700', color: C.ink900 },
  actionSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  actionSep: { height: 1, backgroundColor: C.ink100, marginHorizontal: 2 },
});
