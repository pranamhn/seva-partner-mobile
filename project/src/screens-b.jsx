// screens-b.jsx — Variation B: Driver Punchy (high contrast, dense, field-optimized)
// Sharper corners (10-12px), bigger numbers, black header sections, bright cyan accents.

// ─────────────────────────────────────────────
// Punchy bottom nav (squared, dark)
// ─────────────────────────────────────────────
function BBottomNav({ active = 'home', primary, deep, lang = 'id' }) {
  const t = T(lang);
  const items = [
    { id: 'home', label: t.home, icon: Icon.home },
    { id: 'earnings', label: t.earnings, icon: Icon.wallet },
    { id: 'qr', icon: Icon.bolt, center: true },
    { id: 'riwayat', label: t.riwayat, icon: Icon.clock },
    { id: 'profile', label: t.profile, icon: Icon.user },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30, background: '#0E1A24', padding: '10px 8px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', borderTop: `1px solid #1F2D3D` }}>
      {items.map((it) => {
        if (it.center) {
          return (
            <div key={it.id} style={{ position: 'relative', width: 64 }}>
              <div style={{ position: 'absolute', left: '50%', top: -24, transform: 'translateX(-50%)', width: 60, height: 60, borderRadius: 16, background: `linear-gradient(135deg, ${primary}, ${deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${primary}99, 0 0 0 4px #0E1A24` }}>
                <it.icon s={28} c="#fff" />
              </div>
              <div style={{ height: 40 }} />
            </div>
          );
        }
        const isActive = it.id === active;
        return (
          <div key={it.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 4px', minWidth: 56 }}>
            <it.icon s={22} c={isActive ? primary : 'rgba(255,255,255,0.5)'} w={isActive ? 2.4 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: 800, color: isActive ? primary : 'rgba(255,255,255,0.5)', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// B1 — HOME (punchy)
// ─────────────────────────────────────────────
function B1Home({ tweaks }) {
  const { brandKey, status, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const greeting = (h => h < 11 ? t.greeting_morning : h < 15 ? t.greeting_afternoon : t.greeting_evening)(13);
  const isOnline = status !== 'offline';
  const statusLabel = status === 'online' ? t.online : status === 'busy' ? t.busy : t.offline;

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F6F8', position: 'relative' }}>
      {/* Top black banner */}
      <div style={{ background: '#0E1A24', color: '#fff', padding: '54px 18px 22px', position: 'relative' }}>
        {/* Pattern */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 160, opacity: 0.06,
          backgroundImage: `radial-gradient(${b.primary} 1.5px, transparent 1.5px)`,
          backgroundSize: '12px 12px', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name="U" size={42} bg={b.primary} />
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{greeting}</div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Umaedi · ID 7812</div>
            </div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.1)', border: 'none', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.bell s={20} c="#fff" w={2} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#FF5C5C' }} />
          </button>
        </div>

        {/* Hero earnings */}
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{t.earnings_today}</div>
            <div className="seva-num" style={{ fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginTop: 4 }}>{Rp(surge ? 412000 : 287500, lang)}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 11, color: b.light, fontWeight: 700 }}>
              <Icon.trend s={12} c={b.light} w={2.5} /> +24% vs kemarin
            </div>
          </div>
          {/* Status pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 10, background: status === 'online' ? `${b.primary}25` : status === 'busy' ? '#F59E0B25' : 'rgba(255,255,255,0.1)', border: `1px solid ${status === 'online' ? b.primary : status === 'busy' ? '#F59E0B' : 'rgba(255,255,255,0.2)'}`, color: status === 'online' ? b.primary : status === 'busy' ? '#F59E0B' : '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            <StatusDot status={status} size={6} /> {statusLabel}
          </div>
        </div>

        {/* Online/Offline big button */}
        <button style={{ marginTop: 16, width: '100%', height: 52, borderRadius: 12, border: 'none', background: isOnline ? `linear-gradient(90deg, ${b.primary}, ${b.deep})` : 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '0.02em', textTransform: 'uppercase', boxShadow: isOnline ? `0 6px 18px ${b.primary}55` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Icon.bolt s={20} c="#fff" /> {isOnline ? t.go_offline : t.go_online}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 18px 110px' }}>
        {/* Mode tabs — boxed */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { id: 'ride', label: t.mode_ride, icon: Icon.car, count: '8 aktif' },
            { id: 'rental', label: t.mode_rental, icon: Icon.calendar, count: '1 jadwal' },
            { id: 'airport', label: t.mode_airport, icon: Icon.plane, count: '1 besok' },
          ].map((m, i) => {
            const active = i === 0;
            return (
              <div key={m.id} style={{ background: active ? '#0E1A24' : '#fff', color: active ? '#fff' : '#0E1A24', borderRadius: 12, padding: '12px 10px', border: active ? 'none' : '1.5px solid #E2E7ED' }}>
                <m.icon s={22} c={active ? b.primary : '#5A6878'} w={2} />
                <div style={{ fontSize: 12, fontWeight: 800, marginTop: 6, lineHeight: 1.1 }}>{m.label}</div>
                <div style={{ fontSize: 10, color: active ? 'rgba(255,255,255,0.55)' : '#8A95A3', marginTop: 2, fontWeight: 600 }}>{m.count}</div>
              </div>
            );
          })}
        </div>

        {/* Stats grid */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 4, border: '1.5px solid #E2E7ED', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { l: 'TRIP', v: '12', sub: 'hari ini' },
            { l: 'JAM', v: '6.4', sub: 'online' },
            { l: 'ACC', v: '94%', sub: '', good: true },
            { l: '★', v: '4.9', sub: '4.9 / 5', star: true },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: '12px 8px', textAlign: 'center', borderRight: i < 3 ? '1px solid #F1F4F7' : 'none' }}>
              <div style={{ fontSize: 10, color: '#8A95A3', fontWeight: 800, letterSpacing: '0.06em' }}>{s.l}</div>
              <div className="seva-num" style={{ fontSize: 22, fontWeight: 800, color: s.good ? '#1FB371' : s.star ? '#F59E0B' : '#0E1A24', letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Demand heat-map */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1.5px solid #E2E7ED' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderBottom: '1px solid #F1F4F7' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>{t.nearby_demand}</div>
              <div style={{ fontSize: 11, color: '#5A6878' }}>SCBD · 2 km</div>
            </div>
            {surge ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: 'linear-gradient(90deg, #FF4F8B, #FF8A4F)', color: '#fff', fontSize: 11, fontWeight: 800 }}>
                <Icon.bolt s={11} c="#fff" /> 1.7× SURGE
              </div>
            ) : (
              <div style={{ padding: '4px 10px', borderRadius: 8, background: '#E6F7F0', color: '#1FB371', fontSize: 11, fontWeight: 800 }}>NORMAL</div>
            )}
          </div>
          <div style={{ height: 130, position: 'relative' }}>
            <CityMap width={364} height={130} color={b.primary} deep={b.deep} showHeat showDriver showPickup={false} showDropoff={false} showRoute={false} variant="b1" />
          </div>
          <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A6878', borderTop: '1px solid #F1F4F7' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: b.primary }} />
            Pickup hotspot
            <span style={{ marginLeft: 'auto', color: '#0E1A24', fontWeight: 700 }}>5 driver online</span>
          </div>
        </div>

        {/* Upcoming */}
        <div style={{ marginTop: 14, fontSize: 11, color: '#8A95A3', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{t.upcoming}</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E2E7ED', overflow: 'hidden' }}>
          {[
            { i: Icon.plane, l: 'CGK T3 → Menteng', s: 'Besok 06:30 · Hadi', v: 285000, tag: 'AIRPORT', tc: b.deep, tbg: '#E3F0FA' },
            { i: Icon.calendar, l: 'Rental Harian — Sari', s: 'Sab 18 Mei · 8 jam', v: 650000, tag: 'RENTAL', tc: '#B47E00', tbg: '#FFF4D6' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i === 0 ? '1px solid #F1F4F7' : 'none' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: r.tbg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <r.i s={20} c={r.tc} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: r.tbg, color: r.tc, fontWeight: 800, letterSpacing: '0.04em' }}>{r.tag}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24', marginTop: 3 }}>{r.l}</div>
                <div style={{ fontSize: 11, color: '#5A6878' }}>{r.s}</div>
              </div>
              <div className="seva-num" style={{ fontSize: 14, fontWeight: 800, color: '#0E1A24' }}>{Rp(r.v, lang)}</div>
            </div>
          ))}
        </div>
      </div>

      <BBottomNav active="home" primary={b.primary} deep={b.deep} lang={lang} />
    </div>
  );
}

// ─────────────────────────────────────────────
// B2 — INCOMING ORDER
// ─────────────────────────────────────────────
function B2Incoming({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const fare = surge ? 87000 : 51000;

  return (
    <div className="seva-font" style={{ height: FRAME_H, position: 'relative', background: '#0E1A24', overflow: 'hidden' }}>
      {/* Map background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400 }}>
        <CityMap width={FRAME_W} height={400} color={b.primary} deep={b.deep} dark showHeat showDriver routeProgress={0.05} variant="b2" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,26,36,0.6) 0%, rgba(14,26,36,0) 30%, rgba(14,26,36,0) 60%, #0E1A24 100%)' }} />
      </div>

      {/* Top alert — pulsing */}
      <div style={{ position: 'absolute', top: 56, left: 16, right: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: `linear-gradient(90deg, ${b.primary}, ${b.deep})`, padding: '10px 16px', borderRadius: 12, color: '#fff', boxShadow: `0 8px 24px ${b.primary}88` }}>
          <div style={{ position: 'relative', width: 12, height: 12 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', animation: 'seva-ping 1.2s ease-out infinite' }} />
            <div style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: '#fff' }} />
          </div>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{t.new_order} · 1.2 km</div>
          <span className="seva-num" style={{ fontSize: 14, fontWeight: 800 }}>:12</span>
        </div>
      </div>

      {/* Bottom card — full width, sharp */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '16px 18px 30px', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
        {/* Type bar */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: '#0E1A24', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon.car s={16} c={b.primary} />
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.02em' }}>{t.mode_ride.toUpperCase()}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>CASH</span>
          </div>
          {surge && (
            <div style={{ padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(90deg, #FF4F8B, #FF8A4F)', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon.bolt s={14} c="#fff" />
              <span style={{ fontSize: 12, fontWeight: 800 }}>1.7×</span>
            </div>
          )}
        </div>

        {/* Fare hero */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: '#8A95A3', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.you_earn}</div>
            <div className="seva-num" style={{ fontSize: 44, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.03em', lineHeight: 1, marginTop: 2 }}>{Rp(fare, lang)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="seva-num" style={{ fontSize: 22, fontWeight: 800, color: '#0E1A24', lineHeight: 1 }}>8.4<span style={{ fontSize: 13, color: '#8A95A3' }}>km</span></div>
            <div className="seva-num" style={{ fontSize: 13, color: '#5A6878', fontWeight: 700, marginTop: 4 }}>22 min trip</div>
            <div className="seva-num" style={{ fontSize: 11, color: '#8A95A3', marginTop: 2, fontWeight: 600 }}>1.2 km pickup</div>
          </div>
        </div>

        {/* Route */}
        <div style={{ marginTop: 14, padding: 12, background: '#F4F6F8', borderRadius: 10, border: '1px solid #E2E7ED' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: b.primary, flexShrink: 0, border: '2.5px solid #fff', boxShadow: `0 0 0 1.5px ${b.primary}` }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Pacific Place, SCBD</div>
          </div>
          <div style={{ marginLeft: 4.5, height: 14, borderLeft: `2px dotted #C2CAD3` }} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#0E1A24', flexShrink: 0 }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Plaza Indonesia</div>
          </div>
        </div>

        {/* Passenger row */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name="Rina P" size={36} bg={b.deep} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>Rina P.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#5A6878' }}>
              <Icon.star s={11} c="#F59E0B" /> 4.92 · 84 trip
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <button style={{ flex: '0 0 64px', height: 60, borderRadius: 12, border: 'none', background: '#F1F4F7', color: '#5A6878', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.close s={22} c="#5A6878" w={2.4} />
          </button>
          <button style={{ flex: 1, height: 60, borderRadius: 12, border: 'none', background: '#0E1A24', color: '#fff', fontWeight: 800, fontSize: 17, letterSpacing: '0.02em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: `linear-gradient(90deg, ${b.primary}, ${b.deep})`, transition: 'width .2s', opacity: 0.85 }} />
            <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon.check s={20} c="#fff" w={3} /> {t.accept} · {Rp(fare, lang)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BBottomNav, B1Home, B2Incoming });
