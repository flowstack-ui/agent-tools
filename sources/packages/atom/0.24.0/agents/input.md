# Input agent guide

## Purpose

Provide headless native single-line text entry that participates in Field relationships and controlled or uncontrolled value handling.

## Use when

- The user enters one line of text, email, search, URL, telephone, or another supported native input value.

## Choose something else when

- The value needs multiple lines. Use Textarea.

## Required composition

- Place Input.Root inside one Field.Root with Field.Label; add a stable name when it participates in submission.

## Rules

- **MUST:** Give every Input an accessible name, normally through Field.Label.
- **SHOULD:** Choose the narrowest correct native type and autocomplete value.

## Common mistakes

- **Avoid:** Using placeholder text as the only label. **Instead:** Add a persistent Field.Label and keep placeholder text optional.

## Validation checklist

- Inspect name, type, autocomplete, label, and description relationships.
- Test keyboard entry and browser autofill where relevant.

## Related guidance

- `field`
- `form`
- `textarea`
