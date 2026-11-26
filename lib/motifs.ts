/* The quiet cultural layer behind the term card: one line motif per country, drawn as ink.
   Each motif is a few paths (rings, rows, tiles), so it can draw itself in path by path.
   Coordinates live in a 1600 x 1000 box that covers the screen around the card. */

export type Motif = { key: string; ink: string; spin?: { x: number; y: number }; paths: string[] };

const f = (n: number) => Math.round(n * 10) / 10;
const pt = (cx: number, cy: number, r: number, a: number) => `${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`;

/* Dubai: the eight-point star lattice of Islamic geometry, one path per row of stars */
function khatam(): string[] {
  const rows: string[] = [];
  const T = 200;
  for (let j = 0; j < 5; j++) {
    let d = "";
    for (let i = 0; i < 9; i++) {
      const cx = i * T + (j % 2 ? T / 2 : 0) - 20, cy = j * T + 10;
      for (let k = 0; k <= 16; k++) d += (k ? "L" : "M") + pt(cx, cy, k % 2 ? 50 : 86, (k * Math.PI) / 8 - Math.PI / 2);
      d += "Z";
      // the small octagon inside each star
      for (let k = 0; k <= 8; k++) d += (k ? "L" : "M") + pt(cx, cy, 30, (k * Math.PI) / 4 + Math.PI / 8);
    }
    rows.push(d);
  }
  return rows;
}

/* India: a mandala, ring by ring, centred off the card's right edge */
function mandala(cx: number, cy: number): string[] {
  const rings: string[] = [];
  const circle = (r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  const petals = (n: number, r0: number, r1: number, w: number) => {
    let d = "";
    for (let k = 0; k < n; k++) {
      const a = (k * 2 * Math.PI) / n, da = (w * Math.PI) / n;
      d += `M${pt(cx, cy, r0, a)}Q${pt(cx, cy, (r0 + r1) / 2, a - da)} ${pt(cx, cy, r1, a)}Q${pt(cx, cy, (r0 + r1) / 2, a + da)} ${pt(cx, cy, r0, a)}`;
    }
    return d;
  };
  rings.push(circle(46));
  rings.push(petals(8, 46, 140, 0.9));
  rings.push(circle(150));
  rings.push(petals(16, 150, 245, 0.85));
  rings.push(circle(258) + circle(270));
  rings.push(petals(32, 270, 330, 0.8));
  rings.push(circle(352));
  rings.push(petals(24, 360, 480, 0.75));
  return rings;
}

/* China: xiangyun, the auspicious cloud scroll; each cloud is a line that curls at its ends and crowns */
function curl(cx: number, cy: number, r: number, dir: number, turns = 1.5): string {
  let d = "";
  const n = 34;
  for (let k = 0; k <= n; k++) {
    const t = k / n, a = dir * t * turns * 2 * Math.PI, rr = r * (1 - 0.72 * t);
    d += (k ? "L" : "M") + pt(cx, cy, rr, a + Math.PI);
  }
  return d;
}
function cloud(x: number, y: number, s: number): string {
  const r = 26 * s;
  return [
    `M${f(x - 120 * s)} ${f(y)}C${f(x - 60 * s)} ${f(y + 18 * s)} ${f(x + 60 * s)} ${f(y + 18 * s)} ${f(x + 120 * s)} ${f(y)}`,
    curl(x - 120 * s - r, y, r, 1),
    curl(x + 120 * s + r, y, r, -1),
    curl(x - 40 * s, y - 34 * s, r * 1.2, -1, 1.25),
    curl(x + 44 * s, y - 40 * s, r * 1.35, 1, 1.25),
  ].join("");
}
function clouds(): string[] {
  return [cloud(220, 140, 1.1), cloud(1380, 180, 1.4), cloud(1320, 860, 1.2), cloud(260, 820, 1.35), cloud(820, 70, 0.8), cloud(120, 480, 0.7), cloud(1500, 520, 0.75)];
}

/* Ghana: kente weave, bands of zigzag and ladder that run across like cloth strips */
function kente(): string[] {
  const out: string[] = [];
  for (let j = 0; j < 8; j++) {
    const y = 60 + j * 125;
    let z = `M-40 ${y}`;
    for (let x = -40; x < 1660; x += 30) z += `L${x + 15} ${y + (j % 2 ? 16 : -16)}L${x + 30} ${y}`;
    let l = `M-40 ${y + 34}H1660M-40 ${y + 52}H1660`;
    for (let x = -20; x < 1660; x += 48) l += `M${x} ${y + 34}V${y + 52}`;
    out.push(z, l);
  }
  return out;
}

/* USA: Manhattan's 1811 street grid, which runs 29 degrees off true north, with Central Park and Broadway */
function manhattan(): string[] {
  const out: string[] = [];
  const rot = (x: number, y: number) => {
    const a = (-29 * Math.PI) / 180, cx = 800, cy = 500, dx = x - cx, dy = y - cy;
    return `${f(cx + dx * Math.cos(a) - dy * Math.sin(a))} ${f(cy + dx * Math.sin(a) + dy * Math.cos(a))}`;
  };
  for (let g = 0; g < 4; g++) {
    let d = "";
    for (let k = 0; k < 10; k++) { const y = -500 + (g * 10 + k) * 52; d += `M${rot(-600, y)}L${rot(2200, y)}`; }
    out.push(d);
  }
  let av = "";
  for (let k = 0; k < 14; k++) { const x = -300 + k * 170; av += `M${rot(x, -600)}L${rot(x, 1600)}`; }
  out.push(av);
  out.push(`M${rot(940, 180)}L${rot(1280, 180)}L${rot(1280, 780)}L${rot(940, 780)}Z`); // Central Park
  out.push(`M${rot(300, 1500)}C${rot(520, 900)} ${rot(700, 600)} ${rot(1100, -200)}`); // Broadway
  return out;
}

/* Argentina: the Sol de Mayo's alternating straight and wavy rays, with wind over the pampas */
function solDeMayo(cx: number, cy: number): string[] {
  let straight = "", wavy = "";
  for (let k = 0; k < 32; k++) {
    const a = (k * Math.PI) / 16;
    if (k % 2 === 0) straight += `M${pt(cx, cy, 84, a)}L${pt(cx, cy, 230, a)}`;
    else {
      let d = `M${pt(cx, cy, 84, a)}`;
      for (let s = 1; s <= 12; s++) { const r = 84 + (s * 136) / 12; d += `L${pt(cx, cy, r, a + Math.sin(s * 1.3) * 0.045)}`; }
      wavy += d;
    }
  }
  const wind: string[] = [];
  for (let j = 0; j < 5; j++) {
    const y = 640 + j * 70;
    let d = `M-40 ${y}`;
    for (let x = -40; x < 1680; x += 160) d += `Q${x + 40} ${y - 22 + j * 3} ${x + 80} ${y}T${x + 160} ${y}`;
    wind.push(d);
  }
  const ring = `M${cx - 70} ${cy}a70 70 0 1 0 140 0a70 70 0 1 0 -140 0`;
  return [ring, straight, wavy, ...wind];
}

/* Madrid: azulejo tiles, a lattice with a quatrefoil in every tile */
function azulejo(): string[] {
  const out: string[] = [];
  const T = 160;
  let grid = "";
  for (let x = 0; x <= 1600; x += T) grid += `M${x} 0V1000`;
  for (let y = 0; y <= 1000; y += T) grid += `M0 ${y}H1600`;
  out.push(grid);
  for (let j = 0; j < 7; j++) {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const cx = i * T + T / 2, cy = j * T + T / 2, r = 26;
      d += `M${cx} ${cy - 2 * r}a${r} ${r} 0 0 1 0 ${2 * r}a${r} ${r} 0 0 1 0 ${-2 * r}Z`;
      d += `M${cx + 2 * r} ${cy}a${r} ${r} 0 0 1 ${-2 * r} 0a${r} ${r} 0 0 1 ${2 * r} 0Z`;
      d += `M${cx - 6} ${cy}a6 6 0 1 0 12 0a6 6 0 1 0 -12 0`;
    }
    out.push(d);
  }
  return out;
}

export const MOTIFS: Motif[] = [
  { key: "dubai", ink: "#8c6a12", paths: khatam() },
  { key: "india", ink: "#a4501a", spin: { x: 1500, y: 520 }, paths: mandala(1500, 520) },
  { key: "china", ink: "#9e2a22", paths: clouds() },
  { key: "ghana", ink: "#1f6b3f", paths: kente() },
  { key: "usa", ink: "#294a94", paths: manhattan() },
  { key: "argentina", ink: "#2a7ea3", spin: { x: 1430, y: 150 }, paths: solDeMayo(1430, 150) },
  { key: "europe", ink: "#2f4f9a", paths: azulejo() },
];
