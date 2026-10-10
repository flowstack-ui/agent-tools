# Table agent guide

## Purpose

Present finished row-and-column relationships with native table semantics while Atom owns the semantic parts and sort metadata.

## Use when

- People need to compare values across meaningful columns in pricing, reports, invoices, inventories, audit results, or compact summaries.

## Choose something else when

- The region needs arrow-key cell navigation, editing, resizing, or another interactive composite model. Use Data Grid or an application-owned data tool.
- The content is a sequence without meaningful column relationships or a label/value definition structure. Use List, Grid, Stack, or a semantic definition-list composition.
- The narrow layout must convert rows into unrelated cards and no longer preserves column comparison. Use An application-owned alternate view with an explicit responsive policy.

## Required composition

- Compose optional Container > Root > optional ColumnGroup with Column sizing hints, Caption, Header, Body, and optional Footer; place Row inside each section and Head or Cell inside Row according to native table content rules.
- Use Head with scope="row" for body row labels and keep the default column scope for header cells; use id and headers for complex associations.
- Author Container explicitly when honest comparison needs horizontal overflow, and set Root minInlineSize to the smallest width that preserves the column relationships.
- When Table moves vertically, put the visible border and radius on the stable labelled Scroll Area viewport, use Table variant=line inside it, and keep persistent naming outside the moving viewport with aria-labelledby.
- Put an independently named Button and optional decorative SortIndicator inside the active Head when the application owns sorting. Pass SortIndicator through Button endIcon, not inline beside label children, so the action owns icon alignment and spacing.
- Choose surface and border tone independently, opt into column borders only when they improve comparison, use fixed layout only with deliberate column widths, set verticalAlign on cells whose contents need top or bottom alignment, and use Row variant=section for authored row-group headings.
- Record selection uses the public selection utility; optional ActionDelegate points to a visible descendant link, button or checkbox. The host owns no keyboard navigation.
- Root interactive adds hover paint only. Head and Cell sticky=start/end pin logical edges; stickyOffset accounts for earlier pinned columns. Repeat pinning in header and body. Brick owns intersection stacking: pinned body cells below headers, pinned header corners above other headers. Container directly owning a sticky-header table uses a one-CSS-pixel leading-edge clip with an opaque compositing mask to prevent fractional raster leakage, with inset focus so the indicator remains visible. No layout padding or application z-index fix is needed. Keep native semantics and use real controls for sorting/selection.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Preserve native table anatomy and meaningful row and column headers; do not rebuild tabular comparison with generic Grid, Stack, div, or ARIA role substitutes.
- **MUST:** Author Table.Container or a separately labelled Scroll Area when wide comparison needs overflow; Root never inserts a wrapper and Table never hides columns or converts them into cards.
- **MUST:** At narrow widths, preserve header-to-cell relationships, complete material values, and an understandable comparison path rather than merely stacking unrelated plan or record cards.
- **MUST:** For bounded vertical scrolling, let the stable Scroll Area viewport own the visible border and radius; do not use a moving Table outline as the scroll-frame boundary.
- **MUST:** Let the application sort data and pass sortDirection only to the active header; SortIndicator is decorative and never supplies the control, name, or behavior.
- **MUST:** Load styles.css or core.css plus table.css.
- **MUST:** Use surface, borderTone, showColumnBorder, layout, align, and verticalAlign as independent presentation decisions; outline does not imply vertical column rules.
- **MUST:** Place Column only inside ColumnGroup and ColumnGroup directly inside Root before row groups; use htmlWidth only as a native CSS-pixel number or percentage sizing hint, not as a CSS-unit value, schema, measurement, or resizing API.
- **MUST:** Use Root minInlineSize and Row variant=section for reusable comparison geometry; do not target Table internals from Block CSS for those relationships.
- **MUST:** Use selected only as presentation alongside a named Checkbox. Compose useSelection and ActionDelegate for record selection and primary activation; retain native semantics, actual controls and independent secondary actions. Never add row role=button or a tab stop. See docs/guides/record-selection.md.
- **MUST:** Size, density and variant support sparse shared breakpoints. sm/md/lg use 14/14/16px type and 8/12/16px inline insets; density controls vertical spacing. Keep sorting on a named Button and preserve native Table semantics when composing an optional TanStack engine. SortIndicator accepts custom decorative children.

## Common mistakes

- **Avoid:** Using generic layout components for a pricing matrix because custom positioning feels easier. **Instead:** Use Table's native Head and Cell relationships, then customize the closed recipes and public Table variables for the product-specific comparison.
- **Avoid:** Hiding material columns on mobile or visually cloning labels into card rows. **Instead:** Contain honest horizontal overflow or provide a separately authored application view; do not destroy or fake the native column relationships.
- **Avoid:** Making rows hoverable or clickable without a complete interaction owner. **Instead:** Keep rows structural and place independently named Brick links or buttons inside the appropriate cells.
- **Avoid:** Using Table variant=outline as the visible frame inside a vertically scrolling viewport. **Instead:** Paint the stable Scroll Area viewport with Surface, use Table variant=line inside it, and connect a persistent external label with aria-labelledby.
- **Avoid:** Using a visible recommendation color as the only explanation for a preferred pricing column. **Instead:** Keep the plan label and recommendation reason readable in ordinary text, then use Table paint only as supporting emphasis.

## Validation checklist

- Check caption or surrounding naming, header scope, cell associations, source order, plan or record labels, and independently named controls.
- Check Container overflow, Root minInlineSize, section-row boundaries, stable viewport corners during vertical scrolling, sticky header boundaries when used, 320 CSS pixels, zoom, long content, RTL, and no page-level horizontal overflow. With both sticky axes, verify actual intersection paint/hit testing after horizontal and vertical scroll, not only position or bounding boxes.
- Check light and dark themes, forced colors, row and column boundaries, recommendation meaning without color, focus visibility for interactive descendants, and CSS delivery.
- Check that sorting, selection, filtering, pagination, data services, and responsive alternate-view policy remain application owned.

## Related guidance

- `@flowstack-ui/atom/agents/table`
- `data-grid`
- `tree-grid`
- `scroll-area`
- `button`
- `badge`
- `icon`
- `text`
