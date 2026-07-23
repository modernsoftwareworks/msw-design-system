import { describe, expect, it } from 'vitest';
import { mswTheme } from './msw';

describe('mswTheme', () => {
  it('pins the Kami ink-blue accent against HCT generation', () => {
    expect(mswTheme.tokens['--color-accent']).toBe('light-dark(#1B365D, #2D5A8A)');
    expect(mswTheme.tokens['--color-on-accent']).toBe('light-dark(#faf9f5, #faf9f5)');
  });

  it('sets the parchment canvas and warm surfaces', () => {
    expect(mswTheme.tokens['--color-background-body']).toBe('light-dark(#f5f4ed, #141413)');
    expect(mswTheme.tokens['--color-background-surface']).toBe('light-dark(#faf9f5, #30302e)');
    expect(mswTheme.tokens['--color-background-card']).toBe('light-dark(#faf9f5, #30302e)');
  });

  it('locks all six heading levels to weight 500 (medium)', () => {
    for (let level = 1; level <= 6; level++) {
      expect(mswTheme.tokens[`--text-heading-${level}-weight`]).toBe('var(--font-weight-medium)');
    }
  });

  it('replaces hard shadows with the Kami whisper shadow', () => {
    expect(mswTheme.tokens['--shadow-low']).toContain('0 4px 24px rgba(0,0,0,0.05)');
    expect(mswTheme.tokens['--shadow-med']).toContain('0 4px 24px rgba(0,0,0,0.05)');
  });

  it('leads every font stack with Kami families', () => {
    expect(mswTheme.tokens['--font-family-body']).toMatch(/^Charter, Georgia/);
    expect(mswTheme.tokens['--font-family-heading']).toMatch(/^Charter, Georgia/);
    expect(mswTheme.tokens['--font-family-code']).toMatch(/^"JetBrains Mono"/);
  });
});
