# TreeGrid agent guide

## Purpose

Combine hierarchical row expansion with ARIA grid cell navigation, active-descendant focus, indexed row and cell relationships, optional row selection, and actionable header boundaries.

## Use when

- Hierarchical parent-child rows expand and each row also exposes several navigable columns, such as a structured file browser.

## Choose something else when

- The hierarchy has one primary item column, rows are flat, or people only read a noninteractive table. Use Tree, DataGrid, or Table.
- The application expects Atom to own sorting, filtering, editing, resizing, persistence, or virtualization. Use an application composition around TreeGrid and the relevant utility.

## Required composition

- Give Root an accessible name and accurate logical totals, then compose Caption when useful, Header and Body rowgroups, uniquely valued Rows with stable parentValue and level metadata, one RowHeader in the tree column, indexed ColumnHeader and Cell parts, and optional Footer summaries. Configure expansion, active-cell state, and selection deliberately.

## Rules

- **MUST:** Name Root and preserve treegrid, rowgroup, row, rowheader, columnheader, and gridcell relationships with stable row values, parent values, levels, and one-based logical coordinates.
- **MUST:** Keep DOM focus on Root and preserve active-descendant navigation across visible cells, RTL-aware expand and collapse behavior in the tree column, vertical row movement, Home and End, whole-grid movement, disabled skipping, and loop policy.
- **MUST:** Mark only real parent Rows expandable, keep descendants hidden from navigation while an ancestor is collapsed, and allow Atom to relocate an active descendant to the collapsed ancestor's tree-column cell.
- **MUST:** Align scalar, array, or null value with selectionMode, use stable unique Row values, and distinguish selectable=false from disabled for parent, header, and summary rows.
- **MUST:** Use ColumnHeader onAction for equivalent pointer and Enter activation, keep sortDirection truthful, and keep sorting, editing, filtering, and persistence application-owned.
- **MUST:** When windowing hierarchical rows, preserve logical totals, indexes, levels, and parent visibility and keep the active cell and collapse destination mounted; Virtualizer owns geometry only.

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
