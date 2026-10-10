# Brick interface composition

## Purpose

Build complete interfaces from Brick's structural, content, navigation, action, responsive, and surface components before adding narrow application styling.

## Decision order

1. For secondary action rows aligned to the logical start of prose, prefer outline Buttons so their padded boundary reads intentionally in LTR and RTL. Ghost remains appropriate for intentional toolbar, icon and contextual actions; do not remove control padding or use negative margins to repair apparent text indentation.
2. Keep standalone action focus outside by default; use Button or IconButton focusRing inside at intentional flush clipping boundaries. Do not add protective layout gutters to compensate for a compound component focus defect, remove scrolling, or override focus management in consumer CSS.
3. Map the page into landmarks, bounded regions, layout relationships, content, navigation, actions, media, and responsive changes.
4. Choose the Brick owner for each relationship and read every selected component guide before implementation.
5. Compose from the outside inward: AppBar or page landmark, Section, Container, Grid or Stack, Surface or Card, then content and controls.
6. Decide how each child participates in its parent: content-sized, fixed, automatic, proportional, placed, stretched, or deliberately constrained.
7. Follow the customization order completely: component owner, supported props, semantic theme tokens, component tokens, public parts, and only then a narrow stable-hook escape hatch.
8. Audit responsive behavior, accessibility, CSS delivery, and native fallbacks before treating the composition as complete.

## Selection map

- **single-line input with masks, external segments or form registration:** use Input with Field; InputAddon and Group for external segments; optional application integrations. Follow docs/guides/input-integrations.md. React Hook Form, use-mask-input and react-payment-inputs are not bundled Input capabilities. Preserve refs and handlers, use one value owner, qualify caret/reset/submission, and never present card formatting as payment processing. Internal adornments can contain independently named controls; external segments are noninteractive.
- **independently selectable rich form options:** use CheckboxCard with CheckboxGroup and Fieldset for related options. Compose exactly one HiddenInput per whole-label card. Keep all descendants noninteractive; use ordinary Card with a separate Checkbox for record actions. Use RadioCard for mutually exclusive choices. Grid and Stack own group layout.
- **select records independently from opening them:** use Table, List or Card with Checkbox, useSelection and optional ActionDelegate. Preserve native host semantics. selected is presentation only. Bind useSelectionCheckbox to standalone Checkbox or Checkbox.Control, never the compound Checkbox.Root wrapper. Give each record a real named primary link or button; optional ActionDelegate forwards background clicks without turning the host into a button. Keep secondary controls independent. The application owns page scope, retained IDs, sorting, filtering, confirmation and focus recovery. Use DataGrid only when its cell-navigation model is needed.
- **date entry with optional calendar selection:** use DateInput, Calendar and DatePicker. Use DatePicker for a synchronized input and popup instead of wiring separate uncontrolled roots. Keep booking rules and translations in the application. Multiple mode uses ValueText plus HiddenInput, not segmented entry.
- **shared resizable pane allocation:** use Splitter. Declare stable IDs and adjacent named resize triggers. Keep scrolling and panel paint with their separate owners.
- **ordered interactive workflow progress:** use Steps. Compose NextTrigger and PrevTrigger with Button using asChild. Use List, Square, Surface, and text for static numbered instructions; do not add workflow semantics just for connected numbered artwork.
- **page width and gutters:** use Container. Do not reproduce max-width and inline padding on every section.
- **major page-region rhythm:** use Section. Keep paint in Surface, width and gutters in Container, and local child relationships in Stack or Grid.
- **row or column relationship:** use HStack, VStack, or responsive Stack. Use fixed-axis conveniences when the axis stays fixed and Stack when the same content changes axis at a Brick breakpoint.
- **child flex allocation:** use Stack.Item. Choose recipes or explicit grow/shrink/basis, order and logical auto margins before writing flex CSS. Root supplies reverse directions, independent gaps and multiline alignment. Preserve meaningful DOM and keyboard order.
- **child grid participation:** use Grid.Item. Use spans, placement, or self-alignment; keep a real wrapper when it establishes the participation box and use asChild only when the child should be that box.
- **local logical size constraint:** use Frame. Use only for inline/block size or min/max constraints; keep parent participation on the owning layout Item and overflow in ScrollArea.
- **two-axis centering or equal geometry:** use Center, Square, or Circle. Choose Square or Circle for one explicit equal size that must not shrink under flex pressure; compose Surface for paint and Icon for authored SVG sizing.
- **overlapping depth relationship:** use ZStack. Prefer Surface media anatomy for ordinary media, scrim, and foreground compositions.
- **track-based responsive layout:** use Grid. Use Stack when only one axis matters.
- **visual region:** use Surface or Card. Use Card for titled or actionable contained content and Surface for a general visual boundary.
- **local light or dark semantic-token boundary:** use Appearance. Pass exactly one existing host; it may contain any number of descendants, and Appearance supplies primary foreground on explicit scopes but adds no background, layout, or wrapper.
- **brand or content image:** use Image. Keep alt text and fallback behavior intentional.
- **one of several peer campaigns or authored content regions:** use Carousel. Keep invariant evidence outside; let each Slide own a complete Surface when its media and message belong together.
- **site navigation:** use NavigationMenu or NavList. Use NavigationMenu for disclosure navigation and NavList for persistent route lists.
- **responsive desktop and mobile alternatives:** use Show and Hide. Use only when interface or content changes; use responsive Stack when only arrangement changes.
- **grouped application actions:** use Toolbar. Do not use AppBar.Toolbar as an ARIA toolbar.
- **several related disclosure sections:** use Accordion. Preserve Header, Trigger, Content, and ContentInner ownership; use Collapsible for one disclosure.
- **semantic item or sequence content:** use List. Use structured row parts only when needed and keep Trailing compact on narrow screens.
- **extended quotation and attribution:** use Blockquote. Keep Content and Caption as siblings in Root, put the source URL on Content, and use Cite only for a referenced work or source.

## Rules

- **MUST:** Use Show when for wrapper-free conditional rendering and Show/Hide from for mounted CSS visibility. Do not mix modes or infer authorization from hiding. Use responsive asChild only on one host forwarding props and refs; visible child display is preserved.
- **MUST:** Choose focused public owners and omit redundant props only after checking component defaults and parent layout. Consider documented asChild composition to avoid unnecessary hosts, verifying refs, semantics and style precedence. Do not assume a universal styling-prop API; propose shared props only from repeated, qualified composition gaps.
- **MUST:** Assign page structure to Brick components before writing element-level CSS.
- **MUST:** Use Section's named responsive rhythm for major page regions; use as=div when spacing is needed without thematic section semantics.
- **MUST:** When Surface paint must cover Section rhythm, compose Surface asChild around Section so one host keeps the responsibilities separate.
- **MUST:** Build from a blueprint, select the owning Brick components, render their defaults, choose supported props, then apply Theme, Block, or application customization in that order.
- **MUST:** Keep one copy of content when only its layout changes; use responsive Stack values instead of duplicated Show/Hide trees.
- **MUST:** Use responsive Grid tracks, gaps, spans, and alignment or responsive ZStack logical placement when only those relationships change; do not duplicate content or change semantic order.
- **MUST:** Use numeric Stack and Grid spacing factors for ordinary rhythm, including responsive values; use explicit CSS spacing only for a measured exception or application token instead of adding layout CSS merely because a value is outside the legacy token scale.
- **MUST:** Separate component internal geometry from parent participation; configure the finished component for its anatomy and the owning layout or Item part for its relationship to siblings.
- **MUST:** Give controls that share a row the same named size so button-like peers share height, control typography, icon scale, and radius; keep editable Input, Textarea, and Combobox text at least 16px while preserving the same outer geometry, and never repair mismatches with per-component heights, transforms, margins, or literal radii.
- **MUST:** Use Frame for a qualified local logical size constraint instead of repeating width/height CSS or adding size props to a finished component; do not use Frame when Container measure, layout participation, AspectRatio, or ScrollArea owns the actual job.
- **MUST:** Use Center for arbitrary two-axis centering and Square or Circle for invariant equal-size geometry instead of repeating paired Frame constraints or shrinkable wrapper composition; keep paint on Surface, SVG presentation on Icon, and positioned overlap on ZStack.
- **MUST:** Keep a real layout-item wrapper when it establishes flex or grid participation or the definite parent size required by ScrollArea, Carousel fill, or Image fill; asChild is not a wrapper-removal goal by itself.
- **MUST:** Do not use Stack, Surface, Button, or another convenient component when a more specific Brick navigation, media, content, or interaction component owns the job.
- **MUST:** Preserve document landmarks and semantic elements when Brick does not provide an owner; Brick-first is not permission to erase HTML meaning.
- **MUST:** For an extended quotation, use Blockquote and preserve its figure Root, blockquote Content, sibling figcaption Caption, source URL, and cited-work semantics.
- **MUST:** Use Prose only after external content has been sanitized and parsed into trusted React children; keep heading hierarchy, landmarks, link destinations, media alternatives, table semantics, and trust policy application-owned.
- **MUST:** When desktop and mobile require distinct navigation components, share application-owned destination labels, hrefs, values, and ordering while preserving each pattern's correct Brick anatomy; do not duplicate navigation content or force one interaction tree across breakpoints.
- **MUST:** Use Show and Hide for first-paint visibility; when a controlled interactive overlay may remain open across a breakpoint, synchronize its application state at that boundary so a hidden modal cannot retain focus, scroll lock, or isolation.
- **SHOULD:** Express reusable brand values through semantic Brick tokens and a theme rather than repeating literal application values.
- **MUST:** For a locally dark or light region, pass the existing region owner as the one direct child of Appearance and provide complete appearance-dependent color and shadow values for explicit light and dark re-entry; keep typography, density, geometry, and motion on the shared Theme root, and do not recolor descendants independently or add a Surface only to carry appearance.
- **MUST:** When a portal leaves a local appearance scope, either target a portal container inside that scope or apply Appearance to every portalled visual root; never assume the trigger's CSS ancestry crosses the portal.
- **SHOULD:** Use ZStack for reusable nine-position overlap; retain narrow application positioning only for artwork coordinates that ZStack intentionally does not own.
- **MUST:** Classify findings before changing a package: behavior and accessibility belong to Atom, finished reusable component paint belongs to Brick, brand values belong to Theme, repeated responsive section composition may belong to Block or Blueprint, and one-page art direction remains application-owned.
- **MUST:** When styles.css or styles/core.css is loaded, change the document canvas, foreground, and body typography through semantic Brick tokens instead of repeating the body bindings that Brick's foundation already owns.
- **MUST:** Keep required HTML, CSS, and Web API behavior within the package or application's declared browser floor; place newer visual and platform features behind a usable baseline rather than assuming parsing, prefixes, emulation, or one engine proves interoperability.
- **MUST:** Author standards-based CSS and let the declared build target generate historical vendor syntax when supported; use a documented feature-specific fallback or bounded workaround for behavior a transformer cannot supply, and never add prefixes by visual guess.
- **MUST:** Do not write a direct declaration against a Brick part until the correct component, supported props, semantic tokens, component tokens, and public compound parts have been checked in order.
- **MUST:** Target only documented Brick tokens, public compound parts, stable brick-* base classes, documented slots, and documented state attributes; inspected internal wrappers or implementation selectors are not APIs.
- **MUST:** When a direct stable-hook override remains because no public prop or token expresses the requirement, emit the required customization gap report and classify its owner before treating the interface as complete.
- **SHOULD:** Classify repeated purposeful sections as Block candidates and repeated page arrangements as Blueprint candidates only after real reuse evidence.
- **SHOULD:** Split long product compositions by stable responsibility—authored content, repeated item, invariant supporting region, and outer assembly—without pretending those local modules are reusable Brick components.
- **MUST:** Comment non-obvious ownership, accessibility order, breakpoint, sizing, and browser-lifecycle constraints; do not add comments that only translate a component name or prop into prose.
- **MUST:** Let the optional Brick reset supply theme-aware focus-visible for otherwise unstyled targets. Component-specific focus owners override that low-priority fallback; do not add generic consumer focus outlines to every descendant or remove focus on passive scrolling.
- **MUST:** Use Float for out-of-flow edge attachment and Float.Anchor for an unpainted containing block. Keep ZStack for size-contributing layers, Bleed for crossing padding and NotificationBadge for counts/dots. Keep clipped targets and floated content as siblings; preserve accessible meaning and focus.

## Customization order

1. **Correct Brick component:** Select the component whose semantic, behavioral, layout, content, navigation, or surface contract owns the job; styling a convenient substitute is not equivalent.
2. **Supported props and recipes:** Use the component's documented variant, tone, size, density, orientation, placement, and other closed recipes when they express the result.
3. **Semantic theme tokens:** Assign reusable brand color, typography, spacing, radius, surface, focus, and motion roles through a theme scope, preserving required foreground/background and interaction-state pairs.
4. **Documented component tokens:** Use stable --brick-<component>-* variables for supported anatomy-specific adjustments instead of overriding the declaration that consumes them.
5. **Public compound parts:** Place product-specific composition classes on the public part that owns the region; do not create slot maps or select private wrappers.
6. **Narrow stable-hook escape hatch:** Use className or style only for application-owned composition or a value Brick does not expose, and target a documented public hook when direct CSS is unavoidable.

**Class name policy:** className scopes a product composition or supplies consumer-defined token values. It must not replace a supported prop, repeat a reusable theme value, or depend on undocumented anatomy.

**Direct CSS policy:** Direct declarations on a stable Brick class are a last resort. Keep them narrow, preserve component state and accessibility, verify the affected responsive and appearance states, and report the missing public capability.

### Required gap report

Emit this record for every native/framework fallback or direct stable-hook declaration that remains after the ordered search.

- `interfaceJob`
- `brickOwnerSearched`
- `supportedPropsChecked`
- `semanticTokensChecked`
- `componentTokensChecked`
- `publicPartsChecked`
- `fallbackOrOverride`
- `missingCapability`
- `proposedOwner`
- `verification`

## Native fallback

1. Review the interface map against the manifest and selected component guides, including layout, text, image, visibility, and navigation owners.
2. Keep native landmarks and product-specific semantic structures where no Brick component adds a useful contract; add only narrow composition classes.
3. Record what Brick lacked, whether an adapter or new component is warranted, and whether the pattern belongs to Theme, Block, Blueprint, or the application.

## Validation checklist

- Inspect the rendered DOM, accessible names, heading order, landmarks, focus order, keyboard operation, touch targets, contrast, zoom, and RTL behavior.
- Test every adopted breakpoint without JavaScript-dependent first-paint flicker.
- Confirm layout primitives own ordinary gap, alignment, wrapping, width, and visibility before accepting custom CSS; verify separately meaningful inline nodes use layout gap rather than literal spaces or offsets.
- Confirm every ScrollArea, Carousel fill, and Image fill composition can name the ancestor that establishes its definite size; use Frame when that ancestor needs an explicit logical size constraint, and never expect the child to invent it.
- Confirm light to dark to light and dark to light to dark scopes restore the theme's complete semantic foreground, background, boundary, action, focus, status, scrim, shadow, and interaction-state pairs without child-by-child recoloring.
- Confirm every portalled visual root either remains inside the intended theme/appearance container or receives an explicit Appearance scope.
- Confirm repeated CSS values are theme tokens, component-specific values use documented component tokens, and every remaining direct stable-hook declaration has a complete customization gap report.
- Confirm required syntax matches the declared browser floor, permission-sensitive APIs include a useful rejection path, optional features retain a usable baseline, and portable behavior has representative Chromium, Firefox, and WebKit evidence; treat Playwright WebKit and device emulation as engine evidence rather than physical-platform proof.
- Confirm source order follows rendered ownership, static content is separate from interaction assembly when it obscures the component tree, and comments explain why a constraint exists rather than what an obvious line does.
- Run the package's CSS-delivery check and the application's accessibility, browser, and performance checks.

## Related guidance

- `layer-selection`
- `appearance`
- `app-bar`
- `section`
- `container`
- `stack`
- `z-stack`
- `grid`
- `frame`
- `center`
- `surface`
- `card`
- `navigation-menu`
- `show`
- `hide`
- `accordion`
- `list`
- `blockquote`
- `highlight`
- `alert`
- `empty-state`
- `spinner`
- `float`
