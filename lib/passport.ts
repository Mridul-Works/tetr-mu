/* Passport-page security art for the university cards, after the 2022 Swiss passport (RETINAA):
   a quiet guilloche in normal light, and contour lines of the place that only show under the UV torch.
   Deterministic, so the server and the browser draw the same lines. */

const f = (n: number) => Math.round(n * 10) / 10;

/** contour lines: wobbly closed rings around a "summit", like a topographic map */
export function contours(seed: number): string[] {
  const cx = 120 + ((seed * 97) % 180), cy = 120 + ((seed * 53) % 120);
  const p1 = seed * 1.7, p2 = seed * 2.9;
  const out: string[] = [];
  for (let k = 0; k < 9; k++) {
    const r0 = 20 + k * 26;
    let d = "";
    for (let s = 0; s <= 56; s++) {
      const t = (s / 56) * Math.PI * 2;
      const r = r0 * (1 + 0.13 * Math.sin(3 * t + p1 + k * 0.18) + 0.07 * Math.sin(5 * t + p2 - k * 0.24) + 0.04 * Math.sin(9 * t + k));
      d += (s ? "L" : "M") + f(cx + r * Math.cos(t)) + " " + f(cy + r * 0.82 * Math.sin(t));
    }
    out.push(d + "Z");
  }
  return out;
}

/** a guilloche rosette (hypotrochoid), the fine engraved pattern of banknotes and passports */
export function guilloche(cx: number, cy: number, R = 70, r = 30, d = 52): string {
  let p = "";
  const turns = r / gcd(R, r);
  const n = Math.round(150 * turns);
  for (let s = 0; s <= n; s++) {
    const t = (s / n) * Math.PI * 2 * turns;
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);
    p += (s ? "L" : "M") + f(cx + x) + " " + f(cy + y);
  }
  return p;
}
function gcd(a: number, b: number): number { return b ? gcd(b, a % b) : a; }
