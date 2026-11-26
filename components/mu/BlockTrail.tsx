"use client";
import { useEffect, useRef } from "react";

/* On MU's grid-paper sections, the pointer fills the grid cell it passes over with a soft Tetr colour
   (now and then a country's print), and the cell fades back to paper within half a second. The trail
   snaps to the same grid the paper is drawn on. Mouse only; decoration behind the content. */
const TONES = ["#f7ddd6", "#f7e9b8", "#d6ecdc", "#e6eef9"];
const PRINTS = ["dubai", "india", "china", "ghana", "usa", "argentina", "europe"];

export default function BlockTrail() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const layer = ref.current!;
    const host = layer.parentElement!;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cells = Array.from(layer.children) as HTMLElement[];
    let n = 0, lastKey = "", raf = 0, px = 0, py = 0;
    const drop = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const cell = parseFloat(getComputedStyle(host).getPropertyValue("--grid-cell")) || 64;
      const x0 = r.width / 2 - cell / 2;
      const gx = Math.floor((px - r.left - x0) / cell), gy = Math.floor((py - r.top) / cell), key = `${gx}:${gy}`;
      if (key === lastKey) return;
      lastKey = key;
      const el = cells[n++ % cells.length];
      el.style.cssText = `left:${x0 + gx * cell}px;top:${gy * cell}px;width:${cell}px;height:${cell}px;background-color:${TONES[n % TONES.length]};background-image:${n % 5 === 0 ? `url(/art/giant/${PRINTS[n % PRINTS.length]}-color.webp)` : "none"}`;
      el.classList.remove("is-on"); void el.offsetWidth; el.classList.add("is-on");
    };
    const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(drop); };
    host.addEventListener("pointermove", move);
    return () => { host.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="btrail" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>;
}
