# DataGrid agent guide

## Purpose

Provide a flat ARIA grid with one Root focus target, active-descendant cell navigation, optional row selection, indexed semantics, and actionable column-header boundaries.

## Use when

- A flat row-and-column dataset needs two-dimensional keyboard cell navigation, optional row selection, or interactive grid headers.

## Choose something else when

- People only read and compare tabular values without composite cell navigation or row selection. Use Table.
- Rows expand into a parent-child hierarchy, or the application expects Atom to own sorting, editing, filtering, resizing, or virtualization. Use TreeGrid or an application composition around DataGrid and the relevant utility.

## Required composition

- Give Root an accessible name and accurate total counts, then compose Caption when useful, Header and Body rowgroups, uniquely valued and accurately indexed Rows, indexed ColumnHeader and Cell parts, and Footer only for summaries. Configure selection and controlled active-cell state deliberately.

## Rules

- **MUST:** Give Root an accessible name and provide stable one-based row and column indexes plus accurate rowCount and columnCount, including the logical full collection when rows are paged or virtualized.
- **MUST:** Keep DOM focus on Root and preserve aria-activedescendant, Arrow movement, Home and End, whole-grid movement, disabled-cell skipping, RTL mirroring, loop, and wrapRows policy.
- **MUST:** Align scalar, array, or null state with selectionMode; give selectable rows stable unique values; and use selectable=false for header or summary rows that remain navigable but cannot be selected.
- **MUST:** Preserve controlled or uncontrolled active-cell and selection state, disabled behavior, and read-only navigation without selection mutation.
- **MUST:** Use ColumnHeader onAction for equivalent pointer and active-header Enter activation, keep sortDirection truthful, and leave sorting and data reordering to the application.
- **MUST:** When windowing, preserve logical indexes and totals and keep the active descendant mounted or move active state before its cell leaves the DOM; Virtualizer supplies geometry, not grid semantics or focus management.

## Common mistakes

- **Avoid:** Using DataGrid for a read-only table or adding independent Tab stops to every cell. **Instead:** Use Table for read-only comparison and keep DataGrid Root as the composite focus owner.
- **Avoid:** Using visible array indexes as unstable identity, omitting logical counts during virtualization, or expecting sortDirection to sort rows. **Instead:** Keep durable row values, logical one-based coordinates and totals, and application-owned sorting synchronized with header metadata.

## Validation checklist

- Verify grid, rowgroup, row, columnheader, and gridcell relationships; Root naming; one-based logical indexes and totals; and active-descendant IDs against the final DOM.
- Exercise LTR and RTL Arrow navigation, vertical column preservation, Home and End, whole-grid movement, loop and wrapRows boundaries, disabled cells, pointer activation, and consumer cancellation.
- Verify none, single, and multiple controlled and uncontrolled selection; nonselectable rows; disabled and read-only state; actionable header pointer and Enter parity; and truthful sort metadata.
- For paged or virtualized data, verify offscreen totals and positions remain accurate and focus never references an unmounted cell.

## Related guidance

- `table`
- `tree-grid`
- `collection`
- `virtualizer`
