"use client";

import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SplitWords } from "@/components/ui/SplitWords";

/**
 * The one full-bleed accent block on the page. Its job is to break the
 * off-white rhythm exactly once, right before the lighter closing sections.
 */
export function Engagement() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();

  return (
    <section
      id="engagement"
      ref={ref}
      className="mt-28 bg-accent text-accent-ink md:mt-40"
    >
      <div className="shell py-20 md:py-28">
        <p className="label flex w-fit items-center gap-3 rounded-full bg-accent-ink/10 px-3.5 py-2 text-accent-ink" data-reveal>
          <span aria-hidden className="inline-block h-[7px] w-[7px] rounded-full bg-accent-ink" />
          {t.engagement.label}
        </p>

        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-10 pt-14 md:pt-20">
          <p
            aria-hidden
            data-reveal
            className="display col-span-12 text-[clamp(5.5rem,20vw,17rem)] leading-[0.78] lg:col-span-5"
          >
            {t.engagement.year}
          </p>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <h2 className="display text-[clamp(1.75rem,4.4vw,3.5rem)]">
              <SplitWords text={t.engagement.title} />
            </h2>
            <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed sm:text-lg" data-reveal>
              {t.engagement.description}
            </p>
          </div>
        </div>

        <ul className="mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-accent-ink/25 pt-8 md:mt-24">
          {t.engagement.tags.map((tag) => (
            <li
              key={tag}
              data-reveal
              className="font-display text-[clamp(1rem,2.4vw,1.75rem)] tracking-tight"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
