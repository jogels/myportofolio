import React, { useState } from 'react';
import { Layers, ArrowRight, X } from 'lucide-react';
import "./ThreeUiShelfSection.css";

const PROJECTS = [
  {
    id: "erp",
    vol: "VOL. 01",
    title: "ERP Apps",
    discipline: "HR & Operations Portal",
    category: "enterprise",
    deck: "Integrated enterprise HR module built for automated geofenced employee GPS attendance, digital leave tracking, overtime computations, and multi-level SPPD travel approvals.",
    chapters: [
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
    title: "Volunteer Apps",
    discipline: "Social Engagement Platform",
    category: "mobile",
    deck: "An architectural playbook for social cause campaigns, volunteer onboarding, skill matching, and real-time donation metrics tracking portals.",
    chapters: [
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
    title: "Ticketing Apps",
    discipline: "Event Management Engine",
    category: "enterprise",
    deck: "High-concurrency ticket reservation engine, anti-double-booking seat hold locks, rapid QR gate check-in scanning, and payment gateway webhooks.",
    chapters: [
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
    title: "Transportation Apps",
    discipline: "Logistics & Transit",
    category: "logistics",
    deck: "Designing high-accuracy fleet routing engines, real-time WebSocket location streaming, dispatcher assignments, and passenger ETA telemetry.",
    chapters: [
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
    title: "Task Scheduler Apps",
    discipline: "Productivity & Automation",
    category: "cloud",
    deck: "Engineering cron job runners, background worker queues, dynamic notification triggers, Redis priority queues, and execution latency metrics.",
    chapters: [
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
    title: "Pet Shop Apps",
    discipline: "E-Commerce & Care",
    category: "mobile",
    deck: "A unified platform for pet grooming reservations, categorized product checkouts, veterinary consultation logs, and medical history journals.",
    chapters: [
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
    title: "Appointment Booking Apps",
    discipline: "Scheduling Systems",
    category: "enterprise",
    deck: "Two-way Google & Outlook calendar sync protocols, timezone localization, automated WhatsApp 24h pre-appointment alerts, and double-booking guards.",
    chapters: [
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
    title: "Service Apps",
    discipline: "On-Demand Services",
    category: "logistics",
    deck: "Designing clean on-demand maintenance request pipelines, technician GPS proximity routing, digital itemized job invoicing, and instant quote generation.",
    chapters: [
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
    title: "Boarding House Management Apps",
    discipline: "Property Management",
    category: "enterprise",
    deck: "Interactive room availability state maps, digital tenancy contracts, monthly rent auto-billing, utility meter logging, and tenant reporting portals.",
    chapters: [
      { title: "Interactive Room Inventory Map", desc: "Room availability matrix, facility tiering, and rental status tracking." },
      { title: "Digital Tenancy Contracts", desc: "Digital lease agreements, ID verification, lease duration terms, and deposits." },
      { title: "Monthly Rent Auto-Billing", desc: "Utility meter calculation, WhatsApp payment reminders, and tenant portals." }
    ],
    tech: ["React", "Node.js", "Prisma", "MySQL"],
    color: "#c24d24"
  },
  {
    id: "survey",
    vol: "VOL. 10",
    title: "Survey Apps",
    discipline: "Data Collection Engine",
    category: "cloud",
    deck: "Dynamic drag-and-drop form schema builders, conditional branching logic, response anti-spam validation, and real-time response aggregation charts.",
    chapters: [
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
    title: "Wakaf Land Database Website",
    discipline: "Islamic Endowment Registry",
    category: "enterprise",
    deck: "Digitizing endowment records: interactive GIS geo-mapping of wakaf land, certificate authenticity verification, public transparency reports, and legal registries.",
    chapters: [
      { title: "Wakaf Land GIS Geo-Mapping", desc: "Interactive map boundaries, land parcel details, and satellite imagery overlays." },
      { title: "Certificate Verification Registry", desc: "Digital wakaf certificate authenticity checks and legal deed archives." },
      { title: "Public Transparency Portal", desc: "Donation utilization reports, land development status, and public audit metrics." }
    ],
    tech: ["Next.js", "Leaflet GIS", "PostGIS", "Tailwind"],
    color: "#1537a1"
  }
];

export default function ThreeUiShelfSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section className="threeui-shelf-section" id="projects">
      <div className="threeui-shelf-header">
        <div className="threeui-pill-tag">
          <Layers size={14} /> PORTFOLIO ARCHIVE · SELECTED PROJECTS
        </div>
        <h2 className="threeui-shelf-title">Beberapa project yang bikin saya begadang (dengan senang hati)</h2>
        <p className="threeui-shelf-desc">
          Jelajahi karya dan arsitektur aplikasi terpilih. Klik pada setiap kartu di bawah untuk membaca case study, alur sistem, dan rincian modul teknis.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="project-filters">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          Semua Project ({PROJECTS.length})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'enterprise' ? 'active' : ''}`}
          onClick={() => setActiveFilter('enterprise')}
        >
          Enterprise & ERP
        </button>
        <button
          className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`}
          onClick={() => setActiveFilter('mobile')}
        >
          Mobile Apps
        </button>
        <button
          className={`filter-btn ${activeFilter === 'logistics' ? 'active' : ''}`}
          onClick={() => setActiveFilter('logistics')}
        >
          Logistics & Transit
        </button>
        <button
          className={`filter-btn ${activeFilter === 'cloud' ? 'active' : ''}`}
          onClick={() => setActiveFilter('cloud')}
        >
          Cloud & Automation
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
                Case Study <ArrowRight size={14} />
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

            <h4 className="modal-section-title">Modul & Fitur Utama Sistem:</h4>
            {selectedProject.chapters.map((chap, idx) => (
              <div key={idx} className="modal-chapter-card">
                <div className="modal-chapter-title">Modul 0{idx + 1}: {chap.title}</div>
                <div className="modal-chapter-desc">{chap.desc}</div>
              </div>
            ))}

            <h4 className="modal-section-title">Tech Stack & Infrastructure:</h4>
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
