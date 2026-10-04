"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HtmlLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de-AT";
  }, [pathname]);

  return null;
}
