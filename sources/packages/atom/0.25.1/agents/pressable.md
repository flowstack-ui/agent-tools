# Pressable agent guide

## Purpose

Add normalized press interaction to a deliberately chosen semantic element without deciding that element's visual design.

## Use when

- A semantic surface needs unified keyboard, pointer, and press handling and neither Button nor Link alone expresses the composition.

## Choose something else when

- A normal action or destination needs no custom semantic surface. Use Button or Link.

## Required composition

- Choose the correct rendered semantic element first, then attach Pressable behavior without nesting interactive controls.

## Rules

- **MUST:** Pressable does not supply missing semantics; the rendered element must already express the interaction.
- **MUST:** Do not create nested interactive elements.

## Common mistakes

- **Avoid:** Using Pressable as a generic clickable div. **Instead:** Prefer Button or Link; use Pressable only for a justified semantic composition.

## Validation checklist

- Verify the rendered role and accessible name.
- Test keyboard, pointer, touch, focus, and disabled behavior.

## Related guidance

- `button`
- `link`
