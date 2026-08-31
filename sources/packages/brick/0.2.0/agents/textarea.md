# Textarea agent guide

## Purpose

Render finished native multi-line text entry with Brick sizing, states, resize policy, and Atom field integration.

## Use when

- The user enters sentences, paragraphs, notes, or other multi-line text.

## Choose something else when

- The expected value is short and single-line. Use Input.

## Required composition

- Place Textarea inside one Field.Root after Field.Label and add description or character guidance when useful.

## Rules

- **MUST:** Use a persistent accessible label.
- **MUST:** Load styles.css or core.css plus textarea.css and field.css when composed with Field.

## Common mistakes

- **Avoid:** Using a single-line Input for long freeform content. **Instead:** Use Textarea and allow a usable multi-line measure.

## Validation checklist

- Inspect label, name, and messaging relationships.
- Test multi-line entry, resize policy, narrow widths, invalid/disabled states, and contrast.

## Related guidance

- `@flowstack-ui/atom/agents/textarea`
- `field`
- `input`
