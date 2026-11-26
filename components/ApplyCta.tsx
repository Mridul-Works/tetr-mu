"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { APPLY_URL } from "@/lib/content";
import { LogoBlocks } from "./mu/FrameBox";

/* MU's closing card, made to move: the campus behind it changes every few seconds, two rows of student
   life run past in opposite directions and lean with the speed of your scroll, and the logo's blocks
   breathe in the card. The card itself stays still, so the words are easy to read. */
const BGS = ["dubai-cohort", "india-studentlife", "event-connect", "dubai-campus"];
const ROW_A = ["india-studentlife", "dubai-common-areas", "d2c-bazaar-2", "event-connect", "india-campus", "built-tetr-2", "itc-india"];
const ROW_B = ["dubai-outdoors", "linkedin-india", "tajmahal-inida", "event-ifg", "dubai-dining", "brand-wars", "goldsouk-dubai"];

export default function ApplyCta() {
  const root = useRef<HTMLElement>(null);
  const [bg, setBg] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setBg((v) => (v + 1) % BGS.length), 4800);
    const rows = root.current!.querySelectorAll(".cta__row");
    const lean = gsap.quickTo(rows, "skewX", { duration: 0.6, ease: "power3.out" });
    const st = ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onUpdate: (s) => lean(gsap.utils.clamp(-6, 6, s.getVelocity() / -400)) });
    return () => { clearInterval(t); st.kill(); };
  }, []);
  const row = (list: string[], cls: string) => (
    <div className={`cta__row ${cls}`} aria-hidden="true">
      <div className="cta__track">
        {[...list, ...list].map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={`/img/x/${s}.webp`} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
  return (
    <section id="apply" className="cta" aria-labelledby="cta-title" data-tone="dark" ref={root}>
      <div className="cta__bgs" aria-hidden="true">
        {BGS.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={s} className={`cta__bg${i === bg ? " is-on" : ""}`} src={`/img/x/${s}.webp`} alt="" loading="lazy" />
        ))}
      </div>
      {row(ROW_A, "cta__row--a")}
      <div className="container cta__inner">
        <div className="cta__card">
          <div className="cta__text">
            <LogoBlocks className="cta__logo" />
            <h2 id="cta-title" className="cta__h" data-reveal="lines">Seven countries, seven businesses, one degree.</h2>
            <p>Global Bachelor&rsquo;s and Master&rsquo;s programs in Management &amp; Technology. Every term you live in a new country, build a real business, and get graded on what it earns.</p>
            <div className="cta__btns">
              <a href={APPLY_URL} className="btn btn--primary btn--light"><span className="btn__label">Begin your application</span></a>
              <a href="https://tetr.com/contact-us" className="cta__talk">Talk to admissions</a>
            </div>
          </div>
          <figure className="cta__ph">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/x/launchpad-pitch.webp" alt="Tetr founders celebrating at Brand Wars" loading="lazy" />
          </figure>
        </div>
      </div>
      {row(ROW_B, "cta__row--b")}
    </section>
  );
}
