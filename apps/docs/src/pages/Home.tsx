import { Link } from "react-router";
import { PageHeader } from "../components/PageHeader";
import "./home.css";

const PATHS = [
  {
    to: "/principles",
    title: "Principles",
    body: "Ten Kami invariants and the four places MSW extends them for interactive UI.",
  },
  {
    to: "/foundations/color",
    title: "Foundations",
    body: "Color, type, space, shape, elevation, and motion — live tokens on parchment.",
  },
  {
    to: "/components/forms",
    title: "Components",
    body: "Astryx catalog demos under MswProvider: forms, data, overlays, and more.",
  },
] as const;

export function Home() {
  return (
    <article>
      <PageHeader
        size="display"
        eyebrow="Overview"
        title="MSW Design System"
        lede="Astryx components on warm parchment — a single ink-blue accent, serif-led hierarchy, and depth that whispers instead of shouting."
      />
      <ul className="home-qualities" aria-label="System qualities">
        <li>Parchment canvas</li>
        <li>Ink-blue accent</li>
        <li>Serif hierarchy</li>
        <li>Whisper depth</li>
      </ul>
      <nav className="home-paths" aria-label="Start here">
        {PATHS.map((path) => (
          <Link key={path.to} className="home-path" to={path.to}>
            <span className="home-path-title">{path.title}</span>
            <span className="home-path-body">{path.body}</span>
          </Link>
        ))}
      </nav>
      <div className="home-install-wrap">
        <p className="home-install-hint">Install · scroll if the line runs long</p>
        <pre className="home-install">
          <code>pnpm add @modernsoftwareworks/msw-ui react@^19 react-dom@^19</code>
        </pre>
      </div>
    </article>
  );
}
