import React, { useState, useEffect, useRef } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import "./ThreeUiShelfSection.css";

export default function ThreeUiShelfSection() {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // 1. Viewport Lifecycle Management — Suspend WebGL loop when offscreen, Resume when in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView) {
          setShouldRender(true);
        }

        const notifyIframe = () => {
          const iframe = container.querySelector('iframe');
          if (iframe && iframe.contentWindow) {
            try {
              iframe.contentWindow.postMessage(
                inView ? "resume-3d" : "suspend-3d",
                "*"
              );
            } catch (e) { }
          }
        };

        notifyIframe();
        setTimeout(notifyIframe, 300);
        setTimeout(notifyIframe, 1000);
      },
      { threshold: 0.05, rootMargin: '100px 0px' }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Scroll Pointer-Events Freezing — Disable pointer-events while scrolling to bypass Three.js raycasting calculations
  useEffect(() => {
    let scrollTimer = null;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <section ref={containerRef} className="threeui-shelf-section" id="projects">
      <div className="threeui-shelf-header">
        <div className="threeui-pill-tag">
          <Layers size={14} /> PORTFOLIO ARCHIVE · 3D INTERACTIVE SHELF
        </div>
        <h2 className="threeui-shelf-title">Beberapa project yang bikin saya begadang (dengan senang hati)</h2>
        <p className="threeui-shelf-desc">
          Jelajahi karya dan field guide arsitektur aplikasi terpilih. Klik dan buka setiap volume 3D di bawah untuk membaca case study, alur sistem, dan pembuktian teknis.
        </p>
      </div>

      <div
        className="threeui-shelf-container"
        style={{ pointerEvents: isScrolling ? 'none' : 'auto' }}
      >
        <div className="shader-frame" style={{ minHeight: '450px', height: '100%', position: 'relative' }}>
          {shouldRender ? (
            <iframe
              src="/landing-pages/complete-shelf-v2.html"
              title="Working Volumes 3D Bookshelf"
              loading="eager"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
                background: '#080808',
                display: 'block'
              }}
            />
          ) : (
            <div className="threeui-shelf-placeholder">
              <Sparkles size={20} className="pulse-icon" />
              <span>Memuat Rak 3D Interaktif...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
