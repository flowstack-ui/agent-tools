# RadioGroup agent guide

## Purpose

Manage one selected form option with radiogroup semantics, roving focus, orientation-aware keyboard navigation, validation, and optional native submission.

## Use when

- A user must choose exactly one option from a short visible list whose choices are best compared together.

## Choose something else when

- Several choices may be selected, the list is long and should stay compact, or the controls are pressed commands rather than form answers. Use CheckboxGroup, Select, or ToggleGroup.

## Required composition

- Give Root an accessible group name and compose uniquely valued Radio parts with visible or native accessible names. Use name and form for native submission and a Fieldset Legend when the option set needs a visible legend.

## Rules

- **MUST:** Give Root an accessible name with native ARIA or an inherited Fieldset Legend and give every Radio an accessible option name.
- **MUST:** Use value with onValueChange for controlled state or defaultValue for uncontrolled state, and provide stable unique Radio values.
- **MUST:** Preserve the selected or first enabled Radio as the single Tab stop, skip disabled Radios, and use Root orientation and direction for Arrow, Home, and End focus and selection behavior.
- **MUST:** Keep read-only groups focusable and submitted while preventing pointer, Space, and navigation-driven value changes; Arrow navigation may still expose every option by focus.
- **MUST:** Preserve group-level required validity, first-enabled validation focus, named hidden radio submission, Fieldset integration, and uncontrolled form reset.

## Common mistakes

- **Avoid:** Giving every Radio a Tab stop, omitting the group name, using RadioGroup for independent choices, or disabling a read-only group and losing focus and submission. **Instead:** Use the owned roving radiogroup model, choose CheckboxGroup for independent choices, and use readOnly when the selected value must remain discoverable and submitted.

## Validation checklist

- Verify controlled and uncontrolled selection, Root and Radio naming, one roving Tab stop, disabled skipping, orientation-specific Arrow keys, Home/End, Space, looping, explicit and inherited LTR/RTL, pointer activation, and asChild/render semantics.
- Verify read-only focus without value changes, required validation with and without a submission name, first-enabled validation focus, inline/native behavior, Fieldset state and descriptions, hidden radio values, and form reset.

## Related guidance

- `checkbox-group`
- `select`
- `toggle-group`
- `fieldset`
- `form`
