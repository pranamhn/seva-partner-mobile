import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { useApp } from '../context/AppContext';
import { Rp } from '../constants/copy';
import { C } from '../constants/colors';
import {
  FilterIcon, BoltIcon, CalendarIcon, ClockIcon, WalletIcon, CheckIcon,
} from '../components/Icons';

export default function TagihanScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Tagihan &amp; Sewa</Text>
          <Text style={styles.subtitle}>3 tagihan menunggu pembayaran</Text>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <FilterIcon size={20} color={brand.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Active car card */}
      <LinearGradient
        colors={[brand.primary, brand.deep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.carCard}
      >
        {/* Decorative SVG circles */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Svg width="100%" height="100%">
            <Circle cx="270" cy="-10" r="90" fill="rgba(255,255,255,0.08)" />
            <Circle cx="300" cy="90" r="55" fill="rgba(255,255,255,0.05)" />
            <Circle cx="30" cy="120" r="50" fill="rgba(255,255,255,0.04)" />
          </Svg>
        </View>

        {/* SEWA AKTIF badge */}
        <View style={styles.sewaBadge}>
          <Text style={styles.sewaBadgeText}>SEWA AKTIF</Text>
        </View>

        {/* Car name + QR button row */}
        <View style={styles.carCardTop}>
          <View>
            <Text style={styles.carName}>BYD M6 Standard</Text>
            <Text style={styles.carRate}>{Rp(200000)}/hari</Text>
          </View>
          <TouchableOpacity style={styles.qrBtn}>
            <BoltIcon size={20} color="#fff" />
            <Text style={styles.qrBtnText}>QR BBM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.carDivider} />

        {/* Bottom specs row */}
        <View style={styles.carCardBottom}>
          <View style={styles.carSpec}>
            <CalendarIcon size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
            <Text style={styles.carSpecText}>B 2845 EVS</Text>
          </View>
          <View style={styles.carSpec}>
            <BoltIcon size={14} color="rgba(255,255,255,0.8)" />
            <Text style={styles.carSpecText}>EV</Text>
          </View>
          <View style={styles.carSpec}>
            <WalletIcon size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
            <Text style={styles.carSpecText}>Auto</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tenor card */}
      <View style={styles.card}>
        <View style={styles.tenorRow}>
          <View style={styles.tenorItem}>
            <View style={[styles.tenorIconBox, { backgroundColor: brand.surface }]}>
              <CalendarIcon size={16} color={brand.primary} strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.tenorValue}>365 Hari</Text>
              <Text style={styles.tenorLabel}>Total tenor</Text>
            </View>
          </View>
          <View style={styles.tenorDividerV} />
          <View style={styles.tenorItem}>
            <View style={[styles.tenorIconBox, { backgroundColor: '#FFF7E6' }]}>
              <ClockIcon size={16} color={C.amber} strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.tenorValue}>79 Hari</Text>
              <Text style={styles.tenorLabel}>Tenor terbayar</Text>
            </View>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '22%', backgroundColor: brand.primary }]} />
        </View>
        <Text style={styles.progressLabel}>
          <Text style={[styles.progressPct, { color: brand.primary }]}>22%</Text>
          {' '}Menuju tenor selesai
        </Text>
      </View>

      {/* Menunggu Pembayaran */}
      <Text style={styles.sectionLabel}>Menunggu Pembayaran</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.billItem}
          onPress={() => navigation.navigate('TagihanDetail')}
          activeOpacity={0.7}
        >
          <View style={[styles.billIcon, { backgroundColor: '#FEE9EA' }]}>
            <CalendarIcon size={18} color={C.red} strokeWidth={2} />
          </View>
          <View style={styles.billInfo}>
            <Text style={styles.billName}>Biaya Registrasi</Text>
            <Text style={styles.billDue}>Jatuh tempo 20 Mei 2026</Text>
          </View>
          <Text style={[styles.billAmount, { color: C.red }]}>{Rp(198000)}</Text>
        </TouchableOpacity>

        <View style={styles.billSeparator} />

        <TouchableOpacity style={styles.billItem} activeOpacity={0.7}>
          <View style={[styles.billIcon, { backgroundColor: '#FEF3CD' }]}>
            <CalendarIcon size={18} color={C.amber} strokeWidth={2} />
          </View>
          <View style={styles.billInfo}>
            <Text style={styles.billName}>Cicilan Mei 2026</Text>
            <Text style={styles.billDue}>Jatuh tempo 25 Mei 2026</Text>
          </View>
          <Text style={[styles.billAmount, { color: C.amber }]}>{Rp(650000)}</Text>
        </TouchableOpacity>
      </View>

      {/* Riwayat Pembayaran */}
      <Text style={styles.sectionLabel}>Riwayat Pembayaran</Text>
      <View style={styles.card}>
        {[
          { name: 'Cicilan April 2026', sub: 'Dibayar 25 Apr 2026', amount: 6500000 },
          { name: 'Biaya Registrasi Termin 2', sub: 'Dibayar 10 Apr 2026', amount: 152000 },
          { name: 'Cicilan Maret 2026', sub: 'Dibayar 25 Mar 2026', amount: 6500000 },
        ].map((item, index, arr) => (
          <View key={item.name}>
            <View style={styles.billItem}>
              <View style={[styles.billIcon, { backgroundColor: '#E6F9F1' }]}>
                <CheckIcon size={18} color={C.green} strokeWidth={2.5} />
              </View>
              <View style={styles.billInfo}>
                <Text style={styles.billName}>{item.name}</Text>
                <Text style={[styles.billDue, { color: C.green }]}>{item.sub}</Text>
              </View>
              <Text style={[styles.billAmount, { color: C.ink500 }]}>{Rp(item.amount)}</Text>
            </View>
            {index < arr.length - 1 && <View style={styles.billSeparator} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: C.ink500, marginTop: 2 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  carCard: { borderRadius: 22, padding: 18, overflow: 'hidden', marginBottom: 14 },
  sewaBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.22)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 14 },
  sewaBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },
  carCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  carName: { fontSize: 20, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  carRate: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  qrBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', borderRadius: 12, width: 60, height: 60, gap: 3 },
  qrBtnText: { fontSize: 9, fontWeight: '700', color: '#fff' },
  carDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 14 },
  carCardBottom: { flexDirection: 'row', gap: 18 },
  carSpec: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  carSpecText: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  tenorRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  tenorItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  tenorIconBox: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  tenorDividerV: { width: 1, height: 36, backgroundColor: C.ink100, marginHorizontal: 12 },
  tenorValue: { fontSize: 15, fontWeight: '800', color: C.ink900 },
  tenorLabel: { fontSize: 11, color: C.ink500, marginTop: 1 },
  progressTrack: { height: 8, backgroundColor: C.ink100, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  progressLabel: { fontSize: 12, color: C.ink500, marginTop: 8 },
  progressPct: { fontWeight: '800' },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.ink400, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8, marginLeft: 2 },
  billItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  billIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  billInfo: { flex: 1 },
  billName: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  billDue: { fontSize: 11, color: C.ink500, marginTop: 2 },
  billAmount: { fontSize: 13, fontWeight: '800', color: C.ink900 },
  billSeparator: { height: 1, backgroundColor: C.ink100, marginVertical: 8 },
});
