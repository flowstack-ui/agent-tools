# Brick layer selection

## Purpose

Choose the correct FLOWSTACK layer and require Brick-first composition when building a finished interface with Brick.

## Decision order

1. Describe the interface job and semantic relationship before choosing markup or appearance.
2. Search Brick's package guides and component manifest for a component that owns the job.
3. Use Brick public components for finished interface structure, controls, navigation, content, media, responsive visibility, and visual surfaces.
4. Let Brick consume Atom; do not import Atom directly in an ordinary Brick application.
5. Keep purposeful sections in Blocks, page arrangements in Blueprints, theme values in a Theme, and business behavior in the application.

## Selection map

- **headings, paragraphs, captions, and eyebrows:** use Heading, Paragraph, Caption, or Eyebrow. Give Heading an explicit semantic level and choose its visual variant independently.
- **other text with Brick typography:** use Text. Choose the semantic rendered element through its public API and author the intended letter case in content.
- **stress emphasis inside meaningful copy:** use Em. Keep Em inside the surrounding Text or component content owner and do not use it only for decorative italics.
- **static authored relevance inside meaningful copy:** use Mark. Choose Highlight when a query must discover and segment matches; use Mark only when the author already knows the relevant passage.
- **literal query matches inside one plain text string:** use Highlight. Pass plain text and literal queries to exact Atom-backed matching; keep rich-content traversal, search state, and active-result navigation in the application.
- **trusted long-form React content with coherent descendant typography:** use Prose. Sanitize and parse external content before it reaches Prose; keep document semantics and trust policy in the application, and use direct Brick components for richer anatomy.
- **keyboard-input notation inside meaningful copy:** use Kbd. Repeat one Kbd per authored key and keep visible separators outside; shortcut behavior and platform-label policy remain application-owned.
- **extended quotation with visible attribution:** use Blockquote. Keep Content and Caption as siblings in Root, put the source URL on Content, and use Cite for a referenced work or source rather than merely a person's name.
- **one-dimensional alignment:** use Stack, HStack, or VStack. Use Grid for two-dimensional track relationships.
- **bounded page width:** use Container. Use Surface or Card when the region also needs a visual boundary.
- **top application or page bar:** use AppBar. Compose navigation and action components inside its sections.
- **responsive presence:** use Show or Hide. Use CSS media visibility rather than rendering two JavaScript-controlled trees.
- **image with resilient loading:** use Image. Use an adapter only when a framework image optimizer provides a measured capability Brick lacks.
- **stable media or embed geometry before its content loads:** use AspectRatio. Choose Image when the asset owns resilient loading, Surface for a general visual boundary, and Skeleton for a temporary loading placeholder.
- **preserved multi-line technical source:** use Code Block. Keep syntax tokenization in a consumer adapter, pass the exact plain source separately for copy behavior, author line metadata explicitly, and use the bounded/collapse contract for long source.
- **navigation destination:** use Link or Button with href. Use Link for ordinary navigation and Button only for an emphasized destination.
- **grouped disclosure sections:** use Accordion. Choose Collapsible for one independent disclosure and Tabs for one shared switching panel.
- **ordinary blocking task, form, settings flow, or focused information:** use Dialog. Choose AlertDialog for one urgent consequential decision and Drawer when the temporary task belongs at a screen edge.
- **urgent or consequential decision that requires an explicit response:** use AlertDialog. Keep a safe Cancel before Action; choose Dialog for ordinary forms and information.
- **compact anchored interactive panel:** use Popover. Choose Tooltip or HoverCard for noninteractive context, DropdownMenu for commands, Select or Combobox for option selection, and Dialog for a larger blocking task.
- **commands or settings opened from one visible button:** use DropdownMenu. Choose ContextMenu for contextual invocation, Menubar for persistent application command categories, Select for a form value, and NavigationMenu or NavList for navigation.
- **target-specific commands invoked by secondary click, keyboard context action, or supported long press:** use ContextMenu. Keep a visible Button or DropdownMenu route to every important command.
- **persistent desktop-like application command categories:** use Menubar. Choose DropdownMenu for one temporary command menu, NavigationMenu or NavList for routes, Toolbar for immediately executable controls, and Drawer only as an application-selected mobile alternative.
- **redundant passive preview for a genuine link or focusable subject:** use HoverCard. Choose Tooltip for one short hint, Popover for interaction, Dialog for a larger task, and visible Text when the information is essential.
- **brief supplemental description for an already named control:** use Tooltip. Choose HoverCard for a richer passive preview, Popover for interaction, and visible Text for essential information.
- **exactly one form choice from a short visible set:** use RadioGroup. Choose CheckboxGroup for independent choices, Select for a compact longer list, and ToggleGroup for pressed commands.
- **any number of related form choices:** use CheckboxGroup. Choose Checkbox for one independent choice, RadioGroup for exactly one choice, and ToggleGroup for pressed commands.
- **immediately applied on or off setting:** use Switch. Choose Checkbox for a deferred form answer and Toggle for a persistent pressed command.
- **one command with persistent pressed state:** use Toggle. Choose Button for a momentary action, Switch for an immediate setting, Checkbox for a submitted choice, and ToggleGroup for related pressed commands.
- **related keyboard-navigable pressed commands:** use ToggleGroup. Choose Toggle for one command, RadioGroup or CheckboxGroup for form choices, Switch for immediate settings, and Tabs for switching panels.
- **exact numeric value with typing and step actions:** use NumberInput. Choose Slider for approximate spatial adjustment, Input for numeric-looking identifiers, Select or RadioGroup for a small fixed set, and Progress for read-only completion.
- **one predefined form value from a compact collapsed collection:** use Select. Choose RadioGroup for a short visible set, Combobox for editable filtering, MultiSelect for several values, DropdownMenu for commands, and Link for navigation.
- **several predefined form values from a compact collapsed collection:** use MultiSelect. Choose CheckboxGroup for a short visible set, Select for one value, and Combobox only when its single-value editable model fits; record a Brick gap for unsupported tag creation or other specialized multi-value behavior.
- **editable filtering and one committed option value:** use Combobox. Choose Input when any text is valid without options, Select for a compact noneditable list, RadioGroup for a short visible set, MultiSelect for several predefined values, and DropdownMenu for commands.
- **persistently visible composite option collection:** use record a Brick gap before application-owned implementation. Brick has no public owner for this job. Do not import Atom directly; first reconsider RadioGroup or CheckboxGroup for visible form choices, Select or MultiSelect for collapsed choices, and Combobox for editable filtering.
- **short one-time verification, recovery, or pairing code:** use OTPField. Choose PasswordToggleField for a reusable secret, NumberInput for a quantity, and Input for an ordinary identifier or variable-length value.
- **password entry with an allowed reveal action:** use PasswordToggleField. Choose Input with type=password when reveal is forbidden or unwanted and OTPField for a one-time code.
- **local file picking, optional drop, review, and removal before application processing:** use FileUpload. Choose Input for a textual path or URL, Progress for transfer progress, Toast for a transient result, and Image for a rendered asset; keep server validation and upload transport in the application.
- **short non-blocking application outcome or process update:** use Toast. Choose Field or Form feedback for validation, Progress for numeric completion, AlertDialog for a required response, and persistent application content for essential or durable information.
- **touch-enhanced quick actions for a list-like row with an obvious click alternative:** use SwipeableItem. Choose DropdownMenu for a larger command set, Button or IconButton for continuously visible actions, and Link when the row navigates.
- **one independent in-flow disclosure region:** use Collapsible. Choose Accordion for coordinated peer sections, Dialog or Drawer for a modal task, Popover for an anchored layer, and Show or Hide for responsive presence.
- **one-column hierarchical navigation and optional selection:** use Tree. Choose TreeGrid for hierarchical rows with navigable columns, Accordion or Collapsible for arbitrary disclosure content, DataGrid for flat interactive tabular data, and List for static hierarchy.
- **hierarchical rows with several navigable columns:** use TreeGrid. Choose Tree for one primary hierarchy column, DataGrid for flat interactive rows, Table for read-oriented tabular relationships, and an application-owned data tool for editing or independent cell controls.
- **flat tabular data with composite cell navigation or row selection:** use DataGrid. Choose Table for read-oriented comparison, TreeGrid for hierarchical rows, and an application-owned data tool for editing, column management, or an enterprise data engine.
- **read-oriented row and column comparison:** use Table. Choose DataGrid for composite cell navigation or row selection, TreeGrid for hierarchical interactive rows, and List when meaningful column relationships are absent.
- **changing stream of focusable articles with article-to-article keyboard movement:** use Feed. Choose List for a static sequence, Table or DataGrid for tabular relationships, Tree for hierarchy, and Stack or Grid for purely visual arrangement.
- **linear read-only task completion or indeterminate work:** use Progress. Choose ProgressCircle when compact circular geometry is important, Slider for editable values, Toast for a transient outcome, and Skeleton for unknown content loading.
- **compact circular read-only task completion or indeterminate work:** use ProgressCircle. Choose Progress for linear completion, Slider for editable values, and Skeleton for unknown content loading.
- **visual count or presence dot over one owning element:** use NotificationBadge. Choose Badge for an in-flow passive label or count, Status for a named state, Button for an actionable count, and visible Text when the value must be announced or understood without the owner; NotificationBadge does not announce changes.
- **compact identity for a named person, organization, or entity:** use Avatar. Choose Image for a larger editorial portrait and NotificationBadge only when the owning Avatar needs a separate visual count or presence indicator.
- **short passive in-flow label, category, status, or count:** use Badge. Choose NotificationBadge for an overlaid count or dot, Status for richer named state semantics, and Button when the label is actionable.
- **editable, selectable, or submitted opaque hexadecimal color:** use ColorPicker. Choose ColorSwatch for a passive preview; richer alpha, gradient, channel, eyedropper, and color-space editing remains an Atom-first gap.
- **passive preview of one color or a compact color mix:** use ColorSwatch. Choose ColorPicker when the user must edit, select, or submit the value; keep interaction on a semantic owner.
- **short assistive-only equivalent for meaning already conveyed visually:** use VisuallyHidden. Choose visible Text for essential instructions, state, errors, or announcements, and keep an IconButton or Button itself visible while placing the hidden equivalent inside it.
- **approximate numeric value or ordered range through spatial manipulation:** use Slider. Choose NumberInput for exact entry, Progress for read-only completion, and Rating for a short ordered score.
- **short ordered score input or recognizable passive score aggregate:** use Rating. Choose Slider for a general numeric setting and RadioGroup when choices have distinct categorical meanings.
- **ordered or unordered content:** use List. Choose NavList, an interactive collection, Table, or DataGrid when rows navigate, select, activate, or expose data relationships.

## Rules

- **MUST:** Use an existing Brick component when it owns the interface job instead of recreating it with native elements and application CSS.
- **MUST:** Do not import @flowstack-ui/atom directly in an application that has selected Brick; report a Brick gap if the finished component is missing.
- **MUST:** Load styles.css once, or core.css once plus every rendered component's modular stylesheet; never mix the two delivery modes.
- **MUST:** Choose components by semantic and interaction intent rather than by visual resemblance.
- **MUST:** After selecting a Brick owner, follow interface-composition's ordered prop, semantic-token, component-token, public-part, and stable-hook customization contract.
- **SHOULD:** Record intentional native or framework fallbacks with the searched Brick component and missing capability.

## Native fallback

1. Search the Brick manifest, package guide selection map, component docs, and public exports before writing native markup or replacement CSS.
2. Use semantic native HTML only for document or application structure Brick does not own, or through a documented adapter when a framework supplies a required measured capability.
3. Record the fallback as a Brick gap, adapter need, higher-layer composition, or intentional application-owned element before continuing.

## Validation checklist

- List every native layout, text, image, navigation, and interactive element and name why Brick does not own it; list every direct Brick stable-hook declaration and its completed customization gap report.
- Confirm there are no direct @flowstack-ui/atom imports.
- Confirm every rendered Brick component has its required modular CSS or the complete stylesheet is loaded once.
- Classify each repeated composition as component, theme, Block, Blueprint, adapter, or application ownership.

## Related guidance

- `interface-composition`
- `app-bar`
- `container`
- `stack`
- `grid`
- `text`
- `em`
- `mark`
- `highlight`
- `kbd`
- `blockquote`
- `image`
- `aspect-ratio`
- `code-block`
- `show`
- `hide`
- `accordion`
- `collapsible`
- `list`
- `feed`
- `tree`
- `tree-grid`
- `table`
- `data-grid`
- `dialog`
- `alert-dialog`
- `popover`
- `dropdown-menu`
- `context-menu`
- `menubar`
- `hover-card`
- `tooltip`
- `radio-group`
- `checkbox-group`
- `switch`
- `toggle`
- `toggle-group`
- `number-input`
- `select`
- `multi-select`
- `combobox`
- `otp-field`
- `password-toggle-field`
- `file-upload`
- `toast`
- `swipeable-item`
- `progress`
- `progress-circle`
- `notification-badge`
- `avatar`
- `badge`
- `color-picker`
- `color-swatch`
- `visually-hidden`
- `slider`
- `rating`
