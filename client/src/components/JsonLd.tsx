import { SITE_URL, PHONE_CANONICAL, PHONE_CANONICAL_LINK, EMAIL, ADDRESS, WHATSAPP_NUMBER } from "@/lib/constants";

/** SameAs social / contact URLs for JSON-LD */
const SAME_AS = [
  `https://wa.me/${WHATSAPP_NUMBER}`,
  // Add when available: Facebook, LinkedIn, etc.
  // "https://www.facebook.com/objektraeumung",
  // "https://www.linkedin.com/company/objektraeumung",
];

function buildLocalBusinessSchema(locale: string) {
  const isDe = locale === "at";
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MovingCompany"],
    name: "Objekträumung",
    alternateName: "objekträumung",
    url: SITE_URL,
    description: isDe
      ? "Professionelle Räumung, Haushaltsauflösung, Wohnungsräumung, Entrümpelung und Sperrmüllabholung in Wien und Niederösterreich. Antiquitäten Ankauf & Wertanrechnung."
      : "Professional clearance, household clearance, apartment clearance, moving and bulky waste collection in Vienna and Lower Austria. Antique purchase & value credit.",
    telephone: PHONE_CANONICAL,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.split(",")[0]?.trim() ?? ADDRESS,
      addressLocality: "Wien",
      addressRegion: "Wien",
      postalCode: "1150",
      addressCountry: "AT",
    },
    areaServed: [
      { "@type": "City", name: "Wien", alternateName: "Vienna" },
      { "@type": "State", name: isDe ? "Niederösterreich" : "Lower Austria" },
      { "@type": "Country", name: isDe ? "Österreich" : "Austria" },
    ],
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: SAME_AS,
    potentialAction: {
      "@type": "CommunicateAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `tel:${PHONE_CANONICAL_LINK}`,
        actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
      },
      result: { "@type": "CommunicateAction" },
    },
  };
}

export function JsonLd({ locale }: { locale: string }) {
  const schema = buildLocalBusinessSchema(locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
