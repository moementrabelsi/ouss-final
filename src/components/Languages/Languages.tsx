"use client";

import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";

/**
 * No progress bars, no percentages — proficiency is not numeric data.
 * Typography and a hairline carry the whole section.
 */
export function Languages() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section id="languages" ref={ref} className="shell pt-28 md:pt-40">
      <Rule />
      <div className="flex flex-wrap items-baseline justify-between gap-4 pt-8 md:pt-12">
        <SectionLabel tone="teal">{t.languages.label}</SectionLabel>
        <p className="text-ink-soft sm:text-lg" data-reveal>
          {t.languages.lead}
        </p>
      </div>

      <ul className="mt-14 md:mt-20">
        {t.languages.items.map((language) => (
          <li key={language.name} className="border-t border-line last:border-b">
            <div
              data-reveal
              className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6 md:py-8"
            >
              <span className="display text-[clamp(1.75rem,4.6vw,3.25rem)] text-brand">{language.name}</span>
              <span className="eyebrow eyebrow--amber">{language.level}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
