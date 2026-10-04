import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const CONSENT_STORAGE_KEY = "solomiia-badun-consent-v1";

const localizedPages = [
  {
    path: "/",
    alternatePath: "/en",
    canonical: "https://solomiiabadun.com",
    htmlLang: "de-AT",
    openGraphLocale: "de_AT",
    title: "Solomiia Badun | Personal Training für Frauen in Wien",
    heading: "Build Strength. Move Freely. Become Unstoppable.",
    navigationLabel: "Ansatz",
    navigationHash: "#ansatz",
    primaryCta: "Kennenlernen anfragen",
    contactHash: "#kontakt",
    secondaryCta: "Angebote ansehen",
    languageSwitch: "EN",
    testimonialHeading: "So fühlt sich Fortschritt an.",
    testimonialSnippet: "Durch Solomiia habe ich zu meinem Körper",
  },
  {
    path: "/en",
    alternatePath: "/",
    canonical: "https://solomiiabadun.com/en",
    htmlLang: "en",
    openGraphLocale: "en_US",
    title: "Solomiia Badun | Personal Training for Women in Vienna",
    heading: "Build Strength. Move Freely. Become Unstoppable.",
    navigationLabel: "Approach",
    navigationHash: "#approach",
    primaryCta: "Request an intro call",
    contactHash: "#contact",
    secondaryCta: "Explore coaching",
    languageSwitch: "DE",
    testimonialHeading: "This is what progress can feel like.",
    testimonialSnippet: "Through Solomiia, I found a connection to my body",
  },
] as const;

const responsiveViewports = [
  { width: 360, height: 800 },
  { width: 430, height: 900 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 1000 },
] as const;

const isAnalyticsUrl = (url: string) =>
  url.includes("va.vercel-scripts.com") ||
  url.includes("/_vercel/insights") ||
  url.includes("vitals.vercel-insights.com");

async function settlePage(page: Page, path: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path, { waitUntil: "networkidle" });
  await expect(page.locator("main")).toBeVisible();
}

async function chooseNecessaryIfPrompted(page: Page) {
  const dialog = page.getByRole("dialog");

  const isVisible = await dialog
    .waitFor({ state: "visible", timeout: 2_000 })
    .then(() => true)
    .catch(() => false);

  if (isVisible) {
    await dialog.locator('[data-consent-choice="necessary"]').click();
    await expect(dialog).toBeHidden();
  }
}

async function expectUrlAttribute(
  page: Page,
  selector: string,
  attribute: string,
  expectedUrl: string,
) {
  const locator = page.locator(selector);
  await expect(locator).toHaveAttribute(attribute, /\S/);
  const actualUrl = await locator.getAttribute(attribute);

  expect(new URL(actualUrl ?? "").toString()).toBe(
    new URL(expectedUrl).toString(),
  );
}

async function expectNoHorizontalOverflow(page: Page) {
  const result = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const documentWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
    );

    const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .filter((element) => {
        const style = getComputedStyle(element);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          element.closest("[hidden]")
        ) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > viewportWidth + 1;
      })
      .slice(0, 8)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element: element.tagName.toLowerCase(),
          className: element.className,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        };
      });

    return { documentWidth, offenders, viewportWidth };
  });

  expect(
    result.documentWidth,
    `Horizontal overflow at ${result.viewportWidth}px. Potential offenders: ${JSON.stringify(result.offenders)}`,
  ).toBeLessThanOrEqual(result.viewportWidth + 1);
}

async function expectMinimumTouchTargets(page: Page) {
  const undersized = await page.evaluate(() => {
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "summary",
      "input:not([type='hidden']):not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[role='button']",
    ].join(",");

    return Array.from(document.querySelectorAll<HTMLElement>(selector))
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.pointerEvents !== "none" &&
          !element.closest("[hidden]") &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.right > 0 &&
          rect.left < window.innerWidth
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element: element.tagName.toLowerCase(),
          label:
            element.getAttribute("aria-label") ??
            element.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ??
            "",
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      })
      .filter(({ width, height }) => width < 44 || height < 44);
  });

  expect(
    undersized,
    `Interactive targets smaller than 44×44px: ${JSON.stringify(undersized)}`,
  ).toEqual([]);
}

for (const localizedPage of localizedPages) {
  test.describe(`${localizedPage.htmlLang} page`, () => {
    test("renders localized content and working navigation/CTAs", async ({ page }) => {
      await settlePage(page, localizedPage.path);
      await chooseNecessaryIfPrompted(page);

      await expect(page.locator("html")).toHaveAttribute("lang", localizedPage.htmlLang);
      await expect(page).toHaveTitle(localizedPage.title);
      const headingParts = await page
        .getByRole("heading", { level: 1 })
        .locator("span, em")
        .allTextContents();
      expect(headingParts.join(" ")).toBe(localizedPage.heading);

      const testimonialSection = page.locator(".testimonials");
      const testimonialHeading = await testimonialSection
        .getByRole("heading", { level: 2 })
        .innerText();
      expect(testimonialHeading.replace(/\s+/g, " ").trim()).toBe(
        localizedPage.testimonialHeading,
      );
      await expect(testimonialSection.locator("figure")).toHaveCount(3);
      await expect(testimonialSection).toContainText(localizedPage.testimonialSnippet);
      for (const name of ["Diana", "Lisa", "Flo"]) {
        await expect(testimonialSection.getByText(name, { exact: true })).toBeVisible();
      }

      const primaryCta = page
        .locator("main")
        .getByRole("link", { name: localizedPage.primaryCta })
        .first();
      await expect(primaryCta).toHaveAttribute("href", localizedPage.contactHash);

      await page
        .locator("main")
        .getByRole("link", { name: localizedPage.secondaryCta })
        .click();
      await expect(page).toHaveURL(/#coaching$/);
      await expect(page.locator("#coaching")).toBeVisible();

      const desktopNavigationLink = page
        .locator(".site-header__desktop-nav")
        .getByRole("link", { name: localizedPage.navigationLabel });

      if (await desktopNavigationLink.isVisible()) {
        await desktopNavigationLink.click();
      } else {
        await page
          .getByRole("button", {
            name: localizedPage.htmlLang === "de-AT" ? "Menü öffnen" : "Open menu",
          })
          .click();
        await page
          .locator(".mobile-navigation")
          .getByRole("link", { name: localizedPage.navigationLabel })
          .click();
      }

      await expect(page).toHaveURL(
        new RegExp(`${localizedPage.navigationHash.replace("#", "#")}$`),
      );
      await expect(page.locator(localizedPage.navigationHash)).toBeVisible();
      const anchorAlignment = await page.evaluate((hash) => {
        const header = document.querySelector<HTMLElement>(".site-header");
        const target = document.querySelector<HTMLElement>(hash);
        return header && target
          ? Math.abs(target.getBoundingClientRect().top - header.getBoundingClientRect().bottom)
          : Number.POSITIVE_INFINITY;
      }, localizedPage.navigationHash);
      expect(anchorAlignment).toBeLessThanOrEqual(1.5);

      await primaryCta.click();
      await expect(page).toHaveURL(new RegExp(`${localizedPage.contactHash}$`));
      const contactSection = page.locator(localizedPage.contactHash);
      await expect(contactSection).toBeVisible();
      await expect(contactSection.getByLabel(localizedPage.htmlLang === "de-AT" ? "Vorname" : "First name")).toHaveAttribute("required", "");
      await expect(contactSection.getByLabel(localizedPage.htmlLang === "de-AT" ? "E-Mail-Adresse" : "Email address")).toHaveAttribute("required", "");
      await expect(contactSection.getByLabel(localizedPage.htmlLang === "de-AT" ? "Telefonnummer" : "Phone number")).toHaveAttribute("required", "");
      await expect(contactSection.getByLabel(localizedPage.htmlLang === "de-AT" ? "Kurze Nachricht" : "Short message")).toHaveAttribute("required", "");

      await page
        .locator(".site-header")
        .getByRole("link", { name: localizedPage.languageSwitch, exact: true })
        .click();
      await expect(page).toHaveURL(
        new RegExp(`${localizedPage.alternatePath === "/" ? "/$" : "/en$"}`),
      );
    });

    test("has no detectable Axe accessibility violations", async ({ page }) => {
      await settlePage(page, localizedPage.path);
      await chooseNecessaryIfPrompted(page);

      const results = await new AxeBuilder({ page }).analyze();
      const summary = results.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target),
      }));

      expect(summary, `Axe violations: ${JSON.stringify(summary)}`).toEqual([]);
    });
  });
}

test("has no horizontal overflow at all required responsive widths", async (
  { page },
  testInfo,
) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "The explicit viewport matrix runs once in the desktop browser project.",
  );
  test.slow();

  for (const viewport of responsiveViewports) {
    await page.setViewportSize(viewport);

    for (const localizedPage of localizedPages) {
      await settlePage(page, localizedPage.path);
      await chooseNecessaryIfPrompted(page);
      await expectNoHorizontalOverflow(page);

      if (viewport.width <= 768) {
        await expectMinimumTouchTargets(page);
      }
    }
  }
});

test("submits the contact form to FormSubmit without making a real request", async (
  { page },
  testInfo,
) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "The provider integration is intercepted and verified once in the desktop project.",
  );

  const formSubmitRequests: Array<{
    accept: string | undefined;
    body: string;
    method: string;
    url: string;
  }> = [];

  await page.route(
    "https://formsubmit.co/ajax/solomiiabadun@outlook.com",
    async (route) => {
      const request = route.request();
      formSubmitRequests.push({
        accept: request.headers().accept,
        body: request.postData() ?? "",
        method: request.method(),
        url: request.url(),
      });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: "true" }),
      });
    },
  );

  await settlePage(page, "/#kontakt");
  await chooseNecessaryIfPrompted(page);

  const form = page.locator("#kontakt form");
  await expect(form).toHaveAttribute(
    "action",
    "https://formsubmit.co/solomiiabadun@outlook.com",
  );
  await expect(form).toHaveAttribute("method", "POST");
  await expect(form.locator('input[name="_subject"]')).toHaveValue(
    "Neue Anfrage über solomiiabadun.com",
  );
  await expect(form.locator('input[name="_template"]')).toHaveValue("table");
  await expect(form.locator('input[name="_honey"]')).toHaveValue("");

  await form.getByLabel("Vorname").fill("Diana");
  await form.getByLabel("E-Mail-Adresse").fill("diana@example.com");
  await form.getByLabel("Telefonnummer").fill("+43 660 1234567");
  await form
    .getByLabel("Kurze Nachricht")
    .fill("Ich interessiere mich für Personal Training.");
  await form.getByRole("button", { name: "Anfrage absenden" }).click();

  await expect(form.getByRole("status")).toContainText("Danke!");
  expect(formSubmitRequests).toHaveLength(1);
  expect(formSubmitRequests[0]).toMatchObject({
    accept: "application/json",
    method: "POST",
    url: "https://formsubmit.co/ajax/solomiiabadun@outlook.com",
  });
  for (const expectedPart of [
    'name="_subject"',
    "Neue Anfrage über solomiiabadun.com",
    'name="_template"',
    'name="_honey"',
    'name="firstName"',
    "Diana",
    'name="email"',
    "diana@example.com",
    'name="phone"',
    "+43 660 1234567",
    'name="message"',
    "Ich interessiere mich für Personal Training.",
  ]) {
    expect(formSubmitRequests[0]?.body).toContain(expectedPart);
  }
  await expect(form.getByLabel("Vorname")).toHaveValue("");
});

test("does not load analytics before opt-in and persists opt-in/revocation", async ({
  page,
}) => {
  const analyticsRequests: string[] = [];

  await page.route(/(?:va\.vercel-scripts\.com|_vercel\/insights|vitals\.vercel-insights\.com)/, async (route) => {
    analyticsRequests.push(route.request().url());

    if (route.request().resourceType() === "script") {
      await route.fulfill({
        status: 200,
        contentType: "application/javascript",
        body: "window.__vercelAnalyticsTestScriptLoaded = true;",
      });
      return;
    }

    await route.fulfill({ status: 204, body: "" });
  });

  await settlePage(page, "/");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  await page.waitForTimeout(250);
  expect(analyticsRequests).toEqual([]);
  await expect(page.locator('script[src*="vercel-scripts"], script[src*="_vercel/insights"]')).toHaveCount(0);

  await dialog.locator('[data-consent-choice="statistics"]').click();
  await expect(dialog).toBeHidden();
  await expect
    .poll(() => analyticsRequests.filter(isAnalyticsUrl).length)
    .toBeGreaterThan(0);
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), CONSENT_STORAGE_KEY))
    .toBe("statistics");

  await page.reload({ waitUntil: "networkidle" });
  await expect(dialog).toBeHidden();
  expect(await page.evaluate((key) => localStorage.getItem(key), CONSENT_STORAGE_KEY)).toBe(
    "statistics",
  );

  await page.getByRole("button", { name: "Datenschutz-Einstellungen" }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Statistik erlaubt");
  await dialog.locator('[data-consent-choice="necessary"]').click();
  await expect(dialog).toBeHidden();
  expect(await page.evaluate((key) => localStorage.getItem(key), CONSENT_STORAGE_KEY)).toBe(
    "necessary",
  );

  const queuedAnalyticsMethods = await page.evaluate(() => {
    const analyticsWindow = window as Window & { vaq?: [string, unknown?][] };
    return analyticsWindow.vaq?.map(([method]) => method) ?? [];
  });
  expect(queuedAnalyticsMethods).toEqual(["beforeSend"]);

  analyticsRequests.length = 0;
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  expect(analyticsRequests).toEqual([]);
});

test("serves sitemap, robots, localized metadata and truthful JSON-LD", async (
  { page, request },
  testInfo,
) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Device-independent SEO checks run once in the desktop project.",
  );

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(2);
  expect(sitemap).toContain("<loc>https://solomiiabadun.com/</loc>");
  expect(sitemap).toContain("<loc>https://solomiiabadun.com/en</loc>");
  expect(sitemap).not.toContain("impressum");
  expect(sitemap).not.toContain("datenschutz");
  expect(sitemap).not.toContain("legal-notice");
  expect(sitemap).not.toContain("privacy");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBeTruthy();
  const robots = await robotsResponse.text();
  expect(robots).toContain("User-Agent: *");
  expect(robots).toContain("Allow: /");
  expect(robots).toContain("Sitemap: https://solomiiabadun.com/sitemap.xml");

  for (const localizedPage of localizedPages) {
    await settlePage(page, localizedPage.path);

    await expectUrlAttribute(
      page,
      'link[rel="canonical"]',
      "href",
      localizedPage.canonical,
    );
    await expectUrlAttribute(
      page,
      'link[rel="alternate"][hreflang="de-AT"]',
      "href",
      "https://solomiiabadun.com/",
    );
    await expectUrlAttribute(
      page,
      'link[rel="alternate"][hreflang="en"]',
      "href",
      "https://solomiiabadun.com/en",
    );
    await expectUrlAttribute(
      page,
      'link[rel="alternate"][hreflang="x-default"]',
      "href",
      "https://solomiiabadun.com/",
    );
    await expectUrlAttribute(
      page,
      'meta[property="og:url"]',
      "content",
      localizedPage.canonical,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
      "content",
      localizedPage.openGraphLocale,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );

    const structuredDataText = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(structuredDataText).not.toBeNull();
    const structuredData = JSON.parse(structuredDataText ?? "{}") as {
      "@context": string;
      "@graph": Array<{ "@type": string }>;
    };
    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(structuredData["@graph"].map((node) => node["@type"])).toEqual([
      "WebSite",
      "Person",
      "Service",
    ]);
    expect(structuredDataText).not.toContain("LocalBusiness");
    expect(structuredDataText).not.toContain("EVO");
  }

  for (const legalPath of [
    "/impressum",
    "/datenschutz",
    "/en/legal-notice",
    "/en/privacy",
  ]) {
    await page.goto(legalPath, { waitUntil: "networkidle" });
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex, follow/i,
    );
    await expect(page.locator("#legal-content")).not.toContainText(
      /Vorläufiger Entwurf|Noch offen|Preliminary draft|Still pending/i,
    );
    await expectNoHorizontalOverflow(page);
  }

  await page.goto("/impressum", { waitUntil: "networkidle" });
  await expect(page.locator("#legal-content")).toContainText(
    "Einzelunternehmen in Gründung",
  );
  await expect(page.locator("#legal-content")).toContainText(
    /Gewerbeanmeldung\s*In Gründung/,
  );
});
