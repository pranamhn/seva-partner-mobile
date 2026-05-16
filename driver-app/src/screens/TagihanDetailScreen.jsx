import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { ArrowRightIcon, ClockIcon, CalendarIcon, CarIcon } from '../components/Icons';

export default function TagihanDetailScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button row */}
        <View style={styles.backRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ArrowRightIcon size={20} color={C.ink900} strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Detail Tagihan</Text>
        </View>

        {/* Due soon badge */}
        <View style={styles.dueBadge}>
          <ClockIcon size={14} color={C.red} strokeWidth={2} />
          <Text style={styles.dueBadgeText}>Jatuh tempo 4 hari lagi</Text>
        </View>

        {/* Sisa Tagihan card */}
        <View style={styles.card}>
          <Text style={styles.sisaLabel}>Sisa Tagihan</Text>
          <Text style={styles.sisaAmount}>{Rp(198000)}</Text>
          <View style={styles.sisaInnerRow}>
            <View style={[styles.sisaIconBox, { backgroundColor: brand.surface }]}>
              <CalendarIcon size={18} color={brand.primary} strokeWidth={2} />
            </View>
            <View style={styles.sisaInnerInfo}>
              <Text style={styles.sisaInnerTitle}>Biaya Registrasi</Text>
              <Text style={styles.sisaInnerSub}>No. tagihan INV-202604-0091</Text>
            </View>
          </View>
        </View>

        {/* Rincian Biaya card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rincian Biaya</Text>

          <View style={styles.rincianRow}>
            <Text style={styles.rincianLabel}>Total Biaya Registrasi</Text>
            <Text style={[styles.rincianValue, { color: C.ink900 }]}>{Rp(350000)}</Text>
          </View>
          <View style={styles.rincianRow}>
            <Text style={styles.rincianLabel}>Termin 1</Text>
            <Text style={[styles.rincianValue, { color: C.green }]}>− {Rp(100000)}</Text>
          </View>
          <View style={styles.rincianRow}>
            <Text style={styles.rincianLabel}>Termin 2</Text>
            <Text style={[styles.rincianValue, { color: C.green }]}>− {Rp(52000)}</Text>
          </View>

          <View style={styles.dashedSep} />

          <View style={styles.rincianRow}>
            <Text style={[styles.rincianLabel, { fontWeight: '700', color: C.ink900 }]}>Sisa Tagihan</Text>
            <Text style={[styles.rincianValue, { color: C.amber, fontWeight: '800', fontSize: 16 }]}>{Rp(198000)}</Text>
          </View>
        </View>

        {/* Kendaraan card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kendaraan</Text>
          <View style={styles.kendaraanRow}>
            <View style={[styles.kendaraanIconBox, { backgroundColor: brand.surface }]}>
              <CarIcon size={22} color={brand.primary} strokeWidth={2} />
            </View>
            <View style={styles.kendaraanInfo}>
              <Text style={styles.kendaraanName}>BYD M6 Standard</Text>
              <Text style={styles.kendaraanSub}>B 2845 EVS · EV · Automatic</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom pay button */}
      <View style={[styles.stickyBottom, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PaymentMethod')}
          activeOpacity={0.85}
          style={styles.payBtnWrapper}
        >
          <LinearGradient
            colors={[brand.primary, brand.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payBtn}
          >
            <Text style={styles.payBtnText}>Bayar Sekarang</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 18 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  screenTitle: { fontSize: 18, fontWeight: '800', color: C.ink900, letterSpacing: -0.3 },
  dueBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: '#FEE9EA', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999, marginBottom: 16 },
  dueBadgeText: { fontSize: 12, fontWeight: '700', color: C.red },
  card: { backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: C.ink900, marginBottom: 14 },
  sisaLabel: { fontSize: 12, color: C.ink500, fontWeight: '600' },
  sisaAmount: { fontSize: 34, fontWeight: '800', color: C.ink900, letterSpacing: -0.5, marginTop: 4, marginBottom: 16 },
  sisaInnerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.ink100, borderRadius: 12, padding: 12 },
  sisaIconBox: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sisaInnerInfo: { flex: 1 },
  sisaInnerTitle: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  sisaInnerSub: { fontSize: 11, color: C.ink500, marginTop: 2 },
  rincianRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  rincianLabel: { fontSize: 13, color: C.ink500 },
  rincianValue: { fontSize: 13, fontWeight: '700' },
  dashedSep: { borderTopWidth: 1.5, borderTopColor: C.ink300, borderStyle: 'dashed', marginVertical: 6 },
  kendaraanRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 2 },
  kendaraanIconBox: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  kendaraanInfo: { flex: 1 },
  kendaraanName: { fontSize: 15, fontWeight: '700', color: C.ink900 },
  kendaraanSub: { fontSize: 12, color: C.ink500, marginTop: 2 },
  stickyBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 18, paddingTop: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.ink100 },
  payBtnWrapper: { borderRadius: 16, overflow: 'hidden' },
  payBtn: { height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  payBtnText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
