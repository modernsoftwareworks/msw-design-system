import { PageHeader } from "../../components/PageHeader";
import { TokenSwatch } from "../../components/TokenSwatch";
import "./foundations.css";

export function Color() {
  return (
    <article>
      <PageHeader
        eyebrow="01 · Color"
        title="Color"
        lede="Warm parchment stands in for white, a single ink-blue accent carries all emphasis, and every gray leans warm. No cool grays, no pure black or white."
      />

      <section className="section" aria-labelledby="canvas-label">
        <h2 className="section-label" id="canvas-label">
          Canvas
        </h2>
        <div className="swatch-grid">
          <TokenSwatch
            token="--color-background-body"
            note="Parchment #f5f4ed / Deep dark #141413"
          />
          <TokenSwatch token="--color-background-surface" note="Ivory" />
          <TokenSwatch token="--color-background-card" />
          <TokenSwatch token="--color-background-muted" note="Warm sand" />
        </div>
      </section>

      <section className="section" aria-labelledby="text-label">
        <h2 className="section-label" id="text-label">
          Text
        </h2>
        <div className="swatch-grid">
          <TokenSwatch token="--color-text-primary" note="Near black" />
          <TokenSwatch token="--color-text-secondary" note="Dark warm" />
          <TokenSwatch token="--color-text-disabled" note="Stone" />
        </div>
      </section>

      <section className="section" aria-labelledby="accent-label">
        <h2 className="section-label" id="accent-label">
          Accent
        </h2>
        <div className="swatch-grid">
          <TokenSwatch token="--color-accent" note="Ink blue #1B365D / Ink light #2D5A8A" />
          <TokenSwatch token="--color-on-accent" />
        </div>
      </section>

      <section className="section" aria-labelledby="lines-label">
        <h2 className="section-label" id="lines-label">
          Lines
        </h2>
        <div className="swatch-grid">
          <TokenSwatch token="--color-border" note="border-soft" />
          <TokenSwatch token="--color-border-emphasized" />
        </div>
      </section>

      <section className="section" aria-labelledby="feedback-label">
        <h2 className="section-label" id="feedback-label">
          Feedback
        </h2>
        <div className="swatch-grid">
          <TokenSwatch token="--color-success" />
          <TokenSwatch token="--color-warning" />
          <TokenSwatch token="--color-error" />
        </div>
        <p className="section-note">
          Warm-toned, feedback only — a deliberate extension of Kami&apos;s single-accent rule.
        </p>
      </section>
    </article>
  );
}
