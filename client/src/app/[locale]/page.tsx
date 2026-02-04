import { buildMetadata } from "@/lib/seo";
import { HOMEPAGE_KEYWORDS_DE, HOMEPAGE_KEYWORDS_EN } from "@/lib/seo-keywords";
import { Hero } from "@/components/Hero";
import { HeroGoogleReviews } from "@/components/HeroGoogleReviews";
import { TrustBar } from "@/components/TrustBar";
import { Services } from "@/components/Services";
import { BrandPromiseSection } from "@/components/BrandPromiseSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { ContactSection } from "@/components/ContactSection";
import { DistrictsSeo } from "@/components/DistrictsSeo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props) {
  const locale = params.locale as "de" | "en";
  const title = locale === "de"
    ? "objekträumung | Wohnungsräumung Wien, Entrümpelung & Antiquitäten Ankauf"
    : "objekträumung | Apartment Clearance Vienna, Clearance & Antique Purchase";
  const description = locale === "de"
    ? "Wohnungsräumung Wien, Entrümpelung und Antiquitäten Ankauf aus einer Hand. Professioneller Umzugsservice, Haushaltsauflösung und Sperrmüllabholung in Wien & Niederösterreich. Kostenloses Angebot."
    : "Apartment clearance Vienna, clearance and antique purchase in one. Professional moving service, household clearance and bulky waste collection in Vienna & Lower Austria. Free quote.";
  return buildMetadata({
    title,
    description,
    keywords: locale === "de" ? HOMEPAGE_KEYWORDS_DE : HOMEPAGE_KEYWORDS_EN,
    canonicalPath: "/",
    locale,
  });
}

export default async function HomePage() {
  return (
    <>
      <Hero />
      <HeroGoogleReviews />
      <TrustBar />
      <Services />
      <BrandPromiseSection />
      <HowItWorksSection />
      <ReviewsCarousel />
      <ContactSection />
      <DistrictsSeo />
    </>
  );
}
