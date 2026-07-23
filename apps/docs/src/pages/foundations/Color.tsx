import { TokenSwatch } from '../../components/TokenSwatch';
import './foundations.css';

export function Color() {
  return (
    <article>
      <p className="eyebrow">01 · Color</p>
      <h2 className="page-title">Color</h2>
      <p className="lede">
        Warm parchment stands in for white, a single ink-blue accent carries all emphasis, and
        every gray leans warm. No cool grays, no pure black or white.
      </p>

      <section className="section">
        <p className="section-label">Canvas</p>
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

      <section className="section">
        <p className="section-label">Text</p>
        <div className="swatch-grid">
          <TokenSwatch token="--color-text-primary" note="Near black" />
          <TokenSwatch token="--color-text-secondary" note="Dark warm" />
          <TokenSwatch token="--color-text-disabled" note="Stone" />
        </div>
      </section>

      <section className="section">
        <p className="section-label">Accent</p>
        <div className="swatch-grid">
          <TokenSwatch token="--color-accent" note="Ink blue #1B365D / Ink light #2D5A8A" />
          <TokenSwatch token="--color-on-accent" />
        </div>
      </section>

      <section className="section">
        <p className="section-label">Lines</p>
        <div className="swatch-grid">
          <TokenSwatch token="--color-border" note="border-soft" />
          <TokenSwatch token="--color-border-emphasized" />
        </div>
      </section>

      <section className="section">
        <p className="section-label">Feedback</p>
        <div className="swatch-grid">
          <TokenSwatch token="--color-success" />
          <TokenSwatch token="--color-warning" />
          <TokenSwatch token="--color-error" />
        </div>
        <p className="section-note">
          Warm-toned, feedback only — a deliberate extension of Kami's single-accent rule.
        </p>
      </section>
    </article>
  );
}
