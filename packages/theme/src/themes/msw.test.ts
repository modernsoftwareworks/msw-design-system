import { describe, expect, it } from "vite-plus/test";
import { mswTheme } from "./msw";
import { contrastRatio, isWarmGray, lightDarkPair, parseHex } from "./contrast";

const AA = 4.5;

function pair(token: string): [string, string] {
  const raw = mswTheme.tokens[token];
  expect(typeof raw).toBe("string");
  const p = lightDarkPair(raw as string);
  expect(p, `${token} should be light-dark(#hex, #hex)`).not.toBeNull();
  return p!;
}

describe("mswTheme", () => {
  it("pins the Kami ink-blue accent against HCT generation", () => {
    expect(mswTheme.tokens["--color-accent"]).toBe("light-dark(#1B365D, #2D5A8A)");
    expect(mswTheme.tokens["--color-on-accent"]).toBe("light-dark(#faf9f5, #faf9f5)");
  });

  it("sets the parchment canvas and warm surfaces", () => {
    expect(mswTheme.tokens["--color-background-body"]).toBe("light-dark(#f5f4ed, #141413)");
    expect(mswTheme.tokens["--color-background-surface"]).toBe("light-dark(#faf9f5, #30302e)");
    expect(mswTheme.tokens["--color-background-card"]).toBe("light-dark(#faf9f5, #30302e)");
  });

  it("locks all six heading levels to weight 500 (medium)", () => {
    for (let level = 1; level <= 6; level++) {
      expect(mswTheme.tokens[`--text-heading-${level}-weight`]).toBe("var(--font-weight-medium)");
    }
  });

  it("replaces hard shadows with the Kami whisper shadow", () => {
    expect(mswTheme.tokens["--shadow-low"]).toContain("0 4px 24px rgba(0,0,0,0.05)");
    expect(mswTheme.tokens["--shadow-med"]).toContain("0 4px 24px rgba(0,0,0,0.05)");
  });

  it("leads every font stack with Kami families", () => {
    expect(mswTheme.tokens["--font-family-body"]).toMatch(/^Charter, Georgia/);
    expect(mswTheme.tokens["--font-family-heading"]).toMatch(/^Charter, Georgia/);
    expect(mswTheme.tokens["--font-family-code"]).toMatch(/^"JetBrains Mono"/);
  });
});

describe("mswTheme contrast (WCAG AA)", () => {
  const surfaces = [
    "--color-background-body",
    "--color-background-surface",
    "--color-background-card",
  ] as const;

  const textTokens = [
    "--color-text-primary",
    "--color-text-secondary",
    "--color-text-disabled",
    "--color-icon-primary",
    "--color-icon-secondary",
    "--color-icon-disabled",
  ] as const;

  for (const mode of ["light", "dark"] as const) {
    const i = mode === "light" ? 0 : 1;

    for (const surface of surfaces) {
      for (const text of textTokens) {
        it(`${mode}: ${text} on ${surface} ≥ ${AA}:1`, () => {
          const fg = pair(text)[i];
          const bg = pair(surface)[i];
          const ratio = contrastRatio(fg, bg);
          expect(ratio, `${fg} on ${bg} = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(AA);
        });
      }
    }

    it(`${mode}: on-accent on accent ≥ ${AA}:1`, () => {
      const fg = pair("--color-on-accent")[i];
      const bg = pair("--color-accent")[i];
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(AA);
    });
  }
});

describe("mswTheme warm neutrals", () => {
  const neutrals = [
    "--color-background-body",
    "--color-background-surface",
    "--color-background-card",
    "--color-background-muted",
    "--color-text-primary",
    "--color-text-secondary",
    "--color-text-disabled",
    "--color-border",
    "--color-border-emphasized",
    "--color-skeleton",
    "--color-track",
  ] as const;

  for (const token of neutrals) {
    it(`${token} light+dark stay warm (R≈G≥B)`, () => {
      const [light, dark] = pair(token);
      expect(isWarmGray(light), `light ${light}`).toBe(true);
      expect(isWarmGray(dark), `dark ${dark}`).toBe(true);
    });
  }

  it("accent is chromatic ink-blue (not a warm gray)", () => {
    const [light, dark] = pair("--color-accent");
    const [lr, lg, lb] = parseHex(light);
    const [dr, dg, db] = parseHex(dark);
    // Blue channel dominates relative to warm neutrals
    expect(lb).toBeGreaterThan(lr);
    expect(db).toBeGreaterThan(dr);
    expect(lg).toBeLessThan(lb + 40);
    expect(dg).toBeLessThan(db + 40);
  });
});
