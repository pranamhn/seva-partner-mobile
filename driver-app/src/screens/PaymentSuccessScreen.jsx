import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import { CheckIcon, ShieldIcon } from '../components/Icons';

const RECEIPT = [
  { label: 'No. Transaksi', value: 'TRX-260516-9938421' },
  { label: 'Metode',        value: 'BCA Virtual Account' },
  { label: 'Waktu',         value: '16 Mei 2026 · 13:42' },
  { label: 'Untuk',         value: 'Biaya Registrasi · INV-202604-0091' },
  { label: 'Kendaraan',     value: 'BYD M6 Standard · B 2845 EVS' },
];

export default function PaymentSuccessScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Ambient */}
        <View style={[styles.ambient, { backgroundColor: brand.surface }]} />

        {/* Success icon */}
        <View style={styles.successWrap}>
          <View style={[styles.successPulse, { backgroundColor: brand.primary }]} />
          <LinearGradient
            colors={[brand.primary, brand.deep]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.successCircle}
          >
            <CheckIcon size={42} color="#fff" strokeWidth={3.5} />
          </LinearGradient>
        </View>
        <Text style={[styles.successCaption, { color: brand.primary }]}>Pembayaran Berhasil</Text>
        <Text style={styles.successAmount}>Rp 198.000</Text>
        <Text style={styles.successSub}>Biaya Registrasi · Lunas</Text>

        {/* Receipt card */}
        <View style={styles.receiptCard}>
          <Text style={styles.receiptTitle}>Detail Pembayaran</Text>
          {RECEIPT.map((r) => (
            <View key={r.label} style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>{r.label}</Text>
              <Text style={styles.receiptValue} numberOfLines={1}>{r.value}</Text>
            </View>
          ))}
          {/* Dashed separator */}
          <View style={styles.dashedLine} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total dibayar</Text>
            <Text style={[styles.totalValue, { color: brand.primary }]}>Rp 198.000</Text>
          </View>
        </View>

        {/* Info */}
        <View style={[styles.infoCard, { backgroundColor: brand.surface }]}>
          <ShieldIcon size={20} color={brand.deep} strokeWidth={2} />
          <Text style={[styles.infoText, { color: brand.deep }]}>
            Bukti pembayaran sudah dikirim ke email{' '}
            <Text style={{ fontWeight: '700' }}>umaedi@seva.id</Text>. Tagihan registrasi kamu sekarang{' '}
            <Text style={{ fontWeight: '700' }}>lunas 100%</Text>.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={[styles.bottomBtns, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => navigation.navigate('Tagihan')}
        >
          <Text style={styles.outlineBtnText}>Lihat Tagihan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1.4 }}
          onPress={() => navigation.navigate('Main')}
        >
          <LinearGradient
            colors={[brand.primary, brand.deep]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.gradBtn}
          >
            <Text style={styles.gradBtnText}>Kembali ke Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18, alignItems: 'center' },
  ambient: { position: 'absolute', top: 0, left: 0, right: 0, height: 360, opacity: 0.5 },
  successWrap: { marginTop: 40, width: 96, height: 96, alignItems: 'center', justifyContent: 'center' },
  successPulse: { position: 'absolute', inset: 0, borderRadius: 48, opacity: 0.18 },
  successCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  successCaption: { fontSize: 13, fontWeight: '700', marginTop: 18, letterSpacing: 0.5, textTransform: 'uppercase' },
  successAmount: { fontSize: 36, fontWeight: '800', color: C.ink900, letterSpacing: -1, marginTop: 6 },
  successSub: { fontSize: 12, color: C.ink500, marginTop: 4, marginBottom: 28 },
  receiptCard: { width: '100%', backgroundColor: '#fff', borderRadius: 18, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, overflow: 'hidden', marginBottom: 14 },
  receiptTitle: { fontSize: 13, fontWeight: '800', color: C.ink900, marginBottom: 10, paddingHorizontal: 18, paddingTop: 16 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 6, gap: 12 },
  receiptLabel: { fontSize: 12, color: C.ink500 },
  receiptValue: { fontSize: 12, color: C.ink900, fontWeight: '600', flex: 1, textAlign: 'right' },
  dashedLine: { height: 1, marginHorizontal: 4, marginVertical: 2, borderStyle: 'dashed', borderWidth: 1, borderColor: C.ink300 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14 },
  totalLabel: { fontSize: 13, fontWeight: '800', color: C.ink900 },
  totalValue: { fontSize: 18, fontWeight: '800' },
  infoCard: { width: '100%', flexDirection: 'row', gap: 10, padding: 14, borderRadius: 12, alignItems: 'flex-start' },
  infoText: { flex: 1, fontSize: 12, lineHeight: 18 },
  bottomBtns: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingTop: 14, backgroundColor: '#fff', shadowColor: '#005080', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 10 },
  outlineBtn: { flex: 1, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: C.ink300, alignItems: 'center', justifyContent: 'center' },
  outlineBtnText: { fontSize: 14, fontWeight: '700', color: C.ink500 },
  gradBtn: { height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  gradBtnText: { color: '#fff', fontWeight: '800', fontSize: 14 },
});
