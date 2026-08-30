# Checkbox agent guide

## Purpose

Provide an independent checked, unchecked, or mixed selection with keyboard, pointer, touch, and form behavior.

## Use when

- A user independently turns an option on or off, or an aggregate parent represents mixed child selection.

## Choose something else when

- Exactly one option must be selected from a set. Use RadioGroup.

## Required composition

- Compose Checkbox.Root with Checkbox.Indicator and a visible associated label, usually inside Field.

## Rules

- **MUST:** Provide a visible label for each checkbox unless the visual context is truly redundant and an accessible name remains.
- **MUST:** Use checkbox semantics only for independently selectable values or a documented aggregate mixed state.

## Common mistakes

- **Avoid:** Using a checkbox for mutually exclusive choices. **Instead:** Use RadioGroup for a one-of-many decision.

## Validation checklist

- Toggle with Space and pointer/touch.
- Inspect checked or mixed state and submitted name/value.
- Confirm disabled state cannot change.

## Related guidance

- `field`
- `fieldset`
- `form`
- `radio-group`
