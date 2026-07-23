import { PageHeader } from "../../components/PageHeader";
import { TokenSwatch } from "../../components/TokenSwatch";
import "./foundations.css";

export function Elevation() {
  return (
    <article>
      <PageHeader
        eyebrow="05 · Elevation"
        title="Elevation"
        lede="Depth whispers: one shadow value — 0 4px 24px at 5% black — plus a ring for focus. Hard drop shadows are forbidden."
      />

      <section className="section" aria-labelledby="shadow-label">
        <h2 className="section-label" id="shadow-label">
          Shadow
        </h2>
        <div className="swatch-grid">
          <TokenSwatch token="--shadow-low" note="Default resting depth" />
          <TokenSwatch token="--shadow-med" note="Raised — menus, dropdowns" />
          <TokenSwatch token="--shadow-high" note="Popover exception" />
        </div>
      </section>
    </article>
  );
}
