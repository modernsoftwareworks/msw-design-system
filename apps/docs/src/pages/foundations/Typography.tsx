import "./foundations.css";

export function Typography() {
	return (
		<article>
			<p className="eyebrow">02 · Typography</p>
			<h2 className="page-title">Typography</h2>
			<p className="lede">
				Charter carries everything — headings locked to weight 500, never bold. Body 14px,
				line-height 1.55.
			</p>

			<section className="section">
				<p className="section-label">Scale</p>

				<div className="type-row">
					<h1 className="type-sample">Heading one</h1>
					<span className="type-label">24 / 500</span>
				</div>
				<div className="type-row">
					<h2 className="type-sample">Heading two</h2>
					<span className="type-label">20 / 500</span>
				</div>
				<div className="type-row">
					<h3 className="type-sample">Heading three</h3>
					<span className="type-label">17 / 500</span>
				</div>
				<div className="type-row">
					<h4 className="type-sample">Heading four</h4>
					<span className="type-label">14 / 500</span>
				</div>
				<div className="type-row">
					<h5 className="type-sample">Heading five</h5>
					<span className="type-label">12 / 500</span>
				</div>
				<div className="type-row">
					<h6 className="type-sample">Heading six</h6>
					<span className="type-label">10 / 500</span>
				</div>
				<div className="type-row">
					<p className="type-sample">Body copy sits at fourteen pixels with relaxed leading.</p>
					<span className="type-label">14 / 400</span>
				</div>
				<div className="type-row">
					<small className="type-sample">Small print and captions</small>
					<span className="type-label">12 / 400</span>
				</div>
				<div className="type-row">
					<code className="type-sample">var(--color-accent)</code>
					<span className="type-label">14 / mono</span>
				</div>
			</section>
		</article>
	);
}
