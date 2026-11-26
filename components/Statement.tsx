"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockTrail from "./mu/BlockTrail";

/* MU's centred paragraph that lights up word by word as you read down, with small icon chips
   beside the numbers. MU frames it with painted arcs; Tetr frames it with blocks that slide in
   from the edges with the scroll. Figures: Tetr term reports and Career Labs Report 2025-26. */

type Part = string | { b: string } | { chip: "build" | "cash" | "raise" | "up" | "work" };
const TEXT: Part[] = [
  { b: "150+ businesses" }, { chip: "build" }, " have come out of Tetr's terms so far. Together they have made ",
  { b: "$504,000+" }, { chip: "cash" }, " in real revenue and raised ", { b: "$180,000+" }, { chip: "raise" }, " from investors. ",
  { b: "91%" }, " of students are ", { b: "revenue positive" }, { chip: "up" }, ". Not every business made money. The founders got sharper either way, and ",
  { b: "70%" }, { chip: "work" }, " of students had an internship before their second year.",
];
const ICON: Record<string, React.ReactNode> = {
  build: <path d="M4 20V10l4-3v13M10 20V6l5-3v17M17 20v-9l3 2v7M3 20h18" />,
  cash: <><rect x="3" y="6" width="18" height="12" rx="1.5" /><circle cx="12" cy="12" r="2.6" /></>,
  raise: <path d="M12 19V5M6 11l6-6 6 6" />,
  up: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  work: <><rect x="3" y="7" width="18" height="13" rx="1.5" /><path d="M9 7V4h6v3" /></>,
};

export default function Statement() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const words = sec.querySelectorAll(".stmt__w");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { words.forEach((w) => w.classList.add("is-lit")); return; }
    const tw = gsap.to(words, { color: "#141414", ease: "none", stagger: 0.05, scrollTrigger: { trigger: sec.querySelector(".stmt__p"), start: "top 78%", end: "bottom 45%", scrub: 0.5 } });
    const l = gsap.fromTo(sec.querySelector(".stmt__blk--l"), { xPercent: -60 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "center center", scrub: 0.8 } });
    const r = gsap.fromTo(sec.querySelector(".stmt__blk--r"), { xPercent: 60 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "center center", scrub: 0.8 } });
    return () => [tw, l, r].forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
  }, []);

  let n = 0;
  const words = (s: string, bold = false) =>
    s.split(/(\s+)/).map((w) => (/^\s+$/.test(w) || w === "" ? w : <span key={n++} className={`stmt__w${bold ? " stmt__w--b" : ""}`}>{w}</span>));
  return (
    <section className="section bg-grid stmt" aria-label="What Tetr students have done" ref={root}>
      <BlockTrail />
      <span className="stmt__blk stmt__blk--l" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
      <span className="stmt__blk stmt__blk--r" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
      <div className="container">
        <p className="stmt__p">
          {TEXT.map((p, i) =>
            typeof p === "string" ? <span key={i}>{words(p)}</span>
            : "b" in p ? <span key={i}>{words(p.b, true)}</span>
            : <span key={i} className={`stmt__chip stmt__chip--${p.chip}`} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICON[p.chip]}</svg></span>,
          )}
        </p>
        <p className="t-xs stmt__src"><a href="https://online.flippingbook.com/view/706350447/" target="_blank" rel="noopener noreferrer">Source: Tetr term reports and Career Labs Report 2025&ndash;26</a></p>
      </div>
    </section>
  );
}
