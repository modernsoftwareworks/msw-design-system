/**
 * Custom demos for components whose bare `<Component />` render would throw,
 * render empty, or otherwise fail to show anything meaningful — closed
 * overlays, data-driven components with no data, controlled inputs with no
 * value, and so on. Every shape below was taken from
 * `astryx component <Name> --json` (props + playground.defaults) or, where
 * that was incomplete, the package's own .d.ts files and doc comments.
 *
 * GalleryPage renders each of these as a real component (`<Example />`), not
 * a plain function call, so hooks (useState, useToast) below are legal.
 *
 * Content rule: realistic, quiet demo copy only — no lorem ipsum, no emoji,
 * no network requests (images are inline SVG data URIs).
 */
import { useState, type ReactElement } from "react";
import {
  AlertDialog,
  AppShell,
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Banner,
  Blockquote,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Carousel,
  Center,
  ChatComposer,
  ChatMessage,
  ChatMessageList,
  ChatSystemMessage,
  CheckboxInput,
  CheckboxList,
  CheckboxListItem,
  Citation,
  ClickableCard,
  Code,
  CodeBlock,
  Collapsible,
  CollapsibleGroup,
  CommandPalette,
  ContextMenu,
  Dialog,
  DateInput,
  DateRangeInput,
  DateTimeInput,
  Divider,
  DropdownMenu,
  EmptyState,
  Field,
  FileInput,
  FormLayout,
  Grid,
  Heading,
  HoverCard,
  HStack,
  Icon,
  IconButton,
  InputGroup,
  InputGroupText,
  Kbd,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  Lightbox,
  Link,
  List,
  ListItem,
  Markdown,
  MetadataList,
  MetadataListItem,
  MoreMenu,
  MultiSelector,
  NumberInput,
  Outline,
  Overlay,
  OverflowList,
  Pagination,
  Popover,
  ProgressBar,
  RadioList,
  RadioListItem,
  ResizeHandle,
  Section,
  SegmentedControl,
  SegmentedControlItem,
  Selector,
  SelectableCard,
  SideNav,
  SideNavItem,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  StatusDot,
  Switch,
  Tab,
  TabList,
  TabMenu,
  Table,
  Text,
  TextArea,
  TextInput,
  Thumbnail,
  TimeInput,
  Timestamp,
  Token,
  Tokenizer,
  Toolbar,
  Tooltip,
  TopNav,
  TopNavHeading,
  ToggleButton,
  ToggleButtonGroup,
  TreeList,
  Typeahead,
  VStack,
  createStaticSource,
  useToast,
} from "@modernsoftwareworks/msw-ui";

// A tiny inline abstract graphic — no network fetch, keeps Thumbnail/Lightbox
// demos self-contained. Warm, muted tones consistent with the Kami palette.
const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160">' +
      '<rect width="240" height="160" fill="#e8e6dc"/>' +
      '<circle cx="120" cy="80" r="30" fill="#c9c6b8"/>' +
      "</svg>",
  );

const PEOPLE_SOURCE = createStaticSource([
  { id: "ada", label: "Ada Lovelace" },
  { id: "grace", label: "Grace Hopper" },
  { id: "alan", label: "Alan Turing" },
  { id: "katherine", label: "Katherine Johnson" },
]);

// ---- Examples that need hooks, so they are declared as real components ----

function DialogExample(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="Open dialog" variant="secondary" onClick={() => setIsOpen(true)} />
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} isInline width={360}>
        <VStack gap={2}>
          <Heading level={3}>Publish changes?</Heading>
          <Text type="body">This updates the live documentation site for everyone.</Text>
          <HStack gap={2} justify="end">
            <Button label="Cancel" variant="secondary" onClick={() => setIsOpen(false)} />
            <Button label="Publish" variant="primary" onClick={() => setIsOpen(false)} />
          </HStack>
        </VStack>
      </Dialog>
    </>
  );
}

function AlertDialogExample(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="Delete item" variant="destructive" onClick={() => setIsOpen(true)} />
      <AlertDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isInline
        title="Delete item?"
        description="This action cannot be undone. The item and all its data will be permanently removed."
        actionLabel="Delete"
        onAction={() => setIsOpen(false)}
      />
    </>
  );
}

function ToastExample(): ReactElement {
  const toast = useToast();
  return (
    <Button
      label="Show toast"
      variant="secondary"
      onClick={() => toast({ body: "Changes saved." })}
    />
  );
}

function LightboxExample(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="Open lightbox" variant="secondary" onClick={() => setIsOpen(true)} />
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={{
          src: PLACEHOLDER_IMG,
          alt: "Abstract placeholder graphic",
          caption: "A quiet placeholder graphic.",
        }}
      />
    </>
  );
}

function CommandPaletteExample(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="Open command palette" variant="secondary" onClick={() => setIsOpen(true)} />
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isInline
        searchSource={PEOPLE_SOURCE}
      />
    </>
  );
}

function TabListExample(): ReactElement {
  const [value, setValue] = useState("overview");
  return (
    <TabList value={value} onChange={setValue}>
      <Tab value="overview" label="Overview" />
      <Tab value="activity" label="Activity" />
      <Tab value="settings" label="Settings" />
    </TabList>
  );
}

function TabMenuExample(): ReactElement {
  const [value, setValue] = useState("overview");
  return (
    <TabList value={value} onChange={setValue}>
      <Tab value="overview" label="Overview" />
      <Tab value="activity" label="Activity" />
      <TabMenu
        label="More"
        options={[
          { value: "settings", label: "Settings" },
          { value: "history", label: "History" },
        ]}
      />
    </TabList>
  );
}

export const EXAMPLES: Record<string, () => ReactElement> = {
  // ---- Forms & Inputs ----
  Button: () => <Button label="Continue" variant="primary" />,
  ButtonGroup: () => (
    <ButtonGroup label="Export options">
      <Button label="Export CSV" variant="secondary" />
      <Button label="Export PDF" variant="secondary" />
    </ButtonGroup>
  ),
  IconButton: () => <IconButton label="Search" icon={<Icon icon="search" />} />,
  ToggleButton: () => (
    <ToggleButton label="Bold" value="bold" isPressed onPressedChange={() => {}} />
  ),
  ToggleButtonGroup: () => (
    <ToggleButtonGroup label="Text style" type="multiple" value={["bold"]} onChange={() => {}}>
      <ToggleButton label="Bold" value="bold" />
      <ToggleButton label="Italic" value="italic" />
      <ToggleButton label="Underline" value="underline" />
    </ToggleButtonGroup>
  ),
  CheckboxInput: () => (
    <CheckboxInput label="Email me about product updates" value onChange={() => {}} />
  ),
  CheckboxList: () => (
    <CheckboxList label="Notify me about" value={["product"]} onChange={() => {}}>
      <CheckboxListItem label="Product updates" value="product" />
      <CheckboxListItem label="Security alerts" value="security" />
      <CheckboxListItem label="Weekly digest" value="digest" />
    </CheckboxList>
  ),
  RadioList: () => (
    <RadioList label="Delivery speed" value="standard" onChange={() => {}}>
      <RadioListItem label="Standard (5-7 days)" value="standard" />
      <RadioListItem label="Express (2 days)" value="express" />
    </RadioList>
  ),
  Switch: () => <Switch label="Enable two-factor authentication" value onChange={() => {}} />,
  Slider: () => <Slider label="Volume" value={62} onChange={() => {}} min={0} max={100} />,
  TextInput: () => <TextInput label="Full name" value="Ada Lovelace" onChange={() => {}} />,
  TextArea: () => (
    <TextArea
      label="Bio"
      value="Mathematician and writer, known for early work on computing machines."
      onChange={() => {}}
    />
  ),
  NumberInput: () => <NumberInput label="Quantity" value={3} onChange={() => {}} min={0} />,
  DateInput: () => <DateInput label="Start date" value="2026-08-03" onChange={() => {}} />,
  DateRangeInput: () => (
    <DateRangeInput
      label="Trip dates"
      value={{ start: "2026-08-03", end: "2026-08-10" }}
      onChange={() => {}}
    />
  ),
  DateTimeInput: () => <DateTimeInput label="Meeting starts" onChange={() => {}} />,
  TimeInput: () => <TimeInput label="Reminder time" onChange={() => {}} />,
  Calendar: () => <Calendar mode="single" value="2026-08-03" onChange={() => {}} />,
  FileInput: () => <FileInput label="Attachment" value={null} onChange={() => {}} />,
  Selector: () => (
    <Selector
      label="Status"
      value="Open"
      onChange={() => {}}
      options={["Open", "In progress", "Done"]}
    />
  ),
  MultiSelector: () => (
    <MultiSelector
      label="Assignees"
      value={["ada"]}
      onChange={() => {}}
      options={[
        { label: "Ada Lovelace", value: "ada" },
        { label: "Grace Hopper", value: "grace" },
        { label: "Alan Turing", value: "alan" },
      ]}
    />
  ),
  Typeahead: () => (
    <Typeahead
      label="Assignee"
      searchSource={PEOPLE_SOURCE}
      value={{ id: "ada", label: "Ada Lovelace" }}
      onChange={() => {}}
    />
  ),
  Tokenizer: () => (
    <Tokenizer
      label="Tags"
      searchSource={PEOPLE_SOURCE}
      value={[{ id: "ada", label: "Ada Lovelace" }]}
      onChange={() => {}}
    />
  ),
  InputGroup: () => (
    <InputGroup label="Website">
      <InputGroupText>https://</InputGroupText>
      <TextInput label="Website" isLabelHidden value="example.com" onChange={() => {}} />
    </InputGroup>
  ),
  Field: () => (
    <Field
      label="Email address"
      inputID="email-input"
      description="Used only to send receipts."
      descriptionID="email-help"
    >
      <input
        id="email-input"
        aria-describedby="email-help"
        placeholder="you@example.com"
        type="email"
      />
    </Field>
  ),
  SegmentedControl: () => (
    <SegmentedControl label="View" value="board" onChange={() => {}}>
      <SegmentedControlItem label="Board" value="board" />
      <SegmentedControlItem label="List" value="list" />
      <SegmentedControlItem label="Timeline" value="timeline" />
    </SegmentedControl>
  ),

  // ---- Data Display ----
  Table: () => (
    <Table
      data={[
        { name: "Ada Lovelace", role: "Engineer", status: "Active" },
        { name: "Grace Hopper", role: "Architect", status: "Active" },
        { name: "Alan Turing", role: "Researcher", status: "Away" },
      ]}
      columns={[
        { key: "name", header: "Name" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status" },
      ]}
      hasHover
    />
  ),
  List: () => (
    <List hasDividers>
      <ListItem label="Design review — Tuesday 10:00" />
      <ListItem label="Ship the v1 changelog" />
      <ListItem label="Retro notes from last sprint" />
    </List>
  ),
  Card: () => (
    <Card padding={4}>
      <VStack gap={2}>
        <Heading level={3}>Quiet by default</Heading>
        <Text type="body">A standard card with a heading and supporting text beneath it.</Text>
      </VStack>
    </Card>
  ),
  ClickableCard: () => (
    <ClickableCard label="Open project brief" href="#" padding={4}>
      <VStack gap={1}>
        <Heading level={3}>Project brief</Heading>
        <Text type="body" color="secondary">
          Scope, timeline, and success criteria for the Q3 rollout.
        </Text>
      </VStack>
    </ClickableCard>
  ),
  SelectableCard: () => (
    <SelectableCard label="Pro plan" isSelected onChange={() => {}} padding={4}>
      <VStack gap={1}>
        <Heading level={3}>Pro plan</Heading>
        <Text type="body" color="secondary">
          Unlimited projects and priority support.
        </Text>
      </VStack>
    </SelectableCard>
  ),
  Badge: () => <Badge label="New" variant="info" />,
  StatusDot: () => <StatusDot variant="success" label="Operational" />,
  Avatar: () => <Avatar name="Ada Lovelace" size="medium" />,
  AvatarGroup: () => (
    <AvatarGroup size="small">
      <Avatar name="Ada Lovelace" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" />
    </AvatarGroup>
  ),
  Thumbnail: () => (
    <Thumbnail src={PLACEHOLDER_IMG} alt="Abstract placeholder graphic" label="cover.png" />
  ),
  MetadataList: () => (
    <MetadataList title="Order details">
      <MetadataListItem label="Order ID">#48213</MetadataListItem>
      <MetadataListItem label="Placed">Aug 3, 2026</MetadataListItem>
      <MetadataListItem label="Status">Shipped</MetadataListItem>
    </MetadataList>
  ),
  Skeleton: () => <Skeleton width={220} height={72} />,
  ProgressBar: () => <ProgressBar label="Sync in progress" value={62} hasValueLabel />,
  Spinner: () => <Spinner label="Loading…" size="lg" />,
  Kbd: () => <Kbd keys="Cmd+K" />,
  Token: () => <Token label="design-system" onRemove={() => {}} />,
  EmptyState: () => (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filter criteria."
      actions={<Button label="Clear filters" variant="secondary" />}
    />
  ),
  Timestamp: () => <Timestamp value="2026-07-20T15:30:00Z" format="date_time" />,
  TreeList: () => (
    <TreeList
      items={[
        {
          id: "1",
          label: "Design system",
          children: [
            { id: "1a", label: "Tokens" },
            { id: "1b", label: "Components" },
          ],
        },
        { id: "2", label: "Documentation" },
      ]}
    />
  ),
  Icon: () => <Icon icon="search" />,

  // ---- Overlays & Feedback ----
  Dialog: DialogExample,
  AlertDialog: AlertDialogExample,
  Popover: () => (
    <Popover content={<Text type="body">Popover content goes here.</Text>}>
      <Button label="Open popover" variant="secondary" />
    </Popover>
  ),
  HoverCard: () => (
    <HoverCard
      content={
        <Text type="body">
          Grace Hopper — Rear Admiral, USN. Pioneered machine-independent programming languages.
        </Text>
      }
    >
      <Link href="#">Hover for details</Link>
    </HoverCard>
  ),
  Tooltip: () => (
    <Tooltip content="Search the catalog">
      <IconButton label="Search" icon={<Icon icon="search" />} />
    </Tooltip>
  ),
  Toast: ToastExample,
  Banner: () => (
    <Banner
      status="info"
      title="System maintenance scheduled"
      description="The platform will be briefly unavailable on Sunday from 2 to 4 AM."
    />
  ),
  ContextMenu: () => (
    <ContextMenu
      items={[
        { label: "Rename" },
        { label: "Duplicate" },
        { type: "divider" },
        { label: "Delete" },
      ]}
    >
      <Card padding={6}>
        <Text type="body" color="secondary">
          Right-click this area
        </Text>
      </Card>
    </ContextMenu>
  ),
  DropdownMenu: () => (
    <DropdownMenu
      button={{ label: "Actions" }}
      items={[{ label: "Edit" }, { label: "Duplicate" }, { type: "divider" }, { label: "Delete" }]}
    />
  ),
  Overlay: () => (
    <Overlay content={<Button label="Quick view" variant="secondary" size="sm" />}>
      <div
        style={{
          width: 240,
          height: 140,
          borderRadius: 12,
          background: "linear-gradient(135deg, #e8e6dc 0%, #cfccbd 100%)",
        }}
      />
    </Overlay>
  ),
  Lightbox: LightboxExample,
  Collapsible: () => (
    <Collapsible trigger="Click to expand" defaultIsOpen={false}>
      <Text type="body">This content is revealed when the collapsible is expanded.</Text>
    </Collapsible>
  ),
  CollapsibleGroup: () => (
    <CollapsibleGroup type="single" defaultValue="one">
      <Collapsible value="one" trigger="Shipping details">
        <Text type="body">Ships within 2 business days via standard courier.</Text>
      </Collapsible>
      <Collapsible value="two" trigger="Return policy">
        <Text type="body">Returns accepted within 30 days of delivery.</Text>
      </Collapsible>
    </CollapsibleGroup>
  ),
  MoreMenu: () => (
    <MoreMenu
      items={[
        { label: "Edit", onClick: () => {} },
        { label: "Duplicate", onClick: () => {} },
        { label: "Delete", onClick: () => {} },
      ]}
    />
  ),

  // ---- Navigation & Search ----
  TopNav: () => <TopNav label="Navigation" heading={<TopNavHeading heading="MSW Docs" />} />,
  SideNav: () => (
    <div style={{ maxWidth: 240 }}>
      <SideNav>
        <SideNavItem label="Overview" isSelected />
        <SideNavItem label="Components" />
        <SideNavItem label="Foundations" />
      </SideNav>
    </div>
  ),
  Breadcrumbs: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Docs</BreadcrumbItem>
      <BreadcrumbItem href="#">Components</BreadcrumbItem>
      <BreadcrumbItem>Table</BreadcrumbItem>
    </Breadcrumbs>
  ),
  TabList: TabListExample,
  TabMenu: TabMenuExample,
  Pagination: () => (
    <Pagination page={1} onChange={() => {}} totalItems={100} pageSize={10} variant="pages" />
  ),
  CommandPalette: CommandPaletteExample,
  Toolbar: () => (
    <Toolbar
      label="Table actions"
      size="sm"
      startContent={
        <TabList value="overview" onChange={() => {}}>
          <Tab label="Overview" value="overview" />
          <Tab label="Activity" value="activity" />
        </TabList>
      }
      endContent={<Button label="New item" variant="primary" size="sm" />}
    />
  ),
  OverflowList: () => (
    <div style={{ maxWidth: 320 }}>
      <OverflowList behavior="observeParent">
        <Button label="Overview" variant="secondary" />
        <Button label="Activity" variant="secondary" />
        <Button label="Settings" variant="secondary" />
        <Button label="Members" variant="secondary" />
        <Button label="Billing" variant="secondary" />
      </OverflowList>
    </div>
  ),

  // ---- Layout & Structure ----
  Divider: () => <Divider label="or continue with" />,
  ResizeHandle: () => (
    <div style={{ display: "flex", height: 96, width: "100%", maxWidth: 320 }}>
      <div style={{ flex: 1, background: "var(--color-background-muted)", borderRadius: 8 }} />
      <ResizeHandle direction="horizontal" hasDivider label="Resize demo panels" />
      <div style={{ flex: 1, background: "var(--color-background-muted)", borderRadius: 8 }} />
    </div>
  ),
  Grid: () => (
    <Grid columns={3} gap={3}>
      <Card padding={3}>Alpha</Card>
      <Card padding={3}>Beta</Card>
      <Card padding={3}>Gamma</Card>
    </Grid>
  ),
  HStack: () => (
    <HStack gap={2}>
      <Badge label="Design" variant="info" />
      <Badge label="Engineering" variant="neutral" />
      <Badge label="Product" variant="neutral" />
    </HStack>
  ),
  VStack: () => (
    <VStack gap={2}>
      <Text type="label">Recent activity</Text>
      <Text type="body" color="secondary">
        Ada Lovelace commented on the Table spec.
      </Text>
    </VStack>
  ),
  Stack: () => (
    <Stack>
      <Badge label="Draft" variant="neutral" />
      <Badge label="In review" variant="warning" />
    </Stack>
  ),
  Section: () => (
    <Section padding={4}>
      <Heading level={3}>Getting started</Heading>
      <Text type="body" color="secondary">
        Install the package and wrap your app in the provider.
      </Text>
    </Section>
  ),
  AspectRatio: () => (
    <div style={{ width: 240 }}>
      <AspectRatio ratio={16 / 9}>
        <Center height="100%">
          <Text color="secondary">16:9</Text>
        </Center>
      </AspectRatio>
    </div>
  ),
  Center: () => (
    <Center height={120}>
      <Text color="secondary">Centered content</Text>
    </Center>
  ),
  AppShell: () => (
    <div
      style={{
        height: 260,
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
      }}
    >
      <AppShell
        variant="surface"
        contentPadding={4}
        topNav={<TopNav label="Navigation" heading={<TopNavHeading heading="My App" />} />}
        sideNav={
          <SideNav>
            <SideNavItem label="Dashboard" isSelected />
            <SideNavItem label="Settings" />
          </SideNav>
        }
      >
        <Text type="body" color="secondary">
          Main content area.
        </Text>
      </AppShell>
    </div>
  ),
  Layout: () => (
    <div
      style={{
        height: 220,
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
      }}
    >
      <Layout
        header={
          <LayoutHeader>
            <Heading level={3}>Page title</Heading>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <Text type="body" color="secondary">
              Main content area — the scrollable center section of the layout.
            </Text>
          </LayoutContent>
        }
        footer={
          <LayoutFooter>
            <Text type="supporting" color="secondary">
              Footer status bar
            </Text>
          </LayoutFooter>
        }
      />
    </div>
  ),
  FormLayout: () => (
    <FormLayout direction="vertical">
      <TextInput label="Name" value="Ada Lovelace" onChange={() => {}} />
      <TextInput label="Email" value="ada@example.com" onChange={() => {}} />
    </FormLayout>
  ),

  // ---- Content & Typography ----
  Text: () => <Text type="body">Quiet, considered, and built to last.</Text>,
  Heading: () => <Heading level={3}>Section heading</Heading>,
  Link: () => <Link href="#">Learn more</Link>,
  Blockquote: () => (
    <Blockquote cite="Ada Lovelace">
      The Analytical Engine weaves algebraic patterns, just as the Jacquard loom weaves flowers and
      leaves.
    </Blockquote>
  ),
  Code: () => <Code>npm install @modernsoftwareworks/msw-ui</Code>,
  CodeBlock: () => (
    <CodeBlock
      language="tsx"
      code={
        'import { Button } from \'@modernsoftwareworks/msw-ui\';\n\nexport function Example() {\n  return <Button label="Continue" variant="primary" />;\n}'
      }
    />
  ),
  Markdown: () => (
    <Markdown>
      {
        "## Getting started\n\nInstall the package:\n\n```bash\nnpm install @modernsoftwareworks/msw-ui\n```\n\nThen wrap your app in the provider."
      }
    </Markdown>
  ),
  Citation: () => <Citation source={{ title: "Astryx design system", url: "#" }} number={1} />,
  Outline: () => (
    <Outline
      items={[
        { id: "overview", label: "Overview", level: 2 },
        { id: "installation", label: "Installation", level: 2 },
        { id: "theming", label: "Theming", level: 3 },
        { id: "components", label: "Components", level: 2 },
      ]}
    />
  ),

  // ---- Media & Communication ----
  Carousel: () => (
    <Carousel>
      <Card padding={4}>Slide one</Card>
      <Card padding={4}>Slide two</Card>
      <Card padding={4}>Slide three</Card>
    </Carousel>
  ),
  ChatMessage: () => (
    <ChatMessage sender="assistant" name="Assistant">
      <Text type="body">Here is a summary of the changes in this release.</Text>
    </ChatMessage>
  ),
  ChatMessageList: () => (
    <ChatMessageList>
      <ChatMessage sender="user" name="Ada Lovelace">
        <Text type="body">Can you summarize the release notes?</Text>
      </ChatMessage>
      <ChatMessage sender="assistant" name="Assistant">
        <Text type="body">Sure — three components shipped this week.</Text>
      </ChatMessage>
    </ChatMessageList>
  ),
  ChatComposer: () => (
    // Width container: the composer's input collapses to ~40px without a sized parent
    <div style={{ width: "min(420px, 100%)" }}>
      <ChatComposer
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        placeholder="Message the team..."
      />
    </div>
  ),
  ChatSystemMessage: () => (
    <ChatSystemMessage>Ada Lovelace joined the conversation.</ChatSystemMessage>
  ),
};
