import { TokenSwatch } from '../../components/TokenSwatch';
import './foundations.css';

export function Elevation() {
  return (
    <article>
      <p className="eyebrow">05 · Elevation</p>
      <h2 className="page-title">Elevation</h2>
      <p className="lede">
        Depth whispers: one shadow value — 0 4px 24px at 5% black — plus a ring for focus. Hard
        drop shadows are forbidden.
      </p>

      <section className="section">
        <p className="section-label">Shadow</p>
        <div className="swatch-grid">
          <TokenSwatch token="--shadow-low" note="Default resting depth" />
          <TokenSwatch token="--shadow-med" note="Raised — menus, dropdowns" />
          <TokenSwatch token="--shadow-high" note="Popover exception" />
        </div>
      </section>
    </article>
  );
}
