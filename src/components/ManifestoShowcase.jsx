import React from 'react';
import './ManifestoShowcase.css';

const SERVICES_DATA = [
  {
    id: 'mobile',
    vol: 'VOL. 01 / MOBILE',
    word1: 'MOBILE',
    word2: 'APPS.',
    tape: 'REACT NATIVE // FLUTTER // IOS & ANDROID // 60 FPS // APP STORE // ',
    desc: 'Pengembangan aplikasi mobile iOS & Android berperforma native, antarmuka intuitif, dan siap rilis ke App Store & Google Play.'
  },
  {
    id: 'web',
    vol: 'VOL. 02 / WEB APPS',
    word1: 'WEB',
    word2: 'SYSTEM.',
    tape: 'NEXT.JS // REACT // TAILWIND // JAMSTACK // ULTRA FAST SEO 99+ // ',
    desc: 'Website berkinerja tinggi, SaaS platform, dan custom web apps dengan visual premium, responsif, dan optimalisasi SEO tingkat tinggi.'
  },
  {
    id: 'backend',
    vol: 'VOL. 03 / BACKEND',
    word1: 'CORE',
    word2: 'API.',
    tape: 'NODE.JS // POSTGRESQL // SUPABASE // REST & GRAPHQL // WEBSOCKETS // ',
    desc: 'Arsitektur server yang skalabel, integrasi database relasional, payment gateway, dan API berkecepatan tinggi dengan keamanan teruji.'
  },
  {
    id: 'deploy',
    vol: 'VOL. 04 / DEVOPS',
    word1: 'CLOUD',
    word2: 'DEPLOY.',
    tape: 'DOCKER // CI/CD // VERCEL // AWS // CLOUDFLARE EDGE // SSL & CDN // ',
    desc: 'Otomatisasi build & deployment, setup domain & SSL aman, konfigurasi server cloud, dan pendampingan peluncuran produk ke pasar.'
  },
  {
    id: 'maintenance',
    vol: 'VOL. 05 / SUPPORT',
    word1: 'ACTIVE',
    word2: 'SUPPORT.',
    tape: '24/7 MONITORING // BUG FIXES // SECURITY AUDIT // BACKUP // SLA // ',
    desc: 'Pemeliharaan berkala, perbaikan bug instan, audit keamanan, upgrade dependensi, dan jaminan stabilitas aplikasi pasca peluncuran.'
  },
  {
    id: 'ai-automation',
    vol: 'VOL. 06 / AI & AGENT',
    word1: 'AI &',
    word2: 'AGENTS.',
    tape: 'GEMINI AI // OPENAI // WORKFLOW AUTOMATION // CHATBOT // RAG PIPELINE // ',
    desc: 'Integrasi kecerdasan buatan, otomatisasi alur kerja cerdas, chatbot pintar, dan asisten digital untuk akselerasi efisiensi bisnis.'
  }
];

export default function ManifestoShowcase() {
  return (
    <div className="manifesto-showcase">
      <input type="checkbox" id="rebel-toggle" className="rebel-toggle" />

      <div className="presentation-stage">
        <label htmlFor="rebel-toggle" className="aesthetic-switch">
          <span className="switch-track"></span>
          <span className="switch-text mode-clean">⚡ BRUTALIZE AESTHETIC — CLICK ME</span>
          <span className="switch-text mode-chaos">🌿 RESTORE MINIMALISM</span>
        </label>

        <div className="services-cards-grid">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="poster-card">
              <div className="css-mesh-grain"></div>
              <div className="drafting-grid"></div>

              <div className="geo-orb"></div>

              <div className="type-container">
                <div className="huge-text word-1">{service.word1}</div>
                <div className="huge-text word-2">{service.word2}</div>
              </div>

              <div className="tape-ribbon">
                <div className="tape-scroll">
                  <span>{service.tape}</span>
                  <span>{service.tape}</span>
                </div>
              </div>

              <div className="poster-footer">
                <div className="barcode"></div>
                <div className="manifesto-text">
                  <p className="vol">{service.vol}</p>
                  <p className="desc">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
