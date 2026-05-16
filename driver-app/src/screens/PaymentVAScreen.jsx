import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import { ArrowRightIcon, ClockIcon } from '../components/Icons';

export default function PaymentVAScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  const steps = [
    'Login & pilih m-Transfer',
    'Pilih BCA Virtual Account',
    'Masukkan no. VA & PIN',
    'Konfirmasi & selesai',
  ];

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ArrowRightIcon size={20} color={C.ink900} strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Pembayaran BCA VA</Text>
        </View>

        {/* Countdown warning */}
        <View style={styles.countdownBanner}>
          <ClockIcon size={22} color="#B47E00" strokeWidth={2.2} />
          <View style={{ flex: 1 }}>
            <Text style={styles.countdownLabel}>Selesaikan dalam</Text>
            <Text style={styles.countdownTime}>23:42:18</Text>
          </View>
          <View>
            <Text style={styles.countdownBefore}>Sebelum</Text>
            <Text style={styles.countdownDate}>17 Mei · 09:42</Text>
          </View>
        </View>

        {/* VA Card */}
        <View style={styles.vaCard}>
          <View style={styles.bcaRow}>
            <View style={styles.bcaBadge}>
              <Text style={styles.bcaText}>BCA</Text>
            </View>
            <Text style={styles.vaCardTitle}>BCA Virtual Account</Text>
          </View>

          <Text style={styles.vaLabel}>No. Virtual Account</Text>
          <View style={styles.vaNumberRow}>
            <Text style={styles.vaNumber}>0823 1547 8829 1100</Text>
            <TouchableOpacity style={[styles.copyBtn, { backgroundColor: brand.surface }]}>
              <Text style={[styles.copyBtnText, { color: brand.primary }]}>Salin</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.vaDivider} />

          <View style={styles.vaTotalRow}>
            <View>
              <Text style={styles.vaTotalLabel}>Total bayar</Text>
              <Text style={styles.vaTotalValue}>Rp 198.000</Text>
            </View>
            <TouchableOpacity style={[styles.copyBtn, { backgroundColor: brand.surface }]}>
              <Text style={[styles.copyBtnText, { color: brand.primary }]}>Salin</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Steps card */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Cara pembayaran</Text>

          <View style={styles.stepsAccordion}>
            <View style={styles.stepsHeader}>
              <Text style={styles.stepsAccTitle}>m-BCA</Text>
              <ArrowRightIcon size={16} color={brand.primary} strokeWidth={2.5} />
            </View>
            {steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepNum, { backgroundColor: brand.surface }]}>
                  <Text style={[styles.stepNumText, { color: brand.primary }]}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {['ATM BCA', 'KlikBCA Internet Banking'].map((label, i) => (
            <View key={label} style={[styles.accordionRow, i === 0 && styles.accordionRowBorder]}>
              <Text style={styles.accordionLabel}>{label}</Text>
              <ArrowRightIcon size={16} color={C.ink400} strokeWidth={2.5} />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.doneBtn, { borderColor: brand.primary }]}
          onPress={() => navigation.navigate('PaymentSuccess')}
        >
          <Text style={[styles.doneBtnText, { color: brand.primary }]}>Saya sudah bayar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  title: { fontSize: 18, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  countdownBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, paddingHorizontal: 16, backgroundColor: '#FFF4D6', borderRadius: 14, borderWidth: 1, borderColor: '#F5C66E', marginBottom: 14 },
  countdownLabel: { fontSize: 12, color: '#8E5500', fontWeight: '600' },
  countdownTime: { fontSize: 18, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  countdownBefore: { fontSize: 11, color: '#8E5500', textAlign: 'right' },
  countdownDate: { fontSize: 12, fontWeight: '700', color: C.ink900, textAlign: 'right' },
  vaCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, marginBottom: 14 },
  bcaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  bcaBadge: { width: 44, height: 32, borderRadius: 6, backgroundColor: '#003366', alignItems: 'center', justifyContent: 'center' },
  bcaText: { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  vaCardTitle: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  vaLabel: { fontSize: 12, color: C.ink500, marginBottom: 4 },
  vaNumberRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  vaNumber: { flex: 1, fontSize: 22, fontWeight: '800', color: C.ink900, letterSpacing: 0.5 },
  copyBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  copyBtnText: { fontSize: 12, fontWeight: '700' },
  vaDivider: { height: 1, backgroundColor: C.ink100, marginVertical: 14 },
  vaTotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vaTotalLabel: { fontSize: 12, color: C.ink500 },
  vaTotalValue: { fontSize: 22, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  stepsCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, marginBottom: 16 },
  stepsTitle: { fontSize: 14, fontWeight: '800', color: C.ink900, marginBottom: 12 },
  stepsAccordion: { marginBottom: 8 },
  stepsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  stepsAccTitle: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 5 },
  stepNum: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontSize: 11, fontWeight: '800' },
  stepText: { flex: 1, fontSize: 12, color: C.ink500, lineHeight: 18 },
  accordionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  accordionRowBorder: { borderTopWidth: 1, borderTopColor: C.ink100 },
  accordionLabel: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  doneBtn: { height: 52, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  doneBtnText: { fontSize: 14, fontWeight: '700' },
});
