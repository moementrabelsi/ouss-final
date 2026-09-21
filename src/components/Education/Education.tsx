"use client";

import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitWords } from "@/components/ui/SplitWords";
import { Rule } from "@/components/ui/Rule";

export function Education() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section id="education" ref={ref} className="shell pt-28 md:pt-40">
      <Rule />
      <div className="pt-8 md:pt-12">
        <SectionLabel tone="amber">{t.education.label}</SectionLabel>
      </div>

      <div className="grid grid-cols-12 items-start gap-x-6 gap-y-10 pt-12 md:pt-20">
        <div className="col-span-12 lg:col-span-5">
          <p
            aria-hidden
            data-reveal
            className="display outline-type text-[clamp(5rem,17vw,15rem)] leading-[0.8]"
          >
            {t.education.degree}
          </p>
          <p className="label mt-6 text-accent-deep" data-reveal>
            {t.education.period} · {t.education.location}
          </p>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 className="display text-[clamp(1.875rem,4.4vw,3.5rem)] text-brand">
            <SplitWords text={t.education.school} />
          </h2>
          <p className="subtitle mt-4 text-[clamp(1.125rem,2.2vw,1.625rem)]" data-reveal>
            {t.education.program}
          </p>
          <p className="mt-6 max-w-[46ch] text-ink-soft" data-reveal>
            {t.education.note}
          </p>

          <p className="label mt-14 text-teal" data-reveal>
            {t.education.modulesLabel}
          </p>
          <ul className="mt-5">
            {t.education.modules.map((module, index) => (
              <li
                key={module}
                data-reveal
                className="flex items-baseline gap-5 border-t border-line py-4 last:border-b"
              >
                <span className="numeral w-10 shrink-0 text-base">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-base tracking-tight sm:text-lg">{module}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
