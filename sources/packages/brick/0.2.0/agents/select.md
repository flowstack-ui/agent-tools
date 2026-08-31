# Select agent guide

## Purpose

Present one compact finished choice from a predefined list while Atom owns selection, trigger and listbox semantics, keyboard behavior, positioning, dismissal, validation, and native select form behavior.

## Use when

- A person chooses exactly one value from a predefined list whose options should stay collapsed until opened.

## Choose something else when

- A short set should remain visible, several values may be selected, editable filtering or free-form entry is required, or rows are commands or destinations. Use RadioGroup, MultiSelect, Combobox, DropdownMenu, or Link.

## Required composition

- Compose Select.Root with a named Select.Trigger containing Select.Value and optional Select.Icon, then exactly one Select.Content or Select.Listbox. Place stable uniquely valued Items with ItemText inside optional Viewport and Group with Label; add indicators, separators, scroll buttons, Portal, and a direct popup Arrow only when required.
- Use the same sm, md, or lg size as adjacent button-like controls. Keep locale loading, routing, persistence, analytics, and every other effect in onValueChange at the application boundary.

## Rules

- **MUST:** Use Select only for one predefined value and keep controlled value and open state aligned with their matching callbacks.
- **MUST:** Give Trigger a visible Field label or equivalent accessible name; placeholder and selected value are not the control name, and Trigger must retain combobox, expanded, controls, active-descendant, required, read-only, invalid, and disabled relationships.
- **MUST:** Give every Item a stable unique value and ItemText or label, keep interactive descendants out, and preserve that text for closed display, option naming, typeahead, and the hidden native select.
- **MUST:** Preserve Trigger-owned opening, Arrow/Home/End, typeahead, Enter/Space selection, Tab, Escape, disabled skipping, focus restoration, native select options and submission, required validity, external form association, and reset.
- **MUST:** Render Content or Listbox once, keep Arrow directly inside it, and keep scroll buttons outside the registered Viewport so Atom owns positioning, collision, dismissal, and overflow state.
- **MUST:** Keep translation loading, locale detection, persistence, navigation, analytics, and other effects in the application callback rather than inside Select.
- **MUST:** Load styles.css or core.css plus select.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Using placeholder or a selected code as the only name, omitting ItemText, rendering both popup owners, or rebuilding options as clickable rows. **Instead:** Name Trigger separately and preserve one Atom-owned popup with registered stable Items and ItemText.
- **Avoid:** Using Select for multiple or editable choice, commands, navigation rows, or hidden application state and effects. **Instead:** Choose MultiSelect, Combobox, DropdownMenu, or Link and connect legitimate value effects through onValueChange.

## Validation checklist

- Verify Trigger naming and Field relationships, controlled and uncontrolled value and open state, placeholder and closed selected label, pointer/touch and keyboard opening, active descendant, Home/End, typeahead, selection, disabled Items, Tab, Escape, outside activation, and focus return.
- Verify hidden native options and submission, required inline/native validity, external form, reset, groups and labels, Viewport and scroll buttons, Portal and non-Portal paths, Arrow placement, direction, collision handling, and nested modal ownership.
- Verify all sizes, long localized labels, narrow widths, zoom, RTL, touch targets, light and dark appearance, forced colors, and alignment with adjacent button-like controls.

## Related guidance

- `@flowstack-ui/atom/agents/select`
- `@flowstack-ui/atom/agents/listbox`
- `field`
- `form`
- `radio-group`
- `combobox`
- `multi-select`
- `dropdown-menu`
- `link`
