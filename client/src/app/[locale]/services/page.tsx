import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_KEYWORDS_DE, DEFAULT_KEYWORDS_EN } from "@/lib/seo-keywords";
import { Services } from "@/components/Services";
import { LeistungenExtras } from "@/components/LeistungenExtras";
import { ServicesPageGallery } from "@/components/ServicesPageGallery";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "at";
  return buildMetadata({
    title: isDe ? "Leistungen | objekträumung" : "Services | objekträumung",
    description: isDe
      ? "Haushaltsauflösung, Wohnungsräumung, Keller- und Dachbodenräumung, Sperrmüllabholung, Büroauflösung. Fixpreis mit Wertausgleich, kostenlose Besichtigung."
      : "Household clearance, apartment clearance, cellar & attic clearance, bulky waste, office clearance. Fixed price with value balancing, free inspection.",
    keywords: isDe ? DEFAULT_KEYWORDS_DE : DEFAULT_KEYWORDS_EN,
    canonicalPath: "/services",
    locale: locale as "at" | "en",
  });
}

export default async function ServicesPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const tNav = await getTranslations("nav");

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="font-medium hover:text-gray-700 hover:underline">
            {tNav("home")}
          </Link>
          <ChevronRight size={16} className="shrink-0" />
          <span className="font-medium" aria-current="page">
            {tNav("services")}
          </span>
        </nav>
      </div>
      <Services variant="page" />
      <LeistungenExtras />
    </div>
  );
}
