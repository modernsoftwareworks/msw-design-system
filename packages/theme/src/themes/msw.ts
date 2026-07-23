import { defineTheme } from '@astryxdesign/core/theme';

// Kami visual language (kami.tw93.fun) mapped onto Astryx tokens.
// Invariants: parchment canvas, single ink-blue accent, warm grays only (R≈G>B),
// serif hierarchy at weight 500, whisper shadows only. [light, dark] pairs throughout.

const serifFallbacks =
  'Georgia, "TsangerJinKai02", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", Palatino, serif';
const monoFallbacks = '"Fira Code", "SF Mono", Consolas, Monaco, monospace';

export const mswTheme = defineTheme({
  name: 'msw',
  // Generates var-based derived tokens (accent-muted etc.); every Kami-dictated
  // value is pinned explicitly in `tokens` below, which always wins over HCT generation.
  color: { accent: '#1B365D', neutralStyle: 'warm' },
  typography: {
    // Astryx defaults stated explicitly — `scale` must be present to activate the
    // heading-weight pipeline. base 14 / ratio 1.2 matches Kami body 14px / H3 17px.
    scale: { base: 14, ratio: 1.2 },
    body: { family: 'Charter', fallbacks: serifFallbacks },
    heading: { weight: 'medium' }, // family inherits body; Kami: headings locked to 500, never bold
    code: { family: 'JetBrains Mono', fallbacks: monoFallbacks },
  },
  radius: { base: 4, multiplier: 1 }, // Astryx defaults already equal Kami's 8px element / 12px container
  tokens: {
    // Kami: no 600 on serif — component chrome (table headers, labels) that asks for
    // semibold gets 500. True bold (700) is kept for genuine emphasis in user content.
    '--font-weight-semibold': '500',
    // Accent — pinned: the HCT generator "corrects" ink-blue to a brighter blue otherwise
    '--color-accent': ['#1B365D', '#2D5A8A'],
    '--color-on-accent': ['#faf9f5', '#faf9f5'], // ivory on ink, never pure white
    '--color-background-body': ['#f5f4ed', '#141413'], // parchment / deep-dark
    // surface and card are two separate Astryx levers — both take Kami ivory / dark-surface
    '--color-background-surface': ['#faf9f5', '#30302e'],
    '--color-background-card': ['#faf9f5', '#30302e'],
    '--color-background-popover': ['#faf9f5', '#30302e'],
    '--color-background-inverted': ['#141413', '#faf9f5'],
    '--color-background-muted': ['#e8e6dc', '#3a3934'], // warm-sand
    '--color-text-primary': ['#141413', '#faf9f5'],
    '--color-text-secondary': ['#3d3d3a', '#b0aea5'],
    '--color-text-disabled': ['#6b6a64', '#79756a'], // Kami's stone tier folds into Astryx's 3-slot text system
    '--color-icon-primary': ['#141413', '#faf9f5'],
    '--color-icon-secondary': ['#504e49', '#b0aea5'], // olive
    '--color-icon-disabled': ['#6b6a64', '#79756a'],
    // Astryx --color-border is the LOW-contrast default → Kami border-soft; -emphasized is the stronger one
    '--color-border': ['#e5e3d8', '#3d3c38'],
    '--color-border-emphasized': ['#e8e6dc', '#4a4944'],
    // Warm replacements for Astryx's cool-gray utility tokens (R≈G>B rule)
    '--color-skeleton': ['#d4d3cd', '#3a3934'],
    '--color-track': ['#e8e6dc', '#3a3934'],
    '--color-neutral': ['#1414131A', '#b0aea533'],
    '--color-overlay': ['#14141366', '#14141399'],
    '--color-overlay-hover': ['#1414130D', '#FFFFFF0D'],
    '--color-overlay-pressed': ['#1414131A', '#FFFFFF1A'],
    // Deliberate Kami deviation: warm muted status trio, feedback-only (Kami itself has one accent)
    '--color-success': ['#5c6b3f', '#7a8f56'],
    '--color-warning': ['#a67c3d', '#c99a54'],
    '--color-error': ['#8b4513', '#b25a1a'],
    // Kami depth: whisper shadow replaces Astryx's hard stacked defaults; high = popover exception
    '--shadow-low': ['0 4px 24px rgba(0,0,0,0.05)', '0 4px 24px rgba(0,0,0,0.24)'],
    '--shadow-med': ['0 4px 24px rgba(0,0,0,0.05)', '0 4px 24px rgba(0,0,0,0.24)'],
    '--shadow-high': ['0 8px 24px rgba(20,19,19,0.08)', '0 8px 24px rgba(0,0,0,0.32)'],
  },
});

export default mswTheme;
