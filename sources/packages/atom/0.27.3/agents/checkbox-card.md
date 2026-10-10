# CheckboxCard agent guide

## Purpose

Independent rich option selection through a native checkbox and whole-card label.

## Use when

- An independently selectable option needs a rich noninteractive label.

## Choose something else when

- Options are mutually exclusive. Use RadioCard for rich choices or RadioGroup for ordinary radio options.

## Required composition

- Compose Root with exactly one HiddenInput, Control, Label and optional Description/Indicator. Root is a label; all supporting content is noninteractive phrasing content.

## Rules

- **MUST:** Render exactly one HiddenInput. It is the keyboard target and native form control; never add another checkbox or hide it from accessibility. Root ref targets label, HiddenInput ref targets input.
- **MUST:** Inside CheckboxGroup.Root, each card requires a unique value and inherits group selection/name/form/limits. Use Fieldset for group labeling, not one Field for all cards.
- **MUST:** Do not nest actions, links, labels or extra controls inside the whole-card label. Use a content card with independent controls for record actions. Root asChild/render must preserve a label host.
- **MUST:** Use useCheckboxCard with RootProvider; inputValue is the submitted value. Controlled owners handle reset. Never combine provider state with a second group store.

## Common mistakes

- **Avoid:** Adding a click handler to the card to toggle state. **Instead:** Let the native label activate its single input.

## Validation checklist

- Test Space and pointer toggle once, mixed state, read-only and disabled.
- Verify native submission, group limits, validation focus and reset.

## Related guidance

- `checkbox`
- `checkbox-group`
- `radio-card`
- `field`
- `fieldset`
- `form`
