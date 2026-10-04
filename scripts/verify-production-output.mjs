import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const productionDirectories = [".next/server", ".next/static"];
const forbiddenSnippets = [
  "BEISPIEL – NICHT VERÖFFENTLICHEN",
  "EXAMPLE — DO NOT PUBLISH",
  "Mara, 32",
  "Nina, 41",
  "Elena, 28",
];

const searchableExtensions = new Set([
  ".html",
  ".js",
  ".json",
  ".map",
  ".rsc",
  ".txt",
]);

function hasSearchableExtension(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 && searchableExtensions.has(fileName.slice(dotIndex));
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
    } else if (entry.isFile() && hasSearchableExtension(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

const productionFiles = (
  await Promise.all(productionDirectories.map((directory) => collectFiles(directory)))
).flat();

const matches = [];

for (const file of productionFiles) {
  const content = await readFile(file, "utf8");

  for (const snippet of forbiddenSnippets) {
    if (content.includes(snippet)) {
      matches.push(`${file}: ${snippet}`);
    }
  }
}

if (matches.length > 0) {
  console.error("Frühere fiktive Beispiel-Testimonials wurden im Production-Build gefunden:");
  for (const match of matches) console.error(`- ${match}`);
  process.exit(1);
}

console.log("Production-Gate bestanden: keine früheren fiktiven Beispiel-Testimonials im Build.");
