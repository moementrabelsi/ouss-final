"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, POINTER_FINE } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

/** Four small generated marks, cycled across the capability list. */
function CapabilityGlyph({ index }: { index: number }) {
  const variant = index % 4;
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" aria-hidden>
      {variant === 0 && (
        <g stroke="var(--color-accent-ink)" strokeWidth="2">
          <path d="M6 50 L22 32 L38 40 L58 12" />
          <circle cx="58" cy="12" r="3.5" fill="var(--color-accent-ink)" />
        </g>
      )}
      {variant === 1 && (
        <g fill="var(--color-accent-ink)">
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <circle key={`${row}-${col}`} cx={12 + col * 13} cy={12 + row * 13} r="2.4" />
            )),
          )}
        </g>
      )}
      {variant === 2 && (
        <g stroke="var(--color-accent-ink)" strokeWidth="2">
          <rect x="8" y="8" width="48" height="48" />
          <path d="M8 32 H56 M32 8 V56" />
        </g>
      )}
      {variant === 3 && (
        <g stroke="var(--color-accent-ink)" strokeWidth="2">
          <path d="M6 44 C 20 12, 44 52, 58 20" />
          <path d="M6 54 H58" strokeOpacity="0.4" />
        </g>
      )}
    </svg>
  );
}

export function Skills() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;

    const mm = gsap.matchMedia();
    mm.add(POINTER_FINE, () => {
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
      const xTo = gsap.quickTo(preview, "x", { duration: 0.75, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.75, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = list.getBoundingClientRect();
        xTo(event.clientX - rect.left);
        yTo(event.clientY - rect.top);
      };

      list.addEventListener("pointermove", onMove);
      return () => list.removeEventListener("pointermove", onMove);
    });

    return () => mm.revert();
  }, { dependencies: [] });

  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview) return;
      if (!window.matchMedia(POINTER_FINE).matches) return;
      gsap.to(preview, {
        opacity: active === null ? 0 : 1,
        scale: active === null ? 0.6 : 1,
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { dependencies: [active] },
  );

  return (
    <section id="skills" ref={ref} className="shell pt-28 md:pt-40">
      <Rule />
      <div className="flex flex-wrap items-baseline justify-between gap-4 pt-8 md:pt-12">
        <SectionLabel tone="teal">{t.skills.label}</SectionLabel>
        <p className="max-w-[42ch] text-ink-soft sm:text-lg" data-reveal>
          {t.skills.lead}
        </p>
      </div>

      <div ref={listRef} className="relative">
        <ul className="relative mt-14 md:mt-20">
          {t.skills.capabilities.map((capability, index) => (
            <li key={capability} className="border-t border-line last:border-b">
              <div
                data-reveal
                onPointerEnter={() => setActive(index)}
                onPointerLeave={() => setActive((current) => (current === index ? null : current))}
                className={cn(
                  "flex items-baseline gap-5 py-4 transition-all duration-500 md:gap-8 md:py-6 md:hover:pl-5",
                  active !== null && active !== index ? "opacity-35" : "opacity-100",
                )}
              >
                <span className="numeral w-10 shrink-0 text-base">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="display text-[clamp(1.5rem,4.8vw,3.5rem)] text-ink">{capability}</span>
              </div>
            </li>
          ))}
        </ul>

        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 hidden h-28 w-28 items-center justify-center bg-accent opacity-0 lg:flex"
        >
          {active !== null ? <CapabilityGlyph index={active} /> : null}
        </div>
      </div>

      <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-28">
        {skillGroups.map((group) => (
          <div key={group.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Rule />
            <p className="label mt-5 text-brand" data-reveal>
              {t.skills.groups[group.id]}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  data-reveal
                  className="font-display text-[0.9375rem] tracking-tight text-ink-soft transition-colors duration-300 hover:text-brand sm:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
