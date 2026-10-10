# Tree agent guide

## Purpose

Provide one-dimensional hierarchical navigation with tree semantics, active-descendant focus, controlled selection and expansion, typeahead, form state, and nested group relationships.

## Use when

- Users navigate and optionally select expandable parent-child items in one primary column, such as a file browser or category picker.

## Choose something else when

- Each hierarchical row has several navigable columns, or the sections contain general disclosure content rather than selectable items. Use TreeGrid or Accordion.
- Items form a flat option collection without parent-child expansion. Use Listbox.

## Required composition

- Give Root an accessible name and deliberate selection, expansion, orientation, direction, and form state. Compose uniquely valued Item parts with ItemText for reliable naming and typeahead, mark only real parents expandable, and place each nested Group inside its parent Item.

## Rules

- **MUST:** Use createTreeCollection for logical hierarchy and useTreeController with RootProvider value or spread rootProps for external controls. The controller exposes selection, checking, expansion, focus setters and explicit getNodeState queries; mixed checking remains a context query. Preserve unique values, ancestor paths and explicit rendering. selectionMode overrides multiple; none and Item.selectable=false omit aria-selected. Nonselectable items remain navigable and expandable.
- **MUST:** Use Trigger with expandOnClick=false for independent disclosure. Keep checkedValue separate from selection value; descendants checking requires the complete logical collection for unmounted children. Root name submits selection, not checked values.
- **MUST:** Publish loaded children in application state and honor the loadChildren AbortSignal; render loadingValues, loadErrors and retryLoad from context. Undefined children allow loading, while an empty children array means loaded and empty.
- **MUST:** Opt into Item.interactive for native links and actions, preserve Enter/F2 entry and Escape return, and keep their keys independent from tree navigation. Group.animate only supplies presence and measured --content-height; presentation must honor reduced motion and closing groups remain inert.
- **MUST:** Name Root and preserve tree, treeitem, and group relationships, automatic levels, ItemText labeling, and parent-child nesting.
- **MUST:** Give every Item a stable unique value; align scalar or array selection with multiple; and keep selection and expandedValue controlled or uncontrolled without mixing ownership.
- **MUST:** Multiple selection replaces on ordinary click and toggles with Ctrl/Command-click; Shift-click and Shift-navigation extend the visible range. Keep navigation focus on Root except during explicit interactive-item entry. Preserve controlled focusedValue, disabled skipping, Home/End, typeahead, expansion, RTL, range selection and visible select-all; pointer hover must not replace keyboard focus.
- **MUST:** Mark only actual parent Items expandable, keep collapsed descendants out of visible navigation, and ensure active state relocates to a visible ancestor or resets when controlled expansion hides it.
- **MUST:** Preserve Field naming and descriptions, disabled, read-only, required, invalid, and named form submission; read-only may navigate but must not change selection or expansion through selection keys.
- **MUST:** If a large tree is windowed, retain complete parent relationships and logical accessibility metadata and keep the active descendant and expansion target mounted; generic Virtualizer does not reconstruct tree semantics.

## Common mistakes

- **Avoid:** Building arbitrary disclosure sections as treeitems or marking leaf Items expandable merely to show an icon. **Instead:** Use Accordion for content sections and set expandable only when the Item owns a nested Group.
- **Avoid:** Giving each Item a Tab stop, omitting ItemText for complex labels, or allowing duplicate values. **Instead:** Keep Root as the sole composite focus target, register reliable visible text, and use durable unique identities.

## Validation checklist

- Verify Root naming; tree, treeitem, and group relationships; automatic levels; ItemText naming; unique values; nested visibility; and form submission in the final DOM.
- Exercise initial focus, LTR and RTL expansion and parent keys, orientation movement, Home and End, loop boundaries, typeahead cycling and prefixes, pointer selection, disabled Items, and scroll-to-nearest behavior.
- Verify single and multiple controlled and uncontrolled selection, controlled expansion, collapse of the active branch, force-mounted hidden Groups, read-only and Field state, and asChild or render prop merging.
- For windowed trees, verify every visible level and parent relationship is correct and aria-activedescendant never references an unmounted Item.

## Related guidance

- `tree-grid`
- `accordion`
- `listbox`
- `collection`
- `virtualizer`
