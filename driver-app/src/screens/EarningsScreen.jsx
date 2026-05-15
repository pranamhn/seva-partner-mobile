import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { WalletIcon, TrendIcon, CarIcon, CalendarIcon, PlaneIcon } from '../components/Icons';

const BARS = [
  { d: 'Sen', v: 180 }, { d: 'Sel', v: 210 }, { d: 'Rab', v: 320 },
  { d: 'Kam', v: 285 }, { d: 'Jum', v: 412 }, { d: 'Sab', v: 240 }, { d: 'Min', v: 0 },
];
const MAX_BAR = Math.max(...BARS.map((b) => b.v));

export default function EarningsScreen() {
  const { surge, brand, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState(1);

  const total = surge ? 1842000 : 1428000;
  const target = 2000000;
  const pct = Math.min(100, Math.round((total / target) * 100));

  const periods = [t.today, t.week, t.month];

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Ambient */}
      <View style={[styles.topGrad, { backgroundColor: brand.surface }]} />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t.earnings}</Text>
          <Text style={styles.subtitle}>Senin – Minggu</Text>
        </View>
        <TouchableOpacity style={styles.walletBtn}>
          <WalletIcon size={20} color={brand.primary} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {/* Period selector */}
      <View style={styles.periodRow}>
        {periods.map((p, i) => (
          <TouchableOpacity
            key={p}
            style={[styles.periodBtn, i === period && { backgroundColor: brand.primary }]}
            onPress={() => setPeriod(i)}
          >
            <Text style={[styles.periodBtnText, i === period && { color: '#fff' }]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hero earnings card */}
      <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
        <View style={styles.heroDecor} />
        <Text style={styles.heroLabel}>Pendapatan {periods[period].toLowerCase()}</Text>
        <Text style={styles.heroValue}>{Rp(total)}</Text>
        <View style={styles.heroFooter}>
          <Text style={styles.heroTargetLabel}>{t.weekly_target}: {Rp(target)}</Text>
          <Text style={styles.heroPct}>{pct}%</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
      </LinearGradient>

      {/* Bar chart */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Per hari (ribu)</Text>
          <View style={styles.trendBadge}>
            <TrendIcon size={12} color={C.green} strokeWidth={2.5} />
            <Text style={styles.trendText}>+18%</Text>
          </View>
        </View>
        <View style={styles.barChart}>
          {BARS.map((bar, i) => {
            const h = bar.v === 0 ? 6 : (bar.v / MAX_BAR) * 110;
            const isToday = i === 4;
            return (
              <View key={i} style={styles.barCol}>
                {isToday && <Text style={[styles.barTopLabel, { color: brand.primary }]}>412k</Text>}
                <View style={styles.barFill}>
                  <View
                    style={[styles.bar, {
                      height: h,
                      backgroundColor: isToday ? brand.primary : bar.v === 0 ? C.ink200 : `${brand.primary}30`,
                    }]}
                  />
                </View>
                <Text style={[styles.barDayLabel, { color: isToday ? brand.primary : C.ink400, fontWeight: isToday ? '800' : '600' }]}>{bar.d}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Breakdown by type */}
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Per jenis order</Text>
        {[
          { label: t.mode_ride, value: 842000, n: 24, c: brand.primary, w: 58, Icon: CarIcon },
          { label: t.mode_rental, value: 650000, n: 1, c: '#B47E00', w: 32, Icon: CalendarIcon },
          { label: t.mode_airport, value: 350000, n: 2, c: brand.deep, w: 10, Icon: PlaneIcon },
        ].map((r) => (
          <View key={r.label} style={styles.typeRow}>
            <View style={[styles.typeIcon, { backgroundColor: `${r.c}20` }]}>
              <r.Icon size={18} color={r.c} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.typeHeader}>
                <Text style={styles.typeLabel}>{r.label}</Text>
                <Text style={styles.typeCount}> · {r.n}</Text>
                <Text style={styles.typeValue}>{Rp(r.value)}</Text>
              </View>
              <View style={styles.typeTrack}>
                <View style={[styles.typeFill, { width: `${r.w}%`, backgroundColor: r.c }]} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  topGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 260, opacity: 0.5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 0 },
  title: { fontSize: 24, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: C.ink500, marginTop: 2 },
  walletBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  periodRow: { flexDirection: 'row', marginTop: 14, backgroundColor: '#fff', padding: 4, borderRadius: 12, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  periodBtn: { flex: 1, paddingVertical: 8, paddingHorizontal: 4, borderRadius: 9, alignItems: 'center' },
  periodBtnText: { fontSize: 12, fontWeight: '700', color: C.ink500 },
  heroCard: { marginTop: 14, borderRadius: 22, padding: 20, overflow: 'hidden' },
  heroDecor: { position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: 80, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)' },
  heroLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  heroValue: { fontSize: 36, fontWeight: '800', color: '#fff', letterSpacing: -1, marginTop: 4, lineHeight: 40 },
  heroFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  heroTargetLabel: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  heroPct: { fontSize: 13, color: '#fff', fontWeight: '700' },
  progressTrack: { marginTop: 6, height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  card: { marginTop: 14, backgroundColor: '#fff', borderRadius: 18, padding: 16, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: C.ink900 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendText: { fontSize: 11, color: C.green, fontWeight: '700' },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', height: 130, paddingBottom: 18 },
  barCol: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end', position: 'relative' },
  barTopLabel: { position: 'absolute', top: 0, fontSize: 10, fontWeight: '800' },
  barFill: { flex: 1, justifyContent: 'flex-end', width: '80%' },
  bar: { width: '100%', borderRadius: 6 },
  barDayLabel: { fontSize: 10, marginTop: 4, position: 'absolute', bottom: 0 },
  typeRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  typeIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  typeHeader: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  typeLabel: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  typeCount: { fontSize: 11, color: C.ink400 },
  typeValue: { marginLeft: 'auto', fontSize: 13, fontWeight: '700', color: C.ink900 },
  typeTrack: { height: 6, backgroundColor: C.ink100, borderRadius: 3, overflow: 'hidden' },
  typeFill: { height: '100%', borderRadius: 3 },
});
