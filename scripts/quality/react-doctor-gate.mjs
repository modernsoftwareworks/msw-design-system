#!/usr/bin/env node
/**
 * react-doctor score/severity gate.
 *
 * Runs `react-doctor` across the whole workspace and fails (exit 1) if the
 * overall score is below the SCORE_FLOOR, or any ERROR-severity diagnostic
 * exists (warnings are allowed). Writes the full react-doctor JSON report to
 * .ci/reports/react-doctor.json.
 *
 * Note: react-doctor's own `--score` flag ("output only the score") only
 * emits a bare number when scoped to a single `--project`; run against the
 * whole workspace (as here, via `-y`) it prints nothing usable. So this gate
 * uses `--json --json-out` instead, which gives both the overall score and
 * the per-diagnostic severity breakdown needed for the error-count check.
 */
import { readFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const reportPath = join(root, ".ci/reports/react-doctor.json");
const SCORE_FLOOR = 85;

mkdirSync(dirname(reportPath), { recursive: true });

const result = spawnSync(
  "pnpm",
  ["exec", "react-doctor", "-y", "--json", "--json-out", reportPath],
  { cwd: root, encoding: "utf8", env: { ...process.env, CI: "1", NO_COLOR: "1" } },
);

let report;
try {
  report = JSON.parse(readFileSync(reportPath, "utf8"));
} catch {
  console.error("react-doctor did not produce a readable JSON report.");
  if (result.stdout) console.error(result.stdout);
  if (result.stderr) console.error(result.stderr);
  process.exit(1);
}

if (report.error) {
  console.error("react-doctor reported an error:", report.error.message ?? report.error);
  process.exit(1);
}

const { score, errorCount, warningCount } = report.summary ?? {};
if (typeof score !== "number") {
  console.error("react-doctor report is missing summary.score:", report.summary);
  process.exit(1);
}

const delta = score - SCORE_FLOOR;
console.log(
  `react-doctor score: ${score} (floor ${SCORE_FLOOR}, delta ${delta >= 0 ? "+" : ""}${delta})`,
);
console.log(`diagnostics: ${errorCount} error(s), ${warningCount} warning(s)`);
console.log(`full report: .ci/reports/react-doctor.json`);

const failures = [];
if (score < SCORE_FLOOR) failures.push(`score ${score} is below the floor of ${SCORE_FLOOR}`);
if (errorCount > 0) failures.push(`${errorCount} ERROR-severity finding(s) present`);

if (failures.length > 0) {
  console.error(`\nreact-doctor gate FAILED: ${failures.join("; ")}.`);
  process.exit(1);
}

console.log("\nreact-doctor gate: OK");
