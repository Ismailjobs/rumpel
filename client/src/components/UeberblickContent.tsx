import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  BarChart3,
  MapPin,
  Trash2,
  ListOrdered,
  Wallet,
  Scale,
  HelpCircle,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { PHONE_DISPLAY, PHONE_LINK, WHATSAPP_URL, EMAIL } from "@/lib/constants";

/** Shared article content for /ueberblick and /services/haushaltsaufloesung-ueberblick */
export async function UeberblickContent() {
  const t = await getTranslations("ueberblick");

  const costRows = [
    { obj: t("costRow1"), size: t("costRow1Size"), typical: t("costRow1Typical"), val: t("costRow1Valuation"), final: t("costRow1Final") },
    { obj: t("costRow2"), size: t("costRow2Size"), typical: t("costRow2Typical"), val: t("costRow2Valuation"), final: t("costRow2Final") },
    { obj: t("costRow3"), size: t("costRow3Size"), typical: t("costRow3Typical"), val: t("costRow3Valuation"), final: t("costRow3Final") },
    { obj: t("costRow4"), size: t("costRow4Size"), typical: t("costRow4Typical"), val: t("costRow4Valuation"), final: t("costRow4Final") },
    { obj: t("costRow5"), size: t("costRow5Size"), typical: t("costRow5Typical"), val: t("costRow5Valuation"), final: t("costRow5Final") },
  ];

  const ma48Rows = [
    { district: t("ma48Row1District"), address: t("ma48Row1Address"), features: t("ma48Row1Features") },
    { district: t("ma48Row2District"), address: t("ma48Row2Address"), features: t("ma48Row2Features") },
    { district: t("ma48Row3District"), address: t("ma48Row3Address"), features: t("ma48Row3Features") },
    { district: t("ma48Row4District"), address: t("ma48Row4Address"), features: t("ma48Row4Features") },
    { district: t("ma48Row5District"), address: t("ma48Row5Address"), features: t("ma48Row5Features") },
    { district: t("ma48Row6District"), address: t("ma48Row6Address"), features: t("ma48Row6Features") },
  ];

  const faqItems = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  return (
    <div className="space-y-14 md:space-y-16">
      <section>
        <h2 className="text-2xl font-bold text-navy mb-4">{t("introTitle")}</h2>
        <p className="text-navy/90 text-lg leading-relaxed">{t("intro")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
          <BarChart3 className="text-accent" size={28} />
          {t("costTitle")}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="bg-navy/5 border-b border-navy/10">
                <th className="px-4 py-3 font-semibold text-navy">{t("costTableObjectType")}</th>
                <th className="px-4 py-3 font-semibold text-navy">{t("costTableSize")}</th>
                <th className="px-4 py-3 font-semibold text-navy">{t("costTableTypical")}</th>
                <th className="px-4 py-3 font-semibold text-navy">{t("costTableValuation")}</th>
                <th className="px-4 py-3 font-semibold text-navy">{t("costTableFinal")}</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((row, i) => (
                <tr key={i} className="border-b border-navy/5 hover:bg-navy/[0.03]">
                  <td className="px-4 py-3 text-navy/90">{row.obj}</td>
                  <td className="px-4 py-3 text-navy/80">{row.size}</td>
                  <td className="px-4 py-3 text-navy/80">{row.typical}</td>
                  <td className="px-4 py-3 text-navy/80">{row.val}</td>
                  <td className="px-4 py-3 font-medium text-accent">{row.final}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 p-4 bg-accent/10 rounded-xl text-navy/90 border border-accent/20">
          <strong className="text-accent">{t("costTipLabel")}</strong> {t("costTip")}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
          <MapPin className="text-accent" size={28} />
          {t("districtsTitle")}
        </h2>
        <p className="text-navy/85 mb-6">{t("districtsIntro")}</p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-navy/10 bg-white shadow-sm">
            <h3 className="font-semibold text-navy mb-2">{t("districtsCenter")}</h3>
            <p className="text-sm text-navy/80"><strong>{t("districtsCenterFeature")}</strong></p>
            <p className="text-sm text-navy/70 mt-1">{t("districtsCenterAdvantage")}</p>
            <p className="text-sm text-navy/60 mt-1">{t("districtsCenterDifficulty")}</p>
          </div>
          <div className="p-5 rounded-xl border border-navy/10 bg-white shadow-sm">
            <h3 className="font-semibold text-navy mb-2">{t("districtsSlope")}</h3>
            <p className="text-sm text-navy/80"><strong>{t("districtsSlopeFeature")}</strong></p>
            <p className="text-sm text-navy/70 mt-1">{t("districtsSlopeAdvantage")}</p>
            <p className="text-sm text-navy/60 mt-1">{t("districtsSlopeDifficulty")}</p>
          </div>
          <div className="p-5 rounded-xl border border-navy/10 bg-white shadow-sm">
            <h3 className="font-semibold text-navy mb-2">{t("districtsSuburb")}</h3>
            <p className="text-sm text-navy/80"><strong>{t("districtsSuburbFeature")}</strong></p>
            <p className="text-sm text-navy/70 mt-1">{t("districtsSuburbAdvantage")}</p>
            <p className="text-sm text-navy/60 mt-1">{t("districtsSuburbDifficulty")}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
          <Trash2 className="text-accent" size={28} />
          {t("ma48Title")}
        </h2>
        <p className="text-navy/85 mb-6">{t("ma48Intro")}</p>
        <div className="overflow-x-auto rounded-xl border border-navy/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="bg-navy/5 border-b border-navy/10">
                <th className="px-4 py-3 font-semibold text-navy">{t("ma48District")}</th>
                <th className="px-4 py-3 font-semibold text-navy">{t("ma48Address")}</th>
                <th className="px-4 py-3 font-semibold text-navy">{t("ma48Features")}</th>
              </tr>
            </thead>
            <tbody>
              {ma48Rows.map((row, i) => (
                <tr key={i} className="border-b border-navy/5 hover:bg-navy/[0.03]">
                  <td className="px-4 py-3 text-navy/90">{row.district}</td>
                  <td className="px-4 py-3 text-navy/80">{row.address}</td>
                  <td className="px-4 py-3 text-navy/80">{row.features}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-navy/80 text-sm leading-relaxed">{t("tandlerNote")}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
          <ListOrdered className="text-accent" size={28} />
          {t("processTitle")}
        </h2>
        <ol className="space-y-6">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold">{n}</span>
              <div>
                <h3 className="font-semibold text-navy">{t(`processStep${n}Title`)}</h3>
                <p className="text-navy/80 mt-1">{t(`processStep${n}Desc`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-4 flex items-center gap-2">
          <Wallet className="text-accent" size={28} />
          {t("valuationTitle")}
        </h2>
        <p className="text-navy/85 mb-6 font-medium">{t("valuationSubtitle")}</p>
        <ul className="grid sm:grid-cols-2 gap-4 mb-8">
          <li className="p-4 rounded-xl border border-navy/10 bg-navy/[0.02]">
            <h4 className="font-semibold text-accent">{t("valuationFurniture")}</h4>
            <p className="text-sm text-navy/80 mt-1">{t("valuationFurnitureItems")}</p>
          </li>
          <li className="p-4 rounded-xl border border-navy/10 bg-navy/[0.02]">
            <h4 className="font-semibold text-accent">{t("valuationArt")}</h4>
            <p className="text-sm text-navy/80 mt-1">{t("valuationArtItems")}</p>
          </li>
          <li className="p-4 rounded-xl border border-navy/10 bg-navy/[0.02]">
            <h4 className="font-semibold text-accent">{t("valuationBooks")}</h4>
            <p className="text-sm text-navy/80 mt-1">{t("valuationBooksItems")}</p>
          </li>
          <li className="p-4 rounded-xl border border-navy/10 bg-navy/[0.02]">
            <h4 className="font-semibold text-accent">{t("valuationTech")}</h4>
            <p className="text-sm text-navy/80 mt-1">{t("valuationTechItems")}</p>
          </li>
        </ul>
        <h3 className="text-lg font-semibold text-navy mb-3">{t("valuationHowTitle")}</h3>
        <ul className="space-y-2">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex gap-2 items-start">
              <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
              <span className="text-navy/85">{t(`valuationHow${n}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
          <Scale className="text-accent" size={28} />
          {t("legalTitle")}
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-navy/10">
            <h4 className="font-semibold text-navy">{t("legalInsurance")}</h4>
            <p className="text-navy/80 text-sm mt-1">{t("legalInsuranceDesc")}</p>
          </div>
          <div className="p-4 rounded-xl border border-navy/10">
            <h4 className="font-semibold text-navy">{t("legalDocs")}</h4>
            <p className="text-navy/80 text-sm mt-1">{t("legalDocsDesc")}</p>
          </div>
          <div className="p-4 rounded-xl border border-navy/10">
            <h4 className="font-semibold text-navy">{t("legalDiscretion")}</h4>
            <p className="text-navy/80 text-sm mt-1">{t("legalDiscretionDesc")}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
          <HelpCircle className="text-accent" size={28} />
          {t("faqTitle")}
        </h2>
        <div className="space-y-2">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-navy/10 bg-white overflow-hidden"
            >
              <summary className="px-4 py-3 font-medium text-navy cursor-pointer list-none flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronRight size={18} className="text-accent shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-3 pt-0 text-navy/80 text-sm border-t border-navy/5">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-navy/5 rounded-2xl p-6 md:p-8 border border-navy/10">
        <h2 className="text-2xl font-bold text-navy mb-2">{t("ctaTitle")}</h2>
        <p className="text-navy/75 mb-6">{t("ctaTagline")}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          <a
            href={`tel:${PHONE_LINK}`}
            className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent transition"
          >
            <Phone size={20} />
            {t("ctaPhone")}: {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent transition"
          >
            <MessageCircle size={20} />
            {t("ctaWhatsApp")}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-navy font-medium hover:text-accent transition"
          >
            <Mail size={20} />
            {t("ctaEmail")}
          </a>
        </div>
        <Link
          href="/#contact"
          className="inline-block bg-accent hover:bg-accent-hover text-white font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-accent/20"
        >
          {t("ctaOnline")}
        </Link>
        <p className="mt-4 text-sm text-navy/70">{t("ctaSubline")}</p>
      </section>
    </div>
  );
}
