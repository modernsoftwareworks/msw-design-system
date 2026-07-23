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
