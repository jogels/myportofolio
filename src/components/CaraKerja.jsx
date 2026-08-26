import { useEffect, useRef } from "react";
import ppcloseupImg from '../assets/ppcloseup.png';

const STEPS = [
  {
    num: 1,
    side: "left",
    icon: "🕵️‍♂️",
    quip: '// nggak pakai istilah teknis, janji',
    title: "Discovery & Ngobrol Santai",
    desc: "Kita ngobrol soal kebutuhan, target pengguna, dan goal bisnis kamu sambil ngopi virtual. Cerita aja apa yang kamu mau, sisanya saya terjemahin ke bahasa developer.",
    meta: ["± 2–3 hari", "Zoom / WA", "Notion"],
  },
  {
    num: 2,
    side: "right",
    icon: "🎨",
    quip: '// revisi sampai kamu bilang "nah, ini!"',
    title: "Desain UI/UX",
    desc: "Wireframe dulu, baru mockup penuh warna di Figma. Kamu review, kasih coretan, saya perbaiki — sampai desainnya beneran pas di hati.",
    meta: ["± 5–7 hari", "Figma", "Prototype"],
  },
  {
    num: 3,
    side: "left",
    icon: "👨‍💻",
    quip: "// tahap paling lama saya diem di depan laptop",
    title: "Development",
    desc: 'Saya mulai coding sungguhan. Kamu tetap dapat update progress tiap minggu — bukan cuma "lagi dikerjain kak", tapi beneran ada yang bisa dilihat.',
    meta: ["± 2–6 minggu", "Flutter", "Git"],
  },
  {
    num: 4,
    side: "right",
    icon: "🐞",
    quip: "// bug diburu sebelum user nemuin duluan",
    title: "Testing & QA",
    desc: "Dicoba di berbagai device dan skenario aneh-aneh (termasuk pas sinyal jelek). Biar kamu bukan yang pertama nemu bug-nya di depan klien.",
    meta: ["± 4–7 hari", "Manual QA", "Automated Test"],
  },
  {
    num: 5,
    side: "left",
    icon: "📦",
    quip: "// momen paling deg-degan sekaligus seru",
    title: "Deploy & Handover",
    desc: "Rilis ke App Store, Play Store, atau hosting — plus dokumentasi lengkap biar kamu (atau tim kamu) paham cara kerja sistemnya.",
    meta: ["± 2–3 hari", "App Store", "Play Store"],
  },
  {
    num: 6,
    side: "right",
    icon: "🛟",
    quip: "// nggak menghilang kayak sinyal WiFi kosan",
    title: "Support Pasca-Launch",
    desc: "Aplikasi live bukan berarti selesai. Ada masa support buat perbaikan bug dan pertanyaan dadakan — chat aja, nggak perlu drama dulu.",
    meta: ["Fleksibel", "Bug Fix", "Monitoring"],
  },
];

export default function CaraKerja() {
  const journeyRef = useRef(null);
  const fillRef = useRef(null);
  const sproutRef = useRef(null);
  const nodeRefs = useRef([]);
  const stepRefs = useRef([]);

  // ---------- growing-plant scroll animation ----------
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

      fill.style.height = progress * 100 + "%";
      sprout.style.top = progress * 100 + "%";

      const sway = Math.sin(progress * 14) * 9;
      const grow = 0.82 + progress * 0.45;
      sprout.style.transform = `translate3d(-50%,-50%,0) scale(${grow}) rotate(${sway}deg)`;
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

  // ---------- reveal-on-scroll entrance for each step ----------
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
        <div className="ck-eyebrow">
          <span className="ck-dot" /> Cara Kerja
        </div>
        <h2 className="ck-title">
          Rute perjalanan dari benih ide sampai aplikasi berbuah 🌱
        </h2>
        <p className="ck-sub">
          Anggap ini kebun kecil. Foto profil saya tumbuh menyusuri scroll
          kamu, mekar satu-satu di 6 titik sebelum akhirnya berbuah jadi
          aplikasi.
        </p>

        <div className="journey" ref={journeyRef}>
          <div className="journey-line">
            <div className="journey-line-fill" ref={fillRef} />
          </div>
          <div className="journey-sprout" ref={sproutRef} style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={ppcloseupImg} alt="Erza Saleh" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid var(--mint)', boxShadow: '0 0 12px var(--mint)' }} />
          </div>

          <div className="journey-steps">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (stepRefs.current[i] = el)}
                className={`j-step ${step.side} reveal-${
                  step.side === "left" ? "l" : "r"
                }`}
              >
                <div
                  className="j-node"
                  data-num={step.num}
                  ref={(el) => (nodeRefs.current[i] = el)}
                >
                  {step.icon}
                </div>
                <div className="j-card">
                  <span className="j-quip">{step.quip}</span>
                  <h3>{step.title}</h3>
                  <p className="desc">{step.desc}</p>
                  <div className="j-meta">
                    {step.meta.map((m, mi) => (
                      <span key={mi} className={mi === 0 ? "dur" : ""}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="journey-hint">
          🌿 foto profil beneran bergerak ngikutin scroll kamu — coba geser ke atas-bawah
        </p>
      </div>

      <style>{`
        /* ---------- design tokens (samakan / override sesuai token project kamu) ---------- */
        .ck-section{
          --navy-deep:#050710;
          --navy-card:#141f38;
          --navy-soft:#111a2e;
          --line: rgba(232,236,243,0.09);
          --mint:#5eead4;
          --coral:#ff6b5b;
          --ink:#e8ecf3;
          --ink-dim:#8f99b3;
          --ink-faint:#5c657d;
          --ease: cubic-bezier(.22,1,.36,1);
          position:relative;
          background:var(--navy-deep);
          color:var(--ink);
          font-family:'Outfit',sans-serif;
          padding:140px 0;
        }
        @media (max-width:860px){ .ck-section{ padding:96px 0; } }

        .ck-container{ max-width:1180px; margin:0 auto; padding:0 32px; }
        @media (max-width:860px){ .ck-container{ padding:0 22px; } }

        .ck-eyebrow{
          display:inline-flex; align-items:center; gap:8px;
          font-family:'JetBrains Mono',monospace; font-size:12.5px; letter-spacing:0.14em; text-transform:uppercase;
          color:var(--mint); background:rgba(94,234,212,0.08); border:1px solid rgba(94,234,212,0.25);
          padding:7px 14px 7px 12px; border-radius:100px; margin-bottom:22px;
        }
        .ck-dot{ width:6px; height:6px; border-radius:50%; background:var(--mint); box-shadow:0 0 8px var(--mint); display:inline-block; }

        .ck-title{
          font-family:'Outfit',sans-serif; font-weight:700; letter-spacing:-0.02em;
          font-size:clamp(30px,4.4vw,50px); line-height:1.08; max-width:680px; margin:0;
        }
        .ck-sub{
          font-family:'Outfit',sans-serif; font-weight:400; color:var(--ink-dim); font-size:17px;
          max-width:520px; margin-top:16px; line-height:1.7;
        }

        /* ---------- timeline ---------- */
        .journey{ position:relative; margin-top:70px; padding:10px 0 20px; }
        .journey-line{
          position:absolute; left:50%; top:0; bottom:0; width:4px; transform:translateX(-50%);
          background:repeating-linear-gradient(to bottom, var(--line) 0 9px, transparent 9px 20px);
          border-radius:4px;
        }
        .journey-line-fill{
          position:absolute; left:0; top:0; width:100%; height:0%;
          background:repeating-linear-gradient(to bottom, var(--mint) 0 9px, var(--coral) 9px 20px);
          border-radius:4px; box-shadow:0 0 14px rgba(94,234,212,0.4);
          transition:height .12s linear;
        }
        .journey-sprout{
          position:absolute; left:50%; top:0; z-index:6;
          transform:translate(-50%,-50%) scale(0.85) rotate(0deg);
          filter:drop-shadow(0 0 12px rgba(94,234,212,0.5));
          transition:top .12s linear;
        }
        @media (max-width:820px){
          .journey-line{ left:27px; }
          .journey-sprout{ left:27px; }
        }

        .journey-steps{ position:relative; z-index:2; display:flex; flex-direction:column; gap:64px; }
        .j-step{
          display:grid; grid-template-columns:1fr 66px 1fr; align-items:center; column-gap:26px;
          opacity:0; transition:opacity .8s var(--ease), transform .8s var(--ease);
        }
        .j-step.reveal-l{ transform:translateX(-40px); }
        .j-step.reveal-r{ transform:translateX(40px); }
        .j-step.in{ opacity:1; transform:translateX(0); }
        @media (max-width:820px){
          .j-step{ grid-template-columns:56px 1fr; column-gap:18px; }
        }

        .j-node{
          grid-column:2; width:66px; height:66px; border-radius:50%; position:relative; z-index:3;
          background:var(--navy-card); border:3px solid var(--line);
          display:flex; align-items:center; justify-content:center; font-size:27px;
          transition:border-color .4s var(--ease), transform .4s var(--ease), box-shadow .4s var(--ease);
        }
        @media (max-width:820px){ .j-node{ grid-column:1; width:52px; height:52px; font-size:21px; } }
        .j-node::after{
          content:attr(data-num); position:absolute; top:-8px; right:-8px; width:22px; height:22px; border-radius:50%;
          background:var(--coral); color:#0a0604; font-family:'JetBrains Mono',monospace; font-weight:700; font-size:10.5px;
          display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.35);
        }
        .j-node.passed{ border-color:var(--mint); transform:scale(1.1); box-shadow:0 0 22px rgba(94,234,212,0.4); }

        .j-card{
          position:relative; background:var(--navy-card); border:1.5px dashed var(--line);
          border-radius:26px 26px 26px 6px; padding:24px 26px; transition:transform .35s var(--ease), border-color .35s;
        }
        .j-step.left .j-card{ grid-column:1; }
        .j-step.right .j-card{ grid-column:3; border-radius:26px 26px 6px 26px; }
        @media (max-width:820px){
          .j-step.left .j-card, .j-step.right .j-card{ grid-column:2; border-radius:22px 22px 22px 5px !important; }
        }
        .j-card:hover{ transform:translateY(-6px) rotate(-1deg); border-color:var(--mint); border-style:solid; }
        .j-step.right .j-card:hover{ transform:translateY(-6px) rotate(1deg); }
        .j-step.left .j-card::after{
          content:''; position:absolute; top:50%; right:-22px; width:22px; height:2px;
          background:repeating-linear-gradient(to right, var(--mint) 0 4px, transparent 4px 8px);
        }
        .j-step.right .j-card::before{
          content:''; position:absolute; top:50%; left:-22px; width:22px; height:2px;
          background:repeating-linear-gradient(to right, var(--coral) 0 4px, transparent 4px 8px);
        }
        @media (max-width:820px){ .j-step.left .j-card::after, .j-step.right .j-card::before{ display:none; } }
        .j-quip{ display:block; font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--mint); margin-bottom:8px; }
        .j-card h3{ font-family:'Outfit',sans-serif; font-weight:700; font-size:18.5px; margin:0 0 8px; }
        .j-card .desc{ color:var(--ink-dim); font-size:14px; line-height:1.7; margin:0 0 16px; }
        .j-meta{ display:flex; gap:8px; flex-wrap:wrap; }
        .j-meta span{ font-family:'JetBrains Mono',monospace; font-size:10.5px; padding:5px 11px; border-radius:100px; border:1px solid var(--line); color:var(--ink-faint); }
        .j-meta .dur{ border-color:var(--coral); color:var(--coral); }

        .journey-hint{ margin-top:30px; font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--ink-faint); text-align:center; }

        @media (prefers-reduced-motion: reduce){
          .journey-sprout, .journey-line-fill, .j-node, .j-card, .j-step{ transition-duration:0.001ms !important; }
        }
      `}</style>
    </section>
  );
}
