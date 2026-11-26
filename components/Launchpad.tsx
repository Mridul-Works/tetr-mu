"use client";
import { useEffect, useState } from "react";
import FrameBox, { LogoBlocks } from "./mu/FrameBox";

/* MU's green "We fund the companies our students start": a framed title, a film-strip photo
   with a paper list clipped to it, and the ventures running along the bottom.
   Every line here is from Tetr's Launchpad and final-exam sections. */

const SLIDES = [
  { src: "/img/x/launchpad-pitch.webp", alt: "Tetr founders holding their Brand Wars investment cheques" },
  { src: "/img/x/d2c-bazaar-2.webp", alt: "A student brand's stall at Tetr's D2C bazaar" },
  { src: "/img/x/event-ifg.webp", alt: "Student teams presenting at the IFG x Tetr business competition" },
  { src: "/img/x/built-tetr-2.webp", alt: "The Icebreakers team, a venture built at Tetr" },
];
const GETS = [
  "A $10 million fund reserved for Tetr students",
  "Capital when your idea shows real promise, not when you graduate",
  "Mentorship from investors and operators who've done this before",
  "Tetr Tank: Dubai's teams pitch Shark-Tank style for real money",
  "Brand Wars: the top 7 D2C brands pitch to the founders of Tetr, Rare Rabbit and The Moms Co.",
  "Over $300K already raised by Tetr students this way",
];
const NAMES = ["Bike Arena", "Lavella", "Jhatak", "Kalaam", "Kando", "Meridian", "Icebreakers", "Serve Club", "Cossmoss", "Tafflo", "Chula Fashion", "Nothing But", "Critter Chaos", "Welz Company", "Slide Pass"];

export default function Launchpad() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5200);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="launchpad" className="lp" aria-labelledby="lp-title" data-tone="dark">
      <LogoBlocks className="lp__deco lp__deco--l" />
      <LogoBlocks className="lp__deco lp__deco--r" />
      <div className="container">
        <FrameBox dark className="lp__title"><h2 id="lp-title" className="t-h2" data-reveal="lines">What if your first investor was already waiting for you?</h2></FrameBox>
        <div className="lp__media">
          {SLIDES.map((s, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.src} src={s.src} alt={k === i ? s.alt : ""} className={`lp__img${k === i ? " is-on" : ""}`} loading="lazy" />
          ))}
          <div className="lp__dots" role="tablist" aria-label="Photos">
            {SLIDES.map((s, k) => <button key={s.src} type="button" role="tab" aria-selected={k === i} aria-label={`Photo ${k + 1}`} className="lp__dot" onClick={() => setI(k)} />)}
          </div>
          <div className="lp__paper">
            <svg className="lp__clip" viewBox="0 0 40 90" aria-hidden="true"><path d="M14 80V16a8 8 0 0 1 16 0v52a5 5 0 0 1-10 0V22" fill="none" stroke="#a9aeb3" strokeWidth="3.2" strokeLinecap="round" /></svg>
            <p className="lp__paper-h">What you get if you decide to build</p>
            <ol className="lp__gets">
              {GETS.map((g, k) => <li key={k}><span>{String(k + 1).padStart(2, "0")}</span>{g}</li>)}
            </ol>
            <div className="lp__ctas">
              <a href="https://tetr.com/launchpad" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--light"><span className="btn__label">Explore Launchpad</span></a>
              <a href="https://tetr.com/launchpad" target="_blank" rel="noopener noreferrer" className="lp__hs">Still in high school? Pitch to Launchpad</a>
            </div>
          </div>
        </div>
      </div>
      <div className="lp__marquee" aria-label="Ventures built by Tetr students">
        <ul className="lp__track">
          {[...NAMES, ...NAMES].map((n, k) => <li key={k} aria-hidden={k >= NAMES.length}>{n}</li>)}
        </ul>
      </div>
    </section>
  );
}
