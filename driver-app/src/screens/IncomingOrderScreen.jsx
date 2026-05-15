import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { T, Rp } from '../constants/copy';
import { C } from '../constants/colors';
import { CarIcon, BoltIcon, StarIcon, ArrowRightIcon, CloseIcon } from '../components/Icons';
import Avatar from '../components/Avatar';
import CityMap from '../components/CityMap';

const TOTAL_SECONDS = 12;
const CIRCUMFERENCE = 2 * Math.PI * 42;

export default function IncomingOrderScreen({ navigation }) {
  const { surge, brand, setStatus, lang } = useApp();
  const t = T(lang);
  const insets = useSafeAreaInsets();
  const fare = surge ? 87000 : 51000;

  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(progressAnim, {
      toValue: 1,
      duration: TOTAL_SECONDS * 1000,
      useNativeDriver: false,
    });
    anim.start();

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer);
          navigation.goBack();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => { clearInterval(timer); anim.stop(); };
  }, []);

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CIRCUMFERENCE],
  });

  const handleAccept = () => {
    setStatus('busy');
    navigation.replace('NavigatePickup');
  };

  const handleReject = () => navigation.goBack();

  return (
    <View style={styles.root}>
      {/* Map background */}
      <View style={StyleSheet.absoluteFill}>
        <CityMap width={400} height={460} color={brand.primary} deep={brand.deep}
          showHeat showDriver routeProgress={0.05} />
        <View style={styles.mapOverlay} />
      </View>

      {/* Top alert pill */}
      <View style={[styles.topAlert, { top: insets.top + 16 }]}>
        <View style={styles.alertDot} />
        <Text style={styles.alertText}>{t.incoming.toUpperCase()} · 1.2 km {t.away}</Text>
      </View>

      {/* Bottom sheet */}
      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.grip} />

        {/* Header: fare + countdown */}
        <View style={styles.sheetHeader}>
          <View style={styles.fareSection}>
            <LinearGradient
              colors={surge ? ['#FF4F8B', '#FF8A4F'] : [brand.surface, brand.surface]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.typeBadge}
            >
              {surge ? <BoltIcon size={11} color="#fff" /> : <CarIcon size={11} color={brand.deep} />}
              <Text style={[styles.typeBadgeText, { color: surge ? '#fff' : brand.deep }]}>
                {surge ? `1.7× ${t.surge_active.toUpperCase()}` : t.mode_ride.toUpperCase()}
              </Text>
            </LinearGradient>
            <Text style={styles.youEarnLabel}>{t.you_earn}</Text>
            <Text style={styles.fareValue}>{Rp(fare)}</Text>
          </View>

          {/* Countdown ring */}
          <View style={styles.countdownContainer}>
            <Svg width="88" height="88" viewBox="0 0 88 88">
              <Circle cx="44" cy="44" r="42" fill="none" stroke={C.ink200} strokeWidth="4" />
            </Svg>
            <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
              <Svg width="88" height="88" viewBox="0 0 88 88">
                <AnimatedCircle
                  cx="44" cy="44" r="42" fill="none"
                  stroke={brand.primary} strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${CIRCUMFERENCE}`}
                  strokeDashoffset={strokeDashoffset}
                />
              </Svg>
            </Animated.View>
            <View style={styles.countdownInner}>
              <Text style={[styles.countdownNum, { color: brand.primary }]}>{seconds}</Text>
              <Text style={styles.countdownLabel}>{t.seconds?.toUpperCase() || 'DETIK'}</Text>
            </View>
          </View>
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
              <Text style={styles.routeHint}>{t.pickup} · 1.2 km · 4 {t.minutes_short}</Text>
              <Text style={styles.routeMain}>Pacific Place, SCBD</Text>
              <Text style={styles.routeSub}>Jl. Jend. Sudirman Kav 52-53</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.routeHint}>{t.dropoff} · 8.4 km · 22 {t.minutes_short}</Text>
              <Text style={styles.routeMain}>Plaza Indonesia</Text>
              <Text style={styles.routeSub}>Jl. M.H. Thamrin Kav 28-30</Text>
            </View>
          </View>
        </View>

        {/* Passenger */}
        <View style={styles.passengerRow}>
          <Avatar name="Rina P" size={36} bg={brand.deep} />
          <View style={styles.passengerInfo}>
            <Text style={styles.passengerName}>Rina P.</Text>
            <View style={styles.passengerMeta}>
              <StarIcon size={11} color={C.amber} />
              <Text style={styles.passengerSub}> 4.92 · 84 trip</Text>
            </View>
          </View>
          <View style={styles.cashBadge}>
            <Text style={styles.cashText}>CASH</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.rejectBtn} onPress={handleReject}>
            <CloseIcon size={22} color={C.ink500} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptBtnWrap} onPress={handleAccept}>
            <LinearGradient colors={[brand.primary, brand.deep]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.acceptBtn}>
              <Text style={styles.acceptBtnText}>{t.accept}</Text>
              <ArrowRightIcon size={20} color="#fff" strokeWidth={3} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Animated circle for the countdown ring
const AnimatedCircle = Animated.createAnimatedComponent(require('react-native-svg').Circle);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(244,248,251,0)', top: '60%', bottom: 0 },
  topAlert: { position: 'absolute', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.ink900, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5C5C' },
  alertText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 14, shadowColor: '#005080', shadowOffset: { width: 0, height: -10 }, shadowOpacity: 0.18, shadowRadius: 30, elevation: 20 },
  grip: { width: 40, height: 4, backgroundColor: C.ink200, borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  fareSection: { flex: 1 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: 'flex-start' },
  typeBadgeText: { fontSize: 11, fontWeight: '800' },
  youEarnLabel: { fontSize: 13, color: C.ink500, marginTop: 8 },
  fareValue: { fontSize: 36, fontWeight: '800', color: C.ink900, letterSpacing: -1, marginTop: 2 },
  countdownContainer: { width: 88, height: 88, alignItems: 'center', justifyContent: 'center' },
  countdownInner: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  countdownNum: { fontSize: 28, fontWeight: '800', lineHeight: 30 },
  countdownLabel: { fontSize: 9, color: C.ink400, fontWeight: '700' },
  routeRow: { marginTop: 16, flexDirection: 'row', gap: 12 },
  routeDots: { alignItems: 'center', paddingTop: 4 },
  routeDotTop: { width: 12, height: 12, borderRadius: 6 },
  routeLine: { width: 2, flex: 1, backgroundColor: C.ink300, marginVertical: 4 },
  routeDotBottom: { width: 12, height: 12, borderRadius: 2, backgroundColor: C.ink900 },
  routeAddresses: { flex: 1, gap: 10 },
  routeHint: { fontSize: 11, color: C.ink400, fontWeight: '600' },
  routeMain: { fontSize: 14, fontWeight: '700', color: C.ink900, marginTop: 2 },
  routeSub: { fontSize: 11, color: C.ink500, marginTop: 1 },
  passengerRow: { marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.ink50, borderRadius: 14, padding: 12 },
  passengerInfo: { flex: 1 },
  passengerName: { fontSize: 13, fontWeight: '700', color: C.ink900 },
  passengerMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  passengerSub: { fontSize: 11, color: C.ink500 },
  cashBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: C.ink200 },
  cashText: { fontSize: 10, fontWeight: '700', color: C.ink500 },
  actions: { marginTop: 16, flexDirection: 'row', gap: 10 },
  rejectBtn: { width: 64, height: 56, borderRadius: 16, borderWidth: 1.5, borderColor: C.ink200, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  acceptBtnWrap: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  acceptBtn: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  acceptBtnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
