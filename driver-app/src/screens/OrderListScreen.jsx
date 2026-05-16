import React, { useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import {
  BoltIcon, CarIcon, PlaneIcon, StarIcon, ArrowRightIcon, CloseIcon,
} from '../components/Icons';
import Avatar from '../components/Avatar';
import CityMap from '../components/CityMap';

const ORDERS = [
  {
    id: '1',
    surge: true,
    surgeMultiplier: '1.7×',
    fare: 87000,
    pickup: { name: 'Pacific Place, SCBD', address: 'Jl. Jend. Sudirman Kav 52-53', dist: '1.2 km', eta: '4 mnt' },
    dropoff: { name: 'Plaza Indonesia', address: 'Jl. M.H. Thamrin Kav 28-30', dist: '8.4 km', eta: '22 mnt' },
    passenger: { name: 'Rina P.', rating: '4.92', trips: '84', initials: 'RP' },
    payment: 'CASH',
    type: 'ride',
  },
  {
    id: '2',
    surge: false,
    fare: 62000,
    pickup: { name: 'Kuningan City', address: 'Jl. Prof. DR Satrio', dist: '0.8 km', eta: '3 mnt' },
    dropoff: { name: 'Menteng Raya', address: 'Jl. Menteng Raya No.29', dist: '6.1 km', eta: '18 mnt' },
    passenger: { name: 'Bagas S.', rating: '4.85', trips: '231', initials: 'BS' },
    payment: 'GOPAY',
    type: 'ride',
  },
  {
    id: '3',
    surge: false,
    fare: 185000,
    pickup: { name: 'Senayan City', address: 'Jl. Asia Afrika Lot 19', dist: '2.1 km', eta: '7 mnt' },
    dropoff: { name: 'CGK Terminal 1', address: 'Jl. Raya Bandara Soekarno-Hatta', dist: '24 km', eta: '45 mnt' },
    passenger: { name: 'Hadi W.', rating: '4.97', trips: '56', initials: 'HW' },
    payment: 'CASH',
    type: 'airport',
  },
  {
    id: '4',
    surge: false,
    fare: 38000,
    pickup: { name: 'Blok M Plaza', address: 'Jl. Melawai Raya', dist: '1.5 km', eta: '5 mnt' },
    dropoff: { name: 'Tanah Abang', address: 'Jl. K.H. Wahid Hasyim', dist: '4.8 km', eta: '15 mnt' },
    passenger: { name: 'Siti R.', rating: '4.78', trips: '412', initials: 'SR' },
    payment: 'OVO',
    type: 'ride',
  },
  {
    id: '5',
    surge: true,
    surgeMultiplier: '1.5×',
    fare: 71000,
    pickup: { name: 'Grand Indonesia', address: 'Jl. M.H. Thamrin No.1', dist: '3.0 km', eta: '9 mnt' },
    dropoff: { name: 'Kemang Village', address: 'Jl. Kemang Raya No.1', dist: '9.2 km', eta: '25 mnt' },
    passenger: { name: 'Dewi A.', rating: '4.90', trips: '178', initials: 'DA' },
    payment: 'CASH',
    type: 'ride',
  },
];

export default function OrderListScreen({ navigation }) {
  const { brand, setStatus, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();

  const handleAccept = (order) => {
    setStatus('busy');
    navigation.replace('NavigatePickup');
  };

  const handleClose = () => navigation.goBack();

  return (
    <View style={styles.root}>
      {/* Map background */}
      <View style={StyleSheet.absoluteFill}>
        <CityMap
          width={400} height={460}
          color={brand.primary} deep={brand.deep}
          showHeat showDriver routeProgress={0.05}
        />
        <View style={styles.mapOverlay} />
      </View>

      {/* Top alert pill */}
      <View style={[styles.topAlert, { top: insets.top + 16 }]}>
        <View style={styles.alertDot} />
        <Text style={styles.alertText}>5 ORDER MASUK DI SEKITARMU</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
          <CloseIcon size={14} color="#fff" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 8 }]}>
        <View style={styles.grip} />
        <Text style={styles.sheetTitle}>Pilih Order</Text>
        <Text style={styles.sheetSub}>Ketuk order untuk menerima</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        >
          {ORDERS.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              brand={brand}
              onAccept={() => handleAccept(order)}
              isLast={index === ORDERS.length - 1}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function OrderCard({ order, brand, onAccept, isLast }) {
  const TypeIcon = order.type === 'airport' ? PlaneIcon : CarIcon;

  return (
    <View style={[styles.card, !isLast && styles.cardBorder]}>
      {/* Card header: badge + fare + accept button */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={styles.badgeRow}>
            {order.surge ? (
              <LinearGradient
                colors={['#FF4F8B', '#FF8A4F']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.badge}
              >
                <BoltIcon size={10} color="#fff" />
                <Text style={[styles.badgeText, { color: '#fff' }]}>
                  {order.surgeMultiplier} SURGE
                </Text>
              </LinearGradient>
            ) : (
              <View style={[styles.badge, { backgroundColor: brand.surface }]}>
                <TypeIcon size={10} color={brand.deep} />
                <Text style={[styles.badgeText, { color: brand.deep }]}>
                  {order.type === 'airport' ? 'AIRPORT' : 'RIDE'}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.fareValue}>{Rp(order.fare)}</Text>
        </View>

        <TouchableOpacity onPress={onAccept} style={styles.acceptBtnWrap}>
          <LinearGradient
            colors={[brand.primary, brand.deep]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.acceptBtn}
          >
            <Text style={styles.acceptBtnText}>Terima</Text>
            <ArrowRightIcon size={14} color="#fff" strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Route */}
      <View style={styles.routeRow}>
        <View style={styles.routeDots}>
          <View style={[styles.routeDotTop, { backgroundColor: brand.primary }]} />
          <View style={styles.routeLine} />
          <View style={styles.routeDotBottom} />
        </View>
        <View style={styles.routeAddresses}>
          <View>
            <Text style={styles.routeHint}>
              {order.pickup.dist} · {order.pickup.eta}
            </Text>
            <Text style={styles.routeMain}>{order.pickup.name}</Text>
          </View>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.routeHint}>
              {order.dropoff.dist} · {order.dropoff.eta}
            </Text>
            <Text style={styles.routeMain}>{order.dropoff.name}</Text>
          </View>
        </View>
      </View>

      {/* Passenger row */}
      <View style={styles.passengerRow}>
        <Avatar name={order.passenger.name} size={28} bg={brand.deep} />
        <Text style={styles.passengerName}>{order.passenger.name}</Text>
        <StarIcon size={10} color={C.amber} />
        <Text style={styles.passengerMeta}>{order.passenger.rating} · {order.passenger.trips} trip</Text>
        <View style={styles.spacer} />
        <View style={styles.paymentBadge}>
          <Text style={styles.paymentText}>{order.payment}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(244,248,251,0)', top: '55%', bottom: 0 },
  topAlert: {
    position: 'absolute', alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.ink900, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999,
  },
  alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5C5C' },
  alertText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  closeBtn: { marginLeft: 2, padding: 2 },
  sheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: 18, paddingTop: 14,
    maxHeight: '72%',
    shadowColor: '#005080', shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.18, shadowRadius: 30, elevation: 20,
  },
  grip: { width: 40, height: 4, backgroundColor: C.ink200, borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  sheetTitle: { fontSize: 16, fontWeight: '800', color: C.ink900 },
  sheetSub: { fontSize: 12, color: C.ink400, marginTop: 2, marginBottom: 10 },
  list: { flex: 1 },
  listContent: { paddingBottom: 8 },

  card: { paddingVertical: 14 },
  cardBorder: { borderBottomWidth: 1, borderBottomColor: C.ink100 },

  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardHeaderLeft: { flex: 1 },
  badgeRow: { flexDirection: 'row', marginBottom: 4 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 10, fontWeight: '800' },
  fareValue: { fontSize: 22, fontWeight: '800', color: C.ink900, letterSpacing: -0.5, marginTop: 2 },

  acceptBtnWrap: { borderRadius: 12, overflow: 'hidden', alignSelf: 'flex-start', marginLeft: 12 },
  acceptBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  acceptBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },

  routeRow: { marginTop: 10, flexDirection: 'row', gap: 10 },
  routeDots: { alignItems: 'center', paddingTop: 3 },
  routeDotTop: { width: 10, height: 10, borderRadius: 5 },
  routeLine: { width: 2, flex: 1, backgroundColor: C.ink300, marginVertical: 3 },
  routeDotBottom: { width: 10, height: 10, borderRadius: 2, backgroundColor: C.ink900 },
  routeAddresses: { flex: 1 },
  routeHint: { fontSize: 10, color: C.ink400, fontWeight: '600' },
  routeMain: { fontSize: 13, fontWeight: '700', color: C.ink900, marginTop: 1 },

  passengerRow: {
    marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: C.ink50, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7,
  },
  passengerName: { fontSize: 12, fontWeight: '700', color: C.ink900 },
  passengerMeta: { fontSize: 11, color: C.ink500 },
  spacer: { flex: 1 },
  paymentBadge: {
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6,
    backgroundColor: '#fff', borderWidth: 1, borderColor: C.ink200,
  },
  paymentText: { fontSize: 10, fontWeight: '700', color: C.ink500 },
});
