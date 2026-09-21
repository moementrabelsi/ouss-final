"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP, POINTER_FINE } from "@/lib/gsap";

/**
 * Subtle magnetic pull: the target drifts a few pixels toward the cursor
 * while it is over the wrapper, then eases back. Desktop pointers only.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 18,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(POINTER_FINE, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
          const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
          xTo(dx * strength);
          yTo(dy * strength);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);

        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [strength] },
  );

  return ref;
}
