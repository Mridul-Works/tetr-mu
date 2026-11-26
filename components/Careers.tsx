"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAREERS } from "@/lib/content";

/* Career Labs: the copy and four numbers, then the real intern badges in one even row that glides
   sideways as the section passes. Nothing overlaps the text. */
export default function Careers() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const track = sec.querySelector<HTMLElement>(".careers__track")!;
    const mm = gsap.matchMedia();
    // laptops: the row of badges glides sideways while the section passes; scroll is the only driver
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
      gsap.fromTo(track, { x: 0 }, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top 70%", end: "bottom 30%", scrub: 0.6, invalidateOnRefresh: true } });
    });
    const on = ScrollTrigger.create({ trigger: sec.querySelector(".careers__stats"), start: "top 85%", once: true, onEnter: () => sec.classList.add("is-on") });
    return () => { mm.revert(); on.kill(); };
  }, []);
  return (
    <section id="careers" className="section bg-grid careers" aria-labelledby="careers-title" ref={root}>
      <div className="container careers__grid">
        <div className="careers__copy">
          <div className="frame-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="careers-title" className="t-h2">Your internship starts in year one, not your final year.</h2>
          </div>
          <p className="t-body">Through Career Labs, students unlock internships across 23 countries, from Google and Formula 1 to BlackRock, eBay and high-growth startups, with stipends of up to $4,000.</p>
        </div>
        <dl className="careers__stats">
          {CAREERS.stats.map((s, i) => (
            <div key={s.label} style={{ "--i": i } as React.CSSProperties}><dt>{s.value}</dt><dd>{s.label}</dd></div>
          ))}
        </dl>
      </div>
      <div className="careers__rail" aria-label="Where students interned">
        <ul role="list" className="careers__track">
          {CAREERS.interns.map((p, i) => (
            <li key={p.img} className="badge" style={{ "--t": `${[-1.5, 1.2, -0.8, 1.6, -1.2, 0.9, -1.6, 1.1, -0.6][i]}deg` } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/interns/${p.img}.webp`} alt={`${p.name}, intern at ${p.org}`} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
