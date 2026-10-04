import type { Metadata } from "next";

import {
  getSiteCopy,
  siteConfig,
  type Locale,
} from "@/content/site";

const OPEN_GRAPH_IMAGE_PATH = "/opengraph-image";

const openGraphLocales: Record<Locale, string> = {
  de: "de_AT",
  en: "en_US",
};

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function createPageMetadata(locale: Locale): Metadata {
  const copy = getSiteCopy(locale);
  const alternateLocale: Locale = locale === "de" ? "en" : "de";
  const canonical = absoluteUrl(copy.path);
  const openGraphImage = absoluteUrl(OPEN_GRAPH_IMAGE_PATH);

  return {
    metadataBase: new URL(siteConfig.url),
    title: copy.seo.title,
    description: copy.seo.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Personal Training",
    alternates: {
      canonical,
      languages: {
        "de-AT": absoluteUrl("/"),
        en: absoluteUrl("/en"),
        "x-default": absoluteUrl("/"),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: copy.seo.title,
      description: copy.seo.description,
      url: canonical,
      locale: openGraphLocales[locale],
      alternateLocale: [openGraphLocales[alternateLocale]],
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: copy.seo.ogAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.seo.title,
      description: copy.seo.description,
      images: [openGraphImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
