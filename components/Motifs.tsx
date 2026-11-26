import { MOTIFS } from "@/lib/motifs";

/* Delays that shrink along the motif (ease-out spacing), so a motif inks in as one stroke of the brush,
   not as a metronome. Total spread about 520 ms. */
const delay = (k: number, n: number) => Math.round(520 * (1 - Math.pow(1 - k / Math.max(1, n - 1), 2)));

function Layer({ uv = false }: { uv?: boolean }) {
  return (
    <svg className={uv ? "motifs__uv" : "motifs__ink"} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {uv && <rect className="motifs__uvtint" x="-200" y="-200" width="2000" height="1400" />}
      {MOTIFS.map((m, i) => (
        <g key={m.key} className="motif" data-k={i} data-spin={m.spin ? `${m.spin.x} ${m.spin.y}` : undefined} style={{ "--ink": m.ink } as React.CSSProperties}>
          {m.paths.map((d, k) => (
            uv ? <path key={k} d={d} /> : <path key={k} d={d} pathLength={1} style={{ "--d": `${delay(k, m.paths.length)}ms` } as React.CSSProperties} />
          ))}
        </g>
      ))}
    </svg>
  );
}

/** The cultural layer behind the term card. Terms.tsx switches the motif and drives the drift. */
export default function Motifs() {
  return (
    <div className="motifs" aria-hidden="true">
      <div className="motifs__drift">
        <Layer />
        <Layer uv />
      </div>
    </div>
  );
}
