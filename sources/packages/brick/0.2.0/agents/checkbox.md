# Checkbox agent guide

## Purpose

Render a finished independent checked, unchecked, or mixed selection with Atom interaction and form behavior.

## Use when

- A user independently turns an option on or off, or an aggregate parent represents mixed child selection.

## Choose something else when

- Exactly one option must be selected from a set. Use RadioGroup.

## Required composition

- Compose Checkbox.Root with Checkbox.Indicator and a visible associated label, usually inside Field or Fieldset.

## Rules

- **MUST:** Give every checkbox a visible associated label unless context is genuinely redundant and an accessible name remains.
- **MUST:** Load styles.css or core.css plus checkbox.css and any Field/Fieldset styles used.

## Common mistakes

- **Avoid:** Using Checkbox for a one-of-many choice. **Instead:** Use RadioGroup for mutually exclusive options.

## Validation checklist

- Toggle with Space, pointer, and touch.
- Inspect checked/mixed and disabled states, label hit target, submitted value, focus, and contrast.

## Related guidance

- `@flowstack-ui/atom/agents/checkbox`
- `field`
- `fieldset`
- `radio-group`
