import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, Flame, Moon, Sun, Menu, X, Coffee } from 'lucide-react';

export default function Navbar({ onNavigateContohUi, energyMode, setEnergyMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang', href: '#about' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Pengalaman', href: '#experience' },
    { label: 'Kalkulator Biaya 💰', href: '#calculator' },
    { label: 'Testimoni', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`portfolio-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#" className="nav-brand">
          <span className="brand-badge-emoji">🚀</span>
          <span className="brand-name">Erza<span className="brand-highlight">Saleh</span></span>
          <span className="nav-status-pill">
            <span className="pulse-dot"></span> Available for Freelance
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-desktop-menu">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="nav-link-item">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Shortcut Buttons */}
        <div className="nav-actions">
          {/* Energy / Turbo Mode Switch */}
          <button
            onClick={() => setEnergyMode(energyMode === 'turbo' ? 'normal' : 'turbo')}
            className={`energy-mode-btn ${energyMode === 'turbo' ? 'turbo-active' : ''}`}
            title="Toggle Turbo Energy Mode"
          >
            {energyMode === 'turbo' ? <Flame size={16} className="flame-icon" /> : <Coffee size={16} />}
            <span>{energyMode === 'turbo' ? 'TURBO ON 🔥' : 'Relax Mode'}</span>
          </button>

          {/* Showcase Skill Link */}
          <button
            onClick={onNavigateContohUi}
            className="nav-btn-contoh"
            title="Buka Halaman Showcase 14 Skill & Motion"
          >
            <Sparkles size={15} />
            <span>Showcase Skill</span>
          </button>

          {/* Direct CTA */}
          <a href="#calculator" className="nav-cta-btn">
            <Calculator size={15} />
            <span>Hitung Biaya</span>
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mobile-nav-drawer"
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-drawer-footer">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateContohUi();
              }}
              className="mobile-btn-showcase"
            >
              <Sparkles size={16} /> Buka Showcase Skill & Motion (/contohUi)
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
