import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata("en");

export default function EnglishHomePage() {
  return <MarketingPage locale="en" />;
}
