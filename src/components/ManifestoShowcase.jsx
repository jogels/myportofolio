import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './ManifestoShowcase.css';

export default function ManifestoShowcase() {
  const { lang, t } = useLanguage();

  const SERVICES_DATA = [
    {
      id: 'mobile',
      vol: 'VOL. 01 / MOBILE',
      word1: 'MOBILE',
      word2: 'APPS.',
      tape: 'REACT NATIVE // FLUTTER // IOS & ANDROID // 60 FPS // APP STORE // ',
      desc: t('service_2_desc')
    },
    {
      id: 'web',
      vol: 'VOL. 02 / WEB APPS',
      word1: 'WEB',
      word2: 'SYSTEM.',
      tape: 'NEXT.JS // REACT // TAILWIND // JAMSTACK // ULTRA FAST SEO 99+ // ',
      desc: t('service_1_desc')
    },
    {
      id: 'backend',
      vol: 'VOL. 03 / BACKEND',
      word1: 'CORE',
      word2: 'API.',
      tape: 'NODE.JS // POSTGRESQL // SUPABASE // REST & GRAPHQL // WEBSOCKETS // ',
      desc: lang === 'ID'
        ? 'Arsitektur server yang skalabel, integrasi database relasional, payment gateway, dan API berkecepatan tinggi dengan keamanan teruji.'
        : 'Scalable server architecture, relational database integration, payment gateways, and high-speed secure REST/GraphQL APIs.'
    },
    {
      id: 'deploy',
      vol: 'VOL. 04 / DEVOPS',
      word1: 'CLOUD',
      word2: 'DEPLOY.',
      tape: 'DOCKER // CI/CD // VERCEL // AWS // CLOUDFLARE EDGE // SSL & CDN // ',
      desc: t('service_3_desc')
    },
    {
      id: 'maintenance',
      vol: 'VOL. 05 / SUPPORT',
      word1: 'ACTIVE',
      word2: 'SUPPORT.',
      tape: '24/7 MONITORING // BUG FIXES // SECURITY AUDIT // BACKUP // SLA // ',
      desc: t('service_5_desc')
    },
    {
      id: 'ai-automation',
      vol: 'VOL. 06 / AI & AGENT',
      word1: 'AI &',
      word2: 'AGENTS.',
      tape: 'GEMINI AI // OPENAI // WORKFLOW AUTOMATION // CHATBOT // RAG PIPELINE // ',
      desc: t('service_6_desc')
    }
  ];

  const handleCardClick = (id) => {
    // 1. Scroll to the cost calculator section
    const calcElem = document.getElementById('calculator');
    if (calcElem) {
      calcElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 2. Dispatch a custom event to update calculator selections
    const event = new CustomEvent('select-service-platform', { detail: { serviceId: id } });
    window.dispatchEvent(event);
  };

  return (
    <div className="manifesto-showcase">
      <div className="presentation-stage">
        <div className="services-cards-grid">
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id} 
              className="poster-card cursor-pointer group"
              onClick={() => handleCardClick(service.id)}
            >
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
                  <div className="desc">{service.desc}</div>
                  <span className="calculate-trigger-text text-[8px] font-bold text-red-500 uppercase mt-1.5 block group-hover:underline transition-all">
                    {lang === 'ID' ? 'Kalkulasi Biaya Proyek ↗' : 'Calculate Project Cost ↗'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
