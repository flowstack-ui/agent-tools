# Em agent guide

## Purpose

Apply native stress emphasis while preserving the surrounding Brick typography and foreground.

## Use when

- Words in a sentence need semantic stress emphasis that changes the meaning or cadence when spoken.

## Choose something else when

- Text only needs an italic visual treatment without stress emphasis. Use a deliberate application-owned visual recipe.
- Text needs importance rather than stress emphasis. Use native strong inside the surrounding text owner.

## Required composition

- Keep Em inside the Text, heading, link, or component content owner whose sentence it completes.

## Rules

- **MUST:** Use Em only for native stress emphasis and preserve its one em host; do not select it merely for italic paint.
- **MUST:** Let Em inherit the surrounding typography and foreground rather than introducing a separate size, tone, or weight recipe.
- **MUST:** Load styles.css or core.css plus em.css.

## Common mistakes

- **Avoid:** Using Em as a decorative italic label or replacing a sentence-level text owner with Em. **Instead:** Keep Em inside meaningful surrounding copy and use it only when stress emphasis is semantically intended.

## Validation checklist

- Confirm one native em element, inherited metrics and foreground, readable forced colors, normal selection and copy, and no tab stop or role.
- Check nested sentence flow, localization, zoom, RTL, and CSS delivery.

## Related guidance

- `text`
- `link`
- `interface-composition`
