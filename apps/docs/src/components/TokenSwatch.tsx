import type { CSSProperties } from "react";
import "./tokenswatch.css";

/** Preview kind is read from the token's own prefix — one component, no variants prop. */
function previewStyle(token: string): CSSProperties {
	if (token.startsWith("--color-")) return { background: `var(${token})` };
	if (token.startsWith("--radius-")) {
		return { borderRadius: `var(${token})`, background: "var(--color-background-muted)" };
	}
	if (token.startsWith("--shadow-")) return { boxShadow: `var(${token})` };
	return {};
}

export function TokenSwatch({ token, note }: { token: string; note?: string }) {
	return (
		<div className="token-swatch">
			<div className="token-preview" style={previewStyle(token)} />
			<code className="token-name">{token}</code>
			{note && <p className="token-note">{note}</p>}
		</div>
	);
}
