import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { ChevronRight, ArrowRight, MapPin, Phone } from "lucide-react";
import { LocationsSearch } from "@/components/LocationsSearch";
import { STATE_KEYS, getLocationsByState, getLocationBySlug, MOST_SEARCHED_SLUGS } from "@/lib/locationsData";
import type { StateKey } from "@/lib/locationsData";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/constants";

// Locations geçici kapalı – ileride tekrar açılacak
const LOCATIONS_ENABLED = false;

// Build sırasında redirect() headers kullandığı için static prerender atlanıyor.
export const dynamic = "force-dynamic";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "de";
  return {
    title: isDe ? "Standorte | objekträumung" : "Locations | objekträumung",
    description: isDe
      ? "Wien, Niederösterreich, Burgenland, Steiermark, Kärnten, Oberösterreich, Salzburg. Festpreis-Entrümpelung in ganz Österreich."
      : "Vienna, Lower Austria, Burgenland, Styria, Carinthia, Upper Austria, Salzburg. Fixed-price clearance across Austria.",
  };
}

export default async function LocationsPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  if (!LOCATIONS_ENABLED) redirect("/");
  const t = await getTranslations("locations");
  const tNav = await getTranslations("nav");
  const locale = params.locale as "de" | "en";
  const stateNames = t.raw("stateNames") as Record<string, string>;

  const mostSearched = MOST_SEARCHED_SLUGS.map((slug) => getLocationBySlug(slug)).filter(Boolean) as NonNullable<ReturnType<typeof getLocationBySlug>>[];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-navy text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              {tNav("home")}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span>{t("breadcrumb")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t("pageTitle")}
          </h1>
          <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
            {t("intro")}
          </p>
          <p className="mt-3 text-white/80 text-sm">
            {t("introVienna")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors uppercase tracking-wider"
            >
              {t("ctaFreeQuote")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href={`tel:${PHONE_LINK}`}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
            >
              <Phone size={18} strokeWidth={2} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="px-4 sm:px-6 py-10 md:py-12 bg-slate-50 border-b border-navy/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/60 mb-4 text-center">
            {t("search")}
          </p>
          <LocationsSearch locale={locale} stateNames={stateNames} />
          <p className="mt-4 text-center text-sm text-navy/60">
            {t("selectLocation")}
          </p>
          <p className="mt-1 text-center text-sm text-navy/50 max-w-xl mx-auto">
            {t("selectLocationSub")}
          </p>
        </div>
      </section>

      {/* Most searched */}
      <section className="px-4 sm:px-6 py-10 md:py-12 border-b border-navy/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">
            {t("mostSearchedTitle")}
          </h2>
          <p className="text-navy/70 text-sm md:text-base mb-6 max-w-2xl">
            {t("mostSearchedDesc")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mostSearched.map((loc) => {
              const name = locale === "de" ? loc.nameDe : loc.nameEn;
              const desc = locale === "de" ? loc.shortDescDe : loc.shortDescEn;
              return (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-navy/10 hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <MapPin size={20} className="text-accent shrink-0 mt-0.5" strokeWidth={2} />
                  <div className="min-w-0">
                    <span className="font-semibold text-navy group-hover:text-accent transition-colors block truncate">
                      {name}
                    </span>
                    {desc && (
                      <span className="text-sm text-navy/60 block truncate">{desc}</span>
                    )}
                  </div>
                  <ArrowRight size={16} className="text-navy/40 group-hover:text-accent shrink-0 mt-0.5" strokeWidth={2} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Region cards by state */}
      <section className="px-4 sm:px-6 py-10 md:py-14">
        <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/60">
            {t("selectState")}
          </h2>

          {STATE_KEYS.map((stateKey) => {
            const locations = getLocationsByState(stateKey);
            const stateName = stateNames[stateKey] ?? stateKey;
            const stateIntro = t(`stateIntros.${stateKey}` as any);
            const stateSlug = locations.find((l) => l.slug === stateKey)?.slug ?? locations[0]?.slug;

            return (
              <div key={stateKey} className="border border-navy/10 rounded-2xl overflow-hidden bg-white shadow-sm">
                <div className="p-5 md:p-6 bg-slate-50/80 border-b border-navy/10">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-navy">
                        {stateName}
                      </h3>
                      <p className="mt-1 text-sm text-navy/70 max-w-2xl">
                        {stateIntro}
                      </p>
                    </div>
                    <Link
                      href={`/locations/${stateSlug}`}
                      className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline shrink-0"
                    >
                      {t("openStatePage")}
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
                <ul className="divide-y divide-navy/5">
                  {locations
                    .filter((loc) => loc.slug !== stateKey)
                    .slice(0, 6)
                    .map((loc) => {
                      const name = locale === "de" ? loc.nameDe : loc.nameEn;
                      const desc = locale === "de" ? loc.shortDescDe : loc.shortDescEn;
                      return (
                        <li key={loc.slug}>
                          <Link
                            href={`/locations/${loc.slug}`}
                            className="flex items-center gap-3 px-5 md:px-6 py-4 hover:bg-navy/5 transition-colors"
                          >
                            <MapPin size={18} className="text-accent shrink-0" strokeWidth={2} />
                            <span className="font-medium text-navy flex-1 min-w-0 truncate">
                              {name}
                            </span>
                            {desc && (
                              <span className="text-sm text-navy/50 hidden sm:block truncate max-w-[140px]">
                                {desc}
                              </span>
                            )}
                            <ArrowRight size={16} className="text-navy/30 shrink-0" strokeWidth={2} />
                          </Link>
                        </li>
                      );
                    })}
                </ul>
                {locations.filter((l) => l.slug !== stateKey).length > 6 && (
                  <div className="px-5 md:px-6 py-3 bg-slate-50/50 border-t border-navy/5">
                    <Link
                      href={`/locations/${stateSlug}`}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {t("moreLocations", { n: locations.filter((l) => l.slug !== stateKey).length - 6 })}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
