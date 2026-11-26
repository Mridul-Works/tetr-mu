"use client";
import { useRef, useState } from "react";
import FrameBox from "./mu/FrameBox";
import BlockField from "./mu/BlockField";
import BlockTrail from "./mu/BlockTrail";

/* MU's "The Press Noticed The Results": a row of press cards with arrows. Tetr's coverage cards,
   as Tetr itself shows them (outlet, headline and photo are printed on each card). */
const PRESS = [
  { img: "press-forbes-india", outlet: "Forbes India", where: "India" },
  { img: "press-european-business", outlet: "European Business Magazine", where: "United Kingdom" },
  { img: "press-cnn-brasil", outlet: "CNN Brasil", where: "Brazil" },
  { img: "press-clarin", outlet: "Clarín", where: "Argentina" },
  { img: "press-grit-daily", outlet: "Grit Daily", where: "United States" },
  { img: "press-hankyung", outlet: "Hankyung", where: "South Korea" },
  { img: "press-ict-japan", outlet: "ICT Japan", where: "Japan" },
  { img: "press-thailand-reporter", outlet: "Thailand Reporter", where: "Thailand" },
  { img: "press-authority", outlet: "Authority Magazine", where: "United Kingdom" },
  { img: "press-aprendemas", outlet: "aprendemas", where: "Spain" },
];

export default function Press() {
  const track = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const pages = 2;
  const go = (p: number) => {
    const t = track.current!;
    const k = Math.max(0, Math.min(pages - 1, p));
    t.scrollTo({ left: k * (t.scrollWidth - t.clientWidth), behavior: "smooth" });
    setPage(k);
  };
  return (
    <section id="press" className="has-bfield section bg-grid press" aria-labelledby="press-title">
      <BlockTrail />
      <BlockField pieces={[{ c: 7, r: 0, shape: "T", tone: "yellow" }, { c: -10, r: 5, shape: "L", tone: "mint" }, { c: -3, r: 1, shape: "I", tone: "blank" }, { c: 8, r: 8, shape: "O", tone: "pink" }]} />
      <div className="container">
        <header className="press__head">
          <FrameBox className="press__title"><h2 id="press-title" className="t-h2" data-reveal="lines">The press noticed the results.</h2></FrameBox>
          <div className="press__nav">
            <button type="button" className="radio__arrow" aria-label="Previous" onClick={() => go(page - 1)} disabled={page === 0}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
            <span className="radio__dots">{Array.from({ length: pages }, (_, i) => <button key={i} type="button" aria-label={`Page ${i + 1}`} className={`radio__dot${i === page ? " is-on" : ""}`} onClick={() => go(i)} />)}</span>
            <button type="button" className="radio__arrow radio__arrow--next" aria-label="Next" onClick={() => go(page + 1)} disabled={page === pages - 1}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
          </div>
        </header>
      </div>
      <ul className="press__track" ref={track}>
        {PRESS.map((p) => (
          <li key={p.img} className="press__card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/img/x/${p.img}.webp`} alt={`${p.outlet} coverage of Tetr`} loading="lazy" />
            <p className="press__cap"><b>{p.outlet}</b><span>{p.where}</span></p>
          </li>
        ))}
      </ul>
    </section>
  );
}
