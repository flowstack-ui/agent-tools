# DatePicker agent guide

## Purpose

Coordinate segmented entry and inline calendar selection with one Atom Popover.

## Use when

- Coordinate segmented entry and inline calendar selection with one Atom Popover.

## Choose something else when

- An event scheduler or business availability workflow is required. Use Application-owned composition.

## Required composition

- Keep existing Input segmented. Use entryMode=text with TextInput for strict ISO text entry, or entryMode=none for a button-only picker. Override parsing and display together through textCodec; multiple custom strings use selectionTextCodec.
- Root automatically owns canonical form controls. Use formControl=manual with one HiddenInput only when explicit placement is required. Legacy HiddenInput in auto mode is an unnamed compatibility mirror, not a second submitted field.
- useDatePicker and RootProvider share state; keep draft text separate from committed value. Never use internal underscore-prefixed controller members in application code.
- Use DatePicker.Root and its named parts. Supply a stable referenceDate, accessible names and a typed selectionMode value.
- Use date-value helpers for date-only, local datetime and zoned datetime values; never parse localized strings with Date.parse.
- For removable multiple-date chips, compose non-editable value artwork and separate remove buttons beside Trigger, never inside it. Typed multiple text remains a separate grammar-based editor. Render Calendar directly without Portal/Content for inline presets. Root positioning forwards to the existing Popover owner; tall preset panels can constrain flip to vertical placements. Content side/align applies when Root positioning does not override placement.

## Rules

- **MUST:** Keep picker validity separate from Field's aggregate feedback. Valid edits clear the picker's own error report; explicit picker invalid remains application-owned and must be cleared by its owner.
- **MUST:** Keep editing, selection, validation and overlay state with the owning components; do not nest independent popup engines.
- **MUST:** Supply referenceDate consistently on server and client; locale and timeZone must agree.

## Common mistakes

- **Avoid:** Converting a date-only value to UTC midnight. **Instead:** Preserve the civil date and serialize explicitly.

## Validation checklist

- Verify selection modes, keyboard, form reset/validation, locale/RTL, controlled values and public imports.

## Related guidance

- `field`
- `popover`
