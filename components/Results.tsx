"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RESULTS } from "@/lib/content";

/* An odometer: every digit is a column of 0-9 that rolls into place. The rightmost digits spin
   the most, like a real counter, and the columns start left to right with shrinking gaps. */
function Odometer({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const text = value.toLocaleString("en-US");
  const digits = text.split("");
  let d = 0;
  const count = digits.filter((c) => /\d/.test(c)).length;
  return (
    <span className="odo" aria-label={`${prefix}${text}${suffix}`}>
      <span aria-hidden="true" className="odo__row">
        {prefix && <span className="odo__fix">{prefix}</span>}
        {digits.map((c, i) => {
          if (!/\d/.test(c)) return <span key={i} className="odo__fix">{c}</span>;
          const k = d++;
          const spins = Math.round((k / Math.max(1, count - 1)) * 2); // 0 for the first digit, 2 for the last
          const target = Number(c) + 10 * spins;
          const delay = Math.round(420 * (1 - Math.pow(1 - k / Math.max(1, count - 1), 2)));
          return (
            <span key={i} className="odo__d">
              <span className="odo__col" style={{ "--to": target, "--dl": `${delay}ms` } as React.CSSProperties}>
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

export default function Results() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const on = ScrollTrigger.create({ trigger: sec.querySelector(".res__numbers"), start: "top 80%", once: true, onEnter: () => sec.classList.add("is-on") });
    if (reduce) { sec.classList.add("is-on"); return () => on.kill(); }
    // the ring of ventures turns with the page: scroll is the only thing that moves it
    const ring = sec.querySelector(".res__ring");
    const tw = gsap.fromTo(ring, { rotation: 9 }, { rotation: -9, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.8 } });
    return () => { on.kill(); tw.scrollTrigger?.kill(); tw.kill(); };
  }, []);

  const n = RESULTS.ventures.length, spread = 132; // degrees of arc
  return (
    <section id="results" className="section bg-grid res" aria-labelledby="results-title" ref={root}>
      <div className="container">
        <header className="sec-head">
          <div className="frame-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="results-title" className="t-h2">Forget simulations. Tetr students have made real money.</h2>
          </div>
          <p className="t-body sec-head__intro">Grades tell you what you know. Revenue tells you what you can do. These are the businesses students built, term by term, and what they earned.</p>
        </header>
      </div>
      <div className="res__stage">
        <div className="res__ring" aria-hidden="true">
          {RESULTS.ventures.map((v, i) => (
            <figure key={v.img} className="res__poster" style={{ "--a": `${-spread / 2 + (spread * i) / (n - 1)}deg` } as React.CSSProperties}>
              <span className="res__poster-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/ventures/${v.img}.webp`} alt="" loading="lazy" decoding="async" />
              </span>
            </figure>
          ))}
        </div>
        <div className="res__numbers">
          <p className="res__big"><Odometer {...RESULTS.stats[1]} /><span className="res__label">{RESULTS.stats[1].label}</span></p>
          <div className="res__side">
            <p><Odometer {...RESULTS.stats[0]} /><span className="res__label">{RESULTS.stats[0].label}</span></p>
            <p><Odometer {...RESULTS.stats[2]} /><span className="res__label">{RESULTS.stats[2].label}</span></p>
          </div>
          <ul role="list" className="res__lines">
            {RESULTS.lines.map((l) => <li key={l.value}><b>{l.value}</b> {l.label}</li>)}
          </ul>
          <p className="t-xs res__src">Ventures shown: {RESULTS.ventures.map((v) => v.name).join(", ")}. Figures from Tetr&rsquo;s published term reports.</p>
        </div>
      </div>
    </section>
  );
}
