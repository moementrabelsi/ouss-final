/**
 * Single source of truth for identity + contact details.
 *
 * TODO — replace the three placeholders below with the real values.
 * Nothing else in the codebase hardcodes them.
 */
export const site = {
  name: "Oussema Lammouchi",
  shortName: "Oussema Lammouchi",
  role: "Digital Innovation & Business",
  city: "Aachen",
  university: "FH Aachen",

  /** TODO: replace with the deployed domain (used for canonical URL, OG, sitemap). */
  url: "https://oussema-lammouchi.vercel.app",

  /** TODO: replace with the real address. */
  email: "oussema.lammouchi@example.com",
  /** TODO: replace with the real profile URL. */
  linkedin: "https://www.linkedin.com/in/example",
  /** TODO: replace with the real profile URL. */
  github: "https://github.com/example",
} as const;

export const navItems = [
  { id: "about", key: "about" },
  { id: "projects", key: "projects" },
  { id: "experience", key: "experience" },
  { id: "skills", key: "skills" },
  { id: "contact", key: "contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
