"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Draws every `[data-draw]` path inside the scope when it scrolls into view.
 * Paths must carry `pathLength={1}` so the dash maths stays resolution free.
 */
export function useDrawOnScroll<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const paths = gsap.utils.toArray<SVGPathElement>("[data-draw]", root);
        if (!paths.length) return;
        gsap.fromTo(
          paths,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power2.inOut",
            stagger: 0.15,
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
}
