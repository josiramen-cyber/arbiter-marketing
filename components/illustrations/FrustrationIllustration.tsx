export default function FrustrationIllustration() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* Background */}
      <rect width="480" height="320" rx="16" fill="#FEF9F0" />

      {/* Scattered sticky notes */}
      <rect x="20" y="30" width="100" height="70" rx="4" fill="#FDE68A" transform="rotate(-6 20 30)" />
      <line x1="30" y1="50" x2="100" y2="50" stroke="#D97706" strokeWidth="1.2" opacity="0.4" />
      <line x1="30" y1="62" x2="90" y2="62" stroke="#D97706" strokeWidth="1.2" opacity="0.4" />
      <line x1="30" y1="74" x2="80" y2="74" stroke="#D97706" strokeWidth="1.2" opacity="0.4" />

      <rect x="340" y="18" width="90" height="65" rx="4" fill="#FDE68A" transform="rotate(8 340 18)" />
      <line x1="350" y1="38" x2="415" y2="38" stroke="#D97706" strokeWidth="1.2" opacity="0.4" />
      <line x1="350" y1="50" x2="408" y2="50" stroke="#D97706" strokeWidth="1.2" opacity="0.4" />

      {/* Chaotic email window */}
      <rect x="40" y="110" width="160" height="110" rx="6" fill="white" stroke="#E5E4DE" strokeWidth="1.5" />
      <rect x="40" y="110" width="160" height="22" rx="6" fill="#F3F4F6" />
      <rect x="40" y="122" width="160" height="10" fill="#F3F4F6" />
      <circle cx="54" cy="121" r="4" fill="#E05A5A" />
      <circle cx="66" cy="121" r="4" fill="#F59E0B" />
      <circle cx="78" cy="121" r="4" fill="#2ECC8A" />
      <text x="100" y="125" fill="#6B7A8D" fontSize="8" textAnchor="middle">Gmail</text>

      {/* Inbox rows — messy, unread badges */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(48, ${142 + i * 15})`}>
          <rect width="144" height="12" rx="2" fill={i < 3 ? "#EFF6FF" : "transparent"} />
          <circle cx="5" cy="6" r="3" fill={i < 3 ? "#3B82F6" : "#E5E4DE"} />
          <rect x="14" y="3" width={60 + (i * 7) % 30} height="6" rx="2" fill="#D1D5DB" />
          {i < 3 && (
            <rect x="126" y="2" width="16" height="8" rx="4" fill="#E05A5A" />
          )}
        </g>
      ))}

      {/* WhatsApp phone */}
      <rect x="228" y="90" width="80" height="140" rx="10" fill="#1a1a1a" />
      <rect x="232" y="104" width="72" height="122" rx="4" fill="#ECE5DD" />
      <rect x="232" y="104" width="72" height="16" rx="4" fill="#075E54" />
      <text x="268" y="115" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">WhatsApp</text>

      {/* Chat bubbles — overlapping, chaotic */}
      {[
        { x: 236, y: 126, w: 52, color: "white", align: "left" },
        { x: 248, y: 142, w: 48, color: "#DCF8C6", align: "right" },
        { x: 236, y: 158, w: 60, color: "white", align: "left" },
        { x: 244, y: 174, w: 50, color: "#DCF8C6", align: "right" },
        { x: 236, y: 190, w: 55, color: "white", align: "left" },
        { x: 244, y: 206, w: 45, color: "#DCF8C6", align: "right" },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height="10" rx="5" fill={b.color} opacity="0.9" />
      ))}

      {/* Notification badge */}
      <circle cx="300" cy="100" r="10" fill="#E05A5A" />
      <text x="300" y="104" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">12</text>

      {/* Drive / folders window */}
      <rect x="330" y="110" width="130" height="100" rx="6" fill="white" stroke="#E5E4DE" strokeWidth="1.5" />
      <rect x="330" y="110" width="130" height="22" rx="6" fill="#F3F4F6" />
      <rect x="330" y="122" width="130" height="10" fill="#F3F4F6" />
      <text x="395" y="125" fill="#6B7A8D" fontSize="8" textAnchor="middle">Google Drive</text>

      {/* Folder icons */}
      {[
        { x: 345, y: 142 }, { x: 390, y: 142 }, { x: 435, y: 142 },
        { x: 345, y: 172 }, { x: 390, y: 172 },
      ].map((pos, i) => (
        <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
          <rect width="28" height="22" rx="3" fill="#FCD34D" />
          <rect y="-4" width="14" height="6" rx="2" fill="#FCD34D" />
          <rect x="2" y="6" width="24" height="1.5" rx="1" fill="#D97706" opacity="0.4" />
          <rect x="2" y="10" width="20" height="1.5" rx="1" fill="#D97706" opacity="0.4" />
        </g>
      ))}

      {/* Red X marks — stress indicators */}
      {[[150, 80], [310, 75], [430, 85]].map(([x, y], i) => (
        <g key={i}>
          <line x1={x - 6} y1={y - 6} x2={x + 6} y2={y + 6} stroke="#E05A5A" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={x + 6} y1={y - 6} x2={x - 6} y2={y + 6} stroke="#E05A5A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}

      {/* Deadline alert */}
      <rect x="100" y="245" width="280" height="44" rx="8" fill="#FEF2F2" stroke="#E05A5A" strokeWidth="1.5" />
      <text x="120" y="262" fill="#E05A5A" fontSize="10" fontWeight="bold">⚠ TERMIJN VERSTREKEN</text>
      <text x="120" y="278" fill="#E05A5A" fontSize="9" opacity="0.8">Van Dijk · Bezwaar indienen · 3 dagen geleden</text>

      {/* Scattered papers in background */}
      {[[55, 230], [390, 240], [430, 260]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="50" height="38" rx="2" fill="white" stroke="#E5E4DE" strokeWidth="1"
          transform={`rotate(${[-8, 5, -12][i]} ${x} ${y})`} opacity="0.7" />
      ))}
    </svg>
  );
}
