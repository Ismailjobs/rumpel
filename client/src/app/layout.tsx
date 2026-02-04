import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { LocaleLangSync } from "@/components/LocaleLangSync";
import { FaviconHead } from "@/components/FaviconHead";
import { GOOGLE_SITE_VERIFICATION, BING_MSVALIDATE } from "@/lib/constants";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const verification: Metadata["verification"] = {};
if (GOOGLE_SITE_VERIFICATION) verification.google = GOOGLE_SITE_VERIFICATION;
if (BING_MSVALIDATE) verification.other = { "msvalidate.01": BING_MSVALIDATE };

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://objektraeumung.at";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  robots: { index: true, follow: true },
  icons: { icon: "/icon.ico" },
  ...(Object.keys(verification).length > 0 && { verification }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={montserrat.variable} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <FaviconHead />
        <LocaleLangSync />
        {children}
      </body>
    </html>
  );
}
