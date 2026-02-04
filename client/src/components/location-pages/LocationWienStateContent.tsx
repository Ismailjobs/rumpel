import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL } from "@/lib/constants";
import { WIEN_DISTRICT_SLUGS, getLocationBySlug, type LocationItem } from "@/lib/locationsData";

type Props = { locale: string };

export async function LocationWienStateContent({ locale }: Props) {
  const t = await getTranslations("locationWienState");
  const tNav = await getTranslations("nav");
  const tLoc = await getTranslations("locations");

  const districts = WIEN_DISTRICT_SLUGS.map((slug) => getLocationBySlug(slug)).filter((loc): loc is LocationItem => loc != null);
  const nameKey = locale === "de" ? "nameDe" : "nameEn";

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-navy text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              {tNav("home")}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="font-medium">{tLoc("breadcrumb")}</span>
            <ChevronRight size={14} className="shrink-0" />
            <span className="font-medium">{tLoc("stateNames.wien")}</span>
          </nav>
          <div className="flex items-start gap-3">
            <MapPin size={24} className="text-accent shrink-0 mt-1" strokeWidth={2} />
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="mt-2 text-white/85 text-sm md:text-base max-w-2xl">
                {t("heroSub")}
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors uppercase tracking-wider"
            >
              {tLoc("ctaFreeQuote")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
            >
              <MessageCircle size={18} strokeWidth={2} />
              WhatsApp
            </a>
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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-14 md:space-y-18">
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-4">
            {t("section1Title")}
          </h2>
          <p className="text-navy/85 leading-relaxed whitespace-pre-line">
            {t("section1Body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-4">
            {t("section2Title")}
          </h2>
          <p className="text-navy/85 leading-relaxed whitespace-pre-line">
            {t("section2Body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-4">
            {t("section3Title")}
          </h2>
          <p className="text-navy/85 leading-relaxed whitespace-pre-line">
            {t("section3Body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-4">
            {t("section4Title")}
          </h2>
          <p className="text-navy/85 leading-relaxed whitespace-pre-line">
            {t("section4Body")}
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-4">
            {t("section5Title")}
          </h2>
          <p className="text-navy/85 leading-relaxed whitespace-pre-line">
            {t("section5Body")}
          </p>
        </section>

        <section className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-navy/10">
          <h2 className="text-lg md:text-xl font-bold text-navy mb-2">
            {t("benefit1Title")}
          </h2>
          <p className="text-navy/80 text-sm mb-4">{t("benefit1Desc")}</p>
          <h2 className="text-lg md:text-xl font-bold text-navy mb-2">
            {t("benefit2Title")}
          </h2>
          <p className="text-navy/80 text-sm mb-4">{t("benefit2Desc")}</p>
          <h2 className="text-lg md:text-xl font-bold text-navy mb-2">
            {t("benefit3Title")}
          </h2>
          <p className="text-navy/80 text-sm">{t("benefit3Desc")}</p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">
            {t("districtsTitle")}
          </h2>
          <p className="text-navy/70 text-sm md:text-base mb-6">
            {t("districtsIntro")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {districts.map((loc) => {
              const plz = loc.slug.replace("wien-", "");
              return (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex flex-col p-4 rounded-xl bg-white border border-navy/10 hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {t("bezirkLabel", { plz })}
                  </span>
                  <span className="mt-1 font-semibold text-navy group-hover:text-accent transition-colors">
                    {loc[nameKey]}
                  </span>
                  {(locale === "de" ? loc.shortDescDe : loc.shortDescEn) && (
                    <span className="mt-2 text-sm text-navy/60 line-clamp-2">
                      {locale === "de" ? loc.shortDescDe : loc.shortDescEn}
                    </span>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:underline">
                    {t("moreInfo")}
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="flex flex-wrap gap-4">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
          >
            ← {tLoc("selectLocation")}
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            {tLoc("ctaFreeQuote")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </section>
      </article>

      <ContactSection />
    </div>
  );
}
