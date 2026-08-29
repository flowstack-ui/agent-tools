# Field agent guide

## Purpose

Visually arrange one control with its label, description, error, and inherited Atom field relationships.

## Use when

- One finished control needs a visible label and may need help or error text.

## Choose something else when

- Several related controls share one group label. Use Fieldset, with Field inside when individual controls also need labels.

## Required composition

- Compose Field.Root -> Field.Label -> one control -> optional Field.Description -> optional Field.Error.

## Rules

- **MUST:** Associate one Field with one control.
- **MUST:** Field.Label already renders the default required marker; never add a second asterisk or RequiredIndicator unless the default is disabled.
- **MUST:** Load styles.css or core.css plus field.css and the owned control stylesheet.

## Common mistakes

- **Avoid:** Adding a manual required asterisk beside a required Field.Label. **Instead:** Set required on Field.Root and use the built-in Label marker, or explicitly replace it once.

## Validation checklist

- Confirm label, description, and error relationships.
- Confirm exactly one required marker.
- Check vertical and horizontal layouts at narrow widths.

## Related guidance

- `@flowstack-ui/atom/agents/field`
- `form`
- `fieldset`
- `input`
- `textarea`
- `checkbox`
