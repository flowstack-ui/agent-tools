# Select agent guide

## Purpose

Choose one value from a compact trigger-owned popup listbox with typeahead, active-descendant focus, positioning, dismissal, Field integration, and native select form behavior.

## Use when

- A user chooses one value from a predefined list whose options should stay collapsed until the control opens.

## Choose something else when

- A short list should remain visible, several values may be chosen, or users need editable filtering or free-form entry. Use RadioGroup or Listbox, MultiSelect, or Combobox.

## Required composition

- Compose Root with an accessible Trigger containing optional Value and Icon, then one Content or Listbox popup. Add Portal only when needed; place Items with stable values and ItemText inside optional Viewport, Group with Label, separators, scroll buttons, indicators, and a direct popup Arrow as required.

## Rules

- **MUST:** Give Trigger an accessible name through native ARIA or Field labeling and preserve its combobox, expanded, controls, active-descendant, required, read-only, invalid, and disabled relationships.
- **MUST:** Use Select only for one predefined value and route controlled value and open state through their matching callbacks.
- **MUST:** Give every Item a stable unique value and ItemText or label so Trigger Value display, option naming, typeahead, and the hidden native select work even before the popup mounts.
- **MUST:** Preserve Trigger-owned Arrow, Home/End, printable typeahead, Enter/Space selection, Tab, Escape stack, disabled skipping, highlight, focus restoration, and completed outside-interaction behavior.
- **MUST:** Preserve the hidden native select's name, form, options, selected value, disabled state, required validity, reset, and validation-focus redirection to Trigger.
- **MUST:** Use either Content or Listbox once, keep Arrow inside it, and keep scroll buttons outside the registered Viewport so Atom can own positioning and overflow state.

## Common mistakes

- **Avoid:** Using Select for multiple or editable choice, omitting ItemText from complex options, rendering both Content and Listbox, or rebuilding keyboard and form behavior around a styled button. **Instead:** Choose the correct selection model and preserve Select's single popup, registered option text, Trigger ownership, and native form mirror.

## Validation checklist

- Verify Trigger naming and Field relationships, controlled/uncontrolled value and open state, placeholder and closed selected label, pointer/touch opening, Arrow and printable-key opening, active descendant, Home/End, typeahead, selection, disabled items, Tab, Escape, outside activation, and focus return.
- Verify native select options and submission, required inline/native validity, external form association, disabled/read-only/invalid state, reset, groups and labels, Viewport and scroll buttons, portal and non-portal paths, Arrow placement, direction, collision handling, and nested-modal ownership.

## Related guidance

- `listbox`
- `multi-select`
- `combobox`
- `radio-group`
- `field`
- `form`
