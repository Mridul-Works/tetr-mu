/* Real-world objects from each country on the route, drawn as paper and ink:
   they sit in the term collages beside MU's stamps and notes. No logos of other companies. */

export type CultureKind = "souk-tag" | "boarding-dxb" | "rail-india" | "seal-china" | "kente" | "transit-usa" | "filete" | "azulejo";

const INK = "#1d1f1c";

function BoardingPass() {
  return (
    <svg viewBox="0 0 240 100" aria-hidden="true">
      <defs>
        <mask id="bp-cut">
          <rect width="240" height="100" rx="6" fill="#fff" />
          <circle cx="172" cy="0" r="7" fill="#000" /><circle cx="172" cy="100" r="7" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#bp-cut)">
        <rect width="240" height="100" fill="#fbfaf6" />
        <rect width="240" height="14" fill="#009c50" />
        <text x="10" y="10" fontSize="7" fontWeight="700" letterSpacing="1.4" fill="#fff">BOARDING PASS · TERM 1</text>
        <text x="182" y="10" fontSize="6.5" fontWeight="700" letterSpacing="1" fill="#fff">STUB</text>
        <text x="10" y="31" fontSize="6" letterSpacing=".8" fill="#6b6f68">FROM</text>
        <text x="10" y="54" fontSize="24" fontWeight="700" fill={INK}>HOME</text>
        <path d="M84 47h34m-6-5 6 5-6 5" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="126" y="31" fontSize="6" letterSpacing=".8" fill="#6b6f68">TO</text>
        <text x="126" y="54" fontSize="24" fontWeight="700" fill={INK}>DXB</text>
        <text x="10" y="74" fontSize="6" letterSpacing=".8" fill="#6b6f68">PASSENGER</text>
        <text x="10" y="86" fontSize="9" fontWeight="600" fill={INK}>A FOUNDER, NOT YET</text>
        <text x="110" y="74" fontSize="6" letterSpacing=".8" fill="#6b6f68">GATE</text>
        <text x="110" y="86" fontSize="9" fontWeight="600" fill={INK}>T1</text>
        <text x="140" y="74" fontSize="6" letterSpacing=".8" fill="#6b6f68">SEAT</text>
        <text x="140" y="86" fontSize="9" fontWeight="600" fill={INK}>1A</text>
        <path d="M172 18v66" stroke="#c9c6bc" strokeDasharray="2 3" />
        {/* barcode on the stub */}
        <g fill={INK}>
          {[0, 3, 5, 9, 11, 14, 18, 20, 23, 25, 29, 32, 34, 38, 41, 43, 47, 50].map((x, i) => (
            <rect key={i} x={182 + x} y={26} width={i % 3 === 0 ? 2 : 1} height={46} />
          ))}
        </g>
        <text x="182" y="86" fontSize="7" fontWeight="700" fill={INK}>DXB · 01</text>
      </g>
    </svg>
  );
}


/* a souk price tag on a string: the Dubai target written in Western and Arabic-Indic numerals */
function SoukTag() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true">
      <path d="M2 60c20-30 40-46 56-44" fill="none" stroke="#9b8b6a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M58 22h126a8 8 0 0 1 8 8v60a8 8 0 0 1-8 8H58L34 60z" fill="#f3e6c8" stroke="#c7ac70" strokeWidth="1.2" />
      <circle cx="52" cy="60" r="5" fill="#fbf6ea" stroke="#c7ac70" strokeWidth="1.2" />
      <text x="72" y="44" fontSize="8" fontWeight="700" letterSpacing="1.6" fill="#7a5d1c">TERM 1 · DUBAI</text>
      <text x="72" y="70" fontSize="22" fontWeight="700" fill="#2b2210">$25,000</text>
      <text x="180" y="70" textAnchor="end" fontSize="15" fontWeight="600" fill="#7a5d1c" direction="rtl">٢٥٬٠٠٠</text>
      <text x="72" y="88" fontSize="8" fontWeight="600" letterSpacing=".8" fill="#7a5d1c">TARGET · AT A 30% MARGIN</text>
    </svg>
  );
}

/* an Edmondson card ticket, the small cardboard rail ticket India used for a century */
function RailTicket() {
  return (
    <svg viewBox="0 0 170 84" aria-hidden="true">
      <rect width="170" height="84" rx="3" fill="#e8b99a" />
      <rect x="5" y="5" width="160" height="74" rx="2" fill="none" stroke="#8a4b2a" strokeWidth=".8" strokeDasharray="1.5 1.5" />
      <text x="85" y="20" textAnchor="middle" fontSize="7.4" fontWeight="700" letterSpacing="1.6" fill="#5a2a14">TERM 2 · INDIA</text>
      <path d="M14 26h142" stroke="#8a4b2a" strokeWidth=".6" />
      <text x="16" y="44" fontSize="13" fontWeight="700" fill="#3b1a0c">ADMIT ONE</text>
      <text x="16" y="58" fontSize="7" letterSpacing=".6" fill="#5a2a14">BRAND BUILDER · D2C CLASS</text>
      <text x="16" y="72" fontSize="7" letterSpacing=".6" fill="#5a2a14">TARGET $10,000</text>
      <text x="154" y="72" textAnchor="end" fontSize="12" fontWeight="700" fill="#3b1a0c" fontFamily="ui-monospace, Menlo, monospace">0002</text>
      {/* the clipper's punch hole */}
      <circle cx="148" cy="42" r="5" fill="#f4f1ea" />
    </svg>
  );
}

/* a carved red seal (chop), cut with Tetr's four letters instead of characters */
function Seal() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <filter id="seal-ink"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" /><feDisplacementMap in="SourceGraphic" scale="2.4" /></filter>
      </defs>
      <g filter="url(#seal-ink)">
        <rect x="6" y="6" width="88" height="88" rx="6" fill="#c8102e" />
        <rect x="12" y="12" width="76" height="76" rx="3" fill="none" stroke="#f6e9e0" strokeWidth="2.4" />
        <path d="M50 14v72M14 50h72" stroke="#f6e9e0" strokeWidth="1.2" opacity=".55" />
        <g fill="#f6e9e0" fontSize="28" fontWeight="700" textAnchor="middle" fontFamily="var(--font-display), Georgia, serif">
          <text x="32" y="42">T</text><text x="68" y="42">E</text>
          <text x="32" y="78">T</text><text x="68" y="78">R</text>
        </g>
      </g>
    </svg>
  );
}

/* a strip of kente cloth, used like tape across the photo's corner */
function Kente() {
  const blocks = ["#f2b705", "#0a7a3d", "#c8102e", "#f2b705", "#1d1f1c", "#0a7a3d", "#f2b705", "#c8102e", "#0a7a3d", "#f2b705", "#1d1f1c", "#c8102e"];
  return (
    <svg viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true">
      <rect width="240" height="40" fill="#f2b705" />
      {blocks.map((c, i) => (
        <g key={i} transform={`translate(${i * 20} 0)`}>
          <rect width="20" height="40" fill={c} />
          {/* woven weft lines */}
          <rect y="6" width="20" height="3" fill={i % 2 ? "#f2b705" : "#1d1f1c"} opacity=".85" />
          <rect y="18" width="20" height="4" fill={i % 2 ? "#1d1f1c" : "#0a7a3d"} opacity=".7" />
          <rect y="31" width="20" height="3" fill={i % 2 ? "#f2b705" : "#c8102e"} opacity=".85" />
          <rect x="9" width="2" height="40" fill="#fff" opacity=".18" />
        </g>
      ))}
      <rect width="240" height="40" fill="url(#kente-shade)" />
      <defs>
        <linearGradient id="kente-shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".12" /><stop offset="1" stopColor="#000" stopOpacity=".12" /></linearGradient>
      </defs>
    </svg>
  );
}

/* a yellow swipe card with a green "5" line bullet: term 5, New York */
function TransitCard() {
  return (
    <svg viewBox="0 0 190 120" aria-hidden="true">
      <rect width="190" height="120" rx="8" fill="#f6c618" />
      <rect y="78" width="190" height="16" fill="#1d1f1c" opacity=".88" />
      <circle cx="34" cy="38" r="20" fill="#009c50" />
      <text x="34" y="46" textAnchor="middle" fontSize="23" fontWeight="700" fill="#fff">5</text>
      <text x="64" y="34" fontSize="11" fontWeight="700" fill="#14213d">TERM 5 · USA</text>
      <text x="64" y="48" fontSize="7.4" fontWeight="600" letterSpacing=".6" fill="#14213d">CORNELL ↔ NEW YORK</text>
      <text x="12" y="110" fontSize="6.4" fontWeight="600" letterSpacing="1" fill="#14213d">SWIPE TO SHIP · GOOD FOR ONE STARTUP</text>
      <path d="M100 18l70 54" stroke="#14213d" strokeWidth="1" opacity=".18" />
    </svg>
  );
}

/* a fileteado porteño sign: black board, coloured scrolls, painted letters */
function Filete() {
  return (
    <svg viewBox="0 0 220 92" aria-hidden="true">
      <rect width="220" height="92" rx="10" fill="#141414" />
      <rect x="6" y="6" width="208" height="80" rx="7" fill="none" stroke="#e8b923" strokeWidth="1.6" />
      <rect x="10" y="10" width="200" height="72" rx="5" fill="none" stroke="#d1343a" strokeWidth=".9" />
      {/* corner scrolls */}
      {[[18, 18, 1, 1], [202, 18, -1, 1], [18, 74, 1, -1], [202, 74, -1, -1]].map(([x, y, sx, sy], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`} fill="none" strokeLinecap="round">
          <path d="M0 0c10 0 16 6 16 13 0 5-4 8-8 8-4 0-6-3-6-6 0-3 2-4 4-4" stroke="#e8b923" strokeWidth="2" />
          <path d="M3 3c14-2 26 3 30 10" stroke="#3ca4d8" strokeWidth="1.5" />
          <path d="M3 3c-2 12 2 22 8 26" stroke="#4caf50" strokeWidth="1.5" />
        </g>
      ))}
      <text x="110" y="44" textAnchor="middle" fontSize="18" fontStyle="italic" fontWeight="700" fill="#f4ecd8" fontFamily="var(--font-display), Georgia, serif">Argentina</text>
      <text x="110" y="62" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="2.2" fill="#e8b923">TERM 6 · GREEN VENTURE</text>
    </svg>
  );
}

/* a blue and white azulejo tile, as on Madrid's old shopfronts */
function Azulejo() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" rx="2" fill="#f4f2ec" />
      <rect x="3" y="3" width="94" height="94" fill="none" stroke="#1f4f9c" strokeWidth="3" />
      <g fill="none" stroke="#1f4f9c" strokeWidth="2.2">
        <circle cx="50" cy="50" r="14" />
        <path d="M50 8c8 14 8 28 0 42-8-14-8-28 0-42zM50 92c8-14 8-28 0-42-8 14-8 28 0 42zM8 50c14-8 28-8 42 0-14 8-28 8-42 0zM92 50c-14-8-28-8-42 0 14 8 28 8 42 0z" />
      </g>
      <g fill="#1f4f9c">
        <circle cx="50" cy="50" r="5" />
        {[[3, 3], [97, 3], [3, 97], [97, 97]].map(([x, y], i) => <path key={i} d={`M${x} ${y}m-14 0a14 14 0 0 0 28 0z`} transform={`rotate(${[0, 90, 270, 180][i]} ${x} ${y})`} opacity=".9" />)}
      </g>
      <rect width="100" height="100" fill="url(#az-glaze)" />
      <defs>
        <radialGradient id="az-glaze" cx=".3" cy=".25" r=".9"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".08" /></radialGradient>
      </defs>
    </svg>
  );
}

export default function Culture({ kind }: { kind: CultureKind }) {
  switch (kind) {
    case "souk-tag": return <SoukTag />;
    case "boarding-dxb": return <BoardingPass />;
    case "rail-india": return <RailTicket />;
    case "seal-china": return <Seal />;
    case "kente": return <Kente />;
    case "transit-usa": return <TransitCard />;
    case "filete": return <Filete />;
    case "azulejo": return <Azulejo />;
  }
}
