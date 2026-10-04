import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "de-AT": absoluteUrl("/"),
    en: absoluteUrl("/en"),
    "x-default": absoluteUrl("/"),
  };

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: absoluteUrl("/en"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
