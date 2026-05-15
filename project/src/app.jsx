// app.jsx — SEVA Partner Driver: Canvas + Tweaks wiring

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "brandKey": "cyan",
  "status": "online",
  "lang": "id",
  "surge": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const b = BRAND[t.brandKey] || BRAND.cyan;

  const wrap = (Component) => (
    <IOSDevice width={FRAME_W} height={FRAME_H} dark={false}>
      <Component tweaks={t} />
    </IOSDevice>
  );

  return (
    <React.Fragment>
      <DesignCanvas
        title="SEVA Partner — Driver Ride-Hailing"
        subtitle="Driver app yang bisa terima orderan · 2 variasi, 7 screens masing-masing"
      >
        <DCSection
          id="meta"
          title="Catatan desain"
          subtitle="Aplikasi driver SEVA untuk menerima order Ride / Sewa Harian / Antar Jemput. Mode baru di samping aplikasi sewa yang sudah ada."
        >
          <DCArtboard id="brief" label="Brief & decisions" width={620} height={420}>
            <BriefCard tweaks={t} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="variation-a"
          title="Variasi A · SEVA Style"
          subtitle="Ikuti referensi: gradient cyan, kartu lembut, friendly. Cocok untuk konsistensi brand dengan aplikasi sewa."
        >
          <DCArtboard id="a1" label="A1 · Home" width={FRAME_W} height={FRAME_H}>{wrap(A1Home)}</DCArtboard>
          <DCArtboard id="a2" label="A2 · Order Masuk" width={FRAME_W} height={FRAME_H}>{wrap(A2Incoming)}</DCArtboard>
          <DCArtboard id="a3" label="A3 · Navigasi Jemput" width={FRAME_W} height={FRAME_H}>{wrap(A3Pickup)}</DCArtboard>
          <DCArtboard id="a4" label="A4 · Sedang Trip" width={FRAME_W} height={FRAME_H}>{wrap(A4InTrip)}</DCArtboard>
          <DCArtboard id="a5" label="A5 · Trip Selesai" width={FRAME_W} height={FRAME_H}>{wrap(A5Complete)}</DCArtboard>
          <DCArtboard id="a6" label="A6 · Riwayat" width={FRAME_W} height={FRAME_H}>{wrap(A6Riwayat)}</DCArtboard>
          <DCArtboard id="a7" label="A7 · Pendapatan" width={FRAME_W} height={FRAME_H}>{wrap(A7Earnings)}</DCArtboard>
        </DCSection>

        <DCSection
          id="variation-b"
          title="Variasi B · Driver Punchy"
          subtitle="Kontras tinggi, header hitam, angka besar — dibuat untuk driver yang baca cepat di siang terik."
        >
          <DCArtboard id="b1" label="B1 · Home" width={FRAME_W} height={FRAME_H}>{wrap(B1Home)}</DCArtboard>
          <DCArtboard id="b2" label="B2 · Order Masuk" width={FRAME_W} height={FRAME_H}>{wrap(B2Incoming)}</DCArtboard>
          <DCArtboard id="b3" label="B3 · Navigasi Jemput" width={FRAME_W} height={FRAME_H}>{wrap(B3Pickup)}</DCArtboard>
          <DCArtboard id="b4" label="B4 · Sedang Trip" width={FRAME_W} height={FRAME_H}>{wrap(B4InTrip)}</DCArtboard>
          <DCArtboard id="b5" label="B5 · Trip Selesai" width={FRAME_W} height={FRAME_H}>{wrap(B5Complete)}</DCArtboard>
          <DCArtboard id="b6" label="B6 · Riwayat" width={FRAME_W} height={FRAME_H}>{wrap(B6Riwayat)}</DCArtboard>
          <DCArtboard id="b7" label="B7 · Pendapatan" width={FRAME_W} height={FRAME_H}>{wrap(B7Earnings)}</DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="SEVA Driver Tweaks">
        <TweakSection label="Driver" />
        <TweakRadio
          label="Status"
          value={t.status}
          options={[
            { value: 'online', label: 'Online' },
            { value: 'busy', label: 'Busy' },
            { value: 'offline', label: 'Offline' },
          ]}
          onChange={(v) => setTweak('status', v)}
        />
        <TweakToggle
          label="Tarif Surge aktif"
          value={t.surge}
          onChange={(v) => setTweak('surge', v)}
        />

        <TweakSection label="Brand" />
        <TweakColor
          label="Warna utama"
          value={[b.primary, b.deep, b.light]}
          options={[
            [BRAND.cyan.primary, BRAND.cyan.deep, BRAND.cyan.light],
            [BRAND.ocean.primary, BRAND.ocean.deep, BRAND.ocean.light],
            [BRAND.teal.primary, BRAND.teal.deep, BRAND.teal.light],
          ]}
          onChange={(palette) => {
            const key = Object.keys(BRAND).find(k => BRAND[k].primary === palette[0]) || 'cyan';
            setTweak('brandKey', key);
          }}
        />

        <TweakSection label="Lokal" />
        <TweakRadio
          label="Bahasa"
          value={t.lang}
          options={[
            { value: 'id', label: 'Bahasa' },
            { value: 'en', label: 'English' },
          ]}
          onChange={(v) => setTweak('lang', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

// ─────────────────────────────────────────────
// Brief / decisions card — sits at top of canvas
// ─────────────────────────────────────────────
function BriefCard({ tweaks }) {
  const b = BRAND[tweaks.brandKey];
  return (
    <div className="seva-font" style={{ width: '100%', height: '100%', background: '#fff', borderRadius: 14, padding: 24, boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <SevaLogo color={b.primary} size={22} />
        <span style={{ padding: '2px 8px', borderRadius: 999, background: '#0E1A24', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em' }}>DRIVER · RIDE-HAILING</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
        Mode baru di SEVA Partner: driver bisa terima order Ride, Sewa Harian, & Antar Jemput.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Decision title="Posisi di app" body="Mode baru di samping ‘Sewa’ — driver toggle di home. UI tetap SEVA cyan, layout reuse pattern dari aplikasi sewa." />
        <Decision title="Order types" body="Ride (penumpang), Sewa Harian (full day), Antar Jemput (airport/jadwal)." />
        <Decision title="Variasi A" body="SEVA Style — ikuti referensi: gradient cyan, kartu rounded 18px, friendly." />
        <Decision title="Variasi B" body="Driver Punchy — header hitam, angka besar, sudut 12px. Lebih cepat dibaca di lapangan." />
      </div>
      <div style={{ padding: 12, background: '#F4F8FB', borderRadius: 10, fontSize: 12, color: '#5A6878', lineHeight: 1.5 }}>
        <span style={{ color: '#0E1A24', fontWeight: 700 }}>Tweaks ↗</span> ubah Status (Online/Busy/Offline), aktifkan Surge, ganti warna, atau switch bahasa untuk lihat dampak ke semua frame sekaligus.
      </div>
    </div>
  );
}

function Decision({ title, body }) {
  return (
    <div style={{ padding: 12, background: '#F7FAFC', borderRadius: 10, border: '1px solid #E2E7ED' }}>
      <div style={{ fontSize: 10, color: '#8A95A3', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ fontSize: 12, color: '#0E1A24', marginTop: 4, lineHeight: 1.4, fontWeight: 500 }}>{body}</div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
