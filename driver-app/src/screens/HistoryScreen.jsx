import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { CarIcon, CalendarIcon, PlaneIcon, CloseIcon, FilterIcon, CheckIcon, ClockIcon } from '../components/Icons';

const TRIPS = [
  { day: 'Hari ini · Kamis 15 Mei', items: [
    { time: '13:42', from: 'Pacific Place', to: 'Plaza Indonesia', fare: 69200, type: 'ride', dist: '8.4 km' },
    { time: '11:28', from: 'Senayan City', to: 'Kuningan City', fare: 42000, type: 'ride', dist: '5.1 km' },
    { time: '09:15', from: 'Tebet Eco Park', to: 'CGK T3', fare: 285000, type: 'airport', dist: '32 km' },
  ]},
  { day: 'Kemarin · Rabu 14 Mei', items: [
    { time: '18:05', from: 'Grand Indonesia', to: 'Pondok Indah', fare: 78500, type: 'ride', dist: '12 km' },
    { time: '14:30', from: 'Menteng Trenggulun', to: '', fare: 0, type: 'ride', status: 'cancel' },
  ]},
];

const PAYMENTS = [
  { month: 'Mei 2026', items: [
    { date: '25 Mei', label: 'Cicilan Mei 2026', amount: 6500000, status: 'pending' },
    { date: '20 Mei', label: 'Biaya Registrasi · Sisa', amount: 198000, status: 'pending' },
  ]},
  { month: 'April 2026', items: [
    { date: '23 Apr', label: 'Cicilan April 2026', amount: 6500000, status: 'paid' },
    { date: '15 Apr', label: 'Biaya Registrasi · Termin 2', amount: 152000, status: 'paid' },
  ]},
  { month: 'Maret 2026', items: [
    { date: '24 Mar', label: 'Cicilan Maret 2026', amount: 6500000, status: 'paid' },
    { date: '08 Mar', label: 'Biaya Registrasi · Termin 1', amount: 100000, status: 'paid' },
  ]},
];

export default function HistoryScreen() {
  const { brand, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('trip');

  const typeMeta = {
    ride:    { Icon: CarIcon,      bg: brand.surface, fg: brand.primary, label: t.mode_ride },
    airport: { Icon: PlaneIcon,    bg: '#E3F0FA',     fg: brand.deep,    label: t.mode_airport },
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Riwayat</Text>
          <Text style={styles.subtitle}>
            {activeTab === 'trip' ? '32 trip bulan ini' : 'Cicilan & registrasi'}
          </Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <FilterIcon size={20} color={brand.primary} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {/* Tab switcher */}
      <View style={styles.tabSwitcher}>
        <View style={[styles.tabIndicator, {
          backgroundColor: brand.primary,
          left: activeTab === 'trip' ? 4 : '50%',
        }]} />
        {[
          { id: 'trip', label: 'Trip' },
          { id: 'payment', label: 'Pembayaran' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabBtn}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabBtnText, activeTab === tab.id && styles.tabBtnActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'trip' ? (
        <View style={{ marginTop: 14 }}>
          {TRIPS.map((g) => (
            <View key={g.day} style={styles.group}>
              <Text style={styles.dayLabel}>{g.day.toUpperCase()}</Text>
              <View style={styles.groupCard}>
                {g.items.map((it, i) => {
                  const m = typeMeta[it.type] || typeMeta.ride;
                  const cancelled = it.status === 'cancel';
                  return (
                    <View key={i} style={[styles.tripRow, i < g.items.length - 1 && styles.tripRowBorder]}>
                      <View style={[styles.typeIcon, { backgroundColor: cancelled ? '#FEE2E2' : m.bg }]}>
                        {cancelled
                          ? <CloseIcon size={20} color={C.red} strokeWidth={2.4} />
                          : <m.Icon size={20} color={m.fg} />
                        }
                      </View>
                      <View style={styles.tripInfo}>
                        <Text style={styles.tripRoute} numberOfLines={1}>
                          {it.from}{!cancelled && it.to ? ` → ${it.to}` : ''}
                        </Text>
                        <View style={styles.tripMeta}>
                          <Text style={styles.tripMetaText}>{it.time}</Text>
                          {it.dist && it.dist !== '-' && (
                            <>
                              <View style={styles.metaDot} />
                              <Text style={styles.tripMetaText}>{it.dist}</Text>
                            </>
                          )}
                          <View style={styles.metaDot} />
                          <Text style={[styles.tripMetaText, { color: cancelled ? C.red : m.fg, fontWeight: '700' }]}>
                            {cancelled ? t.cancelled : m.label}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.tripFare, cancelled && { color: C.red }]}>
                        {cancelled ? '—' : Rp(it.fare)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={{ marginTop: 14 }}>
          {PAYMENTS.map((g) => (
            <View key={g.month} style={styles.group}>
              <Text style={styles.dayLabel}>{g.month.toUpperCase()}</Text>
              <View style={styles.groupCard}>
                {g.items.map((it, i) => (
                  <View key={i} style={[styles.tripRow, i < g.items.length - 1 && styles.tripRowBorder]}>
                    <View style={[styles.typeIcon, {
                      backgroundColor: it.status === 'paid' ? '#E6F7F0' : '#FFF4D6',
                    }]}>
                      {it.status === 'paid'
                        ? <CheckIcon size={20} color={C.green} strokeWidth={2.4} />
                        : <ClockIcon size={20} color={C.amber} strokeWidth={2.2} />
                      }
                    </View>
                    <View style={styles.tripInfo}>
                      <Text style={styles.tripRoute}>{it.label}</Text>
                      <Text style={[styles.tripMetaText, {
                        color: it.status === 'paid' ? C.ink500 : C.amber,
                        fontWeight: it.status === 'paid' ? '500' : '700',
                        marginTop: 1,
                      }]}>
                        {it.status === 'paid' ? `Dibayar ${it.date}` : `Jatuh tempo ${it.date}`}
                      </Text>
                    </View>
                    <Text style={styles.tripFare}>{Rp(it.amount)}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: C.ink500, marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  tabSwitcher: { position: 'relative', backgroundColor: '#fff', padding: 4, borderRadius: 12, flexDirection: 'row', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, overflow: 'hidden' },
  tabIndicator: { position: 'absolute', top: 4, bottom: 4, width: '50%', borderRadius: 9 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  tabBtnText: { fontSize: 12, fontWeight: '700', color: C.ink500 },
  tabBtnActive: { color: '#fff' },
  group: { marginBottom: 14 },
  dayLabel: { fontSize: 11, fontWeight: '800', color: C.ink400, letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4 },
  groupCard: { backgroundColor: '#fff', borderRadius: 18, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  tripRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 12 },
  tripRowBorder: { borderBottomWidth: 1, borderBottomColor: C.ink100 },
  typeIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tripInfo: { flex: 1, minWidth: 0 },
  tripRoute: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  tripMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 },
  tripMetaText: { fontSize: 11, color: C.ink500 },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: C.ink300 },
  tripFare: { fontSize: 13, fontWeight: '800', color: C.ink900 },
});
