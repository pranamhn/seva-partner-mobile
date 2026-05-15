// shared.jsx — SEVA Driver shared building blocks (icons, map, dictionary, helpers)

// ─────────────────────────────────────────────
// Dictionary — bilingual copy for tweaks (id/en)
// ─────────────────────────────────────────────
const DICT = {
  id: {
    greeting_morning: 'Selamat pagi',
    greeting_afternoon: 'Selamat siang',
    greeting_evening: 'Selamat sore',
    online: 'Online',
    offline: 'Offline',
    busy: 'Sedang trip',
    earnings_today: 'Pendapatan hari ini',
    trips_today: 'Trip',
    online_hours: 'Jam online',
    acceptance: 'Penerimaan',
    rating: 'Rating',
    mode_ride: 'Ride',
    mode_rental: 'Sewa Harian',
    mode_airport: 'Antar Jemput',
    go_online: 'Mulai cari order',
    go_offline: 'Berhenti',
    incoming: 'Order masuk',
    accept: 'Terima',
    reject: 'Lewati',
    pickup: 'Jemput di',
    dropoff: 'Antar ke',
    distance: 'Jarak',
    duration: 'Estimasi',
    fare: 'Estimasi tarif',
    surge_active: 'Tarif Surge aktif',
    navigate: 'Navigasi',
    call: 'Telepon',
    message: 'Pesan',
    arrived: 'Sudah sampai',
    start_trip: 'Mulai Trip',
    end_trip: 'Selesaikan Trip',
    trip_complete: 'Trip selesai',
    total: 'Total',
    base_fare: 'Tarif dasar',
    surge: 'Bonus surge',
    tips: 'Tip',
    rate_rider: 'Rating penumpang',
    riwayat: 'Riwayat',
    earnings: 'Pendapatan',
    profile: 'Profil',
    home: 'Beranda',
    today: 'Hari ini',
    week: 'Minggu ini',
    month: 'Bulan ini',
    target: 'Target',
    achieved: 'Tercapai',
    looking_for_orders: 'Mencari order…',
    upcoming: 'Order terjadwal',
    nearby_demand: 'Permintaan sekitar',
    high: 'Tinggi',
    medium: 'Sedang',
    low: 'Rendah',
    minutes_short: 'mnt',
    km_short: 'km',
    away: 'jauh',
    passenger: 'Penumpang',
    car: 'BYD M6 Standard',
    plate: 'B 2845 EVS',
    new_order: 'Order Baru',
    you_earn: 'Kamu dapat',
    detail: 'Detail',
    seva_partner: 'SEVA Partner',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
    see_all: 'Lihat semua',
    weekly_target: 'Target mingguan',
  },
  en: {
    greeting_morning: 'Good morning',
    greeting_afternoon: 'Good afternoon',
    greeting_evening: 'Good evening',
    online: 'Online',
    offline: 'Offline',
    busy: 'On trip',
    earnings_today: "Today's earnings",
    trips_today: 'Trips',
    online_hours: 'Online hrs',
    acceptance: 'Acceptance',
    rating: 'Rating',
    mode_ride: 'Ride',
    mode_rental: 'Daily Rental',
    mode_airport: 'Airport',
    go_online: 'Go online',
    go_offline: 'Go offline',
    incoming: 'Incoming order',
    accept: 'Accept',
    reject: 'Skip',
    pickup: 'Pick up at',
    dropoff: 'Drop off at',
    distance: 'Distance',
    duration: 'ETA',
    fare: 'Est. fare',
    surge_active: 'Surge fare active',
    navigate: 'Navigate',
    call: 'Call',
    message: 'Chat',
    arrived: 'Arrived',
    start_trip: 'Start trip',
    end_trip: 'End trip',
    trip_complete: 'Trip complete',
    total: 'Total',
    base_fare: 'Base fare',
    surge: 'Surge bonus',
    tips: 'Tip',
    rate_rider: 'Rate rider',
    riwayat: 'History',
    earnings: 'Earnings',
    profile: 'Profile',
    home: 'Home',
    today: 'Today',
    week: 'This week',
    month: 'This month',
    target: 'Target',
    achieved: 'Achieved',
    looking_for_orders: 'Looking for orders…',
    upcoming: 'Scheduled',
    nearby_demand: 'Demand nearby',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    minutes_short: 'min',
    km_short: 'km',
    away: 'away',
    passenger: 'Rider',
    car: 'BYD M6 Standard',
    plate: 'B 2845 EVS',
    new_order: 'New order',
    you_earn: "You'll earn",
    detail: 'Detail',
    seva_partner: 'SEVA Partner',
    completed: 'Completed',
    cancelled: 'Cancelled',
    see_all: 'See all',
    weekly_target: 'Weekly target',
  },
};
const T = (lang) => DICT[lang] || DICT.id;

// ─────────────────────────────────────────────
// Currency / numbers
// ─────────────────────────────────────────────
const Rp = (n, lang = 'id') => {
  if (lang === 'en') return 'Rp' + n.toLocaleString('en-US');
  return 'Rp ' + n.toLocaleString('id-ID');
};

// Resolve brand color triple from key
const BRAND = {
  cyan: { primary: '#00A0CC', deep: '#008CB8', light: '#7FD3EF', surface: '#E6F7FD', name: 'Cyan' },
  ocean: { primary: '#0E76B8', deep: '#085A91', light: '#74B6E0', surface: '#E3F0FA', name: 'Ocean' },
  teal: { primary: '#00A89B', deep: '#008275', light: '#6FD3C7', surface: '#E0F5F2', name: 'Teal' },
};

// ─────────────────────────────────────────────
// Icons — outline / solid set
// ─────────────────────────────────────────────
const Icon = {
  bell: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/></svg>),
  qr: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v7M14 20h3M17 17v4" strokeLinecap="round"/></svg>),
  home: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill={p.fill||'none'} stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>),
  card: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4" strokeLinecap="round"/></svg>),
  calendar: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round"/></svg>),
  user: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>),
  car: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M3 14l2-6a3 3 0 0 1 3-2h8a3 3 0 0 1 3 2l2 6"/><rect x="2" y="14" width="20" height="5" rx="2"/><circle cx="7" cy="19" r="1.5" fill={p.c||'currentColor'}/><circle cx="17" cy="19" r="1.5" fill={p.c||'currentColor'}/></svg>),
  fuel: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16"/><path d="M3 21h13"/><path d="M15 9l3 3v6a2 2 0 0 0 2 2"/><path d="M18 5l-2-2"/></svg>),
  bolt: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill={p.fill||'currentColor'} stroke="none"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>),
  gear: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><path d="M4 9h4l2-3h4l2 3h4v6h-4l-2 3h-4l-2-3H4z" strokeLinejoin="round"/><circle cx="12" cy="12" r="2.5"/></svg>),
  pin: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>),
  pinFilled: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill={p.fill||'currentColor'}><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5" fill="#fff"/></svg>),
  phone: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>),
  chat: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z"/></svg>),
  star: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill={p.fill||'currentColor'} stroke={p.c||'none'} strokeWidth={p.w||0} strokeLinejoin="round"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>),
  clock: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" strokeLinecap="round"/></svg>),
  arrowRight: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  chevR: (p) => (<svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>),
  chevD: (p) => (<svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>),
  trend: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>),
  wallet: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h13l3 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M16 13h3" strokeLinecap="round"/></svg>),
  filter: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinecap="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg>),
  check: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>),
  shield: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4" strokeLinecap="round"/></svg>),
  flag: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill={p.fill||'none'} stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinejoin="round"><path d="M5 3v18M5 4h12l-3 4 3 4H5"/></svg>),
  plane: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill={p.fill||'currentColor'}><path d="M21 11l-7-1 -3-7-2 0 1 7-5 1-2-2-1.5 0L3 12l1.5 2H6l2-2 5 1-1 7 2 0 3-7 7-1z"/></svg>),
  swap: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h13l-3-3M20 17H7l3 3"/></svg>),
  close: (p) => (<svg width={p.s||22} height={p.s||22} viewBox="0 0 24 24" fill="none" stroke={p.c||'currentColor'} strokeWidth={p.w||2.5} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>),
};

// ─────────────────────────────────────────────
// Mock map — abstract SVG city grid + route
// ─────────────────────────────────────────────
function CityMap({
  width = 380, height = 240, dark = false,
  showRoute = true, showDriver = true, showPickup = true, showDropoff = true,
  showHeat = false, color = '#00A0CC', deep = '#008CB8',
  routeProgress = 0.45,  // 0..1 — how far along the route the driver is
  variant = 'a',
}) {
  const land = dark ? '#0B1620' : '#E8EEF3';
  const street = dark ? '#1A2733' : '#FFFFFF';
  const streetMinor = dark ? '#142028' : '#F4F7FA';
  const block = dark ? '#11202A' : '#DFE6EC';
  const water = dark ? '#0A2230' : '#CFE4F0';
  const label = dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,40,60,0.35)';

  // route path
  const routePath = 'M 40 200 Q 80 180 110 160 T 180 130 Q 220 110 260 100 T 340 70';

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <pattern id={`grid-${variant}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill={block} />
          <rect x="0" y="0" width="40" height="2" fill={street} />
          <rect x="0" y="0" width="2" height="40" fill={street} />
        </pattern>
        <pattern id={`fine-${variant}`} width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="transparent" />
          <rect x="0" y="20" width="80" height="1" fill={streetMinor} />
          <rect x="0" y="60" width="80" height="1" fill={streetMinor} />
          <rect x="20" y="0" width="1" height="80" fill={streetMinor} />
          <rect x="60" y="0" width="1" height="80" fill={streetMinor} />
        </pattern>
        <linearGradient id={`heat-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.0" />
          <stop offset="100%" stopColor={color} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill={land} />
      <rect width={width} height={height} fill={`url(#grid-${variant})`} />
      <rect width={width} height={height} fill={`url(#fine-${variant})`} />

      {/* river / diagonal feature */}
      <path d={`M -10 ${height*0.75} Q ${width*0.3} ${height*0.55} ${width*0.6} ${height*0.65} T ${width+10} ${height*0.5}`}
        stroke={water} strokeWidth="22" fill="none" strokeLinecap="round" />

      {/* main avenue */}
      <path d="M 0 130 L 400 80" stroke={street} strokeWidth="6" />
      <path d="M 0 130 L 400 80" stroke={dark ? '#0B1620' : '#fff'} strokeWidth="1" strokeDasharray="6 6" opacity="0.4" />

      {/* labels */}
      <text x="60" y="50" fill={label} fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">Jl. Sudirman</text>
      <text x="200" y="220" fill={label} fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">Senayan</text>

      {/* surge heatmap */}
      {showHeat && (
        <>
          <circle cx={width*0.7} cy={height*0.35} r="60" fill={color} opacity="0.18" />
          <circle cx={width*0.7} cy={height*0.35} r="36" fill={color} opacity="0.28" />
          <circle cx={width*0.25} cy={height*0.7} r="48" fill={color} opacity="0.15" />
        </>
      )}

      {/* route */}
      {showRoute && (
        <>
          <path d={routePath} stroke={deep} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.18" />
          <path d={routePath} stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeDasharray="14 6" style={{ animation: 'seva-route-dash 1.4s linear infinite' }} />
        </>
      )}

      {/* pickup pin */}
      {showPickup && (
        <g transform="translate(40, 200)">
          <circle r="9" fill={color} opacity="0.25" />
          <circle r="5" fill={color} />
          <circle r="2" fill="#fff" />
        </g>
      )}

      {/* dropoff flag */}
      {showDropoff && (
        <g transform="translate(340, 70)">
          <circle r="10" fill="#fff" stroke={deep} strokeWidth="2" />
          <rect x="-1.5" y="-7" width="1.5" height="14" fill={deep} />
          <path d="M 0 -7 L 7 -4 L 0 -1 Z" fill={deep} />
        </g>
      )}

      {/* driver car position along route */}
      {showDriver && (
        <g transform={`translate(${40 + (340-40)*routeProgress}, ${200 + (70-200)*routeProgress})`}>
          <circle r="14" fill="#fff" opacity="0.8" />
          <circle r="10" fill={deep} />
          <path d="M -5 -2 L 0 -6 L 5 -2 L 5 4 L -5 4 Z" fill="#fff" />
        </g>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────
// Status dot with pulse
// ─────────────────────────────────────────────
function StatusDot({ status = 'online', size = 8 }) {
  const c = status === 'online' ? 'var(--status-online)' : status === 'busy' ? 'var(--status-busy)' : 'var(--status-offline)';
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c, animation: status === 'offline' ? 'none' : 'seva-ping 1.8s ease-out infinite', opacity: 0.6 }} />
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: c, boxShadow: status === 'offline' ? 'none' : `0 0 0 2px ${c}33` }} />
    </span>
  );
}

// Avatar with initial
function Avatar({ name = 'A', size = 40, bg = '#00A0CC', textColor = '#fff' }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, color: textColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.42, flexShrink: 0 }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// SEVA logo wordmark
function SevaLogo({ color = '#00A0CC', size = 18 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 800, fontSize: size, letterSpacing: '-0.02em', color }}>
      <span style={{ width: size, height: size, borderRadius: 6, background: color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size*0.65, fontWeight: 900 }}>S</span>
      SEVA
    </span>
  );
}

Object.assign(window, { DICT, T, Rp, BRAND, Icon, CityMap, StatusDot, Avatar, SevaLogo });
