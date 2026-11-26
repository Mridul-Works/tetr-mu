"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TERMS } from "@/lib/terms";
import { TERM_EXTRA } from "@/lib/content";
import Scramble from "@/components/mu/Scramble";

/** Tetr's 7-block mark, used where MU puts its lattice icon on the tabs. */
const Blocks = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 28 14" aria-hidden="true">
    <path d="M0 0h21v7H14v7H7V7H0z" fill="currentColor" opacity=".35" />
    <path d="M21 0h7v14H14V7h7z" fill="currentColor" />
  </svg>
);

// each country in English and in its own language, for the heading that changes between them
const NATIVE = [["Dubai", "دبي"], ["India", "भारत"], ["China", "中国"], ["Ghana", "Gaana"], ["USA", "United States"], ["Argentina", "República Argentina"], ["Europe", "Europa"]];

// the engraving per term, in route order
const ART = ["dubai", "india", "china", "ghana", "usa", "argentina", "europe"];

export default function Terms() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const tabs = Array.from(sec.querySelectorAll<HTMLButtonElement>("[data-tab]"));
    const panels = Array.from(sec.querySelectorAll<HTMLElement>("[data-panel]"));
    const folder = sec.querySelector<HTMLElement>("[data-folder]")!;
    const m = panels.length;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0;
    let st: ScrollTrigger | null = null;
    let forced = -1;
    const motifs = Array.from(sec.querySelectorAll<SVGGElement>(".motif"));
    let inked = false; // the first motif inks in only once the card comes into view
    // the giant prints: one per country, behind the card and bigger than it, bleeding off the page.
    // Faint one-ink print at rest; the two-ink colour print shows in a soft circle under the pointer
    // (hover) or the finger (press and drag). No tint, no ring. The print also leans away from the
    // pointer a little and drifts with the scroll, so the card floats over it.
    const giantWrap = sec.querySelector<HTMLElement>("[data-giant]");
    const giantIn = sec.querySelector<HTMLElement>("[data-giant-in]");
    const giants = Array.from(sec.querySelectorAll<HTMLElement>("[data-giant] .giant"));
    const take = (im: HTMLImageElement | null | undefined) => { if (im?.dataset.src) { im.src = im.dataset.src; im.removeAttribute("data-src"); } };
    const loadArt = (n: number) => take(giants[n]?.querySelector<HTMLImageElement>(".giant__ink"));
    const loadCol = (n: number) => take(giants[n]?.querySelector<HTMLImageElement>(".giant__col"));
    const setGiant = (n: number) => giants.forEach((g, i) => { g.classList.toggle("is-on", i === n); if (i !== n) g.classList.remove("is-lit"); });
    loadArt(0); loadArt(1);
    const artOffs: (() => void)[] = [];
    if (giantWrap && giantIn && !reduce) {
      let raf = 0, x = 0, y = 0, held = false;
      const paint = () => {
        raf = 0;
        const g = giants[cur]; if (!g) return;
        const r = g.getBoundingClientRect();
        g.style.setProperty("--ax", `${x - r.left}px`); g.style.setProperty("--ay", `${y - r.top}px`);
        g.classList.toggle("is-lit", x > r.left && x < r.right && y > r.top && y < r.bottom);
        const fr = folder.getBoundingClientRect();
        giantIn.style.setProperty("--px", `${((x - fr.left) / fr.width - 0.5) * -28}px`);
        giantIn.style.setProperty("--py", `${((y - fr.top) / fr.height - 0.5) * -20}px`);
      };
      const move = (e: PointerEvent) => { if (e.pointerType !== "mouse" && !held) return; x = e.clientX; y = e.clientY; loadCol(cur); if (!raf) raf = requestAnimationFrame(paint); };
      const down = (e: PointerEvent) => { if (e.pointerType === "mouse") return; held = true; move(e); };
      const up = () => { held = false; giants.forEach((g) => g.classList.remove("is-lit")); };
      const leave = (e: PointerEvent) => { if (e.pointerType === "mouse") up(); };
      sec.addEventListener("pointermove", move); sec.addEventListener("pointerdown", down);
      sec.addEventListener("pointerup", up); sec.addEventListener("pointercancel", up); sec.addEventListener("pointerleave", leave);
      const drift = gsap.fromTo(giantWrap, { yPercent: 6, rotation: -1.5 }, { yPercent: -6, rotation: 1.5, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 1 } });
      artOffs.push(() => {
        sec.removeEventListener("pointermove", move); sec.removeEventListener("pointerdown", down);
        sec.removeEventListener("pointerup", up); sec.removeEventListener("pointercancel", up); sec.removeEventListener("pointerleave", leave);
        cancelAnimationFrame(raf); drift.scrollTrigger?.kill(); drift.kill();
      });
    }
    const setMotif = (n: number) => { if (inked) motifs.forEach((g) => g.classList.toggle("is-on", Number(g.dataset.k) === n)); };

    const show = (n: number) => {
      if (n === cur || n < 0 || n >= m) return;
      const prev = cur, dir = n > prev ? 1 : -1;
      cur = n;
      setMotif(n);
      sec.dataset.term = String(n);
      loadArt(n); loadArt(n + 1); setGiant(n);
      window.dispatchEvent(new CustomEvent("tetr:term", { detail: { n, dir, country: TERMS[n].country } }));
      tabs.forEach((t, i) => { t.setAttribute("aria-selected", String(i === n)); t.tabIndex = i === n ? 0 : -1; });
      const inP = panels[n], outP = panels[prev];
      panels.forEach((p, i) => { p.inert = i !== n; if (i !== n && i !== prev) p.classList.remove("is-active", "is-leaving"); });
      inP.classList.add("is-active"); inP.classList.remove("is-leaving"); outP.classList.remove("is-active");
      if (reduce) return;
      // exit: the old card fades in place, together with the old motif (CSS), 300 ms
      outP.classList.add("is-leaving");
      gsap.killTweensOf(outP);
      gsap.fromTo(outP, { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "power2.out", onComplete: () => { outP.classList.remove("is-leaving"); gsap.set(outP, { clearProps: "opacity" }); } });
      const text = Array.from(inP.querySelectorAll<HTMLElement>("[data-text] > *"));
      const ph = inP.querySelector<HTMLElement>("[data-photo]");
      const img = ph?.querySelector("img");
      const stk = inP.querySelectorAll("[data-sticker]");
      gsap.killTweensOf([inP, ...text, ph, img, ...stk]);
      gsap.fromTo(inP, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      // lead: the photo opens in the direction you are travelling
      if (ph) gsap.fromTo(ph, { clipPath: dir > 0 ? "inset(0% 0% 0% 24%)" : "inset(0% 24% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "expo.out", delay: 0.05, clearProps: "clipPath" });
      if (img) gsap.fromTo(img, { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "expo.out", delay: 0.05 });
      // support: title travels most, then copy, then chips and source as one beat; gaps shrink (120, 180, 220 ms)
      // children: local strip, title, copy, source (the engraving animates on its own below)
      const rise = [6, 22, 18, 12, 8], at = [0.06, 0.1, 0.14, 0.2, 0.24];
      text.forEach((el, i) => gsap.fromTo(el, { y: (rise[i] ?? 8) * dir, opacity: 0 }, { y: 0, opacity: 1, duration: i === 1 ? 0.8 : 0.65, ease: "expo.out", delay: at[i] ?? 0.25 }));
      // decoration: the stickers settle as the photo lands; no spin
      if (stk.length) gsap.fromTo(stk, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.38, stagger: { each: 0.05, ease: "power1.in" } });
    };

    const go = (n: number) => {
      if (st) {
        const y = st.start + ((n + 0.5) / m) * (st.end - st.start);
        forced = n; show(n);
        const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o: object) => void } }).__lenis;
        const done = () => { forced = -1; };
        if (lenis) lenis.scrollTo(y, { duration: 1, force: true, onComplete: done });
        else { window.scrollTo({ top: y, behavior: "smooth" }); setTimeout(done, 900); }
        return;
      }
      show(n);
    };
    const clicks = tabs.map((t, i) => { const f = () => go(i); t.addEventListener("click", f); return f; });
    const onKey = (e: KeyboardEvent) => {
      const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (i < 0) return;
      let n = -1;
      if (e.key === "ArrowRight") n = (i + 1) % m; else if (e.key === "ArrowLeft") n = (i - 1 + m) % m; else if (e.key === "Home") n = 0; else if (e.key === "End") n = m - 1;
      if (n < 0) return;
      e.preventDefault(); tabs[n].focus(); go(n);
    };
    sec.querySelector("[data-tablist]")!.addEventListener("keydown", onKey as EventListener);

    const pillBottom = () => {
      const p = document.querySelector("[data-pill]")?.getBoundingClientRect();
      const top = document.querySelector(".site-top");
      const ann = top && !top.classList.contains("is-scrolled") ? (top.querySelector(".announce") as HTMLElement | null)?.offsetHeight ?? 0 : 0;
      const b = p ? p.bottom - ann : 72;
      return b > 0 && b < window.innerHeight / 3 ? b : 72;
    };

    const mm = gsap.matchMedia();
    if (!reduce) {
      mm.add("(min-height: 500px)", () => {
        gsap.from(tabs, { yPercent: 100, duration: 0.9, ease: "expo.out", stagger: 0.05, clearProps: "transform", scrollTrigger: { trigger: folder, start: "top 85%", once: true } });
      });
      const setup = (per: number, stage: boolean) => {
        const setTop = () => sec.style.setProperty("--terms-top", `${Math.round(pillBottom() + 12)}px`);
        if (stage) { sec.classList.add("is-stage"); setTop(); }
        const startY = () => { const pb = pillBottom(); return Math.max(pb + 12, pb + (window.innerHeight - pb - folder.offsetHeight) / 2); };
        const mid = (i: number) => (i + 0.5) / m;
        st = ScrollTrigger.create({
          trigger: folder, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          start: () => `top ${startY()}`,
          end: () => `+=${Math.round(window.innerHeight * per * m)}`,
          onRefreshInit: stage ? setTop : undefined,
          snap: { snapTo: (v) => (forced >= 0 ? mid(forced) : mid(Math.max(0, Math.min(m - 1, Math.floor(v * m))))), duration: { min: 0.35, max: 0.5 }, delay: 0.1, ease: "power2.inOut", inertia: false },
          onUpdate: (self) => { const q = self.progress * m; window.dispatchEvent(new CustomEvent("tetr:term-progress", { detail: { n: Math.min(m - 1, Math.floor(q)), p: q - Math.floor(q) } })); if (forced < 0 && !(ScrollTrigger as unknown as { isRefreshing?: boolean }).isRefreshing) show(Math.min(m - 1, Math.floor(self.progress * m))); },
        });
        const live = ScrollTrigger.create({ trigger: folder, start: () => `top ${startY() + 40}`, end: () => `+=${Math.round(window.innerHeight * per * m)}`,
          onToggle: (self) => window.dispatchEvent(new CustomEvent("tetr:term-live", { detail: { on: self.isActive, n: cur, country: TERMS[cur].country } })) });
        return () => { live.kill(); st = null; sec.classList.remove("is-stage"); sec.style.removeProperty("--terms-top"); };
      };
      mm.add("(min-width: 1024px) and (min-height: 500px)", () => setup(0.55, false));
      mm.add("(max-width: 1023.98px) and (min-height: 500px)", () => setup(0.7, true));
    }
    // live local time on each card ("Dubai 18:42"), updated while the section is on screen
    const clocks = Array.from(sec.querySelectorAll<HTMLElement>("[data-tz]"));
    const fmt = new Map(clocks.map((c) => [c, new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: c.dataset.tz })]));
    const tickClocks = () => clocks.forEach((c) => { c.textContent = fmt.get(c)!.format(new Date()); });
    tickClocks();
    let clockTimer = 0;
    const clockSeen = ScrollTrigger.create({ trigger: sec, start: "top bottom", end: "bottom top", onToggle: (self) => { clearInterval(clockTimer); if (self.isActive) { tickClocks(); clockTimer = window.setInterval(tickClocks, 20000); } } });

    // the first motif inks in when the card arrives; with reduced motion it is simply there
    const firstInk = ScrollTrigger.create({ trigger: folder, start: "top 75%", once: true, onEnter: () => { inked = true; setMotif(cur); } });
    if (reduce) { inked = true; setMotif(cur); }

    // slow drift while you travel the route; the mandala and the sun turn a little
    const drift = sec.querySelector<HTMLElement>(".motifs__drift");
    const spinners = Array.from(sec.querySelectorAll<SVGGElement>(".motif[data-spin]"));
    const driftMM = gsap.matchMedia();
    driftMM.add("(prefers-reduced-motion: no-preference)", () => {
      const range = { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.6 };
      if (drift) gsap.fromTo(drift, { y: 40 }, { y: -40, ease: "none", scrollTrigger: range });
      spinners.forEach((g) => gsap.to(g, { rotation: 28, svgOrigin: g.dataset.spin, ease: "none", scrollTrigger: { ...range } }));
    });

    // UV light: on a mouse, the motif shows finer and darker around the pointer, like a passport under UV
    const uv = sec.querySelector<SVGSVGElement>(".motifs__uv");
    const fine = !!uv && matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce;
    let raf = 0, px = 0, py = 0;
    const paint = () => { raf = 0; if (!uv) return; const r = uv.getBoundingClientRect(); uv.style.setProperty("--mx", `${px - r.left}px`); uv.style.setProperty("--my", `${py - r.top}px`); };
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
    const onLeave = () => { uv?.style.setProperty("--mx", "-999px"); uv?.style.setProperty("--my", "-999px"); };
    if (fine) { sec.addEventListener("pointermove", onMove); sec.addEventListener("pointerleave", onLeave); }

    return () => {
      artOffs.forEach((f) => f());
      firstInk.kill(); driftMM.revert(); clockSeen.kill(); clearInterval(clockTimer);
      if (fine) { sec.removeEventListener("pointermove", onMove); sec.removeEventListener("pointerleave", onLeave); }
      if (raf) cancelAnimationFrame(raf);
      mm.revert();
      tabs.forEach((t, i) => t.removeEventListener("click", clicks[i]));
    };
  }, []);

  return (
    <section id="terms" className="section section--paper bg-grid terms is-tabs" aria-labelledby="terms-title" ref={root}>
      <div className="container">
        <header className="terms__head">
          <div className="frame-box terms__frame">
            <span className="frame-box__corner frame-box__corner--tl" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--tr" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--bl" aria-hidden="true" />
            <span className="frame-box__corner frame-box__corner--br" aria-hidden="true" />
            <h2 id="terms-title" className="t-h2 terms__title">A new country every term, a new business every time you land.</h2>
          </div>
          <div className="terms__intro t-body">
            <p>In each country, you&rsquo;ll build a business and get graded on the revenue and profit it makes. Your final exam is a pitch to real VCs.</p>
            <p>By graduation, you won&rsquo;t just have studied business across continents. You&rsquo;ll have built it there.</p>
          </div>
        </header>

        <div className="terms__folder" data-folder>
          <div className="terms__giant" aria-hidden="true" data-giant>
            <div className="terms__giant-in" data-giant-in>
              {ART.map((a, i) => (
                <figure key={a} className={`giant giant--${a}${i === 0 ? " is-on" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="giant__ink" data-src={`/art/giant/${a}-ink.webp`} alt="" decoding="async" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="giant__col" data-src={`/art/giant/${a}-color.webp`} alt="" decoding="async" />
                </figure>
              ))}
            </div>
          </div>
          <div className="terms__tabs" role="tablist" aria-label="Terms" data-tablist>
            {TERMS.map((t, i) => (
              <button key={t.n} type="button" role="tab" className="ttab" id={`term-${t.n}-tab`} aria-controls={`term-${t.n}`} aria-selected={i === 0} tabIndex={i === 0 ? 0 : -1} style={{ "--term-c": t.tint } as React.CSSProperties} data-tab={i}>
                <span className="ttab__face">
                  <Blocks className="ttab__icon" />
                  <span className="ttab__label"><span className="ttab__word">{t.country}</span><span className="ttab__num">{t.n}</span></span>
                </span>
                <span className="ttab__notch" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="terms__sheet">
            {TERMS.map((t, i) => (
              <article key={t.n} className={`term${i === 0 ? " is-active" : ""}${t.postcard ? " is-postcard" : ""}`} id={`term-${t.n}`} role="tabpanel" aria-labelledby={`term-${t.n}-tab`} tabIndex={0} inert={i !== 0} style={{ "--term-c": t.tint, "--focus": t.focus } as React.CSSProperties} data-panel={i}>
                <p className="term__strip" aria-hidden="true">
                  <Blocks className="term__strip-icon" />
                  <span className="term__strip-term">Term {t.n}</span>
                  <span className="term__strip-label">{t.country}</span>
                </p>
                <div className="term__text" data-text>
                  <p className="term__local t-xs"><span className="term__local-dot" aria-hidden="true" />Term {t.n} · {t.country} · <time data-tz={TERM_EXTRA[i].tz} suppressHydrationWarning>--:--</time> local · {TERM_EXTRA[i].cur}</p>
                  <p className="term__country"><Scramble words={NATIVE[i]} /></p>
                  <h3 className="t-h3 term__title">{t.title}</h3>
                  <p className="t-lead term__copy">{t.copy}</p>
                  {t.source ? (
                    <p className="t-xs term__source">Source: <a href={t.source.href} target="_blank" rel="noopener noreferrer">{t.source.label}</a></p>
                  ) : t.postcard ? (
                    <p className="t-xs term__source">This term is still ahead for the current cohort.</p>
                  ) : null}
                </div>
                <figure className="term__media">
                  <span className="term__wash" aria-hidden="true">
                    <svg className="term__blocks" viewBox="0 0 992 620" preserveAspectRatio="xMidYMid slice"><path d="M380 250H1060V700H550V420H380Z" /><path d="M-40 -40H170V170H-40Z" /></svg>
                  </span>
                  <div className="term__photo" data-photo>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.img} alt={t.alt} loading={i < 2 ? "eager" : "lazy"} />
                    {t.postcard && <span className="term__postcard-line" aria-hidden="true">Greetings from {t.postcard.place}</span>}
                  </div>
                </figure>
              </article>
            ))}
          </div>
        </div>
        <p className="t-xs terms__note">Results are each term&rsquo;s last published cohort report. Argentina and Europe show the places, because the current cohort has not reached them yet.</p>
      </div>
    </section>
  );
}
