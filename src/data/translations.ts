/**
 * Complete German + English content.
 *
 * `de` is the source of truth for the shape; `en` must match it exactly,
 * which TypeScript enforces through `Record<Lang, Dict>` below.
 * Components never contain user-facing prose — it all lives here.
 */
export type Lang = "de" | "en";

const de = {
  meta: {
    title: "Oussema Lammouchi | Digital Innovation & Business",
    description:
      "Portfolio von Oussema Lammouchi, Student der Digital Innovation & Business mit Fokus auf Data Analytics, digitale Geschäftsmodelle, Marketing und Webentwicklung.",
  },

  nav: {
    about: "Über mich",
    projects: "Projekte",
    experience: "Erfahrung",
    skills: "Fähigkeiten",
    contact: "Kontakt",
    menu: "Menü öffnen",
    close: "Menü schließen",
    languageLabel: "Sprache",
    toGerman: "Auf Deutsch wechseln",
    toEnglish: "Auf Englisch wechseln",
    skipToContent: "Zum Inhalt springen",
  },

  hero: {
    status: "Offen für Praktika & Werkstudentenstellen",
    firstName: "Oussema",
    lastName: "Lammouchi",
    discipline: "Digital Innovation & Business",
    /** The one-line description under the name. */
    tagline:
      "Student, der Daten, Technologie und Business verbindet — und digitale Ideen in konkrete Produkte übersetzt.",
    intro:
      "Schwerpunkte: Data Analytics, digitale Geschäftsmodelle, Marketing und Webentwicklung. Studium an der FH Aachen.",
    contactLead: "Kontakt",
    location: "Ansässig in Aachen, Deutschland",
    scroll: "Scrollen",
    fieldCaption: "Daten · Technologie · Business",
  },

  about: {
    label: "01 / Über mich",
    statement: "Zwischen Technologie, Daten und Business.",
    body: [
      "Ich studiere Digital Innovation & Business an der FH Aachen und beschäftige mich mit Data Analytics, digitalen Geschäftsmodellen, Marketing und der Entwicklung digitaler Produkte.",
      "Mich interessiert der Punkt, an dem technische Umsetzung auf eine betriebswirtschaftliche Frage trifft: Wie wird aus einem Datensatz eine Entscheidung, aus einem Prototyp ein Produkt und aus einer Idee ein Geschäftsmodell?",
      "Parallel zum Studium arbeite ich seit Jahren im direkten Kundenkontakt. Das prägt, wie ich digitale Produkte denke — vom tatsächlichen Verhalten der Nutzerinnen und Nutzer her, nicht vom Feature.",
    ],
    currentlyLabel: "Aktuell",
    currently: [
      { k: "Studium", v: "Digital Innovation & Business" },
      { k: "Hochschule", v: "FH Aachen" },
      { k: "Standort", v: "Aachen, Deutschland" },
    ],
  },

  projects: {
    label: "02 / Ausgewählte Arbeiten",
    lead: "Vier Arbeiten an der Schnittstelle von Produkt, Daten und Markt.",
    viewCase: "Projekt ansehen",
    closeCase: "Schließen",
    cursorView: "Ansehen",
    cursorOpen: "Öffnen",
    roleLabel: "Rolle",
    stackLabel: "Stack",
    focusLabel: "Schwerpunkte",
    projectLabel: "Projekt",
    items: [
      {
        title: "Smartini",
        subtitle: "Financial Management App",
        description:
          "Konzeption und Entwicklung einer webbasierten Finanz-App mit Transaktionsverwaltung und Budget-Tracking. Das Projekt verbindet technische Umsetzung mit betriebswirtschaftlichen Anforderungen.",
        role: "Konzept & Umsetzung",
        contributions: [
          "Informationsarchitektur und Nutzerführung",
          "Transaktionsverwaltung",
          "Budget-Tracking und Auswertung",
          "Deployment über Vercel",
        ],
      },
      {
        title: "Data Analytics",
        subtitle: "Explorative Datenanalyse",
        description:
          "Explorative Datenanalyse und Datenaufbereitung mit Pandas, Matplotlib und DuckDB zur Ableitung relevanter Erkenntnisse und Unterstützung datenbasierter Entscheidungen.",
        role: "Datenanalyse",
        contributions: [
          "Datenbereinigung und Aufbereitung mit Pandas",
          "Abfragen und Aggregation mit DuckDB",
          "Visualisierung mit Matplotlib",
          "Ableitung datenbasierter Handlungsempfehlungen",
        ],
      },
      {
        title: "Web Development",
        subtitle: "Drei Web-Projekte",
        description:
          "Drei Projekte vom statischen One-Pager über eine dynamische Webanwendung bis zur CMS-basierten Website — jeweils von der Struktur bis zur Umsetzung.",
        role: "Konzept & Entwicklung",
        contributions: [
          "Nelson-Mandela-One-Page-Website",
          "Dynamische Webanwendung Mensa",
          "WordPress-Website",
          "Responsive Umsetzung und Seitenstruktur",
        ],
      },
      {
        title: "E-Commerce",
        subtitle: "Online-Shop & Social Media",
        description:
          "Aufbau und Veröffentlichung eines Online-Shops mit Fokus auf digitale Verkaufsprozesse, Customer Journey und Social-Media-Marketing.",
        role: "Aufbau & Marketing",
        contributions: [
          "Shop-Aufbau im CMS",
          "Digitale Verkaufsprozesse",
          "Customer Journey",
          "Kampagnen auf Instagram und Facebook",
        ],
      },
    ],
    web: {
      hint: "Horizontal scrollen",
      panels: [
        { title: "Nelson Mandela", kind: "One-Page Website", note: "HTML · CSS" },
        { title: "Mensa", kind: "Dynamische Webanwendung", note: "PHP · JavaScript" },
        { title: "WordPress", kind: "CMS-Website", note: "WordPress" },
      ],
    },
    commerce: {
      journeyLabel: "Customer Journey",
      journey: ["Aufmerksamkeit", "Interesse", "Vergleich", "Kauf", "Bindung"],
      campaignLabel: "Kampagne",
      channels: ["Instagram", "Facebook"],
    },
    analytics: {
      captionLabel: "Auswertung",
      caption: "Von Rohdaten zur Entscheidung",
      axis: ["Datensatz", "Erkenntnis"],
    },
    smartini: {
      balanceLabel: "Verfügbares Budget",
      budgetLabel: "Budget-Tracking",
      transactionsLabel: "Transaktionen",
    },
  },

  skills: {
    label: "03 / Fähigkeiten",
    lead: "Was ich mitbringe — zwischen Analyse, Gestaltung und Umsetzung.",
    capabilities: [
      "Datenanalyse",
      "Digital Business",
      "Marketing",
      "E-Commerce",
      "Webentwicklung",
      "Produktdenken",
      "Kundenverhalten",
      "UX / UI",
      "Digital Innovation",
    ],
    groups: {
      technical: "Technisch",
      methods: "Methoden",
      tools: "Tools",
    },
  },

  experience: {
    label: "04 / Erfahrung",
    lead: "Fünf Stationen im direkten Kunden- und Betriebsumfeld.",
    present: "Aktuell",
    dutiesLabel: "Aufgaben",
    transferLabel: "Übertragbare Stärken",
    transfer: [
      "Kundenverständnis",
      "Teamarbeit",
      "Kommunikation",
      "Anpassungsfähigkeit",
      "Operative Effizienz",
    ],
    items: [
      {
        role: "Aushilfskraft",
        summary: "Verkauf und Kundenbetreuung im Modeeinzelhandel.",
        duties: [
          "Kundenberatung",
          "Verkaufsunterstützung",
          "Online-Bestellungen",
          "Warenmanagement",
        ],
      },
      {
        role: "Mitarbeiter im Küchenbetrieb",
        summary: "Mitarbeit im Küchenbetrieb eines Großhandels für Frischeprodukte.",
        duties: [],
      },
      {
        role: "Mitarbeiter im Küchenbetrieb",
        summary: "Mitarbeit im Küchenbetrieb des Hotelbetriebs.",
        duties: [],
      },
      {
        role: "Mitarbeiter im Küchenbetrieb",
        summary: "Mitarbeit im Küchenbetrieb der Hotelgruppe.",
        duties: [],
      },
      {
        role: "Logistik & Transport",
        summary: "Logistik und Transport im Umzugsbetrieb.",
        duties: [],
      },
    ],
  },

  education: {
    label: "05 / Ausbildung",
    degree: "B.Sc.",
    program: "Digital Innovation & Business",
    school: "FH Aachen",
    period: "seit 09.2024",
    location: "Aachen, Deutschland",
    modulesLabel: "Relevante Module",
    modules: [
      "Data Analytics",
      "Digital Business Models",
      "Marketing digitaler Produkte",
      "Customer Discovery",
    ],
    note: "Studiengang an der Schnittstelle von Informatik, Betriebswirtschaft und Produktentwicklung.",
  },

  engagement: {
    label: "06 / Über das Studium hinaus",
    year: "2025",
    title: "Hinterland of Things Conference",
    description:
      "Teilnahme an der Hinterland of Things Conference 2025 mit Interviews mit Unternehmensvertretern und Anwendung von Erkenntnissen aus Business Model & Innovation.",
    tags: ["Konferenz", "Business", "Innovation", "Digitale Transformation"],
  },

  interests: {
    label: "07 / Interessen",
    items: [
      "Digital Marketing",
      "E-Commerce",
      "Web & App Design",
      "Datenanalyse",
      "Neue Technologien",
      "Innovation",
      "Kryptowährungen",
      "SEO",
    ],
  },

  languages: {
    label: "08 / Sprachen",
    lead: "Vier Sprachen, täglich im Einsatz.",
    items: [
      { name: "Deutsch", level: "C1" },
      { name: "Französisch", level: "Fließend" },
      { name: "Englisch", level: "Fließend" },
      { name: "Arabisch", level: "Muttersprache" },
    ],
  },

  contact: {
    label: "09 / Kontakt",
    headline: "Lass uns etwas Digitales bauen.",
    text: "Du hast eine Idee, ein Projekt oder möchtest dich austauschen?",
    emailLabel: "E-Mail",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    toTop: "Nach oben",
  },

  footer: {
    role: "Digital Innovation & Business",
    location: "Aachen, Deutschland",
    rights: "© 2026 Oussema Lammouchi",
    colophon: "Gestaltet und entwickelt in Aachen.",
  },
};

const en: typeof de = {
  meta: {
    title: "Oussema Lammouchi | Digital Innovation & Business",
    description:
      "Portfolio of Oussema Lammouchi, Digital Innovation & Business student focused on data analytics, digital business models, marketing and web development.",
  },

  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
    menu: "Open menu",
    close: "Close menu",
    languageLabel: "Language",
    toGerman: "Switch to German",
    toEnglish: "Switch to English",
    skipToContent: "Skip to content",
  },

  hero: {
    status: "Open to internships & working-student roles",
    firstName: "Oussema",
    lastName: "Lammouchi",
    discipline: "Digital Innovation & Business",
    /** The one-line description under the name. */
    tagline:
      "A student connecting data, technology and business — turning digital ideas into products people actually use.",
    intro:
      "Focused on data analytics, digital business models, marketing and web development. Studying at FH Aachen.",
    contactLead: "Get in touch",
    location: "Based in Aachen, Germany",
    scroll: "Scroll",
    fieldCaption: "Data · Technology · Business",
  },

  about: {
    label: "01 / About",
    statement: "Between technology, data and business.",
    body: [
      "I study Digital Innovation & Business at FH Aachen, focusing on data analytics, digital business models, marketing and digital product development.",
      "What interests me is the point where a technical implementation meets a business question: how does a dataset become a decision, a prototype become a product, and an idea become a business model?",
      "Alongside my studies I have spent years working directly with customers. That shapes how I think about digital products — starting from actual behaviour rather than from the feature list.",
    ],
    currentlyLabel: "Currently",
    currently: [
      { k: "Programme", v: "Digital Innovation & Business" },
      { k: "University", v: "FH Aachen" },
      { k: "Location", v: "Aachen, Germany" },
    ],
  },

  projects: {
    label: "02 / Selected Work",
    lead: "Four pieces of work at the intersection of product, data and market.",
    viewCase: "View project",
    closeCase: "Close",
    cursorView: "View",
    cursorOpen: "Open",
    roleLabel: "Role",
    stackLabel: "Stack",
    focusLabel: "Focus",
    projectLabel: "Project",
    items: [
      {
        title: "Smartini",
        subtitle: "Financial Management App",
        description:
          "Concept and development of a web-based financial management app with transaction management and budget tracking. The project combines technical implementation with business requirements.",
        role: "Concept & build",
        contributions: [
          "Information architecture and user flow",
          "Transaction management",
          "Budget tracking and reporting",
          "Deployment via Vercel",
        ],
      },
      {
        title: "Data Analytics",
        subtitle: "Exploratory data analysis",
        description:
          "Exploratory data analysis and data preparation using Pandas, Matplotlib and DuckDB to derive relevant insights and support data-driven decisions.",
        role: "Data analysis",
        contributions: [
          "Cleaning and preparation with Pandas",
          "Querying and aggregation with DuckDB",
          "Visualisation with Matplotlib",
          "Translating findings into recommendations",
        ],
      },
      {
        title: "Web Development",
        subtitle: "Three web projects",
        description:
          "Three projects ranging from a static one-pager to a dynamic web application and a CMS-based website — each from structure through to implementation.",
        role: "Concept & development",
        contributions: [
          "Nelson Mandela one-page website",
          "Mensa dynamic web application",
          "WordPress website",
          "Responsive implementation and page structure",
        ],
      },
      {
        title: "E-Commerce",
        subtitle: "Online store & social media",
        description:
          "Development and launch of an online store with a focus on digital sales processes, customer journey and social media marketing.",
        role: "Build & marketing",
        contributions: [
          "Store setup in the CMS",
          "Digital sales processes",
          "Customer journey",
          "Instagram and Facebook campaigns",
        ],
      },
    ],
    web: {
      hint: "Scroll horizontally",
      panels: [
        { title: "Nelson Mandela", kind: "One-page website", note: "HTML · CSS" },
        { title: "Mensa", kind: "Dynamic web application", note: "PHP · JavaScript" },
        { title: "WordPress", kind: "CMS website", note: "WordPress" },
      ],
    },
    commerce: {
      journeyLabel: "Customer journey",
      journey: ["Awareness", "Interest", "Comparison", "Purchase", "Retention"],
      campaignLabel: "Campaign",
      channels: ["Instagram", "Facebook"],
    },
    analytics: {
      captionLabel: "Analysis",
      caption: "From raw data to decision",
      axis: ["Dataset", "Insight"],
    },
    smartini: {
      balanceLabel: "Available budget",
      budgetLabel: "Budget tracking",
      transactionsLabel: "Transactions",
    },
  },

  skills: {
    label: "03 / Capabilities",
    lead: "What I bring — between analysis, design and implementation.",
    capabilities: [
      "Data Analytics",
      "Digital Business",
      "Marketing",
      "E-Commerce",
      "Web Development",
      "Product Thinking",
      "Customer Behavior",
      "UX / UI",
      "Digital Innovation",
    ],
    groups: {
      technical: "Technical",
      methods: "Methods",
      tools: "Tools",
    },
  },

  experience: {
    label: "04 / Experience",
    lead: "Five roles in customer-facing and operational environments.",
    present: "Present",
    dutiesLabel: "Responsibilities",
    transferLabel: "Transferable strengths",
    transfer: [
      "Customer understanding",
      "Teamwork",
      "Communication",
      "Adaptability",
      "Operational efficiency",
    ],
    items: [
      {
        role: "Sales assistant",
        summary: "Sales and customer service in fashion retail.",
        duties: [
          "Customer advice",
          "Sales support",
          "Online orders",
          "Merchandise management",
        ],
      },
      {
        role: "Kitchen operations",
        summary: "Kitchen operations at a wholesaler for fresh produce.",
        duties: [],
      },
      {
        role: "Kitchen operations",
        summary: "Kitchen operations within the hotel business.",
        duties: [],
      },
      {
        role: "Kitchen operations",
        summary: "Kitchen operations within the hotel group.",
        duties: [],
      },
      {
        role: "Logistics & transport",
        summary: "Logistics and transport for a moving company.",
        duties: [],
      },
    ],
  },

  education: {
    label: "05 / Education",
    degree: "B.Sc.",
    program: "Digital Innovation & Business",
    school: "FH Aachen",
    period: "since 09.2024",
    location: "Aachen, Germany",
    modulesLabel: "Relevant modules",
    modules: [
      "Data Analytics",
      "Digital Business Models",
      "Marketing of Digital Products",
      "Customer Discovery",
    ],
    note: "A programme at the intersection of computer science, business administration and product development.",
  },

  engagement: {
    label: "06 / Beyond the Classroom",
    year: "2025",
    title: "Hinterland of Things Conference",
    description:
      "Participated in the Hinterland of Things Conference 2025, interviewing company representatives and applying insights from Business Model & Innovation.",
    tags: ["Conference", "Business", "Innovation", "Digital Transformation"],
  },

  interests: {
    label: "07 / Interests",
    items: [
      "Digital Marketing",
      "E-Commerce",
      "Web & App Design",
      "Data Analytics",
      "New Technologies",
      "Innovation",
      "Cryptocurrencies",
      "SEO",
    ],
  },

  languages: {
    label: "08 / Languages",
    lead: "Four languages, used daily.",
    items: [
      { name: "German", level: "C1" },
      { name: "French", level: "Fluent" },
      { name: "English", level: "Fluent" },
      { name: "Arabic", level: "Native" },
    ],
  },

  contact: {
    label: "09 / Contact",
    headline: "Let's build something digital.",
    text: "Have an idea, a project, or simply want to connect?",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    toTop: "Back to top",
  },

  footer: {
    role: "Digital Innovation & Business",
    location: "Aachen, Germany",
    rights: "© 2026 Oussema Lammouchi",
    colophon: "Designed and built in Aachen.",
  },
};

export type Dict = typeof de;

export const translations: Record<Lang, Dict> = { de, en };
