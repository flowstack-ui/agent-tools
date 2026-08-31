# Blockquote agent guide

## Purpose

Compose an extended quotation, source URL, and optional attribution with correct native structure and finished Brick styling.

## Use when

- An extended quotation and optional attribution form one self-contained content unit.

## Choose something else when

- The quotation is inline within a sentence. Use native q inside the surrounding content owner.
- The interface is a testimonial card with media, ratings, or actions. Use Card or a product Block composed with Blockquote.

## Required composition

- Place Blockquote.Content and optional Blockquote.Caption as siblings inside Blockquote.Root; put the source URL on Content through cite.
- Use Blockquote.Cite inside Caption only for a referenced work or source, not merely for the person quoted.

## Rules

- **MUST:** Preserve figure Root, blockquote Content, sibling figcaption Caption, and native cite Cite.
- **MUST:** Keep attribution outside Content so it is not represented as part of the quotation.
- **MUST:** Select only the documented accent, surface, or plain variant and start, center, or end alignment.
- **MUST:** Keep Icon decorative unless a consumer intentionally overrides aria-hidden for meaningful custom content.
- **MUST:** Load styles.css or core.css plus blockquote.css.

## Common mistakes

- **Avoid:** Putting the author or source inside Blockquote.Content. **Instead:** Render attribution in sibling Blockquote.Caption and use Cite only for a work or source title.

## Validation checklist

- Confirm native figure, blockquote, figcaption, and cite mapping; source URL forwarding; logical alignment; selection and copy; forced colors; zoom; text spacing; localization; RTL; and CSS delivery.
- Confirm Blockquote adds no tab stop, role, interaction, or application provenance policy.

## Related guidance

- `text`
- `mark`
- `interface-composition`
