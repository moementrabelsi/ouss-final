/**
 * Structural project metadata. All prose lives in `translations.ts`
 * and is matched to these entries by array position.
 */
export type ProjectVisual = "smartini" | "analytics" | "webdev" | "commerce";

export interface ProjectMeta {
  id: string;
  /** Display number, e.g. "01" */
  number: string;
  /** Technology labels — proper nouns, identical in both languages. */
  tech: string[];
  visual: ProjectVisual;
  /**
   * Optional live URL. When set, the project row becomes a real link and
   * the custom cursor switches to "OPEN". Leave undefined to keep the
   * built-in case-study overlay.
   */
  href?: string;
  /**
   * Optional real screenshot placed in /public. When set it replaces the
   * generated visual and is served through next/image.
   * e.g. { src: "/projects/smartini.jpg", width: 1600, height: 1000 }
   */
  image?: { src: string; width: number; height: number };
}

export const projects: ProjectMeta[] = [
  {
    id: "smartini",
    number: "01",
    tech: ["Kiro", "Vercel"],
    visual: "smartini",
  },
  {
    id: "data-analytics",
    number: "02",
    tech: ["Python", "Pandas", "Matplotlib", "DuckDB", "Google Colab"],
    visual: "analytics",
  },
  {
    id: "web-development",
    number: "03",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "WordPress"],
    visual: "webdev",
  },
  {
    id: "e-commerce",
    number: "04",
    tech: ["CMS", "Shopify", "Social Media Marketing"],
    visual: "commerce",
  },
];
