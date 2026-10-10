# TagsInput agent guide

## Purpose

Own collection and draft transactions, token navigation, acceptance, announcements and form serialization for authored tags.

## Use when

- Users create and edit multiple short string values in one logical field.

## Choose something else when

- Users choose only from predefined options. Use MultiSelect.
- Values are display-only labels. Use Brick Chip.

## Required composition

- Use Root or RootProvider, Label, Control, indexed Item parts, Input and one HiddenInput. ItemPreview contains ItemText and ItemDeleteTrigger; ItemInput is a sibling editor.

## Rules

- **MUST:** Use ItemContext for item state and ids.item, ids.itemInput and ids.itemDeleteTrigger callbacks for indexed IDs. asChild/render must preserve native input/label/button hosts and forward owner props and refs. Composed interactive descendants retain their own activation; do not duplicate value or focus owners.
- **MUST:** Update controlled collection and draft independently. Preserve Item index/value order, including duplicate occurrences.
- **MUST:** Use one HiddenInput for the JSON-serialized committed collection; never name the visible draft or add a duplicate named proxy.
- **MUST:** Use useTagsInputCombobox bindings for nested Combobox suggestions, with TagsInput Control/Input and standard Combobox popup parts.
- **MUST:** Keep asynchronous lookup and domain policy in the application. Synchronous sanitize/validate and limits apply uniformly to every accepted mutation.

## Common mistakes

- **Avoid:** Dropping empty array positions as item identity or submitting comma-joined strings. **Instead:** Use index/value anatomy and the JSON form value; retain rejected paste drafts.

## Validation checklist

- Test duplicates, edits, atomic paste, max/overflow, IME, disabled item navigation, controlled replacement and cancellation.
- Test labels, required collection validity, reset/external forms, native refs, live strings and nested portalled suggestions.

## Related guidance

- `input`
- `field`
- `form`
- `combobox`
