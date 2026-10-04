import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata("de");

export default function GermanHomePage() {
  return <MarketingPage locale="de" />;
}
