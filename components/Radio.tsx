"use client";
import { useRef, useState } from "react";
import FrameBox from "./mu/FrameBox";
import BlockField from "./mu/BlockField";
import BlockTrail from "./mu/BlockTrail";

/* MU's "Campus Radio" carousel: big thumbnails, a title and a source line, arrows and dots.
   Tetr's podcasts and events, from its homepage. */
const ITEMS = [
  { img: "podcast-kevin", title: "I invest in a lot of a**holes", sub: "Podcast ft. Kevin O'Leary" },
  { img: "podcast-morgan", title: "The hidden rules of rich families", sub: "Podcast ft. Morgan Housel" },
  { img: "podcast-nir", title: "How your phone is controlling you", sub: "Podcast ft. Nir Eyal" },
  { img: "podcast-daniel", title: "Inside the Gigafactory", sub: "Podcast ft. Daniel G. Van Der Vliet" },
  { img: "event-connect", title: "TETR Connect: Mexico City Edition", sub: "Event" },
  { img: "event-persuasion", title: "The Psychology of Persuasion", sub: "Event" },
  { img: "event-ifg", title: "IFG x Tetr Business Competition", sub: "Event" },
];

export default function Radio() {
  const track = useRef<HTMLUListElement>(null);
  const [at, setAt] = useState(0);
  const go = (i: number) => {
    const t = track.current!;
    const k = Math.max(0, Math.min(ITEMS.length - 1, i));
    const el = t.children[k] as HTMLElement;
    t.scrollTo({ left: el.offsetLeft - t.offsetLeft, behavior: "smooth" });
    setAt(k);
  };
  const onScroll = () => {
    const t = track.current!;
    const w = (t.children[0] as HTMLElement).offsetWidth + 12;
    setAt(Math.round(t.scrollLeft / w));
  };
  return (
    <section id="radio" className="has-bfield section bg-grid radio" aria-labelledby="radio-title">
      <BlockTrail />
      <BlockField pieces={[{ c: -10, r: 1, shape: "logo", tone: "mint" }, { c: 8, r: 3, shape: "J", tone: "pink" }, { c: 3, r: 0, shape: "O", tone: "blank" }]} />
      <div className="container">
        <header className="radio__head">
          <FrameBox className="radio__title"><h2 id="radio-title" className="t-h2" data-reveal="lines">If you&rsquo;ve scrolled this far, you&rsquo;ll enjoy these.</h2></FrameBox>
          <p className="t-body radio__intro" data-reveal>Admissions deep-dives, term wrap-ups and unfiltered conversations with the people you&rsquo;ll soon be building alongside.</p>
        </header>
      </div>
      <ul className="radio__track" ref={track} onScroll={onScroll}>
        {ITEMS.map((it) => (
          <li key={it.img} className="radio__item">
            <a href="https://tetr.com" target="_blank" rel="noopener noreferrer" className="radio__link">
              <span className="radio__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/x/${it.img}.webp`} alt="" loading="lazy" />
                <span className="radio__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
              </span>
              <span className="radio__meta">
                <span className="radio__avatar" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></span>
                <span><b>{it.title}</b><span>{it.sub}</span></span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="radio__nav">
        <button type="button" className="radio__arrow" aria-label="Previous" onClick={() => go(at - 1)} disabled={at === 0}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg></button>
        <span className="radio__dots">{ITEMS.map((_, i) => <button key={i} type="button" aria-label={`Go to ${i + 1}`} className={`radio__dot${i === at ? " is-on" : ""}`} onClick={() => go(i)} />)}</span>
        <button type="button" className="radio__arrow radio__arrow--next" aria-label="Next" onClick={() => go(at + 1)} disabled={at >= ITEMS.length - 1}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
      </div>
    </section>
  );
}
