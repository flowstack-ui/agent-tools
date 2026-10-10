# PinInput agent guide

## Purpose

Coordinate a fixed-length PIN or optional OTP across slot-preserving character cells with atomic acceptance, roving focus, native form completeness and post-commit completion.

## Use when

- A fixed-length PIN or verification code needs separate character cells. Set otp explicitly for a one-time code from a message.

## Choose something else when

- The user enters an unrestricted password or the value belongs in one ordinary text box. Use PasswordToggleField or Input.

## Required composition

- Give Root a clear accessible group name and render one Input for each normalized length position, normally relying on render order for indices. Add Separator only for decorative grouping, and localize generated cell labels with getInputLabel.

## Rules

- **MUST:** Match the visible Input count and stable order to Root length; use explicit index only when composition genuinely requires an override.
- **MUST:** Use string[] value/defaultValue and onValueChange details to preserve holes. Never reconstruct controlled arrays from valueAsString. Choose ASCII type or a per-character pattern; sanitizer runs before atomic paste validation. Invalid candidates notify onValueInvalid without filtering characters away; complete valid overlong paste truncates to length.
- **MUST:** Create usePinInput within inherited Field/Form/Direction providers. RootProvider requires that controller, never a hand-built object. Context/usePinInputContext expose value, valueAsString, complete, focusedIndex and mutation/focus methods; disabled/readOnly prohibit writes.
- **MUST:** Use PinInput and /pin-input only, with no OTPField alias. Existing one-time-code compositions must set otp=true; its default is false. mask=true uses a native password input; custom mask strings are visual-only and neither performs verification or secure storage.
- **MUST:** Name Root through native ARIA or Field, localize every generated position label, keep Separator aria-hidden, and do not add unsupported aria-required to role=group.
- **MUST:** Preserve one roving Tab stop, render-order registration, character advance, Arrow/Home/End, Backspace/Delete, paste distribution, disabled/read-only state, and focus movement.
- **MUST:** onComplete runs after changed accepted complete state commits, not for initial/external values or a refused controlled update. autoSubmit is explicit product policy and must observe committed hidden value and completeness validity. Preserve optional blurOnComplete and selectOnFocus.
- **MUST:** The first visible cell validates all required positions, with invalid mirrored to every cell. Root automatically owns one named hidden value; never duplicate it. Reset must work without name, with external form, with prevented reset and after a late RootProvider mount. Queued resets are cancelled on form reassociation or unmount; controlled values remain application-owned. Optional incomplete FormData is joined text; use array state for positional partial data.

## Common mistakes

- **Avoid:** Joining controlled values, assuming OTP autocomplete is the default, duplicating a hidden input, or treating masked cells as credential security. **Instead:** Retain array positions, opt into otp, let Root own submission and keep verification/security in the application.

## Validation checklist

- Verify controlled/uncontrolled full value, length, render-order and explicit indices, numeric/alphabetic/alphanumeric/custom filtering, typing replacement, accepted paste distribution, Backspace/Delete, Arrow/Home/End, one roving Tab stop, autoFocus, mask display, disabled/read-only behavior, and localized cell labels.
- Verify onComplete timing, intentional autoSubmit, Root and Field naming/descriptions, required validity on the first cell, invalid state across cells, inline/native validation focus, combined named value and external form, reset, separators, asChild/render, and refs.

## Related guidance

- `password-toggle-field`
- `input`
- `field`
- `form`
