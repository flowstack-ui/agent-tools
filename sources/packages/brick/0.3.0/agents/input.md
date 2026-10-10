# Input agent guide

## Purpose

Render finished native single-line text entry with Brick sizing, states, and Atom field integration.

## Use when

- The user enters a single-line text, email, search, URL, telephone, or supported native input value.

## Choose something else when

- The value needs multiple lines. Use Textarea.

## Required composition

- Place Input inside one Field.Root after Field.Label; provide name, type, and autocomplete appropriate to the data. Use outline when the containing surface should remain visible and soft when Input should own a filled plane.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Preserve independent focus indication on interactive adornments. Input's boundary ring belongs to its text control, not a nested selector. When a suffix control owns its own padding, a narrow logical end-padding composition override can avoid doubled inset.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use a persistent accessible label; placeholder is not a replacement.
- **MUST:** Load styles.css or core.css plus input.css and field.css when composed with Field.
- **MUST:** Use shared responsive sizes and variants: outline, surface, soft, subtle, ghost, plain, underline. Defaults are lg and outline. Underline has zero start inset and bottom-only focus; responsive variants exclude explicit shape/radius so corners can recover at later breakpoints. Invalid and forced-color focus must remain visible.
- **MUST:** Masking, React Hook Form and payment formatting are separate application dependencies; follow docs/guides/input-integrations.md and tested versions. Preserve native refs and handlers, use one value owner, verify caret/reset/submission, and do not treat formatting as payment processing.
- **MUST:** Use intrinsic-width startAdornment/endAdornment for internal text or independently named actions. Use InputAddon with Group attached for external noninteractive segments, matching recipes explicitly. Native props/ref target the input; managed Group attributes target its painted wrapper.
- **MUST:** The owning artwork slot sets final Icon dimensions even with larger standalone/provider sizes; do not add compensating Icon size props.

## Common mistakes

- **Avoid:** Using placeholder as the only visible label. **Instead:** Compose Input with Field.Label and use placeholder only as optional example text.

## Validation checklist

- Inspect label, name, type, autocomplete, and messaging relationships.
- Test focus, entry, autofill, invalid/disabled states, zoom, and both appearances.

## Related guidance

- `@flowstack-ui/atom/agents/input`
- `field`
- `textarea`
- `input-addon`
- `group`
