"use client";

import { Mail, MessageCircle, FileText, Globe, Clock, Paperclip, StickyNote } from "lucide-react";

const inputCards = [
  { Icon: MessageCircle, label: "WhatsApp Business" },
  { Icon: Mail, label: "Gmail / Outlook / Mijndomein" },
  { Icon: FileText, label: "Drive / OneDrive / Dropbox" },
  { Icon: Globe, label: "Website formulier" },
];

const timelineItems = [
  { Icon: Mail, text: "Client email ontvangen", date: "vandaag 09:15" },
  { Icon: MessageCircle, text: "WhatsApp", date: "gisteren 18:42" },
  { Icon: Paperclip, text: "Arbeidsovereenkomst.pdf", date: "" },
  { Icon: StickyNote, text: "Consult notities", date: "vrijdag" },
];

export default function FlowBuilder() {
  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex items-center gap-6 w-full max-w-3xl mx-auto">
        {/* Input cards */}
        <div className="flex flex-col gap-3 flex-shrink-0">
          {inputCards.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white border border-[#C9A84C] rounded-lg px-3 py-3 shadow-sm w-52"
            >
              <Icon size={20} className="text-[#C9A84C] flex-shrink-0" />
              <span className="text-xs font-medium text-[#0C0F14] leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* SVG connections + engine */}
        <div className="relative flex-shrink-0" style={{ width: 160, height: 220 }}>
          <svg width="160" height="220" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lines from input cards to engine */}
            {[27, 81, 135, 189].map((y, i) => (
              <path
                key={i}
                d={`M0,${y} C60,${y} 60,110 80,110`}
                stroke="#C9A84C"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                style={{
                  animation: `dash-flow 2s linear ${i * 0.4}s infinite`,
                }}
              />
            ))}
            {/* Line from engine to output */}
            <path
              d="M80,110 C100,110 120,110 160,110"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              style={{ animation: "dash-flow 2s linear 1.6s infinite" }}
            />
            {/* Rotating ring */}
            <circle
              cx="80"
              cy="110"
              r="54"
              stroke="#C9A84C"
              strokeWidth="1"
              strokeDasharray="8 6"
              fill="none"
              style={{ animation: "rotate-ring 8s linear infinite", transformOrigin: "80px 110px" }}
            />
          </svg>

          {/* Engine node */}
          <div
            className="absolute rounded-full flex items-center justify-center text-white font-serif font-bold text-sm"
            style={{
              width: 100,
              height: 100,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #2ECC8A 0%, #1a9e6a 100%)",
              animation: "pulse-engine 3s ease-in-out infinite",
              boxShadow: "0 4px 24px rgba(46,204,138,0.35)",
            }}
          >
            ARBITER
          </div>
        </div>

        {/* Laptop mockup */}
        <div className="flex-shrink-0">
          <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Laptop body */}
            <rect x="10" y="8" width="200" height="130" rx="8" fill="#1a1a1a" />
            <rect x="16" y="14" width="188" height="118" rx="4" fill="#F7F6F2" />
            {/* Base */}
            <rect x="0" y="140" width="220" height="10" rx="3" fill="#2a2a2a" />
            <rect x="85" y="138" width="50" height="4" rx="2" fill="#3a3a3a" />

            {/* Screen content */}
            {/* Header bar */}
            <rect x="16" y="14" width="188" height="18" rx="4" fill="#0C0F14" />
            <text x="24" y="26" fill="white" fontSize="7" fontFamily="serif" fontWeight="bold">Arbiter</text>

            {/* Case card */}
            <rect x="20" y="36" width="180" height="90" rx="4" fill="white" />
            <rect x="20" y="36" width="3" height="90" rx="2" fill="#C9A84C" />
            <text x="28" y="49" fill="#0C0F14" fontSize="7" fontFamily="sans-serif" fontWeight="600">Van Dijk — Ontslag op staande voet</text>

            {timelineItems.map(({ Icon, text, date }, i) => (
              <g key={i} transform={`translate(28, ${58 + i * 17})`}>
                <rect width="164" height="13" rx="2" fill={i % 2 === 0 ? "#F7F6F2" : "transparent"} />
                <circle cx="6" cy="6.5" r="4" fill="#2ECC8A" opacity="0.2" />
                <circle cx="6" cy="6.5" r="2" fill="#2ECC8A" />
                <text x="14" y="9.5" fill="#0C0F14" fontSize="6.5" fontFamily="sans-serif">{text}</text>
                {date && <text x="130" y="9.5" fill="#6B7A8D" fontSize="5.5" fontFamily="sans-serif">{date}</text>}
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col items-center gap-4 w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full">
          {inputCards.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 bg-white border border-[#C9A84C] rounded-lg px-3 py-2 shadow-sm flex-shrink-0 min-w-[90px]"
            >
              <Icon size={16} className="text-[#C9A84C]" />
              <span className="text-[10px] font-medium text-[#0C0F14] text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v16M6 14l6 6 6-6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <div
          className="rounded-full flex items-center justify-center text-white font-serif font-bold text-sm"
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #2ECC8A 0%, #1a9e6a 100%)",
            animation: "pulse-engine 3s ease-in-out infinite",
            boxShadow: "0 4px 24px rgba(46,204,138,0.35)",
          }}
        >
          ARBITER
        </div>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v16M6 14l6 6 6-6" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <div className="bg-white rounded-xl border border-[#E5E4DE] p-4 w-full max-w-xs shadow-sm">
          <div className="text-xs font-semibold text-[#0C0F14] border-b border-[#E5E4DE] pb-2 mb-2">
            Van Dijk — Ontslag op staande voet
          </div>
          {timelineItems.map(({ text, date }, i) => (
            <div key={i} className="flex items-center gap-2 py-1">
              <div className="w-2 h-2 rounded-full bg-[#2ECC8A] flex-shrink-0" />
              <span className="text-[11px] text-[#0C0F14]">{text}</span>
              {date && <span className="text-[10px] text-[#6B7A8D] ml-auto">{date}</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
