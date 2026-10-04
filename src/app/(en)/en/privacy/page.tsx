import type { Metadata } from "next";

import { createLegalMetadata, LegalPage } from "@/components/legal/LegalPage";
import { getLegalContent } from "@/content/legal";

const content = getLegalContent("en", "privacy");

export const metadata: Metadata = createLegalMetadata(content);

export default function PrivacyPage() {
  return <LegalPage content={content} />;
}
