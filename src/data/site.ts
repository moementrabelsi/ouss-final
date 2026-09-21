/**
 * Single source of truth for identity + contact details.
 *
 * TODO — replace the three contact placeholders below with the real values.
 * Nothing else in the codebase hardcodes them.
 */

/**
 * Canonical origin, resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL   — set this once you have a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected automatically by Vercel
 *   3. localhost              — local development
 *
 * This means the first deploy produces correct canonical/OG/sitemap URLs
 * with no code change at all.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const site = {
  name: "Oussema Lammouchi",
  shortName: "Oussema Lammouchi",
  role: "Digital Innovation & Business",
  city: "Aachen",
  university: "FH Aachen",

  /** Resolved from the environment — see resolveSiteUrl above. */
  url: resolveSiteUrl(),

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
