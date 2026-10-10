# Checkmark agent guide

## Purpose

Show passive checked, unchecked, or indeterminate visual state without creating selection behavior.

## Use when

- A card, plan, summary, or existing interaction owner needs a theme-aware visual check mark.

## Choose something else when

- The mark itself must be focusable, toggleable, or submit a form value. Use Checkbox or Checkbox Group.

## Required composition

- Pair Checkmark with visible text or place it inside a parent that already exposes the state accessibly.
- Choose solid, outline, subtle, soft, plain or inverted with responsive size and variant. Subtle and soft use muted paint in all states; inverted is transparent unless filled. Plain stays unboxed. Sizes xs/sm/md/lg are 12/16/20/24px.

## Rules

- **MUST:** Keep Checkmark passive and aria-hidden; the parent control or text owns semantics.
- **MUST:** Use checked or indeterminate only to mirror state owned elsewhere.
- **MUST:** Load styles.css or core.css plus checkmark.css.
- **MUST:** Use responsive sizes and variants. Subtle and soft paint a muted box in every state; plain is unboxed, inverted is transparent unless filled, and boxed md/lg use 2px inset. invalid is visual only; disabled adds one fade and a disabled cursor.
- **SHOULD:** Keep semantic tone props; for a qualified category palette use the documented --brick-checkmark-solid, --brick-checkmark-on-solid, --brick-checkmark-soft and --brick-checkmark-text tokens together and verify both appearances. Do not attach interaction to the mark.

## Common mistakes

- **Avoid:** Attaching click behavior to Checkmark. **Instead:** Use Checkbox or an existing parent control and render Checkmark only as its visual.

## Validation checklist

- Verify square geometry, all states, sizes, tones, variants, dark mode, forced colors, and absence of focus or role.

## Related guidance

- `checkbox`
- `checkbox-group`
- `icon`
