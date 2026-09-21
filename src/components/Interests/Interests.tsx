"use client";

import { useRef, type RefObject } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";

type Tween = ReturnType<typeof gsap.fromTo>;

function Row({
  items,
  trackRef,
  decorative,
}: {
  items: string[];
  trackRef: RefObject<HTMLDivElement | null>;
  /** The second row repeats the same words, so it is hidden from screen readers. */
  decorative?: boolean;
}) {
  // Rendered twice so the loop can wrap seamlessly at -50%.
  const sequence = [...items, ...items];
  return (
    <div className="overflow-hidden" aria-hidden={decorative || undefined}>
      <div ref={trackRef} className="flex w-max items-baseline will-change-transform">
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className="display flex items-center whitespace-nowrap text-[clamp(1.75rem,6vw,4.5rem)] text-ink"
          >
            {item}
            <span aria-hidden className="mx-8 inline-block h-[11px] w-[11px] shrink-0 rounded-full bg-accent md:mx-12" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Interests() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();
  const trackA = useRef<HTMLDivElement>(null);
  const trackB = useRef<HTMLDivElement>(null);
  const tweens = useRef<Tween[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const create = (element: HTMLDivElement | null, reverse: boolean) => {
        if (!element) return null;
        return gsap.fromTo(
          element,
          { xPercent: reverse ? -50 : 0 },
          {
            xPercent: reverse ? 0 : -50,
            duration: 38,
            ease: "none",
            repeat: -1,
          },
        );
      };

      const created = [create(trackA.current, false), create(trackB.current, true)].filter(
        Boolean,
      ) as Tween[];
      tweens.current = created;

      return () => {
        created.forEach((tween) => tween.kill());
        tweens.current = [];
      };
    });

    return () => mm.revert();
  }, { dependencies: [] });

  const setSpeed = (value: number) => {
    if (!tweens.current.length) return;
    gsap.to(tweens.current, { timeScale: value, duration: 0.6, ease: "power2.out" });
  };

  const reversed = [...t.interests.items].reverse();

  return (
    <section id="interests" ref={ref} className="pt-28 md:pt-40">
      <div className="shell">
        <Rule />
        <div className="pt-8 md:pt-12">
          <SectionLabel tone="brand">{t.interests.label}</SectionLabel>
        </div>
      </div>

      <div
        className="mt-12 flex flex-col gap-4 md:mt-20 md:gap-6"
        onPointerEnter={() => setSpeed(0)}
        onPointerLeave={() => setSpeed(1)}
        onFocus={() => setSpeed(0)}
        onBlur={() => setSpeed(1)}
      >
        <Row items={t.interests.items} trackRef={trackA} />
        <Row items={reversed} trackRef={trackB} decorative />
      </div>
    </section>
  );
}
