# Design System — MSW (Kami × Astryx)

Source of visual truth for `@modernsoftwareworks/msw-theme`, `@modernsoftwareworks/msw-ui`, and `apps/docs`.

## Overview

Warm parchment canvas, single ink-blue accent, serif hierarchy at weight 500, whisper shadows only. English uses Charter (serif) for headings and body. Interactive chrome is Astryx components themed through tokens — not a fork.

## Colors

| Role                      | Light               | Dark                                  | Token                                         |
| ------------------------- | ------------------- | ------------------------------------- | --------------------------------------------- |
| Body                      | `#f5f4ed` parchment | `#141413` deep-dark                   | `--color-background-body`                     |
| Surface / card            | `#faf9f5` ivory     | `#30302e`                             | `--color-background-surface` / `-card`        |
| Muted                     | `#e8e6dc` warm-sand | `#3a3934`                             | `--color-background-muted`                    |
| Text primary              | `#141413`           | `#faf9f5`                             | `--color-text-primary`                        |
| Text secondary            | `#3d3d3a`           | `#c0beb5` (AA on controls)            | `--color-text-secondary`                      |
| Text disabled             | `#6b6a64`           | ≥ AA on body (see tokens)             | `--color-text-disabled`                       |
| Accent (fills, rails)     | `#1B365D` ink-blue  | `#2D5A8A`                             | `--color-accent`                              |
| Accent as text/icon       | `#1B365D`           | `#84aad6` (Kami dark-syntax blue, AA) | `--color-text-accent` / `--color-icon-accent` |
| On accent                 | `#faf9f5`           | `#faf9f5`                             | `--color-on-accent`                           |
| Border soft               | `#e5e3d8`           | `#3d3c38`                             | `--color-border`                              |
| Success / warning / error | warm muted trio     | warmer lift                           | feedback only                                 |

Status companions are pinned warm too: `--color-*-muted` are translucencies of the MSW trio
(never Astryx's stock green/crimson), `--color-on-success/-error` are ivory, `--color-on-warning`
is warm near-black `#141413`, and `--color-shadow` is warm-neutral (never Astryx's navy tint).
Accent as _text_ uses `--color-text-accent` — plain `--color-accent` is reserved for fills,
rails, and outlines where 4.5:1 doesn't apply.

**Rules**

- Never pure white `#ffffff` or pure black `#000000` as canvas
- Neutrals are warm: in `rgb()`, R ≈ G > B
- One chromatic accent for UI emphasis; status colors are deliberate MSW extensions and must not decorate marketing chrome

## Typography

- **Body / heading family:** Charter, Georgia, CJK serif fallbacks
- **Web loading:** docs register local Charter via `@font-face { src: local(...) }` (`apps/docs/src/styles/fonts.css`). No remote webfont — systems without Charter fall back to Georgia (intentional cross-platform stand-in; not a second brand face)
- **Code:** JetBrains Mono, SF Mono, Consolas, Monaco
- **Heading weight:** 500 only (`--font-weight-semibold` remapped to 500)
- **Scale:** Astryx scale base 14 / ratio 1.2 for body and small steps; heading sizes are pinned to Kami exactly — H1 30/1.2, H2 22/1.25, H3 17/1.3 (`--text-heading-{1,2,3}-size/-leading`). Home display title: clamp ~32–44px
- **Line-height:** tight headlines 1.1–1.3, dense body ~1.43, reading ledes 1.5–1.55
- **Tracking:** short labels and overlines only; English body 0
- No italic for product chrome (Kami print rule; screen exceptions only if ever poetic)
- `font-synthesis: none` so browsers do not fake bold on serif

## Spacing

4px base grid. Use Astryx `--spacing-*` steps (4, 8, 12, 16, 24, 32, 48…). Docs shell: sidebar ~228px, prose measure max ~720px, main padding 64×72 desktop / 40×20 mobile.

## Shape

| Token                | ~px  | Use                |
| -------------------- | ---- | ------------------ |
| `--radius-inner`     | 4    | chips, tags        |
| `--radius-element`   | 8    | buttons, inputs    |
| `--radius-container` | 12   | cards, demo frames |
| `--radius-page`      | 28   | large frames       |
| `--radius-full`      | pill | rare               |

## Elevation

Whisper only:

- Low / med: `0 4px 24px` at 5% black (light) / stronger on dark
- High: softer 8px popover exception
- Focus: 2px ink outline, offset 2px — not hard drop shadows

## Motion

| Token               | Value                         | Use             |
| ------------------- | ----------------------------- | --------------- |
| `--duration-fast`   | 175ms                         | hover, focus    |
| `--duration-medium` | 410ms                         | panels          |
| `--duration-slow`   | 975ms                         | rare page-level |
| `--ease-standard`   | cubic-bezier(0.24, 1, 0.4, 1) | all standard UI |

`prefers-reduced-motion: reduce` → disable transform demos; keep opacity/instant only.

## Docs shell (Kami documentation pattern)

- Sticky sidebar, active link = **2px brand left rail** + accent text (not full-row fill)
- Skip link to `#main`
- Color mode cycle: system → light → dark
- Section labels may be uppercase tracked; page sequence markers (`01 · Color`) are sequential system docs, not marketing scaffolding

## Deliberate MSW deviations from pure Kami print

1. Semantic status colors (feedback only)
2. Full dark color scheme (not only dark sections)
3. Interaction states (hover lift whisper, focus ring)
4. Astryx component catalog as the interactive surface

## Anti-patterns (do not introduce)

- Cool grays, pure white page bg, multi-accent decoration
- Gradient text, glassmorphism as default, hard shadows, bounce easing
- Nested cards, side-stripe decoration on arbitrary cards (nav rail and Kami quote bars are intentional exceptions)
- Inventory hero metrics without teaching paths into the system
