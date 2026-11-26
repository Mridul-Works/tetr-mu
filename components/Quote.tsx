"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TERMS } from "@/lib/terms";

/* MU's founder quote over a full-bleed photo, in Tetr's blocks.
   The photo is cut into a 12 x 6 grid of blocks, scattered in quarter-block steps with a few term colours.
   The moment the banner reaches the screen, the blocks lock into one picture (under a second).
   Quote: Pratham Mittal to Forbes India. Phones get the still photo. */

const COLS = 12, ROWS = 6;
const TINTS = TERMS.map((t) => t.tint);
// fixed pseudo-random directions so server and client agree
const rnd = (i: number, k: number) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };

export default function Quote() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sec = root.current!;
    const wrap = sec.querySelector<HTMLElement>(".quote__tiles")!;
    const tiles = Array.from(wrap.querySelectorAll<HTMLElement>(".qt"));
    const IMG_W = 1920, IMG_H = 900;

    const layout = () => {
      const W = sec.clientWidth, H = sec.clientHeight;
      const s = Math.max(W / IMG_W, H / IMG_H), iw = IMG_W * s, ih = IMG_H * s, ox = (W - iw) / 2, oy = (H - ih) / 2;
      const tw = W / COLS, th = H / ROWS;
      tiles.forEach((t, i) => {
        const c = i % COLS, r = Math.floor(i / COLS);
        t.style.cssText += `left:${c * tw}px;top:${r * th}px;width:${tw + 0.5}px;height:${th + 0.5}px;background-size:${iw}px ${ih}px;background-position:${ox - c * tw}px ${oy - r * th}px;`;
      });
      return { tw, th };
    };
    let cell = layout();
    const onResize = () => { cell = layout(); };
    window.addEventListener("resize", onResize);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tl: gsap.core.Timeline | null = null, st: ScrollTrigger | null = null;
    if (!reduce) {
      // start scattered in quarter-block steps, a few tinted; lock into one picture the moment it arrives
      const step = (v: number, q: number) => Math.round(v / q) * q;
      tiles.forEach((t, i) => {
        gsap.set(t, { x: step((rnd(i, 1) - 0.5) * 1.8 * cell.tw, cell.tw / 4), y: step((rnd(i, 2) - 0.5) * 1.8 * cell.th, cell.th / 4) });
        t.style.setProperty("--tint-o", rnd(i, 3) > 0.62 ? "0.5" : "0");
      });
      tl = gsap.timeline({ paused: true })
        .to(tiles, { x: 0, y: 0, duration: 0.9, ease: "power4.out", stagger: { amount: 0.45, from: "random" } }, 0)
        .call(() => tiles.forEach((t) => t.style.setProperty("--tint-o", "0")), [], 0.35);
      st = ScrollTrigger.create({ trigger: sec, start: "top 92%", once: true, onEnter: () => tl!.play() });
    }
    return () => { window.removeEventListener("resize", onResize); st?.kill(); tl?.kill(); };
  }, []);

  return (
    <section className="quote" aria-label="From the founder" data-tone="dark" ref={root}>
      <div className="quote__tiles" aria-hidden="true">
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <span key={i} className="qt" style={{ "--tint": TINTS[Math.floor(rnd(i, 4) * TINTS.length)] } as React.CSSProperties} />
        ))}
      </div>
      <div className="quote__shade" aria-hidden="true" />
      <div className="container quote__inner">
        <svg className="quote__mark" viewBox="0 0 60 44" aria-hidden="true"><path d="M0 44V27C0 11 8 2 24 0l2 6c-9 3-13 9-13 17h11v21zm34 0V27c0-16 8-25 24-27l2 6c-9 3-13 9-13 17h11v21z" fill="#fff" fillOpacity=".85" /></svg>
        <blockquote className="quote__text">
          <p data-reveal="lines">I don&rsquo;t think entrepreneurship is risky.</p>
          <footer>Pratham Mittal, Founder, Tetr College of Business, to Forbes India</footer>
        </blockquote>
      </div>
    </section>
  );
}
