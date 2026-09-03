import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calculator,
  CheckCircle2,
  Smartphone,
  Globe,
  LayoutGrid,
  Zap,
  Clock,
  Sparkles,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Bot,
  BarChart3,
  Search,
  Languages,
  Send,
  ArrowUpRight,
  Check,
  AlertCircle
} from 'lucide-react';

export default function CostCalculator() {
  const { lang, t } = useLanguage();
  const [platform, setPlatform] = useState('landing');
  const [scope, setScope] = useState('simple');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [speed, setSpeed] = useState('standard');
  const [maxLimitWarning, setMaxLimitWarning] = useState(false);
  const [customFeatureText, setCustomFeatureText] = useState('');

  useEffect(() => {
    const handleServiceSelect = (e) => {
      const { serviceId } = e.detail;
      if (serviceId === 'mobile') {
        setPlatform('mobile');
        setScope('simple');
        setSelectedFeatures([]);
      } else if (serviceId === 'web') {
        setPlatform('web-app');
        setScope('simple');
        setSelectedFeatures([]);
      } else if (serviceId === 'backend') {
        setPlatform('web-app');
        setScope('simple');
        setSelectedFeatures(['auth']);
      } else if (serviceId === 'deploy') {
        setPlatform('landing');
        setScope('simple');
        setSelectedFeatures(['seo']);
      } else if (serviceId === 'maintenance') {
        setPlatform('landing');
        setScope('simple');
        setSelectedFeatures([]);
      } else if (serviceId === 'ai-automation') {
        setPlatform('web-app');
        setScope('simple');
        setSelectedFeatures(['ai']);
      }
    };

    window.addEventListener('select-service-platform', handleServiceSelect);
    return () => {
      window.removeEventListener('select-service-platform', handleServiceSelect);
    };
  }, []);

  const platforms = [
    {
      id: 'landing',
      title: 'Modern Landing Page',
      desc: lang === 'ID' ? 'Company profile / showcase produk konversi tinggi' : 'High-converting company profile / product showcase',
      basePrice: 2500000,
      baseDays: 5,
    },
    {
      id: 'web-app',
      title: 'Fullstack Web App',
      desc: lang === 'ID' ? 'Aplikasi web dinamis dengan kustom backend & database' : 'Dynamic web application with custom backend & database',
      basePrice: 5500000,
      baseDays: 14,
    },
    {
      id: 'mobile',
      title: 'Mobile App (iOS & Android)',
      desc: lang === 'ID' ? 'Aplikasi mobile lintas platform native React Native / Flutter' : 'Native-feel cross-platform React Native / Flutter app',
      basePrice: 6500000,
      baseDays: 18,
    },
    {
      id: 'ecosystem',
      title: lang === 'ID' ? 'Ekosistem Digital Lengkap' : 'Complete Digital Ecosystem',
      desc: lang === 'ID' ? 'Web App + Mobile iOS/Android + Admin Dashboard terintegrasi' : 'Web App + Mobile iOS/Android + Admin Dashboard',
      basePrice: 12000000,
      baseDays: 28,
    },
  ];

  const scopes = [
    {
      id: 'simple',
      label: lang === 'ID' ? 'Sederhana / Pemula' : 'Simple / Starter',
      badge: lang === 'ID' ? 'Maks. 3 Modul' : 'Max 3 Modules',
      maxFeatures: 3,
      multiplier: 0.9,
      daysAdd: 0
    },
    {
      id: 'mvp',
      label: lang === 'ID' ? 'MVP / Skala Startup' : 'MVP / Startup Scalable',
      badge: lang === 'ID' ? 'Maks. 6 Modul' : 'Max 6 Modules',
      maxFeatures: 6,
      multiplier: 1.0,
      daysAdd: 4
    },
    {
      id: 'enterprise',
      label: lang === 'ID' ? 'Enterprise / SaaS Kustom' : 'Enterprise / Custom SaaS',
      badge: lang === 'ID' ? 'Bebas Modul (Kustom)' : 'Unlimited Modules (Custom)',
      maxFeatures: 999,
      multiplier: 1.5,
      daysAdd: 10
    },
  ];

  const featuresList = [
    {
      id: 'auth',
      name: lang === 'ID' ? 'Auth & Hak Akses User' : 'Auth & Role Permissions',
      desc: lang === 'ID' ? 'Login Google, JWT, verifikasi email, RBAC Admin/User' : 'Google Login, JWT, Email verification, RBAC Admin/User',
      price: 800000,
      days: 3,
    },
    {
      id: 'payment',
      name: 'Payment Gateway (Midtrans/Xendit/Stripe)',
      desc: lang === 'ID' ? 'Pembayaran langsung QRIS, Virtual Account, e-Wallet & CC' : 'Direct QRIS, Virtual Account, Credit Card & e-Wallet',
      price: 1200000,
      days: 4,
    },
    {
      id: 'chat',
      name: lang === 'ID' ? 'Chat Realtime & Sockets' : 'Realtime Chat & Sockets',
      desc: lang === 'ID' ? 'Sistem pesan instan & push notifications' : 'Instant messaging & push notifications system',
      price: 1500000,
      days: 5,
    },
    {
      id: 'ai',
      name: lang === 'ID' ? 'Integrasi AI / LLM (Gemini & OpenAI)' : 'AI / LLM Integration (Gemini & OpenAI)',
      desc: lang === 'ID' ? 'Chatbot pintar, AI copy generator, prompt pipeline' : 'Smart Chatbot, AI copy generator, prompt pipeline',
      price: 2500000,
      days: 4,
    },
    {
      id: 'dashboard',
      name: lang === 'ID' ? 'Panel Admin & Grafik Analitik' : 'Admin Panel & Analytics Charts',
      desc: lang === 'ID' ? 'Laporan visual data, ekspor Excel/PDF, manajemen CRUD penuh' : 'Visual data reports, Excel/PDF export, full CRUD management',
      price: 1400000,
      days: 5,
    },
    {
      id: 'seo',
      name: 'SEO & Speed Turbo (Score 95+)',
      desc: lang === 'ID' ? 'Optimasi indeks Google & kecepatan loading sub-detik' : 'Google indexing optimization & sub-second loading speed',
      price: 600000,
      days: 2,
    },
    {
      id: 'i18n',
      name: lang === 'ID' ? 'Multi-Bahasa (ID & EN)' : 'Multi-Language (ID & EN)',
      desc: lang === 'ID' ? 'Transisi bahasa lokal terintegrasi yang mulus' : 'Seamless dual-language localization switch',
      price: 500000,
      days: 2,
    },
    {
      id: 'custom',
      name: lang === 'ID' ? 'Custom / Fitur Lainnya (Tulis Sendiri)' : 'Custom / Other Features (Write Yourself)',
      desc: lang === 'ID' ? 'Tuliskan modul, integrasi pihak ketiga, atau kebutuhan khusus Anda' : 'Write down custom modules, third-party integrations, or special specs',
      price: 0,
      days: 0,
    },
  ];

  const speedOptions = [
    { id: 'relaxed', label: lang === 'ID' ? 'Santai (Diskon 5%)' : 'Relaxed (5% Discount)', feeFactor: 0.95, dayFactor: 1.2 },
    { id: 'standard', label: lang === 'ID' ? 'Standar (Direkomendasikan)' : 'Standard (Recommended)', feeFactor: 1.0, dayFactor: 1.0 },
    { id: 'rush', label: lang === 'ID' ? 'Mode RUSH Ekspres (+25%)' : 'Express RUSH Mode (+25%)', feeFactor: 1.25, dayFactor: 0.65 },
  ];

  const handleScopeChange = (newScopeId) => {
    setScope(newScopeId);
    setMaxLimitWarning(false);
    const targetScope = scopes.find((s) => s.id === newScopeId);
    if (targetScope && selectedFeatures.length > targetScope.maxFeatures) {
      setSelectedFeatures(selectedFeatures.slice(0, targetScope.maxFeatures));
    }
  };

  const toggleFeature = (id) => {
    const currentScope = scopes.find((s) => s.id === scope) || scopes[1];
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== id));
      setMaxLimitWarning(false);
    } else {
      if (selectedFeatures.length >= currentScope.maxFeatures) {
        setMaxLimitWarning(true);
        return;
      }
      setMaxLimitWarning(false);
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const calculation = useMemo(() => {
    const selectedPlatformObj = platforms.find((p) => p.id === platform) || platforms[0];
    const selectedScopeObj = scopes.find((s) => s.id === scope) || scopes[1];
    const selectedSpeedObj = speedOptions.find((sp) => sp.id === speed) || speedOptions[1];
    const isEnterprise = scope === 'enterprise';

    let base = selectedPlatformObj.basePrice * selectedScopeObj.multiplier;

    let featuresTotal = 0;
    let featuresDays = 0;
    selectedFeatures.forEach((fid) => {
      const feat = featuresList.find((f) => f.id === fid);
      if (feat) {
        featuresTotal += feat.price;
        featuresDays += feat.days;
      }
    });

    let subtotal = base + featuresTotal;
    let finalPrice = Math.round(subtotal * selectedSpeedObj.feeFactor);
    finalPrice = Math.round(finalPrice / 50000) * 50000;

    let rawDays = (selectedPlatformObj.baseDays + selectedScopeObj.daysAdd + featuresDays) * selectedSpeedObj.dayFactor;
    let totalDays = Math.max(3, Math.round(rawDays));
    let weeks = (totalDays / 7).toFixed(1);

    return {
      platformName: selectedPlatformObj.title,
      scopeName: selectedScopeObj.label,
      featuresCount: selectedFeatures.length,
      isEnterprise,
      finalPrice,
      totalDays,
      weeks,
    };
  }, [platform, scope, selectedFeatures, speed]);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConfettiAndChat = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    const featureNames = selectedFeatures
      .map((fid) => {
        if (fid === 'custom') {
          return `• Custom: ${customFeatureText.trim() || 'Fitur Lainnya'}`;
        }
        const feat = featuresList.find((f) => f.id === fid);
        return feat ? `• ${feat.name}` : '';
      })
      .filter(Boolean)
      .join('%0A');

    const priceText = calculation.isEnterprise
      ? (lang === 'ID' ? 'Custom / Perlu Diskusi Spesifikasi Enterprise' : 'Custom / Enterprise Spec Discussion Required')
      : formatRupiah(calculation.finalPrice);

    const message = lang === 'ID'
      ? `Halo Erza Dev!%0A%0ASaya tertarik membuat aplikasi dengan rincian kalkulator berikut:%0A%0A*Platform*: ${calculation.platformName}%0A*Skala*: ${calculation.scopeName}%0A*Timeline*: ${speed === 'rush' ? 'Mode RUSH (Ekspres)' : speed === 'relaxed' ? 'Santai' : 'Standar'} (~${calculation.totalDays} Hari kerja)%0A%0A*Fitur yang Dipilih* (${calculation.featuresCount} Modul):%0A${featureNames || '- Fitur Standar Dasar'}%0A%0A*Estimasi Biaya*: ${priceText}%0A%0ABisa kita jadwalkan diskusi lebih lanjut mengenai proyek ini? Terima kasih!`
      : `Hello Erza Dev!%0A%0AI am interested in building an application with the following calculator details:%0A%0A*Platform*: ${calculation.platformName}%0A*Scale*: ${calculation.scopeName}%0A*Timeline*: ${speed === 'rush' ? 'RUSH Mode (Express)' : speed === 'relaxed' ? 'Relaxed' : 'Standard'} (~${calculation.totalDays} Working Days)%0A%0A*Selected Features* (${calculation.featuresCount} Modules):%0A${featureNames || '- Standard Basic Features'}%0A%0A*Estimated Cost*: ${priceText}%0A%0ACan we schedule a further discussion about this project? Thank you!`;

    const waUrl = `https://wa.me/6285719416778?text=${message}`;
    window.open(waUrl, '_blank');
  };

  const currentScopeObj = scopes.find((s) => s.id === scope) || scopes[1];

  return (
    <div className="editorial-calc-container">
      {/* Steps & Config Column */}
      <div className="editorial-calc-left">
        {/* Step 1 */}
        <div className="calc-card-editorial">
          <div className="calc-step-header">
            <span className="step-num-pill">01</span>
            <h3>{lang === 'ID' ? 'Pilih Platform Aplikasi' : 'Choose Application Platform'}</h3>
          </div>
          <div className="platform-pills-grid">
            {platforms.map((p) => {
              const isSelected = platform === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`editorial-platform-card ${isSelected ? 'active' : ''}`}
                >
                  <div className="platform-card-top">
                    <h4>{p.title}</h4>
                    <div className="pill-arrow-mini">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                  <p>{p.desc}</p>
                  <span className="platform-price-label">{lang === 'ID' ? 'Mulai' : 'Starts at'} {formatRupiah(p.basePrice)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 */}
        <div className="calc-card-editorial">
          <div className="calc-step-header">
            <span className="step-num-pill">02</span>
            <h3>{lang === 'ID' ? 'Skala & Kompleksitas' : 'Scale & Complexity'}</h3>
          </div>
          <div className="pill-selector-row">
            {scopes.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScopeChange(s.id)}
                className={`pill-toggle-btn ${scope === s.id ? 'active' : ''}`}
              >
                <span>{s.label}</span>
                <span className="scope-badge-hint">{s.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Features */}
        <div className="calc-card-editorial">
          <div className="calc-step-header step-header-space">
            <div className="step-header-left">
              <span className="step-num-pill">03</span>
              <h3>{lang === 'ID' ? 'Fitur & Integrasi Tambahan' : 'Additional Features & Integrations'}</h3>
            </div>
            <span className="feature-quota-pill">
              {scope === 'enterprise'
                ? (lang === 'ID' ? `${selectedFeatures.length} Modul (Bebas / Kustom)` : `${selectedFeatures.length} Modules (Unlimited / Custom)`)
                : (lang === 'ID' ? `${selectedFeatures.length} / ${currentScopeObj.maxFeatures} Modul` : `${selectedFeatures.length} / ${currentScopeObj.maxFeatures} Modules`)}
            </span>
          </div>

          {maxLimitWarning && (
            <div className="calc-warning-banner">
              <AlertCircle size={16} />
              <span>
                {lang === 'ID' ? (
                  <>
                    Paket <strong>{currentScopeObj.label}</strong> dibatasi maksimal {currentScopeObj.maxFeatures} modul.
                    Pilih <strong>{scope === 'simple' ? 'MVP' : 'Enterprise'}</strong> untuk menambah lebih banyak fitur.
                  </>
                ) : (
                  <>
                    Package <strong>{currentScopeObj.label}</strong> is limited to a maximum of {currentScopeObj.maxFeatures} modules.
                    Choose <strong>{scope === 'simple' ? 'MVP' : 'Enterprise'}</strong> to add more features.
                  </>
                )}
              </span>
            </div>
          )}

          <div className="editorial-features-list">
            {featuresList.map((feat) => {
              const isChecked = selectedFeatures.includes(feat.id);
              const isCustom = feat.id === 'custom';
              return (
                <div key={feat.id} className="editorial-feature-wrapper">
                  <div
                    onClick={() => toggleFeature(feat.id)}
                    className={`editorial-feature-row ${isChecked ? 'active' : ''}`}
                  >
                    <div className="feature-row-left">
                      <div className={`editorial-checkbox ${isChecked ? 'checked' : ''}`}>
                        {isChecked && <Check size={14} />}
                      </div>
                      <div>
                        <span className="feat-title">{feat.name}</span>
                        <p className="feat-desc">{feat.desc}</p>
                      </div>
                    </div>
                    <div className="feature-row-right">
                      {isCustom ? (
                        <>
                          <span className="feat-price" style={{ fontSize: '0.8rem', color: '#718096' }}>
                            {lang === 'ID' ? 'Hubungi Saya' : 'Contact Me'}
                          </span>
                          <span className="feat-days" style={{ fontSize: '0.72rem', color: '#a0aec0' }}>
                            {lang === 'ID' ? 'Nego' : 'Negotiable'}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="feat-price">+{formatRupiah(feat.price)}</span>
                          <span className="feat-days">+{feat.days} {lang === 'ID' ? 'hari' : 'days'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isCustom && isChecked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2 }}
                        className="custom-feature-input-container"
                        onClick={(e) => e.stopPropagation()}
                        style={{ overflow: 'hidden' }}
                      >
                        <input
                          type="text"
                          placeholder={lang === 'ID' ? 'Tuliskan fitur/integrasi yang Anda butuhkan (misal: Live Streaming, Custom API, dll)' : 'Write down the features/integrations you need (e.g. Live Streaming, Custom API, etc)'}
                          value={customFeatureText}
                          onChange={(e) => setCustomFeatureText(e.target.value)}
                          className="custom-feature-textbox"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Speed */}
        <div className="calc-card-editorial">
          <div className="calc-step-header">
            <span className="step-num-pill">04</span>
            <h3>{lang === 'ID' ? 'Kecepatan Timeline' : 'Timeline Speed'}</h3>
          </div>
          <div className="pill-selector-row">
            {speedOptions.map((sp) => (
              <button
                key={sp.id}
                onClick={() => setSpeed(sp.id)}
                className={`pill-toggle-btn ${speed === sp.id ? 'active' : ''}`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Total Column */}
      <div className="editorial-calc-right">
        <div className="dark-emerald-receipt-card">
          <div className="receipt-header">
            <div className="receipt-top-banner">
              <span className="receipt-badge">Live Estimated Investment</span>
              <span className="negotiable-badge-pill">
                <Sparkles size={12} />
                {lang === 'ID' ? 'Harga Fleksibel / Negotiable' : 'Flexible / Negotiable Price'}
              </span>
            </div>
            <h3>{lang === 'ID' ? 'Ringkasan Investasi' : 'Investment Summary'}</h3>

            <div className="negotiable-notice-banner">
              <span>
                {lang === 'ID'
                  ? 'Estimasi di bawah bukan harga mati. Biaya akhir sangat fleksibel & siap didiskusikan (negotiable) sesuai anggaran/budget Anda.'
                  : 'The estimate below is not a fixed price. Final cost is flexible & open for negotiation to match your budget.'}
              </span>
            </div>
          </div>

          <div className="receipt-price-box">
            {(calculation.isEnterprise || selectedFeatures.includes('custom')) ? (
              <>
                <span className="receipt-price-value custom-price">
                  {lang === 'ID' ? 'Kustom / Hubungi Saya' : 'Custom / Contact Me'}
                </span>
                <span className="receipt-price-sub">
                  {lang === 'ID' ? '*Estimasi biaya akhir akan disesuaikan dengan detail fitur kustom Anda' : '*Final cost will be adjusted to your custom feature details'}
                </span>
              </>
            ) : (
              <>
                <span className="receipt-price-value">{formatRupiah(calculation.finalPrice)}</span>
                <span className="receipt-price-sub">{lang === 'ID' ? '*Transparan & siap disesuaikan dengan brief Anda' : '*Transparent & ready to fit your brief'}</span>
              </>
            )}
          </div>

          <div className="receipt-specs">
            <div className="receipt-row">
              <span>Platform</span>
              <b>{calculation.platformName}</b>
            </div>
            <div className="receipt-row">
              <span>{lang === 'ID' ? 'Skala Proyek' : 'Project Scale'}</span>
              <b style={{ color: (calculation.isEnterprise || selectedFeatures.includes('custom')) ? '#ff2a00' : '#0a0a0a' }}>
                {calculation.scopeName}
              </b>
            </div>
            <div className="receipt-row">
              <span>{lang === 'ID' ? 'Fitur Terpilih' : 'Selected Features'}</span>
              <b>{calculation.featuresCount} {lang === 'ID' ? 'Modul' : 'Modules'}</b>
            </div>
            <div className="receipt-row highlight">
              <span>{lang === 'ID' ? 'Estimasi Durasi' : 'Estimated Duration'}</span>
              <b className="text-light-green">
                ~{calculation.totalDays} {lang === 'ID' ? 'Hari Kerja' : 'Working Days'} ({calculation.weeks} {lang === 'ID' ? 'Minggu' : 'Weeks'})
              </b>
            </div>
            {selectedFeatures.includes('custom') && customFeatureText.trim() && (
              <div className="receipt-row custom-feature-summary" style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.25rem',
                borderTop: '1px dashed rgba(255, 255, 255, 0.15)',
                paddingTop: '0.75rem',
                marginTop: '0.5rem'
              }}>
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{lang === 'ID' ? 'Fitur Kustom:' : 'Custom Feature:'}</span>
                <b style={{ color: '#d4ff00', fontSize: '0.85rem', wordBreak: 'break-word', textAlign: 'left' }}>
                  "{customFeatureText.trim()}"
                </b>
              </div>
            )}
          </div>

          <div className="receipt-perks">
            <div className="perk-item">
              <Check size={14} /> {lang === 'ID' ? 'Garansi Bebas-Bug 30 Hari Pasca Rilis' : '30-Day Bug-Free Guarantee Post-Launch'}
            </div>
            <div className="perk-item">
              <Check size={14} /> {lang === 'ID' ? 'Kepemilikan Penuh Source Code & Dokumentasi' : 'Full Source Code Ownership & Documentation'}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfettiAndChat}
            className="btn-emerald-whatsapp"
          >
            <span>
              {(calculation.isEnterprise || selectedFeatures.includes('custom'))
                ? (lang === 'ID' ? 'Konsultasi Spesifikasi Kustom' : 'Consult Custom Specification')
                : (lang === 'ID' ? 'Kirim Rincian ke WhatsApp Erza' : 'Send Details to Erza on WhatsApp')}
            </span>
            <div className="btn-circle-arrow">
              <ArrowUpRight size={16} />
            </div>
          </motion.button>

          <p className="receipt-caption">
            {(calculation.isEnterprise || selectedFeatures.includes('custom'))
              ? (lang === 'ID'
                ? 'Pilihan modul kustom/enterprise akan otomatis terformat untuk didiskusikan langsung via WhatsApp bersama Erza.'
                : 'Custom/enterprise module choices will be automatically formatted for direct discussion via WhatsApp with Erza.')
              : (lang === 'ID'
                ? 'Rincian di atas akan otomatis diformat dan siap dikirimkan ke WhatsApp Erza untuk konsultasi langsung.'
                : 'The details above will be automatically formatted and ready to send to Erza on WhatsApp for direct consultation.')}
          </p>
        </div>
      </div>
    </div>
  );
}
