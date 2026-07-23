import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Shell + foundations must pass full axe (serious/critical).
 * Component gallery demos mount upstream Astryx controls; we still scan the
 * docs chrome on those routes but exclude `.demo-card` so catalog issues don't
 * fail the design-system CI (tracked as Astryx upstream).
 */
const fullRoutes = ["/", "/principles", "/foundations/color"] as const;
const galleryRoutes = ["/components/forms"] as const;

async function runAxe(page: import("@playwright/test").Page, excludeDemo = false) {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
  ]);
  if (excludeDemo) {
    builder = builder.exclude(".demo-card");
  }
  const results = await builder.analyze();
  return results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
}

for (const path of fullRoutes) {
  test(`axe: ${path} has no serious or critical violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1").first()).toBeVisible();
    const blocking = await runAxe(page, false);
    if (blocking.length) console.error(JSON.stringify(blocking, null, 2));
    expect(blocking, `axe serious/critical on ${path}`).toEqual([]);
  });
}

for (const path of galleryRoutes) {
  test(`axe: ${path} shell has no serious or critical violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1").first()).toBeVisible();
    const blocking = await runAxe(page, true);
    if (blocking.length) console.error(JSON.stringify(blocking, null, 2));
    expect(blocking, `axe serious/critical on ${path} shell`).toEqual([]);
  });
}

test("docs shell exposes skip link and mode control", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /skip to content/i })).toBeAttached();
  await expect(page.getByRole("button", { name: /color mode/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
