"use client";

import { Mail, MessageCircle, FileText, Globe } from "lucide-react";

const sources = [
  { Icon: MessageCircle, label: "WhatsApp", color: "#25D366" },
  { Icon: Mail, label: "Email", color: "#C9A84C" },
  { Icon: FileText, label: "Documenten", color: "#6B7A8D" },
  { Icon: Globe, label: "Formulier", color: "#2ECC8A" },
];

const timeline = [
  { dot: "#2ECC8A", label: "Client email ontvangen", sub: "vandaag 09:15" },
  { dot: "#25D366", label: "WhatsApp ontvangen", sub: "gisteren 18:42" },
  { dot: "#C9A84C", label: "Arbeidsovereenkomst.pdf", sub: "maandag" },
  { dot: "#6B7A8D", label: "Consult notities", sub: "vrijdag" },
];

export default function FlowBuilder() {
  return (
    <div className="w-full select-none">
      {/* ── Desktop ── */}
      <div className="hidden md:grid grid-cols-[1fr_48px_1fr] gap-0 items-center w-full max-w-2xl mx-auto">

        {/* Sources column */}
        <div className="flex flex-col gap-3">
          {sources.map(({ Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E4DE] px-4 py-3 shadow-sm"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-xs font-medium text-[#0C0F14]">{label}</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2ECC8A] animate-pulse" />
            </div>
          ))}
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center justify-center h-full gap-0 py-2">
          <svg width="48" height="160" viewBox="0 0 48 160" fill="none">
            {[20, 53, 87, 120].map((y, i) => (
              <g key={i}>
                <line x1="0" y1={y} x2="24" y2="80" stroke="#E5E4DE" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="0" cy={y} r="3" fill="#E5E4DE" />
              </g>
            ))}
            <circle cx="24" cy="80" r="8" fill="#2ECC8A" opacity="0.15" />
            <circle cx="24" cy="80" r="4" fill="#2ECC8A" />
            <line x1="24" y1="80" x2="48" y2="80" stroke="#2ECC8A" strokeWidth="1.5" strokeDasharray="4 3">
              <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1.2s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>

        {/* Case card */}
        <div className="bg-white rounded-xl border border-[#E5E4DE] shadow-md overflow-hidden">
          {/* Card header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E5E4DE] bg-[#F7F6F2]">
            <div className="w-2 h-2 rounded-full bg-[#2ECC8A]" />
            <span className="text-[11px] font-semibold text-[#0C0F14]">Arbiter · Actief dossier</span>
          </div>
          {/* Case title */}
          <div className="px-4 pt-3 pb-2 border-l-2 border-[#C9A84C] ml-0">
            <p className="text-xs font-semibold text-[#0C0F14]">Van Dijk — Ontslag op staande voet</p>
            <p className="text-[10px] text-[#6B7A8D] mt-0.5">4 interacties · bijgewerkt vandaag</p>
          </div>
          {/* Timeline */}
          <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
            {timeline.map(({ dot, label, sub }, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: dot }} />
                <div>
                  <p className="text-[11px] font-medium text-[#0C0F14] leading-tight">{label}</p>
                  <p className="text-[10px] text-[#6B7A8D]">{sub}</p>
                </div>
              </div>
            ))}
          </div>
          {/* AI draft badge */}
          <div className="mx-4 mb-4 flex items-center gap-2 bg-[#2ECC8A]/8 border border-[#2ECC8A]/20 rounded-lg px-3 py-2">
            <span className="text-[10px] font-semibold text-[#2ECC8A] uppercase tracking-wide">AI concept</span>
            <span className="text-[10px] text-[#6B7A8D]">Antwoord klaar voor goedkeuring</span>
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex md:hidden flex-col items-center gap-4 w-full">
        {/* Source pills */}
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {sources.map(({ Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white border border-[#E5E4DE] rounded-lg px-3 py-2 shadow-sm"
            >
              <Icon size={14} style={{ color }} />
              <span className="text-xs font-medium text-[#0C0F14]">{label}</span>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-6 bg-gradient-to-b from-[#E5E4DE] to-[#2ECC8A]" />
          <div className="w-5 h-5 rounded-full bg-[#2ECC8A] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M2 6l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-px h-6 bg-gradient-to-b from-[#2ECC8A] to-[#E5E4DE]" />
        </div>

        {/* Case card mobile */}
        <div className="w-full bg-white rounded-xl border border-[#E5E4DE] shadow-md overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#E5E4DE] bg-[#F7F6F2]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC8A] animate-pulse" />
            <span className="text-[10px] font-semibold text-[#0C0F14]">Arbiter · Actief dossier</span>
          </div>
          <div className="px-4 pt-3 pb-1 border-l-2 border-[#C9A84C]">
            <p className="text-xs font-semibold text-[#0C0F14]">Van Dijk — Ontslag op staande voet</p>
          </div>
          <div className="px-4 py-3 flex flex-col gap-2">
            {timeline.slice(0, 3).map(({ dot, label, sub }, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: dot }} />
                <p className="text-[11px] text-[#0C0F14] leading-tight">{label} <span className="text-[#6B7A8D]">· {sub}</span></p>
              </div>
            ))}
          </div>
          <div className="mx-4 mb-3 flex items-center gap-2 bg-[#2ECC8A]/8 border border-[#2ECC8A]/20 rounded-lg px-3 py-2">
            <span className="text-[10px] font-semibold text-[#2ECC8A]">AI concept klaar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
