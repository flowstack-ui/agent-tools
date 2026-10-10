# TreeGrid agent guide

## Purpose

Present finished hierarchical multi-column rows while Atom owns treegrid relationships, active-cell navigation, expansion, row selection, logical coordinates, and actionable-header semantics.

## Use when

- Parent-child rows expand and each visible row exposes several independently navigable columns, such as a structured file browser.

## Choose something else when

- The hierarchy has one primary column, rows are flat, or people only read native tabular relationships. Use Tree, DataGrid, or Table.

## Required composition

- Compose explicit TreeGrid.Container for horizontal overflow, then one named Root with truthful rowCount and columnCount, optional ColumnGroup and Column sizing hints before Caption, Header and Body rowgroups, optional Footer summaries, and uniquely valued indexed Rows. Give every data Row stable parentValue and level metadata, one column-one RowHeader with optional decorative Indicator or folder/file artwork, then indexed Cells. Avoid redundant chevron slots in file examples; use Trigger for independent disclosure. Pointer-down should activate its cell before native focus, while embedded controls retain their own focus.
- For application sorting, give an indexed ColumnHeader onAction, update records and sortDirection outside TreeGrid, and keep SortIndicator decorative. Compose Toolbar, filters, Pagination, status, and detail surfaces outside Root.
- Choose surface, border tone, optional column borders, layout, striping, sticky header, and cell alignment independently while preserving hierarchy and state contrast.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Name Root and preserve treegrid, rowgroup, row, rowheader, columnheader, and gridcell relationships with durable Row values, stable parentValue and level, one-based logical indexes, and truthful full totals.
- **MUST:** Keep Root as the navigation Tab stop. Opt cells into interactive to enter owned native controls with Enter/F2 and return with Escape; headers preserve Enter onAction and use F2 for child controls. Preserve visible-cell navigation, PageUp/PageDown, Home/End, disabled skipping and RTL-aware expansion.
- **MUST:** Mark only real parent Rows expandable, keep descendants hidden from navigation while any ancestor is collapsed, and let Atom relocate an active descendant to the collapsed ancestor's RowHeader cell.
- **MUST:** Align scalar, array, or null value with selectionMode, use stable unique Row values, keep active cell independent from selected rows, and distinguish selectable=false from disabled for headers, parents, and summaries.
- **MUST:** Use ColumnHeader onAction for equivalent pointer and active-header Enter activation, keep sortDirection truthful, and keep sorting, filtering, editing, resizing, data mutation, fetching, pagination, and persistence application-owned.
- **MUST:** Set interactive on cells containing native controls. Preserve editing and IME keys, own commit/cancel/validation in the application, and return focus before removing an editor. Keep hierarchy and sort artwork decorative. Trigger separates disclosure; ColumnResizeHandle provides pointer and logical keyboard resizing, while the application applies width to Column.
- **MUST:** If an application windows hierarchical rows, preserve logical totals, indexes, levels, parent visibility, and durable identities while keeping the active cell and collapse destination mounted; geometry utilities do not own treegrid focus or semantics. The windowing example uses the separately installed @tanstack/react-virtual optional integration; Brick does not bundle a virtualizer.
- **MUST:** Use Container for honest overflow and author minInlineSize for wide content. Preserve all columns at narrow sizes, responsive size/density/variant, independent neutral/accent selection tone, one outline boundary and logical indentation. Sticky cells use logical start/end with explicit offsets for multiple pinned columns.
- **MUST:** Load styles.css or core.css plus tree-grid.css and every stylesheet for external composed controls.
- **MUST:** Keep selected paint above hover, hover above stripes, and sticky headers opaque; hierarchy, active focus, selection, and disabled state must remain distinguishable in every surface recipe.
- **MUST:** Treat Column.htmlWidth as a native CSS-pixel number or percentage sizing hint only; do not pass CSS-unit values, and never use it to define logical indexes, columnCount, hierarchy, navigation, measurement, or resizing behavior.

## Common mistakes

- **Avoid:** Using TreeGrid for a one-column tree, deriving hierarchy from a page slice, or inserting controls without interactive. **Instead:** Choose Tree for one column, preserve logical hierarchy and coordinates, and opt controls into interaction mode.
- **Avoid:** Expecting sortDirection to reorder rows, hiding columns on mobile, or adding a second framed clipping wrapper around outline. **Instead:** Keep sorting application-owned, preserve honest overflow, and let Root own its complete border and corner paint.

## Validation checklist

- Verify Root naming and complete treegrid relationships, unique Row values, parentValue/level metadata, RowHeader ownership, one-based logical indexes, full totals, active descendant, selection metadata, disabled/read-only state, and sort direction.
- Exercise LTR/RTL expansion, collapse and parent movement, next-cell arrows, vertical movement, Home/End, whole-grid movement, loop boundaries, disabled cells, collapse relocation, none/single/multiple selection, nonselectable Rows, and header pointer/Enter parity.
- Verify controlled/uncontrolled expansion and active-cell state; both variants, sizes, densities, captions, numeric/logical alignment, Container overflow, deep hierarchy, 320px, zoom, RTL, long content, light/dark appearance, forced colors, reduced motion, and any windowed active target.

## Related guidance

- `@flowstack-ui/atom/agents/tree-grid`
- `tree`
- `data-grid`
- `table`
- `toolbar`
- `pagination`
- `scroll-area`
