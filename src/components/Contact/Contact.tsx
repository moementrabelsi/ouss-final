"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { site } from "@/data/site";

export function Contact() {
  const { t } = useI18n();
  const ref = useSectionReveal<HTMLElement>();

  /** Shows the bare host so the labels stay correct when the URLs change. */
  const host = (url: string) => {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch {
      return url;
    }
  };

  const links = [
    {
      label: t.contact.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      label: t.contact.linkedinLabel,
      value: host(site.linkedin),
      href: site.linkedin,
      external: true,
    },
    {
      label: t.contact.githubLabel,
      value: host(site.github),
      href: site.github,
      external: true,
    },
  ];

  return (
    <section id="contact" ref={ref} className="shell pt-24 md:pt-36">
      <p className="eyebrow w-fit" data-reveal>
        <span aria-hidden className="eyebrow__dot" />
        {t.contact.label}
      </p>

      <h2 className="display mt-10 max-w-[16ch] text-[clamp(2.25rem,7.5vw,6.5rem)] text-paper md:mt-16">
        <SplitWords text={t.contact.headline} />
      </h2>

      <p className="mt-8 max-w-[48ch] text-[1.0625rem] leading-relaxed text-paper/75 sm:text-lg" data-reveal>
        {t.contact.text}
      </p>

      <ul className="mt-16 md:mt-24">
        {links.map((link) => (
          <li key={link.label} className="border-t border-line-night last:border-b">
            <a
              data-reveal
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              data-cursor-label={t.projects.cursorOpen}
              className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6 transition-[padding] duration-500 hover:pl-3 md:py-9"
            >
              <span className="display text-[clamp(1.625rem,5vw,3.5rem)] text-paper">
                {link.label}
              </span>
              <span className="flex items-center gap-4">
                <span className="label text-paper/60 transition-colors duration-500 group-hover:text-accent">
                  {link.value}
                </span>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.25}
                  aria-hidden
                  className="text-paper/60 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
