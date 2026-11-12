import { useEffect, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light.js";
import ppcloseupImg from "../assets/ppcloseup.png";
import { useLanguage } from "../context/LanguageContext";

// Import Lottie animation assets
import phoneCallAnim from "../assets/lottie/phone-call.json";
import smartphoneAnim from "../assets/lottie/smartphone.json";
import webDevAnim from "../assets/lottie/web-development.json";
import testingAnim from "../assets/lottie/testing-checking.json";
import taskCompletedAnim from "../assets/lottie/task-completed.json";

function LottieNodeIcon({ animationData, size = 52 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !animationData) return;

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => {
      anim.destroy();
    };
  }, [animationData]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    />
  );
}

export default function CaraKerja() {
  const { lang, t } = useLanguage();
  const journeyRef = useRef(null);
  const fillRef = useRef(null);
  const sproutRef = useRef(null);
  const nodeRefs = useRef([]);
  const stepRefs = useRef([]);

  const STEPS_DATA = [
    {
      num: 1,
      phase: lang === "ID" ? "FASE 01" : "PHASE 01",
      side: "left",
      animation: phoneCallAnim,
      quip: lang === "ID" ? "// diskusi santai tanpa jargon teknis" : "// casual talk, no technical jargon",
      title: t("step_1_title"),
      desc: t("step_1_desc"),
      meta: lang === "ID" ? ["± 2–3 Hari", "Zoom / WhatsApp", "Notion Brief"] : ["± 2–3 Days", "Zoom / WhatsApp", "Notion Brief"],
    },
    {
      num: 2,
      phase: lang === "ID" ? "FASE 02" : "PHASE 02",
      side: "right",
      animation: smartphoneAnim,
      quip: lang === "ID" ? '// revisi visual sampai kamu bilang "nah, pas!"' : '// visual iterations until it clicks',
      title: t("step_2_title"),
      desc: t("step_2_desc"),
      meta: lang === "ID" ? ["± 5–7 Hari", "Figma Design", "Interactive Prototype"] : ["± 5–7 Days", "Figma Design", "Interactive Prototype"],
    },
    {
      num: 3,
      phase: lang === "ID" ? "FASE 03" : "PHASE 03",
      side: "left",
      animation: webDevAnim,
      quip: lang === "ID" ? "// proses koding intensif & sprint mingguan" : "// core engineering & weekly sprints",
      title: t("step_3_title"),
      desc: t("step_3_desc"),
      meta: lang === "ID" ? ["± 2–6 Minggu", "React / Next.js / Flutter", "Clean Git Commits"] : ["± 2–6 Weeks", "React / Next.js / Flutter", "Clean Git Commits"],
    },
    {
      num: 4,
      phase: lang === "ID" ? "FASE 04" : "PHASE 04",
      side: "right",
      animation: testingAnim,
      quip: lang === "ID" ? "// uji ketahanan & buru bug sebelum rilis" : "// edge-case testing & bug hunting",
      title: t("step_4_title"),
      desc: t("step_4_desc"),
      meta: lang === "ID" ? ["± 4–7 Hari", "Cross-Device QA", "Automated Security Test"] : ["± 4–7 Days", "Cross-Device QA", "Automated Security Test"],
    },
    {
      num: 5,
      phase: lang === "ID" ? "FASE 05" : "PHASE 05",
      side: "left",
      animation: taskCompletedAnim,
      quip: lang === "ID" ? "// rilis live & siap mendampingi bisnismu" : "// live release & post-launch warranty",
      title: t("step_5_title"),
      desc: t("step_5_desc"),
      meta: lang === "ID" ? ["Siap Live", "App Store / Cloud Hosting", "Garansi Support"] : ["Live Ready", "App Store / Cloud Hosting", "Support Warranty"],
    },
  ];

  // Timeline line fill & profile avatar scroll animation
  useEffect(() => {
    const journey = journeyRef.current;
    const fill = fillRef.current;
    const sprout = sproutRef.current;
    if (!journey || !fill || !sprout) return;

    let cachedTop = 0;
    let cachedHeight = 0;
    let rafId = null;

    const measure = () => {
      const rect = journey.getBoundingClientRect();
      cachedTop = rect.top + window.scrollY;
      cachedHeight = rect.height;
    };

    const update = () => {
      const vh = window.innerHeight;
      const rectTop = cachedTop - window.scrollY;
      const total = cachedHeight + vh * 0.35;
      const progressed = vh * 0.55 - rectTop;
      const progress = total > 0 ? Math.max(0, Math.min(1, progressed / total)) : 0;

      fill.style.height = `${progress * 100}%`;
      sprout.style.top = `${progress * 100}%`;
      sprout.style.transform = `translate3d(-50%,-50%,0)`;

      // Highlight passed nodes
      nodeRefs.current.forEach((node) => {
        if (!node) return;
        const nodeRect = node.getBoundingClientRect();
        const nodeY = nodeRect.top + nodeRect.height / 2;
        const triggerY = vh * 0.55;
        if (nodeY <= triggerY) {
          node.classList.add("passed");
        } else {
          node.classList.remove("passed");
        }
      });
    };

    measure();
    update();

    const onResize = () => {
      measure();
      update();
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Reveal-on-scroll entrance for each step
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="ck-section">
      <div className="ck-container">
        {/* Section Header */}
        <div className="ck-header">
          <div className="ck-eyebrow">
            <span className="ck-dot" /> {t("process_tag")}
          </div>
          <h2 className="ck-title">{t("process_title")}</h2>
          <p className="ck-sub">{t("process_desc")}</p>
        </div>

        {/* Timeline Journey */}
        <div className="journey" ref={journeyRef}>
          {/* Central Track Line */}
          <div className="journey-line">
            <div className="journey-line-fill" ref={fillRef} />
          </div>

          {/* Floating Avatar Sprout indicator */}
          <div className="journey-sprout" ref={sproutRef}>
            <div className="sprout-avatar-frame">
              <img src={ppcloseupImg} alt="Erza Saleh" className="sprout-avatar-img" />
            </div>
          </div>

          {/* Steps List */}
          <div className="journey-steps">
            {STEPS_DATA.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`j-step ${step.side} reveal-${step.side === "left" ? "l" : "r"}`}
              >
                {/* Center Node with Animated Lottie */}
                <div
                  className="j-node"
                  data-num={step.num}
                  ref={(el) => (nodeRefs.current[i] = el)}
                >
                  <LottieNodeIcon animationData={step.animation} size={48} />
                </div>

                {/* Step Card matching Luxury Botanical / Dark Glassmorphic Theme */}
                <div className="j-card">
                  {/* Card Header Info */}
                  <div className="j-card-header">
                    <span className="j-phase-pill">{step.phase}</span>
                    <span className="j-quip">{step.quip}</span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className="j-card-title">{step.title}</h3>
                  <p className="j-card-desc">{step.desc}</p>

                  {/* Card Meta Badges */}
                  <div className="j-meta">
                    {step.meta.map((m, mi) => (
                      <span key={mi} className={`j-meta-pill ${mi === 0 ? "dur" : ""}`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           CaraKerja.jsx Styles - Matching Botanical Luxury & Modern Dark Obsidian Theme
           ========================================================================== */

        .ck-section {
          --ck-bg: #070908;
          --ck-card-bg: linear-gradient(165deg, #0e1a16 0%, #080f0c 100%);
          --ck-border: rgba(255, 255, 255, 0.08);
          --ck-border-hover: rgba(47, 224, 136, 0.35);
          --ck-accent-green: #2fe088;
          --ck-accent-lime: #d4ff00;
          --ck-text-main: #f4faf6;
          --ck-text-muted: #8ea49a;
          --ck-ease: cubic-bezier(0.22, 1, 0.36, 1);

          position: relative;
          background: var(--ck-bg);
          color: var(--ck-text-main);
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 7rem 0 8rem;
          overflow: hidden;
        }

        @media (max-width: 860px) {
          .ck-section {
            padding: 5rem 0 6rem;
          }
        }

        .ck-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        @media (max-width: 768px) {
          .ck-container {
            padding: 0 1.25rem;
          }
        }

        /* Section Header */
        .ck-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 4.5rem;
        }

        .ck-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ck-accent-lime);
          background: rgba(212, 255, 0, 0.08);
          border: 1px solid rgba(212, 255, 0, 0.25);
          padding: 0.45rem 1.15rem;
          border-radius: 9999px;
          margin-bottom: 1.25rem;
        }

        .ck-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--ck-accent-lime);
          box-shadow: 0 0 10px var(--ck-accent-lime);
          display: inline-block;
        }

        .ck-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          letter-spacing: -0.035em;
          font-size: clamp(2rem, 4.2vw, 3.2rem);
          line-height: 1.1;
          max-width: 760px;
          margin: 0 0 1rem;
          color: #ffffff;
        }

        .ck-sub {
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          color: var(--ck-text-muted);
          font-size: 1.05rem;
          max-width: 580px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Timeline Container */
        .journey {
          position: relative;
          margin-top: 2rem;
          padding: 20px 0 40px;
        }

        /* Center Vertical Track */
        .journey-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          transform: translateX(-50%);
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.08) 0 8px,
            transparent 8px 18px
          );
          border-radius: 3px;
        }

        .journey-line-fill {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 0%;
          background: linear-gradient(to bottom, var(--ck-accent-green), var(--ck-accent-lime));
          border-radius: 3px;
          box-shadow: 0 0 14px rgba(47, 224, 136, 0.6);
          transition: height 0.12s linear;
        }

        /* Traveling Sprout (Avatar) */
        .journey-sprout {
          position: absolute;
          left: 50%;
          top: 0;
          z-index: 8;
          transform: translate3d(-50%, -50%, 0);
          transition: top 0.12s linear;
          pointer-events: none;
        }

        .sprout-avatar-frame {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2.5px solid var(--ck-accent-green);
          box-shadow: 0 0 18px rgba(47, 224, 136, 0.7), 0 6px 14px rgba(0, 0, 0, 0.6);
          background: #08100c;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .sprout-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 820px) {
          .journey-line {
            left: 32px;
          }
          .journey-sprout {
            left: 32px;
          }
        }

        /* Step Rows */
        .journey-steps {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
        }

        .j-step {
          display: grid;
          grid-template-columns: 1fr 86px 1fr;
          align-items: center;
          column-gap: 2rem;
          opacity: 0;
          transition: opacity 0.8s var(--ck-ease), transform 0.8s var(--ck-ease);
        }

        .j-step.reveal-l {
          transform: translateX(-35px);
        }
        .j-step.reveal-r {
          transform: translateX(35px);
        }
        .j-step.in {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 820px) {
          .j-step {
            grid-template-columns: 64px 1fr;
            column-gap: 1.25rem;
          }
        }

        /* Center Node Circle with Lottie */
        .j-node {
          grid-column: 2;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          position: relative;
          z-index: 4;
          background: radial-gradient(circle at center, #142820 0%, #09130f 100%);
          border: 2px solid rgba(47, 224, 136, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(47, 224, 136, 0.15);
          transition: all 0.4s var(--ck-ease);
          margin: 0 auto;
        }

        @media (max-width: 820px) {
          .j-node {
            grid-column: 1;
            width: 60px;
            height: 60px;
          }
        }

        .j-node::after {
          content: attr(data-num);
          position: absolute;
          top: -4px;
          right: -4px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--ck-accent-lime);
          color: #060707;
          font-family: 'Outfit', sans-serif;
          font-weight: 900;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.45);
          border: 2px solid #09130f;
          z-index: 5;
        }

        .j-node.passed {
          border-color: var(--ck-accent-green);
          box-shadow: 0 0 24px rgba(47, 224, 136, 0.45), 0 12px 28px rgba(0, 0, 0, 0.6);
          transform: scale(1.06);
        }

        /* Step Card - Redesigned to match Luxury Botanical & Bento Standards */
        .j-card {
          position: relative;
          background: var(--ck-card-bg);
          border: 1.5px solid var(--ck-border);
          border-radius: 24px;
          padding: 1.85rem 2rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 0.35s var(--ck-ease), border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .j-step.left .j-card {
          grid-column: 1;
        }
        .j-step.right .j-card {
          grid-column: 3;
        }

        @media (max-width: 820px) {
          .j-step.left .j-card,
          .j-step.right .j-card {
            grid-column: 2;
            padding: 1.4rem 1.4rem;
          }
        }

        .j-card:hover {
          transform: translateY(-5px);
          border-color: var(--ck-border-hover);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(47, 224, 136, 0.12);
        }

        /* Subtle Connector Whisker on Desktop */
        .j-step.left .j-card::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -20px;
          width: 20px;
          height: 2px;
          background: repeating-linear-gradient(to right, rgba(47, 224, 136, 0.5) 0 4px, transparent 4px 8px);
        }

        .j-step.right .j-card::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -20px;
          width: 20px;
          height: 2px;
          background: repeating-linear-gradient(to right, rgba(47, 224, 136, 0.5) 0 4px, transparent 4px 8px);
        }

        @media (max-width: 820px) {
          .j-step.left .j-card::after,
          .j-step.right .j-card::before {
            display: none;
          }
        }

        /* Card Content Formatting */
        .j-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
        }

        .j-phase-pill {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--ck-accent-lime);
          background: rgba(212, 255, 0, 0.08);
          border: 1px solid rgba(212, 255, 0, 0.25);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .j-quip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: rgba(142, 164, 154, 0.85);
        }

        .j-card-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 0.55rem;
          line-height: 1.25;
        }

        .j-card-desc {
          color: var(--ck-text-muted);
          font-size: 0.9rem;
          line-height: 1.65;
          margin: 0 0 1.25rem;
        }

        .j-meta {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .j-meta-pill {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          color: #c4d4cc;
          transition: all 0.2s ease;
        }

        .j-meta-pill.dur {
          border-color: rgba(47, 224, 136, 0.35);
          background: rgba(47, 224, 136, 0.08);
          color: var(--ck-accent-green);
          font-weight: 700;
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-sprout,
          .journey-line-fill,
          .j-node,
          .j-card,
          .j-step {
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  );
}
