# PasswordToggleField agent guide

## Purpose

Present finished native password entry with a named reveal action while Atom owns visibility, type switching, focus retention, Field validation, reset, and submission safety.

## Use when

- A reusable password benefits from an explicit keyboard-accessible reveal action and revealing it is acceptable for the product's privacy model.

## Choose something else when

- The value is ordinary text or a one-time code, or security, observation, or shared-device policy forbids revealing the secret. Use Input, OTPField, or Input with type=password without a reveal control.

## Required composition

- Compose a visible Field.Label, then PasswordToggleField.Root with exactly one Input and Toggle. Let Toggle render Brick's private default Icon or supply decorative product artwork without replacing its action name.
- Choose the Input-family recipe, size, shape, and width on Root; set autocomplete deliberately and localize Root showLabel and hideLabel as the next available actions.

## Rules

- **MUST:** Include the reveal action only when it is acceptable for the product's security, privacy, observation, recording, and shared-device context.
- **MUST:** Keep Input as the native value, naming, autocomplete, validity, and submission owner while Atom changes only its owned type between password and text.
- **MUST:** Provide localized state-aware showLabel and hideLabel values that describe the next action; do not add aria-pressed because the changing action name communicates the available action.
- **MUST:** Preserve Input focus on Toggle pointer down while keeping Toggle sequentially keyboard reachable by Tab, Enter, and Space.
- **MUST:** Use visible with onVisibleChange or defaultVisible, preserve Field disabled/read-only/required/invalid behavior, reset uncontrolled visibility, and let Atom restore type=password before native submission.
- **MUST:** Keep password strength, generation, confirmation, storage, authentication, clipboard, and security policy in the application or service.
- **MUST:** Load styles.css or core.css plus password-toggle-field.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Adding reveal where policy forbids it, using an unlabeled eye or aria-pressed, moving pointer focus from Input, or submitting while the DOM input remains type=text. **Instead:** Apply the privacy decision first and preserve Atom's state-aware action, focus, reset, validation, and submit-time password restoration.
- **Avoid:** Writing a second visibility state, replacing Field relationships, or moving password policy into the styled component. **Instead:** Use the complete Root, Input, Toggle, and optional Icon anatomy and keep product policy in the application.

## Validation checklist

- Verify visible Field naming, autocomplete, native props, controlled and uncontrolled visibility, password/text switching, localized Show/Hide actions, decorative Icon state, pointer focus retention, keyboard Tab/Enter/Space, disabled/read-only behavior, custom Toggle composition, and refs.
- Verify Field ID, label, description, and error inheritance with native overrides; required/invalid inline and native validation; reset to defaultVisible; type=password restoration before submission; external form; and no unintended live-region or aria-pressed semantics.
- Verify all recipes, sizes, allowed shapes, width modes, long localization, narrow width, zoom, RTL, light and dark appearance, forced colors, hover, focus, invalid, disabled, and read-only paint.

## Related guidance

- `@flowstack-ui/atom/agents/password-toggle-field`
- `field`
- `input`
- `otp-field`
- `form`
- `button`
