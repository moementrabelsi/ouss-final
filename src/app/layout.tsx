import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { site } from "@/data/site";
import { translations } from "@/data/translations";

/* The fonts were declared but never loaded, so both the display and the body
   face fell back to the system UI font. Loading them properly is half of the
   readability fix. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f5",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: translations.de.meta.title,
    template: `%s | ${site.name}`,
  },
  description: translations.de.meta.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Oussema Lammouchi",
    "Digital Innovation & Business",
    "FH Aachen",
    "Data Analytics",
    "Digital Business Models",
    "Digital Marketing",
    "E-Commerce",
    "Web Development",
    "Portfolio",
    "Aachen",
  ],
  alternates: {
    canonical: "/",
    languages: {
      de: "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: translations.de.meta.title,
    description: translations.de.meta.description,
    locale: "de_DE",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: translations.de.meta.title,
    description: translations.de.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "portfolio",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Digital Innovation & Business Student",
  description: translations.en.meta.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Aachen",
    addressCountry: "DE",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.university,
  },
  knowsLanguage: ["de", "fr", "en", "ar"],
  knowsAbout: [
    "Data Analytics",
    "Digital Business Models",
    "Digital Marketing",
    "E-Commerce",
    "Web Development",
    "Product Design",
  ],
  sameAs: [site.linkedin, site.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <noscript>
          <style>{`[data-reveal],[data-word],[data-line]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
