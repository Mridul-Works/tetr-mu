"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockField from "./mu/BlockField";
import BlockTrail from "./mu/BlockTrail";

/* MU's "Where our Cohorts went." with Tetr's own record. Every name and number is printed on
   Tetr's venture posters or its Career Labs cards (tetr-homepage-v10.lovable.app, 26 Nov 2026).

   Cast (desktop, pinned): lead = the left photo (wipes up), support = the right result card and the
   two captions (fade, 80 ms behind), still = the tabs, the frame and the list frame. The list slides
   so the active name sits in the middle; inactive names stay readable at 35%. */

type Item = { key: string; name: string; img: string; pos?: string; during: string; big: string; small: string; now: string; tag: string };

const VENTURES: Item[] = [
  { key: "bike", name: "Bike Arena", img: "/img/ventures/bike-arena.webp", pos: "50% 60%", during: "Bike Arena was started by a Class of 2028 student while studying at Tetr.", big: "$102,361", small: "in revenue", now: "Bike Arena has made $102,361 in revenue, as printed on Tetr's venture poster.", tag: "Class of 2028" },
  { key: "lavella", name: "Lavella", img: "/img/ventures/lavella.webp", pos: "50% 52%", during: "Lavella was built by Class of 2029 students for Brand Wars, the D2C finale of the India term.", big: "$25,835", small: "raised at Brand Wars", now: "Lavella raised $25,835.66 from investors at Brand Wars.", tag: "Class of 2029" },
  { key: "jhatak", name: "Jhatak", img: "/img/ventures/jhatak.webp", pos: "50% 55%", during: "Jhatak pitched at Brand Wars to the founders of Tetr, Rare Rabbit and The Moms Co.", big: "$20,636", small: "raised at Brand Wars", now: "Jhatak raised $20,636.37 at Brand Wars.", tag: "Class of 2029" },
  { key: "kando", name: "Kando", img: "/img/ventures/kando-v2.webp", pos: "50% 70%", during: "Kando was launched on Kickstarter by Class of 2028 students in the China term.", big: "11 min", small: "to 100% funded", now: "Kando's Kickstarter hit 100% of its goal in eleven minutes.", tag: "Class of 2028" },
  { key: "kalaam", name: "Kalaam", img: "/img/ventures/kalaam.webp", pos: "50% 55%", during: "Kalaam was built by Class of 2029 students in the India D2C term.", big: "$13,185", small: "raised at Brand Wars", now: "Kalaam raised $13,185.83 at Brand Wars.", tag: "Class of 2029" },
  { key: "ice", name: "Icebreakers", img: "/img/x/built-tetr-2.webp", pos: "50% 40%", during: "Icebreakers makes conversation-starter tees and sustainable wallets.", big: "$9,779", small: "in revenue", now: "Icebreakers made $9,779 in revenue in the India D2C term.", tag: "India · D2C" },
];

const INTERNS: Item[] = [
  { key: "f1", name: "Formula 1", img: "/img/interns/tetr-cl11-f1-anshika.webp", pos: "50% 30%", during: "Anshika Agarwal, Class of 2029.", big: "Formula 1", small: "internship", now: "One of 314 internships placed through Career Labs in 2025–26.", tag: "Class of 2029" },
  { key: "google", name: "Google", img: "/img/interns/tetr-cl11-google-loris.webp", pos: "50% 30%", during: "Loris De Rosso, Class of 2028.", big: "Google", small: "internship", now: "Tetr students interned across 23 countries and regions this year.", tag: "Class of 2028" },
  { key: "ebay", name: "eBay", img: "/img/interns/tetr-cl11-ebay-tanisha.webp", pos: "50% 30%", during: "Tanisha Gureja, Class of 2028.", big: "eBay", small: "internship", now: "Stipends run up to $4,000; the cohort earned $204K+ between them.", tag: "Class of 2028" },
  { key: "difc", name: "DIFC", img: "/img/interns/tetr-cl11-difc-weronika.webp", pos: "50% 30%", during: "Weronika Leśniak, Class of 2028.", big: "DIFC", small: "internship", now: "Career Labs works with 110+ recruiters from leading global organisations.", tag: "Class of 2028" },
  { key: "blackrock", name: "Jio BlackRock", img: "/img/interns/tetr-cl11-blackrock-antriksh.webp", pos: "50% 30%", during: "Antriksh Gupta, Class of 2029.", big: "BlackRock", small: "Jio BlackRock internship", now: "70% of students had an internship before their second year.", tag: "Class of 2029" },
];

const TABS = [
  { label: "Ventures", items: VENTURES },
  { label: "Internships", items: INTERNS },
];
const ALL = [...VENTURES, ...INTERNS];
const DESK = "(min-width: 1024px) and (min-height: 620px)";

export default function Proof() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0); // index into ALL
  const tab = active < VENTURES.length ? 0 : 1;
  const st = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const mm = gsap.matchMedia();
    mm.add(DESK, () => {
      const N = ALL.length;
      const t = ScrollTrigger.create({
        trigger: sec.querySelector(".proof__pin"),
        start: "top top+=72",
        end: () => "+=" + window.innerHeight * 0.42 * (N - 1),
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setActive(Math.min(N - 1, Math.round(self.progress * (N - 1)))),
      });
      st.current = t;
      return () => { st.current = null; t.kill(); };
    });
    return () => mm.revert();
  }, []);

  const go = (i: number) => {
    const t = st.current;
    if (!t) { setActive(i); return; }
    const y = t.start + (t.end - t.start) * (i / (ALL.length - 1)) + 2;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 }); else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const list = TABS[tab].items;
  const local = tab === 0 ? active : active - VENTURES.length;

  return (
    <section id="proof" className="has-bfield section bg-grid proof" aria-labelledby="proof-title" ref={root}>
      <BlockTrail />
      <BlockField pieces={[{ c: -10, r: 1, shape: "S", tone: "mint" }, { c: 8, r: 6, shape: "L", tone: "pink" }, { c: -9, r: 12, shape: "logo", tone: "yellow" }, { c: -4, r: 3, shape: "I", tone: "blank" }, { c: 9, r: 15, shape: "T", tone: "mint" }, { c: 2, r: 19, shape: "O", tone: "blank" }, { c: -10, r: 22, shape: "J", tone: "pink" }]} />
      <div className="container">
        <header className="proof__head">
          <div className="frame-box proof__title-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="proof-title" className="t-h2">Where Tetr students went.</h2>
          </div>
          <div className="frame-box proof__intro-box">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" /><span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <p className="t-body">From a Kickstarter funded in eleven minutes to internships at Google, Formula 1 and eBay, Tetr students start building and working in their first year, not after they graduate.</p>
          </div>
          <span className="proof__blocks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
        </header>

        <div className="proof__pin">
          <div className="proof__panel">
            <div className="proof__glow" aria-hidden="true">
              {ALL.map((it, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={it.key} src={it.img} alt="" className={i === active ? "is-on" : ""} loading="lazy" />
              ))}
            </div>
            <div className="proof__switch">
              <div className="proof__tabs" role="tablist" aria-label="Outcomes">
                {TABS.map((t, i) => (
                  <button key={t.label} type="button" role="tab" aria-selected={tab === i} className="proof__tab" onClick={() => go(i === 0 ? 0 : VENTURES.length)}>
                    {t.label}<span className="proof__tab-n">{t.items.length}</span>
                    <span className="proof__tab-bar" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="proof__cols">
              <div className="proof__col">
                <p className="proof__col-h">{tab === 0 ? "Built while studying at Tetr" : "Student"}</p>
                <div className="proof__frame">
                  {ALL.map((it, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={it.key} src={it.img} alt={i === active ? it.during : ""} className={`proof__img${i === active ? " is-on" : ""}`} style={{ objectPosition: it.pos }} loading={i < 2 ? "eager" : "lazy"} />
                  ))}
                </div>
                <div className="proof__caps">
                  {ALL.map((it, i) => <p key={it.key} className={`proof__cap${i === active ? " is-on" : ""}`} aria-hidden={i !== active}>{it.during}</p>)}
                </div>
              </div>

              <div className="proof__list-wrap">
                <ul className={`proof__list proof__list--${tab === 0 ? "v" : "i"}`} style={{ "--k": local } as React.CSSProperties}>
                  {list.map((it, i) => (
                    <li key={it.key}>
                      <button type="button" className={`proof__name${i === local ? " is-on" : ""}`} onClick={() => go((tab === 0 ? 0 : VENTURES.length) + i)}>{it.name}</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="proof__col">
                <p className="proof__col-h">{tab === 0 ? "Now" : "Interned at"}</p>
                <div className="proof__frame proof__frame--result">
                  {ALL.map((it, i) => (
                    <div key={it.key} className={`proof__result${i === active ? " is-on" : ""}${i >= VENTURES.length ? " is-org" : ""}`} aria-hidden={i !== active}>
                      <span className="proof__result-tag">{it.tag}</span>
                      <strong className="proof__result-big">{it.big}</strong>
                      <span className="proof__result-small">{it.small}</span>
                      <span className="proof__result-blocks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></span>
                      <span className="proof__result-count">{String((i >= VENTURES.length ? i - VENTURES.length : i) + 1).padStart(2, "0")} / {String(i >= VENTURES.length ? INTERNS.length : VENTURES.length).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
                <div className="proof__caps">
                  {ALL.map((it, i) => <p key={it.key} className={`proof__cap${i === active ? " is-on" : ""}`} aria-hidden={i !== active}>{it.now}</p>)}
                </div>
              </div>
            </div>

            <div className="proof__reports">
              <a href="https://online.flippingbook.com/view/706350447/" target="_blank" rel="noopener noreferrer" className="proof__report">Download Career Labs Report<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" /></svg></a>
              <span className="proof__report-sep" aria-hidden="true" />
              <a href="https://online.flippingbook.com/view/1009456202/" target="_blank" rel="noopener noreferrer" className="proof__report">Download D2C Report<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" /></svg></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
