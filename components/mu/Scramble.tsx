"use client";
import { useEffect, useRef, useState } from "react";

/* A heading that changes between two names (the country in English and in its own language).
   The old name slides up out of a mask while the new one rises in. As it rises, its letters flicker
   briefly through letters of its own alphabet (Latin, Arabic, Devanagari or Chinese) and settle left to
   right in about 0.4 s, unsettled letters a little faded. No block glyphs. Runs only while on screen;
   reduced motion keeps the first name. */
const POOLS: [RegExp, string][] = [
  [/[؀-ۿ]/, "ابتثجحخدذرزسشصضطظعغفقكلمنهوي"],
  [/[ऀ-ॿ]/, "कखगघचजटडतदनपबमयरलवशसह"],
  [/[一-鿿]/, "中国日本天文学大人山水火土金木"],
];
const poolFor = (w: string) => POOLS.find(([re]) => re.test(w))?.[1] ?? "abcdefghijklmnopqrstuvwxyz";

export default function Scramble({ words, every = 3400 }: { words: string[]; every?: number }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState<string[]>(words);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false, raf = 0, cur = 0;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(ref.current!);
    const flicker = (k: number) => {
      const to = words[k], chars = Array.from(to), pool = poolFor(to), start = performance.now(), dur = 420;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur), settled = Math.floor(p * chars.length);
        const out = chars.map((c, j) => (j < settled || c === " " ? c : pool[(Math.random() * pool.length) | 0])).join("");
        setShown((s) => s.map((w, n) => (n === k ? (p < 1 ? out : to) : w)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const t = setInterval(() => {
      if (!visible) return;
      cur = (cur + 1) % words.length;
      setI(cur);
      flicker(cur);
    }, every);
    return () => { clearInterval(t); cancelAnimationFrame(raf); io.disconnect(); };
  }, [words, every]);
  return (
    <span ref={ref} className="swap" aria-label={words.join(" / ")}>
      {words.map((w, k) => (
        <span key={w} className={`swap__w${k === i ? " is-on" : ""}${shown[k] !== w ? " is-flick" : ""}`} aria-hidden="true">{shown[k]}</span>
      ))}
    </span>
  );
}
