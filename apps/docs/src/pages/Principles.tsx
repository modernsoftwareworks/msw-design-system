import "./principles.css";

const INVARIANTS = [
  ["Parchment, never white", "The canvas is #f5f4ed. Pure white and cool grays read brittle."],
  ["One ink-blue accent", "#1B365D carries all emphasis — no second chromatic color."],
  ["Warm grays only", "Every gray leans yellow-brown: in rgb(), R ≈ G > B."],
  ["Serif carries hierarchy", "Charter for headings and body alike; sans is reserved for nothing."],
  ["Headings locked at 500", "No bold, no synthetic weights. Size and space make the hierarchy."],
  ["Measured line-heights", "Tight headlines 1.1–1.3, dense body 1.4–1.45, reading body 1.5–1.55."],
  ["Tracking only for labels", "Letter-spacing belongs to short uppercase labels, not body text."],
  ["Solid fills", "Tag and chip backgrounds are solid hex values, never translucent washes."],
  [
    "Depth whispers",
    "A ring for focus, one soft shadow for lift — hard drop shadows are forbidden.",
  ],
  ["No italic", "Emphasis comes from the accent color, not slanted type."],
] as const;

const DEVIATIONS = [
  [
    "Semantic status colors",
    "Kami permits a single accent; an interactive system needs feedback. Success, warning, and error are warm-toned, muted, and appear only as feedback — never decoration.",
  ],
  [
    "Full dark mode",
    "Kami alternates dark sections inside light documents. MSW promotes that vocabulary — deep dark #141413, warm charcoal surfaces, warm-silver text — to a complete color scheme.",
  ],
  [
    "Interaction states",
    "Print defines no hover. MSW adopts the Kami landing-page precedents: a whisper shadow with a one-pixel lift on hover, an ink ring on focus.",
  ],
  [
    "Component catalog",
    "The components are Astryx (Meta, MIT) — MSW is the Kami-flavored theme, wrapper, and documentation on top, not a fork.",
  ],
] as const;

export function Principles() {
  return (
    <article>
      <p className="fd-eyebrow">07 · Principles</p>
      <h2 className="fd-title">Principles</h2>
      <p className="fd-lede">
        Ten invariants inherited from the Kami visual language, and the four places MSW deliberately
        extends it for interactive UI.
      </p>

      <div className="pr-label">The ten invariants</div>
      <ol className="pr-list">
        {INVARIANTS.map(([title, body], i) => (
          <li className="pr-item" key={title}>
            <span className="pr-num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="pr-item-title">{title}</div>
              <p className="pr-item-body">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="pr-label">Deliberate deviations</div>
      <dl className="pr-devs">
        {DEVIATIONS.map(([title, body]) => (
          <div className="pr-dev" key={title}>
            <dt className="pr-item-title">{title}</dt>
            <dd className="pr-item-body pr-dev-body">{body}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
