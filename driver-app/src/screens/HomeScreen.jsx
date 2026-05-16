import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import {
  BellIcon, CarIcon, CalendarIcon, PlaneIcon, BoltIcon,
  TrendIcon, StarIcon,
} from '../components/Icons';
import Avatar from '../components/Avatar';
import CityMap from '../components/CityMap';

export default function HomeScreen({ navigation }) {
  const { status, setStatus, surge, brand, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();
  const isOnline = status !== 'offline';
  const statusLabel = status === 'online' ? t.online : status === 'busy' ? t.busy : t.offline;

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 11 ? t.greeting_morning : h < 15 ? t.greeting_afternoon : t.greeting_evening;
  })();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ambient gradient */}
        <View style={[styles.ambientGrad, { backgroundColor: brand.surface }]} />

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.greeting, { color: brand.primary }]}>{greeting},</Text>
            <Text style={styles.name}>Umaedi</Text>
          </View>
          <TouchableOpacity style={[styles.bellBtn, { backgroundColor: brand.primary }]}>
            <BellIcon size={20} color="#fff" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Status card */}
        <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statusCard}>
          {/* Decorative arc */}
          <View style={[styles.arcDecor, { borderColor: 'rgba(255,255,255,0.18)' }]} />

          <View style={styles.statusCardTop}>
            <View>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, {
                  backgroundColor: status === 'online' ? C.green : status === 'busy' ? C.amber : C.ink400
                }]} />
                <Text style={styles.statusBadgeText}>{statusLabel.toUpperCase()}</Text>
              </View>
              <Text style={styles.earningsLabel}>{t.earnings_today}</Text>
              <Text style={styles.earningsValue}>{Rp(surge ? 412000 : 287500)}</Text>
              <Text style={styles.earningsSub}>
                <Text style={{ fontWeight: '700' }}>+ Rp 78.500</Text> dari 4 trip terakhir
              </Text>
            </View>
            <View style={styles.qrBox}>
              <BoltIcon size={22} color="#fff" />
              <Text style={styles.qrLabel}>QR BBM</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statusCardBottom}>
            <View style={styles.carRow}>
              <CarIcon size={18} color="#fff" />
              <Text style={styles.carText}>{t.car} · {t.plate}</Text>
            </View>
            {/* Toggle */}
            <TouchableOpacity
              style={[styles.toggle, { backgroundColor: isOnline ? '#fff' : 'rgba(0,0,0,0.25)' }]}
              onPress={() => setStatus(isOnline ? 'offline' : 'online')}
            >
              <View style={[styles.toggleThumb, {
                backgroundColor: isOnline ? brand.primary : '#fff',
                transform: [{ translateX: isOnline ? 22 : 2 }],
              }]} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Trip', value: '12', color: C.ink900 },
            { label: 'Jam', value: '6.4', color: C.ink900 },
            { label: 'Acc', value: '94%', color: C.green },
            { label: 'Rating', value: '4.9', color: C.amber, star: true },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <View style={styles.statValueRow}>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                {s.star && <StarIcon size={11} color={C.amber} />}
              </View>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Demand map */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('IncomingOrder')} activeOpacity={0.9}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>{t.nearby_demand}</Text>
              <Text style={styles.cardSub}>SCBD · radius 2 km</Text>
            </View>
            <View style={[styles.demandBadge, {
              backgroundColor: surge ? '#FFE6EE' : '#E6F7F0',
            }]}>
              <TrendIcon size={12} color={surge ? '#E5276E' : C.green} strokeWidth={2.5} />
              <Text style={[styles.demandBadgeText, { color: surge ? '#E5276E' : C.green }]}>
                {surge ? `${t.high} · 1.7×` : t.medium}
              </Text>
            </View>
          </View>
          <View style={styles.mapContainer}>
            <CityMap width={320} height={130} color={brand.primary} deep={brand.deep}
              showHeat showDriver showPickup={false} showDropoff={false} showRoute={false} />
          </View>
          <View style={[styles.mapCta, { marginTop: 10 }]}>
            <Text style={[styles.mapCtaText, { color: brand.primary }]}>Cari order di area ini →</Text>
          </View>
        </TouchableOpacity>

        {/* Upcoming */}
        <View style={styles.card}>
          <View style={[styles.cardHeader, { marginBottom: 8 }]}>
            <Text style={styles.cardTitle}>{t.upcoming}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={[styles.seeAll, { color: brand.primary }]}>{t.see_all} ›</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.upcomingItem} onPress={() => navigation.navigate('IncomingOrder')}>
            <View style={[styles.upcomingIcon, { backgroundColor: '#E3F0FA' }]}>
              <PlaneIcon size={20} color={brand.deep} />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingTitle}>CGK T3 → Menteng</Text>
              <Text style={styles.upcomingSub}>Besok, 06.30 · Bpk. Hadi</Text>
            </View>
            <View style={styles.upcomingRight}>
              <Text style={styles.upcomingFare}>Rp 285k</Text>
              <Text style={[styles.upcomingTag, { color: brand.primary }]}>Airport</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.upcomingItem, { borderBottomWidth: 0 }]} onPress={() => navigation.navigate('TagihanDetail')}>
            <View style={[styles.upcomingIcon, { backgroundColor: brand.surface }]}>
              <CalendarIcon size={20} color={brand.primary} />
            </View>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingTitle}>Rental Harian — Ny. Sari</Text>
              <Text style={styles.upcomingSub}>Sab 18 Mei · 8 jam</Text>
            </View>
            <View style={styles.upcomingRight}>
              <Text style={styles.upcomingFare}>Rp 650k</Text>
              <Text style={[styles.upcomingTag, { color: brand.primary }]}>Rental</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Simulate order CTA */}
        <TouchableOpacity
          style={[styles.simulateBtn, { backgroundColor: brand.primary }]}
          onPress={() => navigation.navigate('IncomingOrder')}
        >
          <BoltIcon size={18} color="#fff" />
          <Text style={styles.simulateBtnText}>{t.simulate_order}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18 },
  ambientGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 240, opacity: 0.6 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 6 },
  greeting: { fontSize: 16, fontWeight: '600' },
  name: { fontSize: 24, fontWeight: '800', color: C.ink900, letterSpacing: -0.5, marginTop: 2 },
  bellBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: C.amber, borderWidth: 2, borderColor: '#fff' },
  modeTabs: { flexDirection: 'row', gap: 8, marginTop: 18, backgroundColor: '#fff', padding: 4, borderRadius: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  modeTab: { flex: 1, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 4, borderRadius: 10, gap: 4 },
  modeLabel: { fontSize: 11, fontWeight: '700' },
  statusCard: { marginTop: 14, borderRadius: 22, padding: 18, overflow: 'hidden' },
  arcDecor: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, borderWidth: 1.5, opacity: 0.18, borderColor: '#fff' },
  statusCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.18)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff' },
  earningsLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 12 },
  earningsValue: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -0.5, lineHeight: 36, marginTop: 2 },
  earningsSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  qrBox: { width: 64, height: 64, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', gap: 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },
  qrLabel: { fontSize: 9, color: '#fff', fontWeight: '700' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.18)', marginVertical: 14 },
  statusCardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  carRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  carText: { color: '#fff', fontSize: 13, fontWeight: '600', opacity: 0.9 },
  toggle: { width: 50, height: 28, borderRadius: 14, justifyContent: 'center' },
  toggleThumb: { position: 'absolute', width: 22, height: 22, borderRadius: 11, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },
  statsRow: { marginTop: 12, flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  statValueRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statValue: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  statLabel: { fontSize: 10.5, color: C.ink400, marginTop: 1, fontWeight: '600' },
  card: { marginTop: 14, backgroundColor: '#fff', borderRadius: 18, padding: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: C.ink900 },
  cardSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  demandBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  demandBadgeText: { fontSize: 11, fontWeight: '700' },
  mapContainer: { borderRadius: 12, overflow: 'hidden', height: 130 },
  mapCta: { alignItems: 'center' },
  mapCtaText: { fontSize: 12, fontWeight: '700' },
  seeAll: { fontSize: 11, fontWeight: '700' },
  upcomingItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: C.ink100 },
  upcomingIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  upcomingInfo: { flex: 1 },
  upcomingTitle: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  upcomingSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  upcomingRight: { alignItems: 'flex-end' },
  upcomingFare: { fontSize: 13, fontWeight: '800', color: C.ink900 },
  upcomingTag: { fontSize: 10, fontWeight: '700', marginTop: 1 },
  simulateBtn: { marginTop: 20, borderRadius: 16, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  simulateBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
