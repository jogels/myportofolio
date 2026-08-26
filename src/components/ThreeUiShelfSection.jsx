import React, { useState } from 'react';
import { Layers, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import "./ThreeUiShelfSection.css";

const getProjectsData = (lang) => [
  {
    id: "erp",
    vol: "VOL. 01",
    title: lang === 'ID' ? "Aplikasi ERP & HR" : "ERP Apps",
    discipline: lang === 'ID' ? "Portal HR & Operasional Enterprise" : "HR & Operations Portal",
    category: "enterprise",
    deck: lang === 'ID'
      ? "Modul HR enterprise terintegrasi untuk absensi GPS berbasis geofencing, pengajuan SPPD, kalkulasi lembur otomatis, dan manajemen cuti digital."
      : "Integrated enterprise HR module built for automated geofenced employee GPS attendance, digital leave tracking, overtime computations, and multi-level SPPD travel approvals.",
    chapters: lang === 'ID' ? [
      { title: "Absensi GPS Geofencing", desc: "Verifikasi lokasi real-time, absensi foto selfie, dan pencatatan jam kerja otomatis untuk tim multi-cabang." },
      { title: "Persetujuan SPPD Dinas", desc: "Workflow persetujuan perjalanan dinas multi-tingkat, kalkulasi anggaran uang saku, dan pengajuan nota digital." },
      { title: "Otomatisasi Cuti & Lembur", desc: "Perhitungan kuota cuti tahunan, kalkulasi tarif lembur otomatis, dan dashboard manajer HR." }
    ] : [
      { title: "Geofenced GPS Attendance", desc: "Real-time location verification, selfie validation, and automated clock-in/out timestamps for multi-branch teams." },
      { title: "SPPD Official Travel Approval", desc: "Multi-tier approval workflow, allowance budget auto-calculation, and digital receipt submission." },
      { title: "Leave & Overtime Automation", desc: "Annual leave quota tracking, overtime rate computations, and instant HR manager approval dashboards." }
    ],
    tech: ["React", "Node.js", "PostgreSQL", "GPS Geofencing"],
    color: "#c87046"
  },
  {
    id: "volunteer",
    vol: "VOL. 02",
    title: lang === 'ID' ? "Aplikasi Relawan" : "Volunteer Apps",
    discipline: lang === 'ID' ? "Platform Aksi Sosial" : "Social Engagement Platform",
    category: "mobile",
    deck: lang === 'ID'
      ? "Platform manajemen kampanye sosial, onboarding relawan, pencocokan keahlian otomatis, dan rekap pencatatan donasi real-time."
      : "An architectural playbook for social cause campaigns, volunteer onboarding, skill matching, and real-time donation metrics tracking portals.",
    chapters: lang === 'ID' ? [
      { title: "Manajemen Kampanye", desc: "Pembuatan kampanye aksi sosial, penentuan kuota target relawan, dan publikasi jadwal kegiatan." },
      { title: "Pencocokan Keahlian Relawan", desc: "Penugasan otomatis berdasarkan keahlian, minat, dan lokasi tempat tinggal relawan." },
      { title: "Analitik Donasi & Dampak", desc: "Pencatatan jam kerja relawan, grafik kontribusi donasi, dan laporan transparansi publik." }
    ] : [
      { title: "Campaign Management", desc: "Create social causes, set volunteer quotas, and publish activity schedules." },
      { title: "Skill-Based Volunteer Matching", desc: "Algorithmic task assignment based on volunteer expertise and location." },
      { title: "Impact & Donation Analytics", desc: "Real-time volunteer hours logged, contribution charts, and transparency reports." }
    ],
    tech: ["React Native", "TypeScript", "Firebase", "Analytics"],
    color: "#c24d24"
  },
  {
    id: "ticketing",
    vol: "VOL. 03",
    title: lang === 'ID' ? "Aplikasi Tiket Event" : "Ticketing Apps",
    discipline: lang === 'ID' ? "Sistem Reservasi & Tiket" : "Event Management Engine",
    category: "enterprise",
    deck: lang === 'ID'
      ? "Sistem reservasi tiket lalu lintas tinggi, kunci hold kursi otomatis anti-double-booking, pemindaian QR gate check-in cepat, dan integrasi QRIS."
      : "High-concurrency ticket reservation engine, anti-double-booking seat hold locks, rapid QR gate check-in scanning, and payment gateway webhooks.",
    chapters: lang === 'ID' ? [
      { title: "Hold Kursi Concurrency Tinggi", desc: "Timer penahanan tiket sementara, proteksi race condition, dan peta tempat duduk dinamis." },
      { title: "Scan QR Check-In Gate", desc: "Validasi tiket offline-first, log masuk pintu gerbang acara, dan penghitung pengunjung." },
      { title: "Integrasi Payment Gateway", desc: "Pembayaran QRIS, Virtual Account, kartu kredit, dan penerbitan e-ticket otomatis." }
    ] : [
      { title: "High-Concurrency Seat Locking", desc: "Temporary hold timers, race-condition protection, and dynamic seating maps." },
      { title: "Rapid QR Code Gate Check-in", desc: "Offline-first ticket scanner validation, gate entry logs, and attendance counters." },
      { title: "Payment Gateway Integration", desc: "Direct QRIS, Virtual Account, credit card gateways, and automated instant e-tickets." }
    ],
    tech: ["Next.js", "Redis", "PostgreSQL", "QRIS"],
    color: "#afc400"
  },
  {
    id: "transit",
    vol: "VOL. 04",
    title: lang === 'ID' ? "Aplikasi Transportasi" : "Transportation Apps",
    discipline: lang === 'ID' ? "Logistik & Pelacakan Armada" : "Logistics & Transit",
    category: "logistics",
    deck: lang === 'ID'
      ? "Mesin rute armada presisi tinggi, live streaming lokasi via WebSocket, penugasan armada oleh dispatcher, dan estimasi waktu penjemputan (ETA)."
      : "Designing high-accuracy fleet routing engines, real-time WebSocket location streaming, dispatcher assignments, and passenger ETA telemetry.",
    chapters: lang === 'ID' ? [
      { title: "Telemetri GPS Armada", desc: "Pelacakan status pengemudi, heatmap lokasi kendaraan aktif, dan riwayat perjalanan armada." },
      { title: "Streaming Lokasi WebSocket", desc: "Penyiaran posisi kendaraan live berlatensi rendah dan notifikasi status ke penumpang." },
      { title: "Optimasi Rute Cerdas", desc: "Penjadwalan pengiriman multi-stop, analitik konsumsi bahan bakar, dan kalkulasi ETA." }
    ] : [
      { title: "Live GPS Fleet Telemetry", desc: "Driver status tracking, active vehicle heatmaps, and route execution logs." },
      { title: "WebSocket Location Streaming", desc: "Low-latency live vehicle location broadcasts and instant passenger status alerts." },
      { title: "Traffic-Aware Route Optimization", desc: "Multi-stop route dispatching, fuel consumption analytics, and smart ETA engines." }
    ],
    tech: ["React", "WebSockets", "Go", "Mapbox"],
    color: "#1537a1"
  },
  {
    id: "scheduler",
    vol: "VOL. 05",
    title: lang === 'ID' ? "Aplikasi Task Scheduler" : "Task Scheduler Apps",
    discipline: lang === 'ID' ? "Produktivitas & Otomasi Cloud" : "Productivity & Automation",
    category: "cloud",
    deck: lang === 'ID'
      ? "Sistem eksekusi cron job otomatis, antrean worker background, trigger notifikasi dinamis, priority queue Redis, dan grafik performa sistem."
      : "Engineering cron job runners, background worker queues, dynamic notification triggers, Redis priority queues, and execution latency metrics.",
    chapters: lang === 'ID' ? [
      { title: "Priority Queue Runner", desc: "Eksekusi tugas tertunda, worker job Redis, dan penanganan antrean prioritas tinggi." },
      { title: "Worker Node Terdistribusi", desc: "Policy retry otomatis, penanganan antrean error dead-letter, dan failover node." },
      { title: "Grafik Performa & Latensi", desc: "Dashboard throughput sistem, pencatatan latensi eksekusi, dan alur notifikasi error." }
    ] : [
      { title: "Priority Queue Runner", desc: "Delayed task execution, Redis-backed job workers, and priority queue handling." },
      { title: "Distributed Worker Nodes", desc: "Automatic retries, dead-letter error queues, and node failover policies." },
      { title: "Latency & Throughput Charts", desc: "System throughput dashboards, execution latency logs, and failure alerts." }
    ],
    tech: ["Node.js", "Redis Queue", "Docker", "Grafana"],
    color: "#c83222"
  },
  {
    id: "petshop",
    vol: "VOL. 06",
    title: lang === 'ID' ? "Aplikasi Pet Shop & Care" : "Pet Shop Apps",
    discipline: lang === 'ID' ? "E-Commerce & Layanan Hewan" : "E-Commerce & Care",
    category: "mobile",
    deck: lang === 'ID'
      ? "Platform terpadu reservasi grooming hewan, e-commerce produk hewan peliharaan, pencatatan konsultasi dokter hewan, dan jurnal medis."
      : "A unified platform for pet grooming reservations, categorized product checkouts, veterinary consultation logs, and medical history journals.",
    chapters: lang === 'ID' ? [
      { title: "E-Commerce Produk Hewan", desc: "Katalog makanan, aksesori care, notifikasi stok terbatas, dan checkout instan." },
      { title: "Booking Groomer & Dokter", desc: "Reservasi jadwal klinik hewan, profil hewan peliharaan, dan pengingat jadwal." },
      { title: "Jurnal Medis Hewan", desc: "Riwayat vaksinasi hewan, grafik timbangan berat badan, dan rekap medis dokter." }
    ] : [
      { title: "Pet Product E-Commerce", desc: "Categorized food, care accessories, inventory stock alerts, and instant checkout." },
      { title: "Grooming & Vet Slot Booking", desc: "Veterinary appointment reservations, pet profiles, and grooming reminders." },
      { title: "Health Journal & Medical Logs", desc: "Vaccination history logs, weight tracking charts, and doctor consultation notes." }
    ],
    tech: ["React Native", "Node.js", "MongoDB", "Midtrans"],
    color: "#da3b2f"
  },
  {
    id: "booking",
    vol: "VOL. 07",
    title: lang === 'ID' ? "Aplikasi Booking Jadwal" : "Appointment Booking Apps",
    discipline: lang === 'ID' ? "Sistem Penjadwalan Cerdas" : "Scheduling Systems",
    category: "enterprise",
    deck: lang === 'ID'
      ? "Integrasi sinkronisasi Google & Outlook Calendar dua arah, konversi zona waktu otomatis, pengingat WhatsApp 24 jam sebelum jadwal, dan pencegah bentrok."
      : "Two-way Google & Outlook calendar sync protocols, timezone localization, automated WhatsApp 24h pre-appointment alerts, and double-booking guards.",
    chapters: lang === 'ID' ? [
      { title: "Sinkronisasi Kalender 2 Arah", desc: "Sinkronkan Google & Outlook Calendar, jeda buffer antar jadwal, dan batasan reservasi." },
      { title: "Zona Waktu & Multi-Mata Uang", desc: "Konversi zona waktu otomatis, opsi mata uang, dan preferensi bahasa penggunanya." },
      { title: "Notifikasi Otomatis WhatsApp", desc: "Pengingat 24 jam sebelum janji temu, konfirmasi reservasi, dan alur pembatalan." }
    ] : [
      { title: "Two-Way Calendar Synchronization", desc: "Google & Outlook calendar sync, slot availability buffers, and booking limits." },
      { title: "Timezone & Multi-Currency Engine", desc: "Automatic timezone conversion, multi-currency rates, and language preferences." },
      { title: "Automated WhatsApp Reminders", desc: "24h pre-appointment alerts, instant booking confirmation, and cancellation flows." }
    ],
    tech: ["Next.js", "Google Calendar API", "WhatsApp API", "Tailwind"],
    color: "#78a7bd"
  },
  {
    id: "service",
    vol: "VOL. 08",
    title: lang === 'ID' ? "Aplikasi On-Demand Service" : "Service Apps",
    discipline: lang === 'ID' ? "Layanan Jasa On-Demand" : "On-Demand Services",
    category: "logistics",
    deck: lang === 'ID'
      ? "Alur pemesanan jasa pemeliharaan rumah/teknisi on-demand, penentuan rute teknisi terdekat via GPS, invoice digital terperinci, dan kalkulasi harga instan."
      : "Designing clean on-demand maintenance request pipelines, technician GPS proximity routing, digital itemized job invoicing, and instant quote generation.",
    chapters: lang === 'ID' ? [
      { title: "Pipeline Pemesanan Jasa", desc: "Posting pekerjaan pelanggan, alur penugasan teknisi, dan permintaan perbaikan darurat." },
      { title: "Pencocokan GPS Teknisi Terdekat", desc: "Pencarian teknisi berdasarkan jarak terdekat, rute navigasi, dan jam kedatangan." },
      { title: "Faktur & Invoice Digital", desc: "Estimasi biaya pengerjaan, faktur terperinci, dan penerbitan nota kwitansi PDF instan." }
    ] : [
      { title: "On-Demand Dispatch Pipeline", desc: "Customer job posting, technician dispatch, and emergency service requests." },
      { title: "Technician GPS Proximity Matching", desc: "Proximity-based technician routing, navigation maps, and arrival timestamps." },
      { title: "Digital Service Invoicing", desc: "Cost estimation, itemized job invoicing, and instant PDF receipt generation." }
    ],
    tech: ["React", "Express", "PostgreSQL", "Google Maps API"],
    color: "#182a43"
  },
  {
    id: "boarding",
    vol: "VOL. 09",
    title: lang === 'ID' ? "Aplikasi Manajemen Kos" : "Boarding House Management Apps",
    discipline: lang === 'ID' ? "Sistem Manajemen Properti" : "Property Management",
    category: "enterprise",
    deck: lang === 'ID'
      ? "Peta ketersediaan kamar interaktif, dokumen kontrak sewa digital, tagihan bulanan otomatis, pencatatan meteran listrik/air, dan portal penghuni."
      : "Interactive room availability state maps, digital tenancy contracts, monthly rent auto-billing, utility meter logging, and tenant reporting portals.",
    chapters: lang === 'ID' ? [
      { title: "Peta Inventaris Kamar", desc: "Matriks status kamar terisi/kosong, tingkat fasilitas, dan riwayat penyewa." },
      { title: "Kontrak Sewa Digital", desc: "Dokumentasi sewa digital, verifikasi identitas (KTP), durasi sewa, dan uang deposit." },
      { title: "Tagihan Sewa Bulanan Otomatis", desc: "Kalkulasi meteran listrik & air, pengingat bayar via WhatsApp, dan portal tagihan." }
    ] : [
      { title: "Room Inventory Map", desc: "Room availability matrix, facility tiering, and rental status tracking." },
      { title: "Digital Tenancy Contracts", desc: "Digital lease agreements, ID verification, lease duration terms, and deposits." },
      { title: "Monthly Rent Auto-Billing", desc: "Utility meter calculation, WhatsApp payment reminders, and tenant portals." }
    ],
    tech: ["React", "Node.js", "Prisma", "MySQL"],
    color: "#c24d24"
  },
  {
    id: "survey",
    vol: "VOL. 10",
    title: lang === 'ID' ? "Aplikasi Survey Dinamis" : "Survey Apps",
    discipline: lang === 'ID' ? "Engine Pengumpulan Data" : "Data Collection Engine",
    category: "cloud",
    deck: lang === 'ID'
      ? "Builder formulir drag-and-drop dinamis, logika percabangan kondisional, validasi anti-spam respons, dan grafik rekap data real-time."
      : "Dynamic drag-and-drop form schema builders, conditional branching logic, response anti-spam validation, and real-time response aggregation charts.",
    chapters: lang === 'ID' ? [
      { title: "Drag & Drop Form Builder", desc: "Skema pertanyaan dinamis, logika kondisional (jika A maka B), dan formulir multi-halaman." },
      { title: "Engine Validasi Anti-Spam", desc: "Validasi kolom real-time, proteksi captcha, dan pemeriksaan kelengkapan jawaban." },
      { title: "Grafik Rekap & Ekspor Excel", desc: "Visualisasi data grafik pai/batang instan, analisis respons, dan ekspor data CSV/Excel." }
    ] : [
      { title: "Dynamic Drag & Drop Form Builder", desc: "Dynamic question schema definitions, conditional logic, and multi-page forms." },
      { title: "Validation & Anti-Spam Engine", desc: "Real-time field validation, captcha protection, and response completeness checks." },
      { title: "Aggregation & CSV Export Charts", desc: "Instant visual pie/bar charts, response sentiment analysis, and Excel exports." }
    ],
    tech: ["React", "D3.js", "Node.js", "MongoDB"],
    color: "#afc400"
  },
  {
    id: "wakaf",
    vol: "VOL. 11",
    title: lang === 'ID' ? "Website Database Tanah Wakaf" : "Wakaf Land Database Website",
    discipline: lang === 'ID' ? "Registri Wakaf & Pertanahan" : "Islamic Endowment Registry",
    category: "enterprise",
    deck: lang === 'ID'
      ? "Digitalisasi data tanah wakaf: pemetaan geo-spatial GIS interaktif, verifikasi keaslian sertifikat, dan laporan transparansi publik."
      : "Digitizing endowment records: interactive GIS geo-mapping of wakaf land, certificate authenticity verification, public transparency reports, and legal registries.",
    chapters: lang === 'ID' ? [
      { title: "Pemetaan GIS Tanah Wakaf", desc: "Batas peta GIS interaktif, rincian bidang tanah, dan citra satelit tanah wakaf." },
      { title: "Registri Verifikasi Sertifikat", desc: "Pemeriksaan keaslian sertifikat tanah wakaf digital dan arsip akta akurat." },
      { title: "Portal Transparansi Publik", desc: "Laporan penggunaan donasi, status pengembangan tanah wakaf, dan audit publik." }
    ] : [
      { title: "Wakaf Land GIS Geo-Mapping", desc: "Interactive map boundaries, land parcel details, and satellite imagery overlays." },
      { title: "Certificate Verification Registry", desc: "Digital wakaf certificate authenticity checks and legal deed archives." },
      { title: "Public Transparency Portal", desc: "Donation utilization reports, land development status, and public audit metrics." }
    ],
    tech: ["Next.js", "Leaflet GIS", "PostGIS", "Tailwind"],
    color: "#1537a1"
  }
];

export default function ThreeUiShelfSection() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = getProjectsData(lang);
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="threeui-shelf-section" id="projects">
      <div className="threeui-shelf-header">
        <div className="threeui-pill-tag">
          <Layers size={14} /> {t('works_tag')}
        </div>
        <h2 className="threeui-shelf-title">{t('works_title')}</h2>
        <p className="threeui-shelf-desc">
          {t('works_desc')}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="project-filters">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          {t('works_filter_all')} ({projects.length})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'enterprise' ? 'active' : ''}`}
          onClick={() => setActiveFilter('enterprise')}
        >
          {t('works_filter_enterprise')}
        </button>
        <button
          className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
          onClick={() => setActiveFilter('mobile')}
        >
          {t('works_filter_mobile')}
        </button>
        <button
          className={`filter-btn ${activeFilter === 'logistics' ? 'active' : ''}`}
          onClick={() => setActiveFilter('logistics')}
        >
          {t('works_filter_logistics')}
        </button>
        <button
          className={`filter-btn ${activeFilter === 'cloud' ? 'active' : ''}`}
          onClick={() => setActiveFilter('cloud')}
        >
          {t('works_filter_cloud')}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="projects-bento-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            style={{ '--card-accent': project.color }}
          >
            <div>
              <div className="card-top">
                <span className="card-vol-badge">{project.vol}</span>
                <span className="card-discipline-tag">{project.discipline}</span>
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-deck">{project.deck}</p>

              <div className="card-chapters">
                {project.chapters.slice(0, 2).map((chap, idx) => (
                  <div key={idx} className="chapter-item">
                    <span className="chapter-dot" style={{ background: project.color }} />
                    <span>{chap.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-bottom">
              <div className="card-tech-tags">
                {project.tech.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="tech-pill">{t}</span>
                ))}
              </div>
              <button
                className="btn-detail"
                onClick={() => setSelectedProject(project)}
              >
                {t('works_btn_detail')} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Case Study Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>

            <span className="modal-header-badge">{selectedProject.vol} · {selectedProject.category.toUpperCase()}</span>
            <h2 className="modal-title">{selectedProject.title}</h2>
            <p className="modal-discipline">{selectedProject.discipline}</p>
            <p className="card-deck" style={{ fontSize: '1rem', color: 'rgba(244, 238, 230, 0.85)' }}>{selectedProject.deck}</p>

            <h4 className="modal-section-title">{t('works_modal_modules')}</h4>
            {selectedProject.chapters.map((chap, idx) => (
              <div key={idx} className="modal-chapter-card">
                <div className="modal-chapter-title">Modul 0{idx + 1}: {chap.title}</div>
                <div className="modal-chapter-desc">{chap.desc}</div>
              </div>
            ))}

            <h4 className="modal-section-title">{t('works_modal_tech')}</h4>
            <div className="card-tech-tags" style={{ gap: '0.6rem', marginBottom: '1.5rem' }}>
              {selectedProject.tech.map((t, idx) => (
                <span key={idx} className="tech-pill" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', background: 'rgba(200, 112, 70, 0.15)', color: '#ffffff' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
