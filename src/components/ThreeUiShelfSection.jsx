import React, { useState, useEffect, useRef } from 'react';
import { CompleteShelfLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import "./ThreeUiShelfSection.css";

export default function ThreeUiShelfSection() {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Lazy load exactly ONCE when the component enters viewport, and keep it loaded
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect(); // Stop observing to prevent reload on scroll away
      }
    }, { rootMargin: '200px' });
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Intercept vertical scroll events inside the same-origin iframe and redirect them to the parent window
  useEffect(() => {
    if (!shouldRender) return;

    let intervalId = null;

    const attachWheelToIframe = () => {
      if (!containerRef.current) return false;
      const iframe = containerRef.current.querySelector('iframe');
      if (!iframe) return false;

      try {
        const iframeWin = iframe.contentWindow;
        if (!iframeWin) return false;

        const iframeDoc = iframeWin.document;
        if (iframeDoc.readyState !== 'complete') return false;

        const handleIframeWheel = (e) => {
          // If deltaY (vertical scroll) is dominant, we scroll the parent window
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            window.scrollBy({
              top: e.deltaY,
              behavior: 'auto'
            });
            // Prevent horizontal scrolling inside the iframe
            e.preventDefault();
            e.stopPropagation();
          }
        };

        // Attach listener in capture phase inside the iframe to catch scroll events first
        iframeWin.addEventListener('wheel', handleIframeWheel, { capture: true, passive: false });
        return true; // Successfully attached!
      } catch (err) {
        // Polling will continue if iframe is not loaded or same-origin access isn't ready
        return false;
      }
    };

    // Poll to check if iframe is rendered and accessible
    intervalId = setInterval(() => {
      if (attachWheelToIframe()) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [shouldRender]);

  return (
    <section ref={containerRef} className="threeui-shelf-section" id="projects">
      <div className="threeui-shelf-header">
        <div className="threeui-pill-tag">PORTFOLIO ARCHIVE · 3D INTERACTIVE SHELF</div>
        <h2 className="threeui-shelf-title">Beberapa project yang bikin saya begadang (dengan senang hati)</h2>
        <p className="threeui-shelf-desc">
          Jelajahi karya dan field guide arsitektur aplikasi terpilih. Klik dan buka setiap volume 3D di bawah untuk membaca case study, alur sistem, dan pembuktian teknis.
        </p>
      </div>

      <div className="threeui-shelf-container">
        <div className="shader-frame" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          {shouldRender ? (
            <CompleteShelfLandingPage
              headingFont="iowan-old-style"
              bodyFont="inter"
              headingWeight="400"
              bodyWeight="400"
              primaryColor="#c87046"
              headingSize={60}
              bodySize={12}
              headingLetterSpacing={-0.055}
            />
          ) : (
            <div className="threeui-shelf-placeholder" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              background: '#0d0d0d',
              borderRadius: '16px',
              border: '1px dashed rgba(255,255,255,0.15)',
              color: '#718096',
              fontSize: '0.9rem',
              fontFamily: 'Outfit, sans-serif'
            }}>
              Menyiapkan Rak 3D...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
