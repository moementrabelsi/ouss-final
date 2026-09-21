"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, POINTER_FINE } from "@/lib/gsap";

/**
 * Custom cursor: a small dot that follows precisely, plus a trailing disc
 * that expands into a label when the pointer is over something interactive.
 *
 * Any element can drive it with `data-cursor-label="…"`.
 * Desktop pointers only; disabled for touch and reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(POINTER_FINE);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("hide-native-cursor", enabled);
    return () => document.body.classList.remove("hide-native-cursor");
  }, [enabled]);

  useGSAP(
    () => {
      const dot = dotRef.current;
      const disc = discRef.current;
      if (!enabled || !dot || !disc) return;

      gsap.set([dot, disc], { xPercent: -50, yPercent: -50, opacity: 0 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
      const discX = gsap.quickTo(disc, "x", { duration: 0.42, ease: "power3.out" });
      const discY = gsap.quickTo(disc, "y", { duration: 0.42, ease: "power3.out" });

      let visible = false;

      const onMove = (event: PointerEvent) => {
        if (!visible) {
          visible = true;
          gsap.to([dot, disc], { opacity: 1, duration: 0.3 });
        }
        dotX(event.clientX);
        dotY(event.clientY);
        discX(event.clientX);
        discY(event.clientY);

        const target = event.target as Element | null;
        const hit = target?.closest?.("[data-cursor-label]") as HTMLElement | null;
        const next = hit?.getAttribute("data-cursor-label") ?? null;
        if (next !== labelRef.current) {
          labelRef.current = next;
          setLabel(next);
        }
      };

      const onLeave = () => {
        visible = false;
        gsap.to([dot, disc], { opacity: 0, duration: 0.25 });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [enabled] },
  );

  useGSAP(
    () => {
      const disc = discRef.current;
      const dot = dotRef.current;
      if (!enabled || !disc || !dot) return;
      const active = Boolean(label);
      gsap.to(disc, {
        width: active ? 92 : 34,
        height: active ? 92 : 34,
        backgroundColor: active ? "var(--color-accent)" : "rgba(13,13,12,0)",
        borderColor: active ? "var(--color-accent)" : "rgba(13,13,12,0.35)",
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: active ? 0 : 1, duration: 0.35, ease: "power3.out" });
    },
    { dependencies: [enabled, label] },
  );

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={discRef}
        className="absolute left-0 top-0 flex h-[34px] w-[34px] items-center justify-center rounded-full border will-change-transform"
        style={{ borderColor: "rgba(13,13,12,0.35)" }}
      >
        <span className="label text-center leading-tight text-accent-ink" style={{ opacity: label ? 1 : 0 }}>
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-ink will-change-transform"
      />
    </div>
  );
}
