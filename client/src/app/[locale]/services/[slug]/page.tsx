import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { DistrictsSeo } from "@/components/DistrictsSeo";
import { ContactSection } from "@/components/ContactSection";
import { ServicePageHero } from "@/components/ServicePageHero";
import { ServiceZLayout } from "@/components/ServiceZLayout";
import { ServiceHouseholdLayout } from "@/components/ServiceHouseholdLayout";
import { ServiceKellerLayout } from "@/components/ServiceKellerLayout";
import { ServiceDachbodenLayout } from "@/components/ServiceDachbodenLayout";
import { ServiceVerlassenschaftLayout } from "@/components/ServiceVerlassenschaftLayout";
import { ServiceMessieLayout } from "@/components/ServiceMessieLayout";
import { ServiceWohnungsaufloesungLayout } from "@/components/ServiceWohnungsaufloesungLayout";
import { ServiceZimmerRaeumungLayout } from "@/components/ServiceZimmerRaeumungLayout";
import { ServiceFirmenaufloesungLayout } from "@/components/ServiceFirmenaufloesungLayout";
import { ServiceGastroRetailLayout } from "@/components/ServiceGastroRetailLayout";
import { ServiceGaragenraeumungLayout } from "@/components/ServiceGaragenraeumungLayout";
import { ServiceLagerGewerbeparksLayout } from "@/components/ServiceLagerGewerbeparksLayout";
import { ServiceWertanrechnungLayout } from "@/components/ServiceWertanrechnungLayout";
import { ServiceRaeumungWienLayout } from "@/components/ServiceRaeumungWienLayout";
import { ServiceEntrumpelungWienLayout } from "@/components/ServiceEntrumpelungWienLayout";
import { ServiceEinkaufLayout } from "@/components/ServiceEinkaufLayout";
import { UeberblickContent } from "@/components/UeberblickContent";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { getServiceTheme, type ServiceKey } from "@/lib/serviceThemes";
import { SERVICE_LIST, LEGACY_SLUGS, getSlugConfig } from "@/lib/serviceList";
import { routing } from "@/i18n/routing";

const ALL_SLUGS = [...SERVICE_LIST.map((s) => s.slug), ...Object.keys(LEGACY_SLUGS)];

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ALL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = params;
  const config = getSlugConfig(slug);
  if (!config) return { title: "objekträumung" };
  const t = await getTranslations({ locale, namespace: "services" });
  const title = t(`${config.titleKey}.title`);
  const metaDesc = t(`${config.titleKey}.metaDescription`);
  return {
    title: `${title} | objekträumung`,
    description: metaDesc,
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { locale, slug } = params;
  unstable_setRequestLocale(locale);

  if (LEGACY_SLUGS[slug]) {
    redirect(`/services/${LEGACY_SLUGS[slug]}`);
  }

  const config = getSlugConfig(slug);
  if (!config) notFound();

  const { titleKey, contentKey } = config;
  const t = await getTranslations({ locale, namespace: "services" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tUeb = await getTranslations({ locale, namespace: "ueberblick" });
  const title = t(`${titleKey}.title`);
  const theme = getServiceTheme(contentKey as ServiceKey);
  const isHousehold = slug === "haushaltsaufloesung";
  const isKeller = slug === "kellerraeumung";
  const isDachboden = slug === "dachbodenraeumung";
  const isVerlassenschaft = slug === "verlassenschaft";
  const isMessie = slug === "messie-entruempelung";
  const isUeberblick = slug === "haushaltsaufloesung-ueberblick";
  const isWohnungsaufloesung = slug === "wohnungsaufloesung";
  const isZimmerRaeumung = slug === "zimmer-raeumung";
  const isFirmenaufloesung = slug === "firmenaufloesung";
  const isGastroRetail = slug === "gastro-retail";
  const isGaragenraeumung = slug === "garagenraeumung";
  const isLagerGewerbeparks = slug === "lager-gewerbeparks";
  const isAntiquitaetenWertanrechnung = slug === "antiquitaeten-wertanrechnung";
  const isMoebelWertanrechnung = slug === "moebel-wertanrechnung";
  const isRaeumungWien = slug === "raeumung-wien";
  const isEntrumpelungWien = slug === "entrumpelung-wien";
  const isEinkauf = slug === "einkauf";
  const useZLayout = !isEinkauf && !isHousehold && !isKeller && !isDachboden && !isVerlassenschaft && !isMessie && !isWohnungsaufloesung && !isZimmerRaeumung && !isFirmenaufloesung && !isGastroRetail && !isGaragenraeumung && !isLagerGewerbeparks && !isAntiquitaetenWertanrechnung && !isRaeumungWien && !isEntrumpelungWien && !isUeberblick;
  const body1 = useZLayout ? t(`${contentKey}.body1`) : "";
  const body2 = useZLayout ? t(`${contentKey}.body2`) : "";
  const subtitle = isEinkauf ? t("einkauf.subtitle") : isHousehold ? t("household.subtitle") : isKeller ? t("kellerraeumung.subtitle") : isDachboden ? t("dachbodenraeumung.subtitle") : isVerlassenschaft ? t("verlassenschaft.subtitle") : isMessie ? t("messieEntruempelung.subtitle") : isUeberblick ? tUeb("heroSubtitle") : isWohnungsaufloesung ? t("wohnungsaufloesung.subtitle") : isZimmerRaeumung ? t("zimmerRaeumung.subtitle") : isFirmenaufloesung ? t("firmenaufloesung.subtitle") : isGastroRetail ? t("gastroRetail.subtitle") : isGaragenraeumung ? t("garagenraeumung.subtitle") : isLagerGewerbeparks ? t("lagerGewerbeparks.subtitle") : isAntiquitaetenWertanrechnung ? t("antiquitaetenWertanrechnung.subtitle") : isMoebelWertanrechnung ? t("moebelWertanrechnung.subtitle") : isRaeumungWien ? t("raeumungWien.subtitle") : isEntrumpelungWien ? t("entrumpelungWien.subtitle") : undefined;

  return (
    <>
      <ServicePageHero title={title} slug={slug} theme={theme} subtitle={subtitle} />
      <article className={theme.articleBg}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="font-medium hover:text-gray-700 hover:underline">
              {tNav("home")}
            </Link>
            <ChevronRight size={16} className="shrink-0" />
            <Link href="/services" className="font-medium hover:text-gray-700 hover:underline">
              {tNav("services")}
            </Link>
            <ChevronRight size={16} className="shrink-0" />
            <span className="font-medium truncate" aria-current="page">
              {title}
            </span>
          </nav>
        </div>
        {isEinkauf ? (
          <ServiceEinkaufLayout slug={slug} theme={theme} />
        ) : isHousehold ? (
          <ServiceHouseholdLayout slug={slug} theme={theme} />
        ) : isKeller ? (
          <ServiceKellerLayout slug={slug} theme={theme} />
        ) : isDachboden ? (
          <ServiceDachbodenLayout slug={slug} theme={theme} />
        ) : isVerlassenschaft ? (
          <ServiceVerlassenschaftLayout slug={slug} theme={theme} />
        ) : isMessie ? (
          <ServiceMessieLayout slug={slug} theme={theme} />
        ) : isWohnungsaufloesung ? (
          <ServiceWohnungsaufloesungLayout slug={slug} theme={theme} />
        ) : isZimmerRaeumung ? (
          <ServiceZimmerRaeumungLayout slug={slug} theme={theme} />
        ) : isFirmenaufloesung ? (
          <ServiceFirmenaufloesungLayout slug={slug} theme={theme} />
        ) : isGastroRetail ? (
          <ServiceGastroRetailLayout slug={slug} theme={theme} />
        ) : isGaragenraeumung ? (
          <ServiceGaragenraeumungLayout slug={slug} theme={theme} />
        ) : isLagerGewerbeparks ? (
          <ServiceLagerGewerbeparksLayout slug={slug} theme={theme} />
        ) : isAntiquitaetenWertanrechnung ? (
          <ServiceWertanrechnungLayout slug={slug} theme={theme} namespaceKey="antiquitaetenWertanrechnung" />
        ) : isRaeumungWien ? (
          <ServiceRaeumungWienLayout slug={slug} theme={theme} />
        ) : isEntrumpelungWien ? (
          <ServiceEntrumpelungWienLayout slug={slug} theme={theme} />
        ) : isUeberblick ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-10 md:pb-14">
            <UeberblickContent />
          </div>
        ) : (
          <ServiceZLayout body1={body1} body2={body2} slug={slug} theme={theme} />
        )}
      </article>
      {!isEinkauf && !isHousehold && !isKeller && !isDachboden && !isVerlassenschaft && !isMessie && !isWohnungsaufloesung && !isZimmerRaeumung && !isFirmenaufloesung && !isGastroRetail && !isGaragenraeumung && !isLagerGewerbeparks && !isAntiquitaetenWertanrechnung && !isMoebelWertanrechnung && !isRaeumungWien && !isEntrumpelungWien && !isUeberblick && <HowItWorksSection />}
      <div className={theme.contactBg}>
        <ContactSection defaultService={contentKey} />
      </div>
      <DistrictsSeo />
    </>
  );
}
