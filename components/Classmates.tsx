"use client";
import { useEffect, useRef } from "react";
import { CLASSMATES } from "@/lib/content";

const LANG = ["English", "Arabic", "Hindi", "Mandarin", "Twi · welcome", "Spanish", "French", "Korean", "Swahili", "German", "Portuguese", "Latvian · good day"];
const W = 8;

/* A split-flap board that says hello in the cohort's languages. It only flips while it is on screen,
   every 2.6 s; each tile flips 35 ms after the one before it, like a real board. */
export default function Classmates() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const sec = root.current!;
    const tiles = Array.from(sec.querySelectorAll<HTMLElement>(".flap__t"));
    const lang = sec.querySelector<HTMLElement>(".flap__lang")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, timer = 0;
    const show = (word: string, animate: boolean) => {
      const chars = word.padEnd(W, " ").slice(0, W).split("");
      tiles.forEach((t, k) => {
        const c = chars[k] === " " ? "" : chars[k];
        if (t.textContent === c) return;
        t.textContent = c;
        if (animate) t.animate([{ transform: "rotateX(-88deg)", opacity: 0.2 }, { transform: "rotateX(0deg)", opacity: 1 }], { duration: 220, delay: k * 35, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "backwards" });
      });
    };
    const step = () => { i = (i + 1) % CLASSMATES.hellos.length; show(CLASSMATES.hellos[i], true); lang.textContent = LANG[i]; };
    show(CLASSMATES.hellos[0], false); lang.textContent = LANG[0];
    if (reduce) return;
    const io = new IntersectionObserver(([e]) => { clearInterval(timer); if (e.isIntersecting) timer = window.setInterval(step, 2600); }, { threshold: 0.2 });
    io.observe(sec.querySelector(".flap")!);
    return () => { io.disconnect(); clearInterval(timer); };
  }, []);
  return (
    <section id="classmates" className="section section--paper bg-grid mates" aria-labelledby="mates-title" ref={root}>
      <div className="container">
        <header className="sec-head">
          <div className="frame-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="mates-title" className="t-h2">The people you travel with are half the reason to go.</h2>
          </div>
          <p className="t-body sec-head__intro">Everything changes every term except the people beside you: founders who&rsquo;ve already raised money, TEDx speakers and national-level athletes.</p>
        </header>
        <div className="flap" aria-hidden="true">
          <div className="flap__row">{Array.from({ length: W }, (_, k) => <span key={k} className="flap__t" />)}</div>
          <p className="t-xs flap__lang" />
        </div>
        <p className="sr-only">Hello, in the many languages of the Tetr cohort.</p>
        <dl className="mates__stats">
          {CLASSMATES.stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
        </dl>
        <ul role="list" className="mates__row">
          {CLASSMATES.people.map((p) => (
            <li key={p.img} className="mate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/people/${p.img}.webp`} alt={`${p.name}, from ${p.from}`} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
