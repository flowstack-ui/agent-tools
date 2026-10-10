# Reorderable List agent guide

## Purpose

Provide a finished list for deliberate manual ordering while Atom owns drag, touch, keyboard, focus, announcements, cancellation, and reorder state behavior.

## Use when

- A person deliberately arranges one controlled collection, displayed as a vertical list, horizontal list, or row-major wrapping grid.

## Choose something else when

- The application is sorting data automatically or changing a table sort key. Use DataGrid or an application-owned sort control.
- Items move between columns, tree parents, freeform coordinates, or external applications. Use A dedicated Kanban, tree, spatial, or file-transfer composition over Atom DragDrop.
- The content is static and has no manual ordering job. Use List.

## Required composition

- Optionally place Preview inside Root for passive pointer feedback. Keep its children non-interactive; use an untransformed scoped portal container in dialogs or local themes. Size and variant accept responsive values; radius uses shared Radius; motion honors reduced motion.
- Compose Root > Item > Handle + Content + Actions containing visible direct Move controls + DropIndicator.
- Keep application data keyed by each Item value and update that data from Root onItemsChange; persistence, Undo, conflicts, and validation remain application-owned.
- Let Brick move direct Actions below Content when a vertical list's own container is narrow; do not add viewport logic or duplicate the item tree for this relationship.
- Use layout="grid" for row-major grids or wrapping Flex. Use displacement="none" for index-dependent CSS sizing. Keep stable item sizes and avoid dense, reverse, spanning, masonry, or arbitrary CSS-order layouts.
- The default Preview renders a decorative six-dot grip and item label. Custom Preview children replace that default; keep them passive and do not mount another Handle.
- Active draggable sources and handles expose data-drag-input (pointer or keyboard), absent when idle. Brick keeps a same-document grabbing cursor during pointer reordering, independent of Preview; authored cursors return when the drag ends.

## Rules

- **MUST:** Use stable unique values for Root items and matching Item values; never use visual indexes as identity.
- **MUST:** Provide getItemLabel plus localized aria-label values for every Handle and direct Move control.
- **MUST:** Always provide visible direct movement controls or an equivalent simple-pointer alternative; keyboard dragging alone is insufficient.
- **MUST:** Keep persistence, Undo, optimistic updates, server conflicts, validation, and automatic sorting outside ReorderableList.
- **MUST:** Load styles.css or core.css plus reorderable-list.css.

## Common mistakes

- **Avoid:** Using ReorderableList as a sortable table, persisting inside the component, omitting accessible movement names, or making drag the only usable path. **Instead:** Choose the component by user job, keep workflow state in the application, label every control, and always expose a non-drag movement alternative.

## Validation checklist

- Check direct movement, keyboard lift/move/drop/cancel, mouse and touch movement, focus preservation, disabled and read-only states, and announcement copy.
- Check that narrow vertical lists preserve a useful content measure by moving direct Actions below Content, then check horizontal overflow, RTL, zoom, reduced motion, forced colors, light and dark appearance, focus-ring containment, and insertion feedback.
- Check grid row crossings, unequal-width wrapping, spatial arrow keys, preserved DOM/focus during hover, cancellation, and committed two-axis geometry.

## Related guidance

- `list`
- `data-grid`
- `tree`
- `swipeable-item`
