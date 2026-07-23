#!/usr/bin/env node
/**
 * Static gate companion to react-scan runtime checks.
 * Ensures docs shell does not import the full catalog barrel (the main re-render/bundle thrash vector).
 * Optional: if REACT_SCAN_URL is set, notes that a manual/browser scan should be run against it.
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appPath = join(root, "apps/docs/src/App.tsx");
const shellPath = join(root, "apps/docs/src/layout/DocShell.tsx");
const app = readFileSync(appPath, "utf8");
const shell = readFileSync(shellPath, "utf8");

const barrel = /from\s+["']@modernsoftwareworks\/msw-ui["']/;
const provider = /from\s+["']@modernsoftwareworks\/msw-ui\/provider["']/;

let failed = false;

if (barrel.test(app) || barrel.test(shell)) {
  console.error(
    "Docs shell/App must not import the full @modernsoftwareworks/msw-ui barrel (use /provider).",
  );
  failed = true;
}

if (!provider.test(app) || !provider.test(shell)) {
  console.error(
    "Docs shell/App must import MswProvider from @modernsoftwareworks/msw-ui/provider.",
  );
  failed = true;
}

// Gallery may import the full barrel — verify that stays in the lazy gallery module only
const gallery = readFileSync(join(root, "apps/docs/src/gallery/GalleryPage.tsx"), "utf8");
if (!barrel.test(gallery)) {
  console.warn("Note: GalleryPage no longer imports the full catalog; confirm intentional.");
}

if (process.env.REACT_SCAN_URL) {
  console.log(
    `Runtime react-scan: open ${process.env.REACT_SCAN_URL} with react-scan and verify mode toggle / gallery mount.`,
  );
}

if (failed) process.exit(1);
console.log("react-scan static gate: OK (provider-only shell imports)");
