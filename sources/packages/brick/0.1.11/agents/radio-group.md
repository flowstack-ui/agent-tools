# RadioGroup agent guide

## Purpose

Present a finished short visible form choice set with exactly one selected value while Atom owns radiogroup semantics, roving focus, keyboard selection, validation, and submission.

## Use when

- A user must choose exactly one option from a short visible list whose choices are best compared together.

## Choose something else when

- Several choices may be selected, a long list should stay compact, or the controls are pressed commands rather than form answers. Use CheckboxGroup, Select, or ToggleGroup.

## Required composition

- Give RadioGroup.Root an accessible group name and compose one uniquely valued RadioGroup.Item per visible option. Use Fieldset with Legend, Description, and Error when the set needs visible group labeling or validation context; use name and form when the selected value must submit.
- Root owns sm, md, or lg size and vertical or horizontal layout. Each Item owns its complete visible option label while Brick supplies the private circular control and checked dot.

## Rules

- **MUST:** Use RadioGroup for exactly one short visible form choice; use CheckboxGroup for independent choices, Select for a compact longer list, and ToggleGroup for pressed commands.
- **MUST:** Give Root an accessible group name through native ARIA or Fieldset Legend and give every Item a complete visible or native accessible option name.
- **MUST:** Give every Item a stable unique value and use value with onValueChange for controlled state or defaultValue for uncontrolled state.
- **MUST:** Preserve the selected or first enabled Item as the one Tab stop, disabled-item skipping, looping policy, and orientation- and direction-aware Arrow, Home, End, and Space behavior.
- **MUST:** Use readOnly when the selected value must remain focusable and submitted while preventing pointer, Space, and navigation-driven changes; do not substitute disabled.
- **MUST:** Preserve group-level required validity, first-enabled validation focus, Fieldset state and descriptions, named hidden-radio submission, and uncontrolled form reset.
- **SHOULD:** Use vertical for scan-heavy groups and horizontal only when wrapped DOM reading order remains clear under narrow widths, zoom, localization, and RTL.
- **MUST:** Load styles.css or core.css plus radio-group.css and Fieldset CSS when composed.

## Common mistakes

- **Avoid:** Omitting the group name, giving every Item a Tab stop, using RadioGroup for independent choices, or disabling a value that should remain read-only. **Instead:** Use the named Atom-owned roving group, choose CheckboxGroup for independent choices, and preserve focus and submission with readOnly.
- **Avoid:** Treating the private circle or surrounding layout as the option label or applying validation to every row independently. **Instead:** Label every Item with its visible content and keep shared required or invalid messaging at Root or Fieldset scope.

## Validation checklist

- Verify Root and Item names, unique values, controlled and uncontrolled selection, one roving Tab stop, disabled skipping, vertical and horizontal Arrow keys, Home/End, Space, looping, explicit and inherited LTR and RTL, pointer activation, and composition semantics.
- Verify read-only focus without value changes, group-level required validation with and without name, first-enabled validation focus, Fieldset descriptions and errors, hidden submission value, form association, and uncontrolled reset.
- Verify three sizes, vertical and wrapping horizontal layout, long labels, narrow widths, 200% text and 400% zoom, touch targets, light and dark appearance, forced colors, RTL, and complete CSS.

## Related guidance

- `@flowstack-ui/atom/agents/radio-group`
- `checkbox-group`
- `select`
- `toggle-group`
- `fieldset`
- `form`
