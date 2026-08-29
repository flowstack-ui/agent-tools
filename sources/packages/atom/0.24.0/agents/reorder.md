# Reorder agent guide

## Purpose

Provide accessible manual reordering for one controlled linear collection through drag, keyboard movement, and direct movement controls.

## Use when

- A user deliberately controls the saved order of items in one vertical or horizontal list.

## Choose something else when

- Items are ordered automatically by a data field, query, table header, or server sort rule. Use the collection's sorting API.
- Movement changes tree parents, table row semantics, Kanban containers, or freeform coordinates. Use a component-specific adapter built on DragDrop.

## Required composition

- Provide Root with stable item identities, getItemLabel, controlled onItemsChange, and one keyed Item for each identity in the same order.
- Place a labelled Handle and visible MoveBefore/MoveAfter or equivalent movement controls inside every movable Item.
- Optionally render DropIndicator for styled insertion feedback; keep application content and controls inside each Item.

## Rules

- **MUST:** Treat Root items as the canonical controlled identity order and render Items in that same order.
- **MUST:** Provide stable identities and human getItemLabel output for instructions and announcements.
- **MUST:** Include visible direct movement controls so the operation does not require a dragging path.
- **MUST:** Do not combine active automatic sorting with manual reordering unless the application clearly disables or reconciles one behavior.
- **SHOULD:** Keep persistence, optimistic updates, Undo, conflicts, validation, and error recovery in the application.

## Common mistakes

- **Avoid:** Using the rendered index as Item value or rendering Items in an order different from Root items. **Instead:** Use durable record IDs and render the controlled identity order exactly.
- **Avoid:** Showing only a drag handle because keyboard users can also move it. **Instead:** Keep the handle and add visible MoveBefore/MoveAfter or an equally direct simple-pointer alternative.
- **Avoid:** Using Reorder to change a sorted result set while its sort remains active. **Instead:** Disable reordering or switch the collection to a documented manual-order mode first.

## Validation checklist

- Verify drag, keyboard, and direct-control changes emit the same final identity order and accurate previous/next indices.
- Verify boundary controls disable correctly and disabled/read-only Items cannot move.
- Verify focus remains on the same keyed control after re-render, including first/last movement and RTL horizontal order.
- Verify application persistence failures can be recovered without Atom owning remote state.

## Related guidance

- `drag-drop`
- `list`
- `collection`
- `data-grid`
- `tree`
