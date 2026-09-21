/**
 * Employment history — companies and locations are proper nouns and stay
 * identical in both languages. Job titles and duties live in `translations.ts`
 * and are matched by array position.
 */
export interface ExperienceMeta {
  id: string;
  company: string;
  location: string;
  /** true for the current position */
  current?: boolean;
}

export const experience: ExperienceMeta[] = [
  {
    id: "robert-ley",
    company: "Robert Ley Damen- und Herrenmoden GmbH & Co. KG",
    location: "Würselen",
    current: true,
  },
  {
    id: "frischeparadies",
    company: "FrischeParadies GmbH & Co. KG",
    location: "Düsseldorf",
  },
  {
    id: "tali-mercure",
    company: "Tali Hotel Operations GmbH · Mercure Düsseldorf City Nord",
    location: "Düsseldorf",
  },
  {
    id: "sol-melia",
    company: "Sol Meliá Deutschland GmbH",
    location: "Deutschland",
  },
  {
    id: "kickartz",
    company: "Kickartz-Umzüge",
    location: "Aachen",
  },
];
