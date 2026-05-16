import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { C } from '../constants/colors';
import {
  CarIcon, BoltIcon, TrendIcon, ShieldIcon, BellIcon, CheckIcon, ChevronRightIcon,
} from '../components/Icons';

const NOTIFS = [
  {
    id: '1', read: false, category: 'earnings', time: '5 mnt lalu',
    group: 'Hari ini',
    title: 'Pembayaran diterima',
    body: 'Rp 87.000 dari trip bersama Rina P. sudah masuk ke saldo.',
    action: 'Lihat Saldo',
  },
  {
    id: '2', read: false, category: 'promo', time: '12 mnt lalu',
    group: 'Hari ini',
    title: 'Surge 1.7× aktif di SCBD',
    body: 'Area SCBD & Sudirman sedang ramai. Yuk bergerak ke sana!',
    action: null,
  },
  {
    id: '3', read: false, category: 'earnings', time: '1 jam lalu',
    group: 'Hari ini',
    title: 'Bonus tercapai! 🎉',
    body: 'Selamat! Kamu berhasil menyelesaikan 10 trip hari ini. Bonus Rp 50.000 ditambahkan.',
    action: 'Lihat Rincian',
  },
  {
    id: '4', read: true, category: 'trip', time: '2 jam lalu',
    group: 'Hari ini',
    title: 'Trip selesai',
    body: 'Trip bersama Budi S. dari Blok M → Kemang telah selesai. Rating: ⭐ 5.0',
    action: null,
  },
  {
    id: '5', read: true, category: 'system', time: '3 jam lalu',
    group: 'Hari ini',
    title: 'Dokumen berhasil diverifikasi',
    body: 'SIM dan KTP kamu sudah diverifikasi. Akunmu kini aktif penuh.',
    action: null,
  },
  {
    id: '6', read: true, category: 'earnings', time: '5 jam lalu',
    group: 'Hari ini',
    title: 'Target mingguan 80%',
    body: 'Kamu sudah mencapai 80% dari target Rp 2.000.000 minggu ini. Tetap semangat!',
    action: 'Lihat Target',
  },
  {
    id: '7', read: true, category: 'system', time: 'Kemarin 18.30',
    group: 'Kemarin',
    title: 'Pembaruan aplikasi tersedia',
    body: 'Versi 2.4.1 tersedia. Perbaikan bug dan peningkatan performa.',
    action: 'Perbarui',
  },
  {
    id: '8', read: true, category: 'trip', time: 'Kemarin 14.15',
    group: 'Kemarin',
    title: 'Order baru tersedia',
    body: '3 order baru muncul di area Menteng. Buka aplikasi untuk melihat.',
    action: null,
  },
  {
    id: '9', read: true, category: 'earnings', time: 'Kemarin 11.02',
    group: 'Kemarin',
    title: 'Pembayaran OVO dikonfirmasi',
    body: 'Rp 62.000 dari trip bersama Bagas S. telah dikonfirmasi via OVO.',
    action: null,
  },
  {
    id: '10', read: true, category: 'promo', time: '3 hari lalu',
    group: 'Minggu lalu',
    title: 'Insentif Akhir Pekan',
    body: 'Selesaikan 15 trip Sabtu-Minggu, dapatkan bonus Rp 150.000. Berlaku s.d. Minggu ini.',
    action: 'Lihat Syarat',
  },
];

const FILTERS = [
  { key: 'all',      label: 'Semua' },
  { key: 'trip',     label: 'Trip' },
  { key: 'earnings', label: 'Keuangan' },
  { key: 'promo',    label: 'Promo' },
  { key: 'system',   label: 'Sistem' },
];

function notifIcon(category, color, deep) {
  const size = 20;
  switch (category) {
    case 'trip':     return <CarIcon    size={size} color={color}   strokeWidth={2} />;
    case 'earnings': return <TrendIcon  size={size} color={C.green} strokeWidth={2.2} />;
    case 'promo':    return <BoltIcon   size={size} color="#FF4F8B" />;
    case 'system':   return <ShieldIcon size={size} color={C.ink500} strokeWidth={2} />;
    default:         return <BellIcon   size={size} color={color} />;
  }
}

function notifIconBg(category, brand) {
  switch (category) {
    case 'trip':     return brand.surface;
    case 'earnings': return '#E6F7EE';
    case 'promo':    return '#FFE6F0';
    case 'system':   return C.ink100;
    default:         return brand.surface;
  }
}

export default function NotificationScreen({ navigation }) {
  const { brand } = useApp();
  const insets = useSafeAreaInsets();

  const [filter, setFilter]     = useState('all');
  const [notifs, setNotifs]     = useState(NOTIFS);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const visible = filter === 'all'
    ? notifs
    : notifs.filter((n) => n.category === filter);

  // Group by the group label while preserving order
  const grouped = visible.reduce((acc, n) => {
    if (!acc[n.group]) acc[n.group] = [];
    acc[n.group].push(n);
    return acc;
  }, {});

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead    = (id) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronRightIcon size={20} color={C.ink900} strokeWidth={2.5}
              style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Notifikasi</Text>
            {unreadCount > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: brand.primary }]}>
                <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          {unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
              <CheckIcon size={14} color={brand.primary} strokeWidth={2.5} />
              <Text style={[styles.markAllText, { color: brand.primary }]}>Baca semua</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 90 }} />
          )}
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = f.key === 'all'
              ? notifs.filter((n) => !n.read).length
              : notifs.filter((n) => n.category === f.key && !n.read).length;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.filterBtn, active && { backgroundColor: brand.primary }]}
                onPress={() => setFilter(f.key)}
              >
                <Text style={[styles.filterBtnText, active && { color: '#fff' }]}>
                  {f.label}
                </Text>
                {count > 0 && (
                  <View style={[styles.filterDot, { backgroundColor: active ? 'rgba(255,255,255,0.6)' : brand.primary }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(grouped).length === 0 ? (
          <View style={styles.emptyState}>
            <BellIcon size={40} color={C.ink300} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>Tidak ada notifikasi</Text>
            <Text style={styles.emptySub}>Notifikasi akan muncul di sini</Text>
          </View>
        ) : (
          Object.entries(grouped).map(([group, items]) => (
            <View key={group}>
              <Text style={styles.groupLabel}>{group}</Text>
              <View style={styles.groupCard}>
                {items.map((notif, idx) => (
                  <TouchableOpacity
                    key={notif.id}
                    style={[
                      styles.notifRow,
                      !notif.read && styles.notifRowUnread,
                      idx < items.length - 1 && styles.notifRowBorder,
                    ]}
                    onPress={() => markRead(notif.id)}
                    activeOpacity={0.7}
                  >
                    {/* Unread dot */}
                    <View style={styles.unreadDotCol}>
                      {!notif.read && (
                        <View style={[styles.unreadDot, { backgroundColor: brand.primary }]} />
                      )}
                    </View>

                    {/* Icon */}
                    <View style={[styles.iconBox, { backgroundColor: notifIconBg(notif.category, brand) }]}>
                      {notifIcon(notif.category, brand.primary, brand.deep)}
                    </View>

                    {/* Content */}
                    <View style={styles.notifContent}>
                      <View style={styles.notifTitleRow}>
                        <Text style={[styles.notifTitle, !notif.read && styles.notifTitleUnread]}>
                          {notif.title}
                        </Text>
                        <Text style={styles.notifTime}>{notif.time}</Text>
                      </View>
                      <Text style={styles.notifBody} numberOfLines={2}>
                        {notif.body}
                      </Text>
                      {notif.action && (
                        <Text style={[styles.notifAction, { color: brand.primary }]}>
                          {notif.action} →
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },

  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingBottom: 0,
    shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 3,
  },
  headerTop: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.ink50, alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.ink900 },
  unreadBadge: {
    minWidth: 20, height: 20, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5,
  },
  unreadBadgeText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  markAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  markAllText: { fontSize: 12, fontWeight: '700' },

  filterScroll: { marginHorizontal: -18 },
  filterContent: { paddingHorizontal: 18, paddingBottom: 12, gap: 8, flexDirection: 'row' },
  filterBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 999, backgroundColor: C.ink100,
  },
  filterBtnText: { fontSize: 13, fontWeight: '700', color: C.ink500 },
  filterDot: { width: 6, height: 6, borderRadius: 3 },

  scroll: { flex: 1 },
  listContent: { paddingTop: 16, paddingHorizontal: 16 },

  groupLabel: {
    fontSize: 12, fontWeight: '700', color: C.ink400,
    textTransform: 'uppercase', letterSpacing: 0.5,
    marginBottom: 8, marginTop: 4,
  },
  groupCard: {
    backgroundColor: '#fff', borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#0f172a', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
    overflow: 'hidden',
  },

  notifRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingVertical: 14, paddingRight: 14,
  },
  notifRowUnread: { backgroundColor: '#F7FCFD' },
  notifRowBorder: { borderBottomWidth: 1, borderBottomColor: C.ink100 },

  unreadDotCol: { width: 20, alignItems: 'center', paddingTop: 7 },
  unreadDot: { width: 7, height: 7, borderRadius: 4 },

  iconBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12, flexShrink: 0,
  },

  notifContent: { flex: 1 },
  notifTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 },
  notifTitle: { fontSize: 13, fontWeight: '600', color: C.ink700, flex: 1 },
  notifTitleUnread: { fontWeight: '800', color: C.ink900 },
  notifTime: { fontSize: 11, color: C.ink400, flexShrink: 0, marginTop: 1 },
  notifBody: { fontSize: 12, color: C.ink500, marginTop: 3, lineHeight: 17 },
  notifAction: { fontSize: 12, fontWeight: '700', marginTop: 6 },

  emptyState: { alignItems: 'center', paddingTop: 80, gap: 10 },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: C.ink500 },
  emptySub: { fontSize: 13, color: C.ink400 },
});
