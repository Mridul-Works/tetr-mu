"use client";
import { useEffect, useRef } from "react";

/* The dotted dark backgrounds (footer, programmes), drawn on a canvas so the dots themselves can move:
   near the pointer they are pushed outward, like a finger pressed into a field of pins, and they spring
   back when it leaves. Only the patch around the pointer is redrawn each frame. Mouse only. */
export default function DotHover({ size = 7, alpha = 0.065 }: { size?: number; alpha?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const host = cv.parentElement!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const R = 150, PUSH = 16;
    let W = 0, H = 0;
    const dot = (x: number, y: number, r: number) => ctx.fillRect(x - r, y - r, r * 2, r * 2);
    // the patch's edges sit halfway between dots and drawing is clipped to it, so no dot is ever drawn
    // twice (double-drawn edge dots showed up as bright dotted boxes)
    const snap = (v: number) => Math.floor(v / size) * size + size / 2;
    const drawRect = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, k: number) => {
      const x0 = snap(ax) - size, y0 = snap(ay) - size, x1 = snap(bx) + size, y1 = snap(by) + size;
      ctx.save();
      ctx.beginPath(); ctx.rect(x0, y0, x1 - x0, y1 - y0); ctx.clip();
      ctx.clearRect(x0, y0, x1 - x0, y1 - y0);
      for (let y = Math.floor(y0 / size) * size; y <= y1 + size; y += size) for (let x = Math.floor(x0 / size) * size; x <= x1 + size; x += size) {
        let px = x, py = y, r = 0.85;
        if (k > 0) {
          const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
          if (d < R && d > 0.01) { const f = (1 - d / R) ** 2 * k; px += (dx / d) * PUSH * f; py += (dy / d) * PUSH * f; r += f * 0.6; }
        }
        dot(px, py, r);
      }
      ctx.restore();
    };
    const resize = () => {
      W = host.offsetWidth; H = host.offsetHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`; cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      drawRect(0, 0, W, H, 0, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(host);
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return () => ro.disconnect();

    // the pushed patch follows the pointer with a little lag, and relaxes when it leaves
    let tx = -999, ty = -999, cx = -999, cy = -999, k = 0, tk = 0, raf = 0, last: [number, number, number, number] | null = null;
    const frame = () => {
      raf = 0;
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22; k += (tk - k) * 0.12;
      const pad = R + PUSH + size;
      const box: [number, number, number, number] = [Math.max(0, cx - pad), Math.max(0, cy - pad), Math.min(W, cx + pad), Math.min(H, cy + pad)];
      if (last) drawRect(last[0], last[1], last[2], last[3], cx, cy, k);
      drawRect(box[0], box[1], box[2], box[3], cx, cy, k);
      last = box;
      if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3 || Math.abs(tk - k) > 0.01) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top;
      if (cx < -900) { cx = tx; cy = ty; }
      tk = 1; kick();
    };
    const leave = () => { tk = 0; kick(); };
    host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave);
    return () => { ro.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, [size, alpha]);
  return <canvas ref={ref} className="dotfield" aria-hidden="true" />;
}
