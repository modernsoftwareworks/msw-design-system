#!/usr/bin/env node
/**
 * Runs react-doctor non-interactively and fails if score is below baseline.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseline = Number(readFileSync(join(root, ".ci/react-doctor-baseline"), "utf8").trim());

const result = spawnSync("npx", ["-y", "react-doctor@latest", ".", "-y", "--json"], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, CI: "1", NO_COLOR: "1" },
  maxBuffer: 20 * 1024 * 1024,
});

const raw = (result.stdout ?? "").trim();
mkdirSync(join(root, ".ci/reports"), { recursive: true });
writeFileSync(join(root, ".ci/reports/react-doctor.json"), raw || result.stderr || "");

let report;
try {
  report = JSON.parse(raw);
} catch {
  console.error(result.stderr || raw);
  console.error("Could not parse react-doctor JSON. See .ci/reports/react-doctor.json");
  process.exit(result.status ?? 1);
}

if (report.error) {
  console.error(report.error.message || report.error);
  process.exit(1);
}

const score = report.summary?.score;
if (typeof score !== "number") {
  console.error("react-doctor did not return a numeric score", report.summary);
  process.exit(1);
}

console.log(`react-doctor score: ${score} (baseline ${baseline})`);
console.log(
  `diagnostics: ${report.summary.errorCount} errors, ${report.summary.warningCount} warnings`,
);

if (score < baseline) {
  console.error(`Score regressed below baseline ${baseline}`);
  process.exit(1);
}

if (report.summary.errorCount > 0) {
  console.error("react-doctor reported errors");
  process.exit(1);
}
