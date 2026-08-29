# PasswordToggleField agent guide

## Purpose

Provide a native password input with controlled or uncontrolled reveal state, an accessible show/hide action, Field validation, and form-safe password restoration.

## Use when

- A reusable password input benefits from an explicit keyboard-accessible action that lets users verify what they typed and revealing it is acceptable for the product's privacy model.

## Choose something else when

- The value is ordinary text, a one-time verification code, or policy forbids revealing the secret. Use Input, OTPField, or a password Input without a reveal control.

## Required composition

- Compose Root with one Input and a Toggle; add Icon only when the styled layer needs decorative visible/hidden content. Give Input an accessible Field or native label and localize Root showLabel and hideLabel for the Toggle action.

## Rules

- **MUST:** Include the visibility action only when revealing the password is acceptable for the product's security, privacy, observation, and shared-device context.
- **MUST:** Keep Input as the native value, naming, autocomplete, validity, and submission owner while Atom changes only its owned type between password and text.
- **MUST:** Give Toggle localized state-aware Show and Hide action labels; do not add aria-pressed because the changing action label communicates the available action.
- **MUST:** Preserve Input focus on Toggle pointer down while keeping Toggle keyboard reachable by Tab, Enter, and Space.
- **MUST:** Route controlled visible through onVisibleChange or use defaultVisible, preserve disabled/read-only/required/invalid Field behavior, restore uncontrolled visibility on reset, and restore type=password before native submission.

## Common mistakes

- **Avoid:** Adding reveal where policy forbids it, using aria-pressed with changing Show/Hide labels, moving pointer focus away from Input, or allowing form submission while the DOM input remains type=text. **Instead:** Apply the privacy decision first and preserve Atom's state-aware action, focus, reset, validation, and submit-time password restoration.

## Validation checklist

- Verify Input label, autocomplete and native props, controlled/uncontrolled visibility, password/text switching, localized Show/Hide Toggle labels, decorative Icon state, pointer focus preservation, keyboard Tab/Enter/Space, disabled and read-only behavior, and asChild/render Toggle composition.
- Verify Field ID, label, description and error inheritance with native overrides, required/invalid inline and native validation, reset to defaultVisible, type=password restoration before form submission, external form association, and no unintended live-region or aria-pressed semantics.

## Related guidance

- `input`
- `otp-field`
- `field`
- `form`
