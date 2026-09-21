"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger, motion, MOTION_OK } from "@/lib/gsap";

/**
 * One shared entrance choreography for every section.
 *
 * Mark elements inside the section with:
 *   data-word   — a masked word inside <SplitWords>, slides up
 *   data-line   — a hairline rule, draws from left to right
 *   data-reveal — anything else, fades and rises as it enters the viewport
 *
 * Headline words and rules play together from the section trigger; everything
 * else is batched per viewport entry, so long sections stay alive as you scroll
 * instead of firing all at once at the top.
 *
 * Reduced motion is handled in CSS (see globals.css), so this hook only ever
 * runs inside a `prefers-reduced-motion: no-preference` match.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  options: { start?: string; stagger?: number } = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { start = "top 80%", stagger = 0.06 } = options;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word]", root);
        const lines = gsap.utils.toArray<HTMLElement>("[data-line]", root);
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);

        if (words.length || lines.length) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start, once: true },
          });

          if (lines.length) {
            tl.fromTo(
              lines,
              { scaleX: 0 },
              { scaleX: 1, duration: motion.slow, ease: motion.easeInOut, stagger: 0.05 },
              0,
            );
          }

          if (words.length) {
            tl.fromTo(
              words,
              { yPercent: 110 },
              { yPercent: 0, duration: 1, ease: motion.easeExpo, stagger: 0.035 },
              0,
            );
          }
        }

        if (items.length) {
          ScrollTrigger.batch(items, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              gsap.fromTo(
                batch,
                { opacity: 0, y: 28 },
                {
                  opacity: 1,
                  y: 0,
                  duration: motion.base,
                  ease: motion.ease,
                  stagger,
                  overwrite: true,
                },
              ),
          });
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
