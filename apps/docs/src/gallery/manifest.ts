/**
 * Component gallery manifest — M6.
 *
 * Reconciled against `pnpm --filter @modernsoftwareworks/msw-theme exec astryx component --json`
 * (150 cataloged components) union the actual named exports of
 * `@astryxdesign/core` (423 exports; 167 look like components by name).
 * Hooks (`use*`) and providers/contexts are excluded per the milestone brief.
 * Every remaining candidate is either listed below or in OMITTED with a reason —
 * see that export for the full accounting (169 candidates = 95 included + 74 omitted).
 */

export type GallerySection = {
  slug: string;
  title: string;
  components: string[];
};

export const GALLERY: GallerySection[] = [
  {
    slug: "forms",
    title: "Forms & Inputs",
    components: [
      "Button",
      "ButtonGroup",
      "IconButton",
      "ToggleButton",
      "ToggleButtonGroup",
      "CheckboxInput",
      "CheckboxList",
      "RadioList",
      "Switch",
      "Slider",
      "TextInput",
      "TextArea",
      "NumberInput",
      "DateInput",
      "DateRangeInput",
      "DateTimeInput",
      "TimeInput",
      "Calendar",
      "FileInput",
      "Selector",
      "MultiSelector",
      "Typeahead",
      "Tokenizer",
      "InputGroup",
      "Field",
      "SegmentedControl",
    ],
  },
  {
    slug: "data",
    title: "Data Display",
    components: [
      "Table",
      "List",
      "Card",
      "ClickableCard",
      "SelectableCard",
      "Badge",
      "StatusDot",
      "Avatar",
      "AvatarGroup",
      "Thumbnail",
      "MetadataList",
      "Skeleton",
      "ProgressBar",
      "Spinner",
      "Kbd",
      "Token",
      "EmptyState",
      "Timestamp",
      "TreeList",
      "Icon",
    ],
  },
  {
    slug: "overlays",
    title: "Overlays & Feedback",
    components: [
      "Dialog",
      "AlertDialog",
      "Popover",
      "HoverCard",
      "Tooltip",
      "Toast",
      "Banner",
      "ContextMenu",
      "DropdownMenu",
      "Overlay",
      "Lightbox",
      "Collapsible",
      "CollapsibleGroup",
      "MoreMenu",
    ],
  },
  {
    slug: "navigation",
    title: "Navigation & Search",
    components: [
      "TopNav",
      "SideNav",
      "Breadcrumbs",
      "TabList",
      "TabMenu",
      "Pagination",
      "CommandPalette",
      "Toolbar",
      "OverflowList",
    ],
  },
  {
    slug: "layout",
    title: "Layout & Structure",
    components: [
      "Grid",
      "HStack",
      "VStack",
      "Stack",
      "Section",
      "Divider",
      "AspectRatio",
      "Center",
      "AppShell",
      "Layout",
      "FormLayout",
      "ResizeHandle",
    ],
  },
  {
    slug: "content",
    title: "Content & Typography",
    components: [
      "Text",
      "Heading",
      "Link",
      "Blockquote",
      "Code",
      "CodeBlock",
      "Markdown",
      "Citation",
      "Outline",
    ],
  },
  {
    slug: "media",
    title: "Media & Communication",
    components: ["Carousel", "ChatMessage", "ChatMessageList", "ChatComposer", "ChatSystemMessage"],
  },
];

/**
 * Components deliberately left out of the gallery, with a reason each —
 * per the milestone brief, no silent omissions. Most are sub-parts that only
 * make sense composed inside a parent (and several of those ARE rendered,
 * uncredited, inside that parent's example in examples.tsx); a few are
 * providers/utilities/contexts that render no independent visual; two are
 * components the CLI catalog and package exports disagreed on how to
 * classify (see the report for detail).
 */
export const OMITTED: { name: string; reason: string }[] = [
  // --- Forms & Inputs sub-parts ---
  { name: "CheckboxListItem", reason: "Sub-part of CheckboxList; composed within its example." },
  { name: "RadioListItem", reason: "Sub-part of RadioList; composed within its example." },
  {
    name: "SelectorOption",
    reason:
      "Describes the shape of Selector/MultiSelector's `options` array; not a separate component to render on its own — their examples pass plain strings or option objects directly.",
  },
  {
    name: "TypeaheadItem",
    reason:
      "Optional render-item slot for Typeahead's dropdown rows; the Typeahead example here uses the default row rendering, so it isn't exercised directly.",
  },
  {
    name: "BaseTypeahead",
    reason:
      'Unstyled headless combobox engine underlying Typeahead ("no wrapper div, no border styling" per its own docs). Typeahead is the styled, field-integrated component meant for direct use.',
  },
  {
    name: "FieldLabel",
    reason:
      "Low-level sub-part Field renders internally from its own `label` prop; not composed separately by consumers.",
  },
  {
    name: "FieldStatus",
    reason:
      "Low-level sub-part Field renders internally from its own `status` prop; not composed separately by consumers.",
  },
  { name: "InputGroupText", reason: "Sub-part of InputGroup; composed within its example." },
  {
    name: "SegmentedControlItem",
    reason: "Sub-part of SegmentedControl; composed within its example.",
  },
  {
    name: "InputClearButton",
    reason:
      "Internal input-decoration primitive (the clear button inside TextInput/Typeahead); not used standalone.",
  },

  // --- Data Display sub-parts ---
  { name: "ListItem", reason: "Sub-part of List; composed within its example." },
  {
    name: "TableCell",
    reason: "Sub-part of Table; Table's data+columns API renders these internally.",
  },
  { name: "TableHeaderCell", reason: "Sub-part of Table; rendered internally by Table." },
  { name: "TableRow", reason: "Sub-part of Table; rendered internally by Table." },
  {
    name: "TableBody",
    reason:
      "Sub-part of Table (children-composition mode); Table is demoed via its data-driven mode instead.",
  },
  {
    name: "TableFooter",
    reason: "Sub-part of Table (children-composition mode); not needed for the data-driven demo.",
  },
  {
    name: "TableHeader",
    reason: "Sub-part of Table (children-composition mode); not needed for the data-driven demo.",
  },
  { name: "MetadataListItem", reason: "Sub-part of MetadataList; composed within its example." },
  {
    name: "AvatarGroupOverflow",
    reason:
      "Overflow-count chip meaningful only layered inside a real AvatarGroup stack; the CLI gave no playground example to confirm its prop shape confidently, so it is left out of the AvatarGroup demo rather than guessed.",
  },
  {
    name: "AvatarStatusDot",
    reason:
      "Status-dot overlay meant to be passed into Avatar's `status` slot; the CLI gave no playground example to confirm its prop shape confidently, so it is left out of the Avatar demo rather than guessed.",
  },

  // --- Overlays & Feedback sub-parts ---
  {
    name: "DialogHeader",
    reason:
      "Title/close-row subcomponent of Dialog; Dialog's own documented playground composes Heading/Text directly instead, so DialogHeader isn't needed for a representative demo.",
  },
  {
    name: "DropdownMenuItem",
    reason: "Sub-part of DropdownMenu; the items-array API renders these internally.",
  },
  {
    name: "ContextMenuItem",
    reason: "Sub-part of ContextMenu; the items-array API renders these internally.",
  },

  // --- Navigation & Search sub-parts ---
  { name: "Tab", reason: "Sub-part of TabList/TabMenu; composed within the TabList example." },
  { name: "BreadcrumbItem", reason: "Sub-part of Breadcrumbs; composed within its example." },
  {
    name: "SideNavCollapseButton",
    reason:
      "Sub-part of SideNav (collapsible-mode trigger); the SideNav example here keeps to a simple item list and does not exercise collapsible mode.",
  },
  {
    name: "SideNavHeading",
    reason:
      "Sub-part of SideNav (heading slot within a section); the SideNav example here keeps to a simple item list.",
  },
  {
    name: "SideNavItem",
    reason: "Sub-part of SideNav; composed within its example (and the AppShell example).",
  },
  {
    name: "SideNavSection",
    reason:
      "Sub-part of SideNav (grouped-section slot); the SideNav example here keeps to a simple item list.",
  },
  {
    name: "TopNavHeading",
    reason: "Sub-part of TopNav; composed within its example (and the AppShell example).",
  },
  {
    name: "TopNavItem",
    reason:
      "Sub-part of TopNav (nav-link slot); the TopNav example here only exercises the heading slot.",
  },
  {
    name: "TopNavMegaMenu",
    reason:
      "Sub-part of TopNav; a full mega-menu composition is too heavy for a single gallery card.",
  },
  {
    name: "TopNavMegaMenuFeaturedCard",
    reason: "Sub-part of TopNav's mega menu; see TopNavMegaMenu.",
  },
  { name: "TopNavMegaMenuItem", reason: "Sub-part of TopNav's mega menu; see TopNavMegaMenu." },
  {
    name: "TopNavMenu",
    reason:
      "Sub-part of TopNav (dropdown nav-item slot); the TopNav example here only exercises the heading slot.",
  },
  {
    name: "NavIcon",
    reason:
      "Thin icon-slot wrapper for nav items; not exercised by the TopNav/SideNav examples here, not independently meaningful on its own.",
  },
  { name: "MobileNavToggle", reason: "Trigger sub-part of MobileNav; see MobileNav." },
  {
    name: "MobileNav",
    reason:
      "The CLI returned no prop docs or playground example for this component, and it renders only below a mobile viewport breakpoint via internal responsive CSS — it would appear empty in a desktop-width gallery card regardless of props passed.",
  },
  {
    name: "CommandPaletteEmpty",
    reason: "Sub-part of CommandPalette (empty-results slot); rendered internally by default.",
  },
  {
    name: "CommandPaletteFooter",
    reason: "Sub-part of CommandPalette (default footer slot); rendered internally by default.",
  },
  {
    name: "CommandPaletteGroup",
    reason: "Sub-part of CommandPalette; used to group items within its example.",
  },
  {
    name: "CommandPaletteInput",
    reason: "Sub-part of CommandPalette (default input slot); rendered internally by default.",
  },
  {
    name: "CommandPaletteItem",
    reason: "Sub-part of CommandPalette; rendered internally from searchSource results.",
  },
  { name: "CommandPaletteList", reason: "Sub-part of CommandPalette; rendered internally." },
  {
    name: "NavHeadingMenu",
    reason: "Internal nav-heading dropdown sub-part; no standalone usage documented.",
  },
  {
    name: "NavHeadingMenuItem",
    reason: "Internal nav-heading dropdown sub-part; no standalone usage documented.",
  },
  { name: "NavMenuItem", reason: "Internal nav sub-part; no standalone usage documented." },
  {
    name: "PowerSearch",
    reason:
      "Complex filter-token query builder (PowerSearchConfig/PowerSearchFilter). The CLI provided no playground example, and the only config builder in the package is a hook (usePowerSearchConfig) rather than a plain factory, so a correct static demo could not be safely hand-built without risking a broken example.",
  },
  { name: "PowerSearchFilterEditor", reason: "Sub-part of PowerSearch; see PowerSearch." },
  { name: "PowerSearchToken", reason: "Sub-part of PowerSearch; see PowerSearch." },

  // --- Layout & Structure sub-parts ---
  {
    name: "GridSpan",
    reason: "Sub-part of Grid (a grid-item span wrapper); no standalone meaning outside a Grid.",
  },
  {
    name: "StackItem",
    reason:
      "Sub-part of Stack; the Stack example here uses plain children instead (Stack’s own prop docs were incomplete, so the safest common-denominator API was used).",
  },
  { name: "LayoutContent", reason: "Sub-part of Layout; composed within its example." },
  { name: "LayoutFooter", reason: "Sub-part of Layout; composed within its example." },
  { name: "LayoutHeader", reason: "Sub-part of Layout; composed within its example." },
  {
    name: "LayoutPanel",
    reason:
      "Sub-part of Layout (side-panel slot); the Layout example here only exercises header/content/footer.",
  },

  // --- Media & Communication sub-parts ---
  {
    name: "ChatComposerDrawer",
    reason: "Sub-part of ChatComposer's drawer slot; not independently meaningful.",
  },
  {
    name: "ChatComposerInput",
    reason:
      "Sub-part of ChatComposer's input slot; the ChatComposer example composes a plain input in that slot.",
  },
  {
    name: "ChatDictationButton",
    reason:
      "Niche action sub-part for a ChatComposer action slot; not exercised by the minimal ChatComposer example here.",
  },
  {
    name: "ChatLayout",
    reason:
      "Full chat-page layout shell — needs a scrollable message list and composer wired together, out of scope for a single gallery card.",
  },
  { name: "ChatLayoutScrollButton", reason: "Sub-part of ChatLayout; see ChatLayout." },
  {
    name: "ChatMessageMetadata",
    reason:
      "Optional timestamp/status sub-part for ChatMessage; the minimal ChatMessage example here omits it.",
  },
  {
    name: "ChatSendButton",
    reason:
      "Optional send-button override for ChatComposer; the minimal ChatComposer example here uses the default.",
  },
  {
    name: "ChatTokenizedText",
    reason: "Sub-part for rendering tokenized/highlighted message text; niche to demo alone.",
  },
  {
    name: "ChatToolCalls",
    reason: "Sub-part for rendering tool-call traces inside a message; niche to demo alone.",
  },
  {
    name: "ChatComposerTokenElement",
    reason: "Internal token-rendering sub-part of ChatComposerInput.",
  },
  {
    name: "ChatMessageBubble",
    reason:
      'Bubble-rendering sub-part that ChatMessage composes internally; not something a consumer renders separately. Note: the CLI --json catalog mis-grouped this component under a leaked Chinese prop-description string instead of "Chat" — see report.',
  },

  // --- Providers / utilities / non-visual (excluded per "no hooks or providers") ---
  {
    name: "Theme",
    reason:
      "The theme-application primitive — MswProvider already wraps the whole app in Theme, so it is not an independent gallery-demoable visual component.",
  },
  {
    name: "InternationalizationProvider",
    reason:
      "Provider (excluded per instructions); configures locale context, renders nothing itself.",
  },
  {
    name: "LinkProvider",
    reason:
      "Provider (excluded per instructions); configures the link-rendering context, renders nothing itself.",
  },
  {
    name: "MediaTheme",
    reason:
      'Media-query-scoped theme wrapper, grouped by the CLI itself under "Utilities" alongside the other providers; not a visual component.',
  },
  {
    name: "SyntaxTheme",
    reason:
      'Syntax-highlighting theme/config object (CLI category "Utility"); not a visual component.',
  },
  {
    name: "Item",
    reason:
      "Generic low-level list-item primitive. The CLI returned no prop docs and no playground example for it, and it is consumed internally by List/menu-style components rather than used standalone.",
  },
  {
    name: "VisuallyHidden",
    reason:
      "Renders no visible output by design (a screen-reader-only text primitive) — a demo card would always appear empty.",
  },
];
