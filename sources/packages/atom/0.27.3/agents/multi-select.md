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

- **MUST:** For opaque or async options, provide items records with value, label and disabled state; synchronize them with rendered Items for SSR labels and native form submission. Pass the original useMultiSelect controller to RootProvider once. Use lazyMount/unmountOnExit/present/onExitComplete for presence, ids for stable relationships, and preventDefault on the matching outside or Escape callback to cancel dismissal. Closed retained content stays inert.
- **MUST:** Use closeOnSelect, loopFocus, highlightedValue/onHighlightChange and positioning for owned selection and popup policy. Render ClearTrigger beside Trigger, never inside its button, with a localized accessible name. Preserve disabled/readOnly, native autofill and popup-local post-positioning scroll.
- **MUST:** Keep Trigger as a named button rather than role=combobox, and keep Content as the focusable aria-multiselectable listbox that owns required and read-only semantics.
- **MUST:** Use deduplicated array state for value and defaultValue, route controlled changes through onValueChange, and keep Content open while Items toggle unless closeOnSelect is enabled.
- **MUST:** Give every Item a stable unique value and ItemText or label so summaries, option names, typeahead, and native options exist while the popup is closed.
- **MUST:** Preserve popup focus, Arrow and Home/End movement, typeahead, Space/Enter toggling with the configured closeOnSelect policy, Escape focus restoration, Tab dismissal, disabled skipping, and completed preventable outside dismissal.
- **MUST:** Preserve the hidden native multiple select's complete option set, repeated selected values, name, form, disabled state, required validity, reset, and invalid-focus redirection to Trigger.
- **MUST:** With an Arrow mounted, positioning gutter/sideOffset measures the gap to the arrow tip; without an Arrow the gap is to content. Explicit positioning.offset remains a raw offset. Arrow layout-size changes are observed in the owner document when positioning listeners are enabled. Do not compensate for Arrow depth with an additional caller gutter.

## Common mistakes

- **Avoid:** Giving Trigger combobox semantics, bypassing closeOnSelect with a manual close handler, using MultiSelect for arbitrary tag creation, or deriving form options only from an open popup. **Instead:** Keep the button/listbox model, configured closing policy, predefined scope, and static or explicit native option records.

## Validation checklist

- Verify Trigger and listbox naming, controlled/uncontrolled arrays and open state, deduplication, zero/one/many Value summaries and renderValue, popup focus, Arrow/Home/End, typeahead, Space/Enter toggling with the configured closeOnSelect policy, disabled Items, Escape, Tab, outside activation, and focus restoration.
- Verify read-only on listbox rather than Trigger, Field relationships, hidden multiple-select options and repeated submission, required inline/native validation, external form, reset, groups, indicators, Viewport and scroll buttons, portals, direction, collision placement, and nested-modal behavior.

## Related guidance

- `select`
- `listbox`
- `combobox`
- `checkbox-group`
- `field`
- `form`
