import "./foundations.css";

const SCALE: Array<{ step: number; px: number }> = [
	{ step: 1, px: 4 },
	{ step: 2, px: 8 },
	{ step: 3, px: 12 },
	{ step: 4, px: 16 },
	{ step: 6, px: 24 },
	{ step: 8, px: 32 },
	{ step: 12, px: 48 },
];

export function Space() {
	return (
		<article>
			<p className="eyebrow">03 · Space</p>
			<h2 className="page-title">Space</h2>
			<p className="lede">
				Everything sits on a 4px grid. Padding, gaps, and margins are always a multiple of
				--spacing-1 — never an arbitrary pixel value.
			</p>

			<section className="section">
				<p className="section-label">Scale</p>
				<div className="space-rows">
					{SCALE.map(({ step, px }) => (
						<div className="space-row" key={step}>
							<code className="space-name">--spacing-{step}</code>
							<div className="space-bar" style={{ width: `var(--spacing-${step})` }} />
							<span className="space-px">{px}px</span>
						</div>
					))}
				</div>
			</section>
		</article>
	);
}
