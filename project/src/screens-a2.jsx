// screens-a2.jsx — Variation A part 2: Trip Complete, Riwayat, Earnings

// ─────────────────────────────────────────────
// A5 — TRIP COMPLETE
// ─────────────────────────────────────────────
function A5Complete({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);
  const base = 38000;
  const bonus = surge ? 26200 : 0;
  const tip = 5000;
  const total = base + bonus + tip;

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F8FB', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 320, background: `linear-gradient(180deg, ${b.surface} 0%, #F4F8FB 100%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '60px 18px 40px' }}>
        {/* Top: success */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
          <div style={{ position: 'relative', width: 88, height: 88 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: b.primary, opacity: 0.18, animation: 'seva-ping 2s ease-out infinite' }} />
            <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 28px ${b.primary}55` }}>
              <Icon.check s={36} c="#fff" w={3.5} />
            </div>
          </div>
          <div style={{ fontSize: 14, color: '#5A6878', marginTop: 18, fontWeight: 600 }}>{t.trip_complete}</div>
          <div className="seva-num" style={{ fontSize: 44, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.03em', lineHeight: 1, marginTop: 6 }}>{Rp(total, lang)}</div>
          <div style={{ fontSize: 12, color: '#5A6878', marginTop: 6 }}>Pacific Place → Plaza Indonesia · 8.4 km</div>
        </div>

        {/* Breakdown */}
        <div style={{ marginTop: 24, background: '#fff', borderRadius: 18, padding: 16, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24', marginBottom: 10 }}>Rincian</div>
          {[
            { l: t.base_fare, v: base, c: '#0E1A24' },
            ...(surge ? [{ l: `${t.surge} (1.7×)`, v: bonus, c: '#E5276E', bold: true }] : []),
            { l: t.tips, v: tip, c: '#1FB371' },
          ].map((r) => (
            <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
              <span style={{ color: '#5A6878' }}>{r.l}</span>
              <span className="seva-num" style={{ color: r.c, fontWeight: r.bold ? 800 : 600 }}>+ {Rp(r.v, lang)}</span>
            </div>
          ))}
          <div style={{ height: 1, background: '#F1F4F7', margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>{t.total}</span>
            <span className="seva-num" style={{ fontSize: 22, fontWeight: 800, color: b.deep }}>{Rp(total, lang)}</span>
          </div>
        </div>

        {/* Rating */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 18, padding: 16, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name="Rina P" size={40} bg={b.deep} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>Rina P.</div>
              <div style={{ fontSize: 11, color: '#5A6878' }}>{t.rate_rider}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }}>
            {[1,2,3,4,5].map((i) => (
              <Icon.star key={i} s={32} fill={i <= 5 ? '#F59E0B' : '#E2E7ED'} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, height: 52, borderRadius: 14, border: '1.5px solid #E2E7ED', background: '#fff', color: '#5A6878', fontWeight: 700, fontSize: 14 }}>{t.detail}</button>
          <button style={{ flex: 2, height: 52, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, color: '#fff', fontWeight: 800, fontSize: 14, boxShadow: `0 8px 20px ${b.primary}55` }}>Lanjut cari order →</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// A6 — RIWAYAT (history)
// ─────────────────────────────────────────────
function A6Riwayat({ tweaks }) {
  const { brandKey, lang } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  const trips = [
    { day: 'Hari ini · Kamis 15 Mei', items: [
      { time: '13:42', from: 'Pacific Place', to: 'Plaza Indonesia', fare: 69200, type: 'ride', status: 'done', dist: '8.4 km' },
      { time: '11:28', from: 'Senayan City', to: 'Kuningan City', fare: 42000, type: 'ride', status: 'done', dist: '5.1 km' },
      { time: '09:15', from: 'Tebet Eco Park', to: 'CGK T3', fare: 285000, type: 'airport', status: 'done', dist: '32 km' },
    ]},
    { day: 'Kemarin · Rabu 14 Mei', items: [
      { time: '18:05', from: 'Grand Indonesia', to: 'Pondok Indah', fare: 78500, type: 'ride', status: 'done', dist: '12 km' },
      { time: '14:30', from: 'Menteng Trenggulun', to: '-', fare: 0, type: 'ride', status: 'cancel', dist: '-' },
      { time: '10:00', from: 'Rental Harian — Ny. Putri', to: '8 jam', fare: 650000, type: 'rental', status: 'done', dist: '—' },
    ]},
  ];

  const typeMeta = {
    ride: { icon: Icon.car, bg: b.surface, fg: b.primary, label: t.mode_ride },
    rental: { icon: Icon.calendar, bg: '#FFF4D6', fg: '#B47E00', label: t.mode_rental },
    airport: { icon: Icon.plane, bg: '#E3F0FA', fg: b.deep, label: t.mode_airport },
  };

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F8FB', position: 'relative' }}>
      <div style={{ padding: '60px 18px 110px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.02em' }}>{t.riwayat}</div>
            <div style={{ fontSize: 12, color: '#5A6878', marginTop: 2 }}>32 trip bulan ini · Rp 4.215.000</div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-card)' }}>
            <Icon.filter s={20} c={b.primary} w={2.2} />
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16 }} className="seva-scroll">
          {['Semua', t.mode_ride, t.mode_rental, t.mode_airport, t.cancelled].map((c, i) => (
            <div key={c} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: 999, background: i === 0 ? b.primary : '#fff', color: i === 0 ? '#fff' : '#5A6878', fontSize: 12, fontWeight: 700, boxShadow: i === 0 ? 'none' : 'var(--shadow-card)' }}>
              {c}
            </div>
          ))}
        </div>

        {trips.map((g) => (
          <div key={g.day} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#8A95A3', letterSpacing: '0.04em', marginBottom: 8, paddingLeft: 4, textTransform: 'uppercase' }}>{g.day}</div>
            <div style={{ background: '#fff', borderRadius: 18, padding: 4, boxShadow: 'var(--shadow-card)' }}>
              {g.items.map((it, i) => {
                const m = typeMeta[it.type];
                const cancelled = it.status === 'cancel';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderBottom: i < g.items.length - 1 ? '1px solid #F1F4F7' : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: cancelled ? '#FEE2E2' : m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {cancelled ? <Icon.close s={20} c="#E5484D" w={2.4} /> : <m.icon s={20} c={m.fg} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.from}{!cancelled && it.to !== '—' && it.to !== '-' ? ` → ${it.to}` : ''}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A6878', marginTop: 1 }}>
                        <span>{it.time}</span>
                        {it.dist !== '-' && it.dist !== '—' && (<><span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C2CAD3' }} /><span>{it.dist}</span></>)}
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#C2CAD3' }} />
                        <span style={{ color: m.fg, fontWeight: 700 }}>{m.label}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {cancelled ? (
                        <div style={{ fontSize: 11, color: '#E5484D', fontWeight: 700 }}>{t.cancelled}</div>
                      ) : (
                        <div className="seva-num" style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24' }}>{Rp(it.fare, lang)}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ABottomNav active="riwayat" primary={b.primary} lang={lang} />
    </div>
  );
}

// ─────────────────────────────────────────────
// A7 — EARNINGS
// ─────────────────────────────────────────────
function A7Earnings({ tweaks }) {
  const { brandKey, lang, surge } = tweaks;
  const b = BRAND[brandKey];
  const t = T(lang);

  const total = surge ? 1842000 : 1428000;
  const target = 2000000;
  const pct = Math.min(100, Math.round(total / target * 100));

  const bars = [
    { d: 'Sen', v: 180 }, { d: 'Sel', v: 210 }, { d: 'Rab', v: 320 },
    { d: 'Kam', v: 285 }, { d: 'Jum', v: 412 }, { d: 'Sab', v: 240 }, { d: 'Min', v: 0 },
  ];
  const maxBar = Math.max(...bars.map(b => b.v));

  return (
    <div className="seva-font seva-scroll" style={{ height: FRAME_H, overflow: 'auto', background: '#F4F8FB', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 260, background: `linear-gradient(180deg, ${b.surface} 0%, #F4F8FB 100%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: '60px 18px 110px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.02em' }}>{t.earnings}</div>
            <div style={{ fontSize: 12, color: '#5A6878', marginTop: 2 }}>Senin – Minggu</div>
          </div>
          <button style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-card)' }}>
            <Icon.wallet s={20} c={b.primary} w={2.2} />
          </button>
        </div>

        {/* Period segmented */}
        <div style={{ marginTop: 14, background: '#fff', padding: 4, borderRadius: 12, display: 'flex', boxShadow: 'var(--shadow-card)' }}>
          {[t.today, t.week, t.month].map((p, i) => (
            <div key={p} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 9, background: i === 1 ? b.primary : 'transparent', color: i === 1 ? '#fff' : '#5A6878', fontSize: 12, fontWeight: 700 }}>{p}</div>
          ))}
        </div>

        {/* Hero total */}
        <div style={{ marginTop: 14, background: `linear-gradient(135deg, ${b.primary}, ${b.deep})`, borderRadius: 22, padding: 20, position: 'relative', overflow: 'hidden', boxShadow: `0 12px 28px ${b.primary}30` }}>
          <svg style={{ position: 'absolute', right: -30, top: -30, opacity: 0.15 }} width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="78" fill="none" stroke="#fff" strokeWidth="1.5" /><circle cx="80" cy="80" r="50" fill="none" stroke="#fff" strokeWidth="1.5" /></svg>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Pendapatan {t.week.toLowerCase()}</div>
          <div className="seva-num" style={{ fontSize: 36, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginTop: 4, lineHeight: 1.1 }}>{Rp(total, lang)}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{t.weekly_target}: {Rp(target, lang)}</div>
            <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>{pct}%</div>
          </div>
          <div style={{ marginTop: 6, height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: '#fff', borderRadius: 3 }} />
          </div>
        </div>

        {/* Chart */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 18, padding: 16, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0E1A24' }}>Per hari (ribu)</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#1FB371', fontWeight: 700 }}><Icon.trend s={12} c="#1FB371" w={2.5} /> +18%</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 130, paddingBottom: 18, position: 'relative' }}>
            {bars.map((bar, i) => {
              const h = bar.v === 0 ? 6 : (bar.v / maxBar) * 110;
              const today = i === 4;
              return (
                <div key={bar.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                  {today && (
                    <div className="seva-num" style={{ position: 'absolute', top: -2, fontSize: 10, fontWeight: 800, color: b.primary }}>412k</div>
                  )}
                  <div style={{ width: '100%', height: h, borderRadius: 6, background: today ? `linear-gradient(180deg, ${b.primary}, ${b.deep})` : bar.v === 0 ? '#E2E7ED' : `${b.primary}25` }} />
                  <div style={{ fontSize: 10, color: today ? b.primary : '#8A95A3', fontWeight: today ? 800 : 600, position: 'absolute', bottom: 0 }}>{bar.d}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown by type */}
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 18, padding: 16, boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0E1A24', marginBottom: 12 }}>Per jenis order</div>
          {[
            { label: t.mode_ride, value: 842000, n: 24, c: b.primary, w: 58 },
            { label: t.mode_rental, value: 650000, n: 1, c: '#B47E00', w: 32 },
            { label: t.mode_airport, value: 350000, n: 2, c: b.deep, w: 10 },
          ].map((r) => (
            <div key={r.label} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>{r.label} <span style={{ fontSize: 11, color: '#8A95A3', fontWeight: 500 }}>· {r.n}</span></span>
                <span className="seva-num" style={{ fontSize: 13, fontWeight: 700, color: '#0E1A24' }}>{Rp(r.value, lang)}</span>
              </div>
              <div style={{ height: 6, background: '#F1F4F7', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${r.w}%`, background: r.c, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ABottomNav active="earnings" primary={b.primary} lang={lang} />
    </div>
  );
}

Object.assign(window, { A5Complete, A6Riwayat, A7Earnings });
