# Kbd agent guide

## Purpose

Render native keyboard-input notation with finished Brick sizing and visual recipes.

## Use when

- Copy needs to name a physical or virtual keyboard key or show a compact authored key sequence.

## Choose something else when

- The application must register or execute a shortcut. Use application-owned keyboard behavior.
- The content is a technical literal rather than keyboard input. Use Code.

## Required composition

- Keep Kbd inside meaningful surrounding copy or repeat Kbd for each authored key in a sequence with visible separators outside the key hosts.

## Rules

- **MUST:** Preserve the one native kbd host and use it only for keyboard-input notation.
- **MUST:** Do not register shortcuts, listen for keys, translate platform labels, or add interaction inside Kbd.
- **MUST:** Select only the documented raised, outline, subtle, or plain variant and sm, md, or lg size.
- **MUST:** Load styles.css or core.css plus kbd.css.

## Common mistakes

- **Avoid:** Putting an entire shortcut such as Ctrl+Shift+P inside one Kbd host without authored separation. **Instead:** Use one Kbd per key and keep visible separators in the surrounding content owner.

## Validation checklist

- Confirm native kbd semantics, closed recipes, readable key sequences, selection and copy, forced colors, zoom, localization, RTL, and CSS delivery.
- Confirm Kbd adds no tab stop, role, shortcut listener, or platform detection.

## Related guidance

- `code`
- `text`
- `interface-composition`
