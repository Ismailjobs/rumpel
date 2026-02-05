import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { EMAIL } from "@/lib/constants";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "at";
  return {
    title: isDe ? "Impressum | Objekträumung" : "Impressum | Objekträumung",
    description: isDe
      ? "Impressum – Yasin Ibrahim e.U., Objekträumung, Datenschutz, AGB. UID, Adresse, Kontakt."
      : "Impressum – Yasin Ibrahim e.U., clearance services, privacy, terms. VAT ID, address, contact.",
  };
}

export default async function ImpressumPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("impressum");
  const tNav = await getTranslations("nav");

  return (
    <div className="min-h-screen bg-white">
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
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            {t("intro")}
          </p>
          <p className="mt-3 text-sm text-white/70">
            {t("website")}: <a href="https://objektraeumung.at" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">{t("websiteUrl")}</a>
          </p>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20 space-y-16">
        <section id="impressum" className="rounded-2xl border border-navy/10 bg-slate-50/80 p-6 md:p-10">
          <h2 className="text-xl font-bold text-navy mb-6">{t("title")}</h2>
          <dl className="grid gap-4 sm:gap-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">{t("companyName")}</dt>
              <dd className="text-navy font-medium">{t("companyValue")}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">{t("address")}</dt>
              <dd className="text-navy">{t("addressValue")}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">{t("email")}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="text-accent hover:underline font-medium">{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">{t("uid")}</dt>
              <dd className="text-navy">{t("uidValue")}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">{t("authority")}</dt>
              <dd className="text-navy">{t("authorityValue")}</dd>
            </div>
          </dl>
        </section>

        <section id="datenschutz" className="rounded-2xl border border-navy/10 bg-slate-50/80 p-6 md:p-10">
          <h2 className="text-xl font-bold text-navy mb-6">{t("datenschutzTitle")}</h2>
          <p className="text-navy/90 mb-6">{t("datenschutzIntro")}</p>
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-semibold text-navy mb-1">{t("datenschutzResponsible")}</dt>
              <dd className="text-navy">{t("companyValue")}<br /><a href={`mailto:${EMAIL}`} className="text-accent hover:underline">{EMAIL}</a></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy mb-1">{t("datenschutzForm")}</dt>
              <dd className="text-navy">{t("datenschutzFormText")}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy mb-1">{t("datenschutzPurpose")}</dt>
              <dd className="text-navy">{t("datenschutzPurposeText")}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy mb-1">{t("datenschutzDuration")}</dt>
              <dd className="text-navy">{t("datenschutzDurationText")}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy mb-1">{t("datenschutzRights")}</dt>
              <dd className="text-navy">{t("datenschutzRightsText")}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-navy mb-1">{t("datenschutzSecurity")}</dt>
              <dd className="text-navy">{t("datenschutzSecurityText")}</dd>
            </div>
          </dl>
        </section>

        <section id="agb" className="rounded-2xl border border-navy/10 bg-slate-50/80 p-6 md:p-10">
          <h2 className="text-xl font-bold text-navy mb-6">{t("agbTitle")}</h2>
          <ul className="space-y-5">
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb1Title")}</h3>
              <p className="text-navy">{t("agb1Text")}</p>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb2Title")}</h3>
              <p className="text-navy">{t("agb2Text")}</p>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb3Title")}</h3>
              <p className="text-navy">{t("agb3Text")}</p>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb4Title")}</h3>
              <p className="text-navy">{t("agb4Text")}</p>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb5Title")}</h3>
              <p className="text-navy">{t("agb5Text")}</p>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb6Title")}</h3>
              <p className="text-navy">{t("agb6Text")}</p>
            </li>
            <li>
              <h3 className="text-sm font-semibold text-navy mb-1">{t("agb7Title")}</h3>
              <p className="text-navy">{t("agb7Text")}</p>
            </li>
          </ul>
        </section>
      </article>

      <ContactSection />
    </div>
  );
}
