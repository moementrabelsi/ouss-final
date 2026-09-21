"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";
import { site } from "@/data/site";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="shell pb-10 pt-24 md:pt-36">
      <span aria-hidden className="block h-px w-full bg-line-night" />

      <div className="grid grid-cols-12 gap-x-6 gap-y-6 pt-8">
        <p className="label col-span-12 text-paper md:col-span-4">{site.name.toUpperCase()}</p>
        <p className="label col-span-12 text-teal-lite md:col-span-4 md:text-center">
          {t.footer.role}
        </p>
        <p className="label col-span-12 text-paper/65 md:col-span-4 md:text-right">
          {t.footer.location}
        </p>
      </div>

      <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-paper/60">{t.footer.rights}</p>
          <p className="label mt-2 text-paper/40">{t.footer.colophon}</p>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="#top"
            className="label flex items-center gap-2 text-paper/70 transition-colors duration-300 hover:text-accent"
          >
            {t.contact.toTop}
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden className="rotate-[-45deg]" />
          </a>
          <LanguageSwitch className="text-paper" size="md" />
        </div>
      </div>
    </footer>
  );
}
