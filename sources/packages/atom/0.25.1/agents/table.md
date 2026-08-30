# Table agent guide

## Purpose

Render native tabular structure for read-oriented row and column relationships, with caption, section, header, cell, and sort metadata anatomy.

## Use when

- People primarily read and compare values whose row and column relationships are meaningful, without composite grid navigation or row selection.

## Choose something else when

- Cells need two-dimensional keyboard navigation or rows need composite selection. Use DataGrid.
- Rows are hierarchical and expand into nested rows with several columns, or the content has no meaningful column relationships. Use TreeGrid or List.

## Required composition

- Compose Root with a naming Caption or equivalent accessible name, Header and Body section groups, Row, correctly scoped Head cells, and Cell parts; add Footer only for genuine summary rows and put an interactive control inside Head only when sorting is application-controlled.

## Rules

- **MUST:** Preserve native table, caption, section, row, th, and td semantics and valid table nesting; do not add an ARIA grid interaction model to read-only data.
- **MUST:** Give the table an accessible name or useful caption when surrounding context does not already identify it.
- **MUST:** Use Head for actual headers and choose scope or explicit native header relationships that accurately associate headers with data cells.
- **MUST:** Treat sortDirection as metadata only; place a labelled interactive control inside a sortable Head and keep sorting, data order, and state application-owned.
- **MUST:** Do not invent table-level keyboard navigation or Tab stops; only genuine interactive descendants participate in keyboard focus.

## Common mistakes

- **Avoid:** Using Table because data looks rectangular even though users must navigate cells or select rows as one composite widget. **Instead:** Use DataGrid for a flat interactive grid or TreeGrid for a hierarchical interactive grid.
- **Avoid:** Setting sortDirection on Head without a keyboard-operable sorting control or expecting Atom to reorder data. **Instead:** Nest a labelled Button or Pressable, update application sorting, and keep sortDirection synchronized with the result.

## Validation checklist

- Inspect the final DOM for valid native table nesting, an appropriate accessible name, correct header scope or associations, and meaningful caption and footer content.
- Verify sortable headers expose accurate aria-sort, provide equivalent keyboard and pointer activation through a real control, and update application-owned data without adding table-level focus behavior.
- Verify server-safe rendering and asChild or render overrides preserve the required native semantics, props, and refs.

## Related guidance

- `data-grid`
- `tree-grid`
- `list`
- `button`
