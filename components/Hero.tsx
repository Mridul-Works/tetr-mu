"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { PLAY_D } from "@/lib/mu-art";

/* Tetr's logo silhouette: a 4 x 2 grid of blocks with the bottom-left block missing.
   The green blocks are the top-right one and the two bottom-right ones. */
const SHAPE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 2' preserveAspectRatio='none'%3E%3Cpath d='M0 0H4V2H1V1H0Z'/%3E%3C/svg%3E")`;
const GREENS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 2' preserveAspectRatio='none'%3E%3Cpath d='M3 0H4V2H2V1H3Z'/%3E%3C/svg%3E")`;

const DESK = "(min-width: 1024px) and (min-height: 500px)";
const TOUCH = "(max-width: 1023.98px), (max-height: 499.98px)";
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const r = root.current!;
    const stage = r.querySelector<HTMLElement>(".hero__stage")!;
    const reveal = r.querySelector<HTMLElement>(".hero__reveal")!;
    const photo = r.querySelector<HTMLElement>(".hero__photo")!;
    const greens = r.querySelector<HTMLElement>(".hero__greens")!;
    const mark = r.querySelector<HTMLElement>(".hero__mark")!;
    const copyLayer = r.querySelector<HTMLElement>(".hero__layer--copy")!;
    const copy = r.querySelector<HTMLElement>(".hero-copy")!;
    const fx = Array.from(r.querySelectorAll<HTMLElement>(".hero__fx"));
    const stamp = r.querySelector<HTMLElement>(".hero__stamp")!;
    const film = r.querySelector<HTMLElement>(".hero-film")!;
    const thumb = r.querySelector<HTMLElement>(".hero-film__thumb")!;
    const glass = r.querySelector<HTMLElement>(".hero-film__glass")!;
    const caption = r.querySelector<HTMLElement>(".hero-film__caption")!;
    const smallPlay = r.querySelector<SVGElement>(".hero-film__play")!;
    const bigPlay = r.querySelector<SVGElement>(".hero__bigplay")!;
    const pin = r.querySelector<HTMLElement>(".hero__pin")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    reveal.style.setProperty("--shape", SHAPE);
    greens.style.setProperty("--shape", GREENS);
    if (reduce) { r.classList.add("is-static"); return; }

    const mm = gsap.matchMedia();
    mm.add({ desk: DESK, touch: TOUCH }, (ctx) => {
      const touch = !ctx.conditions!.desk;
      const state = { paint: touch ? 1 : 0, grow: 0 };
      let W = 0, H = 0, b = 100, O = { x: 0, y: 0 }, Z = 10, S0 = 0.4, T0 = { x: 0, y: 0 }, PW = 1, PH = 1, PL = 0;
      let R = 0.2, Zc = 0.9;
      let K: number[] = [];
      let lit = false, full = false;

      const measure = () => {
        W = stage.clientWidth; H = stage.clientHeight;
        const sr = stage.getBoundingClientRect();
        let right = 0, top = Infinity, left = Infinity, bottom = 0;
        copy.querySelectorAll(".hero-copy__title, .hero-copy__lead, .hero-copy__ctas > *").forEach((el) => {
          const rg = document.createRange(); rg.selectNodeContents(el);
          for (const rc of Array.from(rg.getClientRects())) {
            right = Math.max(right, rc.right - sr.left); top = Math.min(top, rc.top - sr.top);
            left = Math.min(left, rc.left - sr.left); bottom = Math.max(bottom, rc.bottom - sr.top);
          }
        });
        const pill = document.querySelector("[data-pill]")?.getBoundingClientRect();
        const pillB = pill ? pill.bottom - sr.top : 80;
        const inner = r.querySelector(".hero__layer .hero__inner")!.getBoundingClientRect();
        if (touch) {
          const t = Math.max(84, pillB + 20), avH = Math.max(120, top - 24 - t);
          b = Math.min((W * 0.9) / 4, avH / 2);
          O = { x: W / 2, y: t + avH / 2 };
        } else {
          const l = right + Math.max(32, W * 0.02), rr = inner.right - sr.left;
          const t = pillB + 40, avH = Math.max(140, top - 20 - t), avW = Math.max(160, rr - l);
          b = Math.max(40, Math.min(avW / 4, avH / 2, (W * 0.3) / 4));
          O = { x: rr - 2 * b, y: t + avH / 2 };
        }
        // zoom needed for the solid 2 x 2 centre of the logo to cover the whole stage
        Z = (Math.max(O.x, W - O.x, O.y, H - O.y) / b) * 1.04;
        // the photo box is always landscape (like MU's), so the whole scene can sit inside the logo first
        PW = photo.offsetWidth; PH = photo.offsetHeight; PL = photo.offsetLeft;
        S0 = Math.min(1, Math.max((4 * b) / PW, (2 * b) / PH) * 1.12);
        T0 = { x: O.x - PL - S0 * 0.5 * PW, y: O.y - S0 * 0.46 * PH };
        // copy hand-off: hide when the logo box touches the copy, show again (white) once the solid centre covers it
        const sAt = (e: number) => Math.exp(Math.log(Z) * e ** 1.25);
        R = 0.97; Zc = 0.99;
        for (let e = 0; e <= 1.0001; e += 0.005) {
          const s = sAt(e);
          const bx0 = O.x - 2 * b * s, by1 = O.y + b * s;
          if (R === 0.97 && bx0 < right && by1 > top) R = e;
          const cx0 = O.x - b * s, cx1 = O.x + b * s, cy0 = O.y - b * s, cy1 = O.y + b * s;
          if (cx0 <= left && cx1 >= right && cy0 <= top && cy1 >= bottom) { Zc = e; break; }
        }
        R = Math.max(0.02, R - 0.01); Zc = Math.min(0.97, Math.max(R + 0.06, Zc + 0.01));
        // photo progress: never let the growing logo run past the photo's edge
        K = [];
        let prev = 0;
        for (let n = 0; n <= 100; n++) {
          const e = n / 100, s = sAt(e);
          const need = { l: Math.max(0, O.x - 2 * b * s - 8), t: Math.max(0, O.y - b * s - 8), r: Math.min(W, O.x + 2 * b * s + 8), b: Math.min(H, O.y + b * s + 8) };
          let p = Math.max(prev, smooth(clamp01(e / 0.6)));
          for (let k = 0; k < 60; k++) {
            const S = S0 + (1 - S0) * p, tx = PL + T0.x * (1 - p), ty = T0.y * (1 - p);
            if (tx <= need.l && ty <= need.t && tx + S * PW >= need.r && ty + S * PH >= need.b) break;
            p = Math.min(1, p + 0.02);
          }
          prev = p; K.push(p);
        }
      };

      const render = () => {
        const e = state.grow;
        const s = Math.exp(Math.log(Z) * e ** 1.25) * b * (0.16 + 0.84 * state.paint);
        const size = `${4 * s}px ${2 * s}px`, pos = `${O.x - 2 * s}px ${O.y - s}px`;
        reveal.style.setProperty("--m-size", size); reveal.style.setProperty("--m-pos", pos);
        greens.style.setProperty("--m-size", size); greens.style.setProperty("--m-pos", pos);
        const gOp = 1 - clamp01(e / 0.12);
        greens.style.opacity = String(gOp);
        // "College of Business" sits in the logo's two bottom-right green blocks, as on Tetr's real mark
        mark.style.cssText = `left:${O.x}px;top:${O.y}px;width:${2 * s}px;height:${s}px;font-size:${s * 0.2}px;padding:0 0 ${s * 0.15}px ${s * 0.13}px;opacity:${gOp}`;
        const nl = clamp01((R - e) / 0.02), il = clamp01((e - Zc) / 0.02);
        copyLayer.style.opacity = String(e < R ? 1 : e < Zc ? nl : il);
        const isLit = e >= (R + Zc) / 2;
        if (isLit !== lit) { lit = isLit; r.classList.toggle("is-lit", lit); }
        const isFull = e >= 0.995;
        if (isFull !== full) { full = isFull; r.classList.toggle("is-full", full); }
        const c = e * 100, i0 = Math.floor(c), i1 = Math.min(100, Math.ceil(c));
        const p = (K[i0] ?? 1) + ((K[i1] ?? 1) - (K[i0] ?? 1)) * (c - i0);
        const S = S0 + (1 - S0) * p;
        photo.style.transform = `translate(${T0.x * (1 - p)}px, ${T0.y * (1 - p)}px) scale(${S})`;
        const fxo = clamp01((e - R) / Math.max(0.05, Zc - R));
        fx.forEach((el) => (el.style.opacity = String(fxo)));
        const fl = clamp01((e - 0.55) / 0.4);
        glass.style.setProperty("--film-lit", String(fl));
        film.classList.toggle("is-light", fl > 0.5);
      };

      measure(); render();
      r.classList.add("is-ready");

      // load: the logo paints in, then the headline rises line by line (MU's hero intro)
      const splits: SplitText[] = [];
      const intro = gsap.timeline({ delay: 0.15 });
      if (!touch) {
        intro.to(state, { paint: 1, duration: 1.2, ease: "expo.out", onUpdate: render }, 0);
        const title = r.querySelector<HTMLElement>(".hero-copy__title")!;
        gsap.set(title, { autoAlpha: 1 });
        const sp = SplitText.create(title, { type: "lines", mask: "lines", linesClass: "hero-line" });
        splits.push(sp);
        intro.from(sp.lines, { yPercent: 105, duration: 1, ease: "expo.out", stagger: 0.09 }, 0.45);
        intro.fromTo(r.querySelectorAll(".blk-line i"), { scaleY: 0, y: -10, autoAlpha: 0 }, { scaleY: 1, y: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(2.2)", stagger: { each: 0.06, ease: "power1.in" } }, 0.95);
        intro.fromTo(r.querySelectorAll(".hero-copy__lead, .hero-copy__ctas"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, 1.15);
        intro.fromTo(film, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1);
      } else {
        gsap.set(r.querySelectorAll(".hero-copy__title, .hero-copy__lead, .hero-copy__ctas"), { autoAlpha: 1 });
        intro.fromTo(state, { paint: 0 }, { paint: 1, duration: 1.2, ease: "expo.out", onUpdate: render }, 0);
      }

      const grow = (tl: gsap.core.Timeline, d: number) => {
        tl.to(state, { grow: 1, duration: d, ease: "none", onUpdate: render }, 0.01);
      };
      const onRefresh = () => { measure(); render(); };

      if (touch) {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: stage, start: "top top", end: () => "+=" + stage.offsetHeight * 0.4, scrub: true, invalidateOnRefresh: true },
        });
        grow(tl, 0.95);
        ScrollTrigger.addEventListener("refresh", onRefresh);
        return () => {
          ScrollTrigger.removeEventListener("refresh", onRefresh);
          splits.forEach((s) => s.revert());
          r.classList.remove("is-ready", "is-lit", "is-full");
        };
      }

      // desktop: pin for 1.6 screens; the logo opens to a full-bleed photo, then the film card fills the screen
      const X = { x: 0, y: 0, s: 1 };
      const fit = () => {
        const pr = pin.getBoundingClientRect(), fr = film.getBoundingClientRect();
        const w = thumb.offsetWidth, h = thumb.offsetHeight;
        const left = fr.left - pr.left + thumb.offsetLeft, top = fr.top - pr.top + thumb.offsetTop;
        X.s = Math.max(pr.width / w, pr.height / h) * 1.02;
        X.x = pr.width / 2 - (left + w / 2); X.y = pr.height / 2 - (top + h / 2);
      };
      fit();
      let past = false, dark = false;
      const tone = (v: boolean) => { if (v !== dark) { dark = v; window.dispatchEvent(new CustomEvent("tetr:header-tone", { detail: { dark } })); } };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: pin, start: "top top", end: () => "+=" + window.innerHeight * 1.6, pin: true, scrub: 0.3, invalidateOnRefresh: true, anticipatePin: 1 },
        onUpdate: () => tone(!past && tl.time() > 1.3),
      });
      grow(tl, 0.6);
      tl.fromTo(stamp, { y: 40, rotation: 0 }, { y: -90, rotation: -10, duration: 1.95 }, 0)
        .addLabel("film", 0.75)
        .to([glass, caption, smallPlay], { opacity: 0, duration: 0.25 }, "film")
        .to(thumb, { x: () => X.x, y: () => X.y, scale: () => X.s, duration: 1 }, "film")
        .to(copy, { autoAlpha: 0, y: -48, duration: 0.5 }, "film")
        .fromTo(bigPlay, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, "film+=0.75")
        .to({}, { duration: 0.15 });
      const leave = ScrollTrigger.create({
        trigger: r, start: "bottom top+=90",
        onEnter: () => { past = true; tone(false); },
        onLeaveBack: () => { past = false; tone(tl.time() > 1.3); },
      });
      const onInit = () => { gsap.set(thumb, { clearProps: "transform" }); fit(); };
      ScrollTrigger.addEventListener("refreshInit", onInit);
      ScrollTrigger.addEventListener("refresh", onRefresh);
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", onInit);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        leave.kill(); tone(false);
        splits.forEach((s) => s.revert());
        r.classList.remove("is-ready", "is-lit", "is-full");
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title" ref={root}>
      <div className="hero__pin">
        <div className="hero__stage">
          <div className="hero__canvas bg-grid" aria-hidden="true" />
          <div className="hero__reveal">
            <div className="hero__photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero__img" src="/img/tetr-hero-02.webp" width={1600} height={903} alt="Tetr's Dubai base: a tree-lined walk between glass buildings, with a tower at the end" fetchPriority="high" />
            </div>
            <div className="hero__tint hero__fx" aria-hidden="true" />
            <div className="hero__stamp hero__fx" aria-hidden="true">
              {/* a passport entry stamp in whitish ink: double ring, stitched inner ring, worn edges */}
              <svg viewBox="0 0 120 120">
                <defs>
                  <filter id="stamp-ink" x="-5%" y="-5%" width="110%" height="110%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
                    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.7" result="holes" />
                    <feComposite in="SourceGraphic" in2="holes" operator="in" result="inked" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" seed="2" result="w" />
                    <feDisplacementMap in="inked" in2="w" scale="1.1" />
                  </filter>
                  <path id="hero-stamp-top" d="M 16 60 A 44 44 0 0 1 104 60" />
                  <path id="hero-stamp-bottom" d="M 12.5 60 A 47.5 47.5 0 0 0 107.5 60" />
                </defs>
                <g filter="url(#stamp-ink)" fill="none" stroke="#f3efe4">
                  <circle cx="60" cy="60" r="57" strokeWidth="3.2" />
                  <circle cx="60" cy="60" r="52.2" strokeWidth="1.2" />
                  <circle cx="60" cy="60" r="35" strokeWidth="1.3" strokeDasharray="2 2" />
                  <text className="hero__stamp-text" fill="#f3efe4" stroke="none"><textPath href="#hero-stamp-top" startOffset="50%" textAnchor="middle">Tetr College of Business</textPath></text>
                  <text className="hero__stamp-text" fill="#f3efe4" stroke="none"><textPath href="#hero-stamp-bottom" startOffset="50%" textAnchor="middle">Seven countries · one degree</textPath></text>
                  <path d="M22 60l2.2-1.6 2.2 1.6-.85-2.6 2.2-1.6h-2.7L24.2 53l-.85 2.4h-2.7l2.2 1.6z" fill="#f3efe4" stroke="none" />
                  <path d="M93.6 60l2.2-1.6 2.2 1.6-.85-2.6 2.2-1.6h-2.7L95.8 53l-.85 2.4h-2.7l2.2 1.6z" fill="#f3efe4" stroke="none" />
                  <g fill="#f3efe4" stroke="none" transform="translate(46 43)">
                    <rect x="0" y="0" width="6.4" height="6.4" /><rect x="7.2" y="0" width="6.4" height="6.4" /><rect x="14.4" y="0" width="6.4" height="6.4" /><rect x="21.6" y="0" width="6.4" height="6.4" opacity=".55" />
                    <rect x="7.2" y="7.2" width="6.4" height="6.4" /><rect x="14.4" y="7.2" width="6.4" height="6.4" opacity=".55" /><rect x="21.6" y="7.2" width="6.4" height="6.4" opacity=".55" />
                  </g>
                  <text x="60" y="68" textAnchor="middle" className="hero__stamp-big" fill="#f3efe4" stroke="none">ENTRY</text>
                  <text x="60" y="78" textAnchor="middle" className="hero__stamp-small" fill="#f3efe4" stroke="none">TERM 1 · 2026</text>
                </g>
              </svg>
            </div>
            <div className="hero__scrim hero__fx" aria-hidden="true" />
            <div className="hero__scrim-copy hero__fx" aria-hidden="true" />
          </div>
          <div className="hero__greens" aria-hidden="true" />
          <div className="hero__mark" aria-hidden="true"><span>College of<br />Business</span></div>
          <div className="hero__layer hero__layer--copy">
            <div className="hero__inner">
              <div className="hero-copy">
                <div className="hero-copy__heads">
                <h1 id="hero-title" className="hero-copy__title t-display">
                  Learn business by doing{" "}
                  <span className="hero-copy__em">business,<span className="blk-line" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</span></span>{" "}
                  across the globe
                </h1>
                {/* once the campus photo fills the screen, the words change with it */}
                <p className="hero-copy__alt t-display" aria-hidden="true">Seven countries. Seven businesses. One degree.</p>
                </div>
                <div className="hero-copy__leads">
                <p className="hero-copy__lead t-lead">Global Bachelor&rsquo;s and Master&rsquo;s programs in Management &amp; Technology. Every term, you&rsquo;ll live in a new country, build a real business, and get graded on what it earns.</p>
                <p className="hero-copy__alt-lead t-lead" aria-hidden="true">Dubai, India, China, Ghana, the US, Argentina and Europe. You live in each one, and you build a real business there.</p>
                </div>
                <div className="hero-copy__ctas">
                  <a href="https://applications.tetr.com" className="btn btn--primary btn--light btn--l hero-copy__apply">
                    <span className="btn__label">Apply</span>
                    <span className="btn__arrow" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg></span>
                  </a>
                  <a href="#terms" className="btn btn--link btn--l hero-copy__link">
                    <span className="btn__label">Find your programme</span>
                    <svg className="btn__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__film-wrap">
          <div className="hero__inner">
            <a className="hero-film" href="https://tetr.com" target="_blank" rel="noopener noreferrer">
              <span className="hero-film__glass" aria-hidden="true" />
              <span className="hero-film__thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hero-film__poster" src="/img/launchpad-pitch.webp" width={1206} height={908} alt="" loading="lazy" />
                <svg className="hero-film__play" viewBox="0 0 56 56" aria-hidden="true"><path d={PLAY_D} fill="#fff" fillRule="evenodd" clipRule="evenodd" /></svg>
              </span>
              <span className="hero-film__caption">Watch the Tetr film<span aria-hidden="true"> →</span></span>
            </a>
          </div>
          <svg className="hero__bigplay" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="56" fill="#fff" />
            <path d="M50 40.5v39c0 2.6 2.8 4.2 5 2.9l31-19.5c2.1-1.3 2.1-4.4 0-5.7l-31-19.5c-2.2-1.4-5 .2-5 2.8z" fill="#0c1a14" />
          </svg>
        </div>
      </div>
    </section>
  );
}
