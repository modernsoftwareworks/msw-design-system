#!/usr/bin/env node
/**
 * Bundle budget gate for apps/docs production build.
 *
 * Gzips every JS/CSS file in apps/docs/dist/assets and checks three buckets
 * against fixed byte budgets: total JS gzip, total CSS gzip, and the single
 * largest JS chunk gzip. Run after `pnpm --filter @modernsoftwareworks/docs build`.
 *
 * Exits 1 (and prints the offending bucket) on any breach. Always writes
 * .ci/reports/bundle.json for CI artifact upload.
 */
import { readdirSync, statSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const assetsDir = join(root, "apps/docs/dist/assets");
const reportPath = join(root, ".ci/reports/bundle.json");

// Baseline measured 2026-07-23 (current tree, `pnpm --filter @modernsoftwareworks/docs build`,
// Node zlib.gzipSync default level, this script's own computation):
//   total JS gzip     = 301,747 bytes (index + GalleryPage + Tooltip chunks)
//   total CSS gzip    = 27,444 bytes
//   largest JS chunk  = 208,783 bytes (GalleryPage-*.js)
// Budgets below are that baseline + ~10% headroom.
const BUDGET_TOTAL_JS_GZIP_BYTES = 332_000;
const BUDGET_TOTAL_CSS_GZIP_BYTES = 30_200;
const BUDGET_LARGEST_JS_CHUNK_GZIP_BYTES = 229_700;

let files;
try {
  files = readdirSync(assetsDir);
} catch {
  console.error(
    `Missing ${assetsDir} — run the docs build first (pnpm --filter @modernsoftwareworks/docs build).`,
  );
  process.exit(1);
}

function gzipBytes(path) {
  return gzipSync(readFileSync(path)).length;
}

const jsAssets = [];
const cssAssets = [];
for (const name of files) {
  const path = join(assetsDir, name);
  if (!statSync(path).isFile()) continue;
  const gzip = gzipBytes(path);
  if (name.endsWith(".js")) jsAssets.push({ name, gzip });
  else if (name.endsWith(".css")) cssAssets.push({ name, gzip });
}

jsAssets.sort((a, b) => b.gzip - a.gzip);
cssAssets.sort((a, b) => b.gzip - a.gzip);

const totalJsGzip = jsAssets.reduce((sum, a) => sum + a.gzip, 0);
const totalCssGzip = cssAssets.reduce((sum, a) => sum + a.gzip, 0);
const largestJsChunk = jsAssets[0] ?? { name: "(none)", gzip: 0 };

const buckets = [
  {
    name: "Total JS gzip",
    gzip: totalJsGzip,
    budget: BUDGET_TOTAL_JS_GZIP_BYTES,
  },
  {
    name: "Total CSS gzip",
    gzip: totalCssGzip,
    budget: BUDGET_TOTAL_CSS_GZIP_BYTES,
  },
  {
    name: `Largest JS chunk (${largestJsChunk.name})`,
    gzip: largestJsChunk.gzip,
    budget: BUDGET_LARGEST_JS_CHUNK_GZIP_BYTES,
  },
];

for (const b of buckets) b.pass = b.gzip <= b.budget;

console.log("\nPer-asset gzip sizes:");
for (const a of [...jsAssets, ...cssAssets]) {
  console.log(`  ${a.name.padEnd(32)} ${String(a.gzip).padStart(8)} B gzip`);
}

console.log("\nBundle budget gate:");
console.log(`  ${"bucket".padEnd(38)}${"gzip".padStart(10)}${"budget".padStart(10)}  status`);
for (const b of buckets) {
  console.log(
    `  ${b.name.padEnd(38)}${String(b.gzip).padStart(10)}${String(b.budget).padStart(10)}  ${b.pass ? "PASS" : "FAIL"}`,
  );
}

mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(
  reportPath,
  JSON.stringify(
    {
      measuredAt: new Date().toISOString(),
      buckets,
      assets: { js: jsAssets, css: cssAssets },
    },
    null,
    2,
  ),
);

const failed = buckets.filter((b) => !b.pass);
if (failed.length > 0) {
  console.error(`\nBundle budget exceeded for: ${failed.map((b) => b.name).join(", ")}.`);
  console.error(
    "An Astryx/theme update (or a new dependency in apps/docs or packages/ui, packages/theme) likely grew the bundle — review recent changes before raising the budget.",
  );
  process.exit(1);
}

console.log("\nBundle budget gate: OK");
