"use client";

import { useRef } from "react";
import { Mail, Linkedin, Github, MapPin, ArrowDown } from "lucide-react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import { SplitWords } from "@/components/ui/SplitWords";
import { site } from "@/data/site";
import { HeroField } from "./HeroField";

/**
 * The hero never depends on JavaScript to be readable.
 *
 * Everywhere else on the page, elements start at `opacity: 0` in CSS and GSAP
 * fades them in. Above the fold that is a bad trade: if the animation does not
 * run — reduced motion, a GSAP load failure, a hydration error, a slow device —
 * the visitor is left staring at an empty screen. So the hero renders fully
 * visible and GSAP animates *from* the hidden state with .from(). Worst case,
 * the content simply appears without motion.
 */
export function Hero() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);

  /* Contact chips — icon + label, so they read on every screen size. */
  const contacts = [
    {
      key: "email",
      label: t.contact.emailLabel,
      href: `mailto:${site.email}`,
      Icon: Mail,
      external: false,
    },
    {
      key: "linkedin",
      label: t.contact.linkedinLabel,
      href: site.linkedin,
      Icon: Linkedin,
      external: true,
    },
    {
      key: "github",
      label: t.contact.githubLabel,
      href: site.github,
      Icon: Github,
      external: true,
    },
  ];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word-safe]", root);
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]", root);
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", root);

        const tl = gsap.timeline({ delay: 0.1 });

        if (words.length) {
          /* `y: 0` guards against a stray pixel offset on the mask — see useSectionReveal. */
          tl.from(words, { yPercent: 115, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.06 }, 0);
        }
        if (items.length) {
          tl.from(
            items,
            { opacity: 0, y: 22, duration: 0.85, ease: "power3.out", stagger: 0.07 },
            0.3,
          );
        }
        if (lines.length) {
          tl.from(lines, { scaleX: 0, duration: 1.2, ease: "power3.inOut" }, 0.45);
        }
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="top"
      ref={rootRef}
      /* overflow-x-clip, not overflow-hidden: on a short window the old rule
         cropped the headline and chips out of view entirely. */
      className="relative flex min-h-[100svh] flex-col justify-between overflow-x-clip pt-28 md:pt-32"
    >
      <HeroField className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] lg:block" />

      <div className="shell relative z-10 flex flex-1 flex-col justify-center py-10">
        {/* Status pill */}
        <p className="eyebrow eyebrow--teal w-fit" data-hero-item>
          <span aria-hidden className="eyebrow__dot" />
          {t.hero.status}
        </p>

        {/* Name */}
        <h1 className="display mt-7 text-[clamp(2.75rem,9vw,8rem)] md:mt-9">
          <span className="block text-ink">
            <SplitWords safe text={t.hero.firstName} />
          </span>
          <span className="block text-brand">
            <SplitWords safe text={t.hero.lastName} />
          </span>
        </h1>

        {/* Discipline — the coloured subtitle directly under the name */}
        <p
          data-hero-item
          className="subtitle mt-5 flex items-center gap-4 text-[clamp(1.0625rem,2.6vw,1.75rem)]"
        >
          <span aria-hidden className="h-px w-10 shrink-0 bg-teal sm:w-16" />
          {t.hero.discipline}
        </p>

        {/* The describing phrase */}
        <p
          data-hero-item
          className="mt-6 max-w-[54ch] text-pretty text-[1.0625rem] leading-relaxed text-ink-soft sm:text-xl sm:leading-[1.6]"
        >
          {t.hero.tagline}
        </p>

        <p
          data-hero-item
          className="mt-4 max-w-[54ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-faint sm:text-base"
        >
          {t.hero.intro}
        </p>

        {/* Contact icons */}
        <div className="mt-9 flex flex-wrap items-center gap-3" data-hero-item>
          {contacts.map(({ key, label, href, Icon, external }) => (
            <a
              key={key}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              aria-label={label}
              className="chip"
            >
              <Icon size={17} strokeWidth={1.75} aria-hidden />
              <span>{label}</span>
            </a>
          ))}
          <span className="chip chip--ghost">
            <MapPin size={17} strokeWidth={1.75} aria-hidden className="text-accent-deep" />
            <span>{site.city}</span>
          </span>
        </div>
      </div>

      <div className="shell relative z-10 pb-8">
        <span data-hero-line className="rule mb-5 origin-left" />
        <div className="flex items-end justify-between gap-6">
          <p data-hero-item className="label text-ink-faint">
            {t.hero.location}
          </p>
          <a
            href="#about"
            data-hero-item
            className="label group flex items-center gap-3 text-brand transition-opacity duration-300 hover:opacity-70"
          >
            <span>{t.hero.scroll}</span>
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/30 transition-transform duration-500 ease-out group-hover:translate-y-1"
            >
              <ArrowDown size={15} strokeWidth={2} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
