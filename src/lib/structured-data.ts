import {
  getSiteCopy,
  siteConfig,
  type Locale,
} from "@/content/site";
import { absoluteUrl } from "@/lib/metadata";

type JsonPrimitive = boolean | number | string | null;

export type JsonLdValue =
  | JsonPrimitive
  | JsonLdNode
  | JsonLdValue[];

export interface JsonLdNode {
  "@type": string;
  "@id"?: string;
  [property: string]: JsonLdValue | undefined;
}

export interface StructuredDataDocument {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

const offerPrices: Record<string, number> = {
  "START STRONG": 0,
  "PERSONAL STRENGTH": 80,
  "STRENGTH SERIES": 640,
  "STRONG TOGETHER": 120,
};

export function createStructuredData(
  locale: Locale,
): StructuredDataDocument {
  const copy = getSiteCopy(locale);
  const websiteId = absoluteUrl("/#website");
  const personId = absoluteUrl("/#solomiia-badun");
  const serviceId = absoluteUrl(`${copy.path}#personal-training`);
  const coachingUrl = absoluteUrl(`${copy.path}#coaching`);

  const offers: JsonLdNode[] = copy.offers.items.map((offer) => {
    const pricing = offerPrices[offer.name];

    return {
      "@type": "Offer",
      name: offer.name,
      description: offer.body,
      url: coachingUrl,
      ...(pricing !== undefined
        ? {
            price: pricing,
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: pricing,
              priceCurrency: "EUR",
              unitText: offer.duration,
            },
          }
        : {}),
    };
  });

  const website: JsonLdNode = {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: copy.seo.description,
    inLanguage: ["de-AT", "en"],
    publisher: { "@id": personId, "@type": "Person" },
  };

  const person: JsonLdNode = {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: copy.about.paragraphs.join(" "),
    jobTitle:
      locale === "de"
        ? "Strength Coach für Frauen"
        : "Strength coach for women",
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.instagramProfileUrl],
    knowsLanguage: ["de", "en", "uk"],
    knowsAbout: [
      "Strength training",
      "Functional fitness",
      "Calisthenics",
      "Yoga",
      "Kickboxing",
      "Dance",
    ],
  };

  const service: JsonLdNode = {
    "@type": "Service",
    "@id": serviceId,
    url: coachingUrl,
    name:
      locale === "de"
        ? "Personal Training für Frauen in Wien und online"
        : "Personal training for women in Vienna and online",
    description: copy.offers.intro,
    serviceType:
      locale === "de"
        ? "Personal Training und Online-Coaching für erwachsene Frauen"
        : "Personal training and online coaching for adult women",
    inLanguage: copy.htmlLang,
    provider: { "@id": personId, "@type": "Person" },
    areaServed: {
      "@type": "City",
      name: locale === "de" ? "Wien" : "Vienna",
      containedInPlace: {
        "@type": "Country",
        name: locale === "de" ? "Österreich" : "Austria",
      },
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: locale === "de" ? "Erwachsene Frauen" : "Adult women",
      suggestedMinAge: 18,
    },
    availableLanguage: ["de", "en", "uk"],
    offers,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, person, service],
  };
}

export function serializeStructuredData(
  structuredData: StructuredDataDocument,
): string {
  return JSON.stringify(structuredData).replace(/</g, "\\u003c");
}
