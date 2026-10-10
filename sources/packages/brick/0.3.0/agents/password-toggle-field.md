# PasswordToggleField agent guide

## Purpose

Present finished native password entry with a named reveal action while Atom owns visibility, type switching, focus and selection retention, Field validation, reset, and submission safety.

## Use when

- A reusable password benefits from an explicit keyboard-accessible reveal action and revealing it is acceptable for the product's privacy model.

## Choose something else when

- The value is ordinary text or a one-time code, or security, observation, or shared-device policy forbids revealing the secret. Use Input, PinInput, or Input with type=password without a reveal control.

## Required composition

- Compose a visible Field.Label, then PasswordToggleField.Root with exactly one Input and Toggle. Let Toggle render Brick's private default Icon or supply decorative product artwork without replacing its action name.
- Choose the Input-family recipe, size, shape, and width on Root; set autocomplete deliberately. Supply shared defaults through LocaleProvider showPassword/hidePassword and use Root showLabel/hideLabel only for a more specific action name.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Include the reveal action only when it is acceptable for the product's security, privacy, observation, recording, and shared-device context.
- **MUST:** Keep Input as the native value, naming, autocomplete, validity, and submission owner while Atom changes only its owned type between password and text.
- **MUST:** Provide localized state-aware showPassword and hidePassword defaults through LocaleProvider or explicit Root showLabel and hideLabel values; explicit Root values win. Do not add aria-pressed because the changing action name communicates the available action.
- **MUST:** Preserve Input focus, selection, and field focus paint on Toggle pointer down. Keep Toggle sequentially keyboard reachable by Tab, Enter, and Space; when Toggle owns keyboard focus, remove field focus paint and paint the action's own inset ring.
- **MUST:** Use visible with onVisibleChange or defaultVisible and preserve Field disabled/read-only/required/invalid behavior. Accepted reset restores uncontrolled default visibility; prevented reset preserves value and visibility. Submit handlers observe type=password; after prevented submission Atom restores the committed visible/hidden type so Input, Icon, and action name remain coherent.
- **MUST:** Keep password strength, generation, confirmation, storage, authentication, clipboard, and security policy in the application or service.
- **MUST:** Never put password values in status text, logs, analytics, persistent UI, or live regions. Optional form and strength integrations preserve the native Input ref/value path and report only non-secret state.
- **MUST:** Load styles.css or core.css plus password-toggle-field.css and Field CSS when composed.
- **MUST:** Forced colors preserves a real system-color focus outline; shadows are not the sole focus cue.
- **MUST:** Use shared responsive sizes and variants: outline, surface, soft, subtle, ghost, plain, underline. Defaults are lg and outline. Underline has zero start inset and bottom-only focus; responsive variants exclude explicit shape/radius so corners can recover at later breakpoints. Invalid and forced-color focus must remain visible.

## Common mistakes

- **Avoid:** Adding reveal where policy forbids it, using an unlabeled eye or aria-pressed, moving pointer focus from Input, leaking the value into feedback, or submitting while the DOM input remains type=text. **Instead:** Apply the privacy decision first and preserve Atom's state-aware action, focus, reset, validation, and submit-time password restoration.
- **Avoid:** Writing a second visibility state, replacing Field relationships, or moving password policy into the styled component. **Instead:** Use the complete Root, Input, Toggle, and optional Icon anatomy and keep product policy in the application.

## Validation checklist

- Verify visible Field naming, autocomplete, native props, controlled and uncontrolled visibility, password/text switching, localized Show/Hide actions, decorative Icon state, pointer focus and selection retention, keyboard Tab/Enter/Space, disabled/read-only behavior, custom Toggle composition, and refs.
- Verify Field ID, label, description, and error inheritance with native overrides; required/invalid inline and native validation; accepted and prevented reset; submit-handler type=password observation; prevented-submit coherence; external form; and no unintended live-region or aria-pressed semantics.
- Verify all recipes, sizes, allowed shapes, width modes, long localization, narrow width, zoom, RTL, light and dark appearance, forced colors, hover, focus, invalid, disabled, and read-only paint.

## Related guidance

- `@flowstack-ui/atom/agents/password-toggle-field`
- `field`
- `input`
- `pin-input`
- `form`
- `button`
