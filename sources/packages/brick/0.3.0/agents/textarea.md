# Textarea agent guide

## Purpose

Render finished native multi-line text entry with Brick sizing, states, resize policy, and Atom field integration.

## Use when

- The user enters sentences, paragraphs, notes, or other multi-line text.

## Choose something else when

- The expected value is short and single-line. Use Input.

## Required composition

- Place Textarea inside one Field.Root after Field.Label and add description or character guidance when useful.
- Use the default outline recipe beside outline Input when both controls should blend into the same owning surface.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Choose from the shared responsive field variants: outline, surface, soft, subtle, ghost, plain, and underline. Responsive variants cannot be combined with shape or radius because their geometry can change by breakpoint.
- **MUST:** Keep the browser-native manual resize handle on the outer Textarea boundary. The inner editor fills the growing row while Count retains a compact footer with handle clearance. Use Root style for whole-field constraints and textareaStyle for editor constraints. Disabled has no handle; read-only remains resizable. Use autoResize for content-driven growth without a competing handle; preserve authored CSS constraints and use minRows/maxRows only as additional bounds.
- **MUST:** Preserve native textarea refs, form ownership, reset, validation, and React Hook Form registration without wrapper roles or keyboard behavior.
- **SHOULD:** Verify hover does not override focus, invalid, disabled, or read-only treatment, and verify underline has zero horizontal inset and a bottom-only focus indicator.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use a persistent accessible label.
- **MUST:** Load styles.css or core.css plus textarea.css and field.css when composed with Field.
- **SHOULD:** Keep outline Textarea and outline Input on the same transparent surface recipe within one form.

## Common mistakes

- **Avoid:** Using a single-line Input for long freeform content. **Instead:** Use Textarea and allow a usable multi-line measure.

## Validation checklist

- Inspect label, name, and messaging relationships.
- Test multi-line entry, actual drag resizing, bounded growth and shrink, responsive variant transitions, narrow widths, invalid/disabled/read-only states, reset, and contrast.

## Related guidance

- `@flowstack-ui/atom/agents/textarea`
- `field`
- `input`
