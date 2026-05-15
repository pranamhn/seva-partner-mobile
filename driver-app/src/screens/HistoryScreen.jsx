import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { CarIcon, CalendarIcon, PlaneIcon, CloseIcon, FilterIcon } from '../components/Icons';

const TRIPS = [
  { day: 'Hari ini · Kamis 15 Mei', items: [
    { time: '13:42', from: 'Pacific Place', to: 'Plaza Indonesia', fare: 69200, type: 'ride', dist: '8.4 km' },
    { time: '11:28', from: 'Senayan City', to: 'Kuningan City', fare: 42000, type: 'ride', dist: '5.1 km' },
    { time: '09:15', from: 'Tebet Eco Park', to: 'CGK T3', fare: 285000, type: 'airport', dist: '32 km' },
  ]},
  { day: 'Kemarin · Rabu 14 Mei', items: [
    { time: '18:05', from: 'Grand Indonesia', to: 'Pondok Indah', fare: 78500, type: 'ride', dist: '12 km' },
    { time: '14:30', from: 'Menteng Trenggulun', to: '', fare: 0, type: 'ride', status: 'cancel', dist: '-' },
    { time: '10:00', from: 'Rental Harian — Ny. Putri', to: '8 jam', fare: 650000, type: 'rental', dist: '—' },
  ]},
];

const TYPE_ICON = { ride: CarIcon, rental: CalendarIcon, airport: PlaneIcon };

export default function HistoryScreen() {
  const { brand, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'ride', label: t.mode_ride },
    { id: 'rental', label: t.mode_rental },
    { id: 'airport', label: t.mode_airport },
    { id: 'cancel', label: t.cancelled },
  ];

  const typeMeta = {
    ride:    { bg: brand.surface, fg: brand.primary, label: t.mode_ride },
    rental:  { bg: '#FFF4D6', fg: '#B47E00', label: t.mode_rental },
    airport: { bg: '#E3F0FA', fg: brand.deep, label: t.mode_airport },
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t.riwayat}</Text>
          <Text style={styles.subtitle}>32 trip bulan ini · Rp 4.215.000</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <FilterIcon size={20} color={brand.primary} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.chip, filter === f.id && { backgroundColor: brand.primary }]}
            onPress={() => setFilter(f.id)}
          >
            <Text style={[styles.chipText, filter === f.id && { color: '#fff' }]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {TRIPS.map((g) => (
        <View key={g.day} style={styles.group}>
          <Text style={styles.dayLabel}>{g.day.toUpperCase()}</Text>
          <View style={styles.groupCard}>
            {g.items
              .filter((it) => filter === 'all' || filter === it.type || (filter === 'cancel' && it.status === 'cancel'))
              .map((it, i, arr) => {
                const m = typeMeta[it.type];
                const IconComp = TYPE_ICON[it.type];
                const cancelled = it.status === 'cancel';
                return (
                  <View key={i} style={[styles.tripRow, i < arr.length - 1 && styles.tripRowBorder]}>
                    <View style={[styles.typeIcon, { backgroundColor: cancelled ? '#FEE2E2' : m.bg }]}>
                      {cancelled
                        ? <CloseIcon size={20} color={C.red} strokeWidth={2.4} />
                        : <IconComp size={20} color={m.fg} />
                      }
                    </View>
                    <View style={styles.tripInfo}>
                      <Text style={styles.tripRoute} numberOfLines={1}>
                        {it.from}{!cancelled && it.to ? ` → ${it.to}` : ''}
                      </Text>
                      <View style={styles.tripMeta}>
                        <Text style={styles.tripMetaText}>{it.time}</Text>
                        {it.dist !== '-' && it.dist !== '—' && (
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
  filterScroll: { marginBottom: 16 },
  filterRow: { flexDirection: 'row', gap: 8, paddingRight: 18 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999, backgroundColor: '#fff', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  chipText: { fontSize: 12, fontWeight: '700', color: C.ink500 },
  group: { marginBottom: 16 },
  dayLabel: { fontSize: 11, fontWeight: '800', color: C.ink400, letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4 },
  groupCard: { backgroundColor: '#fff', borderRadius: 18, padding: 4, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  tripRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 10 },
  tripRowBorder: { borderBottomWidth: 1, borderBottomColor: C.ink100 },
  typeIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  tripInfo: { flex: 1, minWidth: 0 },
  tripRoute: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  tripMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 },
  tripMetaText: { fontSize: 11, color: C.ink500 },
  metaDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: C.ink300 },
  tripFare: { fontSize: 13, fontWeight: '800', color: C.ink900 },
});
