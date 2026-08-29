# Textarea agent guide

## Purpose

Provide headless native multi-line text entry with Field relationships and controlled or uncontrolled value handling.

## Use when

- The user may enter sentences, paragraphs, notes, or other multi-line text.

## Choose something else when

- The expected value is short and single-line. Use Input.

## Required composition

- Place Textarea.Root inside one Field.Root with Field.Label and an optional description or character guidance.

## Rules

- **MUST:** Give every Textarea an accessible name, normally through Field.Label.
- **MUST:** Provide a stable name when the value participates in submission.

## Common mistakes

- **Avoid:** Replacing Textarea with a contenteditable div for ordinary text entry. **Instead:** Use native Textarea unless rich-text behavior is genuinely required.

## Validation checklist

- Inspect the label and description relationships.
- Test multi-line keyboard entry, resizing policy, and submitted value.

## Related guidance

- `field`
- `form`
- `input`
