import "./home.css";

export function Home() {
	return (
		<article>
			<p className="eyebrow">00 · Overview</p>
			<h1 className="hero-title">
				MSW <span className="hero-accent">Design System</span>
			</h1>
			<p className="hero-tagline">
				Astryx components on warm parchment — a single ink-blue accent, serif-led hierarchy, and
				depth that whispers instead of shouting.
			</p>
			<div className="hero-tokens">
				<span className="hero-token">160+ components</span>
				<span className="hero-token">97 token overrides</span>
				<span className="hero-token">light &amp; dark</span>
			</div>
		</article>
	);
}
