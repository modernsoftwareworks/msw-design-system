import { describe, expect, it } from "vite-plus/test";
import { GALLERY } from "./manifest";
import { EXAMPLES } from "./examples";

describe("gallery coverage", () => {
  it("lists unique components across sections", () => {
    const names = GALLERY.flatMap((s) => s.components);
    expect(new Set(names).size).toBe(names.length);
    expect(names.length).toBeGreaterThan(50);
  });

  it("provides a dedicated example for every listed component", () => {
    const missing = GALLERY.flatMap((s) => s.components).filter((name) => !EXAMPLES[name]);
    expect(missing, `missing examples: ${missing.join(", ")}`).toEqual([]);
  });
});
