import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "de";
  return {
    title: isDe ? "Über uns | objekträumung" : "About us | objekträumung",
    description: isDe
      ? "Rümpel Räumung: Team & Mission. Geprüfte Teams, Fixpreis, Wertausgleich. Zertifizierungen, MA 48-Partner."
      : "Rümpel Räumung: Team & Mission. Certified teams, fixed price, value adjustment. Certifications, MA 48 partner.",
  };
}

export default async function AboutPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("about");
  const tNav = await getTranslations("nav");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero – minimal, professional */}
      <header className="relative bg-navy text-white pt-10 pb-14 md:pt-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,107,0,0.06)_100%)]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              {tNav("home")}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span>{t("breadcrumb")}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            {t("title")}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-[1.15] max-w-2xl">
            {t("intro")}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors uppercase tracking-wider"
            >
              {t("ctaContact")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto">
        {/* Mission – editorial block */}
        <section className="px-4 sm:px-6 py-14 md:py-20 border-b border-navy/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
            {t("missionTitle")}
          </p>
          <p className="text-navy text-lg md:text-xl leading-relaxed max-w-3xl">
            {t("missionText")}
          </p>
        </section>

        {/* Values – clean list with left accent */}
        <section className="px-4 sm:px-6 py-14 md:py-20 bg-slate-50/80">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/60 mb-10">
            {t("valuesTitle")}
          </p>
          <div className="space-y-0">
            <div className="flex gap-6 md:gap-10 py-6 border-b border-navy/10 first:pt-0">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">1</span>
              <div>
                <h3 className="font-bold text-navy text-base md:text-lg">{t("value1Title")}</h3>
                <p className="mt-1 text-navy/70 text-sm md:text-base leading-relaxed">{t("value1Desc")}</p>
              </div>
            </div>
            <div className="flex gap-6 md:gap-10 py-6 border-b border-navy/10">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">2</span>
              <div>
                <h3 className="font-bold text-navy text-base md:text-lg">{t("value2Title")}</h3>
                <p className="mt-1 text-navy/70 text-sm md:text-base leading-relaxed">{t("value2Desc")}</p>
              </div>
            </div>
            <div className="flex gap-6 md:gap-10 py-6 border-b border-navy/10 last:border-0">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">3</span>
              <div>
                <h3 className="font-bold text-navy text-base md:text-lg">{t("value3Title")}</h3>
                <p className="mt-1 text-navy/70 text-sm md:text-base leading-relaxed">{t("value3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team – two-column on desktop */}
        <section className="px-4 sm:px-6 py-14 md:py-20 border-b border-navy/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/60 mb-6">
            {t("teamTitle")}
          </p>
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <p className="text-navy text-base md:text-lg leading-relaxed">
                {t("teamIntro")}
              </p>
            </div>
            <div className="md:col-span-3">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
                  <span className="text-navy/85 text-sm md:text-base leading-relaxed">{t("teamPoint1")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
                  <span className="text-navy/85 text-sm md:text-base leading-relaxed">{t("teamPoint2")}</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
                  <span className="text-navy/85 text-sm md:text-base leading-relaxed">{t("teamPoint3")}</span>
                </li>
              </ul>
              <p className="mt-6 text-navy/80 text-sm md:text-base leading-relaxed">
                {t("teamOutro")}
              </p>
            </div>
          </div>
        </section>

        {/* Certifications – minimal list */}
        <section className="px-4 sm:px-6 py-14 md:py-20 bg-navy text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-8">
            {t("certsTitle")}
          </p>
          <ul className="space-y-5 max-w-2xl">
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
              <span className="text-white/95 text-sm md:text-base leading-relaxed">{t("cert1")}</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
              <span className="text-white/95 text-sm md:text-base leading-relaxed">{t("cert2")}</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2" aria-hidden="true" />
              <span className="text-white/95 text-sm md:text-base leading-relaxed">{t("cert3")}</span>
            </li>
          </ul>
        </section>

        {/* CTA – full-width strip */}
        <section className="px-4 sm:px-6 py-14 md:py-16 text-center bg-slate-100">
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            {t("ctaTitle")}
          </h2>
          <p className="mt-2 text-navy/70 max-w-lg mx-auto text-sm md:text-base">
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 mt-6 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors uppercase tracking-wider"
          >
            {t("ctaContact")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </section>
      </article>

      <ContactSection />
    </div>
  );
}
