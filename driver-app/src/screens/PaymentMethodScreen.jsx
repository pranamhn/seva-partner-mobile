import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import { ArrowRightIcon } from '../components/Icons';

const METHODS = [
  { group: 'Virtual Account', items: [
    { id: 'bca',  label: 'BCA Virtual Account',     sub: 'Otomatis terverifikasi', bg: '#003366', initials: 'BCA' },
    { id: 'mdr',  label: 'Mandiri Virtual Account',  sub: 'Otomatis terverifikasi', bg: '#0066B3', initials: 'Mdr' },
    { id: 'bni',  label: 'BNI Virtual Account',      sub: 'Otomatis terverifikasi', bg: '#FF6600', initials: 'BNI' },
    { id: 'bri',  label: 'BRI Virtual Account',      sub: 'Otomatis terverifikasi', bg: '#1F4E8B', initials: 'BRI' },
  ]},
  { group: 'E-Wallet', items: [
    { id: 'gopay', label: 'GoPay',  sub: 'Saldo Rp 482.500', bg: '#00AED6', initials: 'Go' },
    { id: 'ovo',   label: 'OVO',   sub: 'Otomatis terverifikasi', bg: '#4C2A85', initials: 'OVO' },
    { id: 'dana',  label: 'DANA',  sub: 'Otomatis terverifikasi', bg: '#1182C6', initials: 'DA' },
  ]},
  { group: 'Lainnya', items: [
    { id: 'card',  label: 'Kartu Kredit/Debit',   sub: 'Visa, Mastercard',      bg: '#0E1A24', initials: '••' },
    { id: 'store', label: 'Convenience Store',    sub: 'Indomaret, Alfamart',   bg: '#E5484D', initials: 'CS' },
  ]},
];

export default function PaymentMethodScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('bca');

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <ArrowRightIcon size={20} color={C.ink900} strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>Pilih Pembayaran</Text>
        </View>

        {/* Amount mini card */}
        <View style={styles.amountCard}>
          <View>
            <Text style={styles.amountLabel}>Total bayar</Text>
            <Text style={styles.amountValue}>Rp 198.000</Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: brand.surface }]}>
            <Text style={[styles.typeBadgeText, { color: brand.primary }]}>Biaya Registrasi</Text>
          </View>
        </View>

        {/* Method groups */}
        {METHODS.map((g) => (
          <View key={g.group} style={{ marginTop: 18 }}>
            <Text style={styles.groupLabel}>{g.group.toUpperCase()}</Text>
            <View style={styles.methodCard}>
              {g.items.map((m, i) => (
                <TouchableOpacity
                  key={m.id}
                  style={[
                    styles.methodRow,
                    i < g.items.length - 1 && styles.methodRowBorder,
                    selected === m.id && { backgroundColor: `${brand.primary}08` },
                  ]}
                  onPress={() => setSelected(m.id)}
                >
                  <View style={[styles.methodLogo, { backgroundColor: m.bg }]}>
                    <Text style={styles.methodInitials}>{m.initials}</Text>
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodLabel}>{m.label}</Text>
                    <Text style={styles.methodSub}>{m.sub}</Text>
                  </View>
                  <View style={[
                    styles.radio,
                    selected === m.id && { borderWidth: 7, borderColor: brand.primary },
                  ]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.ctaWrap, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('PaymentVA')}>
          <LinearGradient
            colors={[brand.primary, brand.deep]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.ctaBtn}
          >
            <Text style={styles.ctaBtnText}>Lanjut Bayar · Rp 198.000</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  title: { fontSize: 20, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  amountCard: { marginTop: 6, backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  amountLabel: { fontSize: 12, color: C.ink500 },
  amountValue: { fontSize: 22, fontWeight: '800', color: C.ink900, letterSpacing: -0.5 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  typeBadgeText: { fontSize: 11, fontWeight: '700' },
  groupLabel: { fontSize: 11, color: C.ink400, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4 },
  methodCard: { backgroundColor: '#fff', borderRadius: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 14 },
  methodRowBorder: { borderBottomWidth: 1, borderBottomColor: C.ink100 },
  methodLogo: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  methodInitials: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  methodInfo: { flex: 1 },
  methodLabel: { fontSize: 14, fontWeight: '700', color: C.ink900 },
  methodSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: C.ink300, backgroundColor: '#fff' },
  ctaWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', paddingHorizontal: 18, paddingTop: 14, shadowColor: '#005080', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 10 },
  ctaBtn: { height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  ctaBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
