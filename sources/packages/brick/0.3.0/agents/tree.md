# Tree agent guide

## Purpose

Present a finished one-column hierarchy while Atom owns tree semantics, active-descendant focus, selection, expansion, typeahead, direction, Field state, and form submission.

## Use when

- People browse or optionally select expandable parent-child items with one primary content column, such as nested files, categories, or component groups.

## Choose something else when

- Hierarchical rows have several navigable columns, sections contain arbitrary disclosure content, data is flat and tabular, or the hierarchy is static reading content. Use TreeGrid, Accordion or Collapsible, DataGrid, or List.

## Required composition

- Give Tree.Root a stable accessible name and deliberate selection, expansion, direction, and form state. Compose uniquely valued Items containing required Brick ItemContent with optional decorative Indicator or folder/file artwork and reliable ItemText; place each nested Group as a sibling of ItemContent inside its actual parent Item.
- Choose responsive xs/sm/md size, compact/comfortable density and plain/soft/outline variant independently. Neutral/accent tone and subtle/solid selectionVariant style selection. Trigger separates disclosure from row selection; Checkbox owns separate checkedValue. Use createTreeCollection for logical data and useTreeController with RootProvider or controlled rootProps.
- Plain click replaces multiple selection; Ctrl/Command-click toggles and Shift-click or Shift-navigation extends a range. When parents alone have a leading Trigger, align child icons or checkboxes by setting --brick-tree-depth-indent to calc(var(--brick-tree-trigger-size) + var(--brick-tree-row-gap)); do not add empty interactive leaf triggers. Guides are opt-in and separate from indentation; omit redundant chevrons in file artwork compositions. Choose borderTone deliberately for outline boundaries and hierarchy guides; use subtle only when its contrast remains visible on the actual parent surface. Group.animate opts into measured expansion motion. Root.loadChildren owns abortable request lifecycle; applications insert returned children and render loading/error/retry status.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Name Root and preserve tree, treeitem, and group relationships, automatic levels, ItemText labeling, and parent-child nesting; use Brick ItemContent as the one finished row paint owner.
- **MUST:** Give every Item a durable unique value, align scalar or array selection with multiple, and keep selection and expandedValue controlled or uncontrolled without mixing ownership.
- **MUST:** Keep Root as the navigation Tab stop. Item.interactive opts into owned controls: Enter/F2 enters, Escape returns to Root, and editing/IME keys stay native. Preserve active-descendant focus outside interaction mode, visible-item movement, direction-aware expansion, disabled skipping and scroll reveal.
- **MUST:** Mark only actual parent Items expandable, hide collapsed descendants from navigation, and allow Atom to relocate active state to a visible ancestor or reset when controlled expansion hides it.
- **MUST:** Preserve Field naming and descriptions, disabled, read-only, required, invalid, and named submission; read-only may navigate but must not mutate selection or expansion through selection keys.
- **MUST:** Keep Indicator decorative, ItemText reliable for naming/typeahead and active focus distinct from selected fill. Opt Item into interactive before composing buttons, links or editors. Application code owns rename validation, commit/cancel and persistence. Checking is independent from selection and named selection submission; supply the complete collection for descendant propagation through unmounted branches.
- **MUST:** If an application windows a large tree, it must retain complete logical parent and level metadata and keep the active descendant and expansion target mounted; geometry utilities do not reconstruct tree semantics. The windowing example uses the separately installed @tanstack/react-virtual optional integration; Brick does not bundle a virtualizer.
- **MUST:** Load styles.css or core.css plus tree.css and every stylesheet for adjacent composed controls.

## Common mistakes

- **Avoid:** Using Tree for arbitrary disclosures, marking leaves expandable for an icon, placing Group outside its parent, or giving every Item a Tab stop. **Instead:** Choose Accordion or Collapsible for content, mark only real parents, keep nested Group inside its Item, and preserve Root-owned composite focus.
- **Avoid:** Omitting ItemText, using visual-index values, inserting controls without interactive, or treating checking as selection. **Instead:** Register searchable text and durable identities; opt into the owned interaction mode and control checkedValue separately from value.

## Validation checklist

- Verify Root naming; tree/treeitem/group relationships; automatic levels; ItemText names; unique values; parent nesting; collapsed visibility; controlled and uncontrolled single/multiple selection and expansion; read-only; Field state; form submission; and collapse of the active branch.
- Exercise initial focus, LTR/RTL expand and parent keys, Up/Down, Home/End, loop boundaries, typeahead cycling and prefixes, pointer selection, disabled Items, scroll reveal, force-mounted hidden Groups, native props, refs, and composition.
- Verify all recipes and sizes, showGuide, long wrapping labels, deep indentation, narrow width, zoom, RTL, active versus selected paint, touch density, light/dark appearance, forced colors, reduced motion, and any windowed active target.

## Related guidance

- `@flowstack-ui/atom/agents/tree`
- `tree-grid`
- `accordion`
- `collapsible`
- `data-grid`
- `list`
- `field`
- `form`
