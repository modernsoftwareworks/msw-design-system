#!/usr/bin/env node
/**
 * Fails if apps/docs production main JS entry exceeds the committed budget.
 * Run after `pnpm --filter @modernsoftwareworks/docs run build`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const budgetPath = new URL("../.ci/bundle-budget.json", import.meta.url);
const budget = JSON.parse(readFileSync(budgetPath, "utf8"));
const assetsDir = join(process.cwd(), "apps/docs/dist/assets");

let files;
try {
  files = readdirSync(assetsDir);
} catch {
  console.error("Missing apps/docs/dist/assets — run docs build first.");
  process.exit(1);
}

const mainJs = files
  .filter((f) => f.startsWith("index-") && f.endsWith(".js"))
  .map((f) => {
    const path = join(assetsDir, f);
    return { name: f, bytes: statSync(path).size };
  })
  .sort((a, b) => b.bytes - a.bytes);

if (mainJs.length === 0) {
  console.error("No index-*.js found in apps/docs/dist/assets");
  process.exit(1);
}

const entry = mainJs[0];
const max = budget.docsMainJsBytes;
const ok = entry.bytes <= max;
console.log(
  `docs main entry: ${entry.name} = ${entry.bytes} bytes (budget ${max}) — ${ok ? "OK" : "OVER"}`,
);

const galleryJs = files
  .filter((f) => f.startsWith("GalleryPage-") && f.endsWith(".js"))
  .map((f) => ({ name: f, bytes: statSync(join(assetsDir, f)).size }));

if (galleryJs[0] && budget.docsGalleryJsBytes) {
  const g = galleryJs[0];
  const gOk = g.bytes <= budget.docsGalleryJsBytes;
  console.log(
    `docs gallery chunk: ${g.name} = ${g.bytes} bytes (budget ${budget.docsGalleryJsBytes}) — ${gOk ? "OK" : "OVER"}`,
  );
  if (!gOk) process.exit(1);
}

if (!ok) process.exit(1);
