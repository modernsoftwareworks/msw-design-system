import { PageHeader } from "../../components/PageHeader";
import "./foundations.css";

const SAMPLES = [
  { className: "type-sample type-sample-h1", label: "24 / 500", text: "Heading one" },
  { className: "type-sample type-sample-h2", label: "20 / 500", text: "Heading two" },
  { className: "type-sample type-sample-h3", label: "17 / 500", text: "Heading three" },
  { className: "type-sample type-sample-h4", label: "14 / 500", text: "Heading four" },
  { className: "type-sample type-sample-h5", label: "12 / 500", text: "Heading five" },
  { className: "type-sample type-sample-h6", label: "10 / 500", text: "Heading six" },
  {
    className: "type-sample type-sample-body",
    label: "14 / 400",
    text: "Body copy sits at fourteen pixels with relaxed leading.",
  },
  {
    className: "type-sample type-sample-small",
    label: "12 / 400",
    text: "Small print and captions",
  },
  {
    className: "type-sample type-sample-code",
    label: "14 / mono",
    text: "var(--color-accent)",
  },
] as const;

export function Typography() {
  return (
    <article>
      <PageHeader
        eyebrow="02 · Typography"
        title="Typography"
        lede="Charter carries everything — headings locked to weight 500, never bold. Body 14px, line-height 1.55."
      />

      <section className="section" aria-labelledby="scale-label">
        <h2 className="section-label" id="scale-label">
          Scale
        </h2>
        {SAMPLES.map((row) => (
          <div className="type-row" key={row.label + row.text}>
            <p className={row.className}>{row.text}</p>
            <span className="type-label">{row.label}</span>
          </div>
        ))}
      </section>
    </article>
  );
}
