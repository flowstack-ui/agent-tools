# CheckboxCard agent guide

## Purpose

Finished rich independently selectable option cards with native checkbox behavior.

## Use when

- A form option needs an icon, label, description or supporting metadata in one selectable card.

## Choose something else when

- Exactly one option may be selected. Use RadioCard.
- A record has independent open/edit/delete actions. Use Card with Checkbox.

## Required composition

- Compose Root with exactly one HiddenInput, Control, Content, Label, optional Description/Indicator and Addon. Native input owns focus; Root ref targets label.

## Rules

- **MUST:** Disabled controls preserve their recipe and use one 50% fade with a not-allowed cursor. Forced colors restores full opacity and uses system disabled colors.
- **MUST:** Subtle uses a plain indicator in both states. Disabled dims the root once; read-only remains readable and focusable. Neutral and contrast share the checkbox family's monochrome selection treatment; do not present them as distinct palettes.
- **MUST:** Keep label descendants noninteractive phrasing content. Do not nest links/buttons/labels or additional inputs; use Card with a separate Checkbox for record actions. Root asChild/render preserves label semantics.
- **MUST:** Use CheckboxGroup.Root and Fieldset for related values; each card has a unique value. Do not create another store or make every group item required.
- **MUST:** Use responsive sm/md/lg sizes, outline/surface/subtle/solid variants and layout props. Tone follows Checkbox; radius uses Radius. Grid/Stack owns tracks. Omit redundant full-width wrappers.
- **MUST:** Indicator is optional and decorative. Custom children replace Checkmark; Context reads state. Omitting Indicator must retain selection feedback.
- **MUST:** Load styles.css or core.css plus checkbox-card.css. Use Theme and documented hooks rather than application state handlers or internal selectors.

## Common mistakes

- **Avoid:** Wrapping Card in a checkbox button. **Instead:** Use CheckboxCard's native label/input anatomy.

## Validation checklist

- Verify label/Space toggle once, forms/reset, mixed/disabled/read-only and group limits.
- Inspect size/variant/RTL/narrow/light/dark/forced-colors and focus-ring behavior.

## Related guidance

- `checkbox`
- `checkbox-group`
- `checkmark`
- `card`
- `radio-card`
- `fieldset`
- `grid`
- `stack`
