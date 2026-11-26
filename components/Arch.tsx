"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RESULTS } from "@/lib/content";
import BlockTrail from "./mu/BlockTrail";

/* MU's "₹593 Cr in combined valuation" bowl, rebuilt in Tetr's blocks: the bowl is a stepped U of
   square photo tiles (the logo's grid), the total sits inside it, venture names stand either side.

   Cast: lead = the tiles locking in along the U (left arm, bottom, right arm; gaps shrink as it goes),
   support = the odometer, which starts when the bottom row lands; still = the names, which fade
   in together once, and the source line. */

// the U on a 9 x 4 grid: [row, col]
const CELLS: [number, number][] = [
  [0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [2, 6], [2, 7], [1, 7], [1, 8], [0, 8],
];
const ALTS = [
  "Students in matching red tees at a sports day in India", "A stall at Tetr's D2C bazaar", "Students visiting Emirates in Dubai",
  "The cohort at LinkedIn's office in India", "The Dubai cohort on campus", "Students at the Taj Mahal",
  "A Tetr classroom", "Students at Tetr Connect", "Founders holding their Brand Wars cheques", "The Icebreakers team",
  "A Brand Wars pitch on stage", "The cohort at ITC", "A full lecture hall", "Students at a street market", "Students at a Tetr session",
];
const LEFT = ["Bike Arena", "Jhatak", "Lavella", "Kalaam", "Kando", "Meridian", "Slide Pass"];
const RIGHT = ["Icebreakers", "Serve Club", "Cossmoss", "Tafflo", "Chula Fashion", "Nothing But", "Critter Chaos", "Welz Company"];

function Odometer({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const text = value.toLocaleString("en-US");
  const count = text.replace(/\D/g, "").length;
  let d = 0;
  return (
    <span className="odo" aria-label={`${prefix}${text}${suffix}`}>
      <span aria-hidden="true" className="odo__row">
        {prefix && <span className="odo__fix">{prefix}</span>}
        {text.split("").map((c, i) => {
          if (!/\d/.test(c)) return <span key={i} className="odo__fix">{c}</span>;
          const k = d++;
          const spins = Math.round((k / Math.max(1, count - 1)) * 2);
          const delay = Math.round(420 * (1 - Math.pow(1 - k / Math.max(1, count - 1), 2)));
          return (
            <span key={i} className="odo__d">
              <span className="odo__col" style={{ "--to": Number(c) + 10 * spins, "--dl": `${delay}ms` } as React.CSSProperties}>
                {Array.from({ length: 30 }, (_, j) => <span key={j}>{j % 10}</span>)}
              </span>
            </span>
          );
        })}
        {suffix && <span className="odo__fix">{suffix}</span>}
      </span>
    </span>
  );
}

export default function Arch() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const tiles = gsap.utils.toArray<HTMLElement>(".arc__tile", sec);
    const names = sec.querySelectorAll(".arc__names li");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { sec.classList.add("is-on"); return; }
    gsap.set(tiles, { autoAlpha: 0, y: -28 });
    gsap.set(names, { autoAlpha: 0 });
    const tl = gsap.timeline({ paused: true });
    // shrinking gaps: the first blocks land one by one, the rest close up behind them
    tiles.forEach((t, i) => tl.to(t, { autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(1.6)" }, 0.5 * (1 - Math.pow(1 - i / tiles.length, 1.6)) * 1.6));
    tl.call(() => sec.classList.add("is-on"), [], 0.7);
    tl.to(names, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 1.0);
    const st = ScrollTrigger.create({ trigger: sec.querySelector(".arc__stage"), start: "top 75%", once: true, onEnter: () => tl.play() });
    return () => { st.kill(); tl.kill(); };
  }, []);

  const [businesses, revenue, raised] = RESULTS.stats;
  return (
    <section id="results" className="section bg-grid arc" aria-labelledby="arc-title" ref={root}>
      <BlockTrail />
      <div className="container">
        <div className="arc__stage">
          <ul className="arc__names arc__names--l" aria-label="Some of the ventures">
            {LEFT.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <div className="arc__u">
            {CELLS.map(([r, c], i) => (
              <figure key={i} className="arc__tile" style={{ gridRow: r + 1, gridColumn: c + 1 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/arc/t${String(i).padStart(2, "0")}.webp`} alt={ALTS[i]} width={420} height={420} loading="lazy" />
              </figure>
            ))}
            <div className="arc__total">
              <h2 id="arc-title" className="sr-only">What Tetr students have earned</h2>
              <p className="arc__big"><Odometer value={revenue.value} prefix={revenue.prefix} suffix={revenue.suffix} /></p>
              <p className="arc__label">in revenue, made by students</p>
              <p className="arc__sub"><span>{businesses.value}{businesses.suffix} businesses built</span><span>${raised.value.toLocaleString("en-US")}{raised.suffix} raised</span></p>
            </div>
          </div>
          <ul className="arc__names arc__names--r" aria-label="More ventures">
            {RIGHT.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
        <p className="t-xs arc__src">Ventures shown were built by Tetr students. Figures from Tetr&rsquo;s published term reports.</p>
      </div>
    </section>
  );
}
