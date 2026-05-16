import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import {
  BellIcon, BoltIcon, TrendIcon, StarIcon, QRIcon, SearchIcon,
} from '../components/Icons';
import RealMap from '../components/RealMap';

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
          <TouchableOpacity
            style={[styles.bellBtn, { backgroundColor: brand.primary }]}
            onPress={() => navigation.navigate('Notifications')}
          >
            <BellIcon size={20} color="#fff" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Status card */}
        <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.statusCard}>
          {/* Decorative circles */}
          <View style={styles.decor1} />
          <View style={styles.decor2} />

          <View style={styles.statusCardTop}>
            <View style={{ flex: 1 }}>
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
              <QRIcon size={32} color={brand.primary} strokeWidth={2} />
              <Text style={styles.qrLabel}>QR BBM</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statusCardBottom}>
            <Text style={styles.carText}>{t.car}</Text>
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

        {/* Stats — single card with 4 columns */}
        <View style={styles.statsCard}>
          {[
            { label: 'TRIP',       value: '12',  color: C.ink900 },
            { label: 'JAM ONLINE', value: '6.4', color: C.ink900 },
            { label: 'ACCEPTANCE', value: '94%', color: C.green },
            { label: 'RATING',     value: '4.9', color: C.amber, star: true },
          ].map((s, i) => (
            <View key={s.label} style={[styles.statCell, i < 3 && styles.statCellBorder]}>
              <View style={styles.statValueRow}>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                {s.star && <StarIcon size={11} color={C.amber} />}
              </View>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Demand map */}
        <View style={styles.demandCard}>
          {/* Header */}
          <View style={styles.demandHeader}>
            <View>
              <Text style={styles.cardTitle}>{t.nearby_demand}</Text>
              <Text style={styles.cardSub}>SCBD · radius 2 km</Text>
            </View>
            <View style={[styles.demandBadge, { backgroundColor: surge ? '#FFE6EE' : '#E6F7F0' }]}>
              <TrendIcon size={12} color={surge ? '#E5276E' : C.green} strokeWidth={2.5} />
              <Text style={[styles.demandBadgeText, { color: surge ? '#E5276E' : C.green }]}>
                {surge ? `${t.high} · 1.7×` : t.medium}
              </Text>
            </View>
          </View>

          {/* Map — edge-to-edge */}
          <View style={styles.demandMapWrap}>
            <RealMap mode="demand" color={brand.primary} deep={brand.deep} />

            {/* Floating overlay */}
            <View style={styles.mapOverlayRow}>
              <View style={styles.mapInfoPill}>
                <View style={[styles.mapInfoDot, { backgroundColor: brand.primary }]} />
                <Text style={styles.mapInfoText}>8 order tersedia · SCBD</Text>
              </View>
              {surge && (
                <View style={styles.mapSurgePill}>
                  <BoltIcon size={10} color="#fff" />
                  <Text style={styles.mapSurgeText}>1.7× Surge</Text>
                </View>
              )}
            </View>
          </View>

          {/* CTA */}
          <View style={styles.demandFooter}>
            <TouchableOpacity
              style={styles.findOrderBtn}
              onPress={() => navigation.navigate('OrderList')}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[brand.primary, brand.deep]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.findOrderGrad}
              >
                <SearchIcon size={17} color="#fff" strokeWidth={2.5} />
                <Text style={styles.findOrderText}>Cari Order</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18 },
  ambientGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 260, opacity: 0.5 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 6 },
  greeting: { fontSize: 18, fontWeight: '600' },
  name: { fontSize: 26, fontWeight: '800', color: C.ink900, letterSpacing: -0.5, marginTop: 2 },
  bellBtn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderRadius: 5, backgroundColor: C.amber, borderWidth: 2, borderColor: '#fff' },
  statusCard: { marginTop: 18, borderRadius: 22, padding: 18, overflow: 'hidden' },
  decor1: { position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: 90, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)' },
  decor2: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: 60, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.10)' },
  statusCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#0E1A24', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, alignSelf: 'flex-start' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusBadgeText: { fontSize: 12, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  earningsLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 14 },
  earningsValue: { fontSize: 34, fontWeight: '800', color: '#fff', letterSpacing: -0.5, lineHeight: 40, marginTop: 2 },
  earningsSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  qrBox: { width: 76, height: 76, borderRadius: 16, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', gap: 4 },
  qrLabel: { fontSize: 10, fontWeight: '800', color: '#0E1A24' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 14 },
  statusCardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  carText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  toggle: { width: 50, height: 28, borderRadius: 14, justifyContent: 'center' },
  toggleThumb: { position: 'absolute', width: 22, height: 22, borderRadius: 11, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 },
  statsCard: { marginTop: 12, backgroundColor: '#fff', borderRadius: 18, flexDirection: 'row', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  statCell: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  statCellBorder: { borderRightWidth: 1, borderRightColor: C.ink100 },
  statValueRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statValue: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  statLabel: { fontSize: 9.5, color: C.ink400, marginTop: 2, fontWeight: '700', letterSpacing: 0.3 },
  demandCard: { marginTop: 14, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  demandHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingTop: 14, paddingBottom: 12 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: C.ink900 },
  cardSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  demandBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  demandBadgeText: { fontSize: 11, fontWeight: '700' },
  demandMapWrap: { height: 200, position: 'relative' },
  mapOverlayRow: { position: 'absolute', bottom: 10, left: 10, flexDirection: 'row', gap: 6 },
  mapInfoPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(14,26,36,0.72)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  mapInfoDot: { width: 7, height: 7, borderRadius: 4 },
  mapInfoText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  mapSurgePill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FF4F8B', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 999 },
  mapSurgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  demandFooter: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 14 },
  findOrderBtn: { borderRadius: 14, overflow: 'hidden' },
  findOrderGrad: { height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  findOrderText: { color: '#fff', fontWeight: '800', fontSize: 15 },
});
