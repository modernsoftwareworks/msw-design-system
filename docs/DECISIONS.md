# Design decisions (locked)

These decisions are enforced by tests and CI. Change deliberately, update tests and this file in the same PR.

## Kami invariants (keep)

| ID  | Decision                                                                     | Enforcement                                                        |
| --- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| K1  | Parchment `#f5f4ed` / deep-dark `#141413` body — never pure white            | Theme pin + contrast suite                                         |
| K2  | Numbered foundations markers (`01 · Color` …) for sequential system docs     | Docs convention; Home uses quieter entry without inventory metrics |
| K3  | Uppercase tracked labels only for nav groups and one section label per block | Docs CSS                                                           |
| K4  | Active nav = 2px brand left rail (Kami docs shell)                           | DocShell styles                                                    |
| K5  | Principles “deviations” use Kami quote left bar                              | `principles.css`                                                   |
| K7  | Semantic status colors exist but feedback-only                               | Theme tokens + Color page note                                     |
| K8  | Full dark mode                                                               | Theme light-dark pairs                                             |
| K9  | Charter serif for body and heading                                           | Theme font stack pins                                              |

## Impeccable conflicts accepted as brand

- Cream/parchment canvas is **Kami brand**, not accidental AI cream (see PRODUCT.md / DESIGN.md).
- Nav brand rail and quote bars are **Kami patterns**, not decorative card side-stripes.

## Accessibility

- WCAG 2.2 AA for text/icon pairs on body, surface, card (light + dark)
- Dark disabled text/icon must remain ≥ 4.5:1 on body
- Docs shell: skip link, single `h1` per route, `aria-current="page"`, focus-visible rings

## Performance

- Docs shell imports `@modernsoftwareworks/msw-ui/provider` only — never the full catalog barrel on every page
- Gallery route lazy-loads the full catalog
- Lighthouse: accessibility ≥ 95, performance ≥ 90 on docs production build
- Main docs entry JS budget: see `.ci/bundle-budget.json`

## CI gates

| Gate                    | Threshold                                                                                  | Script                       |
| ----------------------- | ------------------------------------------------------------------------------------------ | ---------------------------- |
| Unit + theme invariants | all pass                                                                                   | `vp test run`                |
| Axe (key routes)        | 0 serious/critical on shell + foundations; gallery excludes `.demo-card` (Astryx upstream) | `pnpm run test:a11y`         |
| Lighthouse              | a11y ≥95, perf ≥90                                                                         | `pnpm run test:lighthouse`   |
| Bundle budget           | main entry ≤ budget                                                                        | `pnpm run test:bundle`       |
| react-doctor            | score ≥ baseline                                                                           | `pnpm run test:react-doctor` |
| react-scan              | report; fail on configured thrash                                                          | `pnpm run test:react-scan`   |

Update baselines only with intentional review (`.ci/react-doctor-baseline`, `.ci/bundle-budget.json`).
