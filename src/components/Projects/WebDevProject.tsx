"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { useI18n } from "@/lib/i18n";
import { Rule } from "@/components/ui/Rule";
import { SplitWords } from "@/components/ui/SplitWords";
import type { ProjectMeta } from "@/data/projects";
import type { ProjectCopy } from "./types";
import { BrowserFrame } from "./visuals/BrowserFrame";

const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * Project 03 breaks the row rhythm: the three web projects run as a pinned
 * horizontal sequence on desktop and stack vertically on smaller screens.
 */
export function WebDevProject({
  meta,
  copy,
  onOpen,
}: {
  meta: ProjectMeta;
  copy: ProjectCopy;
  onOpen: () => void;
}) {
  const { t } = useI18n();
  const headerRef = useSectionReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MOTION, () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const track = trackRef.current;
      if (!section || !pin || !track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, { dependencies: [] });

  return (
    <article className="relative">
      <div ref={headerRef} className="shell">
        <Rule />

        <div className="grid grid-cols-12 gap-x-8 gap-y-8 pt-10 md:pt-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-baseline gap-4">
              <span aria-hidden className="numeral text-[clamp(2.25rem,5vw,4rem)]">
                {meta.number}
              </span>
              <span className="label text-ink-faint">{t.projects.projectLabel}</span>
            </div>

            <h3 className="display mt-5 text-[clamp(2rem,4.6vw,3.5rem)] text-brand">
              <SplitWords text={copy.title} />
            </h3>

            <p className="subtitle mt-3 text-lg sm:text-xl" data-reveal>
              {copy.subtitle}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="max-w-[46ch] text-ink-soft" data-reveal>
              {copy.description}
            </p>
            <p className="label mt-7 text-accent-deep" data-reveal>
              {meta.tech.join(" · ")}
            </p>

            <button
              type="button"
              onClick={onOpen}
              data-cursor-label={t.projects.cursorView}
              className="mt-8 flex items-center gap-3"
              data-reveal
            >
              <span className="label link-line text-brand">{t.projects.viewCase}</span>
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden className="text-brand" />
            </button>

            <p className="label mt-10 hidden text-accent-deep lg:block" data-reveal>
              {t.projects.web.hint} →
            </p>
          </div>
        </div>
      </div>

      <div ref={sectionRef} className="relative mt-12 md:mt-16">
        <div ref={pinRef} className="lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-10 px-[var(--gutter)] will-change-transform lg:w-max lg:flex-row lg:gap-12"
          >
            {t.projects.web.panels.map((panel, index) => (
              <figure
                key={panel.title}
                className="w-full shrink-0 lg:w-[70vw] lg:max-w-[980px]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-paper-2">
                  <BrowserFrame
                    variant={index as 0 | 1 | 2}
                    title={panel.title}
                    label={panel.kind}
                  />
                </div>
                <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
                  <span className="font-display text-lg tracking-tight sm:text-xl">
                    <span aria-hidden className="numeral mr-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {panel.title}
                  </span>
                  <span className="label text-teal">
                    {panel.kind} · {panel.note}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="shell pb-20 md:pb-28" />
    </article>
  );
}
