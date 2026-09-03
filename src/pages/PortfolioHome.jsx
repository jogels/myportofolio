import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import ppportoImg from '../assets/ppporto.png';
import CostCalculator from '../components/CostCalculator';
import KineticWovenClothSection from '../components/KineticWovenClothSection';
import ThreeUiShelfSection from '../components/ThreeUiShelfSection';
import ManifestoShowcase from '../components/ManifestoShowcase';
import CaraKerja from '../components/CaraKerja';
import ErrorBoundary from '../components/ErrorBoundary';
import { useLanguage } from '../context/LanguageContext';
import './PortfolioHome.css';
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Search,
  ChevronDown,
  Sparkles,
  Check,
  Send,
  ExternalLink,
  Layers,
  Code2,
  Globe,
  Smartphone,
  Zap,
  SlidersHorizontal,
  Compass,
  Clock,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function PortfolioHome({ onNavigateContohUi }) {
  const { lang, setLang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(1);

  // ─── Direct Hardware-Accelerated Scroll Interpolation ───
  const { scrollY } = useScroll();
  const smoothScrollY = scrollY;

  // Portrait slides LEFT smoothly from 0px to 380px
  const portraitX = useTransform(smoothScrollY, [0, 380], ['0%', '-70%']);

  // ERZADEV letters fade out smoothly on initial scroll
  const erzadevOpacity = useTransform(smoothScrollY, [0, 140], [1, 0]);
  const erzadevY = useTransform(smoothScrollY, [0, 140], [0, -35]);
  const erzadevScale = useTransform(smoothScrollY, [0, 140], [1, 0.90]);

  // Tagline fades out immediately
  const taglineOpacity = useTransform(smoothScrollY, [0, 70], [1, 0]);

  // Intro text fades + slides in from RIGHT — EXACTLY SAME range [0, 380px]
  const introOpacity = useTransform(smoothScrollY, [0, 380], [0, 1]);
  const introX = useTransform(smoothScrollY, [0, 380], ['100px', '0px']);
  const introScale = useTransform(smoothScrollY, [0, 380], [0.92, 1]);

  const filterTabs = [
    { id: 'all', label: 'Outdoor Apps' },
    { id: 'web', label: 'Indoor Web' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'Potted AI' },
  ];

  const featuredWorks = [
    {
      id: 1,
      title: 'Peperomia FinTech',
      category: 'web',
      desc: 'High-converting QRIS & payment ecosystem with sub-second latency.',
      tech: 'React 19, Node.js, Tailwind',
      price: 'Rp 5.500.000',
      badge: 'POPULAR',
      imgBg: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Fiddle - Leaf Mobile',
      category: 'mobile',
      desc: 'Mobile roastery app with live order tracking & loyalty rewards.',
      tech: 'React Native, Expo, Firebase',
      price: 'Rp 6.500.000',
      badge: 'MOBILE',
      imgBg: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Calathea AI Suite',
      category: 'ai',
      desc: 'Smart workspace assistant for automated marketing copy & diagrams.',
      tech: 'Next.js 15, Gemini API, Supabase',
      price: 'Rp 7.000.000',
      badge: 'AI READY',
      imgBg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80',
    },
  ];



  return (
    <div className="editorial-outer-wrapper">
      <div className="editorial-canvas">
        {/* ============================================================ */}
        {/* 1. HERO PINNED SECTION — Remains pinned while transforming */}
        {/* ============================================================ */}
        <div className="hero-pinned-track">
          <section className="hero-sticky-frame">
            {/* Floating Pill Navbar */}
            <header className="hero-pill-navbar">
              <div className="nav-left-pill">
                <span className="brand-text-logo">erzadev</span>
                <nav className="nav-links-row">
                  <a href="#" className="nav-pill-link active">{t('nav_home')}</a>
                  <a href="#services" className="nav-pill-link">{t('nav_services')}</a>
                  <a href="#projects" className="nav-pill-link">{t('nav_works')}</a>
                  <a href="#calculator" className="nav-calculate-chip">{t('nav_calculator')}</a>
                </nav>
              </div>
              <div className="nav-right-pill">
                <div className="lang-toggle-pill">
                  <button
                    type="button"
                    className={`lang-btn ${lang === 'ID' ? 'active' : ''}`}
                    onClick={() => setLang('ID')}
                    title="Bahasa Indonesia"
                  >
                    🇮🇩 ID
                  </button>
                  <button
                    type="button"
                    className={`lang-btn ${lang === 'EN' ? 'active' : ''}`}
                    onClick={() => setLang('EN')}
                    title="English"
                  >
                    🇬🇧 EN
                  </button>
                </div>
                <a
                  href={`https://wa.me/6285719416778?text=${lang === 'ID' ? 'Halo%20Erza%20Dev,%20saya%20tertarik%20konsultasi%20pembuatan%20aplikasi!' : 'Hello%20Erza%20Dev,%20I%20am%20interested%20in%20app%20development%20consultation!'}`}
                  target="_blank" rel="noreferrer"
                  className="btn-pill-border"
                >{t('nav_hire_me')}</a>
              </div>
            </header>

            {/* Tagline — fades out on first scroll */}
            <motion.div style={{ opacity: taglineOpacity }} className="hero-veldra-top-tagline">
              <span>GROW. SUCCEED. THRIVE.</span>
            </motion.div>

            {/* Centerpiece Stage — portrait sits flush on top of yellow marquee tape */}
            <div className="hero-veldra-stage">

              {/* ERZADEV letters — fade out at same time image moves */}
              <motion.div
                style={{ opacity: erzadevOpacity, y: erzadevY, scale: erzadevScale }}
                className="hero-giant-letters"
                aria-hidden="true"
              >
                <span>E</span><span>R</span><span>Z</span><span>A</span><span>D</span><span>E</span><span>V</span>
              </motion.div>

              {/* Portrait — slides left simultaneously with constant size */}
              <motion.div
                style={{ x: portraitX }}
                className="hero-portrait-wrapper"
              >
                <img src={ppportoImg} alt="Erza Saleh" className="hero-portrait-img" decoding="async" loading="eager" />
              </motion.div>

              {/* Intro text — fades + slides in from right simultaneously with portrait */}
              <motion.div
                style={{ opacity: introOpacity, x: introX, scale: introScale }}
                className="hero-scrolled-intro-content"
              >
                <div className="intro-text-chunky">
                  <span className="line-highlight-yellow">{lang === 'ID' ? 'Halo, Saya Erza' : "Hello, I'm Erza"}</span>
                  <span className="line-highlight-yellow">{lang === 'ID' ? 'Lagi banyak ide?' : 'Got big ideas?'}</span>
                  <span className="line-highlight-white">{lang === 'ID' ? 'Saya bantu mewujudkannya.' : 'Let me bring them to life.'}</span>
                </div>
              </motion.div>
            </div>

            {/* Marquee Tape — Bottom boundary of the header card */}
            <div className="marquee-outer-clip">
              <div className="hero-veldra-marquee-tape">
                <div className="marquee-track">
                  <span>✦ SKY ROCKET YOUR BUSINESS TODAY</span>
                  <span>✦ FULLSTACK WEB &amp; MOBILE APPS</span>
                  <span>✦ FAST DELIVERY</span>
                  <span>✦ SKY ROCKET YOUR BUSINESS TODAY</span>
                  <span>✦ FULLSTACK WEB &amp; MOBILE APPS</span>
                  <span>✦ FAST DELIVERY</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ============================================================ */}
        {/* 2. KINETIC TEXTILE / WOVEN CLOTH 3D SIMULATION SECTION */}
        {/* ============================================================ */}
        <ErrorBoundary>
          <KineticWovenClothSection />
        </ErrorBoundary>

        {/* ============================================================ */}
        {/* 3. THREEUI INTERACTIVE 3D WORKING VOLUMES SHELF SHOWCASE */}
        {/* ============================================================ */}
        <ErrorBoundary>
          <ThreeUiShelfSection />
        </ErrorBoundary>

        {/* ============================================================ */}
        {/* 7. SERVICES & ENGINEERING CAPABILITIES + COST CALCULATOR */}
        {/* ============================================================ */}
        <section id="services" className="quality-goods-section">
          <div className="quality-header-center">
            <h2 className="title-chunky">{t('services_title')}</h2>
            <p className="quality-subtext">
              {t('services_desc')}
            </p>
          </div>

          {/* Interactive Manifesto Showcase (Acid Brutalism / Minimalist 6-Card Services Grid) */}
          <ErrorBoundary>
            <ManifestoShowcase />
          </ErrorBoundary>

          {/* Interactive Cost Calculator */}
          <div id="calculator">
            <ErrorBoundary>
              <CostCalculator />
            </ErrorBoundary>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. TIMELINE & WORKFLOW SECTION (Cara Kerja) */}
        {/* ============================================================ */}
        <ErrorBoundary>
          <CaraKerja />
        </ErrorBoundary>

        {/* ============================================================ */}
        {/* 9. BOTTOM FOOTER SECTION (REDESIGNED) */}
        {/* ============================================================ */}
        <footer className="modern-footer">
          <div className="footer-grid-container">
            {/* Left Column: Brand & Tagline */}
            <div className="footer-brand-column">
              <div className="footer-logo-row">
                <span className="footer-logo-text">erzadev</span>
              </div>
              <p className="footer-brand-desc">
                {lang === 'ID' 
                  ? 'Membangun aplikasi web dan mobile premium berkinerja tinggi yang meningkatkan bisnis Anda.' 
                  : 'Crafting premium, high-performance web applications and native mobile experiences that elevate your business.'}
              </p>
              <div className="footer-status-badge">
                <span className="status-dot"></span>
                <span>{lang === 'ID' ? 'Tersedia untuk Proyek Klien Pilihan' : 'Available for Select Client Projects'}</span>
              </div>
            </div>

            {/* Middle Column: Navigation */}
            <div className="footer-links-column">
              <h4 className="footer-column-title">{lang === 'ID' ? 'Peta Situs' : 'Sitemap'}</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link-item">{t('nav_home')}</a></li>
                <li><a href="#services" className="footer-link-item">{t('nav_services')}</a></li>
                <li><a href="#projects" className="footer-link-item">{t('nav_works')}</a></li>
                <li><a href="#calculator" className="footer-link-item">{t('nav_calculator')}</a></li>
                <li><button onClick={onNavigateContohUi} className="footer-link-item link-btn-style">{lang === 'ID' ? 'Showcase Lab' : 'Showcase Lab'}</button></li>
              </ul>
            </div>

            {/* Right Column: Contact & Socials */}
            <div className="footer-links-column">
              <h4 className="footer-column-title">{lang === 'ID' ? 'Hubungi Saya' : "Let's Connect"}</h4>
              <ul className="footer-links-list">
                <li>
                  <a
                    href={`https://wa.me/6285719416778?text=${lang === 'ID' ? 'Halo%20Erza%20Dev,%20saya%20tertarik%20konsultasi%20proyek!' : 'Hello%20Erza%20Dev,%20I%20am%20interested%20in%20consulting%20about%20a%20project!'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link-item contact-highlight"
                  >
                    WhatsApp Chat ↗
                  </a>
                </li>
                <li><a href="mailto:erza.developers@gmail.com" className="footer-link-item">Email (erza.developers@gmail.com)</a></li>
                <li><a href="https://www.linkedin.com/in/erzamazde/" target="_blank" rel="noreferrer" className="footer-link-item">LinkedIn Profile ↗</a></li>
                <li><a href="https://github.com/jogels" target="_blank" rel="noreferrer" className="footer-link-item">GitHub Codebase ↗</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <span className="footer-copyright">
              © {new Date().getFullYear()} ERZADEV • Created by Erza Saleh
            </span>
            <div className="footer-bottom-meta">
              <span>Jakarta, Indonesia 🇮🇩</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
