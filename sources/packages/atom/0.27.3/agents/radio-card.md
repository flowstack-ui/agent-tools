# RadioCard agent guide

## Purpose

Mutually exclusive rich option selection through native radio inputs and label items.

## Use when

- A single-choice group needs rich passive option content.

## Choose something else when

- Options select independently. Use CheckboxCard.

## Required composition

- Compose a named Root with uniquely valued Items, each containing exactly one HiddenInput, Title and optional Description/Indicator.

## Rules

- **MUST:** HiddenInput is the sole input and focus owner. Item is a label. Preserve native label activation and do not add a second selection click handler.
- **MUST:** Keep Item descendants passive; no nested actions, labels or extra controls. Item ref targets label; HiddenInput ref targets input.
- **MUST:** Use controlled value/onValueChange or defaultValue. RootProvider accepts useRadioCard controller; controlled owners handle reset.
- **MUST:** Match scalar orientation to group navigation and preserve RTL, disabled skipping and read-only focus without selection changes.

## Common mistakes

- **Avoid:** Using a button as the rich item. **Instead:** Use Item and one accessible native HiddenInput.

## Validation checklist

- Verify naming, one notification, forms/reset, keyboard/RTL, disabled/readOnly and refs.

## Related guidance

- `radio-group`
- `checkbox-card`
- `fieldset`
- `form`
