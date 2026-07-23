/**
 * WCAG relative-luminance contrast helpers for theme token tests.
 * Operates on 6-digit hex only (theme source uses solid hex for text pairs).
 */

export function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) throw new Error(`Expected 6-digit hex, got ${hex}`);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg: string, bg: string): number {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

/** Warm neutral: R ≈ G > B (yellow-brown undertone). */
export function isWarmGray(hex: string, tolerance = 8): boolean {
  const [r, g, b] = parseHex(hex);
  return Math.abs(r - g) <= tolerance && r >= b && g >= b;
}

/** Extract [light, dark] from light-dark(#aaa, #bbb) token strings. */
export function lightDarkPair(value: string): [string, string] | null {
  const m = value.match(/light-dark\(\s*(#[0-9a-fA-F]{6})\s*,\s*(#[0-9a-fA-F]{6})\s*\)/);
  if (!m) return null;
  return [m[1], m[2]];
}
