"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FACULTY } from "@/lib/content";

/* The 40 / 30 / 30 mix is the navigation: the bar fills once when the section arrives, and each slice
   is a tab that brings its three people forward. */
export default function Faculty() {
  const root = useRef<HTMLElement>(null);
  const [k, setK] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const on = ScrollTrigger.create({ trigger: sec.querySelector(".fac__bar"), start: "top 85%", once: true, onEnter: () => sec.classList.add("is-on") });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) sec.classList.add("is-on");
    return () => on.kill();
  }, []);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (k + (e.key === "ArrowRight" ? 1 : FACULTY.length - 1)) % FACULTY.length;
    setK(n);
    (root.current!.querySelectorAll<HTMLButtonElement>(".fac__seg")[n])?.focus();
  };
  return (
    <section id="faculty" className="section fac" aria-labelledby="fac-title" ref={root}>
      <div className="container">
        <header className="fac__head">
          <h2 id="fac-title" className="t-h2">The people teaching you have run NASA&rsquo;s knowledge office and led Estée Lauder.</h2>
          <p className="t-body">Every class at Tetr is a &ldquo;how to&rdquo;, taught by someone who has made those calls in real companies. When you need more, 100+ mentors are a message away.</p>
        </header>
        <div className="fac__bar" role="tablist" aria-label="The faculty mix" onKeyDown={onKey}>
          {FACULTY.map((g, i) => (
            <button key={g.title} type="button" role="tab" id={`fac-tab-${i}`} aria-controls={`fac-panel-${i}`} aria-selected={k === i} tabIndex={k === i ? 0 : -1}
              className="fac__seg" style={{ "--w": g.share, "--i": i } as React.CSSProperties} onClick={() => setK(i)}>
              <span className="fac__fill" aria-hidden="true" />
              <span className="fac__share">{g.share}%</span>
              <span className="fac__title">{g.title}</span>
            </button>
          ))}
        </div>
        {FACULTY.map((g, i) => (
          <div key={g.title} id={`fac-panel-${i}`} role="tabpanel" aria-labelledby={`fac-tab-${i}`} className={`fac__panel${k === i ? " is-active" : ""}`} hidden={k !== i}>
            <p className="t-small fac__line">{g.line}</p>
            <ul role="list" className="fac__people">
              {g.people.map((p, j) => (
                <li key={p.name} className="fac__card" style={{ "--j": j } as React.CSSProperties}>
                  <span className="fac__arch">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/img/faculty/${p.img}.webp`} alt="" loading="lazy" decoding="async" />
                  </span>
                  <h3 className="fac__name">{p.name}</h3>
                  <p className="t-xs fac__role">{p.role}</p>
                  <p className="t-small fac__teach"><span>Teaches</span> {p.teach}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
