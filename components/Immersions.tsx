"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FrameBox, { LogoBlocks } from "./mu/FrameBox";

/* MU's "Immersions": a sky, a rail of vertical labels, and a card per kind of immersion.
   MU's rail carries a little drawn traveller; Tetr's carries its logo blocks.
   Cast: lead = the card coming up and settling over the last one (sticky stack),
   support = the rail marker sliding to the next label, still = sky, title, labels. */

/* "Hello" in ten languages of the route and the cohort, stitched into the sky like embroidery: a dashed
   thread, no fill, faint, a few to a screen. They sew themselves in once, when the section arrives. */
const STITCH: { w: string; x: number; y: number; r: number; s: number; t: string }[] = [
  { w: "مرحبا", x: 6, y: 3, r: -6, s: 58, t: "#ffffff" },
  { w: "你好", x: 83, y: 2.4, r: 5, s: 66, t: "#ffffff" },
  { w: "Hello", x: 16, y: 9.5, r: -3, s: 46, t: "#7ad19c" },
  { w: "Akwaaba", x: 69, y: 10.5, r: 4, s: 48, t: "#ffffff" },
  { w: "नमस्ते", x: 88, y: 15, r: -5, s: 46, t: "#f0c300" },
  { w: "Hola", x: 1.5, y: 40, r: -8, s: 54, t: "#ffffff" },
  { w: "Bienvenidos", x: 77, y: 52, r: 6, s: 44, t: "#7ad19c" },
  { w: "こんにちは", x: 3, y: 70, r: 4, s: 42, t: "#ffffff" },
  { w: "안녕하세요", x: 72, y: 85, r: -4, s: 44, t: "#ffffff" },
  { w: "Olá", x: 30, y: 95, r: 6, s: 54, t: "#f0c300" },
];

const CARDS = [
  {
    key: "business", label: "Business", tone: "#0f6b4f",
    title: ["Business", "Immersion"],
    note: "Go inside the businesses that define each country.",
    points: [
      "Emirates in Dubai, the Tesla Gigafactory in Shanghai, Google in the US and Zomato in India.",
      "ITC on FMCG, hospitality and agribusiness. Nivia Sports on manufacturing. Pee Safe on scaling a D2C femtech brand.",
      "LinkedIn on data, talent and the future of work.",
    ],
    photos: [
      { src: "/img/x/itc-india.webp", alt: "The Tetr cohort outside ITC in India", tag: "ITC · INDIA", x: 8, y: 9, w: 44, r: -2 },
      { src: "/img/x/emirates-dubai.webp", alt: "Students visiting Emirates in Dubai", tag: "EMIRATES · DUBAI", x: 52, y: 5, w: 42, r: 2.5 },
      { src: "/img/x/linkedin-india.webp", alt: "The cohort at LinkedIn in India", tag: "LINKEDIN · INDIA", x: 30, y: 52, w: 52, r: -1 },
    ],
    caption: "INSIDE THE COMPANY",
  },
  {
    key: "culture", label: "Cultural", tone: "#b38a00",
    title: ["Cultural", "Immersion"],
    note: "Then step into the markets and traditions that shape how people buy.",
    points: [
      "Witness the Taj Mahal, one of the world's most iconic monuments.",
      "Step inside Parliament House, the seat of Indian democracy.",
      "Walk Dubai's Gold Souk, then head out on a desert safari.",
    ],
    photos: [
      { src: "/img/x/tajmahal-inida.webp", alt: "Tetr students at the Taj Mahal", tag: "TAJ MAHAL · AGRA", x: 10, y: 6, w: 38, r: -2.5 },
      { src: "/img/x/goldsouk-dubai.webp", alt: "Students in Dubai's Gold Souk", tag: "GOLD SOUK · DUBAI", x: 54, y: 12, w: 38, r: 2 },
      { src: "/img/x/parliament-india.webp", alt: "Students at Parliament House in New Delhi", tag: "PARLIAMENT · NEW DELHI", x: 22, y: 56, w: 54, r: -1.2 },
    ],
    caption: "OUTSIDE THE CLASSROOM",
  },
];

export default function Immersions() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const labels = sec.querySelectorAll<HTMLElement>(".imm__label");
    const cards = sec.querySelectorAll<HTMLElement>(".imm__card");
    const sts = Array.from(cards).map((c, i) =>
      ScrollTrigger.create({
        trigger: c, start: "top 60%", end: "bottom 40%",
        onToggle: (s) => {
          if (!s.isActive) return;
          labels.forEach((l, k) => l.classList.toggle("is-on", k === i));
        },
      }),
    );
    const sew = ScrollTrigger.create({ trigger: sec, start: "top 70%", once: true, onEnter: () => sec.classList.add("is-sewn") });
    return () => { sts.forEach((s) => s.kill()); sew.kill(); };
  }, []);

  return (
    <section id="immersions" className="imm" aria-labelledby="imm-title" ref={root}>
      <div className="imm__sky" aria-hidden="true" />
      <div className="imm__stitch" aria-hidden="true">
        {STITCH.map((s) => (
          <svg key={s.w} className="stitch" style={{ left: `${s.x}%`, top: `${s.y}%`, rotate: `${s.r}deg`, "--t": s.t } as React.CSSProperties} width="1" height="1" overflow="visible">
            <text x="0" y={s.s} fontSize={s.s}>{s.w}</text>
          </svg>
        ))}
      </div>
      <div className="container imm__head">
        <h2 id="imm-title" className="t-h2" data-reveal="lines">Immersions</h2>
        <p className="t-body imm__intro" data-reveal>Some students read about Emirates and Ferrari. You&rsquo;ll walk through their doors, in every country you live in.</p>
      </div>
      <div className="container imm__body">
        <div className="imm__rail" aria-hidden="true">
          {CARDS.map((c, i) => <span key={c.key} className={`imm__label${i === 0 ? " is-on" : ""}`}><span className="imm__marker"><LogoBlocks /></span>{c.label}</span>)}
        </div>
        <div className="imm__cards">
          {CARDS.map((c, i) => (
            <article key={c.key} className="imm__card" style={{ "--tone": c.tone, "--n": i } as React.CSSProperties} aria-label={`${c.label} immersion`}>
              <div className="imm__left">
                <FrameBox className="imm__title-box"><h3 className="imm__title">{c.title[0]}<br />{c.title[1]}</h3></FrameBox>
                <div className="imm__note">
                  <span className="imm__note-under" aria-hidden="true" />
                  <div className="imm__paper">
                    <span className="imm__spiral" aria-hidden="true" />
                    <p className="imm__paper-h">{c.note}</p>
                    <ol className="imm__points">
                      {c.points.map((p, k) => <li key={k}><span>{String(k + 1).padStart(2, "0")}</span><p>{p}</p></li>)}
                    </ol>
                  </div>
                </div>
              </div>
              <div className="imm__right">
                {c.photos.map((p) => (
                  <figure key={p.tag} className="imm__photo" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, rotate: `${p.r}deg` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.alt} loading="lazy" />
                    <figcaption className="imm__tag">{p.tag}</figcaption>
                  </figure>
                ))}
                <p className="imm__mono" aria-hidden="true">{c.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
