import "./foundations.css";

export function Motion() {
	return (
		<article>
			<p className="eyebrow">06 · Motion</p>
			<h2 className="page-title">Motion</h2>
			<p className="lede">Motion is quiet — short durations, one easing curve, nothing bounces.</p>

			<section className="section">
				<p className="section-label">Duration &amp; easing</p>
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

			<section className="section">
				<p className="section-label">Live demo</p>
				<div className="motion-demo-wrap">
					<div className="motion-demo" />
					<p className="section-note">
						Hover the box — translateY and surface change over var(--duration-medium)
						var(--ease-standard).
					</p>
				</div>
			</section>
		</article>
	);
}
