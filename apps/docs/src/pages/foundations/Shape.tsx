import { TokenSwatch } from "../../components/TokenSwatch";
import "./foundations.css";

export function Shape() {
	return (
		<article>
			<p className="eyebrow">04 · Shape</p>
			<h2 className="page-title">Shape</h2>
			<p className="lede">
				Astryx defaults already match Kami — buttons/cards 8px, containers 12px.
			</p>

			<section className="section">
				<p className="section-label">Radius</p>
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
