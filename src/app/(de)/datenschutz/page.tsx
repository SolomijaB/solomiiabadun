import type { Metadata } from "next";

import { createLegalMetadata, LegalPage } from "@/components/legal/LegalPage";
import { getLegalContent } from "@/content/legal";

const content = getLegalContent("de", "privacy");

export const metadata: Metadata = createLegalMetadata(content);

export default function DatenschutzPage() {
  return <LegalPage content={content} />;
}
