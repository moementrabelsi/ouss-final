"use client";

import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitWords } from "@/components/ui/SplitWords";
import { Rule } from "@/components/ui/Rule";

export function About() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="shell pt-28 md:pt-40">
      <Rule />

      <div className="grid grid-cols-12 gap-x-6 gap-y-12 pt-8 md:pt-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionLabel tone="brand">{t.about.label}</SectionLabel>
          <h2 className="display mt-10 text-[clamp(2rem,5vw,4.25rem)] text-brand md:mt-16 lg:max-w-[13ch]">
            <SplitWords text={t.about.statement} />
          </h2>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="space-y-6 text-base leading-relaxed text-ink-soft sm:text-[1.0625rem]">
            {t.about.body.map((paragraph, index) => (
              <p key={index} data-reveal className={index === 0 ? "text-[1.125rem] text-ink" : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14">
            <Rule />
            <p className="label mt-5 text-accent-deep" data-reveal>
              {t.about.currentlyLabel}
            </p>
            <dl className="mt-5 space-y-3">
              {t.about.currently.map((entry) => (
                <div
                  key={entry.k}
                  data-reveal
                  className="flex items-baseline justify-between gap-6 border-b border-line pb-3"
                >
                  <dt className="label text-ink-faint">{entry.k}</dt>
                  <dd className="text-right font-display font-semibold tracking-tight text-brand sm:text-base">
                    {entry.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
