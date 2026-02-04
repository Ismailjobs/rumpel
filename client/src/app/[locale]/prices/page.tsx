import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, CheckCircle, Euro, FileText, Eye } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "at";
  return {
    title: isDe ? "Preise | objekträumung" : "Prices | objekträumung",
    description: isDe
      ? "Transparente Preisgestaltung, Festpreis mit Wertausgleich. Kostenlose Besichtigung, schriftliches Angebot. MA 48 Alternativen, Expresszuschläge."
      : "Transparent pricing, fixed price with value adjustment. Free inspection, written quote. MA 48 alternatives, express surcharges.",
  };
}

export default async function PricesPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("prices");
  const tNav = await getTranslations("nav");

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb + Header */}
      <header className="bg-navy text-white py-8 md:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              {tNav("home")}
            </Link>
            <ChevronRight size={16} className="shrink-0" />
            <span className="font-medium">{t("breadcrumb")}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {t("title")}
          </h1>
          <p className="mt-3 text-lg text-white/85 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-12 md:space-y-16">
        {/* Intro */}
        <section>
          <p className="text-navy/85 text-lg leading-relaxed">
            {t("intro")}
          </p>
        </section>

        {/* How we calculate */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">{t("howTitle")}</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Eye className="text-accent" size={20} strokeWidth={2} />
              </span>
              <p className="text-navy/85 leading-relaxed pt-1">{t("step1")}</p>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Euro className="text-accent" size={20} strokeWidth={2} />
              </span>
              <p className="text-navy/85 leading-relaxed pt-1">{t("step2")}</p>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <FileText className="text-accent" size={20} strokeWidth={2} />
              </span>
              <p className="text-navy/85 leading-relaxed pt-1">{t("step3")}</p>
            </li>
          </ul>
        </section>

        {/* Value examples */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">{t("examplesTitle")}</h2>
          <ul className="space-y-3 mb-4">
            <li className="flex gap-3 items-start">
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <span className="text-navy/85">{t("example1")}</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <span className="text-navy/85">{t("example2")}</span>
            </li>
          </ul>
          <p className="text-navy/80 leading-relaxed">{t("examplesNote")}</p>
        </section>

        {/* Free clearance */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-4">{t("freeTitle")}</h2>
          <p className="text-navy/85 leading-relaxed">{t("freeBody")}</p>
        </section>

        {/* MA 48 vs Full-Service */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">{t("ma48Title")}</h2>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm mt-0.5">1</span>
              <p className="text-navy/85 leading-relaxed">{t("ma48Point1")}</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm mt-0.5">2</span>
              <p className="text-navy/85 leading-relaxed">{t("ma48Point2")}</p>
            </li>
          </ul>
        </section>

        {/* Express & Regional */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-4">{t("expressTitle")}</h2>
          <p className="text-navy/85 leading-relaxed mb-6">{t("expressBody")}</p>
          <h3 className="text-lg font-semibold text-navy mb-3">{t("regionalTitle")}</h3>
          <ul className="space-y-2 text-navy/85">
            <li>• {t("vienna")}</li>
            <li>• {t("lowerAustria")}</li>
            <li>• {t("burgenland")}</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-navy/5 rounded-2xl p-6 md:p-8 text-center border border-navy/10">
          <h2 className="text-xl md:text-2xl font-bold text-navy">{t("ctaTitle")}</h2>
          <p className="mt-3 text-navy/75">{t("ctaSubtitle")}</p>
          <Link
            href="/#contact"
            className="inline-block mt-6 bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-accent/20"
          >
            {t("ctaButton")}
          </Link>
        </section>
      </article>

      <ContactSection />
    </div>
  );
}
