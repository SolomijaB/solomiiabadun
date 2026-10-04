import type { ReactNode } from "react";
import { Inter, Playfair_Display, Poppins } from "next/font/google";

import { CookieConsent } from "@/components/consent";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

type RootDocumentProps = {
  children: ReactNode;
  lang: "de-AT" | "en";
};

export function RootDocument({ children, lang }: RootDocumentProps) {
  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
