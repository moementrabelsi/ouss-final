"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitch } from "@/components/LanguageSwitch/LanguageSwitch";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { t } = useI18n();
  const barRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  /* Compact state ------------------------------------------------------ */
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top -72px",
      end: "bottom bottom",
      onToggle: (self) => setCompact(self.isActive),
    });
    return () => trigger.kill();
  }, { dependencies: [] });

  useGSAP(
    () => {
      if (!barRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = reduced ? 0 : 0.55;
      gsap.to(barRef.current, {
        paddingTop: compact ? 13 : 26,
        paddingBottom: compact ? 13 : 26,
        duration,
        ease: "power3.out",
      });
      if (ruleRef.current) {
        gsap.to(ruleRef.current, { scaleX: compact ? 1 : 0, duration, ease: "power3.inOut" });
      }
    },
    { dependencies: [compact] },
  );

  /* Mobile menu -------------------------------------------------------- */
  useGSAP(
    () => {
      const el = menuRef.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-menu-item]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (open) {
        gsap.set(el, { display: "block" });
        if (reduced) {
          gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(items, { yPercent: 0, opacity: 1 });
          return;
        }
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power4.inOut" },
        );
        gsap.fromTo(
          items,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.06, delay: 0.18 },
        );
        return;
      }

      gsap.to(el, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: reduced ? 0 : 0.5,
        ease: "power4.inOut",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
    },
    { dependencies: [open] },
  );

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:bg-brand focus:px-4 focus:py-3 focus:text-paper label"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-colors duration-500",
          compact ? "bg-paper/90 backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div ref={barRef} className="shell flex items-center justify-between" style={{ paddingTop: 26, paddingBottom: 26 }}>
          <a
            href="#top"
            className="label leading-none text-brand transition-opacity duration-300 hover:opacity-60"
            data-cursor-label={site.name}
          >
            {site.name.toUpperCase()}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="label link-line text-ink-soft transition-colors duration-300 hover:text-brand"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitch className="text-ink" />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="md:hidden -mr-1 p-1 text-ink"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.close : t.nav.menu}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        <span
          ref={ruleRef}
          aria-hidden
          className="block h-px w-full origin-left scale-x-0 bg-line"
        />
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="fixed inset-0 z-[99] hidden bg-paper md:hidden"
        style={{ display: "none", clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Primary mobile" className="flex flex-col">
            {navItems.map((item, index) => (
              <span key={item.id} className="overflow-hidden border-b border-line py-1">
                <a
                  data-menu-item
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-[clamp(2.25rem,11vw,3.75rem)] text-brand"
                >
                  <span className="numeral mr-4 align-super text-[0.3em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t.nav[item.key]}
                </a>
              </span>
            ))}
          </nav>
          <div className="flex items-end justify-between">
            <p className="label text-ink-faint">{t.footer.location}</p>
            <LanguageSwitch size="md" />
          </div>
        </div>
      </div>
    </>
  );
}
