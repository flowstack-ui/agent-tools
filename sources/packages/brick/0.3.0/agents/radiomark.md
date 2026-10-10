# Radiomark agent guide

## Purpose

Show passive selected or unselected circular state without creating radio behavior.

## Use when

- A choice card or read-only summary already owns selection behavior and needs a theme-aware radio visual.

## Choose something else when

- The visual must provide radio focus, keyboard behavior, or form participation. Use Radio Group or Radio Card.

## Required composition

- Place Radiomark inside an existing choice owner and let that owner expose selected state and its accessible name.
- Choose solid, soft, subtle (soft alias), outline or inverted, with responsive size and variant. Sizes xs/sm/md/lg are 12/16/20/24px. Neutral and contrast share the current palette; filled retains canvas beneath transparent states.

## Rules

- **MUST:** Keep Radiomark passive and aria-hidden; the parent control owns semantics.
- **MUST:** Use checked only to mirror state owned elsewhere.
- **MUST:** Load styles.css or core.css plus radiomark.css.
- **MUST:** Children replace the decorative checked dot; never put interactive or accessible content in an aria-hidden mark.
- **MUST:** Use responsive sizes and variants. Outline uses a 0.6 dot; other recipes use 0.4. Inverted uses solid palette foreground. invalid is visual only; disabled adds one fade and a disabled cursor. Preserve passive custom artwork.
- **SHOULD:** Keep semantic tone props; for a qualified category palette use the documented --brick-radiomark-solid, --brick-radiomark-on-solid, --brick-radiomark-soft and --brick-radiomark-text tokens together and verify both appearances. Do not attach interaction to the mark.

## Common mistakes

- **Avoid:** Building a radio control from a clickable Radiomark. **Instead:** Use Radio Group or Radio Card and reserve Radiomark for passive presentation.

## Validation checklist

- Verify circular geometry, checked and unchecked states, sizes, tones, variants, dark mode, forced colors, and absence of focus or role.

## Related guidance

- `radio-group`
- `radio-card`
- `icon`
