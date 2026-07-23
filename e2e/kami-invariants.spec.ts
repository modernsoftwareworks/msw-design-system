import { expect, test } from "@playwright/test";

// Kami visual-invariant regression net. If an Astryx upgrade (or a theme edit)
// drifts away from the decisions in DESIGN.md / the Principles page, these fail.
// Expected values come from the Kami extraction (kami.tw93.fun, tokens.json).

const isDark = () => test.info().project.name.includes("dark");

const EXPECTED = {
  light: {
    bodyBg: "rgb(245, 244, 237)", // parchment #f5f4ed
    textPrimary: "rgb(20, 20, 19)", // near-black #141413
    accentText: "rgb(27, 54, 93)", // ink-blue #1B365D
  },
  dark: {
    bodyBg: "rgb(20, 20, 19)", // deep-dark #141413
    textPrimary: "rgb(250, 249, 245)", // ivory #faf9f5
    accentText: "rgb(132, 170, 214)", // kami dark-syntax blue #84aad6
  },
};

test("canvas is parchment / deep-dark — never pure white or black", async ({ page }) => {
  await page.goto("/");
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe(EXPECTED[isDark() ? "dark" : "light"].bodyBg);
  expect(bg).not.toBe("rgb(255, 255, 255)");
  expect(bg).not.toBe("rgb(0, 0, 0)");
});

test("serif hierarchy: Charter-first stacks, headings at weight 500, Kami sizes", async ({
  page,
}) => {
  await page.goto("/foundations/typography");
  const type = await page.evaluate(() => {
    const h1 = document.querySelector("main h1")!;
    const s = getComputedStyle(h1);
    return {
      family: s.fontFamily,
      weight: s.fontWeight,
      h1Size: s.fontSize,
      bodyFamily: getComputedStyle(document.body).fontFamily,
    };
  });
  expect(type.family.startsWith("Charter")).toBe(true);
  expect(type.bodyFamily.startsWith("Charter")).toBe(true);
  expect(type.weight).toBe("500");
  expect(type.h1Size).toBe("30px");
});

test("single accent: eyebrows and active nav carry ink, AA-legible", async ({ page }) => {
  await page.goto("/foundations/color");
  const colors = await page.evaluate(() => ({
    eyebrow: getComputedStyle(document.querySelector(".page-eyebrow")!).color,
    activeNav: getComputedStyle(document.querySelector(".nav-link.active")!).color,
  }));
  const expected = EXPECTED[isDark() ? "dark" : "light"].accentText;
  expect(colors.eyebrow).toBe(expected);
  expect(colors.activeNav).toBe(expected);
});

test("all grays are warm: R ≥ G > B on every text tone", async ({ page }) => {
  await page.goto("/");
  const tones = await page.evaluate(() => {
    const read = (prop: string) => {
      const el = document.createElement("span");
      el.style.color = `var(${prop})`;
      document.body.appendChild(el);
      const value = getComputedStyle(el).color;
      el.remove();
      return value;
    };
    return [
      ["--color-text-primary", read("--color-text-primary")],
      ["--color-text-secondary", read("--color-text-secondary")],
      ["--color-text-disabled", read("--color-text-disabled")],
    ];
  });
  for (const [token, value] of tones) {
    const [r, g, b] = value.match(/\d+/g)!.map(Number);
    expect(r, `${token} = ${value} must lean warm (R ≥ G)`).toBeGreaterThanOrEqual(g);
    expect(g, `${token} = ${value} must lean warm (G > B, no cool grays)`).toBeGreaterThan(b);
  }
});

test("depth whispers: shadow tokens are the Kami values, not Astryx hard stacks", async ({
  page,
}) => {
  await page.goto("/foundations/elevation");
  const shadows = await page.evaluate(() => {
    const s = getComputedStyle(document.querySelector("main")!);
    return {
      low: s.getPropertyValue("--shadow-low"),
      med: s.getPropertyValue("--shadow-med"),
      high: s.getPropertyValue("--shadow-high"),
    };
  });
  // The browser resolves light-dark() into hex8 (#0000000d = 5% black whisper,
  // #0000003d = the 24% dark-mode variant)
  const whisper = isDark()
    ? /0 4px 24px (rgba\(0, ?0, ?0, ?0\.24\)|#0000003d)/
    : /0 4px 24px (rgba\(0, ?0, ?0, ?0\.05\)|#0000000d)/;
  expect(shadows.low).toMatch(whisper);
  expect(shadows.med).toMatch(whisper);
  expect(shadows.high).toContain("8px 24px");
  // Astryx's stock shadows are stacked multi-layer values — a layer comma means drift
  expect(shadows.low).not.toMatch(/\)\s*,|px\s*,/);
  expect(shadows.low).not.toContain("0px 1px 1px");
});

test("status feedback stays warm-toned (no stock green/crimson leaks)", async ({ page }) => {
  await page.goto("/foundations/color");
  const status = await page.evaluate(() => {
    const read = (prop: string) => {
      const el = document.createElement("span");
      el.style.color = `var(${prop})`;
      document.body.appendChild(el);
      const value = getComputedStyle(el).color;
      el.remove();
      return value;
    };
    return {
      success: read("--color-success"),
      warning: read("--color-warning"),
      error: read("--color-error"),
      onWarning: read("--color-on-warning"),
    };
  });
  const rgb = (v: string) => v.match(/\d+/g)!.map(Number);
  // success is olive (green channel leads but red stays close — never neon green)
  const [sr, sg] = rgb(status.success);
  expect(sg).toBeGreaterThan(sr * 0.8);
  expect(sr).toBeGreaterThan(sg * 0.6);
  // error is warm brick: red leads, blue trails far behind (never crimson/pink)
  const [er, , eb] = rgb(status.error);
  expect(er).toBeGreaterThan(eb * 2);
  // on-warning is the warm near-black, not Astryx's cool #0A1317
  const [wr, wg, wb] = rgb(status.onWarning);
  expect(wr).toBeGreaterThanOrEqual(wg);
  expect(wg).toBeGreaterThanOrEqual(wb);
});

test("keyboard focus is visible and ink-colored", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab"); // skip link
  await page.keyboard.press("Tab"); // first nav link
  const outline = await page.evaluate(() => {
    const el = document.activeElement!;
    const s = getComputedStyle(el);
    return { color: s.outlineColor, width: s.outlineWidth, tag: el.tagName };
  });
  expect(outline.width).not.toBe("0px");
  expect(outline.color).toBe(EXPECTED[isDark() ? "dark" : "light"].accentText);
});
