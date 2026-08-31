# Form agent guide

## Purpose

Provide the native form submission boundary and shared validation behavior for descendant fields and groups.

## Use when

- A set of controls submits related user input.

## Choose something else when

- Controls are unrelated or trigger immediate independent actions. Use Individual Field and Button compositions.

## Required composition

- Compose Form around Fieldset for related groups and Field around each single control; finish with a named submit Button.

## Rules

- **MUST:** Preserve native form submission and do not make click handling the only submit path.
- **MUST:** Give submitted controls stable names.

## Common mistakes

- **Avoid:** Building a form-shaped div with click-only submission. **Instead:** Use Form and a submit Button so keyboard and platform behavior remain available.

## Validation checklist

- Submit with Enter where appropriate.
- Inspect submitted names and values.
- Verify invalid fields expose their relationships.

## Related guidance

- `field`
- `fieldset`
- `button`
