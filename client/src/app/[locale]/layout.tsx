import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { DEFAULT_KEYWORDS_DE, DEFAULT_KEYWORDS_EN } from "@/lib/seo-keywords";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCta } from "@/components/FloatingCta";
import { CookieBanner } from "@/components/CookieBanner";
import { JsonLd } from "@/components/JsonLd";

type Props = { children: React.ReactNode; params: { locale: string } };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isDe = locale === "at";
  return {
    ...buildMetadata({
      title: isDe
        ? "Objekträumung | Räumung Wien & Österreich – Kostenloses Angebot"
        : "Objekträumung | Clearance Vienna & Austria – Free Quote",
      description: isDe
        ? "Objekträumung – Professionelle Räumung, Haushaltsauflösung und Sperrmüllabholung in Wien und ganz Österreich. Kostenloses Angebot & WhatsApp."
        : "Objekträumung – Professional clearance, household clearance and bulky waste collection in Vienna and all of Austria. Free quote & WhatsApp.",
      keywords: isDe ? DEFAULT_KEYWORDS_DE : DEFAULT_KEYWORDS_EN,
      canonicalPath: "/",
      locale: locale as "at" | "en",
    }),
    icons: { icon: "/icon.ico" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  if (!routing.locales.includes(locale as "at" | "en")) notFound();
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <>
      <JsonLd locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCta />
        <CookieBanner />
      </NextIntlClientProvider>
    </>
  );
}
