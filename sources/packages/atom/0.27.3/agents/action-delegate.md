# ActionDelegate agent guide

## Purpose

Expand a descendant primary control's pointer target while preserving native host semantics and independent controls.

## Use when

- A record row or card has a real visible primary link, button or checkbox and ordinary background clicks should activate it.

## Choose something else when

- The surface itself should be a normal button or link. Use Button or Link.

## Required composition

- Pass one non-Fragment host and targetId of its real visible descendant control; keep that control named and keyboard accessible.

## Rules

- **MUST:** Keep native row/list/card semantics and the actual primary target; never replace it with row role=button or a tab stop.
- **MUST:** Keep secondary controls independent; use data-action-delegate-ignore for custom interactive descendants, and do not nest delegates.
- **MUST:** Modified and middle clicks on blank row space are not delegated; use the actual link for native navigation affordances.

## Common mistakes

- **Avoid:** Using delegation to hide or omit a real primary control. **Instead:** Keep the primary action visible, named and reachable through normal keyboard navigation.

## Validation checklist

- Test pointer, keyboard on the real control, text selection, portals, disabled targets, cancelled pointer, modifiers, handler/ref composition and one activation.

## Related guidance

- `button`
- `link`
- `table`
- `list`
- `pressable`
