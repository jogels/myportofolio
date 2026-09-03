import React, { useState, useEffect } from 'react';
import { Layers, ArrowRight, X, Smartphone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import "./ThreeUiShelfSection.css";

const getProjectsData = (lang) => [
  {
    id: "gymmembership",
    vol: "VOL. 01",
    title: lang === 'ID' ? "Sistem Manajemen Gym & Membership" : "Gym & Membership Management System",
    discipline: lang === 'ID' ? "Web Dashboard & App E-Membership" : "Web Dashboard & E-Membership App",
    category: "enterprise",
    deck: lang === 'ID'
      ? "Sistem terpadu (Website & Mobile App) untuk manajemen kunjungan member gym: presensi check-in QR instan, otomatisasi durasi masa aktif keanggotaan, pengingat perpanjangan via WhatsApp, booking personal trainer, dan analitik jam ramai gym."
      : "Unified Web & Mobile platform for gym management: real-time QR member check-in, automated membership expiry duration tracking, WhatsApp auto-renewal alerts, personal trainer booking, and peak-hour visit analytics.",
    chapters: lang === 'ID' ? [
      { title: "Otomatisasi Masa Aktif & Durasi Member", desc: "Kalkulasi tanggal kadaluarsa keanggotaan otomatis, fitur jeda/freeze paket, dan pengingat perpanjangan otomatis via WhatsApp." },
      { title: "Presensi Check-In QR & E-Membership Mobile", desc: "Pemindaian QR e-membership card instan di pintu masuk gym, log kedatangan member, dan validasi kuota kunjungan harian." },
      { title: "Web Dashboard Admin & Booking Trainer", desc: "Grafik analitik jam ramai kunjungan (peak hours), rekap pendapatan iuran bulanan, dan reservasi jadwal personal trainer." }
    ] : [
      { title: "Automated Membership Duration & Expiry", desc: "Automated membership expiry countdown, subscription freeze/pause, and WhatsApp auto-renewal notifications." },
      { title: "Mobile E-Card & QR Gate Check-In", desc: "Instant QR code e-card scanning at gym turnstiles, member arrival logs, and daily access guards." },
      { title: "Web Admin Dashboard & Trainer Booking", desc: "Peak hour visit analytics, monthly revenue reporting, and personal trainer appointment booking." }
    ],
    tech: ["React", "Next.js", "React Native", "Node.js", "PostgreSQL", "WhatsApp API"],
    color: "#ec4899"
  },
  {
    id: "erp",
    vol: "VOL. 02",
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
    vol: "VOL. 03",
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
    vol: "VOL. 04",
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
    vol: "VOL. 05",
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
    vol: "VOL. 06",
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
    vol: "VOL. 07",
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
    vol: "VOL. 08",
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
    vol: "VOL. 09",
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
    vol: "VOL. 10",
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
    vol: "VOL. 11",
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
    vol: "VOL. 12",
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
    tech: ["React", "Node.js", "Vimeo API", "PostgreSQL"],
    color: "#c83222"
  },
  {
    id: "tourbooking",
    vol: "VOL. 13",
    title: lang === 'ID' ? "Aplikasi Booking Tour & Travel" : "Tour Booking & Travel App",
    discipline: lang === 'ID' ? "Platform Reservasi & E-Invoice" : "Reservation & E-Invoice Platform",
    category: "mobile",
    deck: lang === 'ID'
      ? "Sistem booking tour terintegrasi: pemilihan paket wisata, pengisian data pemesan, pembayaran online, notifikasi invoice ke email admin/owner, dan receipt ke email customer."
      : "End-to-end tour booking engine with package selection, customer detail capture, online payment, admin booking email alert, and customer e-receipt.",
    chapters: lang === 'ID' ? [
      { title: "Katalog Tour & Formulir Detail", desc: "Pemilihan paket destinasi wisata interaktif, tanggal keberangkatan, dan pengisian identitas pemesan." },
      { title: "Payment Gateway & Webhook", desc: "Integrasi pembayaran online (QRIS/VA/Kartu), konfirmasi transaksi otomatis, dan status booking real-time." },
      { title: "Notifikasi Email Invoice Ganda", desc: "Pengiriman otomatis invoice booking ke email admin (Owner) dan e-receipt tanda bukti ke email customer." }
    ] : [
      { title: "Tour Catalog & Detail Capture", desc: "Interactive tour destination selection, travel dates picker, and customer details capture form." },
      { title: "Payment Gateway & Webhook", desc: "Online payment integration (QRIS/VA/Credit Card), instant transaction webhook, and booking status updates." },
      { title: "Dual Email Invoice Dispatch", desc: "Automated dispatch of booking notifications to admin email and official e-receipts to customer email." }
    ],
    tech: ["Next.js", "Node.js", "Nodemailer / Resend", "Midtrans"],
    color: "#059669"
  }
];

const renderAppMockContent = (project, lang, erpMode, setErpMode, erpState, setErpState, volJoined, setVolJoined, volDonation, setVolDonation, ticketState, setTicketState, bookingState, setBookingState, bookingSlot, setBookingSlot, serviceState, setServiceState, selectedTechnician, setSelectedTechnician, kosCreated, setKosCreated, roomStates, setRoomStates, transitState, setTransitState, taskState, setTaskState, petState, setPetState, surveyState, setSurveyState, surveyRating, setSurveyRating, selectedWakafRow, setSelectedWakafRow, tourStep, setTourStep, selectedTourPkg, setSelectedTourPkg, gymStep, setGymStep) => {
  const isID = lang === 'ID';
  switch (project.id) {
    case 'gymmembership': {
      const step = gymStep || 'status';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4">
            
            {/* Step Indicator Header */}
            <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2 flex items-center justify-between">
              <span className="text-[7.5px] text-pink-400 font-bold uppercase tracking-wider">
                {step === 'status' ? (isID ? '1. Kartu & Durasi Member' : '1. Member Card & Duration')
                  : step === 'scan' ? (isID ? '2. Presensi Check-In QR' : '2. QR Check-In Gate')
                  : step === 'expiry' ? (isID ? '3. Pengingat WhatsApp' : '3. WhatsApp Renewal Alert')
                  : (isID ? '4. Perpanjangan Sukses' : '4. Membership Renewed')}
              </span>
              <span className="text-[7.5px] text-neutral-400">#GYM-8910</span>
            </div>

            {/* Step 1: E-Membership Card & Duration Status */}
            {step === 'status' && (
              <div className="bg-gradient-to-br from-pink-950/40 to-neutral-900 border border-pink-500/30 rounded-xl p-2.5 flex flex-col gap-2 shadow-[0_4px_12px_rgba(236,72,153,0.15)]">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded font-bold uppercase">
                    E-MEMBERSHIP GOLD
                  </span>
                  <span className="text-[7.5px] text-green-400 font-bold">🟢 AKTIF</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] font-bold text-white">Budi Santoso</p>
                  <span className="text-[7.5px] text-neutral-400">ID: GYM-MEMBER-094</span>
                </div>

                <div className="bg-neutral-950/70 p-2 rounded-lg border border-neutral-800 flex flex-col gap-1">
                  <div className="flex justify-between text-[8px]">
                    <span className="text-neutral-400">{isID ? 'Sisa Masa Aktif:' : 'Remaining Duration:'}</span>
                    <span className="font-extrabold text-pink-400">24 Hari</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-pink-500 h-full w-[80%]" />
                  </div>
                  <span className="text-[6.5px] text-neutral-400 text-right">{isID ? 'Kadaluarsa: 27 Sep 2026' : 'Expires: 27 Sep 2026'}</span>
                </div>
              </div>
            )}

            {/* Step 2: QR Check-In Gate */}
            {step === 'scan' && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-2 items-center text-center py-2">
                <div className="w-14 h-14 bg-white p-1.5 rounded-lg flex items-center justify-center border border-pink-500/50 shadow-md">
                  <div className="w-full h-full bg-neutral-900 rounded flex items-center justify-center text-[18px]">
                    📱
                  </div>
                </div>
                <span className="text-[9.5px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                  ✓ {isID ? 'CHECK-IN BERHASIL' : 'CHECK-IN SUCCESS'}
                </span>
                <p className="text-[7.5px] text-neutral-400 max-w-[170px]">
                  {isID ? 'Gerbang gym terbuka. Jam kedatangan dicatat otomatis ke Web Admin Dashboard.' : 'Gate opened. Visit timestamp logged into Web Admin Dashboard.'}
                </p>
              </div>
            )}

            {/* Step 3: WhatsApp Auto Renewal Notification */}
            {step === 'expiry' && (
              <div className="bg-neutral-900/90 border border-amber-500/40 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(245,158,11,0.15)]">
                <div className="flex justify-between items-center">
                  <span className="text-[7.5px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    💬 WHATSAPP BOT AUTO-ALERT
                  </span>
                  <span className="text-[7.5px] text-amber-400 font-bold">3 HARI LAGI</span>
                </div>

                <div className="bg-neutral-950/80 p-2 rounded-lg border border-neutral-800 text-[7.5px] text-neutral-300 flex flex-col gap-1">
                  <p className="font-semibold text-amber-200">
                    {isID ? 'Halo Budi! Masa aktif membership Gym Anda tersisa 3 hari lagi (H-3).' : 'Hi Budi! Your Gym membership expires in 3 days.'}
                  </p>
                  <p className="text-neutral-400">
                    {isID ? 'Klik tombol di bawah untuk perpanjang otomatis tanpa harus antre di kasir.' : 'Click below to instantly auto-renew without queueing.'}
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Renewed Success */}
            {step === 'renewed' && (
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-2.5 flex flex-col gap-2 items-center text-center py-3">
                <span className="text-[20px]">🎉</span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">
                  {isID ? 'MEMBERSHIP DIPERPANJANG!' : 'MEMBERSHIP RENEWED!'}
                </span>
                <span className="text-[11px] font-extrabold text-white bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                  +30 HARI AKTIF (S/D 27 OKT)
                </span>
                <p className="text-[7.5px] text-neutral-400 max-w-[170px]">
                  {isID ? 'Sistem otomatis memperbarui masa aktif member di Web Dashboard & Mobile App.' : 'System updated member validity on Web Dashboard & Mobile App.'}
                </p>
              </div>
            )}

          </div>

          {/* Interactive Action Button */}
          <button
            type="button"
            onClick={() => {
              if (step === 'status') setGymStep('scan');
              else if (step === 'scan') setGymStep('expiry');
              else if (step === 'expiry') setGymStep('renewed');
              else setGymStep('status');
            }}
            className="w-full py-2.5 rounded-xl text-[9px] font-bold bg-pink-600 hover:bg-pink-500 text-white transition-all text-center uppercase tracking-wider shadow-lg shadow-pink-600/20"
          >
            {step === 'status'
              ? (isID ? '1. Simulasi QR Check-In' : '1. Simulate QR Check-In')
              : step === 'scan'
              ? (isID ? '2. Tes Notifikasi H-3 WA' : '2. Test WA H-3 Alert')
              : step === 'expiry'
              ? (isID ? '3. Perpanjang (Auto-Renew)' : '3. Auto-Renew Member')
              : (isID ? '4. Reset Flow Simulasi' : '4. Reset Gym Demo')}
          </button>
        </div>
      );
    }
    case 'erp': {
      const attendanceState = erpState || 'idle';
      const isInside = erpMode === 'inside';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4">
            
            {/* Mode Selector for Testing */}
            <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-1.5 flex flex-col gap-1">
              <span className="text-[6.5px] text-neutral-500 text-center tracking-wider uppercase font-bold">
                {isID ? 'TES MODE LOKASI' : 'TEST LOCATION MODE'}
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setErpMode('inside');
                    setErpState('idle');
                  }}
                  className={`flex-1 py-1 rounded text-[7.5px] font-bold border transition-all ${
                    isInside
                      ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_6px_rgba(34,197,94,0.15)]'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                  }`}
                >
                  {isID ? 'Dalam Radius' : 'Inside Radius'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setErpMode('outside');
                    setErpState('idle');
                  }}
                  className={`flex-1 py-1 rounded text-[7.5px] font-bold border transition-all ${
                    !isInside
                      ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_6px_rgba(239,68,68,0.15)]'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                  }`}
                >
                  {isID ? 'Luar Radius' : 'Outside Radius'}
                </button>
              </div>
            </div>

            {/* Attendance Status Card */}
            <div className={`border rounded-xl p-2.5 flex items-center justify-between transition-all duration-300 ${
              attendanceState === 'idle'
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                : attendanceState === 'success'
                ? 'bg-green-500/15 border-green-500/40 text-green-300 shadow-[0_4px_12px_rgba(34,197,94,0.1)]'
                : 'bg-red-500/15 border-red-500/40 text-red-300 shadow-[0_4px_12px_rgba(239,68,68,0.1)]'
            }`}>
              <div className="flex flex-col gap-0.5">
                <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider">
                  {isID ? 'STATUS ABSEN' : 'ATTENDANCE STATUS'}
                </span>
                <span className="text-[10px] font-bold">
                  {attendanceState === 'idle'
                    ? (isID ? 'Siap Absen Masuk' : 'Ready to Clock In')
                    : attendanceState === 'success'
                    ? (isID ? 'Check-In Sukses' : 'Clocked In')
                    : (isID ? 'Check-In Gagal' : 'Clock-In Failed')}
                </span>
                <span className="text-[7.5px] text-neutral-400 mt-0.5">
                  {attendanceState === 'idle'
                    ? (isInside ? (isID ? '📍 Lokasi Terverifikasi' : '📍 Location Verified') : (isID ? '❌ Di luar Geofence' : '❌ Out of Geofence'))
                    : attendanceState === 'success'
                    ? (isID ? '📍 Kantor Pusat (10m)' : '📍 HQ (10m)')
                    : (isID ? '📍 Jarak: 1.2km (Maks: 100m)' : '📍 Dist: 1.2km (Max: 100m)')}
                </span>
              </div>
              <div className="flex flex-col items-end">
                {attendanceState === 'success' ? (
                  <span className="text-[8px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-bold">08:02</span>
                ) : attendanceState === 'failed' ? (
                  <span className="text-[8px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">ERR</span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                )}
              </div>
            </div>

            {/* Travel SPPD Card */}
            <div className="bg-neutral-800/80 border border-neutral-700/50 rounded-xl p-2.5 flex flex-col gap-0.5">
              <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider">{isID ? 'PENGAJUAN SPPD' : 'OFFICIAL TRAVEL'}</span>
              <p className="text-[9.5px] font-bold text-neutral-200 truncate">Jakarta Conference #48</p>
              <span className="text-[7.5px] text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded mt-1 inline-block w-max font-medium">
                {isID ? 'Menunggu Persetujuan' : 'Pending Approval'}
              </span>
            </div>

          </div>

          {/* Large Absensi Action Button */}
          <button
            type="button"
            onClick={() => {
              if (attendanceState === 'success') {
                setErpState('idle');
              } else {
                setErpState(isInside ? 'success' : 'failed');
              }
            }}
            className={`w-full py-2 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              attendanceState === 'idle'
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 hover:scale-[1.02]'
                : attendanceState === 'success'
                ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/20 hover:scale-[1.02]'
            }`}
          >
            {attendanceState === 'idle'
              ? (isID ? 'Absen Masuk' : 'Clock In')
              : attendanceState === 'success'
              ? (isID ? 'Reset Absensi' : 'Reset Attendance')
              : (isID ? 'Coba Lagi' : 'Try Again')}
          </button>
        </div>
      );
    }
    case 'volunteer': {
      const donationGoal = 15000000;
      const currentDonation = volDonation;
      const percentage = Math.min(Math.round((currentDonation / donationGoal) * 100), 100);
      
      const volEvents = [
        {
          id: 0,
          title: isID ? "Bersih-Bersih Ciliwung" : "Ciliwung Clean-Up",
          date: "12 Sep 2026",
          desc: isID ? "Aksi bersama membersihkan tumpukan sampah plastik di aliran sungai Ciliwung." : "Joint action to clean up plastic waste piles along Ciliwung river stream."
        },
        {
          id: 1,
          title: isID ? "Reboisasi Merapi" : "Merapi Reforestation",
          date: "19 Sep 2026",
          desc: isID ? "Penanaman bibit pohon di lereng Gunung Merapi untuk memulihkan ekosistem hijau." : "Planting tree saplings on Mount Merapi to restore green ecosystems."
        },
        {
          id: 2,
          title: isID ? "Bagi Makanan Gratis" : "Food Sharing Initiative",
          date: "26 Sep 2026",
          desc: isID ? "Membagikan makanan gratis untuk warga prasejahtera di sekitar wilayah Jakarta." : "Distributing free meals to underprivileged families in Jakarta regions."
        }
      ];

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4 overflow-hidden">
            
            {/* Slidable Events Container */}
            <div className="flex flex-col gap-1">
              <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">
                {isID ? 'EVENT RELAWAN AKTIF (GESER)' : 'ACTIVE EVENTS (SLIDE)'}
              </span>
              
              {/* Horizontal Scrollable Row */}
              <div 
                className="flex gap-2 overflow-x-auto snap-x snap-mandatory w-full py-1"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {volEvents.map((ev) => {
                  const isJoined = Array.isArray(volJoined) ? volJoined[ev.id] : false;
                  return (
                    <div 
                      key={ev.id}
                      className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex flex-col gap-1.5 min-w-[185px] w-[185px] snap-center flex-shrink-0"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[7px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">
                          {isID ? 'KAMPANYE' : 'CAMPAIGN'}
                        </span>
                        <span className="text-[7px] text-neutral-400">📅 {ev.date}</span>
                      </div>
                      <p className="text-[9.5px] font-bold text-neutral-100 truncate">{ev.title}</p>
                      <p className="text-[7.5px] text-neutral-400 leading-snug h-[32px] overflow-hidden text-ellipsis">
                        {ev.desc}
                      </p>
                      
                      {/* Join Action inside Card */}
                      <div className="flex justify-between items-center mt-0.5 pt-1.5 border-t border-neutral-800/40">
                        <span className="text-[7px] text-neutral-300 font-medium">
                          {isJoined 
                            ? (isID ? '✓ Anda bergabung' : '✓ You joined') 
                            : (isID ? '150 Relawan' : '150 Volunteers')}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (Array.isArray(volJoined)) {
                              const newJoined = [...volJoined];
                              newJoined[ev.id] = !newJoined[ev.id];
                              setVolJoined(newJoined);
                            }
                          }}
                          className={`px-2 py-0.5 rounded text-[7px] font-bold border transition-all ${
                            isJoined
                              ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_4px_rgba(16,185,129,0.2)]'
                              : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-emerald-500/40'
                          }`}
                        >
                          {isJoined ? (isID ? 'Keluar' : 'Leave') : (isID ? 'Gabung' : 'Join')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Donation & Impact Card */}
            <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
              <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">
                {isID ? 'DONASI & DAMPAK GLOBAL' : 'DONATION & GLOBAL IMPACT'}
              </span>
              <div className="flex justify-between text-[9px] font-bold text-neutral-200">
                <span>Rp {currentDonation.toLocaleString('id-ID')}</span>
                <span className="text-neutral-400">Target Rp 15.000.000</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-[7.5px] text-neutral-400">
                <span>{percentage}% {isID ? 'Terkumpul' : 'Collected'}</span>
                <span className="text-emerald-400 font-bold">📍 {isID ? 'Dampak: 1.2 Ton Sampah' : 'Impact: 1.2 Tons Trash'}</span>
              </div>
            </div>

            {/* Bottom Donation Action Button */}
            <button
              type="button"
              onClick={() => {
                if (currentDonation >= donationGoal) {
                  setVolDonation(250000);
                } else {
                  setVolDonation(currentDonation + 500000);
                }
              }}
              className="w-full py-2 rounded-xl text-[9px] font-bold bg-neutral-800 border border-neutral-700 text-neutral-300 hover:border-emerald-500/40 transition-all text-center uppercase tracking-wider shadow-lg"
            >
              {currentDonation >= donationGoal 
                ? (isID ? 'Reset Donasi Global' : 'Reset Global Donation') 
                : (isID ? 'Donasi Rp 500K' : 'Donate Rp 500K')}
            </button>

          </div>
          
          {/* Footnote instruction */}
          <div className="text-[7px] text-neutral-500 text-center py-1 bg-neutral-900/30 rounded-lg">
            {isID ? 'Simulasi: Geser kartu & klik Gabung untuk mendaftar event' : 'Simulation: Slide cards & click Join to register events'}
          </div>
        </div>
      );
    }
    case 'ticketing': {
      const isIdle = ticketState === 'idle';
      const isClaiming = ticketState === 'claiming';
      const isClaimed = ticketState === 'claimed';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2.5 mt-4">
            
            {/* Ticket Card Container */}
            <div className={`border rounded-xl p-3 flex flex-col items-center text-center transition-all duration-300 ${
              isIdle 
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400' 
                : isClaiming
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 animate-pulse'
                : 'bg-indigo-950/40 border-indigo-500/30 text-neutral-200 shadow-[0_4px_15px_rgba(99,102,241,0.15)]'
            }`}>
              <span className="text-[7.5px] uppercase tracking-wider font-bold">
                {isID ? 'TIKET RESMI KONSER' : 'OFFICIAL CONCERT TICKET'}
              </span>
              
              {isIdle && (
                <div className="py-6 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[14px]">🎫</div>
                  <p className="text-[10px] font-bold text-neutral-300">{isID ? 'Belum Ada Tiket Aktif' : 'No Active Ticket'}</p>
                  <p className="text-[7.5px] text-neutral-500 max-w-[140px]">
                    {isID ? 'Silakan beli tiket konser Arctic Monkeys di bawah.' : 'Purchase Arctic Monkeys concert ticket below.'}
                  </p>
                </div>
              )}

              {isClaiming && (
                <div className="py-6 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-t-amber-500 border-neutral-800 animate-spin"></div>
                  <p className="text-[9.5px] font-bold text-amber-400">{isID ? 'Menghubungi Server VA...' : 'Verifying VA Payment...'}</p>
                  <p className="text-[7px] text-neutral-500">{isID ? 'Memvalidasi hold kursi dinamis' : 'Validating dynamic seat locks'}</p>
                </div>
              )}

              {isClaimed && (
                <div className="flex flex-col items-center w-full">
                  <p className="text-[11px] font-bold text-neutral-100 mt-1">Arctic Monkeys Live</p>
                  <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
                    {isID ? 'VIP AREA · KURSI A-12' : 'VIP AREA · SEAT A-12'}
                  </span>
                  
                  {/* High fidelity mock QR Code SVG (unscannable vector graphic) */}
                  <div className="bg-white p-1.5 rounded-lg mt-3 w-max mx-auto shadow-md border border-neutral-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" className="w-[60px] h-[60px] fill-neutral-950">
                      {/* Top-left finder */}
                      <rect x="0" y="0" width="7" height="7" />
                      <rect x="1" y="1" width="5" height="5" fill="white" />
                      <rect x="2" y="2" width="3" height="3" />
                      {/* Top-right finder */}
                      <rect x="22" y="0" width="7" height="7" />
                      <rect x="23" y="1" width="5" height="5" fill="white" />
                      <rect x="24" y="2" width="3" height="3" />
                      {/* Bottom-left finder */}
                      <rect x="0" y="22" width="7" height="7" />
                      <rect x="1" y="23" width="5" height="5" fill="white" />
                      <rect x="2" y="24" width="3" height="3" />
                      {/* Random pixels */}
                      <rect x="9" y="0" width="1" height="1" /><rect x="11" y="0" width="2" height="1" /><rect x="15" y="0" width="1" height="1" /><rect x="19" y="0" width="2" height="1" />
                      <rect x="8" y="2" width="2" height="1" /><rect x="13" y="2" width="1" height="2" /><rect x="18" y="2" width="1" height="1" />
                      <rect x="10" y="4" width="1" height="2" /><rect x="14" y="4" width="2" height="1" /><rect x="20" y="4" width="1" height="1" />
                      <rect x="8" y="6" width="1" height="1" /><rect x="12" y="6" width="3" height="1" /><rect x="17" y="6" width="2" height="1" />
                      <rect x="0" y="9" width="2" height="1" /><rect x="4" y="9" width="1" height="1" /><rect x="9" y="9" width="3" height="2" /><rect x="15" y="9" width="1" height="1" /><rect x="23" y="9" width="2" height="1" /><rect x="27" y="9" width="1" height="1" />
                      <rect x="2" y="11" width="1" height="1" /><rect x="7" y="11" width="1" height="2" /><rect x="13" y="11" width="1" height="1" /><rect x="19" y="11" width="2" height="1" /><rect x="25" y="11" width="1" height="1" />
                      <rect x="10" y="13" width="2" height="1" /><rect x="16" y="13" width="1" height="1" /><rect x="21" y="13" width="2" height="2" /><rect x="26" y="13" width="1" height="1" />
                      <rect x="0" y="15" width="1" height="1" /><rect x="4" y="15" width="2" height="1" /><rect x="8" y="15" width="1" height="2" /><rect x="14" y="15" width="2" height="1" />
                      <rect x="18" y="16" width="2" height="1" /><rect x="24" y="16" width="1" height="1" /><rect x="28" y="16" width="1" height="1" />
                      <rect x="10" y="18" width="1" height="2" /><rect x="15" y="18" width="2" height="1" /><rect x="20" y="18" width="1" height="1" />
                      <rect x="9" y="20" width="2" height="1" /><rect x="13" y="20" width="1" height="1" /><rect x="17" y="20" width="2" height="1" /><rect x="23" y="20" width="1" height="2" />
                      <rect x="8" y="23" width="2" height="1" /><rect x="12" y="23" width="1" height="1" /><rect x="15" y="23" width="3" height="1" /><rect x="20" y="23" width="1" height="1" />
                      <rect x="10" y="26" width="1" height="2" /><rect x="14" y="26" width="2" height="1" /><rect x="18" y="26" width="2" height="2" /><rect x="26" y="26" width="2" height="1" />
                    </svg>
                  </div>
                  <span className="text-[7px] text-neutral-400 mt-2 font-mono">CODE: AM-938210</span>
                </div>
              )}
            </div>
          </div>

          {/* Action trigger button */}
          <button
            type="button"
            disabled={isClaiming}
            onClick={() => {
              if (isClaimed) {
                setTicketState('idle');
              } else {
                setTicketState('claiming');
                setTimeout(() => {
                  setTicketState('claimed');
                }, 1200);
              }
            }}
            className={`w-full py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              isIdle
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-650/20 hover:scale-[1.02]'
                : isClaiming
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
            }`}
          >
            {isIdle
              ? (isID ? 'Beli Tiket (Rp 1.500.000)' : 'Buy Ticket (Rp 1,500,000)')
              : isClaiming
              ? (isID ? 'Memproses VA...' : 'Processing VA...')
              : (isID ? 'Batalkan Tiket' : 'Cancel Ticket')}
          </button>
        </div>
      );
    }
    case 'transit': {
      const isIdle = transitState === 'idle';
      const isSearching = transitState === 'searching';
      const isMatched = transitState === 'matched';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2.5 mt-4">
            
            {/* Route Detail Card */}
            <div className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex flex-col gap-1">
              <span className="text-[7.5px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase w-max">
                {isID ? 'PERJALANAN INDIVIDU' : 'RIDE BOOKING'}
              </span>
              <div className="flex flex-col gap-0.5 mt-1.5">
                <p className="text-[9.5px] text-neutral-300 font-bold truncate">📍 {isID ? 'Lokasi Saya' : 'My Location'}</p>
                <p className="text-[9.5px] text-neutral-400 font-medium truncate">🏁 {isID ? 'Tujuan: Stasiun Senen' : 'Dest: Senen Station'}</p>
              </div>
              <p className="text-[7.5px] text-neutral-500 mt-1">
                {isID ? 'Estimasi Tarif: Rp 25.000' : 'Est. Fare: Rp 25,000'}
              </p>
            </div>

            {/* Step 1: Searching for Driver */}
            {isSearching && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-4 flex flex-col items-center gap-2 text-center relative overflow-hidden h-[90px]">
                {/* Searching radar concentric rings */}
                <div className="absolute w-20 h-20 rounded-full border border-amber-500/20 animate-ping"></div>
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-[10px] animate-pulse">🚕</div>
                <p className="text-[9px] font-bold text-amber-400 mt-1">{isID ? 'Mencari Driver Terdekat...' : 'Finding Nearest Ride...'}</p>
                <p className="text-[7px] text-neutral-500">{isID ? 'Menghubungi armada taksi aktif' : 'Contacting active taxi pool'}</p>
              </div>
            )}

            {/* Step 2: Driver Matched */}
            {isMatched && (
              <div className="bg-green-950/20 border border-green-500/30 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(34,197,94,0.1)]">
                <div className="flex justify-between items-center">
                  <span className="text-[7.5px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded font-bold uppercase">
                    {isID ? 'DRIVER DITEMUKAN' : 'DRIVER MATCHED'}
                  </span>
                  <span className="text-[7.5px] text-green-400 font-bold">ETA: 4m</span>
                </div>
                
                <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/40 flex items-center justify-between mt-0.5">
                  <div className="flex flex-col">
                    <p className="text-[9.5px] font-bold text-neutral-200">Budi Sudarsono</p>
                    <span className="text-[7.5px] text-neutral-400">Toyota Avanza · B 1234 ABC</span>
                  </div>
                  <span className="text-[9px] text-yellow-400 font-bold">⭐ 4.8</span>
                </div>
              </div>
            )}

          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            disabled={isSearching}
            onClick={() => {
              if (isMatched) {
                setTransitState('idle');
              } else {
                setTransitState('searching');
                setTimeout(() => {
                  setTransitState('matched');
                }, 1500);
              }
            }}
            className={`w-full py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              isIdle
                ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-amber-500/20 hover:scale-[1.02]'
                : isSearching
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
            }`}
          >
            {isIdle
              ? (isID ? 'Pesan Taksi (Rp 25.000)' : 'Order Taxi (Rp 25,000)')
              : isSearching
              ? (isID ? 'Mencari...' : 'Searching...')
              : (isID ? 'Batalkan Perjalanan' : 'Cancel Ride')}
          </button>
        </div>
      );
    }
    case 'scheduler': {
      const isIdle = taskState === 'idle';
      const isRunning = taskState === 'running';
      const isDone = taskState === 'done';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4">
            
            {/* Engine Status Card */}
            <div className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">{isID ? 'STATUS ENGINE' : 'ENGINE STATUS'}</span>
                <p className="text-[9.5px] font-bold text-neutral-200 mt-0.5">{isID ? 'Penjadwal Otomatis' : 'Automated Scheduler'}</p>
              </div>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${isRunning ? 'bg-cyan-500/20 text-cyan-400 animate-pulse' : 'bg-green-500/20 text-green-400'}`}>
                {isRunning ? (isID ? 'MEMPROSES' : 'RUNNING') : 'ACTIVE'}
              </span>
            </div>

            {/* List of Tasks */}
            <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
              <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">{isID ? 'DAFTAR PEKERJAAN' : 'WORKFLOW JOBS'}</span>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center bg-neutral-950/40 p-1.5 rounded border border-neutral-850">
                  <span className="text-[8.5px] text-neutral-300">Job #101: Backup DB</span>
                  <span className={`text-[7.5px] font-bold ${isDone ? 'text-green-400' : isRunning ? 'text-cyan-400 animate-pulse' : 'text-neutral-500'}`}>
                    {isDone ? 'Sukses ✓' : isRunning ? 'Running' : 'Ready'}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-neutral-950/40 p-1.5 rounded border border-neutral-850">
                  <span className="text-[8.5px] text-neutral-300">Job #102: Send Invoices</span>
                  <span className={`text-[7.5px] font-bold ${isDone ? 'text-green-400' : isRunning ? 'text-cyan-400 animate-pulse' : 'text-neutral-500'}`}>
                    {isDone ? 'Sukses ✓' : isRunning ? 'Running' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            disabled={isRunning}
            onClick={() => {
              if (isDone) {
                setTaskState('idle');
              } else {
                setTaskState('running');
                setTimeout(() => {
                  setTaskState('done');
                }, 1500);
              }
            }}
            className={`w-full py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              isIdle
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-650/20 hover:scale-[1.02]'
                : isRunning
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
            }`}
          >
            {isIdle
              ? (isID ? 'Jalankan Alur Kerja' : 'Run Workflow')
              : isRunning
              ? (isID ? 'Memproses Alur...' : 'Processing Jobs...')
              : (isID ? 'Reset Alur Kerja' : 'Reset Workflow')}
          </button>
        </div>
      );
    }
    case 'petshop': {
      const isIdle = petState === 'idle';
      const isBooking = petState === 'booking';
      const isBooked = petState === 'booked';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2.5 mt-4">
            
            {/* Pet Profile Header */}
            <div className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-[16px]">🐱</div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-neutral-100">Milo</p>
                <span className="text-[7.5px] text-neutral-400">
                  {isID ? 'Kucing Persia · Umur 2 Tahun' : 'Persian Cat · 2 Years'}
                </span>
              </div>
            </div>

            {/* Selection/Status Screen */}
            {isIdle && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
                <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">
                  {isID ? 'PILIH TREATMENT MILO' : 'SELECT TREATMENT'}
                </span>
                
                <div className="bg-neutral-950/40 p-2 rounded-lg border border-neutral-850 flex justify-between items-center text-[8.5px]">
                  <div className="flex flex-col">
                    <span className="font-bold text-neutral-200">{isID ? 'Grooming Lengkap Kucing' : 'Full Cat Grooming'}</span>
                    <span className="text-neutral-400">Rp 95.000</span>
                  </div>
                  <span className="text-pink-400 font-bold">★ Selected</span>
                </div>
              </div>
            )}

            {isBooking && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-5 flex flex-col items-center gap-2 text-center">
                <span className="text-xl animate-bounce">🐾</span>
                <p className="text-[9.5px] font-bold text-pink-400">{isID ? 'Menjadwalkan Slot Groomer...' : 'Booking Groomer...'}</p>
                <p className="text-[7px] text-neutral-500">{isID ? 'Menghubungi salon & mencocokkan waktu' : 'Syncing salon schedules'}</p>
              </div>
            )}

            {isBooked && (
              <div className="bg-pink-950/20 border border-pink-500/30 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(219,39,119,0.1)]">
                <div className="flex justify-between items-center">
                  <span className="text-[7.5px] bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-bold uppercase">
                    {isID ? 'BOOKING BERHASIL' : 'BOOKING CONFIRMED'}
                  </span>
                  <span className="text-[7.5px] text-pink-400 font-bold">🐾 MILO</span>
                </div>
                
                <div className="bg-neutral-900/40 p-2 rounded-lg border border-neutral-800/40 flex flex-col gap-1">
                  <p className="text-[9px] font-bold text-neutral-200">{isID ? 'Grooming Lengkap Kucing' : 'Full Cat Grooming'}</p>
                  <div className="flex justify-between text-[7.5px] text-neutral-400">
                    <span>🕒 {isID ? 'Besok Jam 14:00' : 'Tomorrow 14:00'}</span>
                    <span>👤 Groomer: Kak Roni</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            disabled={isBooking}
            onClick={() => {
              if (isBooked) {
                setPetState('idle');
              } else {
                setPetState('booking');
                setTimeout(() => {
                  setPetState('booked');
                }, 1500);
              }
            }}
            className={`w-full py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              isIdle
                ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-pink-600/20 hover:scale-[1.02]'
                : isBooking
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
            }`}
          >
            {isIdle
              ? (isID ? 'Pesan Grooming Milo' : 'Book Grooming Session')
              : isBooking
              ? (isID ? 'Menjadwalkan...' : 'Booking Slot...')
              : (isID ? 'Reset Simulasi' : 'Reset Simulation')}
          </button>
        </div>
      );
    }
    case 'booking': {
      const isIdle = bookingState === 'idle';
      const isBooking = bookingState === 'booking';
      const isBooked = bookingState === 'booked';
      
      const slots = ["09:00", "11:00", "14:00"];
      const activeSlot = slots[bookingSlot] || slots[0];

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2.5 mt-4">
            
            {/* Doctor Profile Header */}
            <div className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[16px]">👩‍⚕️</div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-neutral-100">Dr. Clara Sitorus</p>
                <span className="text-[7.5px] text-neutral-400">
                  {isID ? 'Spesialis Jantung · 📍 Klinik A' : 'Cardiologist · 📍 Clinic A'}
                </span>
              </div>
            </div>

            {/* Main Interactive Screen Area */}
            {isIdle && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
                <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">
                  {isID ? 'PILIH SLOT WAKTU (KLIK)' : 'SELECT TIME SLOT (CLICK)'}
                </span>
                
                {/* Time Slots Grid */}
                <div className="grid grid-cols-3 gap-1.5">
                  {slots.map((sl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBookingSlot(idx)}
                      className={`py-1.5 rounded-lg text-[9px] font-bold border transition-all text-center ${
                        bookingSlot === idx
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.2)]'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-blue-500/40'
                      }`}
                    >
                      {sl}
                    </button>
                  ))}
                </div>
                
                <span className="text-[7px] text-neutral-500 mt-1">
                  {isID ? '📍 Lokasi Zona Waktu: Jakarta (WIB)' : '📍 Timezone: Jakarta (WIB)'}
                </span>
              </div>
            )}

            {isBooking && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-6 flex flex-col items-center gap-2.5 text-center">
                <div className="w-5 h-5 border-2 border-t-blue-500 border-neutral-800 animate-spin rounded-full"></div>
                <p className="text-[9px] font-bold text-blue-400">{isID ? 'Menyinkronkan Kalender...' : 'Syncing Calendars...'}</p>
                <p className="text-[7px] text-neutral-500 max-w-[130px]">
                  {isID ? 'Memblokir slot jadwal di Google & Outlook Calendar...' : 'Locking slot availability on Google & Outlook...'}
                </p>
              </div>
            )}

            {isBooked && (
              <div className="bg-blue-950/20 border border-blue-500/30 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(59,130,246,0.1)]">
                <div className="flex justify-between items-center">
                  <span className="text-[7.5px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">
                    {isID ? 'KONFIRMASI JADWAL' : 'APPOINTMENT CONFIRMED'}
                  </span>
                  <span className="text-[7.5px] text-green-400 font-bold">✓ SYNCED</span>
                </div>
                
                <div className="bg-neutral-900/40 p-2 rounded-lg border border-neutral-800/40 flex flex-col gap-1">
                  <p className="text-[9.5px] font-bold text-neutral-200">Dr. Clara Sitorus</p>
                  <div className="flex justify-between text-[8px] text-neutral-400">
                    <span>🕒 {isID ? 'Waktu' : 'Schedule'}: {activeSlot} WIB</span>
                    <span>📅 {isID ? 'Besok' : 'Tomorrow'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5 mt-0.5">
                  <span className="text-[7px] text-neutral-400 flex items-center gap-1">
                    🟢 {isID ? 'Notifikasi Kalender Aktif' : 'Calendar Sync Active'}
                  </span>
                  <span className="text-[7px] text-neutral-400 flex items-center gap-1">
                    🟢 {isID ? 'WhatsApp Reminder Terjadwal (24 Jam)' : 'WhatsApp Reminder Set (24h)'}
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Action Action Button */}
          <button
            type="button"
            disabled={isBooking}
            onClick={() => {
              if (isBooked) {
                setBookingState('idle');
              } else {
                setBookingState('booking');
                setTimeout(() => {
                  setBookingState('booked');
                }, 1200);
              }
            }}
            className={`w-full py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              isIdle
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 hover:scale-[1.02]'
                : isBooking
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
            }`}
          >
            {isIdle
              ? (isID ? `Pesan Slot ${activeSlot}` : `Book Slot ${activeSlot}`)
              : isBooking
              ? (isID ? 'Pesan Slot...' : 'Booking Slot...')
              : (isID ? 'Reset Simulasi' : 'Reset Simulation')}
          </button>
        </div>
      );
    }
    case 'service': {
      const isUnpaid = serviceState === 'idle';
      const isPaid = serviceState === 'paid';
      const isDispatched = serviceState === 'dispatched';

      const technicians = [
        { name: "Ahmad Subarjo", rating: "4.9", dist: "1.2km", desc: isID ? "Spesialis AC & Kulkas" : "AC & Fridge Specialist" },
        { name: "Siti Rahma", rating: "4.8", dist: "2.4km", desc: isID ? "Spesialis Kelistrikan" : "Electrical Specialist" }
      ];

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4">
            
            {/* Service Ticket Detail Card */}
            <div className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-[7.5px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold uppercase">
                  {isID ? 'TIKET LAYANAN' : 'SERVICE TICKET'}
                </span>
                <span className="text-[7.5px] text-neutral-400">#SRV-9082</span>
              </div>
              <p className="text-[10px] font-bold text-neutral-200 mt-1">{isID ? 'Perbaikan AC Rusak' : 'AC Repair Service'}</p>
              <p className="text-[8px] text-neutral-400">{isID ? 'Biaya Jasa: Rp 150.000' : 'Service Fee: Rp 150,000'}</p>
            </div>

            {/* Step 1: Unpaid (Bayar ke aplikasi dulu) */}
            {isUnpaid && (
              <div className="bg-amber-500/10 border border-amber-500/35 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center py-4">
                <span className="text-[18px]">💳</span>
                <p className="text-[9.5px] font-bold text-amber-300">{isID ? 'Menunggu Pembayaran' : 'Awaiting Payment'}</p>
                <p className="text-[7.5px] text-neutral-400 max-w-[150px]">
                  {isID ? 'Silakan selesaikan pembayaran untuk mulai mencari teknisi terdekat.' : 'Please complete the payment to start matching nearby technicians.'}
                </p>
              </div>
            )}

            {/* Step 2: Paid (Pilih teknisi) */}
            {isPaid && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
                <span className="text-[7.5px] text-green-400 uppercase tracking-wider font-bold">
                  {isID ? 'PEMBAYARAN SUKSES ✓ PILIH TEKNISI' : 'PAYMENT SUCCESS ✓ CHOOSE TECH'}
                </span>
                
                {/* List of Techs */}
                <div className="flex flex-col gap-1.5">
                  {technicians.map((tech, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedTechnician(tech.name);
                        setServiceState('dispatched');
                      }}
                      className="w-full p-2 rounded-lg bg-neutral-800/60 border border-neutral-700/60 text-left hover:border-cyan-500/40 transition-all flex justify-between items-center"
                    >
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[8.5px] font-bold text-neutral-100">{tech.name}</p>
                        <span className="text-[7px] text-neutral-400">{tech.desc}</span>
                      </div>
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="text-[8px] text-yellow-400 font-bold">⭐ {tech.rating}</span>
                        <span className="text-[7px] text-neutral-400">📍 {tech.dist}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Dispatched (Teknisi datang ke titik lokasi) */}
            {isDispatched && (
              <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-2.5 flex flex-col gap-2 shadow-[0_4px_12px_rgba(6,182,212,0.15)]">
                <div className="flex justify-between items-center">
                  <span className="text-[7.5px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold uppercase">
                    {isID ? 'TEKNISI DI JALAN' : 'TECH ON THE WAY'}
                  </span>
                  <span className="text-[7.5px] text-cyan-400 font-bold animate-pulse">● LIVE</span>
                </div>
                
                <div className="bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/40 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[9px] font-bold text-neutral-200">{selectedTechnician}</p>
                    <span className="text-[7px] text-neutral-400">{isID ? 'Menuju titik lokasi Anda' : 'Heading to your location'}</span>
                  </div>
                  <span className="text-[9.5px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold">ETA: 8m</span>
                </div>
                
                <div className="text-[7px] text-neutral-400 bg-neutral-950/40 p-1.5 rounded border border-neutral-900 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>{isID ? 'Teknisi terpantau GPS bergerak mendekat' : 'Technician GPS tracked moving closer'}</span>
                </div>
              </div>
            )}

          </div>

          {/* Large Action Button */}
          {isUnpaid ? (
            <button
              type="button"
              onClick={() => setServiceState('paid')}
              className="w-full py-2.5 rounded-xl text-[9px] font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-650/20 hover:scale-[1.02] transition-all text-center uppercase tracking-wider"
            >
              {isID ? 'Bayar Jasa (Rp 150.000)' : 'Pay Fee (Rp 150,000)'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setServiceState('idle');
                setSelectedTechnician(null);
              }}
              className="w-full py-2.5 rounded-xl text-[9px] font-bold bg-neutral-850 border border-neutral-700 text-neutral-400 hover:bg-neutral-800 transition-all text-center uppercase tracking-wider"
            >
              {isID ? 'Reset Order / Selesai' : 'Reset Order / Done'}
            </button>
          )}

        </div>
      );
    }
    case 'boarding': {
      const isCreated = kosCreated;
      const occupiedCount = roomStates.filter(r => r).length;
      const vacantCount = roomStates.length - occupiedCount;
      const roomNames = ["101", "102", "103", "201", "202", "203"];
      const tenants = ["Budi", "Siti", "-", "Rian", "-", "Andi"];

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4 overflow-hidden">
            
            {/* Owner Section Badge */}
            <div className="flex justify-between items-center bg-neutral-900/60 p-1.5 rounded-lg border border-neutral-800/80">
              <span className="text-[7.5px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold uppercase">
                {isID ? 'PORTAL PEMILIK KOS (B2B)' : 'KOS OWNER PORTAL (B2B)'}
              </span>
              <span className="text-[7.5px] text-neutral-400">💼 Admin</span>
            </div>

            {/* Step 1: Create Property */}
            {!isCreated && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-3 flex flex-col gap-2">
                <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">
                  {isID ? 'BUAT PROPERTI KOS BARU' : 'CREATE NEW KOS PROPERTY'}
                </span>
                
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[6.5px] text-neutral-500 font-bold uppercase">{isID ? 'Nama Properti' : 'Property Name'}</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="Kos Green House" 
                      className="bg-neutral-800 border border-neutral-700 text-[8.5px] p-1.5 rounded text-neutral-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[6.5px] text-neutral-500 font-bold uppercase">{isID ? 'Lokasi Area' : 'Location Area'}</label>
                    <input 
                      type="text" 
                      readOnly 
                      value="Jakarta Selatan (Dekat Kampus)" 
                      className="bg-neutral-800 border border-neutral-700 text-[8.5px] p-1.5 rounded text-neutral-200 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setKosCreated(true)}
                  className="w-full py-2 rounded-lg text-[8.5px] font-bold bg-indigo-650 hover:bg-indigo-600 text-white mt-1 transition-all"
                >
                  {isID ? '+ Buat Properti Kos' : '+ Create Kos Property'}
                </button>
              </div>
            )}

            {/* Step 2: Manage Rooms Grid */}
            {isCreated && (
              <div className="flex flex-col gap-2">
                {/* Stats Summary */}
                <div className="flex justify-between items-center bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2 text-[8px]">
                  <div>
                    <span className="font-bold text-neutral-200">Kos Green House</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-400 font-bold">{isID ? `Terisi: ${occupiedCount}` : `Filled: ${occupiedCount}`}</span>
                    <span className="text-emerald-400 font-bold">{isID ? `Kosong: ${vacantCount}` : `Vacant: ${vacantCount}`}</span>
                  </div>
                </div>

                {/* Grid List of Rooms */}
                <div className="grid grid-cols-3 gap-1.5 py-0.5">
                  {roomStates.map((isOccupied, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        const newRooms = [...roomStates];
                        newRooms[idx] = !newRooms[idx];
                        setRoomStates(newRooms);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all flex flex-col justify-between h-[48px] ${
                        isOccupied
                          ? 'bg-neutral-900/90 border-neutral-800/85 text-neutral-300'
                          : 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400 border-dashed hover:bg-emerald-500/15'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[7.5px] font-bold font-mono">Kamar {roomNames[idx]}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOccupied ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`}></span>
                      </div>
                      
                      <span className="text-[8px] font-medium truncate w-full text-left mt-1.5">
                        {isOccupied 
                          ? `👤 ${tenants[idx] === '-' ? (isID ? 'Penyewa' : 'Tenant') : tenants[idx]}` 
                          : `📥 ${isID ? 'Kosong' : 'Vacant'}`}
                      </span>
                    </button>
                  ))}
                </div>
                
                <span className="text-[6.5px] text-neutral-500 text-center">
                  {isID ? '💡 Klik kotak kamar untuk mensimulasikan Check-In / Check-Out' : '💡 Click a room card to simulate Check-In / Check-Out'}
                </span>
              </div>
            )}

          </div>

          {/* Bottom Reset Button when Created */}
          {isCreated && (
            <button
              type="button"
              onClick={() => {
                setKosCreated(false);
                setRoomStates([true, true, false, true, false, true]);
              }}
              className="w-full py-2 rounded-xl text-[9px] font-bold bg-neutral-850 border border-neutral-700 text-neutral-400 hover:bg-neutral-800 transition-all text-center uppercase tracking-wider"
            >
              {isID ? 'Hapus Properti / Reset' : 'Delete Property / Reset'}
            </button>
          )}
        </div>
      );
    }
    case 'survey': {
      const isIdle = surveyState === 'idle';
      const isSubmitting = surveyState === 'submitting';
      const isSubmitted = surveyState === 'submitted';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2.5 mt-4">
            
            {/* Survey Header */}
            <div className="bg-neutral-900/80 border border-neutral-800/85 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">{isID ? 'SURVEI KEPUASAN' : 'CUSTOMER SATISFACTION'}</span>
                <p className="text-[9.5px] font-bold text-neutral-200 mt-0.5">Feedback Portofolio v2</p>
              </div>
              <span className="text-[7.5px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded font-bold">142 Resp</span>
            </div>

            {/* Main Interactive Survey Container */}
            <div className={`border rounded-xl p-3 text-center transition-all duration-300 ${
              isIdle 
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-400' 
                : isSubmitting
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 animate-pulse'
                : 'bg-purple-950/20 border-purple-500/30 text-neutral-200 shadow-[0_4px_12px_rgba(168,85,247,0.1)]'
            }`}>
              {isIdle && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[9px] font-medium text-neutral-200 leading-snug">
                    {isID ? '"Apakah Anda puas dengan layanan portofolio kami?"' : '"Are you satisfied with our portfolio service?"'}
                  </p>
                  
                  {/* Star Rating Grid */}
                  <div className="flex gap-2 justify-center my-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSurveyRating(star)}
                        className={`text-xl transition-all duration-200 transform active:scale-125 ${
                          surveyRating >= star 
                            ? 'text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.55)]' 
                            : 'text-neutral-700 hover:text-neutral-600'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="text-[7px] text-neutral-500">
                    {surveyRating > 0 
                      ? (isID ? `Dipilih: ${surveyRating} Bintang` : `Selected: ${surveyRating} Stars`)
                      : (isID ? 'Ketuk bintang untuk memberi nilai' : 'Tap stars to rate')}
                  </span>
                </div>
              )}

              {isSubmitting && (
                <div className="py-4 flex flex-col items-center gap-2">
                  <div className="w-5 h-5 border-2 border-t-purple-500 border-neutral-800 animate-spin rounded-full"></div>
                  <p className="text-[9px] font-bold text-purple-400">{isID ? 'Mengirim Tanggapan...' : 'Submitting Feedback...'}</p>
                </div>
              )}

              {isSubmitted && (
                <div className="flex flex-col items-center gap-1.5 py-1">
                  <span className="text-xl">🙏</span>
                  <p className="text-[10px] font-bold text-neutral-200">{isID ? 'Tanggapan Terkirim!' : 'Feedback Submitted!'}</p>
                  <p className="text-[7.5px] text-neutral-400 max-w-[150px]">
                    {isID 
                      ? `Rating Anda: ${surveyRating} Bintang. Terima kasih atas masukan berharga Anda!` 
                      : `Your Rating: ${surveyRating} Stars. Thank you for your valuable feedback!`}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            disabled={isSubmitting || (isIdle && surveyRating === 0)}
            onClick={() => {
              if (isSubmitted) {
                setSurveyState('idle');
                setSurveyRating(0);
              } else {
                setSurveyState('submitting');
                setTimeout(() => {
                  setSurveyState('submitted');
                }, 1200);
              }
            }}
            className={`w-full py-2.5 rounded-xl text-[9px] font-bold transition-all duration-300 text-center uppercase tracking-wider shadow-lg ${
              isIdle
                ? (surveyRating > 0 
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-650/20 hover:scale-[1.02]' 
                  : 'bg-neutral-800 text-neutral-600 border border-neutral-700 cursor-not-allowed')
                : isSubmitting
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-400 border border-neutral-700'
            }`}
          >
            {isIdle
              ? (isID ? 'Kirim Survei' : 'Submit Survey')
              : isSubmitting
              ? (isID ? 'Mengirim...' : 'Sending...')
              : (isID ? 'Isi Ulang Survei' : 'Reset Survey')}
          </button>
        </div>
      );
    }
    case 'tourbooking': {
      const step = tourStep || 'catalog';

      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4">
            
            {/* Step Indicator Header */}
            <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2 flex items-center justify-between">
              <span className="text-[7.5px] text-emerald-400 font-bold uppercase tracking-wider">
                {step === 'catalog' ? (isID ? '1. Pilih Tour' : '1. Select Tour')
                  : step === 'details' ? (isID ? '2. Isi Details' : '2. Enter Details')
                  : step === 'payment' ? (isID ? '3. Pembayaran' : '3. Payment')
                  : (isID ? '4. Invoice & Receipt' : '4. Invoice & Receipt')}
              </span>
              <span className="text-[7.5px] text-neutral-400">#TOUR-8921</span>
            </div>

            {/* Step 1: Catalog */}
            {step === 'catalog' && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-2">
                <span className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                  {isID ? 'PAKET WISATA POPULER' : 'POPULAR TOUR PACKAGES'}
                </span>
                
                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedTourPkg('bali')}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      selectedTourPkg === 'bali'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold">🏝️ Bali Escape (3D2N)</span>
                      <span className="text-[8px] text-emerald-400 font-bold">Rp 2.500.000</span>
                    </div>
                    <p className="text-[7px] text-neutral-400 mt-0.5">Hotel 4★, Transport, & Guide Tour</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTourPkg('bromo')}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      selectedTourPkg === 'bromo'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold">🌋 Bromo Sunrise Tour</span>
                      <span className="text-[8px] text-emerald-400 font-bold">Rp 1.200.000</span>
                    </div>
                    <p className="text-[7px] text-neutral-400 mt-0.5">Jeep 4x4, Tiket Masuk, & Dokumentasi</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 'details' && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-1.5">
                <span className="text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                  {isID ? 'DATA PEMESAN TOUR' : 'CUSTOMER DETAILS'}
                </span>
                <div className="bg-neutral-950/60 p-2 rounded-lg border border-neutral-800 flex flex-col gap-1 text-[8px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Paket:</span>
                    <span className="font-bold text-emerald-400">{selectedTourPkg === 'bali' ? 'Bali Escape 3D2N' : 'Bromo Sunrise'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pemesan:</span>
                    <span className="font-bold text-white">Budi Santoso</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Email Customer:</span>
                    <span className="font-bold text-cyan-300">budi@gmail.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Email Owner:</span>
                    <span className="font-bold text-amber-300">erza@myportofolio.com</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
              <div className="bg-neutral-900/80 border border-neutral-800/80 rounded-xl p-2.5 flex flex-col gap-2 items-center text-center py-3">
                <span className="text-[20px]">💳</span>
                <span className="text-[9.5px] font-bold text-emerald-400">
                  {isID ? 'PEMBAYARAN ONLINE' : 'ONLINE PAYMENT GATEWAY'}
                </span>
                <span className="text-[12px] font-extrabold text-white">
                  {selectedTourPkg === 'bali' ? 'Rp 2.500.000' : 'Rp 1.200.000'}
                </span>
                <p className="text-[7.5px] text-neutral-400 max-w-[170px]">
                  {isID ? 'Integrasi Midtrans QRIS / Virtual Account dengan Konfirmasi Instant Webhook' : 'Integrated Payment Webhook & Real-time Confirmation'}
                </p>
              </div>
            )}

            {/* Step 4: Dual Invoice Dispatched (Success) */}
            {step === 'success' && (
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-2 flex flex-col gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
                <div className="flex justify-between items-center">
                  <span className="text-[7.5px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">
                    {isID ? 'PEMBAYARAN LUNAS ✓' : 'PAYMENT PAID ✓'}
                  </span>
                  <span className="text-[7.5px] text-green-400 font-bold">SENT</span>
                </div>

                {/* Email 1: Owner/Admin Notification */}
                <div className="bg-neutral-900/90 p-1.5 rounded-lg border border-amber-500/30 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">📧</span>
                    <span className="text-[8px] font-bold text-amber-300">
                      {isID ? 'INVOICE BOOKING → EMAIL SAYA (OWNER)' : 'INVOICE BOOKING → OWNER EMAIL'}
                    </span>
                  </div>
                  <p className="text-[7px] text-neutral-300">
                    {isID ? 'Notifikasi booking tour baru masuk ke erza@myportofolio.com' : 'New booking alert sent to owner email'}
                  </p>
                </div>

                {/* Email 2: Customer E-Receipt */}
                <div className="bg-neutral-900/90 p-1.5 rounded-lg border border-cyan-500/30 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">📩</span>
                    <span className="text-[8px] font-bold text-cyan-300">
                      {isID ? 'INVOICE RECEIPT → EMAIL CUSTOMER' : 'INVOICE RECEIPT → CUSTOMER EMAIL'}
                    </span>
                  </div>
                  <p className="text-[7px] text-neutral-300">
                    {isID ? 'Bukti bayar & tiket tour terkirim ke budi@gmail.com' : 'Official receipt & e-ticket sent to customer email'}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Interactive Action Button */}
          <button
            type="button"
            onClick={() => {
              if (step === 'catalog') setTourStep('details');
              else if (step === 'details') setTourStep('payment');
              else if (step === 'payment') setTourStep('success');
              else {
                setTourStep('catalog');
                setSelectedTourPkg('bali');
              }
            }}
            className="w-full py-2.5 rounded-xl text-[9px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-center uppercase tracking-wider shadow-lg shadow-emerald-600/20"
          >
            {step === 'catalog'
              ? (isID ? '1. Pilih Tour & Lanjut' : '1. Select Tour & Next')
              : step === 'details'
              ? (isID ? '2. Lanjut Pembayaran' : '2. Proceed to Pay')
              : step === 'payment'
              ? (isID ? '3. Bayar (Simulasi Webhook)' : '3. Pay & Dispatch Emails')
              : (isID ? '4. Reset Flow / Simulasi Ulang' : '4. Reset Tour Demo')}
          </button>
        </div>
      );
    }
    case 'wakaf':
      return null;
    case 'islamic':
      return (
        <div className="flex flex-col h-full justify-between p-2 text-white">
          <div className="flex flex-col gap-2 mt-4">
            <div className="bg-neutral-800/80 border border-neutral-700/50 rounded-xl p-2">
              <span className="text-[7px] text-neutral-400">{isID ? 'PROGRESS BELAJAR' : 'LEARNING PROGRESS'}</span>
              <p className="text-[9px] font-bold text-neutral-100 mt-1">Fiqih Muamalah</p>
              <div className="w-full bg-neutral-700 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-red-500 h-full w-[45%]" />
              </div>
              <span className="text-[7px] text-neutral-400 mt-1 inline-block">45% Selesai (Modul 3 dari 7)</span>
            </div>
          </div>
          <div className="bg-red-600 text-center py-1.5 rounded-lg text-[9px] font-bold">
            {isID ? 'Mulai Kelas Video' : 'Resume Lecture'}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function ThreeUiShelfSection() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMockup, setShowMockup] = useState(false);
  const [erpMode, setErpMode] = useState('inside'); // 'inside', 'outside'
  const [erpState, setErpState] = useState('idle'); // 'idle', 'success', 'failed'
  const [volJoined, setVolJoined] = useState([false, false, false]);
  const [volDonation, setVolDonation] = useState(250000);
  const [ticketState, setTicketState] = useState('idle'); // 'idle', 'claiming', 'claimed'
  const [bookingState, setBookingState] = useState('idle'); // 'idle', 'booking', 'booked'
  const [bookingSlot, setBookingSlot] = useState(0); // 0, 1, 2
  const [serviceState, setServiceState] = useState('idle'); // 'idle', 'paid', 'dispatched'
  const [selectedTechnician, setSelectedTechnician] = useState(null); // 'Ahmad Subarjo', 'Siti Rahma'
  const [kosCreated, setKosCreated] = useState(false);
  const [roomStates, setRoomStates] = useState([true, true, false, true, false, true]); // occupied status for 6 rooms
  const [transitState, setTransitState] = useState('idle'); // 'idle', 'searching', 'matched'
  const [taskState, setTaskState] = useState('idle'); // 'idle', 'running', 'done'
  const [petState, setPetState] = useState('idle'); // 'idle', 'booking', 'booked'
  const [surveyState, setSurveyState] = useState('idle'); // 'idle', 'submitting', 'submitted'
  const [surveyRating, setSurveyRating] = useState(0); // stars rating: 1-5
  const [selectedWakafRow, setSelectedWakafRow] = useState(0); // 0, 1, 2
  const [tourStep, setTourStep] = useState('catalog'); // 'catalog', 'details', 'payment', 'success'
  const [selectedTourPkg, setSelectedTourPkg] = useState('bali'); // 'bali', 'bromo'
  const [gymStep, setGymStep] = useState('status'); // 'status', 'scan', 'expiry', 'renewed'

  useEffect(() => {
    setErpMode('inside');
    setErpState('idle');
    setVolJoined([false, false, false]);
    setVolDonation(250000);
    setTicketState('idle');
    setBookingState('idle');
    setBookingSlot(0);
    setServiceState('idle');
    setSelectedTechnician(null);
    setKosCreated(false);
    setRoomStates([true, true, false, true, false, true]);
    setTransitState('idle');
    setTaskState('idle');
    setPetState('idle');
    setSurveyState('idle');
    setSurveyRating(0);
    setSelectedWakafRow(0);
    setTourStep('catalog');
    setSelectedTourPkg('bali');
    setGymStep('status');
  }, [selectedProject]);

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

            {/* Visual Example Button */}
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn-visual-mockup hover:scale-105"
                onClick={() => setShowMockup(true)}
                style={{
                  padding: '0.8rem 2rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #ef7046 0%, #d4562c 100%)',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  boxShadow: '0 6px 20px rgba(239, 112, 70, 0.35)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textTransform: 'uppercase'
                }}
              >
                <Smartphone size={16} />
                {lang === 'ID' ? 'Contoh Visual' : 'Visual Example'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visual Mockup Popup Modal */}
      {showMockup && selectedProject && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" 
          style={{ zIndex: 100000 }}
          onClick={() => setShowMockup(false)}
        >
          <div 
            className={`relative bg-neutral-950 border border-neutral-800 rounded-3xl p-6 w-full flex flex-col items-center shadow-2xl transition-all duration-300 ${
              selectedProject.id === 'wakaf' ? 'max-w-[820px]' : 'max-w-[340px]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-all duration-300 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" 
              onClick={() => setShowMockup(false)}
            >
              <X size={16} />
            </button>
            <span className="text-[10px] uppercase tracking-wider text-orange-500 font-bold mb-1">
              {lang === 'ID' ? 'CONTOH VISUAL APLIKASI' : 'APPLICATION VISUAL EXAMPLE'}
            </span>
            <h3 className="text-xl font-bold text-white mb-1 text-center">{selectedProject.title}</h3>
            <p className="text-xs text-neutral-400 mb-6 text-center">{selectedProject.discipline}</p>
            
            {/* Conditional Mockup: Web for Wakaf, Smartphone for others */}
            {selectedProject.id === 'wakaf' ? (
              /* Desktop Web Browser Mockup for Wakaf Database */
              <div className="group relative w-full h-[460px] border-[4px] border-neutral-800 rounded-[24px] bg-neutral-900 shadow-2xl ring-1 ring-neutral-950/50 flex flex-col overflow-hidden select-none">
                
                {/* Browser Title Bar */}
                <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-850 flex items-center justify-between z-20 text-[10px] font-medium text-white/80">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-0.5 text-[8.5px] font-mono text-neutral-400 w-[55%] truncate text-center">
                    https://wakafdb.id/dashboard/registry
                  </div>
                  <span className="text-[7.5px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {lang === 'ID' ? 'SISTEM WEB B2B' : 'B2B WEB SYSTEM'}
                  </span>
                </div>

                {/* Web Body (Table + Map Panel) */}
                <div className="flex-1 bg-black text-white p-3 flex gap-3 overflow-hidden">
                  
                  {/* Left Panel: Table of Wakaf lands */}
                  <div className="flex-1 bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3 flex flex-col justify-between h-[380px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center pb-1 border-b border-neutral-850">
                        <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-bold">
                          {lang === 'ID' ? 'REGISTRI TANAH WAKAF' : 'LAND WAKAF REGISTRY'}
                        </span>
                        <span className="text-[8.5px] text-neutral-500 font-bold">3 Properti</span>
                      </div>
                      
                      {/* Table layout */}
                      <div className="flex flex-col gap-1.5 mt-1">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 text-[7px] text-neutral-500 font-bold uppercase px-1">
                          <span className="col-span-1">No</span>
                          <span className="col-span-5">{lang === 'ID' ? 'Lokasi' : 'Location'}</span>
                          <span className="col-span-3">{lang === 'ID' ? 'Luas' : 'Area'}</span>
                          <span className="col-span-3">Status</span>
                        </div>

                        {/* Table Rows */}
                        {[
                          { id: 0, loc: "Kec. Ciganjur, Jkt Selatan", area: "2.450 m²", verified: true },
                          { id: 1, loc: "Kec. Sukasari, Bandung Utara", area: "1.200 m²", verified: false },
                          { id: 2, loc: "Kec. Senen, Jkt Pusat", area: "3.100 m²", verified: true }
                        ].map((row) => (
                          <button
                            key={row.id}
                            type="button"
                            onClick={() => setSelectedWakafRow(row.id)}
                            className={`grid grid-cols-12 text-[8.5px] p-2 rounded-lg border text-left transition-all ${
                              selectedWakafRow === row.id
                                ? 'bg-emerald-500/10 border-emerald-500/80 text-emerald-300 shadow-[0_0_6px_rgba(16,185,129,0.1)]'
                                : 'bg-neutral-850 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            <span className="col-span-1 font-mono font-bold text-neutral-500">{row.id + 1}</span>
                            <span className="col-span-5 truncate pr-1 font-bold text-neutral-200">{row.loc}</span>
                            <span className="col-span-3 font-mono font-medium">{row.area}</span>
                            <span className="col-span-3 text-[7.5px] font-bold">
                              {row.verified 
                                ? <span className="text-emerald-400 bg-emerald-500/15 px-1 py-0.5 rounded">TERSERTIFIKASI</span>
                                : <span className="text-amber-400 bg-amber-500/15 px-1 py-0.5 rounded">VERIFIKASI</span>
                              }
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Row Detailed Specs */}
                    <div className="bg-neutral-950/50 border border-neutral-850 p-2.5 rounded-lg flex justify-between items-center text-[8px] text-neutral-400">
                      <div>
                        <span>{lang === 'ID' ? 'Nazhir/Pengelola' : 'Manager'}: </span>
                        <strong className="text-neutral-200 font-bold">
                          {selectedWakafRow === 0 ? "KUA Ciganjur" : selectedWakafRow === 1 ? "Yayasan Amal" : "KUA Senen"}
                        </strong>
                      </div>
                      <div>
                        <span>ID Sertifikat: </span>
                        <strong className="text-neutral-200 font-mono font-bold">
                          {selectedWakafRow === 0 ? "WKF-0932" : selectedWakafRow === 1 ? "WKF-1042" : "WKF-3849"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Geospatial Map Mockup */}
                  <div className="w-[280px] bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-3 flex flex-col justify-between h-[380px] relative overflow-hidden">
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-[7.5px] text-neutral-400 uppercase tracking-wider font-bold">
                        {lang === 'ID' ? 'VISUALISASI GEOSPASIAL' : 'GEOSPATIAL VISUALIZATION'}
                      </span>
                      <div className="flex justify-between items-center text-[7.5px] font-mono text-neutral-500">
                        <span>
                          {selectedWakafRow === 0 ? "Lat: -6.3402, Lon: 106.8021" : selectedWakafRow === 1 ? "Lat: -6.8604, Lon: 107.5912" : "Lat: -6.1847, Lon: 106.8444"}
                        </span>
                        <span className="text-emerald-400 font-bold">📍 ACTIVE</span>
                      </div>
                    </div>

                    {/* Map Graphic Box */}
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center pointer-events-none">
                      {/* Grid pattern background */}
                      <div 
                        className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)]"
                        style={{ backgroundSize: '15px 15px' }}
                      ></div>
                      
                      {/* Radar circular guidelines */}
                      <div className="absolute w-36 h-36 rounded-full border border-neutral-800/50"></div>
                      <div className="absolute w-24 h-24 rounded-full border border-neutral-800/30"></div>
                      
                      {/* Pinpoint marker */}
                      <div className="relative flex flex-col items-center">
                        <span className="absolute w-6 h-6 rounded-full bg-emerald-500/20 animate-ping"></span>
                        <span className="text-2xl z-10">📍</span>
                        
                        <div className="bg-neutral-900 border border-neutral-800 text-[8px] px-2 py-0.5 rounded shadow-lg mt-1 font-bold text-neutral-200 z-10">
                          {selectedWakafRow === 0 ? "Jakarta Selatan" : selectedWakafRow === 1 ? "Bandung Utara" : "Jakarta Pusat"}
                        </div>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="z-10 bg-neutral-950/80 border border-neutral-850 p-2 rounded-lg text-center text-[7.5px] text-neutral-400">
                      {lang === 'ID' 
                        ? 'Klik baris tabel kiri untuk memindahkan pin lokasi GPS BPN' 
                        : 'Click left table row to relocate the BPN GPS pin'}
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* Smartphone Mockup Frame for mobile apps */
              <div className="group relative flex justify-center h-[460px] w-[230px] border-[4px] border-neutral-800 rounded-[40px] bg-neutral-900 shadow-2xl ring-1 ring-neutral-950/50 transition-all duration-500 hover:shadow-3xl hover:-translate-y-1 select-none cursor-pointer">
                <div className="absolute inset-0 rounded-[38px] border border-white/10 pointer-events-none"></div>

                <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-black">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 transition-transform duration-700 group-hover:scale-110"></div>
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-purple-600/20 blur-[40px] rounded-full mix-blend-screen transition-all duration-700 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
                  <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-cyan-600/20 blur-[40px] rounded-full mix-blend-screen transition-all duration-700 group-hover:-translate-x-4 group-hover:translate-y-4"></div>

                  <div className="absolute top-0 right-0 w-[120%] h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -skew-x-12 translate-x-[20%] pointer-events-none group-hover:translate-x-[-100%] transition-transform duration-1000 ease-in-out z-30"></div>

                  {/* Status Bar */}
                  <div className="absolute top-2 w-full px-6 py-1 flex justify-between items-center z-20 text-white text-[10px] font-medium opacity-80">
                    <span>9:41</span>
                    <div className="flex gap-1 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path d="M3 20h18V2L3 20z"></path>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M3 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V5.25zm17.5 4.5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-1.5v-4.5h1.5z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Lockscreen Interface */}
                  <div className="absolute inset-0 flex flex-col items-center pt-16 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-y-4 group-hover:scale-95 group-hover:pointer-events-none z-10">
                    <div className="flex flex-col items-center text-white/90">
                      <span className="text-[10px] font-semibold tracking-wider">
                        {new Date().toLocaleDateString(lang === 'ID' ? 'id-ID' : 'en-US', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase()}
                      </span>
                      <span className="text-7xl font-thin tracking-tighter -mt-2">09:41</span>
                    </div>

                    <div className="absolute bottom-8 w-full px-8 flex justify-between">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655L9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457L3 3m5.457 5.457l7.086 7.086m0 0L21 21"></path>
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
                        </svg>
                      </div>
                    </div>

                    <div className="absolute bottom-2 w-[40%] h-[3px] bg-white/50 rounded-full"></div>
                  </div>

                  {/* App UI (Home Screen State) */}
                  <div className="absolute inset-0 pt-12 pb-4 px-4 flex flex-col justify-between opacity-0 scale-105 translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 z-0">
                    {renderAppMockContent(selectedProject, lang, erpMode, setErpMode, erpState, setErpState, volJoined, setVolJoined, volDonation, setVolDonation, ticketState, setTicketState, bookingState, setBookingState, bookingSlot, setBookingSlot, serviceState, setServiceState, selectedTechnician, setSelectedTechnician, kosCreated, setKosCreated, roomStates, setRoomStates, transitState, setTransitState, taskState, setTaskState, petState, setPetState, surveyState, setSurveyState, surveyRating, setSurveyRating, selectedWakafRow, setSelectedWakafRow, tourStep, setTourStep, selectedTourPkg, setSelectedTourPkg, gymStep, setGymStep)}
                    <div className="w-full flex justify-center">
                      <div className="w-[40%] h-[3px] bg-white/50 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Notch */}
                <div className="absolute top-[10px] z-30 h-5 w-18 rounded-full bg-black flex items-center justify-center shadow-lg border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800 ml-auto mr-2"></div>
                </div>
              </div>
            )}
            
            <p className="text-[10px] text-neutral-500 mt-4 text-center">
              {selectedProject.id === 'wakaf'
                ? (lang === 'ID' ? 'Klik data baris tabel untuk mengubah koordinat GPS peta' : 'Click table data row to relocate coordinates GPS pin')
                : (lang === 'ID' ? 'Arahkan kursor / klik layar HP untuk membuka kunci aplikasi' : 'Hover / click the screen to unlock the application')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
