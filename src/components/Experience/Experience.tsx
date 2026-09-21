"use client";

import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function Experience() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="shell pt-28 md:pt-40">
      <Rule />
      <div className="flex flex-wrap items-baseline justify-between gap-4 pt-8 md:pt-12">
        <SectionLabel tone="brand">{t.experience.label}</SectionLabel>
        <p className="max-w-[44ch] text-ink-soft sm:text-lg" data-reveal>
          {t.experience.lead}
        </p>
      </div>

      <ol className="mt-14 md:mt-20">
        {experience.map((entry, index) => {
          const copy = t.experience.items[index];
          return (
            <li key={entry.id} className="border-t border-line last:border-b">
              <div
                data-reveal
                className="grid grid-cols-12 gap-x-6 gap-y-5 py-8 transition-[padding] duration-500 md:py-11 md:hover:pl-4"
              >
                <div className="col-span-12 flex items-center gap-4 md:col-span-2">
                  <span
                    aria-hidden
                    className={cn(
                      "h-[9px] w-[9px] shrink-0",
                      entry.current ? "bg-accent" : "bg-brand/25",
                    )}
                  />
                  <span className={cn("label", entry.current ? "text-accent-deep" : "text-ink-faint")}>
                    {entry.current ? t.experience.present : String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <h3 className="font-display text-[clamp(1.25rem,2.8vw,2.125rem)] tracking-tight text-brand">
                    {copy.role}
                  </h3>
                  <p className="subtitle mt-2 max-w-[44ch] text-base sm:text-lg">{entry.company}</p>

                  {copy.duties.length > 0 ? (
                    <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
                      {copy.duties.map((duty) => (
                        <li key={duty} className="label text-ink-soft">
                          <span aria-hidden className="mr-2 text-accent-deep">
                            —
                          </span>
                          {duty}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className="col-span-12 md:col-span-4 md:text-right">
                  <p className="label text-ink-faint">{entry.location}</p>
                  <p className="mt-2 text-sm text-ink-soft md:ml-auto md:max-w-[30ch]">
                    {copy.summary}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-16 md:mt-24">
        <Rule />
        <p className="label mt-5 text-teal" data-reveal>
          {t.experience.transferLabel}
        </p>
        <ul className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
          {t.experience.transfer.map((item) => (
            <li
              key={item}
              data-reveal
              className="font-display text-[clamp(1rem,2.2vw,1.5rem)] tracking-tight text-brand"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
