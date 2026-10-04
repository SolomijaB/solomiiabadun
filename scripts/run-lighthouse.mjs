import { access } from "node:fs/promises";

import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const targetUrl = "http://127.0.0.1:3000/";
const categories = ["performance", "accessibility", "best-practices", "seo"];
const runsPerProfile = 3;

const profiles = [
  {
    name: "Mobile",
    config: undefined,
    thresholds: {
      performance: 90,
      accessibility: 95,
      "best-practices": 95,
      seo: 95,
    },
  },
  {
    name: "Desktop",
    config: desktopConfig,
    thresholds: {
      performance: 95,
      accessibility: 95,
      "best-practices": 95,
      seo: 95,
    },
  },
];

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}

function categoryScores(lhr) {
  return Object.fromEntries(
    categories.map((category) => {
      const score = lhr.categories[category]?.score;

      if (typeof score !== "number") {
        throw new Error(`Lighthouse returned no ${category} score.`);
      }

      return [category, Math.round(score * 100)];
    }),
  );
}

async function assertLocalServer() {
  try {
    const response = await fetch(targetUrl, {
      redirect: "manual",
      signal: AbortSignal.timeout(5_000),
    });

    if (response.status >= 500) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(
      `Lokaler Server nicht erreichbar (${targetUrl}): ${detail}\n` +
        "Für belastbare Werte zuerst `npm run build` und anschließend " +
        "`npm run start -- --hostname 127.0.0.1 --port 3000` ausführen.",
    );
    process.exit(1);
  }
}

async function resolvePlaywrightChromium() {
  const executablePath = chromium.executablePath();

  try {
    await access(executablePath);
    return executablePath;
  } catch {
    return undefined;
  }
}

await assertLocalServer();

let chrome;

try {
  chrome = await chromeLauncher.launch({
    chromePath: await resolvePlaywrightChromium(),
    chromeFlags: [
      "--headless=new",
      "--disable-gpu",
      "--no-default-browser-check",
      "--no-first-run",
    ],
    logLevel: "silent",
  });
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  console.error(
    "Kein nutzbares Chrome-/Chromium-Binary für Lighthouse gefunden. " +
      `Es wurde nichts installiert. Details: ${detail}`,
  );
  process.exit(1);
}

const failures = [];

try {
  for (const profile of profiles) {
    const results = [];

    for (let run = 1; run <= runsPerProfile; run += 1) {
      const runnerResult = await lighthouse(
        targetUrl,
        {
          port: chrome.port,
          logLevel: "error",
          output: "json",
          onlyCategories: categories,
          disableStorageReset: false,
          maxWaitForLoad: 45_000,
        },
        profile.config,
      );

      if (!runnerResult?.lhr) {
        throw new Error(`${profile.name}, Lauf ${run}: kein Lighthouse-Ergebnis.`);
      }

      const scores = categoryScores(runnerResult.lhr);
      results.push(scores);
      console.log(`${profile.name} ${run}/3`, scores);
    }

    const medians = Object.fromEntries(
      categories.map((category) => [
        category,
        median(results.map((result) => result[category])),
      ]),
    );

    console.log(`${profile.name} Median`, medians);

    for (const category of categories) {
      const actual = medians[category];
      const required = profile.thresholds[category];

      if (actual < required) {
        failures.push(
          `${profile.name} ${category}: ${actual} < ${required}`,
        );
      }
    }
  }
} catch (error) {
  const detail = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`Lighthouse konnte nicht abgeschlossen werden:\n${detail}`);
  process.exitCode = 1;
} finally {
  await chrome.kill();
}

if (failures.length > 0) {
  console.error("\nLighthouse-Schwellen nicht erreicht:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else if (!process.exitCode) {
  console.log("\nAlle Lighthouse-Median-Schwellen wurden erreicht.");
}
