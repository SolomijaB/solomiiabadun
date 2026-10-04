import type { Metadata } from "next";

import { createLegalMetadata, LegalPage } from "@/components/legal/LegalPage";
import { getLegalContent } from "@/content/legal";

const content = getLegalContent("de", "legalNotice");

export const metadata: Metadata = createLegalMetadata(content);

export default function ImpressumPage() {
  return <LegalPage content={content} />;
}
