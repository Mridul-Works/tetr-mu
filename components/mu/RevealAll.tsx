"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* One motion grammar for every section below the hero.

   Text
   - Headlines [data-reveal="lines"]: words rise out of a line mask and un-tilt (5deg -> 0), 35 ms apart,
     so a headline reads as one gesture, not a block sliding up.
   - Paragraphs [data-reveal]: line by line, up 16 px and out of an 8 px blur, 70 ms apart.
   - MU's frame boxes draw their line from the top-left, then the four rings pop in turn (CSS).

   Pictures
   - Cards and photos open from a clipped, slightly inset window while rising 40 px (batched, so
     whatever enters together staggers together).
   - Inside their frames, photos drift against the scroll (parallax), big backgrounds drift more.
   - Decorations and frame boxes float at their own speed, so the page has depth.

   Phones get the text and card reveals but no scroll-linked parallax. Reduced motion gets none of it. */

const CARDS = [".imm__photo", ".pitch__fig", ".prog__card", ".chk__ph", ".cta__ph", ".tribe__card", ".fac2__card", ".radio__item", ".press__card", ".lp__media", ".partners__tile", ".proof__frame"];
const INNER = [".fac2__card", ".radio__thumb", ".pitch__fig", ".tribe__ph", ".prog__card", ".cta__ph", ".chk__ph", ".arc__tile", ".imm__photo"];

export default function RevealAll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const kills: (() => void)[] = [];

    // MU's header turns to dark glass over dark sections
    document.querySelectorAll<HTMLElement>('[data-tone="dark"]').forEach((el) => {
      const t = ScrollTrigger.create({
        trigger: el, start: "top 64px", end: "bottom 64px",
        onToggle: (s) => window.dispatchEvent(new CustomEvent("tetr:header-tone", { detail: { dark: s.isActive } })),
      });
      kills.push(() => t.kill());
    });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => kills.forEach((k) => k());

    // a context, so React's double-run in dev (and any unmount) puts every element back first
    const splits: SplitText[] = [];
    const boxes: HTMLElement[] = [];
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.dataset.reveal === "lines") {
          const sp = SplitText.create(el, { type: "lines,words", mask: "lines" });
          splits.push(sp);
          gsap.from(sp.words, { yPercent: 118, rotate: 5, transformOrigin: "0% 100%", duration: 1.15, ease: "expo.out", stagger: 0.035, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        } else {
          const sp = SplitText.create(el, { type: "lines" });
          splits.push(sp);
          gsap.from(sp.lines, { y: 16, autoAlpha: 0, filter: "blur(8px)", duration: 0.9, ease: "power3.out", stagger: 0.07, clearProps: "filter", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        }
      });

      // frame boxes: draw the line, then the rings
      document.querySelectorAll<HTMLElement>("main .frame-box").forEach((b) => {
        if (b.closest(".hero")) return;
        b.classList.add("fb-draw"); boxes.push(b);
        ScrollTrigger.create({ trigger: b, start: "top 88%", once: true, onEnter: () => b.classList.add("is-drawn") });
      });

      // cards and photos open as they arrive, in batches
      const cards = gsap.utils.toArray<HTMLElement>(CARDS.join(","));
      gsap.set(cards, { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 92%", once: true,
        onEnter: (batch) => gsap.fromTo(batch,
          { autoAlpha: 0, y: 40, clipPath: "inset(10% 6% 10% 6% round 12px)" },
          { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.1, ease: "expo.out", stagger: { each: 0.08, ease: "power1.in" }, clearProps: "clipPath,transform" }),
      });

      // the classmates' numbers fill their blocks when they arrive
      ScrollTrigger.batch(".tribe__dots", { start: "top 90%", once: true, onEnter: (b) => b.forEach((el) => el.classList.add("is-in")) });

      gsap.matchMedia().add("(min-width: 1024px) and (hover: hover)", () => {
        const scrub = (el: Element, from: gsap.TweenVars, to: gsap.TweenVars, trigger: Element = el) =>
          gsap.fromTo(el, from, { ...to, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } });
        // photos drift inside their frames
        document.querySelectorAll<HTMLElement>(INNER.join(",")).forEach((frame) => {
          const img = frame.querySelector("img"); if (!img) return;
          scrub(img, { yPercent: -3, scale: 1.06 }, { yPercent: 3, scale: 1.06 }, frame);
        });
        // full-bleed backgrounds drift more
        document.querySelectorAll(".cta__bg").forEach((el) => scrub(el, { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1 }, el.parentElement!));
        // the decorations float at their own speed
        document.querySelectorAll(".lp__deco, .proof__blocks").forEach((d, i) => scrub(d, { y: 90, rotate: i % 2 ? 8 : -8 }, { y: -90, rotate: 0 }, d.parentElement!));
        document.querySelectorAll(".pitch__logo").forEach((d) => scrub(d, { rotateY: -34, rotateX: 26 }, { rotateY: -6, rotateX: 12 }, d.closest("section")!));
        // section headings float a little ahead of their content
        boxes.forEach((b) => { if (!b.closest(".proof__pin, .terms__folder")) scrub(b, { y: 36 }, { y: -36 }); });
      });
    });
    kills.push(() => { ctx.revert(); splits.forEach((sp) => sp.revert()); boxes.forEach((b) => b.classList.remove("fb-draw", "is-drawn")); });
    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { clearTimeout(t); kills.forEach((k) => k()); };
  }, []);
  return null;
}
