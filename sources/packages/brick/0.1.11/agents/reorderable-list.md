# Reorderable List agent guide

## Purpose

Provide a finished list for deliberate manual ordering while Atom owns drag, touch, keyboard, focus, announcements, cancellation, and reorder state behavior.

## Use when

- A person needs to arrange a small linear collection into a meaningful saved order.

## Choose something else when

- The application is sorting data automatically or changing a table sort key. Use DataGrid or an application-owned sort control.
- Items move between columns, tree parents, freeform coordinates, or external applications. Use A dedicated Kanban, tree, spatial, or file-transfer composition over Atom DragDrop.
- The content is static and has no manual ordering job. Use List.

## Required composition

- Compose Root > Item > Handle + Content + optional Actions containing direct Move controls + DropIndicator.
- Keep application data keyed by each Item value and update that data from Root onItemsChange; persistence, Undo, conflicts, and validation remain application-owned.
- Let Brick move direct Actions below Content when a vertical list's own container is narrow; do not add viewport logic or duplicate the item tree for this relationship.

## Rules

- **MUST:** Use stable unique values for Root items and matching Item values; never use visual indexes as identity.
- **MUST:** Provide getItemLabel plus localized aria-label values for every Handle and direct Move control.
- **MUST:** Provide direct movement controls when drag precision, switch access, voice access, or discoverability requires a visible non-drag path.
- **MUST:** Keep persistence, Undo, optimistic updates, server conflicts, validation, and automatic sorting outside ReorderableList.
- **MUST:** Load styles.css or core.css plus reorderable-list.css.

## Common mistakes

- **Avoid:** Using ReorderableList as a sortable table, persisting inside the component, omitting accessible movement names, or making drag the only usable path. **Instead:** Choose the component by user job, keep workflow state in the application, label every control, and expose direct movement where needed.

## Validation checklist

- Check direct movement, keyboard lift/move/drop/cancel, mouse and touch movement, focus preservation, disabled and read-only states, and announcement copy.
- Check that narrow vertical lists preserve a useful content measure by moving direct Actions below Content, then check horizontal overflow, RTL, zoom, reduced motion, forced colors, light and dark appearance, focus-ring containment, and insertion feedback.

## Related guidance

- `list`
- `data-grid`
- `tree`
- `swipeable-item`
