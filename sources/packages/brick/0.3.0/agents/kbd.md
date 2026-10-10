# Kbd agent guide

## Purpose

Render native keyboard-input notation with finished Brick sizing and visual recipes.

## Use when

- Copy needs to name a physical or virtual keyboard key or show a compact authored key sequence.

## Choose something else when

- The application must register or execute a shortcut. Use application-owned keyboard behavior.
- The content is a technical literal rather than keyboard input. Use Code.

## Required composition

- Use one Kbd for a complete authored combination or separate Kbd hosts for individual keys with visible separators. asChild projects presentation onto one authored kbd host.

## Rules

- **MUST:** Preserve the one native kbd host and use it only for keyboard-input notation.
- **MUST:** Do not register shortcuts, listen for keys, translate platform labels, or add interaction inside Kbd.
- **MUST:** Select documented variants, sizes and semantic tones; default raised/md/neutral.
- **MUST:** Load styles.css or core.css plus kbd.css.

## Common mistakes

- **Avoid:** Expecting Kbd to register shortcuts or translate platform symbols. **Instead:** The application owns shortcut behavior and labels. Both a whole combination and separate keycaps are valid.

## Validation checklist

- Confirm native kbd semantics, closed recipes, readable key sequences, selection and copy, forced colors, zoom, localization, RTL, and CSS delivery.
- Confirm Kbd adds no tab stop, role, shortcut listener, or platform detection.

## Related guidance

- `code`
- `text`
- `interface-composition`
