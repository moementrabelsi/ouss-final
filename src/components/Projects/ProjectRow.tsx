"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, POINTER_FINE } from "@/lib/gsap";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { useI18n } from "@/lib/i18n";
import { Rule } from "@/components/ui/Rule";
import { SplitWords } from "@/components/ui/SplitWords";
import type { ProjectMeta } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCopy } from "./types";
import { SmartiniVisual } from "./visuals/SmartiniVisual";
import { AnalyticsVisual } from "./visuals/AnalyticsVisual";
import { CommerceVisual } from "./visuals/CommerceVisual";

function Visual({ meta }: { meta: ProjectMeta }) {
  if (meta.image) {
    return (
      <Image
        src={meta.image.src}
        alt=""
        width={meta.image.width}
        height={meta.image.height}
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="h-full w-full object-cover"
      />
    );
  }
  if (meta.visual === "smartini") return <SmartiniVisual />;
  if (meta.visual === "analytics") return <AnalyticsVisual />;
  return <CommerceVisual />;
}

export function ProjectRow({
  meta,
  copy,
  flip,
  onOpen,
}: {
  meta: ProjectMeta;
  copy: ProjectCopy;
  flip: boolean;
  onOpen: () => void;
}) {
  const { t } = useI18n();
  const revealRef = useSectionReveal<HTMLElement>();
  const visualRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const root = revealRef.current;
    const visual = visualRef.current;
    const inner = innerRef.current;
    if (!root || !visual || !inner) return;

    const mm = gsap.matchMedia();

    mm.add(POINTER_FINE, () => {
      if (metaRef.current) gsap.set(metaRef.current, { opacity: 0, y: 10 });

      const xTo = gsap.quickTo(inner, "x", { duration: 1.1, ease: "power3.out" });
      const yTo = gsap.quickTo(inner, "y", { duration: 1.1, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = visual.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        xTo(dx * 28);
        yTo(dy * 22);
      };

      const onEnter = () => {
        gsap.to(inner, { scale: 1.05, duration: 0.95, ease: "power3.out" });
        if (titleRef.current) gsap.to(titleRef.current, { x: 12, duration: 0.85, ease: "power3.out" });
        if (metaRef.current) gsap.to(metaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
        gsap.to(inner, { scale: 1, duration: 0.95, ease: "power3.out" });
        if (titleRef.current) gsap.to(titleRef.current, { x: 0, duration: 0.85, ease: "power3.out" });
        if (metaRef.current) gsap.to(metaRef.current, { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" });
      };

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerenter", onEnter);
      root.addEventListener("pointerleave", onLeave);

      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerenter", onEnter);
        root.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => mm.revert();
  }, { dependencies: [] });

  const isLink = Boolean(meta.href);
  const cursorLabel = isLink ? t.projects.cursorOpen : t.projects.cursorView;

  return (
    <article ref={revealRef} className="relative">
      <div className="shell">
        <Rule />

        <div className="grid grid-cols-12 items-center gap-x-8 gap-y-10 pb-20 pt-10 md:pb-28 md:pt-16">
          <div
            className={cn(
              "col-span-12 lg:col-span-4",
              flip ? "lg:col-start-9" : "lg:col-start-1",
            )}
          >
            <div className="flex items-baseline gap-4">
              <span aria-hidden className="numeral text-[clamp(2.25rem,5vw,4rem)]">
                {meta.number}
              </span>
              <span className="label text-ink-faint">{t.projects.projectLabel}</span>
            </div>

            <h3 ref={titleRef} className="display mt-6 text-[clamp(2rem,5vw,3.75rem)]">
              <SplitWords text={copy.title} />
            </h3>

            <p className="subtitle mt-3 text-lg sm:text-xl" data-reveal>
              {copy.subtitle}
            </p>

            <p className="mt-7 max-w-[46ch] text-ink-soft" data-reveal>
              {copy.description}
            </p>

            <p className="label mt-7 text-accent-deep" data-reveal>
              {meta.tech.join(" · ")}
            </p>

            <p ref={metaRef} className="label mt-4 text-ink">
              {t.projects.roleLabel}: {copy.role}
            </p>

            <p className="mt-8 flex items-center gap-3">
              <span className="label link-line text-brand">{t.projects.viewCase}</span>
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden className="text-brand" />
            </p>
          </div>

          <div
            className={cn(
              "col-span-12 lg:col-span-7",
              flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6",
            )}
          >
            <div
              ref={visualRef}
              data-reveal
              className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2 sm:aspect-[16/10]"
            >
              <div ref={innerRef} className="absolute inset-0 will-change-transform">
                <Visual meta={meta} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLink ? (
        <a
          href={meta.href}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor-label={cursorLabel}
          aria-label={`${copy.title} — ${t.projects.viewCase}`}
          className="absolute inset-0 z-10"
        />
      ) : (
        <button
          type="button"
          onClick={onOpen}
          data-cursor-label={cursorLabel}
          aria-label={`${copy.title} — ${t.projects.viewCase}`}
          className="absolute inset-0 z-10"
        />
      )}
    </article>
  );
}
