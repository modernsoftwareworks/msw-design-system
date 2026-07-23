import { join } from "node:path";
import { expect, test } from "@playwright/test";

/**
 * Runtime render-performance gate, powered by react-scan against the dev
 * server (react-scan needs React's development internals; the production
 * preview build strips them).
 *
 * The tour below mirrors real docs usage: land, toggle color mode, walk into
 * the gallery. react-scan classifies each render; a render loop, a
 * mode-toggle storm, or an Astryx update that de-memoizes the catalog shows
 * up as runaway counts and fails here.
 */
const REACT_SCAN_GLOBAL = join(process.cwd(), "node_modules/react-scan/dist/auto.global.js");

declare global {
  interface Window {
    reactScan: (options: Record<string, unknown>) => void;
    __RS: { total: number; unnecessary: number; byComponent: Record<string, number> };
  }
}

test("no render storms across the docs tour", async ({ page }) => {
  await page.addInitScript({ path: REACT_SCAN_GLOBAL });
  await page.addInitScript(() => {
    window.__RS = { total: 0, unnecessary: 0, byComponent: {} };
    window.reactScan({
      enabled: true,
      showToolbar: false,
      log: false,
      onRender: (
        _fiber: unknown,
        renders: Array<{
          componentName: string | null;
          unnecessary: boolean | null;
          phase: number;
        }>,
      ) => {
        for (const render of renders) {
          // Count only UPDATE-phase renders (RenderPhase.Update === 2): fresh
          // mounts scale with instance count and are not a glitch signal.
          if (render.phase !== 2) continue;
          window.__RS.total += 1;
          if (render.unnecessary) window.__RS.unnecessary += 1;
          const name = render.componentName ?? "(anonymous)";
          window.__RS.byComponent[name] = (window.__RS.byComponent[name] ?? 0) + 1;
        }
      },
    });
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Reset after mount so we measure interactions, not initial render.
  await page.evaluate(() => {
    window.__RS = { total: 0, unnecessary: 0, byComponent: {} };
  });

  const toggle = page.getByRole("button", { name: /color mode/i });
  await toggle.click(); // system -> light
  await toggle.click(); // light -> dark
  await page.waitForTimeout(250);

  const afterToggle = await page.evaluate(() => window.__RS);
  // Two toggle clicks legitimately update every themed component instance once
  // per click (×2 for StrictMode's dev double-render): ~15 nav links → ~60
  // update renders per name is the honest ceiling. A render LOOP shows up as
  // hundreds — that's the failure this guards against.
  const toggleWorst = Object.entries(afterToggle.byComponent).sort((a, b) => b[1] - a[1])[0];
  console.log(
    `mode toggle: ${afterToggle.total} update renders (${afterToggle.unnecessary} unnecessary), worst: ${toggleWorst?.[0]} ×${toggleWorst?.[1]}`,
  );
  expect(toggleWorst?.[1] ?? 0, `render storm in ${toggleWorst?.[0]}`).toBeLessThanOrEqual(80);
  expect(afterToggle.total, "total update renders across two mode toggles").toBeLessThanOrEqual(
    800,
  );

  // Walk into the heaviest route and back.
  await page.evaluate(() => {
    window.__RS = { total: 0, unnecessary: 0, byComponent: {} };
  });
  await page.getByRole("link", { name: "Forms & Inputs" }).click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await page.waitForLoadState("networkidle");

  const afterNav = await page.evaluate(() => window.__RS);
  const navWorst = Object.entries(afterNav.byComponent).sort((a, b) => b[1] - a[1])[0];
  console.log(
    `gallery round-trip: ${afterNav.total} update renders (${afterNav.unnecessary} unnecessary), worst: ${navWorst?.[0]} ×${navWorst?.[1]}`,
  );
  // Mount-phase renders are filtered out; the two route transitions should
  // only UPDATE shell components (nav links ×2 transitions ×StrictMode ≈ 60).
  expect(navWorst?.[1] ?? 0, `render storm in ${navWorst?.[0]}`).toBeLessThanOrEqual(80);
  expect(afterNav.total, "total update renders across gallery round-trip").toBeLessThanOrEqual(800);
});
