"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "power3.out" });
  /* Tells the failsafe in layout.tsx that motion is alive. Without this,
     any failure to load GSAP would leave every [data-reveal] element at
     opacity 0 — an invisible page. */
  document.documentElement.dataset.motion = "ready";
}

export { gsap, ScrollTrigger, useGSAP };

/** Shared easing + duration language so every section moves the same way. */
export const motion = {
  ease: "power3.out",
  easeExpo: "expo.out",
  easeInOut: "power3.inOut",
  fast: 0.5,
  base: 0.9,
  slow: 1.2,
} as const;

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const POINTER_FINE = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
