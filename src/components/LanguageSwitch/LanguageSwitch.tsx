"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  className?: string;
  /** Slightly larger hit area for the footer / mobile menu. */
  size?: "sm" | "md";
}

export function LanguageSwitch({ className, size = "sm" }: LanguageSwitchProps) {
  const { lang, setLang, t } = useI18n();

  const base =
    size === "sm"
      ? "label px-1 py-1 transition-colors duration-300"
      : "label text-[0.8125rem] px-1.5 py-1.5 transition-colors duration-300";

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={cn("flex items-center gap-1 select-none", className)}
    >
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-pressed={lang === "de"}
        aria-label={t.nav.toGerman}
        data-cursor-label={t.nav.toGerman}
        className={cn(
          base,
          lang === "de" ? "text-current" : "text-current/40 hover:text-current/70",
        )}
      >
        DE
      </button>
      <span aria-hidden className="text-current/25 text-xs">
        /
      </span>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label={t.nav.toEnglish}
        data-cursor-label={t.nav.toEnglish}
        className={cn(
          base,
          lang === "en" ? "text-current" : "text-current/40 hover:text-current/70",
        )}
      >
        EN
      </button>
    </div>
  );
}
