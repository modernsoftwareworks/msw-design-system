import type { CSSProperties } from "react";
import "./tokenswatch.css";

type PreviewKind = "fill" | "text" | "on-accent" | "border" | "radius" | "shadow";

function previewKind(token: string): PreviewKind {
  if (token === "--color-on-accent") return "on-accent";
  if (token.startsWith("--color-text") || token.startsWith("--color-icon")) {
    return "text";
  }
  if (token.startsWith("--color-border")) return "border";
  if (token.startsWith("--radius-")) return "radius";
  if (token.startsWith("--shadow-")) return "shadow";
  return "fill";
}

/** Canvas fills need a contrast stage so parchment-on-parchment stays legible. */
function isCanvasFill(token: string): boolean {
  return (
    token.startsWith("--color-background-") ||
    token === "--color-skeleton" ||
    token === "--color-track"
  );
}

function previewStyle(token: string, kind: PreviewKind): CSSProperties {
  switch (kind) {
    case "fill":
      return { background: `var(${token})` };
    case "text":
      return { color: `var(${token})`, background: "var(--color-background-body)" };
    case "on-accent":
      return { color: `var(${token})`, background: "var(--color-accent)" };
    case "border":
      return {
        background: "var(--color-background-body)",
        boxShadow: `inset 0 0 0 3px var(${token})`,
      };
    case "radius":
      return { borderRadius: `var(${token})`, background: "var(--color-background-muted)" };
    case "shadow":
      return {
        background: "var(--color-background-card)",
        boxShadow: `var(${token})`,
      };
    default:
      return {};
  }
}

export function TokenSwatch({ token, note }: { token: string; note?: string }) {
  const kind = previewKind(token);
  const showsGlyph = kind === "text" || kind === "on-accent";
  const stage = kind === "shadow" || kind === "border" || (kind === "fill" && isCanvasFill(token));

  return (
    <div className="token-swatch">
      <div
        className={`token-stage${stage ? " token-stage-contrast" : ""}${kind === "shadow" ? " token-stage-shadow" : ""}`}
        aria-hidden="true"
      >
        <div className={`token-preview token-preview-${kind}`} style={previewStyle(token, kind)}>
          {showsGlyph ? <span className="token-preview-text">Aa</span> : null}
          {kind === "border" ? <span className="token-preview-border-label">line</span> : null}
        </div>
      </div>
      <code className="token-name">{token}</code>
      {note ? <p className="token-note">{note}</p> : null}
    </div>
  );
}
