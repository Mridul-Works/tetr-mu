"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const Chev = () => (
  <svg className="mm__chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <path d="M2 3.75 5 6.75 8 3.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** MU's site-top: dark announcement bar + the header pill (wide at the top, glass pill once you scroll). */
export default function Header() {
  const topRef = useRef<HTMLDivElement>(null);
  const hdrRef = useRef<HTMLElement>(null);
  const [annOpen, setAnnOpen] = useState(true);

  useEffect(() => {
    const top = topRef.current!, hdr = hdrRef.current!;
    let last = window.scrollY, down = 0, up = 0, condensed = false, dark = false, raf = 0;
    const ann = () => (top.querySelector(".announce") as HTMLElement | null)?.offsetHeight ?? 0;
    const setAnn = () => top.style.setProperty("--ann-h", `${ann()}px`);
    setAnn();
    const heroEnd = () => {
      const h = document.getElementById("hero");
      return h ? h.getBoundingClientRect().bottom + window.scrollY - 70 : 600;
    };
    const tick = () => {
      raf = 0;
      const y = window.scrollY, d = y - last;
      last = y;
      top.classList.toggle("is-scrolled", y > 40);
      if (y < 24) hdr.classList.add("is-top");
      else if (y > 56) hdr.classList.remove("is-top");
      let want = condensed;
      if (y <= heroEnd()) { down = up = 0; want = false; }
      else {
        if (d > 0) { down += d; up = 0; } else if (d < 0) { up -= d; down = 0; }
        if (down >= 24) want = true; else if (up >= 24) want = false;
      }
      if (want !== condensed) { condensed = want; hdr.classList.toggle("is-condensed", condensed); }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onTone = (e: Event) => {
      const v = (e as CustomEvent<{ dark: boolean }>).detail.dark;
      if (v !== dark) { dark = v; hdr.classList.toggle("is-dark", dark); }
    };
    hdr.classList.add("no-anim");
    tick();
    requestAnimationFrame(() => requestAnimationFrame(() => hdr.classList.remove("no-anim")));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setAnn);
    window.addEventListener("tetr:header-tone", onTone);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", setAnn);
      window.removeEventListener("tetr:header-tone", onTone);
    };
  }, [annOpen]);

  return (
    <div className="site-top" ref={topRef}>
      {annOpen && (
        <div className="announce" role="region" aria-label="Announcement">
          <p className="announce__text">
            <span>Tetr Connect, Open Day: Madrid Edition. Sat, 28 Nov 2026, 11:00 AM to 2:00 PM CET.</span>{" "}
            <a href="https://tetr.com" className="announce__link">Save your seat</a>
          </p>
          <button type="button" className="announce__close" aria-label="Dismiss announcement" onClick={() => setAnnOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      )}
      <header className="site-header is-top" ref={hdrRef}>
        <div className="site-header__pill" data-pill>
          <span className="site-header__solo glass" aria-hidden="true"><span className="glass__tint" /></span>
          <Link href="/" className="site-header__logo" aria-label="Tetr College of Business, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/tetr-logo.webp" width={510} height={255} alt="" />
          </Link>
          <nav className="site-header__nav" aria-label="Primary">
            <ul role="list" className="site-header__links">
              <li><button type="button" className="site-header__link mm__trigger">Programs<Chev /></button></li>
              <li><a className="site-header__link" href="https://tetr.com">Faculty</a></li>
              <li><a className="site-header__link" href="https://tetr.com">Student Life</a></li>
              <li><button type="button" className="site-header__link mm__trigger">About<Chev /></button></li>
            </ul>
          </nav>
          <div className="site-header__actions">
            <a href="https://applications.tetr.com" className="btn btn--primary btn--light site-header__apply"><span className="btn__label">Apply</span></a>
            <button type="button" className="site-header__burger" aria-label="Open menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true"><path d="M4 8.5h16M4 15.5h16" /></svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
