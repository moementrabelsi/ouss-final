"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useSectionReveal } from "@/animations/useSectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { projects } from "@/data/projects";
import { ProjectRow } from "./ProjectRow";
import { WebDevProject } from "./WebDevProject";
import { ProjectDetail } from "./ProjectDetail";

export function Projects() {
  const { t } = useI18n();
  const headerRef = useSectionReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="pt-28 md:pt-40">
      <div ref={headerRef} className="shell">
        <Rule />
        <div className="flex flex-wrap items-baseline justify-between gap-4 pt-8 md:pt-12">
          <SectionLabel tone="amber">{t.projects.label}</SectionLabel>
          <p className="max-w-[46ch] text-ink-soft sm:text-lg" data-reveal>
            {t.projects.lead}
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        {projects.map((meta, index) =>
          meta.visual === "webdev" ? (
            <WebDevProject
              key={meta.id}
              meta={meta}
              copy={t.projects.items[index]}
              onOpen={() => setOpenIndex(index)}
            />
          ) : (
            <ProjectRow
              key={meta.id}
              meta={meta}
              copy={t.projects.items[index]}
              flip={index % 2 === 1}
              onOpen={() => setOpenIndex(index)}
            />
          ),
        )}
      </div>

      <ProjectDetail index={openIndex} onClose={() => setOpenIndex(null)} />
    </section>
  );
}
