# Input agent guide

## Purpose

Render finished native single-line text entry with Brick sizing, states, and Atom field integration.

## Use when

- The user enters a single-line text, email, search, URL, telephone, or supported native input value.

## Choose something else when

- The value needs multiple lines. Use Textarea.

## Required composition

- Place Input inside one Field.Root after Field.Label; provide name, type, and autocomplete appropriate to the data. Use outline when the containing surface should remain visible and soft when Input should own a filled plane.

## Rules

- **MUST:** Use a persistent accessible label; placeholder is not a replacement.
- **MUST:** Load styles.css or core.css plus input.css and field.css when composed with Field.

## Common mistakes

- **Avoid:** Using placeholder as the only visible label. **Instead:** Compose Input with Field.Label and use placeholder only as optional example text.

## Validation checklist

- Inspect label, name, type, autocomplete, and messaging relationships.
- Test focus, entry, autofill, invalid/disabled states, zoom, and both appearances.

## Related guidance

- `@flowstack-ui/atom/agents/input`
- `field`
- `textarea`
