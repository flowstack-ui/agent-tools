# NativeSelect agent guide

## Purpose

Present a finished native select while the browser owns the picker and Atom owns Field/Form integration.

## Use when

- A predefined choice should use the platform picker rather than a custom popup.

## Choose something else when

- Options need rich content or searchable filtering. Use Select or Combobox.

## Required composition

- Place NativeSelect.Field and optional decorative Indicator in Root, with native option/optgroup children and Field.Label or a standalone accessible name.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Keep Field native. Root asChild composes only the visual host. Use multiple/rows for native list selection; Indicator hides in list mode. Seven responsive sizes share the control family; subtle is neutral fill.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep native options, selection, form value and reset; do not add a second popup or hidden named value.
- **MUST:** Use Root size for shared control geometry and rows for native list height; configure multiple at Root.
- **MUST:** Load styles.css or core.css plus native-select.css and the CSS of composed components.
- **MUST:** Use shared responsive sizes and variants: outline, surface, soft, subtle, ghost, plain, underline. Defaults are lg and outline. Underline has zero start inset and bottom-only focus; responsive variants exclude explicit shape/radius so corners can recover at later breakpoints. Invalid and forced-color focus must remain visible.

## Common mistakes

- **Avoid:** Expecting identical native popup visuals on every OS or simulating readonly with disabled. **Instead:** Use custom Select for authored popup visuals; native select has no readonly mode.

## Validation checklist

- Verify Field labels, state precedence, native change/reset/multiple submission and external form.
- Verify all sizes, variants, shapes, indicator containment, RTL, narrow, light/dark and forced colors, with physical mobile picker checks separately.

## Related guidance

- `@flowstack-ui/atom/agents/native-select`
- `field`
- `form`
- `select`
- `combobox`
