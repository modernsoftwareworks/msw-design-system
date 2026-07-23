import type { ReactNode } from "react";
import "./pageheader.css";

export function PageHeader({
  eyebrow,
  title,
  lede,
  size = "default",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  /** Home uses a larger display title; other pages stay at the doc scale. */
  size?: "default" | "display";
  children?: ReactNode;
}) {
  return (
    <header className={`page-header${size === "display" ? " page-header-display" : ""}`}>
      {eyebrow ? <p className="page-eyebrow">{eyebrow}</p> : null}
      <h1 className="page-title">{title}</h1>
      {lede ? <p className="page-lede">{lede}</p> : null}
      {children}
    </header>
  );
}
