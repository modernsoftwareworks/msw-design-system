import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ROUTES } from "./routes";

/**
 * WCAG gate: zero serious/critical axe violations on every route, in both
 * color schemes (the quality-light / quality-dark projects set the scheme).
 *
 * Gallery routes mount upstream Astryx controls inside `.demo-card`; the docs
 * chrome on those routes is always scanned, demo internals are scanned too
 * unless a violation is tracked as Astryx-upstream (see AXE_EXCLUDE_DEMOS).
 * Set AXE_INCLUDE_DEMOS=1 to force-scan demo internals and inventory upstream issues.
 */
const GALLERY = ROUTES.filter((r) => r.startsWith("/components/"));
const DOCS_ONLY = ROUTES.filter((r) => !r.startsWith("/components/"));

// Astryx-upstream demo violations, excluded with tracking notes. Everything
// else in the catalog scans clean. Re-inventory with AXE_INCLUDE_DEMOS=1
// after each @astryxdesign/core upgrade — remove entries as upstream fixes land.
const AXE_EXCLUDE_DEMOS: string[] = [
  // nested-interactive: FileInput wraps a hidden <input type=file> in a div[role=button]
  '[data-demo="FileInput"] .demo-card',
  // aria-required-attr (critical): focusable div[role=separator] lacks aria-valuenow
  '[data-demo="ResizeHandle"] .demo-card',
  // target-size: Typeahead's clearable renders a 20×20 "Clear selection" ghost button (< 24×24)
  '[data-demo="Typeahead"] .demo-card',
];

async function runAxe(page: Page, excludeSelectors: string[] = []) {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
  ]);
  for (const selector of excludeSelectors) {
    builder = builder.exclude(selector);
  }
  const results = await builder.analyze();
  return results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
}

for (const path of DOCS_ONLY) {
  test(`axe: ${path} has no serious or critical violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1").first()).toBeVisible();
    const blocking = await runAxe(page);
    if (blocking.length) console.error(JSON.stringify(blocking, null, 2));
    expect(blocking, `axe serious/critical on ${path}`).toEqual([]);
  });
}

for (const path of GALLERY) {
  test(`axe: ${path} (docs chrome + demos) has no serious or critical violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator("h1").first()).toBeVisible();
    const exclude = process.env.AXE_INCLUDE_DEMOS ? [] : AXE_EXCLUDE_DEMOS;
    const blocking = await runAxe(page, exclude);
    if (blocking.length) console.error(JSON.stringify(blocking, null, 2));
    expect(blocking, `axe serious/critical on ${path}`).toEqual([]);
  });
}

test("docs shell exposes skip link and mode control", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /skip to content/i })).toBeAttached();
  await expect(page.getByRole("button", { name: /color mode/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
