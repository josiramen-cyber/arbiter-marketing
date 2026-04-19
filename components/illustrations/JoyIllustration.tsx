export default function JoyIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" rx="16" fill="#F0FDF4" />

      {/* Main case card */}
      <rect x="40" y="30" width="400" height="260" rx="12" fill="white" stroke="#E5E4DE" strokeWidth="1.5"
        style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.06))" }} />

      {/* Card header */}
      <rect x="40" y="30" width="400" height="48" rx="12" fill="#F7F6F2" />
      <rect x="40" y="54" width="400" height="24" fill="#F7F6F2" />

      {/* Status dot */}
      <circle cx="62" cy="54" r="5" fill="#2ECC8A" />
      <circle cx="62" cy="54" r="5" fill="#2ECC8A">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Case title */}
      <text x="76" y="50" fill="#0C0F14" fontSize="12" fontWeight="600" fontFamily="serif">Van Dijk — Ontslag op staande voet</text>
      <text x="76" y="66" fill="#6B7A8D" fontSize="9">Bijgewerkt vandaag 09:17 · 6 interacties · Concept klaar</text>

      {/* Gold accent bar */}
      <rect x="40" y="78" width="3" height="212" rx="2" fill="#C9A84C" />

      {/* Timeline items */}
      {[
        { y: 95, dot: "#2ECC8A", icon: "✉", label: "Client email ontvangen", sub: "vandaag 09:15", bg: "#F0FDF4" },
        { y: 130, dot: "#25D366", icon: "💬", label: "WhatsApp — bevestiging ontvangen", sub: "gisteren 18:42", bg: "transparent" },
        { y: 165, dot: "#C9A84C", icon: "📄", label: "Arbeidsovereenkomst.pdf geüpload", sub: "maandag 14:30", bg: "#F7F6F2" },
        { y: 200, dot: "#6B7A8D", icon: "🗒", label: "Consult notities — 45 min", sub: "vrijdag 11:00", bg: "transparent" },
      ].map(({ y, dot, icon, label, sub, bg }) => (
        <g key={y}>
          <rect x="52" y={y} width="376" height="30" rx="6" fill={bg} />
          <circle cx="70" cy={y + 15} r="5" fill={dot} />
          <text x="83" y={y + 12} fill="#0C0F14" fontSize="10" fontWeight="500">{label}</text>
          <text x="83" y={y + 24} fill="#6B7A8D" fontSize="8.5">{sub}</text>
        </g>
      ))}

      {/* AI Draft section */}
      <rect x="52" y="238" width="376" height="42" rx="8" fill="#F0FDF4" stroke="#2ECC8A" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="52" y="238" width="4" height="42" rx="2" fill="#2ECC8A" />
      <text x="66" y="252" fill="#1a9e6a" fontSize="8.5" fontWeight="700">AI CONCEPT KLAAR</text>
      <text x="66" y="266" fill="#0C0F14" fontSize="9.5">"Geachte heer Van Dijk, naar aanleiding van ons gesprek..."</text>
      <rect x="356" y="244" width="62" height="22" rx="6" fill="#2ECC8A" />
      <text x="387" y="258" fill="white" fontSize="8.5" fontWeight="600" textAnchor="middle">Goedkeuren</text>

      {/* Check marks — joy indicators */}
      {[[390, 40], [410, 55], [425, 42]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#2ECC8A" opacity={0.15 + i * 0.05} />
          <path d={`M${x - 4},${y} l3,3 5,-5`} stroke="#2ECC8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}

      {/* Completion badge top-right */}
      <rect x="330" y="33" width="96" height="20" rx="10" fill="#2ECC8A" opacity="0.12" />
      <text x="378" y="46" fill="#1a9e6a" fontSize="8" fontWeight="700" textAnchor="middle">✓ Op schema</text>
    </svg>
  );
}
