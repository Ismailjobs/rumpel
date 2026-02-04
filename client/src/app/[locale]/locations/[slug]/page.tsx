import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { ChevronRight, ArrowRight, MapPin } from "lucide-react";
import { getLocationBySlug, getAllSlugs, getLocationsByState } from "@/lib/locationsData";

// Locations geçici kapalı – ileride tekrar açılacak
const LOCATIONS_ENABLED = false;

// Build sırasında redirect() headers kullandığı için static prerender atlanıyor.
export const dynamic = "force-dynamic";

import { ContactSection } from "@/components/ContactSection";
import { LocationWien1010Content } from "@/components/location-pages/LocationWien1010Content";
import { LocationWien1020Content } from "@/components/location-pages/LocationWien1020Content";
import { LocationWien1030Content } from "@/components/location-pages/LocationWien1030Content";
import { LocationWien1040Content } from "@/components/location-pages/LocationWien1040Content";
import { LocationWien1050Content } from "@/components/location-pages/LocationWien1050Content";
import { LocationWien1060Content } from "@/components/location-pages/LocationWien1060Content";
import { LocationWien1070Content } from "@/components/location-pages/LocationWien1070Content";
import { LocationWien1080Content } from "@/components/location-pages/LocationWien1080Content";
import { LocationWien1090Content } from "@/components/location-pages/LocationWien1090Content";
import { LocationWien1100Content } from "@/components/location-pages/LocationWien1100Content";
import { LocationWien1110Content } from "@/components/location-pages/LocationWien1110Content";
import { LocationWien1120Content } from "@/components/location-pages/LocationWien1120Content";
import { LocationWien1130Content } from "@/components/location-pages/LocationWien1130Content";
import { LocationWien1140Content } from "@/components/location-pages/LocationWien1140Content";
import { LocationWien1150Content } from "@/components/location-pages/LocationWien1150Content";
import { LocationWien1160Content } from "@/components/location-pages/LocationWien1160Content";
import { LocationWien1170Content } from "@/components/location-pages/LocationWien1170Content";
import { LocationWien1180Content } from "@/components/location-pages/LocationWien1180Content";
import { LocationWien1190Content } from "@/components/location-pages/LocationWien1190Content";
import { LocationWien1200Content } from "@/components/location-pages/LocationWien1200Content";
import { LocationWien1210Content } from "@/components/location-pages/LocationWien1210Content";
import { LocationWien1220Content } from "@/components/location-pages/LocationWien1220Content";
import { LocationWien1230Content } from "@/components/location-pages/LocationWien1230Content";
import { LocationKlosterneuburgContent } from "@/components/location-pages/LocationKlosterneuburgContent";
import { LocationWienStateContent } from "@/components/location-pages/LocationWienStateContent";
import { routing } from "@/i18n/routing";

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = params;
  const loc = getLocationBySlug(slug);
  if (!loc) return { title: "Standorte | objekträumung" };
  const name = locale === "de" ? loc.nameDe : loc.nameEn;
  const isDe = locale === "de";
  return {
    title: `${name} | objekträumung`,
    description: isDe
      ? `Entrümpelung und Haushaltsauflösung in ${loc.nameDe}. Festpreis, Wertausgleich, kostenlose Besichtigung.`
      : `Clearance and household clearance in ${loc.nameEn}. Fixed price, value adjustment, free inspection.`,
  };
}

export default async function LocationDetailPage({ params }: Props) {
  const { locale, slug } = params;
  unstable_setRequestLocale(locale);
  if (!LOCATIONS_ENABLED) redirect("/");
  if (slug === "klosterneuburg") {
    redirect("/locations/niederoesterreich-klosterneuburg");
  }
  if (slug === "klosterneuburg-kahlenberg") {
    redirect("/locations/niederoesterreich-klosterneuburg");
  }
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  if (slug === "wien-1010") {
    return <LocationWien1010Content locale={locale} />;
  }
  if (slug === "wien-1020") {
    return <LocationWien1020Content locale={locale} />;
  }
  if (slug === "wien-1030") {
    return <LocationWien1030Content locale={locale} />;
  }
  if (slug === "wien-1040") {
    return <LocationWien1040Content locale={locale} />;
  }
  if (slug === "wien-1050") {
    return <LocationWien1050Content locale={locale} />;
  }
  if (slug === "wien-1060") {
    return <LocationWien1060Content locale={locale} />;
  }
  if (slug === "wien-1070") {
    return <LocationWien1070Content locale={locale} />;
  }
  if (slug === "wien-1080") {
    return <LocationWien1080Content locale={locale} />;
  }
  if (slug === "wien-1090") {
    return <LocationWien1090Content locale={locale} />;
  }
  if (slug === "wien-1100") {
    return <LocationWien1100Content locale={locale} />;
  }
  if (slug === "wien-1110") {
    return <LocationWien1110Content locale={locale} />;
  }
  if (slug === "wien-1120") {
    return <LocationWien1120Content locale={locale} />;
  }
  if (slug === "wien-1130") {
    return <LocationWien1130Content locale={locale} />;
  }
  if (slug === "wien-1140") {
    return <LocationWien1140Content locale={locale} />;
  }
  if (slug === "wien-1150") {
    return <LocationWien1150Content locale={locale} />;
  }
  if (slug === "wien-1160") {
    return <LocationWien1160Content locale={locale} />;
  }
  if (slug === "wien-1170") {
    return <LocationWien1170Content locale={locale} />;
  }
  if (slug === "wien-1180") {
    return <LocationWien1180Content locale={locale} />;
  }
  if (slug === "wien-1190") {
    return <LocationWien1190Content locale={locale} />;
  }
  if (slug === "wien-1200") {
    return <LocationWien1200Content locale={locale} />;
  }
  if (slug === "wien-1210") {
    return <LocationWien1210Content locale={locale} />;
  }
  if (slug === "wien-1220") {
    return <LocationWien1220Content locale={locale} />;
  }
  if (slug === "wien-1230") {
    return <LocationWien1230Content locale={locale} />;
  }
  if (slug === "niederoesterreich-klosterneuburg") {
    return <LocationKlosterneuburgContent locale={locale} />;
  }
  if (slug === "wien") {
    return <LocationWienStateContent locale={locale} />;
  }

  const t = await getTranslations("locations");
  const tNav = await getTranslations("nav");
  const stateNames = t.raw("stateNames") as Record<string, string>;
  const stateName = stateNames[loc.stateKey] ?? loc.stateKey;
  const name = locale === "de" ? loc.nameDe : loc.nameEn;
  const body = t("detailBody", { region: name });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-navy text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              {tNav("home")}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/locations" className="hover:text-gray-400 transition-colors">
              {t("breadcrumb")}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            {slug === loc.stateKey ? (
              <span className="font-medium">{stateName}</span>
            ) : (
              <>
                <Link href={`/locations/${loc.stateKey}`} className="hover:text-gray-400 transition-colors">
                  {stateName}
                </Link>
                <ChevronRight size={14} className="shrink-0" />
                <span className="font-medium truncate max-w-[200px]">{name}</span>
              </>
            )}
          </nav>
          <div className="flex items-start gap-3">
            <MapPin size={24} className="text-accent shrink-0 mt-1" strokeWidth={2} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {name}
              </h1>
              <p className="mt-1 text-white/80 text-sm">
                {stateName}
              </p>
            </div>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 mt-6 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors uppercase tracking-wider"
          >
            {t("ctaFreeQuote")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="text-navy/85 text-lg leading-relaxed">
          {body}
        </p>
        {slug === loc.stateKey && (() => {
          const subLocations = getLocationsByState(loc.stateKey).filter((l) => l.slug !== slug);
          const nameKey = locale === "de" ? "nameDe" : "nameEn";
          const descKey = locale === "de" ? "shortDescDe" : "shortDescEn";
          if (subLocations.length === 0) return null;
          return (
            <section className="mt-10">
              <h2 className="text-lg md:text-xl font-bold text-navy mb-4">
                {t("subRegionsTitle")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {subLocations.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/locations/${l.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-accent/15 text-navy hover:text-accent font-medium text-sm transition-colors"
                    >
                      <MapPin size={14} className="shrink-0" strokeWidth={2} />
                      {l[descKey] ?? l[nameKey]}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
          >
            ← {t("selectLocation")}
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            {t("ctaFreeQuote")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </article>

      <ContactSection />
    </div>
  );
}
