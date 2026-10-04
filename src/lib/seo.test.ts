import { describe, expect, it } from "vitest";

import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { createPageMetadata } from "@/lib/metadata";
import {
  createStructuredData,
  serializeStructuredData,
} from "@/lib/structured-data";

describe("SEO metadata", () => {
  it("sets localized canonicals and reciprocal language alternates", () => {
    const de = createPageMetadata("de");
    const en = createPageMetadata("en");

    expect(de.alternates?.canonical).toBe("https://solomiiabadun.com/");
    expect(en.alternates?.canonical).toBe("https://solomiiabadun.com/en");
    expect(de.alternates?.languages).toEqual({
      "de-AT": "https://solomiiabadun.com/",
      en: "https://solomiiabadun.com/en",
      "x-default": "https://solomiiabadun.com/",
    });
  });

  it("keeps the sitemap limited to the two marketing routes", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://solomiiabadun.com/",
      "https://solomiiabadun.com/en",
    ]);
  });

  it("publishes a sitemap reference and a valid manifest start route", () => {
    expect(robots().sitemap).toBe("https://solomiiabadun.com/sitemap.xml");
    expect(manifest().start_url).toBe("/");
  });
});

describe("structured data", () => {
  it("contains only truthful website, person and service graph types", () => {
    const data = createStructuredData("de");
    const serialized = serializeStructuredData(data);

    expect(data["@graph"].map((node) => node["@type"])).toEqual([
      "WebSite",
      "Person",
      "Service",
    ]);
    expect(serialized).not.toContain("LocalBusiness");
    expect(serialized).not.toContain("EVO");
    expect(serialized).toContain("Strength Coach für Frauen");
    expect(serialized).not.toMatch(/Ausbildung|professional training/i);
  });

  it("localizes the public service without changing the factual offers", () => {
    const data = createStructuredData("en");
    const service = data["@graph"].find(
      (node) => node["@type"] === "Service",
    );

    expect(service?.name).toBe(
      "Personal training for women in Vienna and online",
    );
    expect(service?.offers).toHaveLength(5);
  });
});
