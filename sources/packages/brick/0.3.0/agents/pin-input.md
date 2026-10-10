# PinInput agent guide

## Purpose

Present a fixed-length PIN or optional OTP as theme-native segmented entry while Atom owns slot-preserving state, atomic acceptance, focus, completion, validation and form submission.

## Use when

- A fixed-length PIN or code needs visible character cells. Set otp explicitly for a one-time code.

## Choose something else when

- The value is an unrestricted password, quantity or variable-length text; or the task is credential storage/verification. Use PasswordToggleField, NumberInput, Input or application security policy.

## Required composition

- Compose one visibly labelled Field with PinInput.Root, then render exactly one PinInput.Input for each normalized length position in stable logical source order. Add aria-hidden Separator only for deliberate visual grouping; layout wrappers may group cells without creating separate values.
- Give Root one accessible group name, character type, length, and submission name. Localize getInputLabel for every position and treat autoSubmit and autoFocus as explicit application workflow decisions.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Treat all cells as one logical code, match visible Input count and order to Root length, and never create independent application state, validation, or submission names for each cell.
- **MUST:** Retain string[] values and details callbacks so empty positions survive. Do not reconstruct controlled state from joined valueAsString. Atom sanitizes then rejects invalid paste atomically; configure ASCII types or a per-character RegExp and preserve invalid notifications.
- **MUST:** Use the public usePinInput hook and RootProvider for externally controlled stores; create the hook inside inherited Field/Form/Direction providers. Context exposes that controller. Root owns one hidden named value; do not duplicate it.
- **MUST:** PinInput replaces OTPField without an alias. Existing OTP consumers explicitly set otp. mask=true uses native password inputs; custom mask strings are visual-only. Security and verification remain outside the component.
- **MUST:** Use seven responsive shared sizes and outline/surface/soft/subtle/ghost/plain/underline variants. Default lg stays aligned with Input. Underline and responsive variants reject explicit shape/radius. Neutral/accent tone controls interaction, invalid overrides it, and underline focus stays below. Keep adjacent native cells in each attached Group; Control wraps runs.
- **MUST:** Name Root through Field or native ARIA, localize every generated position label, keep Separator decorative, and do not add unsupported aria-required to role=group.
- **MUST:** Preserve one roving Tab stop, render-order registration, replacement and advance, Arrow/Home/End, Backspace/Delete, complete-code paste, disabled/read-only state, and logical source order in RTL.
- **MUST:** Enable autoSubmit only when a complete accepted code should intentionally submit the associated form, with application-owned pending, verification, error, retry, and focus recovery behavior; choose autoFocus just as deliberately.
- **MUST:** Keep required validity on the first visible cell and Root's named combined value submission-only, including Field invalid mirroring, external form association, and uncontrolled reset.
- **MUST:** Load styles.css or core.css plus pin-input.css and Field CSS when composed.
- **MUST:** For React Hook Form, use Controller with string[] values and onValueChange details.value, put its ref on the first Input and let Root own the single hidden named value. Do not add another hidden input or join away empty positions.

## Common mistakes

- **Avoid:** Building unrelated character inputs, rendering a different cell count than length, blocking paste, reversing cells in RTL, leaving generated labels unlocalized, or auto-submitting by habit. **Instead:** Use one named PinInput value, align cells to length and logical order, preserve Atom entry behavior, localize labels, and make submission an explicit application decision.
- **Avoid:** Putting code delivery, expiry, resend, attempt limits, rate limiting, or verification inside the component. **Instead:** Keep security and workflow policy in the application or service and let PinInput report value and completion only.

## Validation checklist

- Verify controlled and uncontrolled full value, length, render-order and explicit indices, all filters, typing replacement, accepted paste distribution, Backspace/Delete, Arrow/Home/End, one roving Tab stop, deliberate autoFocus, mask display, disabled/read-only behavior, and localized cell labels.
- Verify onComplete timing, intentional autoSubmit, Root and Field naming/descriptions, required validity on the first cell, invalid state across cells, inline/native validation focus, combined named value, external form, reset, separators, native props, render composition, and refs.
- Verify deliberate wrapping and grouping, 320 CSS pixels, 200% text, 400% zoom, RTL logical order, touch targets, long localized labels, focus visibility, forced colors, and every supported appearance.

## Related guidance

- `@flowstack-ui/atom/agents/pin-input`
- `password-toggle-field`
- `number-input`
- `input`
- `field`
- `form`
