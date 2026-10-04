import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${siteConfig.name} – ${siteConfig.descriptor}`,
    short_name: siteConfig.name,
    description: siteConfig.locales.de.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FFF4EE",
    theme_color: "#1E1E1E",
    lang: "de-AT",
    dir: "ltr",
    categories: ["fitness", "health", "lifestyle"],
    icons: [
      {
        src: "/brand/mark-sb-selected.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
