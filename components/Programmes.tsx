"use client";
import { useState } from "react";
import FrameBox from "./mu/FrameBox";
import { APPLY_URL } from "@/lib/content";
import DotHover from "./mu/DotHover";

/* MU's dark programme finder: a row of doors, a photo card that says who it is for,
   and a numbered list with an action on every row. Programmes and links from tetr.com. */

type Row = { name: string; meta: string; href: string; cta: string };
const DOORS: { label: string; who: string; line: string; img: string; rows: Row[] }[] = [
  {
    label: "Bachelor's", who: "You're finishing school", img: "/img/x/bachelor-of-management-technology-bachelor.webp",
    line: "Four-year degrees across seven countries, with a real business to build in each one.",
    rows: [
      { name: "Bachelor of Science in Artificial Intelligence", meta: "US degree (STEM) · 4 years · 7 countries", href: "https://tetr.com/bs-artificial-intelligence", cta: "Apply" },
      { name: "Bachelor of Finance & Artificial Intelligence", meta: "UK degree · 4 years · 7 countries", href: "https://tetr.com/bachelor-finance-ai", cta: "Apply" },
      { name: "Bachelor of Management & Technology", meta: "UK degree · 4 years · 7 countries", href: "https://tetr.com/bachelors-management-technology", cta: "Apply" },
      { name: "Integrated Bachelors and Masters in Management & Technology", meta: "US degree (STEM) · 4 years · 7 countries", href: "https://tetr.com/asu", cta: "Apply" },
    ],
  },
  {
    label: "Master's", who: "You're starting your career", img: "/img/x/bachelor-of-finance-artificial-intelligence-bachelor.webp",
    line: "Global Master's programs in Management & Technology.",
    rows: [{ name: "Master's programs in Management & Technology", meta: "Programs, terms and deadlines on tetr.com", href: "https://tetr.com", cta: "Explore" }],
  },
  {
    label: "Executive", who: "You're already leading", img: "/img/x/india-business.webp",
    line: "Learn business by doing business, alongside the work you already do.",
    rows: [{ name: "Executive programs", meta: "Formats and dates on tetr.com", href: "https://tetr.com", cta: "Explore" }],
  },
  {
    label: "High School", who: "You're still in high school", img: "/img/x/bachelor-of-science-in-artificial-intelligence-bachelor.webp",
    line: "Still in high school? Pitch your idea to Launchpad, Tetr's $10 million fund for student founders.",
    rows: [{ name: "Pitch to Launchpad", meta: "Launchpad, on tetr.com", href: "https://tetr.com/launchpad", cta: "Pitch" }],
  },
  {
    label: "Gap Year", who: "You're taking a year to find your direction", img: "/img/x/india-studentlife.webp",
    line: "Taking a year to find your direction? There's a path built for you.",
    rows: [{ name: "Gap year programs", meta: "Details on tetr.com", href: "https://tetr.com", cta: "Explore" }],
  },
];
const STRIP = ["dubai-cohort", "d2c-bazaar-2", "event-connect", "india-cultural", "linkedin-india", "tetr-v5-hero-2", "built-tetr-2", "itc-india"];

export default function Programmes() {
  const [d, setD] = useState(0);
  const door = DOORS[d];
  return (
    <section id="programmes" className="prog" aria-labelledby="prog-title" data-tone="dark">
      <DotHover size={7} alpha={0.065} />
      <div className="prog__strip" aria-hidden="true">
        <div className="prog__strip-track">
          {[...STRIP, ...STRIP].map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={`/img/x/${s}.webp`} alt="" loading="lazy" />
          ))}
        </div>
      </div>
      <div className="container">
        <header className="prog__head">
          <FrameBox dark className="prog__title"><h2 id="prog-title" className="t-h2" data-reveal="lines">Now, where does your journey begin?</h2></FrameBox>
          <p className="t-body prog__intro" data-reveal>Whether you&rsquo;re finishing school, starting your career, or taking a year to find your direction, there&rsquo;s a path built for you.</p>
        </header>
        <div className="prog__doors" role="tablist" aria-label="Programmes">
          {DOORS.map((x, i) => (
            <button key={x.label} type="button" role="tab" aria-selected={i === d} className="prog__door" onClick={() => setD(i)}>{x.label}</button>
          ))}
        </div>
        <div className="prog__panel" role="tabpanel" aria-label={door.label}>
          <figure className="prog__card" key={door.img}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={door.img} alt="" loading="lazy" />
            {/* on every tab change the new photo is uncovered by blocks that blink out, top-left to bottom-right */}
            <span className="prog__tiles" aria-hidden="true">
              {Array.from({ length: 48 }, (_, k) => <i key={k} className={k % 11 === 3 ? "g" : k % 13 === 7 ? "m" : ""} style={{ "--d": (k % 8) + Math.floor(k / 8) } as React.CSSProperties} />)}
            </span>
            <figcaption className="prog__card-box">
              <span className="prog__card-who">{door.who}</span>
              <span className="prog__card-line">{door.line}</span>
            </figcaption>
          </figure>
          <span className="prog__joint" aria-hidden="true"><i /><i /></span>
          <ol className="prog__list" key={door.label}>
            {door.rows.map((r, i) => (
              <li key={r.name} className="prog__row">
                <span className="prog__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="prog__name">{r.name}<span className="prog__meta">{r.meta}</span></span>
                <a className="prog__btn" href={r.cta === "Apply" ? APPLY_URL : r.href} target="_blank" rel="noopener noreferrer" aria-label={`${r.cta}: ${r.name}`}>{r.cta}</a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
