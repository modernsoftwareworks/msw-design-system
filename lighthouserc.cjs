module.exports = {
  ci: {
    collect: {
      startServerCommand:
        "pnpm --filter @modernsoftwareworks/docs run preview -- --host 127.0.0.1 --port 4173",
      startServerReadyPattern: "Local:|http://127.0.0.1:4173",
      url: [
        "http://127.0.0.1:4173/",
        "http://127.0.0.1:4173/principles",
        "http://127.0.0.1:4173/foundations/color",
        "http://127.0.0.1:4173/components/forms",
      ],
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".ci/reports/lighthouse",
    },
  },
};
