import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { CheckIcon, StarIcon } from '../components/Icons';
import Avatar from '../components/Avatar';

export default function TripCompleteScreen({ navigation, route }) {
  const { surge, brand, setStatus, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(5);

  const fareFromTrip = route.params?.fare;
  const base = 38000;
  const bonus = surge ? 26200 : 0;
  const tip = 5000;
  const total = fareFromTrip || (base + bonus + tip);

  const handleContinue = () => {
    setStatus('online');
    navigation.navigate('Main');
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Ambient gradient */}
      <View style={[styles.topGrad, { backgroundColor: brand.surface }]} />

      {/* Success icon */}
      <View style={styles.successSection}>
        <View style={styles.successRing}>
          <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.successCircle}>
            <CheckIcon size={36} color="#fff" strokeWidth={3.5} />
          </LinearGradient>
        </View>
        <Text style={styles.completeLabel}>{t.trip_complete}</Text>
        <Text style={styles.totalFare}>{Rp(total)}</Text>
        <Text style={styles.routeInfo}>Pacific Place → Plaza Indonesia · 8.4 km</Text>
      </View>

      {/* Breakdown */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Rincian</Text>
        {[
          { l: t.base_fare, v: base, c: C.ink900 },
          ...(surge ? [{ l: `${t.surge} (1.7×)`, v: bonus, c: '#E5276E', bold: true }] : []),
          { l: t.tips, v: tip, c: C.green },
        ].map((r) => (
          <View key={r.l} style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{r.l}</Text>
            <Text style={[styles.breakdownValue, { color: r.c, fontWeight: r.bold ? '800' : '600' }]}>
              + {Rp(r.v)}
            </Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t.total}</Text>
          <Text style={[styles.totalValue, { color: brand.deep }]}>{Rp(total)}</Text>
        </View>
      </View>

      {/* Rating */}
      <View style={styles.card}>
        <View style={styles.ratingHeader}>
          <Avatar name="Rina P" size={40} bg={brand.deep} />
          <View style={{ flex: 1 }}>
            <Text style={styles.riderName}>Rina P.</Text>
            <Text style={styles.ratingHint}>{t.rate_rider}</Text>
          </View>
        </View>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starBtn}>
              <StarIcon size={32} color={i <= rating ? C.amber : C.ink200} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.detailBtn}>
          <Text style={styles.detailBtnText}>{t.detail}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueBtnWrap} onPress={handleContinue}>
          <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.continueBtn}>
            <Text style={styles.continueBtnText}>Lanjut cari order →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  topGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 320, opacity: 0.6 },
  successSection: { alignItems: 'center', marginTop: 20 },
  successRing: { width: 88, height: 88, position: 'relative' },
  successCircle: { position: 'absolute', top: 10, left: 10, right: 10, bottom: 10, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  completeLabel: { fontSize: 14, color: C.ink500, marginTop: 18, fontWeight: '600' },
  totalFare: { fontSize: 44, fontWeight: '800', color: C.ink900, letterSpacing: -1.5, marginTop: 6 },
  routeInfo: { fontSize: 12, color: C.ink500, marginTop: 6 },
  card: { marginTop: 24, backgroundColor: '#fff', borderRadius: 18, padding: 16, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 13, fontWeight: '800', color: C.ink900, marginBottom: 10 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  breakdownLabel: { fontSize: 13, color: C.ink500 },
  breakdownValue: { fontSize: 13 },
  divider: { height: 1, backgroundColor: C.ink100, marginVertical: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  totalLabel: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  totalValue: { fontSize: 22, fontWeight: '800' },
  ratingHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  riderName: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  ratingHint: { fontSize: 11, color: C.ink500, marginTop: 1 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  starBtn: { padding: 4 },
  actionsRow: { marginTop: 14, flexDirection: 'row', gap: 10 },
  detailBtn: { flex: 1, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: C.ink200, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  detailBtnText: { fontSize: 14, fontWeight: '700', color: C.ink500 },
  continueBtnWrap: { flex: 2, borderRadius: 14, overflow: 'hidden' },
  continueBtn: { height: 52, alignItems: 'center', justifyContent: 'center' },
  continueBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
