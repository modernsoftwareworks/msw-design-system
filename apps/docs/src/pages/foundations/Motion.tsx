import { PageHeader } from "../../components/PageHeader";
import "./foundations.css";

export function Motion() {
  return (
    <article>
      <PageHeader
        eyebrow="06 · Motion"
        title="Motion"
        lede="Motion is quiet — short durations, one easing curve, nothing bounces."
      />

      <section className="section" aria-labelledby="duration-label">
        <h2 className="section-label" id="duration-label">
          Duration &amp; easing
        </h2>
        <div className="kv-rows">
          <div className="kv-row">
            <code className="kv-name">--duration-fast</code>
            <span className="kv-value">175ms — hovers, focus rings</span>
          </div>
          <div className="kv-row">
            <code className="kv-name">--duration-medium</code>
            <span className="kv-value">410ms — panels, transitions</span>
          </div>
          <div className="kv-row">
            <code className="kv-name">--duration-slow</code>
            <span className="kv-value">975ms — page-level reveals</span>
          </div>
          <div className="kv-row">
            <code className="kv-name">--ease-standard</code>
            <span className="kv-value">cubic-bezier(0.24, 1, 0.4, 1)</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="demo-label">
        <h2 className="section-label" id="demo-label">
          Live demo
        </h2>
        <div className="motion-demo-wrap">
          <button
            type="button"
            className="motion-demo"
            aria-label="Motion sample: lifts on hover and focus"
          />
          <p className="section-note">
            Hover or focus the box — translateY and surface change over var(--duration-medium)
            var(--ease-standard). Reduced motion keeps a color change only.
          </p>
        </div>
      </section>
    </article>
  );
}
