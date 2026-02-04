import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { ContactSection } from "@/components/ContactSection";
import { EMAIL, ADDRESS } from "@/lib/constants";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "at";
  return {
    title: isDe ? "Impressum | objekträumung" : "Impressum | objekträumung",
    description: isDe
      ? "Impressum – Yasin Ibrahim e.U., Secondhand Altwaren. UID, Adresse, Kontakt."
      : "Impressum – Yasin Ibrahim e.U., Secondhand Altwaren. VAT ID, address, contact.",
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
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <section className="rounded-2xl border border-navy/10 bg-slate-50/80 p-6 md:p-10 space-y-6">
          <dl className="grid gap-4 sm:gap-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">
                {t("companyName")}
              </dt>
              <dd className="text-navy font-medium">Yasin Ibrahim e.U.</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">
                {t("trade")}
              </dt>
              <dd className="text-navy">Secondhand Altwaren</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">
                {t("email")}
              </dt>
              <dd>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-accent hover:underline font-medium"
                >
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">
                {t("uid")}
              </dt>
              <dd className="text-navy">ATU80829427</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/60 mb-1">
                {t("address")}
              </dt>
              <dd className="text-navy">{ADDRESS}</dd>
            </div>
          </dl>
        </section>
      </article>

      <ContactSection />
    </div>
  );
}
