# Fieldset agent guide

## Purpose

Group related form controls under native fieldset and legend semantics while sharing group state and validation behavior.

## Use when

- Multiple related controls need one group question or label, especially radio or checkbox choices.

## Choose something else when

- Only one control needs a label. Use Field.

## Required composition

- Compose Fieldset.Root -> Fieldset.Legend -> optional description/error -> Fields or grouped controls.

## Rules

- **MUST:** Group only controls that answer one related question.
- **MUST:** Provide a meaningful legend unless an equivalent documented accessible naming strategy is required.

## Common mistakes

- **Avoid:** Using one Field to label a collection of controls. **Instead:** Use Fieldset for the group and Field for each independently labeled control.

## Validation checklist

- Inspect fieldset and legend semantics.
- Confirm disabled, required, and invalid group state reaches descendants as documented.

## Related guidance

- `form`
- `field`
- `checkbox`
