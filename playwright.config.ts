/// <reference types="node" />
import { defineConfig, devices } from "@playwright/test";

// Quality gates run against the production build (preview, :4173) in both
// color schemes. The react-scan gate needs React's development internals,
// so it runs against a dev server (:5199) instead.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never", outputFolder: ".ci/reports/playwright" }]]
    : "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "quality-light",
      testMatch: /(a11y|kami-invariants)\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], colorScheme: "light" },
    },
    {
      name: "quality-dark",
      testMatch: /(a11y|kami-invariants)\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
    },
    {
      name: "react-scan",
      testMatch: /react-scan\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://127.0.0.1:5199",
      },
    },
  ],
  webServer: [
    {
      command:
        "pnpm --filter @modernsoftwareworks/docs run preview -- --host 127.0.0.1 --port 4173",
      url: "http://127.0.0.1:4173",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "pnpm --filter @modernsoftwareworks/docs run dev -- --host 127.0.0.1 --port 5199",
      url: "http://127.0.0.1:5199",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
