import type { ReactNode } from "react";

import { RootDocument } from "@/components/root-document";
import { rootMetadata, rootViewport } from "@/lib/root-metadata";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function GermanRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootDocument lang="de-AT">{children}</RootDocument>;
}
