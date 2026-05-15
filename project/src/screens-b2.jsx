// screens-b2.jsx — Variation B part 2: Pickup, In-Trip, Complete, Riwayat, Earnings (punchy)

// ─────────────────────────────────────────────
// B3 — NAVIGATE TO PICKUP (dark)
// ─────────────────────────────────────────────
function B3Pickup({ tweaks }) {
  const { brandKey, lang } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  return (
    <div className="seva-font" style={{ height: FRAME_H, position: 'relative', background: '#0B1620', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <CityMap width={FRAME_W} height={FRAME_H} color={b.primary} deep={b.deep} dark routeProgress={0.35} variant="b3" />
      </div>

      {/* Top — big direction card, black */}
      <div style={{ position: 'absolute', top: 50, left: 14, right: 14 }}>
        <div style={{ background: '#0E1A24', borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 12px 32px rgba(0,0,0,0.5)', border: `1px solid ${b.primary}55` }}>
          <div style={{ width: 50, height: 50, borderRadius: 12, background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon.arrowRight s={28} c="#fff" w={3.2} />
          </div>
          <div style={{ flex: 1, color: '#fff' }}>
            <div className="seva-num" style={{ fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>320 m</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>Belok kanan → Jl. Sudirman</div>
          </div>
          <button style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.close s={18} c="#fff" w={2.4} />
          </button>
        </div>
      </div>

      {/* ETA badge */}
      <div style={{ position: 'absolute', top: 134, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 999, background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}>
          <Icon.clock s={14} c={b.primary} w={2.4} />
          <span className="seva-num" style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>4 min · 1.2 km · ETA 14:18</span>
        </div>
      </div>

      {/* Bottom sheet — punchy */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '16px 18px 30px' }}>
        {/* Pickup destination row */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid #F1F4F7' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon.pinFilled s={22} c="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, color: '#8A95A3', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.pickup}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0E1A24' }}>Pacific Place · Pintu Utara</div>
          </div>
        </div>

        {/* Passenger row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0 0' }}>
          <Avatar name="Rina P" size={44} bg={b.deep} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#0E1A24' }}>Rina P.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A6878', marginTop: 1 }}>
              <Icon.star s={11} c="#F59E0B" /> 4.92
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C2CAD3' }} />
              CASH
            </div>
          </div>
          <button style={{ width: 46, height: 46, borderRadius: 12, background: '#1FB371', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.phone s={20} c="#fff" w={2.2} /></button>
          <button style={{ width: 46, height: 46, borderRadius: 12, background: '#0E1A24', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.chat s={20} c="#fff" w={2.2} /></button>
        </div>

        <button style={{ marginTop: 16, width: '100%', height: 58, borderRadius: 12, border: 'none', background: '#0E1A24', color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase', position: 'relative', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${b.primary}, ${b.deep})`, opacity: 0.95 }} />
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Icon.pinFilled s={18} c="#fff" /> {t.arrived}
          </span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// B4 — IN-TRIP (dark, fare prominent)
// ─────────────────────────────────────────────
function B4InTrip({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  return (
    <div className="seva-font" style={{ height: FRAME_H, position: 'relative', background: '#0B1620', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <CityMap width={FRAME_W} height={FRAME_H} color={b.primary} deep={b.deep} dark routeProgress={0.62} variant="b4" />
      </div>

      {/* Top — destination */}
      <div style={{ position: 'absolute', top: 50, left: 14, right: 14, background: '#0E1A24', borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center', border: `1px solid #1F2D3D` }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 12, height: 12, borderRadius: 2, background: b.primary }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.dropoff}</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Plaza Indonesia · Lvl B1</div>
        </div>
        <div style={{ textAlign: 'right', color: '#fff' }}>
          <div className="seva-num" style={{ fontSize: 20, fontWeight: 800, lineHeight: 1 }}>14<span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>m</span></div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginTop: 2 }}>3.2 km</div>
        </div>
      </div>

      {/* Status pill */}
      <div style={{ position: 'absolute', top: 124, left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F59E0B', color: '#0E1A24', padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: '0 6px 16px rgba(245,158,11,0.5)' }}>
          <StatusDot status="busy" size={6} /> {t.busy} · 00:08:42
        </div>
      </div>

      {/* Fare meter floating right */}
      <div style={{ position: 'absolute', right: 14, top: 168, background: '#0E1A24', borderRadius: 12, padding: '10px 14px', textAlign: 'right', border: `1px solid ${surge ? '#FF4F8B' : '#1F2D3D'}`, boxShadow: surge ? '0 6px 16px rgba(255,79,139,0.4)' : '0 6px 16px rgba(0,0,0,0.4)' }}>
        <div style={{ fontSize: 10, color: surge ? '#FF8A4F' : 'rgba(255,255,255,0.55)', fontWeight: 800, letterSpacing: '0.06em' }}>{surge ? 'SURGE 1.7×' : 'METER'}</div>
        <div className="seva-num" style={{ fontSize: 22, fontWeight: 800, color: surge ? '#FF8A4F' : '#fff', letterSpacing: '-0.02em', marginTop: 2 }}>{Rp(surge ? 64200 : 38500, lang)}</div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderRadius: '20px 20px 0 0', padding: '16px 18px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #F1F4F7' }}>
          <Avatar name="Rina P" size={42} bg={b.deep} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0E1A24' }}>Rina P.</div>
            <div style={{ fontSize: 11, color: '#5A6878' }}>1 orang · CASH</div>
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 10, background: '#1FB371', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.phone s={18} c="#fff" w={2.2} /></button>
          <button style={{ width: 42, height: 42, borderRadius: 10, background: '#0E1A24', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.chat s={18} c="#fff" w={2.2} /></button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: '0 0 60px', height: 58, borderRadius: 12, background: '#FEE2E2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.shield s={22} c="#E5484D" w={2.2} />
          </button>
          <button style={{ flex: 1, height: 58, borderRadius: 12, border: 'none', background: '#0E1A24', color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase', position: 'relative', overflow: 'hidden' }}>
            <span style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${b.primary}, ${b.deep})` }} />
            <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <Icon.flag s={18} c="#fff" w={2.4} /> {t.end_trip}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// B5 — TRIP COMPLETE (punchy)
// ─────────────────────────────────────────────
function B5Complete({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const base = 38000, bonus = surge ? 26200 : 0, tip = 5000;
  const total = base + bonus + tip;

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F6F8' }}>
      {/* Black hero header */}
      <div style={{ background: '#0E1A24', color: '#fff', padding: '54px 20px 30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: 20, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${b.primary}40, transparent 60%)` }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: b.light, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', position: 'relative' }}>
          <Icon.check s={14} c={b.light} w={3} /> {t.trip_complete}
        </div>
        <div className="seva-num" style={{ fontSize: 52, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginTop: 8, position: 'relative' }}>{Rp(total, lang)}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>Pacific Place → Plaza Indonesia · 8.4 km · 22 min</div>
      </div>

      <div style={{ padding: '16px 18px 30px' }}>
        {/* Breakdown */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 4, border: '1.5px solid #E2E7ED' }}>
          {[
            { l: t.base_fare, v: base, c: '#0E1A24' },
            ...(surge ? [{ l: `${t.surge} (1.7×)`, v: bonus, c: '#FF4F8B', bold: true }] : []),
            { l: t.tips, v: tip, c: '#1FB371' },
          ].map((r, i, arr) => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderBottom: i < arr.length - 1 ? '1px solid #F1F4F7' : 'none', fontSize: 13 }}>
              <span style={{ color: '#5A6878', fontWeight: 600 }}>{r.l}</span>
              <span className="seva-num" style={{ color: r.c, fontWeight: r.bold ? 800 : 700 }}>+ {Rp(r.v, lang)}</span>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 14, padding: 16, border: '1.5px solid #E2E7ED' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name="Rina P" size={44} bg={b.deep} />
            <div>
              <div style={{ fontSize: 11, color: '#8A95A3', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t.rate_rider}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#0E1A24' }}>Rina P.</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, gap: 6 }}>
            {[1,2,3,4,5].map((i) => (
              <button key={i} style={{ flex: 1, height: 56, borderRadius: 10, border: '1.5px solid', borderColor: i <= 5 ? '#F59E0B' : '#E2E7ED', background: i <= 5 ? '#FFF7E6' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon.star s={26} fill={i <= 5 ? '#F59E0B' : '#E2E7ED'} />
              </button>
            ))}
          </div>
        </div>

        <button style={{ marginTop: 14, width: '100%', height: 56, borderRadius: 12, border: 'none', background: '#0E1A24', color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase', position: 'relative', overflow: 'hidden' }}>
          <span style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${b.primary}, ${b.deep})` }} />
          <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <Icon.bolt s={18} c="#fff" /> Cari order berikutnya
          </span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// B6 — RIWAYAT (punchy)
// ─────────────────────────────────────────────
function B6Riwayat({ tweaks }) {
  const { brandKey, lang } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  const trips = [
    { day: 'HARI INI · KAM 15 MEI', total: 396200, items: [
      { time: '13:42', from: 'Pacific Place', to: 'Plaza Indonesia', fare: 69200, type: 'ride', dist: '8.4', dur: '22' },
      { time: '11:28', from: 'Senayan City', to: 'Kuningan City', fare: 42000, type: 'ride', dist: '5.1', dur: '15' },
      { time: '09:15', from: 'Tebet', to: 'CGK T3', fare: 285000, type: 'airport', dist: '32', dur: '58' },
    ]},
    { day: 'KEMARIN · RAB 14 MEI', total: 728500, items: [
      { time: '18:05', from: 'Grand Indo', to: 'Pondok Indah', fare: 78500, type: 'ride', dist: '12', dur: '34' },
      { time: '14:30', from: 'Menteng', to: 'Cancelled', fare: 0, type: 'ride', status: 'cancel' },
      { time: '10:00', from: 'Rental Harian — Ny. Putri', to: '8 jam', fare: 650000, type: 'rental' },
    ]},
  ];

  const typeMeta = {
    ride: { icon: Icon.car, bg: b.surface, fg: b.deep, label: 'RIDE' },
    rental: { icon: Icon.calendar, bg: '#FFF4D6', fg: '#B47E00', label: 'RENTAL' },
    airport: { icon: Icon.plane, bg: '#E3F0FA', fg: b.deep, label: 'AIRPORT' },
  };

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F6F8' }}>
      {/* Black header */}
      <div style={{ background: '#0E1A24', color: '#fff', padding: '54px 18px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>{t.riwayat} · Mei 2026</div>
            <div className="seva-num" style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>32 trip · {Rp(4215000, lang)}</div>
          </div>
          <button style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon.filter s={20} c="#fff" w={2} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, overflowX: 'auto' }} className="seva-scroll">
          {['Semua', t.mode_ride, t.mode_rental, t.mode_airport, t.cancelled].map((c, i) => (
            <div key={c} style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 8, background: i === 0 ? b.primary : 'rgba(255,255,255,0.08)', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 800, letterSpacing: '0.02em', textTransform: 'uppercase' }}>{c}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 18px 110px' }}>
        {trips.map((g) => (
          <div key={g.day} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 4px', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#8A95A3', letterSpacing: '0.06em' }}>{g.day}</span>
              <span className="seva-num" style={{ fontSize: 12, fontWeight: 800, color: '#0E1A24' }}>{Rp(g.total, lang)}</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E2E7ED', overflow: 'hidden' }}>
              {g.items.map((it, i) => {
                const m = typeMeta[it.type];
                const cancelled = it.status === 'cancel';
                return (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 14px', borderBottom: i < g.items.length - 1 ? '1px solid #F1F4F7' : 'none', alignItems: 'center', opacity: cancelled ? 0.55 : 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
                      <div className="seva-num" style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>{it.time}</div>
                      <div style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: cancelled ? '#FEE2E2' : m.bg, color: cancelled ? '#E5484D' : m.fg, fontWeight: 800, letterSpacing: '0.04em', marginTop: 3 }}>{cancelled ? 'BATAL' : m.label}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {it.from}{!cancelled ? <span style={{ color: '#8A95A3' }}> → </span> : null}{!cancelled && it.to}
                      </div>
                      {!cancelled && it.dist && (
                        <div className="seva-num" style={{ fontSize: 11, color: '#5A6878', marginTop: 2 }}>{it.dist} km · {it.dur} min</div>
                      )}
                    </div>
                    <div className="seva-num" style={{ fontSize: 13, fontWeight: 800, color: cancelled ? '#E5484D' : '#0E1A24' }}>{cancelled ? '—' : Rp(it.fare, lang)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <BBottomNav active="riwayat" primary={b.primary} deep={b.deep} lang={lang} />
    </div>
  );
}

// ─────────────────────────────────────────────
// B7 — EARNINGS (punchy)
// ─────────────────────────────────────────────
function B7Earnings({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const total = surge ? 1842000 : 1428000;
  const target = 2000000;
  const pct = Math.min(100, Math.round(total / target * 100));

  const bars = [
    { d: 'S', v: 180 }, { d: 'S', v: 210 }, { d: 'R', v: 320 },
    { d: 'K', v: 285 }, { d: 'J', v: 412 }, { d: 'S', v: 240 }, { d: 'M', v: 0 },
  ];
  const maxBar = Math.max(...bars.map(b => b.v));

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F6F8' }}>
      {/* Black header with totals */}
      <div style={{ background: '#0E1A24', color: '#fff', padding: '54px 18px 26px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -40, top: -20, width: 200, height: 200, opacity: 0.15, background: `radial-gradient(circle, ${b.primary}, transparent 60%)` }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>{t.earnings} · {t.week}</div>
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 8 }}>
            {[t.today.slice(0,3), 'Mgg', 'Bln'].map((p, i) => (
              <div key={p} style={{ padding: '4px 10px', borderRadius: 6, background: i === 1 ? b.primary : 'transparent', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{p}</div>
            ))}
          </div>
        </div>

        <div className="seva-num" style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, lineHeight: 1, position: 'relative' }}>{Rp(total, lang)}</div>

        {/* target progress */}
        <div style={{ marginTop: 16, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
            <span>{t.weekly_target}</span>
            <span><span className="seva-num" style={{ color: b.light, fontWeight: 800 }}>{pct}%</span> · {Rp(target, lang)}</span>
          </div>
          <div style={{ marginTop: 6, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${b.primary}, ${b.deep})`, borderRadius: 4 }} />
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 18px 110px' }}>
        {/* Chart */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, border: '1.5px solid #E2E7ED' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>Per hari · ribu</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: '#E6F7F0', fontSize: 11, color: '#1FB371', fontWeight: 800 }}><Icon.trend s={12} c="#1FB371" w={2.5} /> +18%</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130, paddingBottom: 18, position: 'relative' }}>
            {bars.map((bar, i) => {
              const h = bar.v === 0 ? 4 : (bar.v / maxBar) * 110;
              const today = i === 4;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                  {today && <div className="seva-num" style={{ position: 'absolute', top: -4, fontSize: 10, fontWeight: 800, color: '#0E1A24' }}>412</div>}
                  <div style={{ width: '100%', height: h, background: today ? '#0E1A24' : bar.v === 0 ? '#E2E7ED' : '#C2CAD3' }} />
                  <div style={{ fontSize: 11, color: today ? '#0E1A24' : '#8A95A3', fontWeight: today ? 800 : 600, position: 'absolute', bottom: 0 }}>{bar.d}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* By type */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 14, padding: 4, border: '1.5px solid #E2E7ED' }}>
          {[
            { label: t.mode_ride, value: 842000, n: 24, c: b.primary, w: 58, icon: Icon.car },
            { label: t.mode_rental, value: 650000, n: 1, c: '#B47E00', w: 32, icon: Icon.calendar },
            { label: t.mode_airport, value: 350000, n: 2, c: b.deep, w: 10, icon: Icon.plane },
          ].map((r, i, arr) => (
            <div key={r.label} style={{ padding: '12px 14px', borderBottom: i < arr.length - 1 ? '1px solid #F1F4F7' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${r.c}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <r.icon s={20} c={r.c} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>{r.label}</div>
                  <div style={{ fontSize: 11, color: '#5A6878' }}>{r.n} order · {r.w}%</div>
                </div>
                <div className="seva-num" style={{ fontSize: 14, fontWeight: 800, color: '#0E1A24' }}>{Rp(r.value, lang)}</div>
              </div>
              <div style={{ marginTop: 8, height: 4, background: '#F1F4F7', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.w}%`, background: r.c }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BBottomNav active="earnings" primary={b.primary} deep={b.deep} lang={lang} />
    </div>
  );
}

Object.assign(window, { B3Pickup, B4InTrip, B5Complete, B6Riwayat, B7Earnings });
