import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

const d = { s: 22, c: 'currentColor', w: 2 };

export const BellIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <Path d="M10.3 21a2 2 0 0 0 3.4 0"/>
  </Svg>
);

export const HomeIcon = ({ size = d.s, color = d.c, strokeWidth = d.w, filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/>
  </Svg>
);

export const WalletIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M3 7a2 2 0 0 1 2-2h13l3 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <Path d="M16 13h3" strokeLinecap="round"/>
  </Svg>
);

export const ClockIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Circle cx="12" cy="12" r="9"/>
    <Path d="M12 7v5l3 2" strokeLinecap="round"/>
  </Svg>
);

export const UserIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Circle cx="12" cy="8" r="4"/>
    <Path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>
  </Svg>
);

export const CarIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M3 14l2-6a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 6"/>
    <Rect x="2" y="14" width="20" height="5" rx="2"/>
    <Circle cx="7" cy="19" r="1.5" fill={color}/>
    <Circle cx="17" cy="19" r="1.5" fill={color}/>
  </Svg>
);

export const CalendarIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Rect x="3" y="5" width="18" height="16" rx="2"/>
    <Path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round"/>
  </Svg>
);

export const PlaneIcon = ({ size = d.s, color = d.c }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M21 11l-7-1-3-7-2 0 1 7-5 1-2-2-1.5 0L3 12l1.5 2H6l2-2 5 1-1 7 2 0 3-7 7-1z"/>
  </Svg>
);

export const BoltIcon = ({ size = d.s, color = d.c }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M13 2L4 14h7l-1 8 9-12h-7z"/>
  </Svg>
);

export const StarIcon = ({ size = d.s, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
  </Svg>
);

export const TrendIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 17l6-6 4 4 8-8"/>
    <Path d="M14 7h7v7"/>
  </Svg>
);

export const PinIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/>
    <Circle cx="12" cy="9" r="2.5"/>
  </Svg>
);

export const PhoneIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>
  </Svg>
);

export const ChatIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z"/>
  </Svg>
);

export const CheckIcon = ({ size = d.s, color = d.c, strokeWidth = 3 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 13l4 4L19 7"/>
  </Svg>
);

export const ShieldIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/>
    <Path d="M9 12l2 2 4-4" strokeLinecap="round"/>
  </Svg>
);

export const FlagIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round">
    <Path d="M5 3v18M5 4h12l-3 4 3 4H5"/>
  </Svg>
);

export const FilterIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
    <Path d="M3 6h18M6 12h12M10 18h4"/>
  </Svg>
);

export const ArrowRightIcon = ({ size = d.s, color = d.c, strokeWidth = 2.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 12h14M13 6l6 6-6 6"/>
  </Svg>
);

export const CloseIcon = ({ size = d.s, color = d.c, strokeWidth = 2.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
    <Path d="M6 6l12 12M18 6L6 18"/>
  </Svg>
);

export const SwapIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 7h13l-3-3M20 17H7l3 3"/>
  </Svg>
);

export const QRIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Rect x="3" y="3" width="7" height="7" rx="1"/>
    <Rect x="14" y="3" width="7" height="7" rx="1"/>
    <Rect x="3" y="14" width="7" height="7" rx="1"/>
    <Path d="M14 14h3v3h-3zM20 14v7M14 20h3M17 17v4" strokeLinecap="round"/>
  </Svg>
);

export const GearIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Path d="M4 9h4l2-3h4l2 3h4v6h-4l-2 3h-4l-2-3H4z" strokeLinejoin="round"/>
    <Circle cx="12" cy="12" r="2.5"/>
  </Svg>
);

export const FuelIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"/>
    <Path d="M3 21h13M15 9l3 3v6a2 2 0 0 0 2 2"/>
  </Svg>
);

export const ChevronRightIcon = ({ size = d.s, color = d.c, strokeWidth = 2.5 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M9 6l6 6-6 6"/>
  </Svg>
);

export const CreditCardIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Rect x="2" y="5" width="20" height="14" rx="3"/>
    <Path d="M2 10h20M6 15h4" strokeLinecap="round"/>
  </Svg>
);

export const SearchIcon = ({ size = d.s, color = d.c, strokeWidth = d.w }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="11" cy="11" r="7"/>
    <Path d="M21 21l-4.35-4.35"/>
  </Svg>
);
