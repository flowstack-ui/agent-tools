# MultiSelect agent guide

## Purpose

Present several selected predefined values in a compact finished control while Atom owns array state, popup listbox focus, persistent toggling, positioning, validation, and native multiple-select submission.

## Use when

- A person chooses zero or more values from a predefined moderate collection that should remain collapsed until requested.

## Choose something else when

- A short choice set should stay visible, only one value is allowed, or editable filtering, arbitrary tags, creation, range selection, or virtualization is required. Use CheckboxGroup, Select, Combobox, or a documented Brick gap or higher-layer specialized control.

## Required composition

- Compose MultiSelect.Root with a named button Trigger containing Value and optional Icon, then exactly one Content or Listbox with stable uniquely valued Items and ItemText. Add Portal, Viewport, groups and labels, separators, scroll buttons, indicators, and a direct Arrow only as required.
- Use sm, md, or lg consistently with adjacent button-like controls. Keep selected values, persistence, remote data, and application effects at the application boundary.

## Rules

- **MUST:** Use MultiSelect only for several predefined values; do not add editable filtering, arbitrary tags, commands, destinations, range selection, or virtualization.
- **MUST:** Keep Trigger a separately named button rather than role=combobox and keep Content or Listbox as the focusable aria-multiselectable owner of required and read-only semantics.
- **MUST:** Use deduplicated arrays for value and defaultValue, route controlled changes through onValueChange, and keep the popup open while Items toggle.
- **MUST:** Give every Item a stable unique value and ItemText or label so summaries, option names, typeahead, and native options remain complete while the popup is closed.
- **MUST:** Preserve popup focus, Arrow/Home/End, typeahead, Space/Enter toggling without close, Escape focus restoration, Tab dismissal, disabled skipping, native repeated-value submission, required validity, external form, and reset.
- **MUST:** Keep Trigger, summaries, and collision-aware popup contained under long localization, narrow widths, zoom, and RTL; do not place removal buttons inside the v1 button Trigger.
- **MUST:** Load styles.css or core.css plus multi-select.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Giving Trigger combobox semantics, using selected summary as its name, closing after each toggle, or deriving native options only from an open popup. **Instead:** Preserve the named button/listbox model, persistent toggling, static Item registration, and complete native option contract.
- **Avoid:** Adding text entry, arbitrary tag creation, interactive descendants, or application persistence inside the component. **Instead:** Keep predefined noninteractive Items and choose an approved editable higher-layer pattern or record the missing Brick capability.

## Validation checklist

- Verify Trigger and listbox names, controlled and uncontrolled arrays and open state, deduplication, zero/one/many summaries and renderValue, popup focus, Arrow/Home/End, typeahead, Space/Enter without close, disabled Items, Escape, Tab, outside activation, and focus restoration.
- Verify read-only on the listbox, Field relationships, hidden multiple-select options and repeated submission, required inline/native validation, external form, reset, groups, indicators, Viewport, scroll buttons, Portal, direction, collision placement, and nested modal behavior.
- Verify all sizes, long summaries and option labels, narrow widths, zoom, RTL, touch targets, light and dark appearance, forced colors, and button-like control alignment.

## Related guidance

- `@flowstack-ui/atom/agents/multi-select`
- `@flowstack-ui/atom/agents/listbox`
- `field`
- `form`
- `select`
- `combobox`
- `checkbox-group`
