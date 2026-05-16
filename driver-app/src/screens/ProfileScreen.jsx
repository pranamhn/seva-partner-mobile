import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import {
  UserIcon, CarIcon, BoltIcon, WalletIcon, CalendarIcon,
  ChatIcon, ShieldIcon, CloseIcon, ArrowRightIcon, StarIcon,
} from '../components/Icons';
import Avatar from '../components/Avatar';

const SECTIONS = [
  {
    title: 'Kendaraan',
    items: [
      { label: 'BYD M6 Standard · B 2845 EVS', sub: 'Sewa Harian aktif · 79 / 365 hari', Icon: CarIcon, nav: 'VehicleDetail' },
      { label: 'QR BBM / Charging',             Icon: BoltIcon,    nav: 'VehicleDetail' },
      { label: 'Jadwal Servis',                  sub: 'Berikutnya 12 Jun 2026', Icon: WalletIcon, nav: 'VehicleDetail' },
    ],
  },
  {
    title: 'Akun & Dokumen',
    items: [
      { label: 'Data Pribadi',       Icon: UserIcon },
      { label: 'SIM & STNK',        sub: 'Berlaku hingga 2028', Icon: CalendarIcon },
      { label: 'Rekening Pencairan', sub: 'BCA •••• 8821',     Icon: WalletIcon },
    ],
  },
  {
    title: 'Keamanan & Bantuan',
    items: [
      { label: 'Pusat Bantuan',  Icon: ChatIcon },
      { label: 'Tombol Darurat', Icon: ShieldIcon },
      { label: 'Keluar',         Icon: CloseIcon, danger: true },
    ],
  },
];

export default function ProfileScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8, paddingBottom: 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.ambient, { backgroundColor: brand.surface }]} />

      <Text style={styles.pageTitle}>Profil</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrap}>
          <Avatar name="Umaedi" size={60} bg={brand.primary} />
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.driverName}>Umaedi</Text>
          <Text style={styles.driverId}>ID Mitra · DRV-7812</Text>
          <View style={styles.ratingRow}>
            <StarIcon size={13} color={C.amber} />
            <Text style={styles.ratingValue}>4.92</Text>
            <Text style={styles.tripCount}>· 847 trip</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {[
          { label: 'Trip Total',   value: '847',  color: C.ink900 },
          { label: 'Acceptance',   value: '94%',  color: C.green },
          { label: 'Cancellation', value: '2%',   color: C.amber },
        ].map((s, i) => (
          <View key={s.label} style={[styles.statCell, i < 2 && styles.statCellBorder]}>
            <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {SECTIONS.map((sec) => (
        <View key={sec.title} style={{ marginTop: 14 }}>
          <Text style={styles.sectionTitle}>{sec.title.toUpperCase()}</Text>
          <View style={styles.sectionCard}>
            {sec.items.map((it, i) => (
              <TouchableOpacity
                key={it.label}
                style={[styles.sectionRow, i < sec.items.length - 1 && styles.sectionRowBorder]}
                onPress={() => it.nav && navigation.navigate(it.nav)}
                activeOpacity={it.nav || it.danger ? 0.7 : 1}
              >
                <View style={[styles.itemIcon, { backgroundColor: it.danger ? '#FEE2E2' : brand.surface }]}>
                  <it.Icon size={18} color={it.danger ? C.red : brand.primary} strokeWidth={2.2} />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemLabel, it.danger && { color: C.red }]}>{it.label}</Text>
                  {it.sub && <Text style={styles.itemSub}>{it.sub}</Text>}
                </View>
                {!it.danger && <ArrowRightIcon size={16} color={C.ink300} strokeWidth={2.5} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.version}>SEVA Partner v4.12.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 18 },
  ambient: { position: 'absolute', top: 0, left: 0, right: 0, height: 220, opacity: 0.5 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: C.ink900, letterSpacing: -0.5, marginBottom: 14 },
  profileCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  avatarWrap: { position: 'relative' },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 18, height: 18, borderRadius: 9, backgroundColor: C.green, borderWidth: 3, borderColor: '#fff' },
  profileInfo: { flex: 1 },
  driverName: { fontSize: 17, fontWeight: '800', color: C.ink900 },
  driverId: { fontSize: 12, color: C.ink500, marginTop: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingValue: { fontSize: 12, fontWeight: '700', color: C.ink900 },
  tripCount: { fontSize: 11, color: C.ink400 },
  statsGrid: { marginTop: 12, backgroundColor: '#fff', borderRadius: 18, padding: 4, flexDirection: 'row', shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  statCell: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  statCellBorder: { borderRightWidth: 1, borderRightColor: C.ink100 },
  statValue: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  statLabel: { fontSize: 10, color: C.ink400, fontWeight: '600', marginTop: 2 },
  sectionTitle: { fontSize: 11, color: C.ink400, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4 },
  sectionCard: { backgroundColor: '#fff', borderRadius: 16, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2, overflow: 'hidden' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, paddingHorizontal: 14 },
  sectionRowBorder: { borderBottomWidth: 1, borderBottomColor: C.ink100 },
  itemIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  itemInfo: { flex: 1 },
  itemLabel: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  itemSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  version: { marginTop: 18, textAlign: 'center', fontSize: 11, color: C.ink400, paddingBottom: 8 },
});
