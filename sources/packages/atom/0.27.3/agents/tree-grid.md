# TreeGrid agent guide

## Purpose

Combine hierarchical row expansion with ARIA grid cell navigation, active-descendant focus, indexed row and cell relationships, optional row selection, and actionable header boundaries.

## Use when

- Hierarchical parent-child rows expand and each row also exposes several navigable columns, such as a structured file browser.

## Choose something else when

- The hierarchy has one primary item column, rows are flat, or people only read a noninteractive table. Use Tree, DataGrid, or Table.
- The application expects Atom to own sorting, filtering, editing persistence, column width application, or virtualization. Use an application composition around TreeGrid and the relevant utility.

## Required composition

- Give Root an accessible name and accurate logical totals, optionally place native ColumnGroup and Column sizing hints before Header, then compose Caption when useful, Header and Body rowgroups, uniquely valued Rows with stable parentValue and level metadata, one RowHeader in the tree column, indexed ColumnHeader and Cell parts, and optional Footer summaries. Configure expansion, active-cell state, and selection deliberately.

## Rules

- **MUST:** Opt into Cell, RowHeader or ColumnHeader interactive for child controls. F2 enters controls and Escape returns to navigation; Enter preserves ColumnHeader.onAction. Do not steal editing keys or expose stale active descendants while child controls have focus.
- **MUST:** Use Trigger with RowHeader.expandOnClick=false for independent disclosure. Compose a named ColumnResizeHandle inside an interactive indexed header and apply its controlled width to the column; keep the default negative tabIndex for F2 entry.
- **MUST:** Sort siblings recursively and flatten preorder, never sort the flat list independently. Preserve parent relationships and recompute truthful logical coordinates after reordering.
- **MUST:** Name Root and preserve treegrid, rowgroup, row, rowheader, columnheader, and gridcell relationships with stable row values, parent values, levels, and one-based logical coordinates.
- **MUST:** Keep navigation focus on Root except during explicit interactive-cell entry. Preserve eligible initial focus and recovery, visible-cell arrows, RTL expansion, Home/End, pageSize movement, disabled skipping, range selection, visible select-all and loop policy.
- **MUST:** Mark only real parent Rows expandable, keep descendants hidden from navigation while an ancestor is collapsed, and allow Atom to relocate an active descendant to the collapsed ancestor's tree-column cell.
- **MUST:** Align scalar, array, or null value with selectionMode, use stable unique Row values, and distinguish selectable=false from disabled for parent, header, and summary rows.
- **MUST:** Use ColumnHeader onAction for equivalent pointer and Enter activation, keep sortDirection truthful, and keep sorting, editing, filtering, and persistence application-owned.
- **MUST:** When windowing hierarchical rows, preserve logical totals, indexes, levels, and parent visibility and keep the active cell and collapse destination mounted; Virtualizer owns geometry only.
- **MUST:** Treat Column.htmlWidth as a native CSS-pixel number or percentage sizing hint only; do not pass CSS-unit values, and do not use it to define column indexes, columnCount, hierarchy, navigation, or resizing behavior.

## Common mistakes

- **Avoid:** Using TreeGrid for a one-column tree or a read-only hierarchical table without composite cell navigation. **Instead:** Use Tree for one-dimensional hierarchy and prefer simpler native structure when interactive grid behavior is absent.
- **Avoid:** Deriving parentValue, level, rowIndex, or identity from the current visible slice during virtualization. **Instead:** Supply stable logical hierarchy and full-collection coordinates independent of the rendered window.

## Validation checklist

- Verify Root naming and complete treegrid relationships, stable unique Row values, parentValue and level metadata, RowHeader ownership, logical row and column indexes, and full totals.
- Exercise LTR and RTL tree-column expansion, collapse and parent movement, next-cell arrows, vertical visible-row movement, Home and End, whole-grid movement, loop boundaries, disabled cells, and active relocation after collapse.
- Verify controlled and uncontrolled expansion and active-cell state, none/single/multiple row selection, nonselectable rows, disabled and read-only behavior, actionable header pointer and Enter parity, and truthful sort metadata.
- For virtualized hierarchies, verify hidden descendants do not enter navigation and the active descendant always resolves to a mounted visible cell.

## Related guidance

- `tree`
- `data-grid`
- `table`
- `collection`
- `virtualizer`
