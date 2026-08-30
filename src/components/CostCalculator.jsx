import React, { useState, useMemo, useEffect } from 'react';
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
      desc: 'High-converting company profile / product showcase',
      basePrice: 2500000,
      baseDays: 5,
    },
    {
      id: 'web-app',
      title: 'Fullstack Web App',
      desc: 'Dynamic web application with custom backend & database',
      basePrice: 5500000,
      baseDays: 14,
    },
    {
      id: 'mobile',
      title: 'Mobile App (iOS & Android)',
      desc: 'Native-feel cross-platform React Native / Flutter app',
      basePrice: 6500000,
      baseDays: 18,
    },
    {
      id: 'ecosystem',
      title: 'Complete Digital Ecosystem',
      desc: 'Web App + Mobile iOS/Android + Admin Dashboard',
      basePrice: 12000000,
      baseDays: 28,
    },
  ];

  const scopes = [
    {
      id: 'simple',
      label: 'Simple / Starter',
      badge: 'Maks. 3 Modul',
      maxFeatures: 3,
      multiplier: 0.9,
      daysAdd: 0
    },
    {
      id: 'mvp',
      label: 'MVP / Startup Scalable',
      badge: 'Maks. 6 Modul',
      maxFeatures: 6,
      multiplier: 1.0,
      daysAdd: 4
    },
    {
      id: 'enterprise',
      label: 'Enterprise / Custom SaaS',
      badge: 'Bebas Modul (Custom)',
      maxFeatures: 999,
      multiplier: 1.5,
      daysAdd: 10
    },
  ];

  const featuresList = [
    {
      id: 'auth',
      name: 'Auth & Role Permissions',
      desc: 'Login Google, JWT, Email verification, RBAC Admin/User',
      price: 800000,
      days: 3,
    },
    {
      id: 'payment',
      name: 'Payment Gateway (Midtrans/Xendit/Stripe)',
      desc: 'Direct QRIS, Virtual Account, Credit Card & e-Wallet',
      price: 1200000,
      days: 4,
    },
    {
      id: 'chat',
      name: 'Realtime Chat & Sockets',
      desc: 'Instant messaging & push notifications system',
      price: 1500000,
      days: 5,
    },
    {
      id: 'ai',
      name: 'Integrasi AI / LLM (Gemini & OpenAI)',
      desc: 'Smart Chatbot, AI copy generator, prompt pipeline',
      price: 2500000,
      days: 4,
    },
    {
      id: 'dashboard',
      name: 'Admin Panel & Analytics Charts',
      desc: 'Visual data reports, Excel/PDF export, full CRUD management',
      price: 1400000,
      days: 5,
    },
    {
      id: 'seo',
      name: 'SEO & Speed Turbo (Score 95+)',
      desc: 'Google indexing optimization & sub-second loading speed',
      price: 600000,
      days: 2,
    },
    {
      id: 'i18n',
      name: 'Multi-Language (ID & EN)',
      desc: 'Seamless dual-language localization switch',
      price: 500000,
      days: 2,
    },
    {
      id: 'custom',
      name: 'Custom / Fitur Lainnya (Tulis Sendiri)',
      desc: 'Tuliskan modul, integrasi pihak ketiga, atau kebutuhan khusus Anda',
      price: 0,
      days: 0,
    },
  ];

  const speedOptions = [
    { id: 'relaxed', label: 'Santai (Diskon 5%)', feeFactor: 0.95, dayFactor: 1.2 },
    { id: 'standard', label: 'Standar (Direkomendasikan)', feeFactor: 1.0, dayFactor: 1.0 },
    { id: 'rush', label: 'Mode RUSH Ekspres (+25%)', feeFactor: 1.25, dayFactor: 0.65 },
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
      ? 'Custom / Perlu Diskusi Spesifikasi Enterprise'
      : formatRupiah(calculation.finalPrice);

    const message = `Halo Mas Erza Saleh!%0A%0ASaya tertarik membuat aplikasi dengan rincian kalkulator berikut:%0A%0A*Platform*: ${calculation.platformName}%0A*Skala*: ${calculation.scopeName}%0A*Timeline*: ${speed === 'rush' ? 'Mode RUSH (Ekspres)' : speed === 'relaxed' ? 'Santai' : 'Standar'} (~${calculation.totalDays} Hari kerja)%0A%0A*Fitur yang Dipilih* (${calculation.featuresCount} Modul):%0A${featureNames || '- Fitur Standar Dasar'}%0A%0A*Estimasi Biaya*: ${priceText}%0A%0ABisa kita jadwalkan diskusi lebih lanjut mengenai proyek ini? Terima kasih!`;

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
            <h3>Pilih Platform Aplikasi</h3>
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
                  <span className="platform-price-label">Mulai {formatRupiah(p.basePrice)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 */}
        <div className="calc-card-editorial">
          <div className="calc-step-header">
            <span className="step-num-pill">02</span>
            <h3>Skala &amp; Kompleksitas</h3>
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
          <div className="calc-step-header" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span className="step-num-pill">03</span>
              <h3>Fitur &amp; Integrasi Tambahan</h3>
            </div>
            <span className="feature-quota-pill">
              {scope === 'enterprise'
                ? `${selectedFeatures.length} Modul (Bebas / Custom)`
                : `${selectedFeatures.length} / ${currentScopeObj.maxFeatures} Modul`}
            </span>
          </div>

          {maxLimitWarning && (
            <div className="calc-warning-banner">
              <AlertCircle size={16} />
              <span>
                Paket <strong>{currentScopeObj.label}</strong> dibatasi maksimal {currentScopeObj.maxFeatures} modul.
                Pilih <strong>{scope === 'simple' ? 'MVP' : 'Enterprise'}</strong> untuk menambah lebih banyak fitur.
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
                            Hubungi Saya
                          </span>
                          <span className="feat-days" style={{ fontSize: '0.72rem', color: '#a0aec0' }}>
                            Nego
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="feat-price">+{formatRupiah(feat.price)}</span>
                          <span className="feat-days">+{feat.days} hari</span>
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
                          placeholder="Tuliskan fitur/integrasi yang Anda butuhkan (misal: Live Streaming, Custom API, dll)"
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
            <h3>Kecepatan Timeline</h3>
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
            <span className="receipt-badge">Live Estimated Investment</span>
            <h3>Ringkasan Investasi</h3>
          </div>

          <div className="receipt-price-box">
            {(calculation.isEnterprise || selectedFeatures.includes('custom')) ? (
              <>
                <span className="receipt-price-value" style={{ fontSize: '1.75rem', color: '#d4ff00' }}>
                  Custom / Hubungi Saya
                </span>
                <span className="receipt-price-sub">
                  *Estimasi biaya akhir akan disesuaikan dengan detail fitur custom Anda
                </span>
              </>
            ) : (
              <>
                <span className="receipt-price-value">{formatRupiah(calculation.finalPrice)}</span>
                <span className="receipt-price-sub">*Transparan &amp; siap disesuaikan dengan brief Anda</span>
              </>
            )}
          </div>

          <div className="receipt-specs">
            <div className="receipt-row">
              <span>Platform</span>
              <b>{calculation.platformName}</b>
            </div>
            <div className="receipt-row">
              <span>Skala Proyek</span>
              <b style={{ color: (calculation.isEnterprise || selectedFeatures.includes('custom')) ? '#ff2a00' : '#0a0a0a' }}>
                {calculation.scopeName}
              </b>
            </div>
            <div className="receipt-row">
              <span>Fitur Terpilih</span>
              <b>{calculation.featuresCount} Modul</b>
            </div>
            <div className="receipt-row highlight">
              <span>Estimasi Durasi</span>
              <b className="text-light-green">
                ~{calculation.totalDays} Hari Kerja ({calculation.weeks} Minggu)
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
                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Fitur Custom:</span>
                <b style={{ color: '#d4ff00', fontSize: '0.85rem', wordBreak: 'break-word', textAlign: 'left' }}>
                  "{customFeatureText.trim()}"
                </b>
              </div>
            )}
          </div>

          <div className="receipt-perks">
            <div className="perk-item">
              <Check size={14} /> Garansi Bug-Free 30 Hari Pasca Rilis
            </div>
            <div className="perk-item">
              <Check size={14} /> Full Hak Milik Source Code &amp; Dokumentasi
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
                ? 'Konsultasi Spesifikasi Custom'
                : 'Kirim Rincian ke WhatsApp Erza'}
            </span>
            <div className="btn-circle-arrow">
              <ArrowUpRight size={16} />
            </div>
          </motion.button>

          <p className="receipt-caption">
            {(calculation.isEnterprise || selectedFeatures.includes('custom'))
              ? 'Pilihan modul custom/enterprise akan otomatis terformat untuk didiskusikan langsung via WhatsApp bersama Mas Erza.'
              : 'Rincian di atas akan otomatis diformat dan siap dikirimkan ke WhatsApp Mas Erza untuk konsultasi langsung.'}
          </p>
        </div>
      </div>
    </div>
  );
}
