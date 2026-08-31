# Field agent guide

## Purpose

Wire one form control to its label, description, error, and shared required, disabled, read-only, and invalid state.

## Use when

- One control needs a visible label and may need help or error text.

## Choose something else when

- Several related controls share one group label. Use Fieldset containing one Field per control when needed.

## Required composition

- Compose Field.Root -> Field.Label -> one Field-aware control -> optional Field.Description -> optional Field.Error.

## Rules

- **MUST:** Associate one Field with one owned control.
- **MUST:** Field.Label already renders the default required marker; do not add Field.RequiredIndicator inside it unless the default indicator is disabled.
- **SHOULD:** Make error text explain how to correct the value.

## Common mistakes

- **Avoid:** Adding a manual asterisk or RequiredIndicator beside the default required Label. **Instead:** Set required on Field.Root and let Field.Label render its built-in marker, or disable that marker before composing a separate indicator.

## Validation checklist

- Inspect label-for and control-id relationships.
- Confirm description and visible error IDs appear in aria-describedby.
- Confirm exactly one required indicator is visible.

## Related guidance

- `form`
- `fieldset`
- `input`
- `textarea`
- `checkbox`
