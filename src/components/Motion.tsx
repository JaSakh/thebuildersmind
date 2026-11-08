"use client";

import { useEffect } from "react";

// One small script for all scroll and pointer effects, so pages can stay server-rendered:
//   data-reveal             fades/slides in when scrolled into view
//   data-count              counts up to its number
//   .spotlight              glow follows the cursor
//   data-tilt               tilts toward the cursor
// New elements (page changes, episode filters) are picked up automatically.
export default function Motion() {
  useEffect(() => {
    (window as unknown as { __motion?: boolean }).__motion = true;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Everything that enters the view together is staggered, one after the other.
    const reveal = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.setProperty("--d", `${Math.min(i, 8) * 75}ms`);
            el.setAttribute("data-in", "");
            reveal.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );

    const count = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          count.unobserve(e.target);
          const el = e.target as HTMLElement;
          const target = Number(el.dataset.count);
          const started = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - started) / 1400, 1);
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 4))));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );

    // Tracked per run (not on the element), so a re-run of this effect starts clean.
    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        reveal.observe(el);
      });
      if (calm) return;
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.textContent = "0";
        count.observe(el);
      });
    };
    scan();
    let pending = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(scan);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    // Scroll progress bar and header state
    let ticking = false;
    const paint = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      const bar = document.querySelector<HTMLElement>(".scroll-progress");
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
      document.querySelector("header")?.toggleAttribute("data-scrolled", scrollY > 12);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };
    paint();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });

    // Cursor effects
    let tilted: HTMLElement | null = null;
    const resetTilt = () => {
      tilted?.style.removeProperty("--rx");
      tilted?.style.removeProperty("--ry");
      tilted = null;
    };
    const onPointer = (e: PointerEvent) => {
      if (!(e.target instanceof Element)) return;
      const spot = e.target.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const tilt = e.target.closest<HTMLElement>("[data-tilt]");
      if (tilt !== tilted) resetTilt();
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        tilt.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 9}deg`);
        tilt.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -9}deg`);
        tilted = tilt;
      }
    };
    if (canHover && !calm) document.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      reveal.disconnect();
      count.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(pending);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
