# Product

## Register

product

## Users

Engineers and designers at Modern Software Works who build product UI with Astryx components. They open the docs site when choosing tokens, checking a component demo, or confirming Kami visual rules. Context is task-focused: “what color is secondary text,” “how does Button look,” “is dark mode still parchment-dark.”

## Product Purpose

MSW Design System is the Kami visual language (warm parchment, single ink-blue accent, serif-led hierarchy) applied as an Astryx theme and thin provider wrapper, with a documentation site that showcases foundations and the full component catalog.

Success means:

- Teams ship UI that looks like one product, not default Astryx plus ad-hoc CSS
- Kami invariants and deliberate MSW deviations are documented and CI-enforced
- Docs are clear, accessible (WCAG 2.2 AA), and fast enough that demos feel trustworthy

## Brand Personality

Editorial · restrained · paper-honest

Calm confidence over flash. Depth whispers; emphasis is scarce ink-blue, never rainbow decoration. The system should feel like a well-typeset document that happens to be interactive.

## Anti-references

- Generic SaaS cream dashboards with purple gradients and glass cards
- Cool blue-gray Material/Fluent defaults
- Multi-accent rainbow status chrome used as decoration
- Hard drop shadows, bounce motion, bold synthetic serif weights
- Inventory-style hero metrics that shout “160 components” without teaching the system

## Design Principles

1. **Practice what you preach** — the docs site must obey the same Kami tokens and accessibility bar as consumer apps.
2. **Show, don’t tell** — foundations pages and gallery demos teach better than long prose.
3. **Scarce accent** — ink-blue carries focus; warm neutrals carry rhythm.
4. **Decisions are locks** — intentional Kami choices and MSW deviations are encoded in tests so Astryx/Kami upgrades cannot silently drift.
5. **Quiet motion** — short durations, one easing curve, full reduced-motion support.

## Accessibility & Inclusion

- Target **WCAG 2.2 AA** for theme text pairs (light and dark) and the docs shell
- Visible focus rings (ink ring), skip link, keyboard-reachable mode toggle
- `prefers-reduced-motion: reduce` honored for shell and foundation demos
- Touch targets on primary nav and controls ≥ 44×44px where practical
- No reliance on color alone for feedback (status colors stay feedback-only and warm-toned)
