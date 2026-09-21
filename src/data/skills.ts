/**
 * Hard skills. These are product and method names — they are not translated.
 * The group headings are translated in `translations.ts`.
 */
export interface SkillGroup {
  id: "technical" | "methods" | "tools";
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "technical",
    items: [
      "Python",
      "Pandas",
      "Matplotlib",
      "DuckDB",
      "SQL",
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
      "WordPress",
      "Shopify",
    ],
  },
  {
    id: "methods",
    items: [
      "Data Analytics",
      "Customer Behavior",
      "Business Model Canvas",
      "Agile",
      "Scrum",
    ],
  },
  {
    id: "tools",
    items: ["Figma", "Glide"],
  },
];
