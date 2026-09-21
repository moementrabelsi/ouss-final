"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";
import { translations, type Dict, type Lang } from "@/data/translations";

const STORAGE_KEY = "ol-lang";
const DEFAULT_LANG: Lang = "de";

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);
  const isFirstRun = useRef(true);

  // Restore the stored preference after hydration so SSR markup stays stable.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "de" || stored === "en") setLangState(stored);
    } catch {
      /* storage unavailable — keep the default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const main = document.getElementById("main");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (main && !reduced) {
      gsap.fromTo(
        main,
        { opacity: 0.25 },
        { opacity: 1, duration: 0.55, ease: "power2.out", overwrite: true },
      );
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <LanguageProvider>");
  return ctx;
}
