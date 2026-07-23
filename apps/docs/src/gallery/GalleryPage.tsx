import { Component, type ComponentType, type ReactNode } from 'react';
import { useParams } from 'react-router';
import * as MswUI from '@modernsoftwareworks/msw-ui';
import { GALLERY, OMITTED } from './manifest';
import { EXAMPLES } from './examples';
import './gallery.css';

// Pragmatic cast: '@modernsoftwareworks/msw-ui' re-exports ~170 components with heterogeneous
// prop shapes, but this map is only ever used for the *bare* fallback render
// (zero props) — anything that needs real props has its own entry in
// EXAMPLES instead. Erasing the real per-component prop types to a single
// "no props" shape is accurate for how this map is actually used below.
const COMPONENTS = MswUI as unknown as Record<string, ComponentType<Record<string, never>>>;

const FALLBACK_TEXT = (name: string) => `${name}: render failed — needs an example`;

type ErrorBoundaryProps = { name: string; children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

/** Wraps one demo so a broken component can't take down the whole gallery page. */
class DemoErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error(`[gallery] ${this.props.name} failed to render`, error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <p className="demo-fallback">{FALLBACK_TEXT(this.props.name)}</p>;
    }
    return this.props.children;
  }
}

export function GalleryPage() {
  const { slug } = useParams();
  const section = GALLERY.find((candidate) => candidate.slug === slug);

  if (!section) {
    return (
      <article>
        <p className="eyebrow">Components</p>
        <h2 className="gallery-title">Section not found</h2>
        <p className="gallery-empty">There is no gallery section for &ldquo;{slug}&rdquo;.</p>
      </article>
    );
  }

  return (
    <article>
      <p className="eyebrow">Components · {section.title}</p>
      <h2 className="gallery-title">{section.title}</h2>
      <p className="gallery-count">{section.components.length} components</p>
      <div className="gallery-list">
        {section.components.map((name) => {
          const Example = EXAMPLES[name];
          const Bare = COMPONENTS[name];
          return (
            <section className="demo-block" key={name}>
              <p className="demo-label">{name}</p>
              <div className="demo-card">
                <DemoErrorBoundary name={name}>
                  {Example ? (
                    <Example />
                  ) : Bare ? (
                    <Bare />
                  ) : (
                    <p className="demo-fallback">{FALLBACK_TEXT(name)}</p>
                  )}
                </DemoErrorBoundary>
              </div>
            </section>
          );
        })}
      </div>
      <p className="gallery-foot">
        Beyond these demos, {OMITTED.length} further exports — sub-parts, providers, and hooks-only
        utilities — are composed inside the examples above or intentionally undemoed; each is
        catalogued with its reason in the gallery manifest.
      </p>
    </article>
  );
}
