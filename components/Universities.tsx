"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UNIS } from "@/lib/content";
import { contours, guilloche } from "@/lib/passport";

const CONTOUR = contours(3);
const GUIL = guilloche(0, 0);

const INKS = ["#006a4e", "#9e2a22", "#294a94", "#6b3d8f", "#8c6a12"];

/* an entry stamp: double ring, the city around the edge, the country code in the middle */
function Stamp({ city, cc, i }: { city: string; cc: string; i: number }) {
  const id = `uni-st-${i}`;
  return (
    <svg viewBox="0 0 100 100" className="uni__stamp" style={{ "--ink": INKS[i % INKS.length], "--r": `${[-8, 6, -4, 9, -11, 4, -6, 7, -3][i % 9]}deg` } as React.CSSProperties} aria-hidden="true">
      <defs>
        <path id={id} d="M 50 50 m -34 0 a 34 34 0 1 1 68 0 a 34 34 0 1 1 -68 0" />
        <filter id={`${id}-ink`}><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed={i + 3} /><feDisplacementMap in="SourceGraphic" scale="2.2" /></filter>
      </defs>
      <g filter={`url(#${id}-ink)`} fill="none" stroke="var(--ink)">
        <circle cx="50" cy="50" r="46" strokeWidth="2.2" />
        <circle cx="50" cy="50" r="25" strokeWidth="1.2" />
        <text fill="var(--ink)" stroke="none" fontSize="8.6" fontWeight="700" letterSpacing="2"><textPath href={`#${id}`} startOffset="0">{city.toUpperCase()} · ENTRY · TETR ·</textPath></text>
        <text x="50" y="55" textAnchor="middle" fill="var(--ink)" stroke="none" fontSize="14" fontWeight="700" letterSpacing="1">{cc}</text>
      </g>
    </svg>
  );
}

export default function Universities() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = Array.from(root.current!.querySelectorAll<HTMLElement>(".uni"));
    // the light: on a mouse, the card under the pointer shows its hidden contours and guilloche in colour
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const offs: (() => void)[] = [];
    if (fine) cards.forEach((c) => {
      let raf = 0, x = 0, y = 0;
      const paint = () => { raf = 0; const r = c.getBoundingClientRect(); c.style.setProperty("--ux", `${x - r.left}px`); c.style.setProperty("--uy", `${y - r.top}px`); };
      const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
      const enter = () => c.classList.add("is-uv"), leave = () => c.classList.remove("is-uv");
      c.addEventListener("pointermove", move); c.addEventListener("pointerenter", enter); c.addEventListener("pointerleave", leave);
      offs.push(() => { c.removeEventListener("pointermove", move); c.removeEventListener("pointerenter", enter); c.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); });
    });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { cards.forEach((c) => c.classList.add("is-stamped")); return () => offs.forEach((f) => f()); }
    // cards stamp in reading order as they arrive; gaps shrink inside each batch
    const b = ScrollTrigger.batch(cards, {
      start: "top 82%", once: true,
      onEnter: (els) => els.forEach((el, k) => window.setTimeout(() => el.classList.add("is-stamped"), Math.round(380 * (1 - Math.pow(1 - k / Math.max(1, els.length - 1), 2))))),
    });
    return () => { b.forEach((t) => t.kill()); offs.forEach((f) => f()); };
  }, []);
  return (
    <section id="universities" className="section section--paper bg-grid unis" aria-labelledby="unis-title" ref={root}>
      <svg width="0" height="0" className="sr-only" aria-hidden="true">
        <defs>
          <symbol id="pp-contour" viewBox="0 0 400 360"><g fill="none">{CONTOUR.map((d, k) => <path key={k} d={d} />)}</g></symbol>
          <symbol id="pp-guil" viewBox="-130 -130 260 260"><path d={GUIL} fill="none" /></symbol>
        </defs>
      </svg>
      <div className="container">
        <header className="sec-head">
          <div className="frame-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="unis-title" className="t-h2">Some of the world&rsquo;s leading universities are on your route.</h2>
          </div>
          <p className="t-body sec-head__intro">As you move across Tetr&rsquo;s base camps, you study at partner universities: you learn from their faculty and walk their campuses, so the academic depth travels with the building.</p>
        </header>
        <ul role="list" className="unis__grid">
          {UNIS.map((u, i) => (
            <li key={u.name} className="uni">
              <figure className="uni__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/unis/${u.img}.webp`} alt={`${u.name} campus`} loading="lazy" decoding="async" />
              </figure>
              <div className="uni__body">
                <p className="t-xs uni__meta">{u.city} · {u.cc}</p>
                <h3 className="uni__name">{u.name}</h3>
                <p className="uni__mrz" aria-hidden="true">{`P<${u.cc}${u.name.toUpperCase().replace(/[^A-Z]+/g, "<")}<<TETR`.padEnd(38, "<").slice(0, 38)}</p>
              </div>
              <svg className="uni__guil" viewBox="0 0 400 360" aria-hidden="true"><use href="#pp-guil" x="236" y="216" width="190" height="190" transform={`rotate(${i * 23} 331 311)`} /></svg>
              <span className="uni__uv" aria-hidden="true" style={{ "--uvc": INKS[i % INKS.length] } as React.CSSProperties}>
                <svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMid slice"><use href="#pp-contour" width="400" height="360" transform={`rotate(${(i * 41) % 360} 200 180) translate(${(i % 3) * 30 - 30} ${(i % 2) * 24 - 12})`} /><use href="#pp-guil" x="236" y="216" width="190" height="190" /></svg>
              </span>
              <Stamp city={u.city} cc={u.cc} i={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
