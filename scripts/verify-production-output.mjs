import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// Der Build läuft je nach Ausgabemodus als statischer Export (`out/`)
// oder als OpenNext/Standalone-Build (`.next/`). Es werden nur vorhandene
// Verzeichnisse geprüft, damit das Gate in beiden Modi funktioniert.
const productionDirectories = [".next", "out"];
const excludedDirectoryNames = new Set(["cache"]);

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
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const files = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      if (excludedDirectoryNames.has(entry.name)) {
        continue;
      }

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
