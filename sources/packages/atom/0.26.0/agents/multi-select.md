# MultiSelect agent guide

## Purpose

Choose several predefined values from a compact button-owned popup listbox with persistent toggling, value summary, positioning, validation, and native multiple-select form behavior.

## Use when

- Users choose several values from a predefined moderate collection and the options should remain collapsed until requested.

## Choose something else when

- A short choice set should stay visible, the collection should remain visible, only one value is allowed, or editable filtering, arbitrary tags, creation, range selection, or virtualization is required. Use CheckboxGroup, Listbox, Select, Combobox, or a higher-layer specialized control.

## Required composition

- Compose Root with an accessible Trigger containing optional Value and Icon, then one Content or Listbox with uniquely valued Items and ItemText. Add Portal, Viewport, groups and labels, separators, scroll buttons, indicators, and Arrow only as required by the popup.

## Rules

- **MUST:** Keep Trigger as a named button rather than role=combobox, and keep Content as the focusable aria-multiselectable listbox that owns required and read-only semantics.
- **MUST:** Use deduplicated array state for value and defaultValue, route controlled changes through onValueChange, and keep Content open while Items toggle.
- **MUST:** Give every Item a stable unique value and ItemText or label so summaries, option names, typeahead, and native options exist while the popup is closed.
- **MUST:** Preserve popup focus, Arrow and Home/End movement, typeahead, Space/Enter toggling without close, Escape focus restoration, Tab dismissal, disabled skipping, and completed preventable outside dismissal.
- **MUST:** Preserve the hidden native multiple select's complete option set, repeated selected values, name, form, disabled state, required validity, reset, and invalid-focus redirection to Trigger.

## Common mistakes

- **Avoid:** Giving Trigger combobox semantics, closing after every selection, using MultiSelect for arbitrary tag creation, or deriving form options only from an open popup. **Instead:** Keep the button/listbox model, persistent toggling, predefined scope, and statically registered native option contract.

## Validation checklist

- Verify Trigger and listbox naming, controlled/uncontrolled arrays and open state, deduplication, zero/one/many Value summaries and renderValue, popup focus, Arrow/Home/End, typeahead, Space/Enter toggling without close, disabled Items, Escape, Tab, outside activation, and focus restoration.
- Verify read-only on listbox rather than Trigger, Field relationships, hidden multiple-select options and repeated submission, required inline/native validation, external form, reset, groups, indicators, Viewport and scroll buttons, portals, direction, collision placement, and nested-modal behavior.

## Related guidance

- `select`
- `listbox`
- `combobox`
- `checkbox-group`
- `field`
- `form`
