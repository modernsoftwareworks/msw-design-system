import { PageHeader } from "../../components/PageHeader";
import { TokenSwatch } from "../../components/TokenSwatch";
import "./foundations.css";

export function Shape() {
  return (
    <article>
      <PageHeader
        eyebrow="04 · Shape"
        title="Shape"
        lede="Astryx defaults already match Kami — buttons/cards 8px, containers 12px."
      />

      <section className="section" aria-labelledby="radius-label">
        <h2 className="section-label" id="radius-label">
          Radius
        </h2>
        <div className="swatch-grid">
          <TokenSwatch token="--radius-inner" note="4px" />
          <TokenSwatch token="--radius-element" note="8px" />
          <TokenSwatch token="--radius-container" note="12px" />
          <TokenSwatch token="--radius-page" note="28px" />
          <TokenSwatch token="--radius-full" note="Pill / circle" />
        </div>
      </section>
    </article>
  );
}
