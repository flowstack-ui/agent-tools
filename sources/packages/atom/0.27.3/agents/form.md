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
- **MUST:** Choose native action submission or application-owned submission explicitly. Set preventDefaultOnSubmit for client-owned async submission; returning a Promise from onSubmit alone does not cancel native navigation.
- **MUST:** validateOnSubmit runs before onSubmit; false prevents submission, and async validation prevents the original native default while awaiting. Success does not restart native navigation; perform the accepted application submission in onSubmit, whose event.currentTarget retains the form. Choose validationBehavior for native versus inline feedback; it does not replace server validation.
- **MUST:** Native reset restores uncontrolled controls after cancellation is known. Controlled values remain application-owned; stale async submissions must not overwrite a newer submission or reset.

## Common mistakes

- **Avoid:** Building a form-shaped div with click-only submission. **Instead:** Use Form and a submit Button so keyboard and platform behavior remain available.

## Validation checklist

- Submit with Enter where appropriate.
- Inspect submitted names and values.
- Verify invalid fields expose their relationships.
- Verify async validation rejection, explicit client submission cancellation, controlled reset, and stale submission recovery.

## Related guidance

- `field`
- `fieldset`
- `button`
