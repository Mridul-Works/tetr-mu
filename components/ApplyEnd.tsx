"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TERMS } from "@/lib/terms";
import { LOGO, GREEN } from "@/lib/route";
import { APPLY_URL } from "@/lib/content";

/* The close: the seven countries arrive as seven blocks and lock into Tetr's logo as you scroll.
   Scroll drives the blocks; the words of the logo land with the last block. */
const SCATTER: [number, number, number][] = [[-260, -120, -14], [-120, 160, 9], [40, -170, 12], [250, -60, -8], [-200, 140, 16], [160, 150, -12], [300, 90, 7]];

export default function ApplyEnd() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const blocks = Array.from(sec.querySelectorAll<HTMLElement>(".lb"));
    const words = sec.querySelectorAll(".lockup__word");
    const tags = sec.querySelectorAll(".lb__tag");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { sec.classList.add("is-locked"); return; }
    const tl = gsap.timeline({ scrollTrigger: { trigger: sec.querySelector(".lockup"), start: "top 90%", end: "center 52%", scrub: 0.7, onLeave: () => sec.classList.add("is-locked"), onEnterBack: () => sec.classList.remove("is-locked") } });
    blocks.forEach((b, i) => {
      const [x, y, r] = SCATTER[i];
      tl.fromTo(b, { xPercent: (x / 100) * 100, yPercent: (y / 100) * 100, rotation: r }, { xPercent: 0, yPercent: 0, rotation: 0, ease: "power3.inOut", duration: 1 }, i * 0.06);
    });
    tl.to(tags, { opacity: 0, duration: 0.25 }, 0.75).fromTo(words, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, stagger: 0.06 }, 1.05);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);
  return (
    <section id="apply" className="section apply" aria-labelledby="apply-title" ref={root}>
      <div className="container apply__grid">
        <div className="apply__copy">
          <h2 id="apply-title" className="t-h2">The world is your classroom. Your business is the coursework.</h2>
          <p className="t-lead">Seven countries, seven businesses, one degree. Scholarships cover up to full tuition.</p>
          <div className="apply__ctas">
            <a href={APPLY_URL} className="btn btn--primary btn--light btn--l"><span className="btn__label">Start your application</span></a>
            <a href="https://tetr.com" className="btn btn--link btn--l apply__talk"><span className="btn__label">Talk to admissions</span></a>
          </div>
        </div>
        <div className="lockup" aria-hidden="true">
          <div className="lockup__grid">
            {TERMS.map((t, i) => (
              <span key={t.n} className={`lb${GREEN.has(i) ? " lb--g" : ""}`} style={{ gridColumn: LOGO[i][0] + 1, gridRow: LOGO[i][1] + 1, "--tint": t.tint } as React.CSSProperties}>
                <span className="lb__tag">{t.country}</span>
              </span>
            ))}
            <span className="lockup__word lockup__tetr">TETR</span>
            <span className="lockup__word lockup__cob">College of<br />Business</span>
          </div>
        </div>
      </div>
    </section>
  );
}
