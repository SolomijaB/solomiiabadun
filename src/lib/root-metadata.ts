import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/content/site";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
};

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" },
  ],
};
