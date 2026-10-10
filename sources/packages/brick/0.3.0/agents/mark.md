# Mark agent guide

## Purpose

Render a semantically marked static passage with restrained theme-aware Brick paint.

## Use when

- Authored content needs a static marked passage whose relevance is already known.

## Choose something else when

- Text must be matched from a query. Use Highlight.
- Text needs stress emphasis. Use Em.

## Required composition

- Keep Mark inside the surrounding Text, heading, link, or Prose content owner. asChild projects onto one authored native mark host.

## Rules

- **MUST:** Use Mark for authored static relevance; do not pass a query or implement search matching inside it.
- **MUST:** Preserve native mark semantics. Variants are subtle, solid, text and plain; tones are accent, neutral, info, success, warning and danger. Defaults remain subtle/accent. Text adds medium weight, not a colored foreground.
- **MUST:** Load styles.css or core.css plus mark.css.

## Common mistakes

- **Avoid:** Mapping every search result manually through Mark. **Instead:** Use Highlight when Atom-owned matching must segment text.

## Validation checklist

- Confirm native mark semantics, normal selection and copy, inherited typography, readable contrast, wrapping, forced colors, zoom, RTL, and CSS delivery.

## Related guidance

- `em`
- `text`
- `interface-composition`
