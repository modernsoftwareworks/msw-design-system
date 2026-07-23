# MSW Design System

The Modern Software Works design system: [Astryx](https://astryx.atmeta.com/) components skinned in the
[Kami](https://kami.tw93.fun/) visual language — warm parchment, a single ink-blue accent, serif-led hierarchy.

- `packages/theme` — `@modernsoftwareworks/msw-theme`, one `defineTheme()` file compiled with the Astryx CLI
- `packages/ui` — `@modernsoftwareworks/msw-ui`, the full Astryx catalog re-exported behind `MswProvider`
- `apps/docs` — the showcase and documentation site

```sh
pnpm install
pnpm dev        # docs site
pnpm build      # theme → ui → docs
```

Requires Node ≥ 22 and pnpm 11.

## Using the published packages

Both packages are published publicly to GitHub Packages. GitHub's npm registry requires
authentication even for public packages, so consumers need a personal access token with
`read:packages` and this in their project's `.npmrc`:

```ini
@modernsoftwareworks:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```sh
pnpm add @modernsoftwareworks/msw-ui react@^19 react-dom@^19
```

```tsx
import { MswProvider, Button } from "@modernsoftwareworks/msw-ui";

export function App() {
  return (
    <MswProvider>
      <Button label="Hello MSW" />
    </MswProvider>
  );
}
```

For apps that only need the theme wrapper (and import components separately, or from a
lazy route), use the provider subpath so the full catalog is not pulled into the shell:

```tsx
import { MswProvider } from "@modernsoftwareworks/msw-ui/provider";
```

Note: `@modernsoftwareworks/msw-ui` ships TypeScript source (the same distribution model as
Astryx itself) — Vite handles it out of the box; webpack/Next users should add it to
`transpilePackages`.

## Quality gates

CI enforces the design decisions in [`docs/DECISIONS.md`](./docs/DECISIONS.md) and the visual system in [`DESIGN.md`](./DESIGN.md):

| Gate                                   | Command                      | Threshold                       |
| -------------------------------------- | ---------------------------- | ------------------------------- |
| Unit + theme contrast / Kami pins      | `pnpm test`                  | all pass                        |
| Docs main bundle budget                | `pnpm run test:bundle`       | provider-only main entry        |
| Shell import guard (react-scan static) | `pnpm run test:react-scan`   | no full-catalog barrel in shell |
| Playwright + axe                       | `pnpm run test:a11y`         | 0 serious/critical              |
| Lighthouse CI                          | `pnpm run test:lighthouse`   | a11y ≥95, perf ≥90              |
| react-doctor                           | `pnpm run test:react-doctor` | score ≥ baseline                |

Run `pnpm build` before bundle/a11y/lighthouse. Design context for agents: `PRODUCT.md` + `DESIGN.md`.

## Releasing

Merges to `main` run [changesets](https://github.com/changesets/changesets): add a changeset
with `pnpm changeset`, merge, and the release workflow versions and publishes automatically.
