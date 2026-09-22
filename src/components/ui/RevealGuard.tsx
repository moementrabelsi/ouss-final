"use client";

import { useEffect } from "react";
import { startRevealGuard, sweepReveals } from "@/lib/reveal";

/**
 * Mounted once, in the layout. Keeps the reveal watchdog running for the life
 * of the page so no section can ever be left blank — see `@/lib/reveal`.
 */
export function RevealGuard() {
  useEffect(() => {
    const stop = startRevealGuard();

    /* If the visitor prefers reduced motion nothing animates at all, so there
       is no reason to wait out the grace period. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sweepReveals(true);
    }

    return stop;
  }, []);

  return null;
}
