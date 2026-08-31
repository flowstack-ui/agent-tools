# OTPField agent guide

## Purpose

Coordinate a short one-time verification code across visible character cells as one logical field with filtering, paste distribution, roving focus, completion, validation, and combined form submission.

## Use when

- A short one-time code from a message is entered or pasted into visually separated character cells.

## Choose something else when

- The user chooses a reusable secret or the value belongs in one ordinary text box. Use PasswordToggleField or Input.

## Required composition

- Give Root a clear accessible group name and render one Input for each normalized length position, normally relying on render order for indices. Add Separator only for decorative grouping, and localize generated cell labels with getInputLabel.

## Rules

- **MUST:** Match the visible Input count and stable order to Root length; use explicit index only when composition genuinely requires an override.
- **MUST:** Choose numeric, alphabetic, alphanumeric, or a safe custom pattern that accepts exactly the intended characters, and preserve filtering for typing and paste.
- **MUST:** Name Root through native ARIA or Field, localize every generated position label, keep Separator aria-hidden, and do not add unsupported aria-required to role=group.
- **MUST:** Preserve one roving Tab stop, render-order registration, character advance, Arrow/Home/End, Backspace/Delete, paste distribution, disabled/read-only state, and focus movement.
- **MUST:** Treat onComplete and especially autoSubmit as product effects: enable autoSubmit only when a complete accepted code should intentionally submit the associated form.
- **MUST:** Keep required validity on the first visible cell and the named combined hidden value submission-only, including Field invalid mirroring, external form association, and uncontrolled reset.

## Common mistakes

- **Avoid:** Using OTPField for a password, rendering a different number of cells than length, leaving English generated cell labels in a localized product, or auto-submitting without explicit workflow intent. **Instead:** Use the correct secret/text input, align cells to length, localize getInputLabel, and treat completion submission as an explicit application decision.

## Validation checklist

- Verify controlled/uncontrolled full value, length, render-order and explicit indices, numeric/alphabetic/alphanumeric/custom filtering, typing replacement, accepted paste distribution, Backspace/Delete, Arrow/Home/End, one roving Tab stop, autoFocus, mask display, disabled/read-only behavior, and localized cell labels.
- Verify onComplete timing, intentional autoSubmit, Root and Field naming/descriptions, required validity on the first cell, invalid state across cells, inline/native validation focus, combined named value and external form, reset, separators, asChild/render, and refs.

## Related guidance

- `password-toggle-field`
- `input`
- `field`
- `form`
