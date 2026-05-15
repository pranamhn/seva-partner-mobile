// app-print.jsx — print-specific layout (no canvas, static grid, page breaks)

const PRINT_TWEAKS = {
  brandKey: "cyan",
  status: "online",
  lang: "id",
  surge: false,
};

function PrintFrame({ Component, label }) {
  return (
    <div className="print-artboard">
      <div className="print-label">{label}</div>
      <div className="print-frame-wrap">
        <IOSDevice width={FRAME_W} height={FRAME_H} dark={false}>
          <Component tweaks={PRINT_TWEAKS} />
        </IOSDevice>
      </div>
    </div>
  );
}

function PrintApp() {
  const variationA = [
    { id: 'a1', label: 'A1 · Home', C: A1Home },
    { id: 'a2', label: 'A2 · Order Masuk', C: A2Incoming },
    { id: 'a3', label: 'A3 · Navigasi Jemput', C: A3Pickup },
    { id: 'a4', label: 'A4 · Sedang Trip', C: A4InTrip },
    { id: 'a5', label: 'A5 · Trip Selesai', C: A5Complete },
    { id: 'a6', label: 'A6 · Riwayat', C: A6Riwayat },
    { id: 'a7', label: 'A7 · Pendapatan', C: A7Earnings },
  ];
  const variationB = [
    { id: 'b1', label: 'B1 · Home', C: B1Home },
    { id: 'b2', label: 'B2 · Order Masuk', C: B2Incoming },
    { id: 'b3', label: 'B3 · Navigasi Jemput', C: B3Pickup },
    { id: 'b4', label: 'B4 · Sedang Trip', C: B4InTrip },
    { id: 'b5', label: 'B5 · Trip Selesai', C: B5Complete },
    { id: 'b6', label: 'B6 · Riwayat', C: B6Riwayat },
    { id: 'b7', label: 'B7 · Pendapatan', C: B7Earnings },
  ];

  return (
    <div className="print-root">
      {/* Cover page */}
      <section className="print-page print-cover">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <SevaLogo color="#00A0CC" size={28} />
          <span style={{ padding: '4px 10px', borderRadius: 999, background: '#0E1A24', color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: '0.06em' }}>DRIVER · RIDE-HAILING</span>
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 800, color: '#0E1A24', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, maxWidth: 800 }}>
          Mode baru di SEVA Partner: driver bisa terima order Ride, Sewa Harian, & Antar Jemput.
        </h1>
        <p style={{ fontSize: 16, color: '#5A6878', marginTop: 16, maxWidth: 700, lineHeight: 1.5 }}>
          2 variasi visual × 7 screens. Home → Order Masuk → Navigasi Jemput → Sedang Trip → Trip Selesai → Riwayat → Pendapatan.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 36, maxWidth: 800 }}>
          {[
            { t: 'Variasi A · SEVA Style', b: 'Ikuti brand SEVA persis — gradient cyan, kartu rounded 18px, friendly. Konsisten dengan aplikasi sewa.', accent: '#00A0CC' },
            { t: 'Variasi B · Driver Punchy', b: 'Header hitam, angka besar (44–52px), sudut 12px. Dibuat untuk baca cepat di siang terik.', accent: '#0E1A24' },
            { t: 'Order types', b: 'Ride (penumpang), Sewa Harian (full day), Antar Jemput (airport/jadwal).', accent: '#5A6878' },
            { t: 'Tweaks live', b: 'Status driver, surge 1.7×, warna brand (Cyan/Ocean/Teal), bahasa ID/EN.', accent: '#5A6878' },
          ].map((d, i) => (
            <div key={i} style={{ padding: 16, background: '#F7FAFC', borderRadius: 12, border: '1px solid #E2E7ED', borderLeft: `4px solid ${d.accent}` }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#0E1A24', marginBottom: 6 }}>{d.t}</div>
              <div style={{ fontSize: 12, color: '#5A6878', lineHeight: 1.5 }}>{d.b}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 30, fontSize: 11, color: '#8A95A3', letterSpacing: '0.04em' }}>
          SEVA PARTNER · DRIVER APP · 15 MEI 2026
        </div>
      </section>

      {/* Variation A pages */}
      <SectionPages
        title="Variasi A · SEVA Style"
        subtitle="Brand-consistent: gradient cyan, kartu lembut, friendly."
        frames={variationA}
      />

      {/* Variation B pages */}
      <SectionPages
        title="Variasi B · Driver Punchy"
        subtitle="High-contrast: header hitam, angka besar, info-dense."
        frames={variationB}
      />
    </div>
  );
}

// Render 4 frames per landscape page
function SectionPages({ title, subtitle, frames }) {
  const pages = [];
  for (let i = 0; i < frames.length; i += 4) {
    pages.push(frames.slice(i, i + 4));
  }
  return (
    <React.Fragment>
      {pages.map((page, pageIdx) => (
        <section key={pageIdx} className="print-page print-grid-page">
          <header className="print-page-header">
            <div>
              <div className="print-section-eyebrow">SEVA Partner · Driver App</div>
              <h2 className="print-section-title">{title}</h2>
              <div className="print-section-sub">{subtitle}</div>
            </div>
            <div className="print-page-num">Hal. {pageIdx + 1} / {pages.length}</div>
          </header>
          <div className="print-grid">
            {page.map((f) => (
              <PrintFrame key={f.id} Component={f.C} label={f.label} />
            ))}
            {/* fill empty cells so layout stays consistent */}
            {Array.from({ length: 4 - page.length }).map((_, i) => <div key={`pad-${i}`} />)}
          </div>
        </section>
      ))}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintApp />);

// Auto-print once fonts loaded and a small settle delay
(async () => {
  try { await document.fonts.ready; } catch {}
  setTimeout(() => window.print(), 800);
})();
