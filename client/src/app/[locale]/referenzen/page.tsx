import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { ReferenzenGallery } from "@/components/ReferenzenGallery";
import { ContactSection } from "@/components/ContactSection";

type Props = { params: { locale: string } };

export function generateMetadata({ params: { locale } }: Props) {
  const isDe = locale === "de";
  return {
    title: isDe ? "Referenzen | objekträumung" : "References | objekträumung",
    description: isDe
      ? "So räumen wir – echte Einsätze von der Bestandsaufnahme bis zur sauberen Übergabe. Eindrücke vor Ort."
      : "This is how we clear – real jobs from assessment to clean handover. On-site impressions.",
  };
}

export default async function ReferenzenPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations("referenzen");
  const tNav = await getTranslations("nav");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero – çarpıcı, koyu, tek mesaj */}
      <header className="relative bg-navy text-white pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(60,110,113,0.15)_100%)]" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 mb-8">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              {tNav("home")}
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span>{t("breadcrumb")}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <Link
            href="#gallery"
            className="inline-flex items-center gap-2 mt-10 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors uppercase tracking-wider"
          >
            {t("galleryTitle")}
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </header>

      {/* Video / galeri bölümü */}
      <section id="gallery" className="scroll-mt-20">
        <ReferenzenGallery />
      </section>

      <ContactSection />
    </div>
  );
}
