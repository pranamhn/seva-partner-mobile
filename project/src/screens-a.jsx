// screens-a.jsx — Variation A: SEVA Style (matching reference — soft, friendly cyan)
// 7 driver screens. All consume window.{Icon, CityMap, Rp, T, BRAND, StatusDot, Avatar}.

const FRAME_W = 402;
const FRAME_H = 874;

// ─────────────────────────────────────────────
// Shared shell — sticky header bg, scroll area, bottom nav
// ─────────────────────────────────────────────
function ABottomNav({ active = 'home', primary, lang = 'id' }) {
  const t = T(lang);
  const items = [
    { id: 'home', label: t.home, icon: Icon.home },
    { id: 'earnings', label: t.earnings, icon: Icon.wallet },
    { id: 'qr', icon: Icon.swap, center: true },
    { id: 'riwayat', label: t.riwayat, icon: Icon.clock },
    { id: 'profile', label: t.profile, icon: Icon.user },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30, padding: '12px 14px 22px', background: 'linear-gradient(to top, #fff 60%, rgba(255,255,255,0.0))' }}>
      <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 -2px 16px rgba(0,80,120,0.08), 0 4px 16px rgba(0,80,120,0.06)', padding: '8px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
        {items.map((it) => {
          if (it.center) {
            return (
              <div key={it.id} style={{ position: 'relative', width: 60 }}>
                <div style={{ position: 'absolute', left: '50%', top: -28, transform: 'translateX(-50%)', width: 60, height: 60, borderRadius: '50%', background: primary, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${primary}66, 0 0 0 6px #fff` }}>
                  <it.icon s={26} c="#fff" w={2.4} />
                </div>
                <div style={{ height: 38 }} />
              </div>
            );
          }
          const isActive = it.id === active;
          return (
            <div key={it.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', minWidth: 56 }}>
              <it.icon s={22} c={isActive ? primary : '#8A95A3'} w={isActive ? 2.2 : 1.8} />
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? primary : '#8A95A3' }}>{it.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// A1 — HOME
// ─────────────────────────────────────────────
function A1Home({ tweaks }) {
  const { brandKey, status, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const greeting = (h => h < 11 ? t.greeting_morning : h < 15 ? t.greeting_afternoon : t.greeting_evening)(13);
  const isOnline = status !== 'offline';
  const statusLabel = status === 'online' ? t.online : status === 'busy' ? t.busy : t.offline;
  const statusColor = status === 'online' ? '#1FB371' : status === 'busy' ? '#F59E0B' : '#8A95A3';

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F8FB', position: 'relative' }}>
      {/* light blue ambient gradient */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 240, background: `linear-gradient(180deg, ${b.surface} 0%, #F4F8FB 100%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        {/* Greeting row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 6 }}>
          <div>
            <div style={{ color: b.primary, fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>{greeting},</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.02em', lineHeight: 1.2, marginTop: 2 }}>Umaedi</div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: '50%', background: b.primary, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px ${b.primary}40` }}>
            <Icon.bell s={20} c="#fff" w={2.2} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', border: '2px solid #fff' }} />
          </button>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: 8, marginTop: 18, background: '#fff', padding: 4, borderRadius: 14, boxShadow: 'var(--shadow-card)' }}>
          {[
            { id: 'ride', label: t.mode_ride, icon: Icon.car },
            { id: 'rental', label: t.mode_rental, icon: Icon.calendar },
            { id: 'airport', label: t.mode_airport, icon: Icon.plane },
          ].map((m, i) => {
            const active = i === 0;
            return (
              <div key={m.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 4px', borderRadius: 10, background: active ? b.primary : 'transparent', color: active ? '#fff' : '#5A6878', fontSize: 11, fontWeight: 700 }}>
                <m.icon s={18} c={active ? '#fff' : '#5A6878'} w={2} />
                <span>{m.label}</span>
              </div>
            );
          })}
        </div>

        {/* Big status card — replaces BYD car card */}
        <div style={{ marginTop: 14, borderRadius: 22, background: `linear-gradient(135deg, ${b.primary} 0%, ${b.deep} 100%)`, padding: '18px 18px 16px', position: 'relative', overflow: 'hidden', boxShadow: `0 12px 28px ${b.primary}30` }}>
          {/* decorative arcs (mimic reference) */}
          <svg style={{ position: 'absolute', right: -40, top: -40, opacity: 0.18 }} width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="78" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="80" cy="80" r="56" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="80" cy="80" r="34" fill="none" stroke="#fff" strokeWidth="1.5" /></svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: '#fff' }}>
                <StatusDot status={status} size={6} />
                {statusLabel.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 12 }}>{t.earnings_today}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 2 }} className="seva-num">{Rp(surge ? 412000 : 287500, lang)}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ fontWeight: 700 }}>+ Rp 78.500</span> dari 4 trip terakhir
              </div>
            </div>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, border: '1px solid rgba(255,255,255,0.25)' }}>
              <Icon.bolt s={22} c="#fff" />
              <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>QR BBM</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.18)', margin: '14px 0 12px' }} />

          {/* Online toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontSize: 13, fontWeight: 600 }}>
              <Icon.car s={18} c="#fff" w={2} />
              <span style={{ opacity: 0.9 }}>{t.car} · {t.plate}</span>
            </div>
            <div style={{ width: 50, height: 28, borderRadius: 999, background: isOnline ? '#fff' : 'rgba(0,0,0,0.25)', position: 'relative', boxShadow: isOnline ? '0 0 0 2px rgba(255,255,255,0.4)' : 'none' }}>
              <div style={{ position: 'absolute', top: 3, left: isOnline ? 25 : 3, width: 22, height: 22, borderRadius: '50%', background: isOnline ? b.primary : '#fff', transition: 'left .2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* Stats row — 4 quick stats */}
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { label: 'Trip', value: '12', color: '#0E1A24' },
            { label: 'Jam', value: '6.4', color: '#0E1A24' },
            { label: 'Acc', value: '94%', color: '#1FB371' },
            { label: 'Rating', value: '4.9', color: '#F59E0B', star: true },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 14, padding: '10px 8px', textAlign: 'center', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <span className="seva-num" style={{ fontSize: 18, fontWeight: 800, color: s.color, letterSpacing: '-0.02em' }}>{s.value}</span>
                {s.star && <Icon.star s={11} c="#F59E0B" />}
              </div>
              <div style={{ fontSize: 10.5, color: '#8A95A3', marginTop: 1, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Nearby demand mini-map */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 18, padding: 14, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1A24' }}>{t.nearby_demand}</div>
              <div style={{ fontSize: 11, color: '#5A6878', marginTop: 1 }}>SCBD · radius 2 km</div>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 999, background: surge ? '#FFE6EE' : '#E6F7F0', color: surge ? '#E5276E' : '#1FB371', fontSize: 11, fontWeight: 700 }}>
              <Icon.trend s={12} c={surge ? '#E5276E' : '#1FB371'} w={2.5} />
              {surge ? `${t.high} · 1.7×` : t.medium}
            </div>
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', height: 130, position: 'relative' }}>
            <CityMap width={350} height={130} color={b.primary} deep={b.deep} showHeat showDriver showPickup={false} showDropoff={false} showRoute={false} variant="a1" />
            {/* pulse on driver */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 18, height: 18 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: b.primary, opacity: 0.4, animation: 'seva-ping 2s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', background: b.primary, border: '2px solid #fff' }} />
            </div>
          </div>
        </div>

        {/* Recent / upcoming activity */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 18, padding: 14, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1A24' }}>{t.upcoming}</div>
            <span style={{ fontSize: 11, color: b.primary, fontWeight: 700 }}>{t.see_all} ›</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', borderBottom: '1px solid #F1F4F7' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E3F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.plane s={20} c={b.deep} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>CGK T3 → Menteng</div>
              <div style={{ fontSize: 11, color: '#5A6878' }}>Besok, 06.30 · Bpk. Hadi</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="seva-num" style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>Rp 285k</div>
              <div style={{ fontSize: 10, color: b.primary, fontWeight: 700 }}>Airport</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#E6F7FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon.calendar s={20} c={b.primary} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>Rental Harian — Ny. Sari</div>
              <div style={{ fontSize: 11, color: '#5A6878' }}>Sab 18 Mei · 8 jam</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="seva-num" style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>Rp 650k</div>
              <div style={{ fontSize: 10, color: b.primary, fontWeight: 700 }}>Rental</div>
            </div>
          </div>
        </div>
      </div>

      <ABottomNav active="home" primary={b.primary} lang={lang} />
    </div>
  );
}

// ─────────────────────────────────────────────
// A2 — INCOMING ORDER (full-screen modal)
// ─────────────────────────────────────────────
function A2Incoming({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const fare = surge ? 87000 : 51000;

  return (
    <div className="seva-font" style={{ height: FRAME_H, position: 'relative', background: '#F4F8FB', overflow: 'hidden' }}>
      {/* Map background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <CityMap width={FRAME_W} height={460} color={b.primary} deep={b.deep} showHeat showDriver routeProgress={0.05} variant="a2" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(244,248,251,0.5) 0%, rgba(244,248,251,0) 30%, rgba(244,248,251,0) 60%, #F4F8FB 100%)' }} />
      </div>

      {/* Top alert */}
      <div style={{ position: 'absolute', top: 56, left: 16, right: 16, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0E1A24', color: '#fff', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700, boxShadow: '0 6px 18px rgba(14,26,36,0.3)' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5C5C', boxShadow: '0 0 0 4px rgba(255,92,92,0.3)' }} />
          {t.incoming.toUpperCase()} · 1.2 km {t.away}
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '24px 24px 0 0', boxShadow: '0 -10px 30px rgba(0,80,120,0.18)', padding: '14px 20px 36px' }}>
        {/* grip */}
        <div style={{ width: 40, height: 4, background: '#E2E7ED', borderRadius: 2, margin: '0 auto 12px' }} />

        {/* Header — type + fare */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: surge ? 'linear-gradient(90deg, #FF4F8B, #FF8A4F)' : b.surface, color: surge ? '#fff' : b.deep, fontSize: 11, fontWeight: 800 }}>
              {surge ? <Icon.bolt s={11} c="#fff" /> : <Icon.car s={11} c={b.deep} />}
              {surge ? `1.7× ${t.surge_active.toUpperCase()}` : t.mode_ride.toUpperCase()}
            </div>
            <div style={{ fontSize: 13, color: '#5A6878', marginTop: 8 }}>{t.you_earn}</div>
            <div className="seva-num" style={{ fontSize: 36, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.03em', lineHeight: 1, marginTop: 2 }}>{Rp(fare, lang)}</div>
          </div>
          {/* Countdown ring */}
          <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
            <svg width="88" height="88" viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="42" fill="none" stroke="#E2E7ED" strokeWidth="4" />
              <circle cx="44" cy="44" r="42" fill="none" stroke={b.primary} strokeWidth="4" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="80" transform="rotate(-90 44 44)" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="seva-num" style={{ fontSize: 28, fontWeight: 800, color: b.primary, lineHeight: 1 }}>12</div>
              <div style={{ fontSize: 9, color: '#8A95A3', fontWeight: 700 }}>DETIK</div>
            </div>
          </div>
        </div>

        {/* Pickup / dropoff */}
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: b.primary, border: '3px solid #fff', boxShadow: `0 0 0 2px ${b.primary}` }} />
            <div style={{ width: 2, flex: 1, background: 'repeating-linear-gradient(to bottom, #C2CAD3 0 4px, transparent 4px 8px)', marginTop: 4, marginBottom: 4 }} />
            <div style={{ width: 12, height: 12, borderRadius: 2, background: '#0E1A24' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: '#8A95A3', fontWeight: 600 }}>{t.pickup} · 1.2 km · 4 {t.minutes_short}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1A24', marginTop: 2 }}>Pacific Place, SCBD</div>
              <div style={{ fontSize: 11, color: '#5A6878' }}>Jl. Jend. Sudirman Kav 52-53</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#8A95A3', fontWeight: 600 }}>{t.dropoff} · 8.4 km · 22 {t.minutes_short}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1A24', marginTop: 2 }}>Plaza Indonesia</div>
              <div style={{ fontSize: 11, color: '#5A6878' }}>Jl. M.H. Thamrin Kav 28-30</div>
            </div>
          </div>
        </div>

        {/* Passenger */}
        <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 14, background: '#F7FAFC', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name="Rina P" size={36} bg={b.deep} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>Rina P.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#5A6878' }}>
              <Icon.star s={11} c="#F59E0B" /> 4.92 · 84 trip
            </div>
          </div>
          <div style={{ padding: '4px 8px', borderRadius: 8, background: '#fff', fontSize: 10, fontWeight: 700, color: '#5A6878', border: '1px solid #E2E7ED' }}>CASH</div>
        </div>

        {/* Action buttons */}
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button style={{ flex: '0 0 90px', height: 56, borderRadius: 16, border: '1.5px solid #E2E7ED', background: '#fff', color: '#5A6878', fontWeight: 700, fontSize: 14 }}>{t.reject}</button>
          <button style={{ flex: 1, height: 56, borderRadius: 16, border: 'none', background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '0.01em', boxShadow: `0 8px 20px ${b.primary}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {t.accept} <Icon.arrowRight s={20} c="#fff" w={3} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// A3 — NAVIGATE TO PICKUP
// ─────────────────────────────────────────────
function A3Pickup({ tweaks }) {
  const { brandKey, lang } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  return (
    <div className="seva-font" style={{ height: FRAME_H, position: 'relative', background: '#E8EEF3', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <CityMap width={FRAME_W} height={FRAME_H} color={b.primary} deep={b.deep} routeProgress={0.35} variant="a3" />
      </div>

      {/* Top — ETA pill + back */}
      <div style={{ position: 'absolute', top: 56, left: 14, right: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <button style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', border: 'none', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.chevR s={20} c="#0E1A24" w={2.5} style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '8px 14px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#5A6878', fontWeight: 600 }}>{t.pickup}</div>
            <div className="seva-num" style={{ fontSize: 18, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.02em' }}>4 <span style={{ fontSize: 13, fontWeight: 600, color: '#5A6878' }}>{t.minutes_short}</span> · 1.2 <span style={{ fontSize: 13, fontWeight: 600, color: '#5A6878' }}>{t.km_short}</span></div>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: b.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.pin s={20} c={b.primary} w={2.4} />
          </div>
        </div>
      </div>

      {/* Floating direction card */}
      <div style={{ position: 'absolute', top: 120, left: 14, right: 14, background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, borderRadius: 16, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: `0 10px 24px ${b.primary}40` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.arrowRight s={26} c="#fff" w={3} />
        </div>
        <div style={{ flex: 1, color: '#fff' }}>
          <div className="seva-num" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>320 m</div>
          <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>Belok kanan ke Jl. Jend. Sudirman</div>
        </div>
      </div>

      {/* Bottom sheet — passenger info */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '24px 24px 0 0', boxShadow: '0 -10px 30px rgba(0,80,120,0.18)', padding: '14px 18px 30px' }}>
        <div style={{ width: 40, height: 4, background: '#E2E7ED', borderRadius: 2, margin: '0 auto 14px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name="Rina P" size={48} bg={b.deep} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0E1A24' }}>Rina P.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#5A6878', marginTop: 2 }}>
              <Icon.star s={12} c="#F59E0B" /> 4.92
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C2CAD3' }} />
              <span style={{ padding: '1px 6px', borderRadius: 4, background: '#F1F4F7', fontSize: 10, fontWeight: 700 }}>CASH</span>
            </div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 12, background: '#1FB371', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(31,179,113,0.35)' }}><Icon.phone s={20} c="#fff" w={2.2} /></button>
          <button style={{ width: 44, height: 44, borderRadius: 12, background: b.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.chat s={20} c={b.primary} w={2.2} /></button>
        </div>

        <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: '#F7FAFC', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: b.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon.pinFilled s={18} c="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#8A95A3', fontWeight: 700 }}>{t.pickup.toUpperCase()}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0E1A24', marginTop: 1 }}>Pacific Place, SCBD</div>
            <div style={{ fontSize: 11, color: '#5A6878', marginTop: 1 }}>Lobby Mall · Pintu Utara</div>
          </div>
        </div>

        <button style={{ marginTop: 14, width: '100%', height: 56, borderRadius: 16, border: 'none', background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, color: '#fff', fontWeight: 800, fontSize: 16, boxShadow: `0 8px 20px ${b.primary}55` }}>
          {t.arrived} →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// A4 — IN-TRIP
// ─────────────────────────────────────────────
function A4InTrip({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  return (
    <div className="seva-font" style={{ height: FRAME_H, position: 'relative', background: '#E8EEF3', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <CityMap width={FRAME_W} height={FRAME_H} color={b.primary} deep={b.deep} routeProgress={0.62} variant="a4" />
      </div>

      {/* Top — destination strip */}
      <div style={{ position: 'absolute', top: 56, left: 14, right: 14 }}>
        <div style={{ background: '#0E1A24', borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 22px rgba(14,26,36,0.35)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: b.primary, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{t.dropoff}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Plaza Indonesia · Lvl B1</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="seva-num" style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1 }}>14<span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{t.minutes_short}</span></div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>3.2 {t.km_short}</div>
          </div>
        </div>
      </div>

      {/* In-trip badge top center */}
      <div style={{ position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', padding: '6px 12px', borderRadius: 999, boxShadow: 'var(--shadow-card)', fontSize: 11, fontWeight: 700, color: b.deep }}>
          <StatusDot status="busy" size={6} />
          {t.busy.toUpperCase()} · 00:08:42
        </div>
      </div>

      {/* Fare ticker */}
      <div style={{ position: 'absolute', right: 14, top: 170, background: '#fff', borderRadius: 14, padding: '10px 14px', boxShadow: 'var(--shadow-card)', textAlign: 'right' }}>
        <div style={{ fontSize: 10, color: '#8A95A3', fontWeight: 700, letterSpacing: '0.04em' }}>METER {surge ? '· SURGE 1.7×' : ''}</div>
        <div className="seva-num" style={{ fontSize: 20, fontWeight: 800, color: surge ? '#E5276E' : '#0E1A24', letterSpacing: '-0.02em' }}>{Rp(surge ? 64200 : 38500, lang)}</div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '24px 24px 0 0', boxShadow: '0 -10px 30px rgba(0,80,120,0.18)', padding: '14px 18px 30px' }}>
        <div style={{ width: 40, height: 4, background: '#E2E7ED', borderRadius: 2, margin: '0 auto 14px' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Avatar name="Rina P" size={40} bg={b.deep} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>Rina P.</div>
            <div style={{ fontSize: 11, color: '#5A6878' }}>{t.passenger} · 1 orang</div>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 12, background: '#1FB371', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.phone s={18} c="#fff" w={2.2} /></button>
          <button style={{ width: 40, height: 40, borderRadius: 12, background: b.surface, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.chat s={18} c={b.primary} w={2.2} /></button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: '0 0 56px', height: 56, borderRadius: 16, background: '#F7FAFC', border: '1.5px solid #E2E7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.shield s={22} c="#5A6878" w={2} />
          </button>
          <button style={{ flex: 1, height: 56, borderRadius: 16, border: 'none', background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, color: '#fff', fontWeight: 800, fontSize: 15, boxShadow: `0 8px 20px ${b.primary}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Icon.flag s={18} c="#fff" w={2.4} /> {t.end_trip}
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ABottomNav, A1Home, A2Incoming, A3Pickup, A4InTrip, FRAME_W, FRAME_H });
