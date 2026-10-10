# TagsInput agent guide

## Purpose

Present a finished multi-value text field with Atom-owned collection transactions and optional suggestions.

## Use when

- Users create multiple short string values, optionally using suggestions.

## Choose something else when

- Values are display-only. Use Chip.
- Only predefined choices are accepted. Use MultiSelect.

## Required composition

- Use Root, Label or Field, Control, Items, Input and one HiddenInput. Use explicit indexed Item parts for custom token anatomy.

## Rules

- **MUST:** Use the seven responsive field variants outline, surface, soft, subtle, ghost, plain and underline with the shared 2xs–2xl sizes. Defaults remain lg/outline. Responsive variants exclude shape/radius; underline has zero inset and bottom-only focus. Label typography is independent of tag size and editable text remains at least 16px.
- **MUST:** Use ItemContext for indexed item state and the public ids callbacks for item identities. asChild/render retain native input, label and action semantics and refs. Items forwards shared item attributes and tone, including contrast; use explicit Item parts for custom anatomy. Do not wrap a second interactive Chip owner inside a tag.
- **MUST:** Read-only retains the draft focus path and JSON submission without add placeholders or delete/clear affordances. Long tags truncate visually without truncating accessible values. Constrain demo measure with Frame; do not change fullWidth to fix a page composition.
- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep collection and input draft controlled independently. Use Atom's controller and useTagsInputCombobox bindings instead of implementing keyboard or paste behavior in application CSS/handlers.
- **MUST:** Use one JSON HiddenInput for submission; never name the visible draft. Parse the JSON array on the server.
- **MUST:** Load styles.css or core.css plus tags-input.css and every composed component's CSS. Item tones are semantic, not status announcements.

## Common mistakes

- **Avoid:** Using standalone Chip removal handlers as a complete tags field. **Instead:** Use TagsInput for navigation, drafts, validation, announcements and focus recovery.

## Validation checklist

- Verify seven responsive sizes and variants, wrapped item targets, underline hover/focus, error focus, item-tone precedence, disabled/read-only, RTL and appearances.
- Verify atomic paste, edits, duplicates, limits, forms/reset, IME and nested portalled suggestions.

## Related guidance

- `@flowstack-ui/atom/agents/tags-input`
- `chip`
- `combobox`
- `field`
- `form`
- `for`
