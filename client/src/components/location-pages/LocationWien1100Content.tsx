import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowRight, MapPin, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL } from "@/lib/constants";

type Props = { locale: string };

export async function LocationWien1100Content({ locale }: Props) {
  const t = await getTranslations("locationWien1100");
  const tNav = await getTranslations("nav");
  const tLoc = await getTranslations("locations");

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-navy text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-gray-400 transition-colors">{tNav("home")}</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/locations" className="hover:text-gray-400 transition-colors">{tLoc("breadcrumb")}</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/locations/wien" className="hover:text-gray-400 transition-colors">{tLoc("stateNames.wien")}</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="font-medium">{t("breadcrumbDistrict")}</span>
          </nav>
          <div className="flex items-start gap-3">
            <MapPin size={24} className="text-accent shrink-0 mt-1" strokeWidth={2} />
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">{t("heroTitle")}</h1>
              <p className="mt-2 text-white/85 text-sm md:text-base max-w-2xl">{t("heroSub")}</p>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-white/90">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-accent shrink-0" strokeWidth={2} />
                {t(`heroPoint${i}`)}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors uppercase tracking-wider">
              {tLoc("ctaFreeQuote")} <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium">
              <MessageCircle size={18} strokeWidth={2} /> WhatsApp
            </a>
            <a href={`tel:${PHONE_LINK}`} className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium">
              <Phone size={18} strokeWidth={2} /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-14 md:space-y-18">
        {[1, 2, 3, 4].map((i) => (
          <section key={i}>
            <h2 className="text-xl md:text-2xl font-bold text-navy mb-4">{t(`section${i}Title`)}</h2>
            <p className="text-navy/85 leading-relaxed">{t(`section${i}Body`)}</p>
          </section>
        ))}

        <section className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-navy/10">
          <h2 className="text-lg md:text-xl font-bold text-navy mb-4">{t("whatWeCoverTitle")}</h2>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3 text-navy/85">
                <CheckCircle2 className="text-accent shrink-0 mt-0.5" size={20} strokeWidth={2} />
                {t(`whatPoint${i}`)}
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center py-8 px-6 rounded-2xl bg-navy/5 border border-navy/10">
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors uppercase tracking-wider">
            {tLoc("ctaFreeQuote")} <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-6">{t("processTitle")}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-xl bg-white border border-navy/10">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">{t("stepLabel")} {i}</span>
                <h3 className="mt-1 font-bold text-navy">{t(`step${i}Title`)}</h3>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed">{t(`step${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold text-navy mb-6">{t("faqTitle")}</h2>
          <dl className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="pb-6 border-b border-navy/10">
                <dt className="font-semibold text-navy mb-1">{t(`faq${i}Q`)}</dt>
                <dd className="text-navy/80 text-sm md:text-base leading-relaxed">{t(`faq${i}A`)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-wrap gap-4">
          <Link href="/locations" className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline">← {tLoc("selectLocation")}</Link>
          <Link href="/#contact" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
            {tLoc("ctaFreeQuote")} <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </section>
      </article>
      <ContactSection />
    </div>
  );
}
