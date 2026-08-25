import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ContohUi.css';
import {
  Sparkles,
  Layers,
  Terminal,
  Palette,
  Eye,
  Sliders,
  Play,
  RotateCcw,
  Move,
  MousePointerClick,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  Flame,
  Shield,
  Cpu,
  Zap,
  Globe,
  Star,
  ExternalLink,
  Code2
} from 'lucide-react';

export default function ContohUi() {
  const [activeTab, setActiveTab] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  // Framer Motion Interactive Sandbox State
  const [springConfig, setSpringConfig] = useState({ stiffness: 200, damping: 15, mass: 1 });
  const [boxScale, setBoxScale] = useState(1);
  const [boxRotate, setBoxRotate] = useState(0);
  const [layoutTab, setLayoutTab] = useState('react');
  const [count, setCount] = useState(0);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems = [
    { id: 'all', label: 'Semua Skill & Demo', icon: Eye },
    { id: 'framer', label: 'Framer Motion Lab', icon: Zap },
    { id: 'gpt-taste', label: 'High-End & GPT-Taste', icon: Sparkles },
    { id: 'brutalist', label: 'Industrial Brutalist', icon: Terminal },
    { id: 'minimalist', label: 'Minimalist UI', icon: Layers },
    { id: 'brandkit', label: 'Brandkit & Impeccable', icon: Palette },
  ];

  return (
    <div className="contoh-container">
      {/* Top Navigation Bar */}
      <header className="contoh-header">
        <div className="header-brand">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="back-home-btn"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Home</span>
          </a>
          <div className="header-title-group">
            <span className="badge-pulse">14 Skills + Framer Motion</span>
            <h1 className="header-title">UI & Motion Showcase Studio</h1>
            <p className="header-subtitle">
              Demonstrasi interaktif seluruh skill desain yang terpasang dan implementasi lengkap <code>framer-motion</code>.
            </p>
          </div>
        </div>

        {/* Dynamic Category Pill Tabs */}
        <div className="tab-pill-bar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`tab-pill-btn ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="tab-pill-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="tab-pill-content">
                  <Icon size={16} />
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="contoh-main">
        {/* ============================================================ */}
        {/* SECTION 1: FRAMER MOTION INTERACTIVE LABORATORY */}
        {/* ============================================================ */}
        {(activeTab === 'all' || activeTab === 'framer') && (
          <section className="showcase-section">
            <div className="section-head">
              <div className="section-title-wrap">
                <span className="section-tag section-tag-purple">
                  <Zap size={14} /> Core Motion Library
                </span>
                <h2>1. Framer Motion Live Interactive Laboratory</h2>
                <p>
                  Eksplorasi gesture interaktif (drag, hover, tap), layout animation (<code>layoutId</code>), dan spring physics secara real-time.
                </p>
              </div>
            </div>

            <div className="framer-grid">
              {/* Interactive Sandbox Card */}
              <div className="card glass-card">
                <div className="card-header">
                  <div className="card-badge">Gesture & Spring Physics</div>
                  <h3>Drag, Rotate & Spring Tuning</h3>
                  <p>Tarik kotak ini ke mana saja, atau atur slider physics di bawah.</p>
                </div>

                <div className="sandbox-canvas">
                  <motion.div
                    drag
                    dragConstraints={{ left: -120, right: 120, top: -70, bottom: 70 }}
                    dragElastic={0.2}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92, cursor: 'grabbing' }}
                    animate={{
                      scale: boxScale,
                      rotate: boxRotate,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: springConfig.stiffness,
                      damping: springConfig.damping,
                      mass: springConfig.mass,
                    }}
                    className="interactive-box"
                  >
                    <Move size={24} />
                    <span>Drag Me!</span>
                  </motion.div>
                </div>

                <div className="controls-panel">
                  <div className="control-group">
                    <label>
                      <span>Stiffness: <b>{springConfig.stiffness}</b></span>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        value={springConfig.stiffness}
                        onChange={(e) =>
                          setSpringConfig({ ...springConfig, stiffness: Number(e.target.value) })
                        }
                      />
                    </label>
                  </div>
                  <div className="control-group">
                    <label>
                      <span>Damping: <b>{springConfig.damping}</b></span>
                      <input
                        type="range"
                        min="5"
                        max="40"
                        value={springConfig.damping}
                        onChange={(e) =>
                          setSpringConfig({ ...springConfig, damping: Number(e.target.value) })
                        }
                      />
                    </label>
                  </div>
                  <div className="button-group-row">
                    <button
                      className="btn-control"
                      onClick={() => setBoxRotate((r) => r + 45)}
                    >
                      <RotateCcw size={14} /> +45° Rotate
                    </button>
                    <button
                      className="btn-control"
                      onClick={() => setBoxScale((s) => (s === 1 ? 1.25 : 1))}
                    >
                      <Sliders size={14} /> Toggle Scale
                    </button>
                  </div>
                </div>

                <div className="code-snippet-box">
                  <button
                    className="btn-copy-code"
                    onClick={() =>
                      copyToClipboard(
`<motion.div
  drag
  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: ${springConfig.stiffness}, damping: ${springConfig.damping} }}
>
  Drag Me!
</motion.div>`,
                        'code-drag'
                      )
                    }
                  >
                    {copiedCode === 'code-drag' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedCode === 'code-drag' ? 'Copied' : 'Salin Kode'}</span>
                  </button>
                  <pre>
                    <code>{`<motion.div drag whileHover={{ scale: 1.08 }} transition={{ type: "spring" }} />`}</code>
                  </pre>
                </div>
              </div>

              {/* LayoutId Morphing Tabs */}
              <div className="card glass-card">
                <div className="card-header">
                  <div className="card-badge">Morphing Animation</div>
                  <h3>Smooth Tab Transition (layoutId)</h3>
                  <p>Transisi latar belakang tab yang cair dan natural otomatis dengan <code>layoutId</code>.</p>
                </div>

                <div className="morph-tab-container">
                  <div className="morph-tab-nav">
                    {['react', 'motion', 'vite', 'tailwind'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setLayoutTab(tab)}
                        className={`morph-tab-btn ${layoutTab === tab ? 'active' : ''}`}
                      >
                        {layoutTab === tab && (
                          <motion.div
                            layoutId="activeMorphTab"
                            className="morph-tab-bg"
                            transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                          />
                        )}
                        <span className="morph-tab-text">{tab.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={layoutTab}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="morph-tab-card"
                    >
                      <h4>Fitur Tab: {layoutTab.toUpperCase()}</h4>
                      <p>
                        {layoutTab === 'react' && 'React 19 dengan Server Components, compiler baru, dan manajemen state super cepat.'}
                        {layoutTab === 'motion' && 'Framer Motion memungkinkan animasi declarative, gesture drag, dan layout transitions.'}
                        {layoutTab === 'vite' && 'Vite 8 menyajikan Hot Module Replacement (HMR) instan dan build bundle yang optimal.'}
                        {layoutTab === 'tailwind' && 'Styling konsisten dengan utility-first tokens dan class-based atomic design.'}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="stagger-preview">
                  <div className="card-badge">Stagger Effect</div>
                  <h4>Daftar Animasi Bertingkat (Staggered Children)</h4>
                  <div className="stagger-list">
                    {['1. Opacity Transition', '2. Scale & Spring Pop', '3. Scroll Trigger Viewport'].map((item, idx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15, duration: 0.4 }}
                        className="stagger-item"
                      >
                        <CheckCircle2 size={16} className="text-purple" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTION 2: HIGH-END VISUAL DESIGN & GPT-TASTE */}
        {/* ============================================================ */}
        {(activeTab === 'all' || activeTab === 'gpt-taste') && (
          <section className="showcase-section">
            <div className="section-head">
              <div className="section-title-wrap">
                <span className="section-tag section-tag-cyan">
                  <Sparkles size={14} /> Skills: high-end-visual-design & gpt-taste
                </span>
                <h2>2. High-End Visual & Bento Grid Aesthetic</h2>
                <p>
                  Desain bento asimetris dengan glassmorphism halus, ambient glow, typography editorial lebar, dan mikro-interaksi premium.
                </p>
              </div>
            </div>

            <div className="bento-grid">
              {/* Large Bento Card */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bento-card bento-large glass-card"
              >
                <div className="bento-glow-blob glow-blue"></div>
                <div className="bento-content">
                  <div className="bento-pill">Agency Quality System</div>
                  <h3 className="bento-title">Ultra Modern Dark Aesthetic</h3>
                  <p className="bento-desc">
                    Menggabungkan palet HSL gelap dengan border luminous 1px, typography sans yang tajam, dan kontras visual yang presisi tanpa kesan template murahan.
                  </p>
                  <div className="bento-metric-row">
                    <div className="metric-box">
                      <span className="metric-val">60+ FPS</span>
                      <span className="metric-lbl">Hardware Motion</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">100%</span>
                      <span className="metric-lbl">Anti-Slop Standard</span>
                    </div>
                    <div className="metric-box">
                      <span className="metric-val">&lt; 0.1s</span>
                      <span className="metric-lbl">Interaction Latency</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bento-card glass-card"
              >
                <div className="bento-glow-blob glow-purple"></div>
                <div className="bento-content">
                  <div className="bento-icon-wrapper">
                    <Flame size={20} />
                  </div>
                  <h3>Editorial Typography</h3>
                  <p>Hirarki huruf berbobot tinggi, letter-spacing terkalibrasi (-0.03em), dan kontras teks yang nyaman di mata.</p>
                </div>
              </motion.div>

              {/* Bento Card 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bento-card glass-card"
              >
                <div className="bento-glow-blob glow-emerald"></div>
                <div className="bento-content">
                  <div className="bento-icon-wrapper">
                    <Shield size={20} />
                  </div>
                  <h3>Glass & Depth Tokens</h3>
                  <p>Lapisan backdrop-filter blur 16px dengan refleksi border gradasi halus pada sudut kartu.</p>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTION 3: INDUSTRIAL BRUTALIST UI */}
        {/* ============================================================ */}
        {(activeTab === 'all' || activeTab === 'brutalist') && (
          <section className="showcase-section">
            <div className="section-head">
              <div className="section-title-wrap">
                <span className="section-tag section-tag-orange">
                  <Terminal size={14} /> Skill: industrial-brutalist-ui
                </span>
                <h2>3. Industrial Brutalist & Engineering Blueprint UI</h2>
                <p>
                  Gaya raw mechanical interface dengan rigid grid lines, monospace telemetry, crosshair markers, dan badge status berdaya tinggi.
                </p>
              </div>
            </div>

            <div className="brutalist-wrapper">
              <div className="brutalist-card">
                <div className="brutalist-header">
                  <div className="brutalist-crosshair">+</div>
                  <span className="brutalist-mono">SYS://NODE-042 // DECLASSIFIED BLUEPRINT</span>
                  <div className="brutalist-status-badge">ONLINE: ACTIVE</div>
                </div>

                <div className="brutalist-grid-body">
                  <div className="brutalist-col">
                    <span className="brutalist-meta-label">TELEMETRY_CODE</span>
                    <div className="brutalist-big-text">BRTL-99</div>
                    <p className="brutalist-caption">
                      Arsitektur grid modular presisi tinggi dengan garis pembatas 1px solid, font monospaced tebal, dan kontras mekanis tajam.
                    </p>
                  </div>

                  <div className="brutalist-col border-left">
                    <span className="brutalist-meta-label">SPECIFICATIONS</span>
                    <ul className="brutalist-spec-list">
                      <li><span>[GRID]</span> 12-COL FIXED TICK-GRID</li>
                      <li><span>[FONT]</span> JETBRAINS MONO / IBM PLEX</li>
                      <li><span>[COLOR]</span> MONO-900 / HAZARD ORANGE</li>
                      <li><span>[STATE]</span> HARDWARE ACCELERATED</li>
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: '#ff5500', color: '#000' }}
                      whileTap={{ scale: 0.98 }}
                      className="brutalist-action-btn"
                    >
                      EXECUTE_PROTOCOL.SH ↗
                    </motion.button>
                  </div>
                </div>

                <div className="brutalist-footer">
                  <div className="brutalist-crosshair">+</div>
                  <span className="brutalist-mono">SECURITY_HASH: 0x9f88c29 // LATENCY: 2.4MS</span>
                  <div className="brutalist-crosshair">+</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTION 4: MINIMALIST UI */}
        {/* ============================================================ */}
        {(activeTab === 'all' || activeTab === 'minimalist') && (
          <section className="showcase-section">
            <div className="section-head">
              <div className="section-title-wrap">
                <span className="section-tag section-tag-zinc">
                  <Layers size={14} /> Skill: minimalist-ui & design-taste-frontend
                </span>
                <h2>4. Clean Editorial Minimalist UI</h2>
                <p>
                  Palet monochrome hangat, tipografi santai namun tegas, flat bento, dan whitespace yang lega untuk portofolio elegan.
                </p>
              </div>
            </div>

            <div className="minimal-grid">
              <div className="minimal-card">
                <span className="minimal-label">Case Study 01</span>
                <h3 className="minimal-title">Fintech Dashboard Experience</h3>
                <p className="minimal-desc">
                  Membangun antarmuka transaksi tanpa distraksi berlebihan. Mengutamakan hierarki informasi, ritme vertikal, dan interaksi yang menenangkan.
                </p>
                <div className="minimal-footer-tags">
                  <span className="minimal-tag">React 19</span>
                  <span className="minimal-tag">Clean Architecture</span>
                  <span className="minimal-tag">Accessible</span>
                </div>
              </div>

              <div className="minimal-card">
                <span className="minimal-label">Case Study 02</span>
                <h3 className="minimal-title">Design System Foundation</h3>
                <p className="minimal-desc">
                  Sistem token semantik untuk konsistensi warna, spacing berskala 4px, dan komponen yang modular serta scalable.
                </p>
                <div className="minimal-footer-tags">
                  <span className="minimal-tag">Tokens</span>
                  <span className="minimal-tag">Atomic UI</span>
                  <span className="minimal-tag">Design Ops</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SECTION 5: BRANDKIT & IMPECCABLE */}
        {/* ============================================================ */}
        {(activeTab === 'all' || activeTab === 'brandkit') && (
          <section className="showcase-section">
            <div className="section-head">
              <div className="section-title-wrap">
                <span className="section-tag section-tag-emerald">
                  <Palette size={14} /> Skills: brandkit & impeccable
                </span>
                <h2>5. Brand System & Impeccable Polish</h2>
                <p>
                  Sistem token warna terkalibrasi, kontras aksesibilitas, dan mikro-interaksi tombol yang halus.
                </p>
              </div>
            </div>

            <div className="brandkit-grid">
              {/* Palette Card */}
              <div className="card glass-card">
                <div className="card-badge">Color System</div>
                <h3>Palet Warna Terkalibrasi</h3>
                <p>Kombinasi warna primer, aksen, dan dark neutral yang harmonis.</p>
                <div className="color-swatches">
                  <div className="swatch" style={{ background: '#6366f1' }}>
                    <span>#6366F1</span>
                    <small>Indigo Primary</small>
                  </div>
                  <div className="swatch" style={{ background: '#38bdf8' }}>
                    <span>#38BDF8</span>
                    <small>Sky Accent</small>
                  </div>
                  <div className="swatch" style={{ background: '#10b981' }}>
                    <span>#10B981</span>
                    <small>Emerald Success</small>
                  </div>
                  <div className="swatch" style={{ background: '#ff5500' }}>
                    <span>#FF5500</span>
                    <small>Hazard Amber</small>
                  </div>
                </div>
              </div>

              {/* Interactive Polish Button Sandbox */}
              <div className="card glass-card">
                <div className="card-badge">Micro-Interactions</div>
                <h3>Impeccable Button States</h3>
                <p>Uji tombol dengan feedback hover glow dan spring tactile feedback.</p>
                <div className="button-sandbox-row">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-glow-primary"
                  >
                    Primary Glow Action
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: '#38bdf8', color: '#38bdf8' }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline-interactive"
                  >
                    Secondary Action
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setCount((c) => c + 1)}
                    className="btn-pill-counter"
                  >
                    <MousePointerClick size={16} />
                    <span>Clicks: {count}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer Info */}
      <footer className="contoh-footer">
        <p>
          Halaman ini dibuat sebagai live visual studio untuk seluruh 14 skill kustom & Framer Motion. Anda dapat menggunakan komponen dan pola ini di seluruh portofolio Anda.
        </p>
      </footer>
    </div>
  );
}
