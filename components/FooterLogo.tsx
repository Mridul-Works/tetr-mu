"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TERMS } from "@/lib/terms";

/* The footer's Tetr mark, built by the route: seven blocks (one per term, in its term colour, with its
   country on it) drift in scattered and lock into the logo as you scroll down to it. When the last
   block lands the colours settle to Tetr's white and green and the words appear.

   Cast: lead = the blocks (scrubbed by scroll, shrinking gaps), support = the words (one beat after the
   lock), still = the footer around it. Reduced motion shows the finished logo. */

// [column, row] of each term's block in the 4 x 2 logo; the last three are the green ones
const CELL: [number, number][] = [[0, 0], [1, 0], [2, 0], [1, 1], [3, 0], [2, 1], [3, 1]];
const GREEN = new Set([4, 5, 6]);
// where each block starts, in block units: x, y, rotation
// (they start beside and below the logo, never over the footer links above it)
const SCATTER: [number, number, number][] = [[-1.8, 0.5, -16], [-0.8, 1.1, 11], [0.5, 1.4, 14], [-1.4, 0.9, -9], [2.0, 0.35, -12], [1.3, 1.2, 15], [2.4, 0.8, 8]];

export default function FooterLogo() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-locked"); return; }
    const blocks = Array.from(el.querySelectorAll<HTMLElement>(".flb"));
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 95%", end: "center 60%", scrub: 0.8,
          onLeave: () => el.classList.add("is-locked"), onEnterBack: () => el.classList.remove("is-locked") },
      });
      blocks.forEach((b, i) => {
        const [x, y, r] = SCATTER[i];
        tl.fromTo(b, { xPercent: x * 100, yPercent: y * 100, rotation: r }, { xPercent: 0, yPercent: 0, rotation: 0, ease: "power3.inOut", duration: 1 }, 0.5 * (1 - Math.pow(1 - i / blocks.length, 1.5)));
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flogo" ref={root} role="img" aria-label="Tetr College of Business">
      <div className="flogo__grid" aria-hidden="true">
        {TERMS.map((t, i) => (
          <span key={t.n} className={`flb${GREEN.has(i) ? " flb--g" : ""}`} style={{ gridColumn: CELL[i][0] + 1, gridRow: CELL[i][1] + 1, "--tint": t.tint } as React.CSSProperties}>
            <span className="flb__tag">{t.country}</span>
          </span>
        ))}
        <span className="flogo__word flogo__tetr">TETR</span>
        <span className="flogo__word flogo__cob">College of<br />Business</span>
      </div>
    </div>
  );
}
