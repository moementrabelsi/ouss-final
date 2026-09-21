"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import { projects } from "@/data/projects";

/**
 * In-page case study. Opening a project does not send the visitor away —
 * the detail slides over the page, which keeps the "view project" gesture
 * honest even before the live URLs exist.
 */
export function ProjectDetail({
  index,
  onClose,
}: {
  index: number | null;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const meta = index !== null ? projects[index] : null;
  const copy = index !== null ? t.projects.items[index] : null;

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = panel.querySelectorAll<HTMLElement>("[data-detail-item]");

      if (open) {
        gsap.set(panel, { display: "block" });
        if (reduced) {
          gsap.set(panel, { yPercent: 0, opacity: 1 });
          gsap.set(items, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          panel,
          { yPercent: 8, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: "power4.out" },
        );
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.12 },
        );
        return;
      }

      gsap.to(panel, {
        opacity: 0,
        yPercent: reduced ? 0 : 5,
        duration: reduced ? 0 : 0.4,
        ease: "power3.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    },
    { dependencies: [open, index] },
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={copy ? copy.title : t.projects.projectLabel}
      className="fixed inset-0 z-[110] hidden overflow-y-auto bg-paper"
      style={{ display: "none" }}
    >
      <div className="shell flex min-h-[100svh] flex-col py-8 md:py-12">
        <div className="flex items-center justify-between">
          <p className="label text-ink-faint">
            {t.projects.projectLabel} {meta?.number}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="label flex items-center gap-2 text-ink transition-opacity duration-300 hover:opacity-60"
            data-cursor-label={t.projects.closeCase}
          >
            {t.projects.closeCase}
            <X size={16} strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        {copy && meta ? (
          <div className="grid flex-1 grid-cols-12 content-start gap-x-8 gap-y-10 pt-14 md:pt-24">
            <div className="col-span-12 lg:col-span-7">
              <h2 data-detail-item className="display text-[clamp(2.5rem,8vw,6.5rem)]">
                {copy.title}
              </h2>
              <p
                data-detail-item
                className="mt-4 font-display text-[clamp(1.125rem,2.4vw,1.75rem)] tracking-tight text-ink-soft"
              >
                {copy.subtitle}
              </p>
              <p data-detail-item className="mt-10 max-w-[56ch] text-[1.0625rem] leading-relaxed text-ink-soft">
                {copy.description}
              </p>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <dl className="space-y-8">
                <div data-detail-item>
                  <dt className="label text-ink-faint">{t.projects.roleLabel}</dt>
                  <dd className="mt-3 border-t border-line pt-3 font-display tracking-tight">
                    {copy.role}
                  </dd>
                </div>
                <div data-detail-item>
                  <dt className="label text-ink-faint">{t.projects.stackLabel}</dt>
                  <dd className="mt-3 border-t border-line pt-3 font-display tracking-tight">
                    {meta.tech.join(" · ")}
                  </dd>
                </div>
              </dl>

              <p data-detail-item className="label mt-12 text-ink-faint">
                {t.projects.focusLabel}
              </p>
              <ul className="mt-4">
                {copy.contributions.map((contribution, position) => (
                  <li
                    key={contribution}
                    data-detail-item
                    className="flex items-baseline gap-4 border-t border-line py-4 last:border-b"
                  >
                    <span className="label w-7 shrink-0 text-ink-faint">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink-soft">{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
